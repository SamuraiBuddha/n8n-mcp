import { logger } from '../utils/logger';
import { NodeDocumentationService } from '../services/node-documentation-service';
import { N8nApiClient } from '../services/n8n-api-client';
import { handleN8nApiError } from '../utils/n8n-errors';

/**
 * Handler functions for credential management MCP tools
 */

export async function handleListCredentials(
  args: any,
  apiClient: N8nApiClient
): Promise<any> {
  try {
    const { limit = 100, cursor } = args;
    const response = await apiClient.listCredentials({ limit, cursor });
    
    // Remove sensitive data from response
    const sanitizedCredentials = response.data.map(cred => ({
      id: cred.id,
      name: cred.name,
      type: cred.type,
      createdAt: cred.createdAt,
      updatedAt: cred.updatedAt,
      nodesAccess: cred.nodesAccess
    }));
    
    return {
      credentials: sanitizedCredentials,
      nextCursor: response.nextCursor,
      total: sanitizedCredentials.length
    };
  } catch (error) {
    logger.error('Error listing credentials:', error);
    throw handleN8nApiError(error);
  }
}

export async function handleGetCredential(
  args: any,
  apiClient: N8nApiClient
): Promise<any> {
  try {
    const { id } = args;
    const credential = await apiClient.getCredential(id);
    
    // Return metadata without sensitive data
    return {
      id: credential.id,
      name: credential.name,
      type: credential.type,
      createdAt: credential.createdAt,
      updatedAt: credential.updatedAt,
      nodesAccess: credential.nodesAccess,
      // Don't return the actual credential data for security
      dataStructure: credential.data ? Object.keys(credential.data) : []
    };
  } catch (error) {
    logger.error('Error getting credential:', error);
    throw handleN8nApiError(error);
  }
}

export async function handleCreateCredential(
  args: any,
  apiClient: N8nApiClient
): Promise<any> {
  try {
    const { name, type, data, nodesAccess } = args;
    
    const credential = await apiClient.createCredential({
      name,
      type,
      data,
      nodesAccess
    });
    
    return {
      id: credential.id,
      name: credential.name,
      type: credential.type,
      createdAt: credential.createdAt,
      message: 'Credential created successfully'
    };
  } catch (error) {
    logger.error('Error creating credential:', error);
    throw handleN8nApiError(error);
  }
}

export async function handleUpdateCredential(
  args: any,
  apiClient: N8nApiClient
): Promise<any> {
  try {
    const { id, name, data, nodesAccess } = args;
    
    const updateData: any = {};
    if (name) updateData.name = name;
    if (data) updateData.data = data;
    if (nodesAccess) updateData.nodesAccess = nodesAccess;
    
    const credential = await apiClient.updateCredential(id, updateData);
    
    return {
      id: credential.id,
      name: credential.name,
      type: credential.type,
      updatedAt: credential.updatedAt,
      message: 'Credential updated successfully'
    };
  } catch (error) {
    logger.error('Error updating credential:', error);
    throw handleN8nApiError(error);
  }
}

export async function handleDeleteCredential(
  args: any,
  apiClient: N8nApiClient
): Promise<any> {
  try {
    const { id } = args;
    await apiClient.deleteCredential(id);
    
    return {
      success: true,
      message: `Credential ${id} deleted successfully`
    };
  } catch (error) {
    logger.error('Error deleting credential:', error);
    throw handleN8nApiError(error);
  }
}

export async function handleTestCredential(
  args: any,
  apiClient: N8nApiClient
): Promise<any> {
  try {
    const { id } = args;
    const result = await apiClient.testCredential(id);
    
    return {
      id,
      success: result.success,
      message: result.message || (result.success ? 'Credential test successful' : 'Credential test failed'),
      testedAt: new Date().toISOString()
    };
  } catch (error) {
    logger.error('Error testing credential:', error);
    throw handleN8nApiError(error);
  }
}

export async function handleGetCredentialTypeInfo(
  args: any,
  nodeDocService: NodeDocumentationService
): Promise<any> {
  try {
    const { type } = args;
    
    // Get credential type information from the database
    const credentialInfo = await nodeDocService.getCredentialTypeInfo(type);
    
    if (!credentialInfo) {
      return {
        error: `Credential type '${type}' not found`,
        suggestion: 'Use list_credential_types to see available types'
      };
    }
    
    return {
      type: credentialInfo.type,
      displayName: credentialInfo.displayName,
      documentationUrl: credentialInfo.documentationUrl,
      properties: credentialInfo.properties,
      examples: generateCredentialExamples(type)
    };
  } catch (error) {
    logger.error('Error getting credential type info:', error);
    throw error;
  }
}

export async function handleListCredentialTypes(
  args: any,
  nodeDocService: NodeDocumentationService
): Promise<any> {
  try {
    const { filter } = args;
    
    // Get all credential types from the database
    const credentialTypes = await nodeDocService.listCredentialTypes(filter);
    
    return {
      credentialTypes: credentialTypes.map(ct => ({
        type: ct.type,
        displayName: ct.displayName,
        description: ct.description,
        nodeCount: ct.nodeCount // How many nodes use this credential type
      })),
      total: credentialTypes.length
    };
  } catch (error) {
    logger.error('Error listing credential types:', error);
    throw error;
  }
}

export async function handleGetNodeCredentialRequirements(
  args: any,
  nodeDocService: NodeDocumentationService
): Promise<any> {
  try {
    const { nodeType } = args;
    
    // Get node information including credential requirements
    const nodeInfo = await nodeDocService.getNodeByType(nodeType);
    
    if (!nodeInfo) {
      return {
        error: `Node type '${nodeType}' not found`,
        suggestion: 'Use list_nodes to see available node types'
      };
    }
    
    if (!nodeInfo.credentials || nodeInfo.credentials.length === 0) {
      return {
        nodeType,
        nodeName: nodeInfo.displayName,
        requiresCredentials: false,
        message: 'This node does not require any credentials'
      };
    }
    
    return {
      nodeType,
      nodeName: nodeInfo.displayName,
      requiresCredentials: true,
      credentials: nodeInfo.credentials.map((cred: any) => ({
        name: cred.name,
        required: cred.required !== false,
        displayOptions: cred.displayOptions,
        description: getCredentialDescription(cred.name)
      })),
      examples: generateNodeCredentialExample(nodeType, nodeInfo.credentials)
    };
  } catch (error) {
    logger.error('Error getting node credential requirements:', error);
    throw error;
  }
}

// Helper functions
function generateCredentialExamples(type: string): any {
  const examples: Record<string, any> = {
    httpBasicAuth: {
      user: 'myUsername',
      password: 'myPassword'
    },
    httpHeaderAuth: {
      name: 'Authorization',
      value: 'Bearer YOUR_API_TOKEN'
    },
    openAiApi: {
      apiKey: 'sk-...'
    },
    slackApi: {
      accessToken: 'xoxb-...'
    },
    googleSheetsOAuth2Api: {
      // OAuth2 credentials are typically set up through the UI
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET'
    }
  };
  
  return examples[type] || {
    message: 'Credential structure varies by type. Check the n8n UI for required fields.'
  };
}

function getCredentialDescription(credentialName: string): string {
  const descriptions: Record<string, string> = {
    httpBasicAuth: 'Basic HTTP authentication with username and password',
    httpHeaderAuth: 'HTTP header-based authentication (e.g., API key in header)',
    httpDigestAuth: 'HTTP digest authentication',
    httpQueryAuth: 'Authentication via query parameters',
    oauth1Api: 'OAuth 1.0a authentication',
    oauth2Api: 'OAuth 2.0 authentication',
    slackApi: 'Slack API token authentication',
    slackOAuth2Api: 'Slack OAuth 2.0 authentication',
    openAiApi: 'OpenAI API key authentication',
    googleSheetsOAuth2Api: 'Google Sheets OAuth 2.0 authentication'
  };
  
  return descriptions[credentialName] || 'Authentication credentials for this service';
}

function generateNodeCredentialExample(nodeType: string, credentials: any[]): any {
  return {
    nodeConfiguration: {
      type: nodeType,
      credentials: credentials.reduce((acc, cred) => {
        acc[cred.name] = {
          id: '{credentialId}',
          name: 'My ' + cred.name + ' Credential'
        };
        return acc;
      }, {})
    },
    usage: 'Add credentials to your node by setting the credentials property with the credential ID'
  };
}