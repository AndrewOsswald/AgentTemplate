# architecture.md — how and why this system works

This file explains the agentic architecture used in this project. It is designed to get a new agent or human fully up to speed on the system — the process, the documentation structure, the principles behind it, and how everything fits together.

For template details and instructions on creating modules, see `agent/new.md`.

---

## The problem this solves

A new agent session is like a senior developer hired today. It knows how to write good code — it doesn't know anything about what we have right now. If you tell it exactly what to do, it can do it. But if it has to guess about the project's structure, intentions, or current state, it makes mistakes.

Two things determine whether an agent produces accurate results:

**Context Quality** — the agent needs documentation that is highly explicit and in natural language. A code file or documentation file doesn't contain enough info about design intentions for an agent to effectively make modifications. Good documentation bridges that gap between what the files contain and what the developer intended.

**Context Selection** — the agent needs documentation that is concise, compartmentalized, non-redundant, and easy to navigate. Too much non-relevant information in the context window — even if the information is accurate — causes the agent to lose focus and give worse answers. This happens because the model's attention gets pulled toward whatever is in front of it, relevant or not. Bigger context windows and smarter models don't fix this — they just give you more room to make the same mistake. Selective, relevant context does fix it.

Both are equally important. The agent needs good information, but too much good information is still a problem. The solution is documentation that is high quality AND structured so the agent can find exactly what's relevant without loading everything else.

This architecture solves both problems by making the documentation structure itself the mechanism for autonomous context management. The agent doesn't need a massive instruction file telling it what to read — the structure guides it.

---

## Additional principles

- **The agent writes and maintains its own documentation.** When the agent writes the docs, it writes them in a way it can understand later. When a human writes docs for an agent, the result is usually either too vague or structured in a way the agent doesn't naturally navigate. Let the agent do the writing — ask it for the *information* and let it put it in the right place.
- **Files are kept in the repo and tracked by git.** This provides history, rollback, and persistence across sessions.
- **Sessions should be short and frequent.** Long sessions accumulate conversation history that the agent can't unsee — old questions, dead-end approaches, superseded plans. All of that competes for attention with the actual task. Since all context lives in files (not chat history), ending a session costs nothing. A fresh session with good docs is more effective than a long session with stale context.
- **Establish the rules before the work starts.** If the agent loads `agent/intro.md` at the start of every session, it follows the same process every time — same navigation pattern, same documentation habits, same "ask don't assume" rule. Without that anchor, each session drifts in its own direction and the docs get inconsistent.
- **What explains well for an agent explains well for a human.** No separate agent/human documentation — one set of docs serves both audiences with clear, explicit natural language.
- **Assumptions are where agents make mistakes.** A simpler model with complete information will outperform a powerful model that has to guess. When something is unclear, the agent should ask — a question is always cheaper than a wrong change.
- **Setup is iterative, not exhaustive.** Good documentation comes from working conversations over time — not from a single interrogation session. The skeleton gets created first; details get filled in as the developer explains things through actual work. See `agent/setup.md`.

---

## The process: observe / plan / act / review

Four steps with a smart loop. The agent performs each step autonomously using the documentation structure. Review decides whether to stop or loop back to an earlier step.

```
observe → plan → act → review
            ↑              │
            │              ↓
            └── loop back based on what review found
                (or stop when done)
```

### Observe

The agent orients itself on the project and finds the context relevant to the user's request. How this works depends on what the user provides at session start:

**New request (intro.md only):**
1. Read `agent/intro.md` — behavioral rules, the decision loop, core rules
2. Read root `README.md` — project overview, tree-format map of all modules
3. User makes a request
4. Navigate to the relevant module's README — what's there, current state, guides, context files
5. Load deeper context files only if needed — current-state, index, active plan files

The agent reads 2 files to orient (intro + root README), then drills into only what's relevant.

**Continuing previous work (intro.md + plan file):**
1. Read `agent/intro.md` — behavioral rules, the decision loop, core rules
2. Read the provided plan file — already contains which module, what the task is, what's been done, where we left off
3. Navigate to the relevant module's context files referenced by the plan
4. Pick up from wherever the plan indicates — might resume acting, might need to re-plan if something changed

The plan file shortcuts the observe step. Instead of navigating the full README tree, the agent already knows which module and what the task is. It just needs to load the current context to verify nothing has changed since the last session.

### Plan

The agent understands the request, clarifies unknowns, and prepares to act.

**How it works:**
1. Identify which module is relevant and navigate to it
2. Check for existing plan files related to the request
3. **Identify gaps — anything unclear or that would require an assumption. Ask the user.** Do not proceed with assumptions.
4. For complex tasks (multiple steps, multiple files, system state changes): create or update a plan file
5. For simple tasks (single-step, no state change): plan in the response and proceed

The plan file is self-contained — a fresh agent with no chat history can read it and continue the work. It captures: what the user wants, which files/components are affected, the approach, dependencies, risks. It may also list **verification** steps (tests, builds, smoke checks) and point to **`meta/`** under the module for scripts and saved output (see `agent/new.md`).

### Act

The agent executes the plan and updates documentation as it goes.

**How it works:**
1. Follow the plan. Minor adjustments: note the deviation and continue. Significant deviations: stop, go back to plan, confirm with the user.
2. Update context files immediately to reflect actual state — even if something is broken or half-done. These files must be honest.
3. Update README and guides at logical milestones — when a capability is actually working, not when it's half-installed.
4. Track progress continuously in the plan file — planned → in progress → done. Note failures and deviations.
5. Commit at logical checkpoints.

The agent does NOT delete plan files or context files (that's the user's decision), change scope without going back to plan, or skip documentation updates.

**Which file gets which information:**
- Plan file → task progress, failed attempts, decisions, temporary state; optional **Verification** (tests to run, paths under `meta/` for output)
- Context files (current-state.md) → what the system actually looks like right now
- README → what the module is and what's in it (stable overview)
- Index (codebase) → file structure and relationships
- Guides → how to set up or operate things
- Module **`meta/`** (optional) → disposable test scripts, captured command/test output during Act/Review — not long-term source of truth

### Review

The agent verifies the work is correct and documentation is accurate, then decides whether to loop.

**Verification:**
- Codebase: build, run tests, verify the change works, check for regressions
- Documentation: re-read changed docs for accuracy, check references and links

For **repeatable evidence** (logs, small probe scripts, junit output), prefer the module's optional **`meta/`** folder — keep **`context/`** for durable state summaries, not raw dumps. The plan file's **Verification** section can name commands and output paths.

**Documentation check:**
- Do context files accurately reflect the current state?
- Does the README still accurately describe the module?
- Is the plan file up to date with what was done?
- Were guides updated if procedures changed?
- Is the index updated if file structure changed? (codebase)

**The loop decision — based on the goal in the plan:**
- Everything looks good → confirm with user, stop
- Small fix needed → loop back to **act**
- Approach fundamentally wrong → loop back to **plan**
- Context changed or scope expanded → loop back to **observe**

The user decides when to delete plan files. The agent does not delete plan files or context files on its own.

---

## The README tree

The README tree is the navigation backbone of the entire system. Every folder has a `README.md` that explains what's in the folder, lists sub-modules and files with brief descriptions, and links deeper.

**Why README.md:**
- IDE-agnostic — universally recognized across all editors and platforms
- Auto-rendered on GitHub, GitLab, Bitbucket — documentation is visible without clicking into files
- Agents are trained on millions of repos that use README.md — they already know to look for it
- The name literally means "read me first" — exactly the behavior we want

**How it solves context selection:**
- The agent navigates top-down, only reading deeper into what's relevant
- Each README is a self-contained entry point for its level
- No centralized index file needed — the tree IS the index
- The agent never has to load the entire project to understand one module

**Depth-first on READMEs (not breadth-first browsing):** From the root map, choose the **matching branch** and open READMEs **down that path** before exploring unrelated folders at the same level. Listing every sibling (e.g. all files in `agent/` before picking a module) mimics breadth-first at one level and pulls in meta files that are not operational state. After the correct module README, the next tier of dependable task context is usually that module's **`plan-*.md`**, then `context/` and guides.

**Unified agent/human documentation:**
- No separate "For agents" and "For humans" sections
- One README per level serves both audiences
- Clear, explicit natural language helps agents navigate AND helps humans understand

---

## The agent/ folder

The `agent/` folder exists at the project root only. Sub-modules do not have their own agent folders. It contains the behavioral layer and project-level tools:

| File | Purpose |
|---|---|
| `intro.md` | Behavioral core — persona, rules, decision loop. Loaded every session. |
| `architecture.md` | This file — explains why things are structured this way. Reference only, not in the critical path. |
| `new.md` | How to create modules. Contains the templates with defaults, optionals, and custom types. |
| `cleanup.md` | End-of-session review process. |
| `setup.md` | Bootstrap this architecture into a new project. Iterative — covers first session and beyond. |
| `context-refinement.md` | Documentation audit workflow (Planner question bank + parallel evaluators). |
| `thoughts.md` | Agent observations journal. |
| `system-environment.md` | Dev machine environment reference. |
| `meta/README.md` | Explains `agent/meta/` — audit artifacts, not operational state. |

The behavioral hierarchy:
- `agent/intro.md` → universal rules, always active
- Module-level `guidelines.md` (optional) → module-specific rules, active when working in that module

---

## Module templates

Two base templates that serve as building blocks. Most real modules combine elements. The README at the module level explains which pieces are in use and why.

### Documentation template
For modules that are mostly prose, guides, or reference material. The documentation IS the content — there's no separate system to track.

- Default: README.md + `context/` folder for plan files
- Optional: `context/decisions.md`, `guidelines.md`

### Codebase template
For code projects. Code files don't contain enough info about design intentions — context files bridge that gap.

- Default: README.md + `context/` folder with `index.md`, `current-state.md`, plan files
- `index.md` is a map of the module with two parts: **files** (called "nodes" — every file with a description detailed enough that the agent doesn't need to open it) and **relationships** (called "edges" — which files import, call, or depend on other files). Sub-modules are listed as nodes with references to their own index. This format works better than a flat directory listing because it captures *how things connect*, not just what exists.
- Codebase modules can be nested (monorepo pattern) — each sub-module has its own `context/index.md`
- README tree continues into code subdirectories
- Optional: `context/decisions.md` (ADRs), `guidelines.md`

### Mixing and custom types
Templates are building blocks. Infrastructure-as-code is a codebase. A monorepo is multiple codebase modules nested. Modules can add any custom context files they need — the README documents what's there and why.

**Direct file references:** All context files, READMEs, plan files, and guides reference other files using exact relative paths — not "the environment file" but `context/environment.md`. The agent should always know exactly where a file is without searching.

Full template details, structures, index.md format, and plan file standard are in `agent/new.md`.

---

## How context files work together

Each type of file answers a different question. Together they give the agent complete context without redundancy:

| File type | Question it answers | Updates when |
|---|---|---|
| **README** | "What is this and what's in it?" | Big picture changes — new capabilities, new guides, architectural shifts |
| **Plan file** | "What are we working on and how far along?" | Continuously during a task — planned → in progress → done |
| **Module `meta/`** (optional) | "What raw test/build output or probe scripts exist for this module?" | During Act/Review when running checks; prune or overwrite as needed — summarize results in plan Notes and context |
| **Current-state** (codebase) | "What does the system look like right now?" | Immediately when state changes — even if broken |
| **Index** (codebase) | "What files exist and how do they relate?" | When file structure or relationships change |
| **Guides** | "How do I set up or operate this?" | When procedures change — steps that failed, deviations, new steps |
| **Decisions** (optional) | "Why is it this way? What was tried and rejected?" | When a significant decision is made during any task |
| **Guidelines** (optional) | "What rules apply when working in this module?" | When standards or conventions change |

The plan file is temporal — it tracks a task from start to finish. Context files are spatial — they describe the state of a thing right now. When a task is complete, the plan file's useful information has already been captured in the permanent context files. The user decides when to delete plan files.

---

## How a new session works (end to end)

There are two ways a session starts: with a new request, or continuing previous work.

### Starting a new request

The user provides `agent/intro.md` (or the IDE loads it automatically) and makes a request.

1. **Agent reads `agent/intro.md`** — learns the persona, core rules (don't assume, ask when unclear, update docs), and the decision loop. Gets a pointer to the root README.

2. **Agent reads root `README.md`** — sees a tree-format map of all modules with one-line descriptions. Now it knows what the project contains and where things are.

3. **User makes a request** — e.g., "add authentication to the API."

4. **Observe**: Agent navigates to the relevant module's `README.md`. Reads the overview, sees the file list, notes active plan files. Reads `context/index.md` and `context/current-state.md` to understand what's currently there.

5. **Plan**: Agent identifies gaps — what auth strategy? what library? any dependencies? Asks the user. Once clear, creates or updates a plan file in `context/plan-*.md`.

6. **Act**: Agent implements the changes. Updates `context/index.md` with new files, `context/current-state.md` with what's working. Updates the plan file with progress. When the feature is working, updates the README.

7. **Review**: Agent runs tests, verifies the feature works. Checks that documentation reflects reality. Confirms with the user.

### Continuing previous work

The user provides `agent/intro.md` AND a plan file from a previous session.

1. **Agent reads `agent/intro.md`** — behavioral rules and decision loop.

2. **Agent reads the provided plan file** — already knows which module, what the task is, what's been done, where the previous session left off. The plan file is self-contained.

3. **Agent loads relevant context** — navigates to the module's context files (current-state.md, index.md) to verify nothing has changed since the last session.

4. **Agent picks up from the plan** — if steps 1-3 are done and step 4 is next, the agent starts at step 4. If the previous session hit a failure, the agent sees it in the plan file and can decide how to proceed (retry, re-plan, ask the user).

The plan file shortcuts the full observe step. The agent doesn't need to navigate the entire README tree — it already knows where it's going.

### Session independence

At any point, if a session ends, the documentation reflects reality:
- Context files have been updated immediately during act
- The plan file tracks exactly where the task stands
- A new session can read the plan file and continue without any chat history
- No context is lost — it all lives in files, not in the conversation

---

## Memory and artifacts

The agent's knowledge and the things it produces are two separate layers:

- **Memory** (`memory/`) — the agent's knowledge, organized for retrieval. Understanding of the codebase, the project, the user's intentions, decisions, heuristics — everything the agent knows. The agent owns and organizes this. Can be restructured freely without touching anything else.
- **Artifacts** — everything the agent produces from that knowledge. Code, human documentation, config files, IDE instruction files (like `copilot-instructions.md` or `agent/intro.md`), plan files — anything in the repo that isn't memory.

**The learning process is bidirectional:**
- **Memory → artifacts:** The agent uses its knowledge to produce and update artifacts.
- **Artifacts → memory:** The agent learns from the work it does — creating code, reading docs, making decisions, receiving feedback — and encodes that knowledge back into memory.

This separation means the memory tree can be reorganized without touching code, docs, or config. Artifacts follow their own conventions. Growing and restructuring memory doesn't risk breaking anything.

### The memory structure: a navigable graph with tree-like hierarchy

The memory lives in `memory/` at the repo root. It's organized by domain (e.g. devices, networking, workflows), not by memory type. When an agent works on a task, it wants all relevant knowledge for that domain in one place.

**It's a graph, navigated like a tree:**
- **Folders provide the tree backbone** — hierarchy, depth, position awareness, domain grouping. The agent always knows where it is from the folder path.
- **Links between files provide the graph** — cross-references connect knowledge across domains. Any file can reference any other file.
- **Navigation is depth-first** — start at `memory/README.md`, pick the relevant branch, go deeper. Same pattern as the README tree for code modules.

No hard distinction between navigation nodes and content nodes — any file can contain knowledge AND point to other files.

### Memory file format

Markdown with YAML frontmatter. Each memory file includes:
- `type` — state, heuristic, preference, procedure, decision, or custom
- `confidence` — high, medium, or low
- `last-updated` — when the memory was last touched

The body contains the knowledge, why it matters, and optionally when it applies. References to artifacts use relative file paths from the repo root.

### The learning process

Learning is always on. As the agent works, it continuously evaluates what knowledge is worth encoding into memory. Effort scales with importance — a trivial fact gets a quick append, a major insight gets careful integration.

The agent acts dynamically: adding new files, appending to existing ones, consolidating ideas, reorganizing the tree, or letting go of things that aren't important. The tree should get better over time, not just bigger.

The full learning process is detailed in `agent/learning.md` (loaded on demand). The intro file contains a compact pointer so the agent is always aware memory exists.

See `agent/plan-memory-process.md` for the full design history and decisions.

---

## The `context/` folder

The `context/` folder exists when there's meta-information about a thing that's separate from the thing itself:

- A **codebase** has code + context about the code (index, current state, plans)
- A **documentation** module's content IS its meta-information — no context/ folder needed

> **Note:** The memory tree (`memory/`) is the long-term home for the agent's accumulated knowledge. The `context/` folder in code modules holds module-specific working state (current-state, index, active plans). The relationship between these two is being refined — see `agent/plan-memory-process.md` for the active design work.

---

## Why this works

The architecture solves context quality and context selection simultaneously:

**Context quality** is solved by:
- Explicit natural language documentation at every level
- Documentation written and maintained by the agent itself
- Context files that always reflect actual reality (including broken states)
- Clear separation of concerns (each file answers one question)
- The memory tree — the agent's accumulated knowledge, structured for retrieval quality

**Context selection** is solved by:
- The README tree — top-down navigation loads only what's relevant
- The memory tree — domain-organized, depth-first navigable, only relevant memories loaded
- Compartmentalized documentation — each file is focused and non-redundant
- Per-module context — the agent only loads the context files for the module it's working on
- Behavioral/navigation separation — intro.md is short because project details live in the README tree
- Templates that match context structure to project type — no unnecessary files

**Session independence** is solved by:
- All context lives in files, not in chat history
- The memory tree persists the agent's knowledge across sessions and devices
- Plan files are self-contained — a new agent can continue any task
- Context files always reflect current reality
- Sessions can be short without losing information
- Git tracks the history of documentation and memory changes

The result: an agent can handle context quality and context selection completely autonomously. It doesn't need the user to point it at the right files or tell it what to read. The documentation structure and memory tree guide it.
