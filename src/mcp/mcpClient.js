// Name: Leah Kang
// Student ID: XXXXXXXX
// This file implements the MCP client that agents use to communicate

import { mcpServer } from './mcpServer.js';

/**
 * MCP Client - used by agents to communicate with the server
 */
export class MCPClient {
  constructor(agentId, agentInfo) {
    this.agentId = agentId;

    // Register this agent with the server
    mcpServer.registerAgent(agentId, agentInfo);
  }

  /**
   * Send a message to another agent
   * @param {string} toAgentId - Receiver agent ID
   * @param {Object} message - Message to send
   */
  send(toAgentId, message) {
    return mcpServer.sendMessage(this.agentId, toAgentId, message);
  }

  /**
   * Receive messages for this agent
   * @returns {Array} Array of messages
   */
  receive() {
    return mcpServer.getMessages(this.agentId);
  }

  /**
   * Get list of all agents
   * @returns {Array} Array of agent IDs
   */
  listAgents() {
    return mcpServer.getAgents();
  }
}
