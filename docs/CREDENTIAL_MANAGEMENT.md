# Credential Management in n8n-mcp

As of version 2.8.0, n8n-mcp includes comprehensive credential management capabilities, allowing AI agents to create, update, test, and manage credentials programmatically.

## Overview

The credential management feature adds 9 new MCP tools that enable complete credential lifecycle management:

- **CRUD Operations**: Create, read, update, and delete credentials
- **Testing**: Test credentials to ensure they work correctly
- **Discovery**: List available credential types and their schemas
- **Integration**: Understand which credentials a node requires

## Prerequisites

Credential management tools require n8n API access:

```bash
export N8N_API_URL=http://localhost:5678
export N8N_API_KEY=your-api-key
```

## Available Tools

### 1. n8n_list_credentials
List all credentials in your n8n instance.

**Usage:**
```json
{
  "tool": "n8n_list_credentials",
  "arguments": {
    "limit": 20,
    "cursor": "optional-pagination-cursor"
  }
}
```

**Returns:** List of credentials with metadata (no sensitive data)

### 2. n8n_get_credential
Get details of a specific credential.

**Usage:**
```json
{
  "tool": "n8n_get_credential",
  "arguments": {
    "id": "credential-id"
  }
}
```

**Returns:** Credential metadata and structure (no sensitive values)

### 3. n8n_create_credential
Create a new credential.

**Usage:**
```json
{
  "tool": "n8n_create_credential",
  "arguments": {
    "name": "My API Key",
    "type": "httpHeaderAuth",
    "data": {
      "name": "Authorization",
      "value": "Bearer your-api-key"
    }
  }
}
```

**Returns:** Created credential with ID

### 4. n8n_update_credential
Update an existing credential.

**Usage:**
```json
{
  "tool": "n8n_update_credential",
  "arguments": {
    "id": "credential-id",
    "name": "Updated Name",
    "data": {
      "value": "new-api-key"
    }
  }
}
```

### 5. n8n_delete_credential
Delete a credential.

**Usage:**
```json
{
  "tool": "n8n_delete_credential",
  "arguments": {
    "id": "credential-id"
  }
}
```

### 6. n8n_test_credential
Test if a credential is working.

**Usage:**
```json
{
  "tool": "n8n_test_credential",
  "arguments": {
    "id": "credential-id"
  }
}
```

**Returns:** Success status and any error messages

### 7. get_credential_type_info
Get the schema for a credential type.

**Usage:**
```json
{
  "tool": "get_credential_type_info",
  "arguments": {
    "type": "httpBasicAuth"
  }
}
```

**Returns:** Properties required for this credential type

### 8. list_credential_types
List all available credential types.

**Usage:**
```json
{
  "tool": "list_credential_types",
  "arguments": {
    "filter": "optional-search-term"
  }
}
```

**Returns:** List of credential types with usage statistics

### 9. get_node_credential_requirements
Get credential requirements for a specific node.

**Usage:**
```json
{
  "tool": "get_node_credential_requirements",
  "arguments": {
    "nodeType": "n8n-nodes-base.slack"
  }
}
```

**Returns:** Required and optional credentials for the node

## Common Credential Types

### HTTP Basic Auth
```json
{
  "type": "httpBasicAuth",
  "data": {
    "user": "username",
    "password": "password"
  }
}
```

### API Key (Header Auth)
```json
{
  "type": "httpHeaderAuth",
  "data": {
    "name": "Authorization",
    "value": "Bearer your-api-key"
  }
}
```

### OAuth2
OAuth2 credentials typically require interactive setup through the n8n UI for the authorization flow.

## Security Considerations

1. **No Credential Data Exposure**: The MCP tools never return actual credential values
2. **Secure Storage**: All credentials are encrypted in n8n's database
3. **Access Control**: Use `nodesAccess` to limit which nodes can use credentials
4. **Regular Rotation**: Update credentials regularly using `n8n_update_credential`
5. **Testing**: Always test credentials after creation or updates

## Example Workflow

Here's a complete example of setting up credentials for a Slack integration:

```javascript
// 1. Check what credentials Slack needs
const requirements = await mcp.callTool('get_node_credential_requirements', {
  nodeType: 'n8n-nodes-base.slack'
});

// 2. Get the credential schema
const schema = await mcp.callTool('get_credential_type_info', {
  type: 'slackApi'
});

// 3. Create the credential
const credential = await mcp.callTool('n8n_create_credential', {
  name: 'My Slack Workspace',
  type: 'slackApi',
  data: {
    accessToken: 'xoxb-your-slack-token'
  }
});

// 4. Test it works
const testResult = await mcp.callTool('n8n_test_credential', {
  id: credential.id
});

// 5. Use in a workflow
const workflow = {
  nodes: [{
    type: 'n8n-nodes-base.slack',
    credentials: {
      slackApi: {
        id: credential.id
      }
    }
    // ... other node config
  }]
};
```

## Troubleshooting

### "n8n API not configured" Error
Ensure you've set the environment variables:
```bash
export N8N_API_URL=http://localhost:5678
export N8N_API_KEY=your-api-key
```

### "Credential test endpoint not available"
Some older n8n versions don't support credential testing via API. The credential will still work in workflows.

### OAuth2 Credentials
OAuth2 credentials often require interactive authorization through the n8n UI. Create them there first, then manage them via API.

## Best Practices

1. **Name Credentials Clearly**: Use descriptive names like "Production Slack API" vs just "Slack"
2. **Test After Creation**: Always test credentials before using in workflows
3. **Use Appropriate Types**: Match the credential type to what the service expects
4. **Document Credentials**: Keep external documentation of what each credential is for
5. **Limit Access**: Only grant access to nodes that need the credential

## Integration with Workflows

When creating workflows programmatically, include credentials like this:

```json
{
  "nodes": [{
    "type": "n8n-nodes-base.httpRequest",
    "credentials": {
      "httpHeaderAuth": {
        "id": "your-credential-id",
        "name": "API Key"  // Optional, for clarity
      }
    },
    // ... rest of node configuration
  }]
}
```

The credential ID must match an existing credential in your n8n instance.