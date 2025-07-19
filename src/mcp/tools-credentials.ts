import { ToolDefinition } from '../types';

/**
 * Credential Management Tools
 * 
 * These tools enable AI agents to manage credentials in n8n through the n8n API.
 * They require N8N_API_URL and N8N_API_KEY to be configured.
 */
export const credentialManagementTools: ToolDefinition[] = [
  // Credential Management Tools
  {
    name: 'n8n_list_credentials',
    description: `List all credentials in the n8n instance. Returns credential metadata without sensitive data.`,
    inputSchema: {
      type: 'object',
      properties: {
        limit: { 
          type: 'number', 
          description: 'Maximum number of credentials to return (default: 100)' 
        },
        cursor: { 
          type: 'string', 
          description: 'Pagination cursor for next page' 
        }
      }
    }
  },
  {
    name: 'n8n_get_credential',
    description: `Get details of a specific credential by ID. Returns metadata and structure but not the actual credential values for security.`,
    inputSchema: {
      type: 'object',
      properties: {
        id: { 
          type: 'string', 
          description: 'Credential ID' 
        }
      },
      required: ['id']
    }
  },
  {
    name: 'n8n_create_credential',
    description: `Create a new credential in n8n. Requires credential type and data matching the type's schema.`,
    inputSchema: {
      type: 'object',
      properties: {
        name: { 
          type: 'string', 
          description: 'Display name for the credential' 
        },
        type: { 
          type: 'string', 
          description: 'Credential type (e.g., "httpBasicAuth", "slackApi", "openAiApi")' 
        },
        data: { 
          type: 'object', 
          description: 'Credential data matching the type schema. Structure varies by credential type.' 
        },
        nodesAccess: {
          type: 'array',
          description: 'Optional: Array of node types that can access this credential',
          items: {
            type: 'object',
            properties: {
              nodeType: { type: 'string' }
            }
          }
        }
      },
      required: ['name', 'type', 'data']
    }
  },
  {
    name: 'n8n_update_credential',
    description: `Update an existing credential. Can update name, data, or node access permissions.`,
    inputSchema: {
      type: 'object',
      properties: {
        id: { 
          type: 'string', 
          description: 'Credential ID to update' 
        },
        name: { 
          type: 'string', 
          description: 'New display name for the credential' 
        },
        data: { 
          type: 'object', 
          description: 'Updated credential data. Only provided fields will be updated.' 
        },
        nodesAccess: {
          type: 'array',
          description: 'Updated array of node types that can access this credential',
          items: {
            type: 'object',
            properties: {
              nodeType: { type: 'string' }
            }
          }
        }
      },
      required: ['id']
    }
  },
  {
    name: 'n8n_delete_credential',
    description: `Delete a credential by ID. This action cannot be undone.`,
    inputSchema: {
      type: 'object',
      properties: {
        id: { 
          type: 'string', 
          description: 'Credential ID to delete' 
        }
      },
      required: ['id']
    }
  },
  {
    name: 'n8n_test_credential',
    description: `Test if a credential is working correctly. Returns success status and any error messages.`,
    inputSchema: {
      type: 'object',
      properties: {
        id: { 
          type: 'string', 
          description: 'Credential ID to test' 
        }
      },
      required: ['id']
    }
  },
  {
    name: 'get_credential_type_info',
    description: `Get schema information for a specific credential type. Shows what fields are required and their types.`,
    inputSchema: {
      type: 'object',
      properties: {
        type: { 
          type: 'string', 
          description: 'Credential type name (e.g., "httpBasicAuth", "slackApi", "openAiApi")' 
        }
      },
      required: ['type']
    }
  },
  {
    name: 'list_credential_types',
    description: `List all available credential types that can be created in n8n.`,
    inputSchema: {
      type: 'object',
      properties: {
        filter: { 
          type: 'string', 
          description: 'Optional filter to search credential types by name' 
        }
      }
    }
  },
  {
    name: 'get_node_credential_requirements',
    description: `Get the credential requirements for a specific node type. Shows what credentials are needed and whether they're required or optional.`,
    inputSchema: {
      type: 'object',
      properties: {
        nodeType: { 
          type: 'string', 
          description: 'Node type name (e.g., "n8n-nodes-base.slack", "n8n-nodes-base.httpRequest")' 
        }
      },
      required: ['nodeType']
    }
  }
];