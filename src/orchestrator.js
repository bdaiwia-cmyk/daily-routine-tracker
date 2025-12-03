// Name: Abdul-Salam Bdaiwi, Leah Kang, Parsa Salah
// Student ID: XXXXXXXX
// This file orchestrates the multi-agent system

import { CoordinatorAgent } from './agents/coordinatorAgent.js';
import { CoderAgent } from './agents/coderAgent.js';
import { TesterAgent } from './agents/testerAgent.js';
import { saveUsageToFile, resetTracking } from './utils/modelTracker.js';
import fs from 'fs';
import path from 'path';

/**
 * Main orchestrator for the multi-agent system
 * Manages the workflow from requirements to code generation
 */
export class Orchestrator {
  constructor(apiKey) {
    // Initialize all agents
    this.coordinator = new CoordinatorAgent(apiKey);
    this.coder = new CoderAgent(apiKey);
    this.tester = new TesterAgent(apiKey);

    console.log('Orchestrator: All agents initialized');
  }

  /**
   * Process user requirements and generate code + tests
   * @param {string} requirements - User's requirements
   * @returns {Object} Generated code, tests, and file paths
   */
  async processRequirements(requirements) {
    try {
      console.log('Orchestrator: Starting process...');

      // Reset tracking for this run
      resetTracking();

      // Step 1: Parse requirements using coordinator
      console.log('Orchestrator: Step 1 - Parsing requirements');
      const parsedReqs = await this.coordinator.parseRequirements(requirements);
      console.log('Orchestrator: Requirements parsed, moving to code generation');

      // Step 2: Generate code using coder agent
      console.log('Orchestrator: Step 2 - Generating code');
      const code = await this.coder.generateCode(parsedReqs);
      console.log('Orchestrator: Code generated, moving to test generation');

      // Step 3: Generate tests using tester agent
      console.log('Orchestrator: Step 3 - Generating tests');
      const tests = await this.tester.generateTests(code, parsedReqs);
      console.log('Orchestrator: Tests generated, saving files');

      // Step 4: Save generated files
      const timestamp = Date.now();
      const codeFilePath = path.join('generated_code', `generated_code_${timestamp}.py`);
      const testFilePath = path.join('generated_code', `test_code_${timestamp}.py`);

      // Create generated_code directory if it doesn't exist
      if (!fs.existsSync('generated_code')) {
        fs.mkdirSync('generated_code');
      }

      // Clean the code (remove markdown code blocks if present)
      let cleanCode = code;
      if (cleanCode.includes('```python')) {
        cleanCode = cleanCode.split('```python')[1].split('```')[0].trim();
      } else if (cleanCode.includes('```')) {
        cleanCode = cleanCode.split('```')[1].split('```')[0].trim();
      }

      // Clean the tests
      let cleanTests = tests;
      if (cleanTests.includes('```python')) {
        cleanTests = cleanTests.split('```python')[1].split('```')[0].trim();
      } else if (cleanTests.includes('```')) {
        cleanTests = cleanTests.split('```')[1].split('```')[0].trim();
      }

      // Write files
      fs.writeFileSync(codeFilePath, cleanCode);
      fs.writeFileSync(testFilePath, cleanTests);

      console.log(`Orchestrator: Code saved to ${codeFilePath}`);
      console.log(`Orchestrator: Tests saved to ${testFilePath}`);

      // Step 5: Save model usage statistics
      saveUsageToFile('model_usage.json');

      return {
        success: true,
        codeFile: codeFilePath,
        testFile: testFilePath,
        code: cleanCode,
        tests: cleanTests
      };

    } catch (error) {
      console.error('Orchestrator: Error during processing:', error.message);

      // Still save usage stats even if there was an error
      saveUsageToFile('model_usage.json');

      return {
        success: false,
        error: error.message
      };
    }
  }
}
