# Agent Architecture Template

A reusable starting point for codebases that use AI agents. This repo contains the documentation structure and agent workflow — no application code. Copy it into a new or existing project, run the setup process, and the agent can orient itself autonomously from session one.

The core idea: agents navigate a **README tree** depth-first to find relevant context, follow an **observe / plan / act / review** loop, and update documentation as they work. All state lives in files, not chat history — sessions are independent and can be short.

---

## What's here

```
AgentTemplate/
├── README.md                  # This file — template overview
├── .gitignore                 # Basics (OS files, secrets, editor artifacts)
│
├── agent/                     # Agent workflow and project-level tools
│   ├── intro.md               # Behavioral entrypoint — persona, rules, process. Loaded every session.
│   ├── architecture.md        # Why things are structured this way. Reference only.
│   ├── new.md                 # How to create modules — templates, plan files, index format.
│   ├── cleanup.md             # End-of-session review process.
│   ├── setup.md               # Bootstrap this architecture into a project. Iterative process.
│   ├── context-refinement.md  # Audit documentation quality with parallel sub-agents.
│   ├── thoughts.md            # Agent observations journal.
│   ├── system-environment.md  # Dev machine environment reference (regenerated per machine).
│   └── meta/
│       ├── README.md          # Explains meta/ — audit artifacts, not operational state.
│       └── behavioral-notes.md # Learned preferences from working with the user.
│
└── example-module/            # Example codebase module (deleted during setup)
    ├── README.md              # Module overview, architecture, how to run
    └── context/
        ├── index.md           # Graph-based code map (nodes + edges)
        └── current-state.md   # What's working, known issues, active branches
```

---

## Quick start

1. **Copy** the `agent/` folder (and optionally `example-module/`) into your project root.
2. **Tell the agent:** "Read `agent/setup.md` and set up this project."
3. The agent will:
   - Ask questions about the project
   - Create the documentation skeleton (README tree, context folders)
   - Create the IDE-specific entrypoint for your tool (Claude Code → `CLAUDE.md`, Cursor → `.cursorrules`, Copilot → `.github/copilot-instructions.md`, etc.)
   - Regenerate `system-environment.md` for your machine
4. **Work** — each session, the agent reads the entrypoint, navigates the README tree, and follows observe/plan/act/review.
5. **End session** — ask the agent to "follow `agent/cleanup.md`" to sync docs and commit.

Setup is iterative — the first session creates the skeleton, and details get filled in over subsequent working sessions. See `agent/setup.md` for the full process.

---

## Key concepts

**README tree** — every folder has a `README.md`. The agent navigates top-down, only reading deeper into what's relevant. No centralized index needed — the tree IS the index.

**Observe / plan / act / review** — the decision loop. Observe loads context, plan identifies the approach, act executes, review verifies and decides whether to loop back or stop.

**Module templates** — two building blocks (documentation and codebase) that can be mixed. Each has default context files. See `agent/new.md`.

**Plan files** — self-contained task trackers (`plan-*.md`). A new agent with no chat history can read one and continue the work. The user decides when to delete them.

**Session independence** — all context lives in files. Sessions can be short. No information is lost when a session ends because the agent updates documentation as it works.

**IDE-agnostic** — the behavioral core lives in `agent/intro.md`. Each IDE gets its own entrypoint file that points there. Works with Claude Code, Cursor, GitHub Copilot (VS Code and Visual Studio), Windsurf, or any tool that reads an instruction file.

---

## Learn more

- `agent/intro.md` — the behavioral core (what gets loaded every session)
- `agent/architecture.md` — deep dive into why things are structured this way
- `agent/new.md` — templates, plan file standard, index format
- `agent/setup.md` — the full setup process (iterative, IDE-aware)
