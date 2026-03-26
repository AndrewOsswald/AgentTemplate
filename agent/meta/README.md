# agent/meta/

Project-level meta artifacts — behavioral notes, audit outputs, and dated handoffs. **Not operational state.** Operational context lives in module READMEs, plan files, and `context/` folders.

## What goes here

- **`behavioral-notes.md`** — Learned preferences from working with the user. Read at session start to maintain consistency across sessions.
- **Context refinement outputs** — Question banks, answer sheets, and gap reports from `agent/context-refinement.md` audits. Dated files (e.g. `context-refinement-2025-03-10-questions.md`).
- **Handoff notes** — Session-to-session handoff artifacts if needed beyond plan files.

## What does NOT go here

- Active plans → `context/plan-*.md` in the relevant module
- Current system state → `context/current-state.md` or `context/environment.md` in the relevant module
- Code or scripts → the module's `src/` or `meta/` folder
