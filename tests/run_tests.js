// Name: Abdul-Salam Bdaiwi, Leah Kang, Parsa Salah
// Student ID: XXXXXXXX
// Simple test runner to verify system components

import { mcpServer } from '../src/mcp/mcpServer.js';
import { MCPClient } from '../src/mcp/mcpClient.js';
import { trackApiCall, getUsageStats, resetTracking } from '../src/utils/modelTracker.js';

console.log('Running system tests...\n');

// Test 1: MCP Server and Client
console.log('Test 1: MCP Server and Client Communication');
try {
  // Register two test agents
  const client1 = new MCPClient('test_agent_1', { role: 'test' });
  const client2 = new MCPClient('test_agent_2', { role: 'test' });

  // Send a message
  client1.send('test_agent_2', { text: 'Hello from agent 1' });

  // Receive the message
  const messages = client2.receive();

  if (messages.length === 1 && messages[0].content.text === 'Hello from agent 1') {
    console.log('✓ MCP communication working correctly\n');
  } else {
    console.log('✗ MCP communication failed\n');
  }
} catch (error) {
  console.log('✗ Error:', error.message, '\n');
}

// Test 2: Model Tracker
console.log('Test 2: Model Usage Tracking');
try {
  // Reset tracking
  resetTracking();

  // Track some API calls
  trackApiCall('test-model-1', 100);
  trackApiCall('test-model-1', 150);
  trackApiCall('test-model-2', 200);

  // Get stats
  const stats = getUsageStats();

  if (
    stats['test-model-1'].numApiCalls === 2 &&
    stats['test-model-1'].totalTokens === 250 &&
    stats['test-model-2'].numApiCalls === 1 &&
    stats['test-model-2'].totalTokens === 200
  ) {
    console.log('✓ Model tracking working correctly\n');
  } else {
    console.log('✗ Model tracking failed\n');
  }

  // Reset for next run
  resetTracking();
} catch (error) {
  console.log('✗ Error:', error.message, '\n');
}

// Test 3: File Structure
console.log('Test 3: Project Structure');
import fs from 'fs';
import path from 'path';

const requiredFiles = [
  'src/index.js',
  'src/orchestrator.js',
  'src/agents/coordinatorAgent.js',
  'src/agents/coderAgent.js',
  'src/agents/testerAgent.js',
  'src/mcp/mcpServer.js',
  'src/mcp/mcpClient.js',
  'src/utils/modelTracker.js',
  'public/index.html',
  'package.json',
  'README.md'
];

let allFilesExist = true;
for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.log(`✗ Missing file: ${file}`);
    allFilesExist = false;
  }
}

if (allFilesExist) {
  console.log('✓ All required files present\n');
} else {
  console.log('✗ Some files are missing\n');
}

console.log('Tests complete!');
console.log('\nTo run the full system:');
console.log('1. Make sure you have created a .env file with your API key');
console.log('2. Run: npm start');
console.log('3. Open http://localhost:3000 in your browser');
