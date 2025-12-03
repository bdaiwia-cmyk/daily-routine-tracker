// Name: Leah Kang
// Student ID: leahyk
// This file implements a simple MCP (Model Context Protocol) server for agent communication

/**
 * MCP Server - handles communication between agents
 * This is a simplified implementation of MCP for our multi-agent system
 */
class MCPServer {
  constructor() {
    // Store registered agents
    this.agents = new Map();

    // Store messages between agents
    this.messageQueue = [];

    console.log('MCP Server initialized');
  }

  /**
   * Register an agent with the server
   * @param {string} agentId - Unique identifier for the agent
   * @param {Object} agentInfo - Information about the agent
   */
  registerAgent(agentId, agentInfo) {
    this.agents.set(agentId, {
      ...agentInfo,
      registeredAt: new Date()
    });

    console.log(`Agent registered: ${agentId}`);
  }

  /**
   * Send a message from one agent to another
   * @param {string} fromAgentId - Sender agent ID
   * @param {string} toAgentId - Receiver agent ID
   * @param {Object} message - Message content
   */
  sendMessage(fromAgentId, toAgentId, message) {
    // Check if both agents are registered
    if (!this.agents.has(fromAgentId)) {
      throw new Error(`Sender agent ${fromAgentId} not registered`);
    }

    if (!this.agents.has(toAgentId)) {
      throw new Error(`Receiver agent ${toAgentId} not registered`);
    }

    // Add message to queue
    const messageObj = {
      id: Date.now(),
      from: fromAgentId,
      to: toAgentId,
      content: message,
      timestamp: new Date()
    };

    this.messageQueue.push(messageObj);

    console.log(`Message sent from ${fromAgentId} to ${toAgentId}`);

    return messageObj;
  }

  /**
   * Get messages for a specific agent
   * @param {string} agentId - Agent ID to get messages for
   * @returns {Array} Array of messages
   */
  getMessages(agentId) {
    // Filter messages where this agent is the receiver
    const messages = this.messageQueue.filter(msg => msg.to === agentId);

    // Remove retrieved messages from queue
    this.messageQueue = this.messageQueue.filter(msg => msg.to !== agentId);

    return messages;
  }

  /**
   * Get list of all registered agents
   * @returns {Array} Array of agent IDs
   */
  getAgents() {
    return Array.from(this.agents.keys());
  }

  /**
   * Get information about a specific agent
   * @param {string} agentId - Agent ID
   * @returns {Object} Agent information
   */
  getAgentInfo(agentId) {
    return this.agents.get(agentId);
  }
}

// Export a single instance of the server
export const mcpServer = new MCPServer();
