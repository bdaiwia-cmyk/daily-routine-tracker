# System Architecture

This document explains how the AI Coder system is structured and how data flows through it.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
│                    (Web Interface - UI)                      │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ HTTP Request
                             │ (Requirements)
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      Express.js Server                       │
│                        (src/index.js)                        │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ Process Request
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                       Orchestrator                           │
│                   (src/orchestrator.js)                      │
│                                                               │
│  Manages workflow, initializes agents, saves files           │
└────────────────────────────┬────────────────────────────────┘
                             │
                             │ Delegate to Agents
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                    Multi-Agent System                        │
│                                                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐│
│  │   Coordinator   │  │      Coder      │  │    Tester    ││
│  │      Agent      │  │      Agent      │  │     Agent    ││
│  │                 │  │                 │  │              ││
│  │  - Parse reqs   │  │  - Generate     │  │  - Generate  ││
│  │  - Coordinate   │  │    code         │  │    tests     ││
│  │  - Validate     │  │  - Python       │  │  - unittest  ││
│  └────────┬────────┘  └────────┬────────┘  └──────┬───────┘│
│           │                    │                   │        │
│           └────────────────────┼───────────────────┘        │
│                                │                            │
│                    ┌───────────▼───────────┐                │
│                    │     MCP Server        │                │
│                    │  (Message Broker)     │                │
│                    │                       │                │
│                    │  - Agent Registry     │                │
│                    │  - Message Queue      │                │
│                    │  - Routing            │                │
│                    └───────────────────────┘                │
└─────────────────────────────────────────────────────────────┘
                             │
                             │ API Calls
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                     Claude 3.5 Sonnet                        │
│                    (Anthropic API)                           │
│                                                               │
│  Generates: Requirements parsing, code, tests                │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagram

```
Step 1: User Input
┌──────────┐
│  User    │  Types requirements
└────┬─────┘
     │
     │ POST /generate
     ▼
┌────────────────┐
│  Express       │  Receives HTTP request
│  Server        │
└────┬───────────┘
     │
     │ processRequirements()
     ▼
┌────────────────┐
│ Orchestrator   │  Initializes workflow
└────┬───────────┘
     │
     ▼

Step 2: Parse Requirements
┌────────────────┐
│ Coordinator    │  Calls Claude API
│ Agent          │  to parse requirements
└────┬───────────┘
     │
     │ Parsed Requirements
     ▼
┌────────────────┐
│ Model Tracker  │  Track API call #1
└────────────────┘

Step 3: Generate Code
┌────────────────┐
│ Coordinator    │  Sends message via MCP
│ Agent          ├──────────────┐
└────────────────┘              │
                                │ MCP Message
                                ▼
                          ┌────────────────┐
                          │  MCP Server    │
                          └────┬───────────┘
                               │ Route message
                               ▼
                          ┌────────────────┐
                          │ Coder Agent    │  Calls Claude API
                          │                │  to generate code
                          └────┬───────────┘
                               │
                               │ Generated Code
                               ▼
                          ┌────────────────┐
                          │ Model Tracker  │  Track API call #2
                          └────────────────┘

Step 4: Generate Tests
┌────────────────┐
│ Coordinator    │  Sends code via MCP
│ Agent          ├──────────────┐
└────────────────┘              │
                                │ MCP Message
                                ▼
                          ┌────────────────┐
                          │  MCP Server    │
                          └────┬───────────┘
                               │
                               ▼
                          ┌────────────────┐
                          │ Tester Agent   │  Calls Claude API
                          │                │  to generate tests
                          └────┬───────────┘
                               │
                               │ Generated Tests
                               ▼
                          ┌────────────────┐
                          │ Model Tracker  │  Track API call #3
                          └────────────────┘

Step 5: Save Results
┌────────────────┐
│ Orchestrator   │  Writes files:
│                │  - generated_code_[timestamp].py
│                │  - test_code_[timestamp].py
│                │  - model_usage.json
└────┬───────────┘
     │
     │ Return results
     ▼
┌────────────────┐
│ Express Server │  Send JSON response
└────┬───────────┘
     │
     │ HTTP Response
     ▼
┌────────────────┐
│ User Browser   │  Display results
└────────────────┘
```

---

## MCP Communication Protocol

```
Agent Registration:
┌────────────────┐
│  Agent         │  1. Create MCPClient
│  (any)         │  2. Pass ID and info
└────┬───────────┘
     │
     │ registerAgent()
     ▼
┌────────────────┐
│  MCP Server    │  Stores in agent registry
└────────────────┘

Message Sending:
┌────────────────┐
│  Agent A       │  client.send('AgentB', message)
└────┬───────────┘
     │
     │ sendMessage()
     ▼
┌────────────────┐
│  MCP Server    │  Adds to message queue
│                │  {from: 'AgentA', to: 'AgentB', ...}
└────────────────┘

Message Receiving:
┌────────────────┐
│  Agent B       │  client.receive()
└────┬───────────┘
     │
     │ getMessages('AgentB')
     ▼
┌────────────────┐
│  MCP Server    │  Returns messages for Agent B
│                │  Removes from queue
└────────────────┘
```

---

## Component Interactions

### When User Submits Requirements:

1. **Browser → Server**
   - User clicks "Generate Code"
   - JavaScript sends POST to `/generate`
   - Payload: `{ requirements: "..." }`

2. **Server → Orchestrator**
   - Server validates input
   - Calls `orchestrator.processRequirements()`
   - Resets model tracking

3. **Orchestrator → Coordinator**
   - Calls `coordinator.parseRequirements()`
   - Coordinator uses Claude to parse
   - Returns structured requirements

4. **Orchestrator → Coder**
   - Calls `coder.generateCode(parsedReqs)`
   - Coder uses Claude to generate Python code
   - Returns code string

5. **Orchestrator → Tester**
   - Calls `tester.generateTests(code, parsedReqs)`
   - Tester uses Claude to generate tests
   - Returns test code string

6. **Orchestrator → File System**
   - Writes code to `generated_code/`
   - Writes tests to `generated_code/`
   - Saves usage to `model_usage.json`

7. **Orchestrator → Server → Browser**
   - Returns JSON with file paths and content
   - Browser displays results

---

## Error Handling Flow

```
┌────────────────┐
│  Any Component │  Error occurs
└────┬───────────┘
     │
     │ try/catch
     ▼
┌────────────────┐
│  Error Handler │  1. Log error
│                │  2. Create user message
│                │  3. Save usage (if applicable)
└────┬───────────┘
     │
     │ Return error response
     ▼
┌────────────────┐
│  Browser       │  Display error message
└────────────────┘
```

---

## Model Tracking Flow

Every Claude API call goes through this process:

```
┌────────────────┐
│  Any Agent     │  Makes Claude API call
└────┬───────────┘
     │
     │ Call anthropic.messages.create()
     ▼
┌────────────────┐
│  Claude API    │  Processes request
└────┬───────────┘
     │
     │ Returns response with usage data
     ▼
┌────────────────┐
│  Agent         │  Extracts: input_tokens + output_tokens
└────┬───────────┘
     │
     │ trackApiCall(modelName, tokens)
     ▼
┌────────────────┐
│  Model Tracker │  Updates in-memory stats:
│                │  - Increment numApiCalls
│                │  - Add to totalTokens
└────┬───────────┘
     │
     │ saveUsageToFile()
     ▼
┌────────────────┐
│  model_usage.  │  JSON file on disk
│  json          │
└────────────────┘
```

---

## Directory Structure

```
project/
│
├── src/                          # Source code
│   ├── agents/                   # Agent implementations
│   │   ├── coordinatorAgent.js  # Coordinator
│   │   ├── coderAgent.js        # Code generator
│   │   └── testerAgent.js       # Test generator
│   │
│   ├── mcp/                      # MCP protocol
│   │   ├── mcpServer.js         # Central server
│   │   └── mcpClient.js         # Client interface
│   │
│   ├── utils/                    # Utilities
│   │   ├── modelTracker.js      # Usage tracking
│   │   └── errorHandler.js      # Error handling
│   │
│   ├── orchestrator.js           # Main orchestrator
│   └── index.js                  # Server entry point
│
├── public/                       # Frontend
│   └── index.html               # Web UI
│
├── generated_code/              # Output directory
│   └── [generated files here]
│
├── tests/                       # Tests
│   └── run_tests.js
│
└── [documentation files]
```

---

## Sequence Diagram

```
User    Server   Orchestrator   Coordinator   Coder   Tester   Claude
 │         │          │              │          │        │        │
 │ POST    │          │              │          │        │        │
 ├────────>│          │              │          │        │        │
 │         │ process  │              │          │        │        │
 │         ├─────────>│              │          │        │        │
 │         │          │ parse        │          │        │        │
 │         │          ├─────────────>│          │        │        │
 │         │          │              │ API call │        │        │
 │         │          │              ├──────────┼────────┼───────>│
 │         │          │              │<─────────┼────────┼────────┤
 │         │          │<─────────────┤          │        │        │
 │         │          │              │          │        │        │
 │         │          │ generate code│          │        │        │
 │         │          ├──────────────┼─────────>│        │        │
 │         │          │              │          │API call│        │
 │         │          │              │          ├────────┼───────>│
 │         │          │              │          │<───────┼────────┤
 │         │          │<─────────────┼──────────┤        │        │
 │         │          │              │          │        │        │
 │         │          │ generate tests          │        │        │
 │         │          ├──────────────┼──────────┼───────>│        │
 │         │          │              │          │        │API call│
 │         │          │              │          │        ├───────>│
 │         │          │              │          │        │<───────┤
 │         │          │<─────────────┼──────────┼────────┤        │
 │         │          │              │          │        │        │
 │         │          │ save files   │          │        │        │
 │         │          │              │          │        │        │
 │         │<─────────┤              │          │        │        │
 │<────────┤          │              │          │        │        │
 │ Display │          │              │          │        │        │
```

---

## Key Design Decisions

### Why Three Agents?

1. **Separation of Concerns:** Each agent has one clear job
2. **Modularity:** Easy to modify one without affecting others
3. **Scalability:** Could add more agents (reviewer, optimizer, etc.)
4. **Clear Workflow:** Linear flow from parsing → coding → testing

### Why MCP?

1. **Protocol Standard:** MCP is designed for agent communication
2. **Decoupling:** Agents don't need to know about each other
3. **Extensibility:** Easy to add new agents
4. **Message History:** Can track all inter-agent communication

### Why Single Model?

1. **Simplicity:** One API key, one SDK
2. **Consistency:** Same quality across all tasks
3. **Cost Tracking:** Easier to monitor usage
4. **Student Project:** Keeps complexity manageable

### Why Python Output?

1. **Readable:** Easy to verify generated code
2. **unittest:** Standard testing framework
3. **Simple Execution:** Just run `python file.py`
4. **Common:** Most students know Python

---

This architecture provides a solid foundation for a multi-agent code generation system while remaining simple enough for a student project.
