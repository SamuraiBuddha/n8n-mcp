# Credential Management Example

This example demonstrates how to use the n8n-mcp credential management tools to create and manage credentials programmatically.

## Prerequisites

Make sure you have configured the n8n API:
```bash
export N8N_API_URL=http://localhost:5678
export N8N_API_KEY=your-api-key
```

## Example Workflow: Setting up Slack Integration

### 1. First, check what credentials the Slack node requires:

```
Tool: get_node_credential_requirements
Arguments: {
  "nodeType": "n8n-nodes-base.slack"
}
```

This will show you that Slack needs either `slackApi` or `slackOAuth2Api` credentials.

### 2. Get the credential type schema:

```
Tool: get_credential_type_info
Arguments: {
  "type": "slackApi"
}
```

This returns the schema showing you need an `accessToken` field.

### 3. Create the credential:

```
Tool: n8n_create_credential
Arguments: {
  "name": "My Slack Workspace",
  "type": "slackApi",
  "data": {
    "accessToken": "xoxb-your-slack-bot-token"
  }
}
```

### 4. Test the credential:

```
Tool: n8n_test_credential
Arguments: {
  "id": "credential-id-from-step-3"
}
```

### 5. Use in a workflow:

When creating a workflow with a Slack node, reference the credential:

```json
{
  "nodes": [
    {
      "parameters": {
        "channel": "#general",
        "text": "Hello from n8n!"
      },
      "id": "slack-node-id",
      "name": "Slack",
      "type": "n8n-nodes-base.slack",
      "typeVersion": 2,
      "position": [250, 300],
      "credentials": {
        "slackApi": {
          "id": "credential-id-from-step-3",
          "name": "My Slack Workspace"
        }
      }
    }
  ]
}
```

## Common Credential Types

### HTTP Basic Auth
```json
{
  "name": "My API Basic Auth",
  "type": "httpBasicAuth",
  "data": {
    "user": "username",
    "password": "password"
  }
}
```

### HTTP Header Auth (API Key)
```json
{
  "name": "My API Key",
  "type": "httpHeaderAuth",
  "data": {
    "name": "Authorization",
    "value": "Bearer your-api-key"
  }
}
```

### OpenAI API
```json
{
  "name": "OpenAI API Key",
  "type": "openAiApi",
  "data": {
    "apiKey": "sk-..."
  }
}
```

## Listing and Managing Credentials

### List all credentials:
```
Tool: n8n_list_credentials
Arguments: {
  "limit": 20
}
```

### Update a credential:
```
Tool: n8n_update_credential
Arguments: {
  "id": "credential-id",
  "name": "Updated Name",
  "data": {
    "accessToken": "new-token"
  }
}
```

### Delete a credential:
```
Tool: n8n_delete_credential
Arguments: {
  "id": "credential-id"
}
```

## Security Notes

1. **Never log credential data** - The MCP tools are designed to never return actual credential values
2. **Use environment variables** - Store sensitive tokens in environment variables when possible
3. **Test before use** - Always test credentials with `n8n_test_credential` before using in production
4. **Limit access** - Use `nodesAccess` to restrict which nodes can use a credential
5. **Regular rotation** - Update credentials regularly using `n8n_update_credential`

## Discovering Credential Types

To see all available credential types in your n8n instance:

```
Tool: list_credential_types
Arguments: {}
```

This will show you all credential types that are actually used by nodes in your database, along with how many nodes use each type.