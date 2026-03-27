---
type: state
confidence: high
last-updated: 2025-07-13
---

# Agent process files

The `agent/` folder contains the behavioral layer and process tools. These are artifacts — memory points to them, doesn't duplicate them. Each file is well-documented; consult it directly when needed.

| File | What it does | When to consult |
|---|---|---|
| `agent/intro.md` | Bootstrap — core rules, process reminder, pointer to memory | Loaded automatically every session by IDE |
| `agent/architecture.md` | Explains why the system is structured this way | When you need to understand design rationale |
| `agent/setup.md` | Guide for getting the agent acquainted with a new project — safety, interview, skeleton | When first dropped into a new project |
| `agent/cleanup.md` | End-of-session review — update docs, encode memory, summarize | End of every session |
| `agent/documentation-refinement.md` | Documentation audit with parallel evaluators | When auditing documentation quality |
| `agent/thoughts.md` | Agent observations journal | When noting observations that don't fit elsewhere |

**Why:** These files existed before the memory system. They're well-written artifacts that describe processes the agent follows. Memory doesn't need to duplicate their contents — just know they exist, what they do, and when to use them.
