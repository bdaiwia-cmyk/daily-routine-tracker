# Final Project Submission Checklist

Use this checklist before submitting your project to ensure you have everything.

## GitHub Repository Setup

- [ ] Repository created on GitHub
- [ ] Repository shared with all group members
- [ ] Repository shared with TA (jacobk13@uci.edu)
- [ ] All team members have made multiple commits
- [ ] Commit history shows distributed work
- [ ] Repository is private (if required) or public

## Code Quality

- [ ] Every code file has comments at the top with name and student ID
- [ ] Functions/methods have explanatory comments
- [ ] Code follows consistent style
- [ ] No sensitive information (API keys) committed
- [ ] .env file is in .gitignore
- [ ] All required files are present

## Required Files Check

Core System:
- [ ] `src/index.js` - Main server
- [ ] `src/orchestrator.js` - Orchestration logic
- [ ] `src/agents/coordinatorAgent.js` - Coordinator
- [ ] `src/agents/coderAgent.js` - Code generator
- [ ] `src/agents/testerAgent.js` - Test generator
- [ ] `src/mcp/mcpServer.js` - MCP server
- [ ] `src/mcp/mcpClient.js` - MCP client
- [ ] `src/utils/modelTracker.js` - Usage tracking
- [ ] `src/utils/errorHandler.js` - Error handling

UI:
- [ ] `public/index.html` - Web interface

Configuration:
- [ ] `package.json` - Dependencies
- [ ] `.env.example` - Example environment file
- [ ] `.gitignore` - Ignored files list

Documentation:
- [ ] `README.md` - Setup and usage instructions
- [ ] `LICENSE` - License file

## Functionality Testing

System Works:
- [ ] Server starts without errors
- [ ] UI loads in browser
- [ ] Can enter requirements
- [ ] Code generation completes successfully
- [ ] At least 10 test cases generated
- [ ] At least 8 tests pass (80%+)
- [ ] Generated code is runnable
- [ ] Generated tests are runnable
- [ ] Model usage tracking works
- [ ] Usage saved to JSON file

Error Handling:
- [ ] System handles missing API key gracefully
- [ ] System handles invalid input appropriately
- [ ] Errors are logged and reported to user

## Deliverable 1: ZIP File

- [ ] Downloaded ZIP from GitHub ("Code" → "Download ZIP")
- [ ] ZIP file contains complete repository
- [ ] ZIP file is under size limit (if any)
- [ ] File named appropriately (e.g., group_name_final_project.zip)

## Deliverable 2: Demo Video

Video Format:
- [ ] Video is in MP4 format
- [ ] Video quality is good (720p or 1080p)
- [ ] Text in video is readable
- [ ] Audio is clear (if using voiceover)
- [ ] Video length is appropriate (3-10 minutes)

Video Content Shows:
- [ ] Taking requirements through the GUI
- [ ] Generating code and test cases
- [ ] Generated code displayed
- [ ] At least 10 test cases shown
- [ ] Running the generated code
- [ ] Code executes properly
- [ ] Running the test cases
- [ ] At least 8 tests passing
- [ ] Model usage tracking report displayed

## Deliverable 3: Written Report

Report Structure:
- [ ] Minimum 2 pages long
- [ ] Submitted as PDF
- [ ] Proper formatting and structure
- [ ] No spelling/grammar errors

Report Content Includes:
- [ ] Introduction - purpose of the system
- [ ] System design and workflow description
  - [ ] How input is parsed
  - [ ] How data flows through the system
  - [ ] Steps in the process
- [ ] Model roles and tools
  - [ ] Role of each model/agent
  - [ ] How responsibilities are delegated
  - [ ] What tools each agent uses and why
  - [ ] How MCP is used
- [ ] Error handling
  - [ ] Fault tolerance mechanisms
  - [ ] How errors are handled
- [ ] Reflection
  - [ ] Limitations discussed
  - [ ] Challenges explained
  - [ ] What went well
  - [ ] What didn't go well

## Deliverable 4: Peer Evaluation

- [ ] Peer evaluation form completed
- [ ] Submitted through Canvas
- [ ] Honest assessment of contributions
- [ ] Submitted by deadline

## Software Requirements

- [ ] Selected a software description from the Google Sheet
- [ ] Only one group selected your description
- [ ] Requirements listed and provided as input to system

## Technical Requirements Met

Multi-Agent System:
- [ ] Multiple agents implemented (Coordinator, Coder, Tester)
- [ ] MCP integration for communication
- [ ] Clear role definition for each agent
- [ ] Collaboration strategy defined
- [ ] Agents communicate through MCP

User Interface:
- [ ] Accepts description and requirements
- [ ] Returns runnable code
- [ ] Code satisfies input requirements
- [ ] Returns runnable test cases
- [ ] At least 10 test cases
- [ ] At least 80% tests pass
- [ ] Instructions on how to run code and tests

Model Usage Tracking:
- [ ] Tracks number of API calls per model
- [ ] Tracks total tokens per model
- [ ] Report in JSON format
- [ ] Correct JSON structure: {"model1": {"numApiCalls": X, "totalTokens": Y}}
- [ ] Tracking code is clearly commented

Documentation:
- [ ] README.md with run instructions
- [ ] System is "batteries-included"
- [ ] Can run with only provided instructions
- [ ] No external dependencies (beyond npm install)

## Final Checks

Before Canvas Submission:
- [ ] All 4 deliverables ready (ZIP, Video, Report PDF, Peer Eval)
- [ ] File names are clear and appropriate
- [ ] All files under size limits
- [ ] Verified files can be opened/played
- [ ] Only ONE submission per group
- [ ] Submitted by correct group member

After Submission:
- [ ] Confirmation email received
- [ ] Files visible in Canvas submission
- [ ] All group members aware of submission

## Group Communication

- [ ] All members contributed to the project
- [ ] All members reviewed the final submission
- [ ] All members agree with the submission
- [ ] All members completed peer evaluation

## Optional Extras (Bonus Points)

- [ ] Particularly elegant MCP implementation
- [ ] Excellent error handling
- [ ] Outstanding documentation
- [ ] Creative UI design
- [ ] Support for multiple programming languages
- [ ] Additional features beyond requirements

---

## Quick Pre-Submission Test

Run these commands to verify everything works:

```bash
# 1. Install dependencies
npm install

# 2. Run system tests
npm test

# 3. Start the server
npm start

# 4. Open browser to http://localhost:3000

# 5. Generate code with a sample requirement

# 6. Run generated code
python generated_code/generated_code_[timestamp].py

# 7. Run generated tests
python -m unittest generated_code/test_code_[timestamp].py

# 8. Verify model_usage.json was created
cat model_usage.json
```

If all these work, you're ready to submit! ✅

---

## Contact Information

If you have questions:
- Check Canvas announcements
- Email the TA: jacobk13@uci.edu
- Review the project rubric
- Check the project FAQ (if provided)

Good luck with your submission! 🚀
