# Agent Architecture Template

A reusable starting point for projects that use AI agents. This repo contains the documentation structure and agent workflow — no application code. Copy it into a new or existing project, run the setup process, and the agent can orient itself autonomously from session one.

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
│   ├── setup.md               # Bootstrap this architecture into a new project.
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
        └── current-state.md   # Deployment status, known issues, what's working
```

---

## Quick start

1. **Copy** the `agent/` folder (and optionally `example-module/`) into your project root.
2. **Create the IDE-specific entrypoint** that loads `agent/intro.md`:
   - **Claude Code:** Create `CLAUDE.md` at the repo root (see `agent/setup.md` step 6 for the template).
   - **Cursor:** Create `.cursorrules` at the repo root.
   - **GitHub Copilot:** Create `.github/copilot-instructions.md`.
   - The content is the same — point the agent at `agent/intro.md` and summarize the core rules.
3. **Run setup** — tell the agent: "Read `agent/setup.md` and set up this project." It will ask questions, generate documentation, and regenerate `system-environment.md` for your machine.
4. **Work** — each session, the agent reads the entrypoint, navigates the README tree to the relevant module, and follows observe/plan/act/review.
5. **End session** — ask the agent to "follow `agent/cleanup.md`" to sync docs and commit.

---

## Key concepts

**README tree** — every folder has a `README.md`. The agent navigates top-down, only reading deeper into what's relevant. No centralized index needed — the tree IS the index.

**Observe / plan / act / review** — the decision loop. Observe loads context, plan identifies the approach, act executes, review verifies and decides whether to loop back or stop.

**Module templates** — three building blocks (documentation, codebase, device) that can be mixed. Each has default context files. See `agent/new.md`.

**Plan files** — self-contained task trackers (`plan-*.md`). A new agent with no chat history can read one and continue the work. The user decides when to delete them.

**Session independence** — all context lives in files. Sessions can be short. No information is lost when a session ends because the agent updates documentation as it works.

---

## Learn more

- `agent/intro.md` — the behavioral core (what gets loaded every session)
- `agent/architecture.md` — deep dive into why things are structured this way
- `agent/new.md` — templates, plan file standard, index format
- `agent/setup.md` — the full setup process
