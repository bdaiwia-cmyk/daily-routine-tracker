// name: parsa salah
// student id: salahshp
// tester agent - generates test cases

import { MCPClient } from '../mcp/mcpClient.js';
import { trackApiCall } from '../utils/modelTracker.js';
import Anthropic from '@anthropic-ai/sdk';

// tester agent - makes test cases for the generated code
export class TesterAgent {
  constructor(apiKey) {
    // Create MCP client for communication
    this.mcpClient = new MCPClient('tester', {
      role: 'test_generator',
      description: 'Generates test cases for code'
    });

    // Initialize Anthropic client
    this.anthropic = new Anthropic({
      apiKey: apiKey
    });

    this.modelName = 'claude-3-haiku-20240307';
  }

  // generate test cases for the code
  async generateTests(code, requirements) {
    try {
      console.log('Tester: Generating test cases...');

      // Use Claude to generate tests
      const message = await this.anthropic.messages.create({
        model: this.modelName,
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: `You are a QA engineer. Generate comprehensive test cases for this Python code:

\`\`\`python
${code}
\`\`\`

Requirements that need to be tested:
${requirements.parsed}

Important:
- Create at least 10 test cases using Python's unittest framework
- Test all major functionality
- Include both positive and negative test cases
- Make sure tests are runnable
- Write clear test names that explain what is being tested
- Aim for at least 80% of tests to pass
- Include all necessary imports

Provide ONLY the Python test code, no explanations before or after.`
        }]
      });

      // Track the API usage
      const tokensUsed = message.usage.input_tokens + message.usage.output_tokens;
      trackApiCall(this.modelName, tokensUsed);

      const tests = message.content[0].text;

      console.log('Tester: Tests generated successfully');

      return tests;

    } catch (error) {
      console.error('Tester: Error generating tests:', error.message);
      throw error;
    }
  }

  // listen for messages from coordinator
  async listen() {
    console.log('Tester: Listening for requests...');

    // In a real implementation, this would be event-driven
    // For this project, we'll have the coordinator call the agent directly
  }

  // process test generation request
  async processRequest(request) {
    if (request.type === 'generate_tests') {
      const tests = await this.generateTests(request.code, request.requirements);

      // Send tests back to coordinator
      this.mcpClient.send('coordinator', {
        type: 'tests_ready',
        tests: tests
      });
    }
  }
}
