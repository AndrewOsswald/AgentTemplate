# Agent Architecture Template

A reusable starting point for codebases that use AI agents. This repo contains the documentation structure and agent workflow — no application code. Copy it into a new or existing project, run the setup process, and the agent can orient itself autonomously from session one.

The core idea: agents navigate a **README tree** depth-first to find relevant context, follow an **observe / plan / act / review** loop, and update documentation as they work. All state lives in files, not chat history — sessions are independent and can be short.

---

## What's here

```
AgentTemplate/
├── README.md                     # This file — template overview
├── .gitignore                    # Basics (OS files, secrets, editor artifacts)
│
├── agent/                        # Agent workflow and project-level tools
│   ├── intro.md                  # Bootstrap template — copy into your IDE's instruction file
│   ├── architecture.md           # Why things are structured this way
│   ├── setup.md                  # Bootstrap this architecture into a project
│   ├── cleanup.md                # End-of-session review process
│   ├── context-refinement.md     # Audit docs AND memory with parallel sub-agents
│   ├── thoughts.md               # Agent observations journal
│   ├── plan-memory-process.md    # Design document for the memory tree
│   └── meta/
│       ├── README.md             # Explains meta/ — audit artifacts only
│       └── behavioral-notes.md   # Learned preferences from working with the user
│
└── memory/                       # Agent's knowledge base — organized for retrieval
    ├── root.md                   # Entry point to the memory tree
    └── ...                       # ~20 memory files (see root.md for the full map)
```

---

## Quick start

1. **Copy** the `agent/` and `memory/` folders into your project root.
2. **Tell the agent:** "Read `agent/setup.md` and set up this project."
3. The agent will:
   - Ask questions about the project
   - Create the IDE-specific bootstrap file (`CLAUDE.md`, `.cursorrules`, etc.) from the `agent/intro.md` template
   - Create the documentation skeleton (README tree, context folders)
   - Start encoding project knowledge into memory
4. **Work** — each session, the agent reads the bootstrap file, navigates to `memory/root.md`, and follows observe/plan/act/review. It learns continuously.
5. **End session** — the agent follows `agent/cleanup.md`: update docs, encode memory, write journal entries, commit and push.

Setup is iterative — the first session creates the skeleton, and details get filled in over subsequent working sessions. See `agent/setup.md` for the full process.

---

## Key concepts

**README tree** — every folder has a `README.md`. The agent navigates top-down, only reading deeper into what's relevant. No centralized index needed — the tree IS the index.

**Observe / plan / act / review** — the decision loop. Observe loads context, plan identifies the approach, act executes, review verifies and decides whether to loop back or stop.

**Module templates** — two building blocks (documentation and codebase) that can be mixed. Each has default context files. See `agent/new.md`.

**Plan files** — self-contained task trackers (`plan-*.md`). A new agent with no chat history can read one and continue the work. The user decides when to delete them.

**Session independence** — all context lives in files. Sessions can be short. No information is lost when a session ends because the agent updates documentation as it works.

**IDE-agnostic** — the behavioral core lives in `agent/intro.md` as a template. During setup, its content gets copied into whatever file your IDE auto-injects (`CLAUDE.md`, `.cursorrules`, etc.). The memory system and learning process work across any IDE or agent platform.

**The agent is an active participant in its own context engineering.** The agent doesn't just consume context — it creates, curates, and refines it. It encodes knowledge into memory, updates documentation, runs refinement audits, and improves its own working environment over time. This is the core design principle.

---

## Learn more

- `agent/intro.md` — the bootstrap template (copy into your IDE's instruction file)
- `agent/architecture.md` — deep dive into why things are structured this way
- `agent/setup.md` — the full setup process (iterative, IDE-aware)
- `memory/root.md` — entry point to the agent's memory system
