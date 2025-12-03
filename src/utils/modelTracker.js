// Name: Abdul-Salam Bdaiwi
// Student ID: bdaiwia
// This file tracks the usage of AI models including API calls and tokens

import fs from 'fs';
import path from 'path';

// Store model usage data in memory
let modelUsage = {};

/**
 * Initialize the tracker for a specific model
 * @param {string} modelName - Name of the model to track
 */
export function initializeModel(modelName) {
  // If model doesn't exist in our tracking object, create it
  if (!modelUsage[modelName]) {
    modelUsage[modelName] = {
      numApiCalls: 0,
      totalTokens: 0
    };
  }
}

/**
 * Track an API call to a model
 * @param {string} modelName - Name of the model
 * @param {number} tokensUsed - Number of tokens used in this call
 */
export function trackApiCall(modelName, tokensUsed) {
  // Make sure model is initialized
  initializeModel(modelName);

  // Increment the number of API calls
  modelUsage[modelName].numApiCalls += 1;

  // Add the tokens used to the total
  modelUsage[modelName].totalTokens += tokensUsed;

  console.log(`Tracked API call to ${modelName}: ${tokensUsed} tokens used`);
}

/**
 * Get current usage statistics for all models
 * @returns {Object} Usage statistics for all models
 */
export function getUsageStats() {
  // Return a copy of the usage data
  return JSON.parse(JSON.stringify(modelUsage));
}

/**
 * Save usage statistics to a JSON file
 * @param {string} filepath - Path to save the JSON file
 */
export function saveUsageToFile(filepath = 'model_usage.json') {
  try {
    // Convert usage data to JSON format
    const jsonData = JSON.stringify(modelUsage, null, 2);

    // Write to file
    fs.writeFileSync(filepath, jsonData);

    console.log(`Model usage saved to ${filepath}`);
  } catch (error) {
    console.error('Error saving model usage:', error.message);
  }
}

/**
 * Reset all tracking data
 */
export function resetTracking() {
  modelUsage = {};
  console.log('Model tracking data reset');
}
