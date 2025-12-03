// Name: Leah Kang
// Student ID: XXXXXXXX
// Error handling utilities for fault tolerance

/**
 * Retry a function with exponential backoff
 * This helps handle temporary failures like network issues
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} delay - Initial delay in milliseconds
 * @returns {Promise} Result of the function
 */
export async function retryWithBackoff(fn, maxRetries = 3, delay = 1000) {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      // Try to execute the function
      return await fn();
    } catch (error) {
      lastError = error;
      console.log(`Attempt ${i + 1} failed: ${error.message}`);

      // If this was the last retry, throw the error
      if (i === maxRetries - 1) {
        throw lastError;
      }

      // Wait before retrying (exponential backoff)
      const waitTime = delay * Math.pow(2, i);
      console.log(`Retrying in ${waitTime}ms...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }

  throw lastError;
}

/**
 * Validate that required fields are present
 * @param {Object} obj - Object to validate
 * @param {Array} requiredFields - Array of required field names
 * @throws {Error} If a required field is missing
 */
export function validateRequiredFields(obj, requiredFields) {
  for (const field of requiredFields) {
    if (!obj[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }
}

/**
 * Safe JSON parse that returns default value on error
 * @param {string} jsonString - JSON string to parse
 * @param {*} defaultValue - Default value if parse fails
 * @returns {*} Parsed object or default value
 */
export function safeJsonParse(jsonString, defaultValue = null) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('JSON parse error:', error.message);
    return defaultValue;
  }
}
