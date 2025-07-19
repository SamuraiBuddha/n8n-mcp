#!/usr/bin/env node
import 'dotenv/config';
import { N8nApiClient } from '../services/n8n-api-client';
import { logger } from '../utils/logger';

/**
 * Test script for credential management functionality
 */

async function testCredentialOperations() {
  const apiUrl = process.env.N8N_API_URL;
  const apiKey = process.env.N8N_API_KEY;

  if (!apiUrl || !apiKey) {
    console.error('Error: N8N_API_URL and N8N_API_KEY environment variables are required');
    process.exit(1);
  }

  const client = new N8nApiClient({
    baseUrl: apiUrl,
    apiKey: apiKey,
  });

  console.log('Testing credential operations...\n');

  try {
    // 1. Test health check
    console.log('1. Testing API connectivity...');
    const health = await client.healthCheck();
    console.log('✅ API is healthy:', health.status);

    // 2. List existing credentials
    console.log('\n2. Listing existing credentials...');
    const credentialsList = await client.listCredentials({ limit: 10 });
    console.log(`✅ Found ${credentialsList.data.length} credentials`);
    
    if (credentialsList.data.length > 0) {
      console.log('Sample credentials:');
      credentialsList.data.slice(0, 3).forEach((cred: any) => {
        console.log(`  - ${cred.name} (${cred.type}) - ID: ${cred.id}`);
      });
    }

    // 3. Create a test credential
    console.log('\n3. Creating a test credential...');
    const testCredential = {
      name: 'Test HTTP Basic Auth',
      type: 'httpBasicAuth',
      data: {
        user: 'testuser',
        password: 'testpassword'
      }
    };

    try {
      const created = await client.createCredential(testCredential);
      console.log(`✅ Created credential: ${created.name} (ID: ${created.id})`);

      // 4. Get the created credential
      console.log('\n4. Getting credential details...');
      const retrieved = await client.getCredential(created.id!);
      console.log(`✅ Retrieved credential: ${retrieved.name}`);
      console.log(`   Type: ${retrieved.type}`);
      console.log(`   Created: ${retrieved.createdAt}`);

      // 5. Update the credential
      console.log('\n5. Updating credential...');
      const updated = await client.updateCredential(created.id!, {
        name: 'Updated Test HTTP Basic Auth',
        data: {
          user: 'updateduser',
          password: 'updatedpassword'
        }
      });
      console.log(`✅ Updated credential name to: ${updated.name}`);

      // 6. Test the credential
      console.log('\n6. Testing credential...');
      try {
        const testResult = await client.testCredential(created.id!);
        console.log(`✅ Credential test result: ${testResult.success ? 'SUCCESS' : 'FAILED'}`);
        if (testResult.message) {
          console.log(`   Message: ${testResult.message}`);
        }
      } catch (error: any) {
        console.log('⚠️  Credential test endpoint might not be available in this n8n version');
        console.log(`   Error: ${error.message}`);
      }

      // 7. Delete the test credential
      console.log('\n7. Deleting test credential...');
      await client.deleteCredential(created.id!);
      console.log('✅ Test credential deleted successfully');

    } catch (error: any) {
      console.error('❌ Error during credential operations:', error.message);
      if (error.response?.data) {
        console.error('   Details:', error.response.data);
      }
    }

    // 8. Test listing with different credential types
    console.log('\n8. Analyzing credential types in use...');
    const allCreds = await client.listCredentials({ limit: 100 });
    const typeCount: Record<string, number> = {};
    
    allCreds.data.forEach((cred: any) => {
      typeCount[cred.type] = (typeCount[cred.type] || 0) + 1;
    });

    console.log('Credential types in use:');
    Object.entries(typeCount).forEach(([type, count]) => {
      console.log(`  - ${type}: ${count} credential(s)`);
    });

  } catch (error: any) {
    console.error('❌ Test failed:', error.message);
    if (error.response?.data) {
      console.error('Response data:', error.response.data);
    }
    process.exit(1);
  }

  console.log('\n✅ All credential tests completed successfully!');
}

// Run the tests
testCredentialOperations().catch(console.error);