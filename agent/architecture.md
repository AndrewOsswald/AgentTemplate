# architecture.md — how and why this system works

This explains the architecture behind the agent system in this project. It's written for developers who want to understand what's going on under the hood.

---

## The problem

A new agent session is like a senior developer hired today. It knows how to write good code — it doesn't know anything about your project. If you tell it exactly what to do, it can do it. But if it has to guess about the project's structure, intentions, or current state, it makes mistakes.

Code doesn't contain enough context for an agent to work independently. A function signature tells you what it accepts and returns — not why it exists, what business rule it implements, or what breaks if you change it. Without that context, agents make changes that are technically correct but contextually wrong.

Two things determine whether an agent produces accurate results:

**Context quality** — the agent needs information that is explicit and in natural language. Documentation that bridges the gap between what files contain and what the developer intended.

**Context selection** — the agent needs information that is concise and relevant. Too much information — even good information — causes the agent to lose focus. The model's attention gets pulled toward whatever is in front of it, relevant or not. Bigger context windows don't fix this.

This architecture solves both: high-quality documentation structured so the agent can find exactly what's relevant without loading everything else.

---

## Two layers: memory and artifacts

The system has two distinct layers:

- **Memory** (`memory/`) — what the agent knows. Its understanding of the project, your intentions, decisions, preferences, lessons learned. The agent manages this. It persists across sessions and devices through git.
- **Artifacts** — everything else. Code, documentation, config, this file, plan files. Anything in the repo that isn't memory.

**Why separate?** Early attempts stored agent knowledge alongside code. When the agent needed to reorganize its knowledge, it disrupted the code structure. Separating them means the agent can freely restructure what it knows without touching your project.

**The learning process is bidirectional.** The agent uses memory to produce better artifacts (code, docs, config). Working on artifacts teaches the agent things it encodes back into memory. Over sessions, the agent builds a deeper understanding of your project.

**Memory navigates like a tree.** It starts at `memory/root.md` and goes depth-first into relevant branches — the same pattern as navigating project documentation. Each memory file is small and focused. The agent loads only what's relevant to the current task.

---

## The process: observe / plan / act / review

The agent follows a four-step decision loop for every request:

```
observe → plan → act → review
            ↑              │
            └── loop back if needed
```

**Observe** — orient using memory and the project's documentation tree. Navigate depth-first to what's relevant. If continuing previous work, the plan file shortcuts this step.

**Plan** — understand the request, identify anything unclear, ask questions rather than assuming. For complex tasks, create a plan file that any future session can pick up.

**Act** — execute the plan, update documentation as you go, track progress. If something deviates significantly from the plan, stop and re-plan.

**Review** — verify the work (build, test, check for regressions), verify documentation reflects reality, decide whether to stop or loop back.

The agent learns during all four phases. Observations become memory. Decisions get recorded. Mistakes get encoded so they aren't repeated.

---

## The documentation tree

Every folder in the project can have a `README.md` that explains what's in it. Together, these form a navigable tree — the agent starts at the root and drills down into the relevant branch.

**Why this works:**
- The agent reads 1-2 files to orient, then only loads what's relevant
- Each README is a self-contained entry point for its level
- No centralized index needed — the tree IS the index
- The agent never has to load the entire project to understand one module

**Navigation is depth-first, not breadth-first.** From the root, choose the matching branch and follow it down. Don't browse all folders at the same level — that pulls in irrelevant context.

---

## Context files

Modules can have a `context/` folder for meta-information about the module — information that helps the agent work effectively but isn't the module's content itself.

| File | What it answers |
|---|---|
| **README** | "What is this and what's in it?" |
| **Plan file** (`context/plan-*.md`) | "What are we working on and how far along?" |
| **Current state** (`context/current-state.md`) | "What does the system look like right now?" |
| **Index** (`context/index.md`) | "What files exist and how do they relate?" |
| **Guides** | "How do I set up or operate this?" |
| **Decisions** (`context/decisions.md`) | "Why is it this way? What was tried and rejected?" |

Plan files are temporal — they track a task from start to finish. Context files are spatial — they describe what something looks like right now. When a task is complete, its useful information has already been captured in permanent context files.

The index (`context/index.md`) is particularly valuable for codebases. It maps every file with a description and shows how files relate to each other (imports, dependencies, calls). An agent can read this one file and understand the module's structure without opening source files.

---

## Session independence

At any point, if a session ends, the documentation and memory reflect reality:

- All context lives in files, not in chat history
- Memory persists the agent's knowledge across sessions and devices
- Plan files are self-contained — a new session can continue any task
- Context files always reflect current state
- Sessions can be short without losing information

This is by design. Long sessions accumulate conversation history that competes for attention with the actual task. Short, frequent sessions with good documentation and memory are more effective.

---

## Key principles

- **The agent writes its own documentation.** When the agent writes docs, it writes them in a way it can understand later. Ask it for the information and let it put things in the right place.
- **Assumptions are where agents make mistakes.** A simpler model with complete information outperforms a powerful model that has to guess. When something is unclear, the agent asks.
- **Setup is iterative.** Good documentation comes from working conversations over time, not a single interrogation. See `agent/setup.md`.
- **Files are tracked by git.** This provides history, rollback, and persistence across sessions and devices.
- **The agent has memory and professional judgment.** It remembers what you've told it, learns from the work it does, and will suggest better approaches when it knows of them.

---

## The `agent/` folder

This folder contains the behavioral layer and project-level references:

| File | Purpose |
|---|---|
| `intro.md` | Bootstrap — core rules, process reminder, pointer to memory. Loaded every session. |
| `architecture.md` | This file — explains why things are structured this way. |
| `setup.md` | Guide for getting the agent acquainted with a new project. |
| `cleanup.md` | End-of-session review process. |
| `documentation-refinement.md` | Documentation audit workflow with parallel evaluators. |
| `thoughts.md` | Agent observations journal. |
| `system-environment.md` | Dev machine environment reference. |

---

## Why this works

**Context quality** is solved by explicit documentation at every level, maintained by the agent, always reflecting reality. The memory tree adds the agent's accumulated understanding — decisions, conventions, and lessons that code can't contain.

**Context selection** is solved by top-down navigation that loads only what's relevant. The README tree for project structure. The memory tree for the agent's knowledge. Both use the same pattern: start broad, go deep into one branch.

**Session independence** is solved by putting everything in files. Memory persists knowledge across sessions. Plan files persist task state. Context files persist project state. Nothing lives only in chat history.

The result: an agent that can orient itself, find what it needs, and work independently — getting better over time as its memory grows.
