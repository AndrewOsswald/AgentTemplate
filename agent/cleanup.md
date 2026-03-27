# cleanup.md — end-of-session review

When you're done working with the agent for this session, have it run through this checklist. The goal: everything important from this session is captured in files and memory so the next session can pick up without any chat history.

---

## What the agent will do

### 1. Review what happened

The agent summarizes what was done this session — code written, tasks completed, files changed, decisions made.

### 2. Update documentation

For each module touched:
- Are context files accurate? (`current-state.md`, `index.md`, etc.)
- Does the module README still match reality?
- Are plan files up to date with progress?
- Were any guides updated if procedures changed?

At the project level:
- Does the root `README.md` still map the project correctly?

### 3. Encode important knowledge into memory

The agent reviews the session and encodes anything a future session would need:
- Decisions made and why
- New conventions or patterns discovered
- Developer preferences expressed during the session
- Problems encountered and how they were resolved
- Anything that would force the developer to repeat themselves if lost

This is the most important step. Everything in chat history disappears when the session ends. Memory is what persists.

### 4. Confirm

The agent tells you:
- What was done
- What documentation was updated
- What was encoded into memory
- Any remaining work tracked in plan files
