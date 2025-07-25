# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

n8n-mcp is a comprehensive documentation and knowledge server that provides AI assistants with complete access to n8n node information through the Model Context Protocol (MCP). It serves as a bridge between n8n's workflow automation platform and AI models, enabling them to understand and work with n8n nodes effectively.

**Key Details:**
- **npm Package**: `n8n-mcp` (current version: 2.7.10)
- **GitHub**: https://github.com/czlonkowski/n8n-mcp
- **Docker Image**: `ghcr.io/czlonkowski/n8n-mcp:latest`
- **License**: MIT License by Romuald Czlonkowski @ www.aiadvisors.pl/en

## 🚀 Quick Start Commands

```bash
# Essential Development Workflow
npm install          # Install dependencies
npm run build        # Compile TypeScript (ALWAYS required before running)
npm run rebuild      # Rebuild node database from n8n packages
npm run dev          # Build + rebuild + validate

# Running the Server
npm start            # Run in stdio mode (for Claude Desktop)
npm run start:http   # Run in HTTP mode for remote access
npx n8n-mcp         # Run from npm package

# Testing
npm test             # Run Jest tests
npm run typecheck    # TypeScript type checking
npm run validate     # Validate database integrity

# Quick Deployment
docker compose up -d # Start with Docker
```

## ✅ Latest Updates (v2.8.0)

### Update (v2.8.0) - Credential Management Support:
- ✅ **NEW: 9 credential management tools** - Full CRUD operations for n8n credentials
- ✅ **NEW: n8n_list_credentials** - List all credentials with metadata
- ✅ **NEW: n8n_create_credential** - Create credentials programmatically
- ✅ **NEW: n8n_update_credential** - Update existing credentials
- ✅ **NEW: n8n_test_credential** - Test credential connectivity
- ✅ **NEW: get_credential_type_info** - Get credential schema information
- ✅ **NEW: list_credential_types** - List all available credential types
- ✅ **NEW: get_node_credential_requirements** - Get credential requirements for any node
- ✅ **Security-first design** - Credential data is never exposed in responses
- ✅ **Complete lifecycle** - Create, configure, test, and manage credentials via API
- ✅ **Schema discovery** - Learn what fields each credential type requires
- ✅ **Node integration** - Understand which credentials a node needs

## ✅ Previous Updates

### Update (v2.7.6) - Trust Proxy Support for Correct IP Logging:
- ✅ **NEW: TRUST_PROXY support** - Log real client IPs when behind reverse proxy
- ✅ **FIXED: Issue #19** - Docker internal IPs no longer logged when proxy configured
- ✅ **ENHANCED: HTTP deployment** - Better nginx/proxy configuration documentation
- ✅ **FLEXIBLE: Proxy hop configuration** - Support for single or multiple proxy layers
- ✅ **BACKWARD COMPATIBLE**: Defaults to current behavior when not configured

### Update (v2.7.5) - AUTH_TOKEN_FILE Support & Known Issues:
- ✅ **NEW: AUTH_TOKEN_FILE support** - Read authentication token from file (Docker secrets compatible)
- ✅ **ADDED: Known Issues section** - Documented Claude Desktop container duplication bug
- ✅ **ENHANCED: Authentication flexibility** - Support both AUTH_TOKEN and AUTH_TOKEN_FILE variables
- ✅ **FIXED: Issue #16** - AUTH_TOKEN_FILE now properly implemented as documented
- ✅ **DOCKER SECRETS**: Seamlessly integrate with Docker secrets management
- ✅ **BACKWARD COMPATIBLE**: AUTH_TOKEN continues to work as before

### Update (v2.7.4) - Self-Documenting MCP Tools:
- ✅ **RENAMED: start_here_workflow_guide → tools_documentation** - More descriptive name
- ✅ **NEW: Depth parameter** - Control documentation detail level with "essentials" or "full"
- ✅ **NEW: Per-tool documentation** - Get help for any specific tool by name
- ✅ **Concise by default** - Essential info only, unless full depth requested
- ✅ **LLM-friendly format** - Plain text, not JSON for better readability
- ✅ **Two-tier documentation**:
  - **Essentials**: Brief description, key parameters, example, performance, 2-3 tips
  - **Full**: Complete documentation with all parameters, examples, use cases, best practices, pitfalls
- ✅ **Quick reference** - Call without parameters for immediate help
- ✅ **8 documented tools** - Comprehensive docs for most commonly used tools
- ✅ **Performance guidance** - Clear indication of which tools are fast vs slow
- ✅ **Error prevention** - Common pitfalls documented upfront

### Update (v2.7.0) - Diff-Based Workflow Editing with Transactional Updates:
- ✅ **NEW: n8n_update_partial_workflow tool** - Update workflows using diff operations for precise, incremental changes
- ✅ **RENAMED: n8n_update_workflow → n8n_update_full_workflow** - Clarifies that it replaces the entire workflow
- ✅ **NEW: WorkflowDiffEngine** - Applies targeted edits without sending full workflow JSON
- ✅ **80-90% token savings** - Only send the changes, not the entire workflow
- ✅ **13 diff operations** - addNode, removeNode, updateNode, moveNode, enableNode, disableNode, addConnection, removeConnection, updateConnection, updateSettings, updateName, addTag, removeTag
- ✅ **Smart node references** - Use either node ID or name for operations
- ✅ **Transaction safety** - Validates all operations before applying any changes
- ✅ **Validation-only mode** - Test your diff operations without applying them
- ✅ **Comprehensive test coverage** - All operations and edge cases tested
- ✅ **Example guide** - See [workflow-diff-examples.md](./docs/workflow-diff-examples.md) for usage patterns
- ✅ **FIXED: MCP validation error** - Simplified schema to fix "additional properties" error in Claude Desktop
- ✅ **FIXED: n8n API validation** - Updated cleanWorkflowForUpdate to remove all read-only fields
- ✅ **FIXED: Claude Desktop compatibility** - Added additionalProperties: true to handle extra metadata from Claude Desktop
- ✅ **NEW: Transactional Updates** - Two-pass processing allows adding nodes and connections in any order
- ✅ **Operation Limit** - Maximum 5 operations per request ensures reliability
- ✅ **Order Independence** - Add connections before nodes - engine handles dependencies automatically

### Update (v2.6.3) - n8n Instance Workflow Validation:
- ✅ **NEW: n8n_validate_workflow tool** - Validate workflows directly from n8n instance by ID
- ✅ **Fetches and validates** - Retrieves workflow from n8n API and runs comprehensive validation
- ✅ **Same validation logic** - Uses existing WorkflowValidator for consistency
- ✅ **Full validation options** - Supports all validation profiles and options
- ✅ **Integrated workflow** - Part of complete lifecycle: discover → build → validate → deploy → execute
- ✅ **No JSON needed** - AI agents can validate by just providing workflow ID

### Update (v2.6.2) - Enhanced Workflow Creation Validation:
- ✅ **NEW: Node type validation** - Verifies node types actually exist in n8n
- ✅ **FIXED: nodes-base prefix detection** - Now catches `nodes-base.webhook` BEFORE database lookup
- ✅ **NEW: Smart suggestions** - Detects `nodes-base.webhook` and suggests `n8n-nodes-base.webhook`
- ✅ **NEW: Common mistake detection** - Catches missing package prefixes (e.g., `webhook` → `n8n-nodes-base.webhook`)
- ✅ **NEW: Minimum viable workflow validation** - Prevents single-node workflows (except webhooks)
- ✅ **NEW: Empty connection detection** - Catches multi-node workflows with no connections
- ✅ **Enhanced error messages** - Clear guidance on proper workflow structure
- ✅ **Connection examples** - Shows correct format: `connections: { "Node Name": { "main": [[{ "node": "Target", "type": "main", "index": 0 }]] } }`
- ✅ **Helper functions** - `getWorkflowStructureExample()` and `getWorkflowFixSuggestions()`
- ✅ **Prevents broken workflows** - Like single webhook nodes with empty connections that show as question marks
- ✅ **Reinforces best practices** - Use node NAMES (not IDs) in connections

### Update (v2.6.1) - Enhanced typeVersion Validation:
- ✅ **NEW: typeVersion validation** - Workflow validator now enforces typeVersion on all versioned nodes
- ✅ **Catches missing typeVersion** - Returns error with correct version to use
- ✅ **Warns on outdated versions** - Alerts when using older node versions
- ✅ **Prevents invalid versions** - Errors on versions that exceed maximum supported
- ✅ Helps AI agents avoid common workflow creation mistakes
- ✅ Ensures workflows use compatible node versions before deployment

### Update (v2.6.0) - n8n Management Tools Integration:
- ✅ **NEW: 14 n8n management tools** - Create, update, execute workflows via API
- ✅ **NEW: n8n_create_workflow** - Create workflows programmatically
- ✅ **NEW: n8n_update_workflow** - Update existing workflows
- ✅ **NEW: n8n_trigger_webhook_workflow** - Execute workflows via webhooks
- ✅ **NEW: n8n_list_executions** - Monitor workflow executions
- ✅ **NEW: n8n_health_check** - Check n8n instance connectivity
- ✅ Integrated n8n-manager-for-ai-agents functionality
- ✅ Optional feature - only enabled when N8N_API_URL and N8N_API_KEY configured
- ✅ Complete workflow lifecycle: discover → build → validate → deploy → execute
- ✅ Smart error handling for API limitations (activation, direct execution)
- ✅ Conditional tool registration based on configuration

## ✅ Previous Updates

For a complete history of all updates from v2.0.0 to v2.5.1, please see [CHANGELOG.md](./CHANGELOG.md).

Key highlights from recent versions:
- **v2.5.x**: AI tool support enhancements, workflow validation, expression validation
- **v2.4.x**: AI-optimized tools, workflow templates, enhanced validation profiles
- **v2.3.x**: Universal Node.js compatibility, HTTP server fixes, dependency management
- ✅ Maintains full functionality with either adapter

## ✅ Previous Achievements (v2.2)

**The major refactor has been successfully completed based on IMPLEMENTATION_PLAN.md v2.2**

### Achieved Goals:
- ✅ Fixed property/operation extraction (452/458 nodes have properties)
- ✅ Added AI tool detection (35 AI tools detected)
- ✅ Full support for @n8n/n8n-nodes-langchain package
- ✅ Proper VersionedNodeType handling
- ✅ Fixed documentation mapping issues

### Current Architecture:
```
src/
├── loaders/
│   └── node-loader.ts         # NPM package loader for both packages
├── parsers/
│   ├── node-parser.ts         # Enhanced parser with version support
│   └── property-extractor.ts  # Dedicated property/operation extraction
├── mappers/
│   └── docs-mapper.ts         # Documentation mapping with fixes
├── database/
│   ├── schema.sql             # SQLite schema
│   ├── node-repository.ts     # Data access layer
│   └── database-adapter.ts    # Universal database adapter (NEW in v2.3)
├── services/
│   ├── property-filter.ts     # Filters properties to essentials (NEW in v2.4)
│   ├── example-generator.ts   # Generates working examples (NEW in v2.4)
│   ├── task-templates.ts      # Pre-configured node settings (NEW in v2.4)
│   ├── config-validator.ts    # Configuration validation (NEW in v2.4)
│   ├── enhanced-config-validator.ts # Operation-aware validation (NEW in v2.4.2)
│   ├── node-specific-validators.ts  # Node-specific validation logic (NEW in v2.4.2)
│   ├── property-dependencies.ts # Dependency analysis (NEW in v2.4)
│   ├── expression-validator.ts # n8n expression syntax validation (NEW in v2.5.0)
│   └── workflow-validator.ts  # Complete workflow validation (NEW in v2.5.0)
├── templates/
│   ├── template-fetcher.ts    # Fetches templates from n8n.io API (NEW in v2.4.1)
│   ├── template-repository.ts # Template database operations (NEW in v2.4.1)
│   └── template-service.ts    # Template business logic (NEW in v2.4.1)
├── scripts/
│   ├── rebuild.ts             # Database rebuild with validation
│   ├── validate.ts            # Node validation
│   ├── test-nodes.ts          # Critical node tests
│   ├── test-essentials.ts     # Test new essentials tools (NEW in v2.4)
│   ├── test-enhanced-validation.ts # Test enhanced validation (NEW in v2.4.2)
│   ├── test-workflow-validation.ts # Test workflow validation (NEW in v2.5.0)
│   ├── test-ai-workflow-validation.ts # Test AI workflow validation (NEW in v2.5.1)
│   ├── test-mcp-tools.ts      # Test MCP tool enhancements (NEW in v2.5.1)
│   ├── test-n8n-validate-workflow.ts # Test n8n_validate_workflow tool (NEW in v2.6.3)
│   ├── test-typeversion-validation.ts # Test typeVersion validation (NEW in v2.6.1)
│   ├── test-workflow-diff.ts  # Test workflow diff engine (NEW in v2.7.0)
│   ├── test-tools-documentation.ts # Test tools documentation (NEW in v2.7.3)
│   ├── fetch-templates.ts     # Fetch workflow templates from n8n.io (NEW in v2.4.1)
│   └── test-templates.ts      # Test template functionality (NEW in v2.4.1)
├── mcp/
│   ├── server.ts              # MCP server with enhanced tools
│   ├── tools.ts               # Tool definitions including new essentials
│   ├── tools-documentation.ts # Tool documentation system (NEW in v2.7.3)
│   └── index.ts               # Main entry point with mode selection
├── utils/
│   ├── console-manager.ts     # Console output isolation (NEW in v2.3.1)
│   └── logger.ts              # Logging utility with HTTP awareness
├── http-server-single-session.ts  # Single-session HTTP server (NEW in v2.3.1)
├── mcp-engine.ts              # Clean API for service integration (NEW in v2.3.1)
└── index.ts                   # Library exports
```

### Key Metrics:
- 525 nodes successfully loaded (100%) - Updated to n8n v1.97.1
- 520 nodes with properties (99%)
- 334 nodes with operations (63.6%)
- 457 nodes with documentation (87%)
- 263 AI-capable tools detected (major increase)
- All critical nodes pass validation

## Key Commands

```bash
# Development
npm install          # Install dependencies
npm run build        # Build TypeScript (required before running)
npm run dev          # Run in development mode with auto-reload
npm test             # Run Jest tests
npm run typecheck    # TypeScript type checking
npm run lint         # Check TypeScript types (alias for typecheck)

# Core Commands:
npm run rebuild      # Rebuild node database
npm run rebuild:optimized  # Build database with embedded source code
npm run validate     # Validate critical nodes
npm run test-nodes   # Test critical node properties/operations

# Template Commands:
npm run fetch:templates   # Fetch workflow templates from n8n.io (manual)
npm run fetch:templates:robust  # Robust template fetching with retries
npm run test:templates    # Test template functionality

# Test Commands:
npm run test:essentials     # Test new essentials tools
npm run test:enhanced-validation  # Test enhanced validation
npm run test:ai-workflow-validation  # Test AI workflow validation
npm run test:mcp-tools      # Test MCP tool enhancements
npm run test:single-session # Test single session HTTP
npm run test:template-validation  # Test template validation
npm run test:n8n-manager   # Test n8n management tools integration
npm run test:n8n-validate-workflow  # Test n8n_validate_workflow tool
npm run test:typeversion-validation  # Test typeVersion validation
npm run test:workflow-diff  # Test workflow diff engine
npm run test:tools-documentation  # Test MCP tools documentation system
npm run test:credentials    # Test credential management functionality

# Workflow Validation Commands:
npm run test:workflow-validation   # Test workflow validation features

# Dependency Update Commands:
npm run update:n8n:check  # Check for n8n updates (dry run)
npm run update:n8n        # Update n8n packages to latest versions

# HTTP Server Commands:
npm run start:http   # Start server in HTTP mode
npm run start:http:fixed    # Start with fixed HTTP implementation
npm run start:http:legacy   # Start with legacy HTTP server
npm run http         # Build and start HTTP server
npm run dev:http     # HTTP server with auto-reload

# Legacy Commands (deprecated):
npm run db:rebuild   # Old rebuild command
npm run db:init      # Initialize empty database
npm run docs:rebuild # Rebuild documentation from TypeScript source

# Production
npm start            # Run built application (stdio mode)
npm run start:http   # Run in HTTP mode for remote access

# Docker Commands:
docker compose up -d        # Start with Docker Compose
docker compose logs -f      # View logs
docker compose down         # Stop containers
docker compose down -v      # Stop and remove volumes
./scripts/test-docker.sh    # Test Docker deployment

```

## Docker Deployment

The project includes ultra-optimized Docker support with NO n8n dependencies at runtime:

### 🚀 Key Optimization: Runtime-Only Dependencies
**Important**: Since the database is always pre-built before deployment, the Docker image contains NO n8n dependencies. This results in:
- **82% smaller images** (~280MB vs ~1.5GB)
- **10x faster builds** (~1-2 minutes vs ~12 minutes)
- **No n8n version conflicts** at runtime
- **Minimal attack surface** for security

### Quick Start with Docker
```bash
# IMPORTANT: Rebuild database first (requires n8n locally)
npm run rebuild

# Create .env file with auth token
echo "AUTH_TOKEN=$(openssl rand -base64 32)" > .env

# Start the server
docker compose up -d

# Check health
curl http://localhost:3000/health
```

### Docker Architecture
The Docker image contains ONLY these runtime dependencies:
- `@modelcontextprotocol/sdk` - MCP protocol implementation
- `better-sqlite3` / `sql.js` - SQLite database access
- `express` - HTTP server mode
- `dotenv` - Environment configuration

### Docker Features
- **Ultra-optimized size** (~280MB runtime-only)
- **No n8n dependencies** in production image
- **Pre-built database** required (nodes.db)
- **BuildKit optimizations** for fast builds
- **Non-root user** execution for security
- **Health checks** built into the image

### Docker Images
- `ghcr.io/czlonkowski/n8n-mcp:latest` - Runtime-only production image
- Multi-architecture support (amd64, arm64)
- ~280MB compressed size (82% smaller!)

### Docker Development
```bash
# Use BuildKit compose for development
COMPOSE_DOCKER_CLI_BUILD=1 docker-compose -f docker-compose.buildkit.yml up

# Build with optimizations
./scripts/build-optimized.sh

# Run tests
./scripts/test-docker.sh
```

For detailed Docker documentation, see [DOCKER_README.md](./DOCKER_README.md).

## High-Level Architecture

The project implements MCP (Model Context Protocol) to expose n8n node documentation, source code, and examples to AI assistants. Key architectural components:

### Core Services
- **NodeDocumentationService** (`src/services/node-documentation-service.ts`): Main database service using SQLite with FTS5 for fast searching
- **MCP Server** (`src/mcp/server.ts`): Implements MCP protocol with tools for querying n8n nodes
- **Node Source Extractor** (`src/utils/node-source-extractor.ts`): Extracts node implementations from n8n packages
- **Enhanced Documentation Fetcher** (`src/utils/enhanced-documentation-fetcher.ts`): Fetches and parses official n8n documentation

### MCP Tools Available
- `list_nodes` - List all available n8n nodes with filtering
- `get_node_info` - Get comprehensive information about a specific node (now includes aiToolCapabilities)
- `get_node_essentials` - **NEW** Get only essential properties (10-20) with examples (95% smaller)
- `get_node_as_tool_info` - **NEW v2.5.1** Get specific information about using ANY node as an AI tool
- `search_nodes` - Full-text search across all node documentation
- `search_node_properties` - **NEW** Search for specific properties within a node
- `get_node_for_task` - **NEW** Get pre-configured node settings for common tasks
- `list_tasks` - **NEW** List all available task templates
- `validate_node_operation` - **NEW v2.4.2** Verify node configuration with operation awareness and profiles
- `validate_node_minimal` - **NEW v2.4.2** Quick validation for just required fields
- `validate_workflow` - **NEW v2.5.0** Validate entire workflows before deployment (now validates ai_tool connections)
- `validate_workflow_connections` - **NEW v2.5.0** Check workflow structure and connections
- `validate_workflow_expressions` - **NEW v2.5.0** Validate all n8n expressions in a workflow
- `get_property_dependencies` - **NEW** Analyze property dependencies and visibility conditions
- `list_ai_tools` - List all AI-capable nodes (now includes usage guidance)
- `get_node_documentation` - Get parsed documentation from n8n-docs
- `get_database_statistics` - Get database usage statistics and metrics
- `list_node_templates` - **NEW** Find workflow templates using specific nodes
- `get_template` - **NEW** Get complete workflow JSON for import
- `search_templates` - **NEW** Search templates by keywords
- `get_templates_for_task` - **NEW** Get curated templates for common tasks
- `tools_documentation` - **NEW v2.7.3** Get comprehensive documentation for MCP tools

### n8n Management Tools (NEW v2.6.0 - Requires API Configuration)
These tools are only available when N8N_API_URL and N8N_API_KEY are configured:

#### Workflow Management
- `n8n_create_workflow` - Create new workflows with nodes and connections
- `n8n_get_workflow` - Get complete workflow by ID
- `n8n_get_workflow_details` - Get workflow with execution statistics
- `n8n_get_workflow_structure` - Get simplified workflow structure
- `n8n_get_workflow_minimal` - Get minimal workflow info
- `n8n_update_full_workflow` - Update existing workflows (complete replacement)
- `n8n_update_partial_workflow` - **NEW v2.7.0** Update workflows using diff operations
- `n8n_delete_workflow` - Delete workflows permanently
- `n8n_list_workflows` - List workflows with filtering
- `n8n_validate_workflow` - **NEW v2.6.3** Validate workflow from n8n instance by ID

#### Execution Management
- `n8n_trigger_webhook_workflow` - Trigger workflows via webhook URL
- `n8n_get_execution` - Get execution details by ID
- `n8n_list_executions` - List executions with status filtering
- `n8n_delete_execution` - Delete execution records

#### System Tools
- `n8n_health_check` - Check n8n API connectivity and features
- `n8n_list_available_tools` - List all available management tools

#### Credential Management Tools (NEW v2.8.0)
- `n8n_list_credentials` - List all credentials in n8n
- `n8n_get_credential` - Get credential details (metadata only)
- `n8n_create_credential` - Create new credentials
- `n8n_update_credential` - Update existing credentials
- `n8n_delete_credential` - Delete credentials
- `n8n_test_credential` - Test credential connectivity
- `get_credential_type_info` - Get credential type schema
- `list_credential_types` - List available credential types
- `get_node_credential_requirements` - Get node credential requirements

### Database Structure
Uses SQLite with enhanced schema:
- **nodes** table: Core node information with FTS5 indexing
- **node_documentation**: Parsed markdown documentation
- **node_examples**: Generated workflow examples
- **node_source_code**: Complete TypeScript/JavaScript implementations

## Important Development Notes

### Initial Setup Requirements

1. **Clone n8n-docs**: `git clone https://github.com/n8n-io/n8n-docs.git ../n8n-docs`
2. **Install Dependencies**: `npm install`
3. **Build**: `npm run build`
4. **Rebuild Database**: `npm run rebuild`
5. **Validate**: `npm run test-nodes`

### Key Technical Decisions (v2.3)

1. **Database Adapter Implementation**:
   - Created `DatabaseAdapter` interface to abstract database operations
   - Implemented `BetterSQLiteAdapter` and `SQLJSAdapter` classes
   - Used factory pattern in `createDatabaseAdapter()` for automatic selection
   - Added persistence layer for sql.js with debounced saves (100ms)

2. **Compatibility Strategy**:
   - Primary: Try better-sqlite3 first for performance
   - Fallback: Catch native module errors and switch to sql.js
   - Detection: Check for NODE_MODULE_VERSION errors specifically
   - Logging: Clear messages about which adapter is active

3. **Performance Considerations**:
   - better-sqlite3: ~10-50x faster for most operations
   - sql.js: ~2-5x slower but acceptable for this use case
   - Auto-save: 100ms debounce prevents excessive disk writes with sql.js
   - Memory: sql.js uses more memory but manageable for our dataset size

### Node.js Version Compatibility

The project now features automatic database adapter fallback for universal Node.js compatibility:

1. **Primary adapter**: Uses `better-sqlite3` for optimal performance when available
2. **Fallback adapter**: Automatically switches to `sql.js` (pure JavaScript) if:
   - Native modules fail to load
   - Node.js version mismatch detected
   - Running in Claude Desktop or other restricted environments

This means the project works with ANY Node.js version without manual intervention. The adapter selection is automatic and transparent.

### Implementation Status
- ✅ Property/operation extraction for 98.7% of nodes
- ✅ Support for both n8n-nodes-base and @n8n/n8n-nodes-langchain
- ✅ AI tool detection (35 tools with usableAsTool property)
- ✅ Versioned node support (HTTPRequest, Code, etc.)
- ✅ Documentation coverage for 88.6% of nodes
- ⏳ Version history tracking (deferred - only current version)
- ⏳ Workflow examples (deferred - using documentation)

### Testing Workflow
```bash
npm run build        # Always build first
npm test             # Run all tests
npm run typecheck    # Verify TypeScript types

# Test specific features when working on them:
npm run test:workflow-diff       # When modifying diff engine
npm run test:workflow-validation # When changing validation logic
npm run test:essentials         # When updating essential properties
npm run test:n8n-manager        # When modifying n8n API integration
npm run test:single-session     # When changing HTTP server
```

### Docker Development
```bash
# Local development with stdio
docker-compose -f docker-compose.local.yml up

# HTTP server mode
docker-compose -f docker-compose.http.yml up
```

### Authentication (HTTP mode)
When running in HTTP mode, use Bearer token authentication:
```
Authorization: Bearer your-auth-token
```

## Architecture Patterns

### Service Layer Pattern
All major functionality is implemented as services in `src/services/`. When adding new features:
1. Create a service class with clear responsibilities
2. Use dependency injection where appropriate
3. Implement proper error handling with custom error types
4. Add comprehensive logging using the logger utility

### MCP Tool Implementation
When adding new MCP tools:
1. Define the tool in `src/mcp/tools.ts`
2. Implement handler in `src/mcp/server.ts`
3. Add proper input validation
4. Return structured responses matching MCP expectations

### Database Access Pattern
- Use prepared statements for all queries
- Implement proper transaction handling
- Use FTS5 for text searching
- Cache frequently accessed data in memory

### Database Adapter Pattern (NEW in v2.3)
The project uses a database adapter pattern for universal compatibility:
- **Primary adapter**: `better-sqlite3` - Native SQLite bindings for optimal performance
- **Fallback adapter**: `sql.js` - Pure JavaScript implementation for compatibility
- **Automatic selection**: The system detects and handles version mismatches automatically
- **Unified interface**: Both adapters implement the same `DatabaseAdapter` interface
- **Transparent operation**: Application code doesn't need to know which adapter is active

## Environment Configuration

Required environment variables (see `.env.example`):
```
# Server Configuration
NODE_ENV=development
PORT=3000
AUTH_TOKEN=your-secure-token  # Generate with: openssl rand -base64 32
AUTH_TOKEN_FILE=/path/to/token  # Alternative: read token from file (Docker secrets)

# Trust proxy for correct IP logging (optional)
# Set to 1 when behind a reverse proxy (Nginx, etc.)
TRUST_PROXY=0

# MCP Configuration  
MCP_SERVER_NAME=n8n-documentation-mcp
MCP_SERVER_VERSION=1.0.0

# Logging
LOG_LEVEL=info

# Database Configuration (optional)
NODE_DB_PATH=./data/nodes.db
REBUILD_ON_START=false

# n8n API Configuration (optional - enables management tools)
N8N_API_URL=http://localhost:5678
N8N_API_KEY=your-api-key
N8N_API_TIMEOUT=30000
N8N_API_MAX_RETRIES=3
```

## Security Best Practices

When working with this codebase:
1. **Never commit credentials** - Use environment variables exclusively
2. **Generate strong tokens**: `openssl rand -base64 32`
3. **Run security audits**: `npm audit` regularly
4. **Use least-privilege** API keys when configuring n8n integration
5. **Docker runs non-root** - Containers use uid:gid 1000:1000 for security
6. **Rotate credentials** immediately if exposed

## License

This project is licensed under the MIT License. Created by Romuald Czlonkowski @ www.aiadvisors.pl/en.
- ✅ Free for any use (personal, commercial, etc.)
- ✅ Modifications and distribution allowed
- ✅ Can be included in commercial products
- ✅ Can be hosted as a service

Attribution is appreciated but not required. See [LICENSE](LICENSE) and [ATTRIBUTION.md](ATTRIBUTION.md) for details.

## HTTP Remote Deployment (v2.3.0)

### ✅ HTTP Server Implementation Complete

The project now includes a simplified HTTP server mode for remote deployments:
- **Single-user design**: Stateless architecture for private deployments
- **Simple token auth**: Bearer token authentication
- **MCP-compatible**: Works with mcp-remote adapter for Claude Desktop
- **Easy deployment**: Minimal configuration required

### Quick Start
```bash
# Server setup
export MCP_MODE=http
export AUTH_TOKEN=$(openssl rand -base64 32)
npm run start:http

# Client setup (Claude Desktop config)
{
  "mcpServers": {
    "n8n-remote": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/mcp-remote@latest",
        "connect",
        "https://your-server.com/mcp"
      ],
      "env": {
        "MCP_AUTH_TOKEN": "your-auth-token"
      }
    }
  }
}
```

### Available Scripts
- `npm run start:http` - Start in HTTP mode
- `npm run http` - Build and start HTTP server
- `npm run dev:http` - Development mode with auto-reload
- `./scripts/deploy-http.sh` - Deployment helper script

For detailed deployment instructions, see [HTTP Deployment Guide](./docs/HTTP_DEPLOYMENT.md).

## Recent Problem Solutions

### MCP HTTP Server Errors (Solved in v2.3.2)
**Problem**: Two critical errors prevented the HTTP server from working:
1. "stream is not readable" - Express.json() middleware consumed the request stream
2. "Server not initialized" - StreamableHTTPServerTransport initialization issues

**Solution**: Two-phase fix:
1. Removed body parsing middleware to preserve raw stream
2. Created direct JSON-RPC implementation bypassing StreamableHTTPServerTransport

**Technical Details**:
- `src/http-server-single-session.ts` - Single-session implementation (partial fix)
- `src/http-server.ts` - Direct JSON-RPC implementation (complete fix)
- `src/utils/console-manager.ts` - Console output isolation
- Use `USE_FIXED_HTTP=true` to enable the fixed implementation

### SQLite Version Mismatch (Solved in v2.3)
**Problem**: Claude Desktop bundles Node.js v16.19.1, causing NODE_MODULE_VERSION errors with better-sqlite3 compiled for different versions.

**Solution**: Implemented dual-adapter system:
1. Database adapter abstraction layer
2. Automatic fallback from better-sqlite3 to sql.js
3. Transparent operation regardless of Node.js version
4. No manual configuration required

**Technical Details**:
- `src/database/database-adapter.ts` - Adapter interface and implementations
- `createDatabaseAdapter()` - Factory function with automatic selection
- Modified all database operations to use adapter interface
- Added sql.js with persistence support

### Property Extraction Issues (Solved in v2.2)
**Problem**: Many nodes had empty properties/operations arrays.

**Solution**: Created dedicated `PropertyExtractor` class that handles:
1. Instance-level property extraction
2. Versioned node support
3. Both programmatic and declarative styles
4. Complex nested property structures

### Dependency Update Issues (Solved in v2.3.3)
**Problem**: n8n packages have interdependent version requirements. Updating them independently causes version mismatches.

**Solution**: Implemented smart dependency update system:
1. Check n8n's required dependency versions
2. Update all packages to match n8n's requirements
3. Validate database after updates
4. Fix node type references in validation script

**Technical Details**:
- `scripts/update-n8n-deps.js` - Smart dependency updater
- `.github/workflows/update-n8n-deps.yml` - GitHub Actions automation
- `renovate.json` - Alternative Renovate configuration
- Fixed validation to use 'nodes-base.httpRequest' format instead of 'httpRequest'

### AI-Optimized Tools (NEW in v2.4.0)
**Problem**: get_node_info returns 100KB+ of JSON with 200+ properties, making it nearly impossible for AI agents to efficiently configure nodes.

**Solution**: Created new tools that provide progressive disclosure of information:
1. `get_node_essentials` - Returns only the 10-20 most important properties
2. `search_node_properties` - Find specific properties without downloading everything

**Results**:
- 95% reduction in response size (100KB → 5KB)
- Only essential and commonly-used properties returned
- Includes working examples for immediate use
- AI agents can now configure nodes in seconds instead of minutes

**Technical Implementation**:
- `src/services/property-filter.ts` - Curated essential properties for 20+ nodes
- `src/services/example-generator.ts` - Working examples for common use cases
- Smart property search with relevance scoring
- Automatic fallback for unconfigured nodes

**Usage Recommendation**:
```bash
# OLD approach (avoid):
get_node_info("nodes-base.httpRequest")  # 100KB+ response

# NEW approach (prefer):
get_node_essentials("nodes-base.httpRequest")  # 5KB response with examples
```

### Task-Based Configuration (NEW in v2.4.0)
**Problem**: AI agents need to know exactly how to configure nodes for common tasks like "send email", "fetch API", or "update database".

**Solution**: Created task template system:
1. Pre-configured node settings for common tasks
2. Working examples with proper credentials structure
3. Task discovery via `list_tasks` tool

**Results**:
- Instant node configuration for common tasks
- No guessing about property values
- Production-ready configurations
- Covers 30+ common automation tasks

### Workflow Template Support (NEW in v2.4.1)
**Problem**: AI agents needed complete workflow examples to understand how nodes work together.

**Solution**: Integrated n8n.io workflow templates:
1. **10,000+ templates** available via MCP tools
2. Search by keywords or node usage
3. Get complete workflow JSON for import
4. Task-based template suggestions

**Technical Details**:
- Templates fetched from official n8n.io API
- Stored in SQLite with FTS5 search
- Includes metadata: categories, node counts, user ratings
- Smart caching to prevent API overload

### Enhanced Validation with Profiles (NEW in v2.4.2)
**Problem**: Different validation needs - quick checks during editing vs thorough validation before deployment.

**Solution**: Validation profiles with operation awareness:
1. **strict** - Full validation (deployment)
2. **standard** - Common issues only (default)
3. **minimal** - Just required fields
4. **quick** - Fast essential checks

**Results**:
- 90% faster validation for editing workflows
- Operation-specific validation rules
- Better error messages with fix suggestions
- Node-specific validators for complex nodes

### Complete Workflow Validation (NEW in v2.5.0)
**Problem**: Node validation wasn't enough - needed to validate entire workflows including connections, expressions, and dependencies.

**Solution**: Three-layer workflow validation:
1. **Structure validation** - Nodes, connections, dependencies
2. **Configuration validation** - All node configs with operation awareness  
3. **Expression validation** - n8n expression syntax checking

**Results**:
- Catch workflow errors before deployment
- Validate complex multi-node workflows
- Check all n8n expressions for syntax errors
- Ensure proper node connections and data flow

### AI Tool Support Enhancement (NEW in v2.5.1)
**Problem**: AI agents needed better guidance on using n8n nodes as AI tools and understanding tool connections.

**Solution**: Enhanced AI tool support:
1. New `get_node_as_tool_info` - Explains how ANY node can be used as an AI tool
2. Enhanced workflow validation for ai_tool node connections
3. Better documentation for AI tool usage patterns
4. Validation ensures proper tool node connections

**Results**:
- AI agents can now properly configure AI tool workflows
- Clear guidance on credential requirements for tools
- Validation catches common AI workflow mistakes
- Supports both native AI nodes and regular nodes as tools

### n8n Management Integration (NEW in v2.6.0)
**Problem**: AI agents could discover and validate workflows but couldn't deploy or execute them.

**Solution**: Integrated n8n-manager-for-ai-agents functionality:
1. **14 new management tools** when API configured
2. Complete workflow lifecycle support
3. Smart error handling for API limitations
4. Optional feature - only loads when configured

**Results**:
- Full workflow automation: discover → build → validate → deploy → execute
- Webhook-based workflow triggering
- Execution monitoring and management
- Backwards compatible - doesn't affect existing functionality

### Workflow Diff Engine (NEW in v2.7.0)
**Problem**: Updating workflows required sending the entire JSON (often 50KB+), wasting tokens and making it hard to see what changed.

**Solution**: Diff-based workflow updates:
1. **13 targeted operations** - Add, remove, update, move nodes/connections
2. **80-90% token savings** - Only send the changes
3. **Transactional updates** - All changes validated before applying
4. **Order independence** - Add connections before nodes exist

**Results**:
- Update a single node property without sending entire workflow
- Clear audit trail of what changed
- Safer updates with validation
- Works with any workflow size

### Credential Management (NEW in v2.8.0)
**Problem**: AI agents couldn't create or manage credentials needed for workflows to function.

**Solution**: Full credential management via MCP tools:
1. **9 new MCP tools** for credential operations
2. **Security-first design** - Never expose credential data
3. **Schema discovery** - Learn what each credential type needs
4. **Integration with nodes** - Understand credential requirements

**Results**:
- Complete workflow automation including credentials
- Programmatic credential creation and updates
- Test credentials before using in workflows
- Full lifecycle: create → configure → test → use → delete

## Known Issues

### Claude Desktop - Duplicate Container Bug
When adding n8n-mcp to Claude Desktop, you might see "Container with name '/n8n-mcp-container' already exists" error. This is a Claude Desktop bug where it doesn't properly clean up containers between sessions.

**Workaround**: Add this to your Claude Desktop config to use a unique container name each time:
```json
{
  "command": "docker",
  "args": [
    "run", 
    "--rm", 
    "--name", "n8n-mcp-{{timestamp}}",
    "-e", "AUTH_TOKEN=your-token",
    "ghcr.io/czlonkowski/n8n-mcp:latest"
  ]
}
```

Note: `{{timestamp}}` is not actually supported by Claude Desktop. The real workaround is to manually remove the container when this happens:
```bash
docker rm n8n-mcp-container
```

See [Issue #13](https://github.com/czlonkowski/n8n-mcp/issues/13) for more details.

## npm Publishing

To publish a new version to npm:

```bash
# 1. Update version in package.json
npm version patch  # or minor/major

# 2. Prepare the publish directory
npm run prepare:publish

# 3. Publish to npm (requires OTP)
cd npm-publish-temp
npm publish --otp=YOUR_OTP_CODE

# 4. Clean up
cd ..
rm -rf npm-publish-temp
```

The published package can then be used with npx:
```bash
npx n8n-mcp
```

## Future Enhancements

### Planned Features
- Historical version tracking for nodes
- Workflow template generation from examples
- Performance metrics and optimization suggestions
- Integration with n8n Cloud API for live data
- WebSocket support for real-time updates

### Contributing
Contributions are welcome! Please:
1. Follow the existing code patterns
2. Add tests for new functionality
3. Update documentation as needed
4. Run all tests before submitting PRs

For questions or support, please open an issue on GitHub.