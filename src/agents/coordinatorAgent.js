// Name: Parsa Salah
// Student ID: XXXXXXXX
// This file implements the coordinator agent that manages the workflow

import { MCPClient } from '../mcp/mcpClient.js';
import { trackApiCall } from '../utils/modelTracker.js';
import Anthropic from '@anthropic-ai/sdk';

/**
 * Coordinator Agent - manages the overall workflow
 * Responsibilities:
 * - Parse user requirements
 * - Coordinate between code and test generation agents
 * - Ensure all requirements are met
 */
export class CoordinatorAgent {
  constructor(apiKey) {
    // Create MCP client for communication
    this.mcpClient = new MCPClient('coordinator', {
      role: 'coordinator',
      description: 'Manages workflow and coordinates other agents'
    });

    // Initialize Anthropic client
    this.anthropic = new Anthropic({
      apiKey: apiKey
    });

    this.modelName = 'claude-3-haiku-20240307';
  }

  /**
   * Parse requirements from user input
   * @param {string} requirements - User's requirements text
   * @returns {Object} Parsed requirements
   */
  async parseRequirements(requirements) {
    try {
      console.log('Coordinator: Parsing requirements...');

      // Use Claude to parse and structure the requirements
      const message = await this.anthropic.messages.create({
        model: this.modelName,
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: `You are a requirements analyst. Parse the following software requirements and extract:
1. Main application purpose
2. List of specific features needed
3. Any technical constraints

Requirements:
${requirements}

Provide a structured response in this format:
PURPOSE: [main purpose]
FEATURES:
- [feature 1]
- [feature 2]
...
CONSTRAINTS:
- [constraint 1]
...`
        }]
      });

      // Track the API usage
      const tokensUsed = message.usage.input_tokens + message.usage.output_tokens;
      trackApiCall(this.modelName, tokensUsed);

      const parsedText = message.content[0].text;

      console.log('Coordinator: Requirements parsed successfully');
      console.log('Parsed output:', parsedText);

      return {
        raw: requirements,
        parsed: parsedText
      };

    } catch (error) {
      console.error('Coordinator: Error parsing requirements:', error.message);
      console.error('Full error:', error);
      throw error;
    }
  }

  /**
   * Coordinate code generation process
   * @param {Object} requirements - Parsed requirements
   * @returns {Object} Generated code and tests
   */
  async coordinateGeneration(requirements) {
    console.log('Coordinator: Starting code generation coordination...');

    // Send requirements to code generator
    this.mcpClient.send('coder', {
      type: 'generate_code',
      requirements: requirements
    });

    console.log('Coordinator: Sent requirements to coder agent');

    // Wait a bit for code generation (in a real system, this would be event-driven)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check for messages from coder
    const messages = this.mcpClient.receive();
    const codeMessage = messages.find(msg => msg.from === 'coder');

    if (!codeMessage) {
      throw new Error('No response from code generator');
    }

    console.log('Coordinator: Received code from coder agent');

    // Send code to test generator
    this.mcpClient.send('tester', {
      type: 'generate_tests',
      code: codeMessage.content.code,
      requirements: requirements
    });

    console.log('Coordinator: Sent code to tester agent');

    // Wait for test generation
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check for messages from tester
    const testMessages = this.mcpClient.receive();
    const testMessage = testMessages.find(msg => msg.from === 'tester');

    if (!testMessage) {
      throw new Error('No response from test generator');
    }

    console.log('Coordinator: Received tests from tester agent');

    return {
      code: codeMessage.content.code,
      tests: testMessage.content.tests
    };
  }
}
