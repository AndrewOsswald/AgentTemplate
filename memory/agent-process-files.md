---
type: state
confidence: high
last-updated: 2026-03-28
---

# Agent process files

The `agent/` folder contains the behavioral layer and process tools. These are artifacts � memory points to them, doesn't duplicate them. Each file is well-documented; consult it directly when needed.

| File | What it does | When to consult |
|---|---|---|
| `agent/intro.md` | Bootstrap template — core rules, process reminder, pointer to memory. Copy into your IDE's instruction file (`CLAUDE.md`, `.cursorrules`, etc.) | When setting up for a new IDE |
| `agent/architecture.md` | Explains why the system is structured this way | When you need to understand design rationale |
| `agent/setup.md` | Guide for getting the agent acquainted with a new project — safety, interview, skeleton | When first dropped into a new project |
| `agent/cleanup.md` | End-of-session review — update docs, encode memory, journal, commit+push | End of every session |
| `agent/context-refinement.md` | Context audit with parallel evaluators — tests both docs AND memory | When auditing context quality |
| `agent/thoughts.md` | Agent observations journal — primarily for the human to see how the agent thinks | When noting observations during work |

`agent/documentation-refinement.md` is superseded by `context-refinement.md` and kept for reference only.

**Why:** These files existed before the memory system. They're well-written artifacts that describe processes the agent follows. Memory doesn't need to duplicate their contents — just know they exist, what they do, and when to use them.
