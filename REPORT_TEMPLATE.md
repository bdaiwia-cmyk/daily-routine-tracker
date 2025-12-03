# Final Project Report: AI Coder Multi-Agent System

**Group Members:** Abdul-Salam Bdaiwi, Leah Kang, Parsa Salah

**Date:** [Insert Date]

---

## 1. Introduction

### Purpose of the System

The AI Coder is a multi-agent system designed to automatically generate executable code and comprehensive test cases from natural language requirements. The system addresses the challenge of translating high-level software specifications into working code, which is typically a time-consuming manual process.

The main goals of this system are:
- Accept software requirements in plain English
- Generate functional Python code that satisfies all requirements
- Produce runnable test cases with at least 80% pass rate
- Track and report model usage for transparency

This system demonstrates how multiple AI agents can collaborate through the Model Context Protocol (MCP) to accomplish complex software engineering tasks.

---

## 2. System Design and Workflow Description

### Input Parsing

When a user submits requirements through the web interface:

1. The Express.js server receives the requirements via a POST request to `/generate`
2. The requirements are passed to the Orchestrator, which manages the overall workflow
3. The Coordinator Agent receives the requirements first and uses Claude 3.5 Sonnet to parse and structure them into a clear format

The parsing process extracts:
- The main purpose of the application
- A list of specific features needed
- Any technical constraints or requirements

### Data Flow

The system follows this workflow:

```
User Input → Web UI → Express Server → Orchestrator → Multi-Agent System → Generated Files
```

Detailed steps:

1. **User submits requirements** through the web interface
2. **Server receives** the request and passes it to the Orchestrator
3. **Coordinator Agent parses** the requirements using Claude API
4. **Coder Agent** receives parsed requirements via MCP and generates Python code
5. **Tester Agent** receives the generated code via MCP and creates test cases
6. **Orchestrator** saves both code and tests to files in `generated_code/`
7. **Model Tracker** saves usage statistics to `model_usage.json`
8. **Server responds** to the UI with generated code, tests, and statistics

### MCP Communication

The Model Context Protocol facilitates agent communication:

- **MCP Server** maintains a registry of all agents and a message queue
- Each agent has an **MCP Client** to send and receive messages
- Messages are structured with sender, receiver, type, and content
- The Coordinator sends tasks to specialized agents through MCP
- Agents return results through MCP back to the Coordinator

---

## 3. Model Roles and Tools

### Agent Roles

**Coordinator Agent** (`coordinatorAgent.js`)
- **Responsibility:** Orchestrates the entire workflow
- **Tools:** Claude 3.5 Sonnet API for requirements parsing
- **MCP Usage:** Sends generation requests to other agents, receives their results
- **Why:** Needed to understand and structure user requirements before generation

**Coder Agent** (`coderAgent.js`)
- **Responsibility:** Generates executable Python code
- **Tools:** Claude 3.5 Sonnet API for code generation
- **MCP Usage:** Receives requirements from Coordinator, sends back generated code
- **Why:** Specializes in translating requirements into working code

**Tester Agent** (`testerAgent.js`)
- **Responsibility:** Creates comprehensive test cases
- **Tools:** Claude 3.5 Sonnet API for test generation
- **MCP Usage:** Receives code from Coordinator, sends back test cases
- **Why:** Ensures generated code is testable and validates functionality

### Responsibility Delegation

The system uses a hierarchical delegation model:

1. The Coordinator is the "manager" that delegates tasks
2. Specialized agents (Coder, Tester) focus on their specific domains
3. All agents use the same Claude model but with different prompts tailored to their roles
4. MCP ensures messages are delivered reliably between agents

### MCP Integration

Our MCP implementation includes:

- **MCPServer class:** Central message broker that registers agents and routes messages
- **MCPClient class:** Interface for agents to communicate with the server
- **Message Queue:** Stores messages until retrieved by recipient agents
- **Agent Registry:** Keeps track of all active agents and their metadata

Each agent registers itself when initialized, then uses its MCP client to send and receive structured messages throughout the generation process.

---

## 4. Error Handling

### Fault Tolerance Mechanisms

To ensure the system is robust, we implemented several error handling strategies:

**1. Try-Catch Blocks**
- All API calls to Claude are wrapped in try-catch blocks
- Errors are logged to the console for debugging
- User-friendly error messages are displayed in the UI

**2. Input Validation**
- Server validates that requirements are provided before processing
- Returns 400 status code for missing or invalid inputs

**3. API Call Tracking**
- Even if generation fails, model usage is still tracked and saved
- Ensures we always have visibility into what happened

**4. Graceful Degradation**
- If an error occurs, the system returns error details to the user
- The server remains running and can handle subsequent requests
- Error messages help users understand what went wrong

**5. File System Safety**
- System checks if `generated_code` directory exists before writing
- Creates directory automatically if missing
- Uses timestamps in filenames to prevent overwrites

**6. Retry Utilities**
- Created `errorHandler.js` with retry logic for transient failures
- Implements exponential backoff for network-related errors
- Could be extended to retry failed API calls automatically

---

## 5. Reflection

### What Went Well

**Successful MCP Implementation**
We successfully implemented a working Model Context Protocol system that allows agents to communicate effectively. The message queue and agent registry worked as expected.

**Clean Separation of Concerns**
Each agent has a clear, focused responsibility. This made the code easier to write and debug since each component is independent.

**Accurate Model Tracking**
The token tracking system accurately captures all API usage and provides transparent reporting in JSON format.

**Simple, Functional UI**
The web interface is straightforward and gets the job done without unnecessary complexity.

### Challenges Faced

**Coordinating Async Communication**
Getting the timing right for MCP message passing was tricky. Since our implementation uses a simple queue, we had to add delays to ensure messages were processed in the right order. In a production system, we would use event-driven architecture or callbacks.

**Code Quality Variability**
The generated code quality varies depending on the complexity of requirements. Sometimes Claude generates code with minor bugs or missing edge cases.

**Test Pass Rates**
While we consistently get 10+ test cases, the pass rate can sometimes dip below 80% for very complex requirements. This is due to the inherent challenge of code generation.

**Learning MCP**
Understanding how to properly implement MCP was challenging since it's a relatively new protocol. We had to design our own simplified version that captured the core concepts.

### Limitations

**Simplified MCP**
Our MCP implementation is simplified compared to the full protocol specification. A production system would need more robust message handling, authentication, and error recovery.

**Python Only**
The system only generates Python code. Supporting multiple languages would require different prompts and validation logic for each language.

**No Code Execution**
The system doesn't actually run the generated code to verify it works. Adding this would provide better quality assurance but introduces security concerns.

**Single Model**
All agents use the same Claude model. Using different models (e.g., a faster model for parsing, a more powerful one for code generation) could improve performance and cost.

**Limited Context**
The agents don't maintain conversation history. If generation fails, you have to start over rather than iteratively refining the code.

### Future Improvements

If we had more time, we would:
- Implement event-driven MCP communication instead of delays
- Add code execution in a sandboxed environment to verify correctness
- Support multiple programming languages
- Allow users to refine generated code through chat
- Add more sophisticated error recovery with automatic retries
- Implement caching to speed up similar requests

---

## Conclusion

This project successfully demonstrates a working multi-agent system using MCP for code generation. Despite some limitations, the system reliably generates code and tests from natural language requirements while providing full transparency through usage tracking. The experience taught us valuable lessons about agent coordination, API integration, and building fault-tolerant systems.
