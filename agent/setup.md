# setup.md — initialize a new project

This file turns a blank or existing project into one that uses the agentic architecture. The agent reads this file, asks questions to understand the project, then generates the documentation structure.

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

## Setup process

The agent follows these steps in order. **Do not skip the questions phase.** The whole point is to understand the project before generating anything — assumptions are where mistakes happen.

### Step 1: Read the architecture and templates

Read `agent/architecture.md` to understand the agentic architecture — the process (observe/plan/act/review), the README tree, how context files work, and why.

Read `agent/new.md` to understand the three templates (documentation, codebase, device), their default and optional context files, the plan file standard, and the index.md format.

Do not generate anything yet.

### Step 2: Explore the project

Look at what already exists in the project:
- What folders and files are present?
- Is there existing documentation (READMEs, docs folders, wikis)?
- Is there code? What languages, frameworks, structure?
- Is there configuration (Docker, CI/CD, infrastructure)?
- Are there any existing instruction files (`.cursorrules`, `.github/copilot-instructions.md`, `CLAUDE.md`, etc.)?

Build a mental picture of what this project is and how it's organized. Note what you observe but do not make assumptions about intent, purpose, or how the owner wants things organized.

### Step 3: Ask questions

Before generating any documentation, ask the user to clarify everything you'd otherwise need to assume. At minimum, cover:

**About the project:**
- What is this project? What does it do? (Get a description in the user's words.)
- Who works on it? (Solo, team, open source?)
- What's the current state? (Active development, maintenance, new, legacy?)

**About the modules:**
- How should the project be divided into modules? (Or is it one module?)
- For each module: what template fits? (Documentation, codebase, device, or a mix?)
- Are there sub-modules? How should nesting work?

**About context:**
- Are there deployment targets? (Need current-state tracking?)
- Are there specific coding standards, conventions, or rules? (Need guidelines?)
- Is there anything a new agent absolutely must know before making changes?

**About preferences:**
- Any existing documentation the user wants preserved or incorporated?
- Any files or folders that should be excluded from documentation?
- Any specific rules or permissions the agent should follow? (e.g., "never push to main", "always run tests before committing")

Do not proceed until the user has answered and you have no remaining assumptions. Ask follow-up questions if answers are ambiguous.

### Step 4: Present a plan

Based on the answers, present the user with:

1. **Proposed module structure** — which modules, which templates, how they're nested
2. **What will be generated** — list every file that will be created or modified
3. **What will be in each file** — brief description of the content for each generated file

Wait for the user to approve or adjust before proceeding.

### Step 5: Generate the documentation

Create the following, using the templates from `agent/new.md` as the basis:

**Root level:**
- `README.md` — project overview with tree-format map of all modules. One-line descriptions for each module and key file. Direct file path references throughout.

**Per module (based on template type):**

For each **documentation module**:
- `README.md` — what's here, navigation, any guidelines as a section

For each **codebase module**:
- `README.md` — project overview, architecture, how to run, guidelines
- `context/index.md` — graph-based map with nodes (every file with description) and edges (dependencies, relationships)
- `context/current-state.md` — current deployment status, known issues, what's working

For each **device module**:
- `README.md` — what the device is, guide list, overview
- `context/environment.md` — connection info, OS, what's installed, what's running

For **all modules with active work**:
- A plan file following the standard in `agent/new.md`

**Add optional context files** where the user indicated they're needed:
- `decisions.md` — if the project has architectural decisions worth recording
- `changelog.md` — if a device module needs change tracking
- `guidelines.md` — if coding standards or rules are too extensive for the README

### Step 6: Create the IDE-specific entrypoint

Create the behavioral entrypoint file for whichever IDE/agent platform the project uses. This entrypoint should load `agent/intro.md` — either by including its content directly or by instructing the agent to read it.

**For Claude Code:** Create `CLAUDE.md` at the repo root. Claude Code reads this file automatically at session start — no manual loading needed. Recommended content:

```markdown
# CLAUDE.md

Read `agent/intro.md` for behavioral rules, then follow the process described there.

For project context, start with the root `README.md` and navigate depth-first.
```

You can also inline the full content of `agent/intro.md` into `CLAUDE.md` if you prefer a single file. The tradeoff: one file is simpler, but two files means `intro.md` stays IDE-agnostic and `CLAUDE.md` can hold Claude-specific additions.

**For other IDEs:** Create the equivalent file for that platform (e.g. `.cursorrules` for Cursor, `.github/copilot-instructions.md` for Copilot). The content is the same — point the agent at `agent/intro.md`.

### Step 7: Regenerate `agent/system-environment.md`

Regenerate for this machine:
1. Read the current file to see its structure.
2. Run system commands to gather environment data — OS, kernel, CPU, memory, storage, user, hostname, installed runtimes, git version. Adapt for the platform.
3. Rewrite the file with the new data.

### Step 8: Clear `agent/thoughts.md`

Reset the thoughts file — keep the format header, remove entries from the previous project. The agent can start adding new observations as it works on this project.

### Step 9: Delete the example module

Delete `example-module/` if it still exists. It's only there to show the layout — real modules replace it.

### Step 10: Review

Read through everything that was generated:
- Does the root README accurately map the project?
- Does each module README accurately describe its contents?
- Are all file references using exact relative paths?
- Do context files reflect the actual current state?
- Is the entrypoint concise and correct?
- Is system-environment.md accurate for this machine?

Present a summary to the user of what was created and any remaining questions.

---

## After setup

- Start new sessions in the repo directory. The IDE loads the entrypoint automatically (or you provide `agent/intro.md` manually). Provide a plan file if continuing previous work.
- Create new modules using `agent/new.md`.
- End sessions by following `agent/cleanup.md`.
- For background on why things are structured this way, see `agent/architecture.md`.
