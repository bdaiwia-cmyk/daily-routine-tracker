// Name: Abdul-Salam Bdaiwi, Leah Kang, Parsa Salah
// Student ID: bdaiwia, leahyk, salahshp
// Main entry point for the AI Coder application

import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Orchestrator } from './orchestrator.js';
import { getUsageStats } from './utils/modelTracker.js';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Check API key
if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ERROR: ANTHROPIC_API_KEY not found in environment variables');
  console.error('Please create a .env file with your API key');
  process.exit(1);
}

// Initialize orchestrator
const orchestrator = new Orchestrator(process.env.ANTHROPIC_API_KEY);

/**
 * Main endpoint to generate code from requirements
 */
app.post('/generate', async (req, res) => {
  try {
    const { requirements } = req.body;

    if (!requirements) {
      return res.status(400).json({
        success: false,
        error: 'Requirements are required'
      });
    }

    console.log('Received code generation request');
    console.log('Requirements:', requirements.substring(0, 100) + '...');

    // Process the requirements
    const result = await orchestrator.processRequirements(requirements);

    console.log('Processing complete, success:', result.success);

    if (result.success) {
      // Get usage statistics
      const usage = getUsageStats();

      console.log('Sending response to client');

      res.json({
        success: true,
        codeFile: result.codeFile,
        testFile: result.testFile,
        code: result.code,
        tests: result.tests,
        usage: usage
      });
    } else {
      console.log('Processing failed:', result.error);
      res.status(500).json({
        success: false,
        error: result.error
      });
    }

  } catch (error) {
    console.error('Error in /generate endpoint:', error);
    console.error('Stack trace:', error.stack);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * Endpoint to get model usage statistics
 */
app.get('/usage', (req, res) => {
  try {
    const usage = getUsageStats();
    res.json(usage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Test endpoint for UI testing without API key
 * Remove this before final submission!
 */
app.post('/generate-test', (req, res) => {
  console.log('Test mode: Generating sample response');

  // Sample calculator code
  const sampleCode = `# Simple Calculator
# This is a test response

class Calculator:
    """A simple calculator class"""

    def add(self, a, b):
        """Add two numbers"""
        return a + b

    def subtract(self, a, b):
        """Subtract b from a"""
        return a - b

    def multiply(self, a, b):
        """Multiply two numbers"""
        return a * b

    def divide(self, a, b):
        """Divide a by b"""
        if b == 0:
            raise ValueError("Cannot divide by zero")
        return a / b

# Example usage
if __name__ == "__main__":
    calc = Calculator()
    print("5 + 3 =", calc.add(5, 3))
    print("5 - 3 =", calc.subtract(5, 3))
    print("5 * 3 =", calc.multiply(5, 3))
    print("5 / 3 =", calc.divide(5, 3))`;

  const sampleTests = `import unittest
from generated_code_test import Calculator

class TestCalculator(unittest.TestCase):

    def setUp(self):
        """Set up test calculator"""
        self.calc = Calculator()

    def test_add_positive(self):
        """Test adding positive numbers"""
        self.assertEqual(self.calc.add(5, 3), 8)

    def test_add_negative(self):
        """Test adding negative numbers"""
        self.assertEqual(self.calc.add(-5, -3), -8)

    def test_subtract(self):
        """Test subtraction"""
        self.assertEqual(self.calc.subtract(5, 3), 2)

    def test_multiply(self):
        """Test multiplication"""
        self.assertEqual(self.calc.multiply(5, 3), 15)

    def test_divide(self):
        """Test division"""
        self.assertAlmostEqual(self.calc.divide(6, 3), 2.0)

    def test_divide_float(self):
        """Test division with floats"""
        self.assertAlmostEqual(self.calc.divide(5, 2), 2.5)

    def test_divide_by_zero(self):
        """Test division by zero raises error"""
        with self.assertRaises(ValueError):
            self.calc.divide(5, 0)

    def test_add_zero(self):
        """Test adding zero"""
        self.assertEqual(self.calc.add(5, 0), 5)

    def test_multiply_by_zero(self):
        """Test multiplying by zero"""
        self.assertEqual(self.calc.multiply(5, 0), 0)

    def test_multiply_negative(self):
        """Test multiplying negative numbers"""
        self.assertEqual(self.calc.multiply(-5, -3), 15)

    def test_large_numbers(self):
        """Test with large numbers"""
        self.assertEqual(self.calc.add(1000000, 2000000), 3000000)

    def test_decimals(self):
        """Test with decimal numbers"""
        self.assertAlmostEqual(self.calc.add(1.5, 2.3), 3.8)

if __name__ == '__main__':
    unittest.main()`;

  res.json({
    success: true,
    codeFile: 'generated_code/test_sample.py',
    testFile: 'generated_code/test_sample_tests.py',
    code: sampleCode,
    tests: sampleTests,
    usage: {
      'claude-3-5-sonnet-20241022': {
        numApiCalls: 3,
        totalTokens: 4521
      }
    }
  });
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('AI Coder - Multi-Agent Code Generator');
  console.log('='.repeat(50));
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Open your browser and navigate to the URL above');
  console.log('='.repeat(50));
});
