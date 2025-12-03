// Name: Abdul-Salam Bdaiwi
// Student ID: bdaiwia
// This file implements the code generation agent

import { MCPClient } from '../mcp/mcpClient.js';
import { trackApiCall } from '../utils/modelTracker.js';
import Anthropic from '@anthropic-ai/sdk';

/**
 * Coder Agent - generates code based on requirements
 * Responsibilities:
 * - Generate executable code from requirements
 * - Ensure code meets all specified requirements
 * - Write clean, runnable code
 */
export class CoderAgent {
  constructor(apiKey) {
    // Create MCP client for communication
    this.mcpClient = new MCPClient('coder', {
      role: 'code_generator',
      description: 'Generates code from requirements'
    });

    // Initialize Anthropic client
    this.anthropic = new Anthropic({
      apiKey: apiKey
    });

    this.modelName = 'claude-3-haiku-20240307';
  }

  /**
   * Generate code from requirements
   * @param {Object} requirements - Requirements object
   * @returns {string} Generated code
   */
  async generateCode(requirements) {
    try {
      console.log('Coder: Generating code...');

      // Use Claude to generate code
      const message = await this.anthropic.messages.create({
        model: this.modelName,
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: `You are a software developer. Generate Python code based on these requirements:

${requirements.parsed}

Important:
- Write complete, runnable Python code
- Include all necessary imports
- Add comments explaining the code
- Make sure every requirement is satisfied
- Use simple, clean code structure
- Include a main function or example usage at the bottom

Provide ONLY the Python code, no explanations before or after.`
        }]
      });

      // Track the API usage
      const tokensUsed = message.usage.input_tokens + message.usage.output_tokens;
      trackApiCall(this.modelName, tokensUsed);

      const code = message.content[0].text;

      console.log('Coder: Code generated successfully');

      return code;

    } catch (error) {
      console.error('Coder: Error generating code:', error.message);
      throw error;
    }
  }

  /**
   * Start listening for messages from coordinator
   */
  async listen() {
    console.log('Coder: Listening for requests...');

    // In a real implementation, this would be event-driven
    // For this project, we'll have the coordinator call the agent directly
  }

  /**
   * Process a code generation request
   * @param {Object} request - Request from coordinator
   */
  async processRequest(request) {
    if (request.type === 'generate_code') {
      const code = await this.generateCode(request.requirements);

      // Send code back to coordinator
      this.mcpClient.send('coordinator', {
        type: 'code_ready',
        code: code
      });
    }
  }
}
