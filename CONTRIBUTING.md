# Contributing to AI Coder

This document describes how each team member should contribute to the project.

## Team Members

- **Abdul-Salam Bdaiwi** - Worked on: Model Tracker, Coder Agent, Main Server
- **Leah Kang** - Worked on: MCP Server/Client, Error Handling
- **Parsa Salah** - Worked on: Coordinator Agent, Tester Agent

## Git Workflow

1. **Before starting work:**
   ```bash
   git pull origin main
   ```

2. **Make your changes**
   - Add comments with your name and student ID at the top of each file
   - Write clear commit messages

3. **Commit your work:**
   ```bash
   git add .
   git commit -m "Descriptive message about what you changed"
   ```

4. **Push to GitHub:**
   ```bash
   git push origin main
   ```

## Code Style Guidelines

- Use clear, simple variable names
- Add comments explaining what your code does
- Keep functions short and focused
- Use consistent indentation (2 spaces)
- Include error handling with try-catch blocks

## File Ownership

To ensure everyone gets participation credit, each team member should edit files in their assigned area:

**Abdul-Salam:**
- `src/utils/modelTracker.js`
- `src/agents/coderAgent.js`
- `src/index.js`
- `src/orchestrator.js`

**Leah:**
- `src/mcp/mcpServer.js`
- `src/mcp/mcpClient.js`
- `src/utils/errorHandler.js`

**Parsa:**
- `src/agents/coordinatorAgent.js`
- `src/agents/testerAgent.js`

**Shared:**
- `README.md`
- `REPORT_TEMPLATE.md`
- Testing and documentation

## Testing Your Changes

Before committing, make sure:

1. The server starts without errors: `npm start`
2. The UI loads at http://localhost:3000
3. Code generation works end-to-end
4. Your changes don't break existing functionality

## Commit Message Format

Use clear, descriptive commit messages:

```
Good examples:
- "Add model tracking functionality"
- "Implement MCP server message queue"
- "Fix error handling in coordinator agent"
- "Update README with setup instructions"

Bad examples:
- "update"
- "fix bug"
- "changes"
```

## Before Final Submission

Make sure:
- [ ] All team members have multiple commits
- [ ] All files have name/student ID comments
- [ ] README.md is complete
- [ ] Report is written and exported to PDF
- [ ] Demo video is recorded
- [ ] System runs successfully from scratch
- [ ] At least 10 tests are generated and 8+ pass
