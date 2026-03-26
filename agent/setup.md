# setup.md — bootstrapping the agent architecture into a project

This file guides the **first session** of setting up the agent architecture in a codebase. Setup is not a one-shot process — it happens over **multiple conversations** between the agent and a developer. The first session creates the skeleton and asks foundational questions. Later sessions fill in module details, refine context files, and build out the documentation tree as the developer explains the project.

For background on why things are structured this way, see `agent/architecture.md`.

---

## What to copy into the new project

Copy the entire `agent/` folder into the project root. The agent needs these files:

| File | Role during setup |
|---|---|
| `setup.md` | This file — the setup process. Agent reads this first. |
| `architecture.md` | Explains the system. Agent reads this to understand what it's building. |
| `new.md` | Templates and standards. Agent uses these to generate documentation. |
| `cleanup.md` | End-of-session process. Stays as-is. |
| `thoughts.md` | Will be cleared and started fresh. |
| `system-environment.md` | Will be regenerated for this machine. |

**Do not copy** any plan files (`plan-*.md`) — those are specific to the project they were created in.

After copying, tell the agent: "Read `agent/setup.md` and set up this project."

---

## How setup works

Setup is **iterative, not exhaustive**. The goal of the first session is to:
- Understand the project at a high level
- Create the skeleton: root README, module folders with READMEs, the IDE entrypoint
- Identify what needs deeper documentation (filled in over future sessions)

The goal is NOT to document every file, every dependency, and every convention in one sitting. That produces shallow, inaccurate docs. Deep documentation comes from working conversations where the developer explains things as they come up — not from an interrogation.

---

## Session 1: The skeleton

The agent follows these steps in order. **Do not skip the questions phase.**

### Step 1: Read the architecture and templates

Read `agent/architecture.md` to understand the agentic architecture — the process (observe/plan/act/review), the README tree, how context files work, and why.

Read `agent/new.md` to understand the templates (documentation, codebase), their default and optional context files, the plan file standard, and the index.md format.

Do not generate anything yet.

### Step 2: Explore the project

Look at what already exists:
- What folders and files are present?
- Is there existing documentation (READMEs, docs folders, wikis)?
- What languages, frameworks, and build tools are in use?
- Is there configuration (Docker, CI/CD, infrastructure-as-code)?
- Are there any existing agent instruction files (`.cursorrules`, `.github/copilot-instructions.md`, `CLAUDE.md`, etc.)?

Build a picture of what this project is. Note what you observe but do not assume intent, purpose, or how the developer wants things organized.

### Step 3: Ask foundational questions

Before generating anything, ask the developer to clarify what you can't derive from the code. Keep it focused — you're building a skeleton, not writing a book.

**About the project:**
- What is this project? What does it do? (In the developer's words — not what the code looks like.)
- Who works on it? (Solo, team, open source?)
- What's the current state? (Active development, maintenance, greenfield, legacy?)

**About structure:**
- How should the project be divided into modules? (Or is it one module?)
- Are there natural boundaries — separate services, packages, apps within a monorepo?

**About the IDE / agent platform:**
- What IDE and agent tool will be used? (Claude Code, Cursor, GitHub Copilot in VS Code / Visual Studio, Windsurf, etc.)
- This determines the entrypoint file — see Step 6.

**Do not ask about** coding conventions, deployment targets, or deep architectural details yet. Those come in later sessions as the developer works with the agent and explains things naturally.

Ask follow-up questions if answers are ambiguous. Do not proceed with assumptions.

### Step 4: Present the skeleton plan

Based on the answers, show the developer:

1. **Proposed module structure** — which modules, how they nest
2. **Files that will be created** — list every file (READMEs, context folders, entrypoint)
3. **What will NOT be filled in yet** — make it clear that context files will have placeholder headers, not invented content

Wait for approval before proceeding.

### Step 5: Generate the skeleton

Create the following:

**Root level:**
- `README.md` — project overview with tree-format map of all modules. One-line descriptions. Direct file path references. Mark sections that need deeper documentation with `*(to be documented)*` rather than guessing.

**Per module:**
- `README.md` — what this module is, what's in it, which template pieces apply. Sections for guidelines and active work can be empty placeholders.
- `context/index.md` — if it's a codebase module. Populate nodes from the actual file listing (file name + short description based on what you can infer). Mark files you're unsure about. Edges can be minimal — they'll be filled in as the developer explains relationships.
- `context/current-state.md` — if it's a codebase module. Headers only (Deployment, What's Working, Known Issues, Active Branches). Don't invent content.

### Step 6: Create the IDE-specific entrypoint

Create the entrypoint file for the IDE/agent platform the developer specified. This file loads `agent/intro.md` — either by including its content or by instructing the agent to read it.

**The entrypoint is IDE-specific. The content it points to (`agent/intro.md`) is not.** This separation means the behavioral core works across any tool, while each IDE gets its native configuration file.

**Claude Code** — create `CLAUDE.md` at the repo root. Claude Code reads this automatically at session start.

```markdown
# CLAUDE.md

Read `agent/intro.md` for behavioral rules, then follow the process described there.

For project context, start with the root `README.md` and navigate depth-first.
```

You can also inline the full content of `agent/intro.md` into `CLAUDE.md` if you prefer a single file. Tradeoff: one file is simpler, but two files means `intro.md` stays IDE-agnostic and `CLAUDE.md` can hold Claude-specific additions.

**Cursor** — create `.cursorrules` at the repo root. Same content pattern — point at `agent/intro.md`.

**GitHub Copilot** — create `.github/copilot-instructions.md`. Same content pattern.

**Visual Studio with Copilot** — create `.github/copilot-instructions.md` (Copilot reads this in Visual Studio too). If the project also uses VS Code, the same file works for both.

**Windsurf** — create `.windsurfrules` at the repo root. Same content pattern.

**Other tools** — create whatever instruction file that tool reads at session start. The content is always the same: point the agent at `agent/intro.md` and optionally summarize the core rules.

**If the developer doesn't know yet** — create `agent/intro.md` (already done) and skip the entrypoint file. They can create it later when they choose a tool.

### Step 7: Regenerate `agent/system-environment.md`

Regenerate for this machine:
1. Read the current file to see its structure.
2. Run system commands to gather environment data — OS, kernel, CPU, memory, storage, user, hostname, installed runtimes, git version. Adapt for the platform.
3. Rewrite the file with the new data.

### Step 8: Clear `agent/thoughts.md`

Reset the thoughts file — keep the format header, remove entries from the previous project.

### Step 9: Delete the example module

Delete `example-module/` if it still exists. It's only there to show the layout — real modules replace it.

### Step 10: Review and summarize

Read through everything generated:
- Does the root README accurately map the project?
- Does each module README describe what's actually there?
- Are all file references using exact relative paths?
- Is the entrypoint correct for the chosen IDE?

Present a summary to the developer:
- What was created
- What's left as placeholders
- What should be filled in over future sessions (context files, guidelines, deeper index content)

---

## Later sessions: filling in the details

Setup doesn't end with Session 1. The documentation tree gets filled in organically as the developer works with the agent:

**Session 2+: Module deep-dives** — The developer asks the agent to work on a specific module. The agent reads the skeleton docs, notices gaps, and asks questions. The developer explains. The agent fills in context files with real information. This is how good documentation gets written — through actual work, not upfront interrogation.

**When conventions come up** — The developer mentions a coding standard, a deployment rule, or a testing convention. The agent adds it to the module's README guidelines section (or creates a `guidelines.md` if it's extensive).

**When architecture decisions come up** — The developer explains why something is built a certain way, or why an approach was rejected. The agent adds it to `context/decisions.md`.

**When environment details matter** — The developer mentions deployment targets, runtime requirements, or infrastructure. The agent updates `agent/system-environment.md` or adds environment context to the relevant module.

The goal is documentation that's written from real knowledge, not guesses. Each session makes the docs more complete and more accurate.

---

## After setup

- Start new sessions in the repo directory. The IDE loads the entrypoint automatically (or you provide `agent/intro.md` manually). Provide a plan file if continuing previous work.
- Create new modules using `agent/new.md`.
- End sessions by following `agent/cleanup.md`.
- For background on why things are structured this way, see `agent/architecture.md`.
