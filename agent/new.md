# new.md — creating modules and plan files

Use this file when creating a new module or starting a new plan file in an existing module. This file defines the module templates, their context file types, and how to set them up.

For background on why the templates are structured this way, see `agent/architecture.md`.

---

## READMEs and navigation (for authors)

Agents are steered to navigate **depth-first on READMEs** (see `agent/intro.md`): root `README.md` → choose the branch that fits the task → that folder's `README.md` → repeat, then **plan files** for that module, then `context/` and guides. When you author a module `README.md`, put **what this folder is**, **sub-modules / key files**, and **pointers to active `plan-*.md` files** early so a depth-first pass can commit to the right branch without opening unrelated siblings first.

**Module-level `meta/` (optional):** Any module may include a **`meta/`** folder at the module root for **disposable verification artifacts** — tiny test scripts, one-off probes, saved **test or build log output**, fixture dumps. Use it during **Act** and especially **Review** when a plan calls for *run tests*, *smoke check*, or *capture command output*: put scripts and outputs here so **`context/`** stays reserved for durable state and **`src/`** stays clean. List `meta/` in the module `README.md` and in **`context/index.md`** (codebase) as nodes if present. Do not treat `meta/` as authoritative long-term state — summarize outcomes in the plan file and in context files as appropriate.

---

## Module templates

There are two base templates. They are **building blocks, not rigid categories** — most real modules combine elements. Pick the pieces that fit your module and explain the setup in the module's README. Be creative to match needs; the README at the module level documents which template pieces are in use and why.

### Documentation template

Use when the module is mostly prose, guides, or reference material. The documentation IS the content — there's no separate system to track.

**Default structure:**
```
module/
├── README.md              # what's here, navigation, current state
├── plan-*.md              # active work (at module root, only when needed)
├── meta/                  # optional — test outputs, scratch (see "Module-level meta" above)
└── guides, reference...   # the actual content
```

**Default context files:**
- `README.md` — overview, navigation, current state. The README tree continues into subfolders if the module is nested.
- `plan-*.md` — at module root. One per active task, each self-contained. The user decides when to delete plan files.

**No `context/` folder.** The documentation IS the current state and meta information. Plan files sit alongside the README.

**Optional context files** (add at module root when needed):
- `decisions.md` — architectural or design decisions worth preserving beyond the lifetime of a plan file. "We chose approach X over Y because Z." Prevents future agents from re-trying failed approaches.
- `guidelines.md` — dedicated behavioral guidelines for the module when they're extensive enough to clutter the README. Layered on top of `agent/intro.md`.

---

### Codebase template

Use when the module is a code project — an API, a frontend app, a library, a service, infrastructure-as-code, or anything where code files are the primary artifact. Code files don't contain enough info about design intentions — the context files bridge that gap.

**Default structure:**
```
module/
├── README.md              # project overview, architecture, how to run, guidelines
├── context/
│   ├── index.md           # graph-based code map
│   ├── current-state.md   # what's working, what's broken, known issues
│   └── plan-*.md          # active work
├── meta/                  # optional — local test scripts, junit/log captures, smoke-run output
├── src/                   # (or whatever the code structure is)
│   ├── README.md          # README tree continues into code folders
│   └── ...
├── Dockerfile             # if containerized
└── ...
```

**Default context files:**

`context/index.md` — A graph-based map of the entire module. Research shows LLMs understand file structure better in graph format than flat directory listings.

**Nodes**: every file in the module — code files, context files, READMEs, guides, everything. Each node has a description of what the file contains and its purpose, detailed enough that the agent doesn't need to open the file to understand it. Sub-modules are listed as nodes with a reference to their own `context/index.md` for internals.

**Edges**: dependencies and relationships between nodes — imports, calls, extends, depends on. For context files: which plan file targets which code files, which guidelines apply to which components. For nested modules: how sub-modules relate to each other (e.g., frontend consumes backend API).

All file references use exact relative paths from the module root.

Update when files are created, deleted, renamed, or their purpose/relationships change.

Example:
```markdown
## Nodes

- `README.md` — Project overview, architecture, how to run, guidelines
- `context/index.md` — This file. Graph-based map of the codebase.
- `context/current-state.md` — What's working, known issues, active branches
- `context/plan-auth-refactor.md` — Active plan for refactoring the auth module
- `src/server.ts` — Express server entry point, configures middleware and routes
- `src/auth/middleware.ts` — JWT authentication middleware, validates tokens on protected routes
- `src/auth/token-service.ts` — Token generation and validation, wraps jsonwebtoken
- `src/db/user-repository.ts` — User CRUD operations against PostgreSQL
- `frontend/` — Sub-module: React frontend (see `frontend/context/index.md`)

## Edges

- `src/server.ts` → `src/auth/middleware.ts` (imports, applies as route middleware)
- `src/auth/middleware.ts` → `src/auth/token-service.ts` (calls for token validation)
- `src/auth/token-service.ts` → `src/db/user-repository.ts` (queries user data for claims)
- `context/plan-auth-refactor.md` targets `src/auth/` (plan scope)
- `frontend/` → `src/server.ts` (consumes API endpoints)
```

`context/current-state.md` — What the system looks like right now. Separate from README because this changes frequently:
- What's working, what's broken, known issues
- Active branches and what they're for
- Recent significant changes that affect how to work with the code
- Deployment or runtime status (if applicable)

`context/plan-*.md` — One per active task. Self-contained. The user decides when to delete plan files.

**README.md** stays in the main folder structure alongside code (not in context/). The README tree continues into code subdirectories — each significant folder can have a README explaining what's in it.

**Guidelines and rules** (coding standards, conventions) go in the README as a section for simple cases.

**Optional context files** (add in `context/` when needed):
- `context/decisions.md` — Architecture Decision Records (ADRs). Recommended for any non-trivial codebase. "We tried X, it failed because Y, we went with Z." "We chose library A over B because..." Persists beyond plan files so future agents don't re-try failed approaches.
- `guidelines.md` (at module root) — Dedicated behavioral guidelines for the module, layered on top of `agent/intro.md`. Use when guidelines are extensive enough that they'd clutter the README (coding standards, deployment rules, security requirements, testing conventions). The agent loads these when entering the module.

---

## Custom context types

The templates define defaults and recommended optional types, but modules can add any custom context files they need. If a module needs something not covered by the templates (e.g. `migrations.md` for database schema tracking, `dependencies.md` for cross-module relationships, `api-reference.md` for external integrations, `environment.md` for runtime/deployment target details), add the file and explain it in the README.

The principles stay the same for any context file: concise, compartmentalized, non-redundant, and documented in the module's README so the agent discovers it through normal navigation.

---

## Mixing templates

Most real modules combine elements from multiple templates. Examples:
- A web app with infrastructure config → codebase template + optional `environment.md` for deployment targets
- Infrastructure-as-code (Terraform, Docker configs) → codebase template
- A documentation site with a build step → documentation template + some codebase elements (index for the build tooling)

The README at the module level explains which pieces are in use. Don't force a module into one template — pick the context files that serve it and skip the ones that don't.

---

## The `context/` folder

**Not the same as `meta/`:** `context/` holds **durable** state and plans. **`meta/`** holds **disposable** verification artifacts (test logs, scratch scripts). See **Module-level `meta/`** above.

The `context/` folder exists when there's "meta" information about a thing that's separate from the thing itself:
- A codebase has code + context about the code
- A documentation module's content IS its meta information — no context/ folder needed

---

## Plan file standard

Plan files track active work. When work is complete, the permanent record lives in the README and context files. The user decides when to delete a plan file — the agent does not delete plan files on its own. The user may want to keep plan files for iteration or reference.

**Location:**
- Documentation template: `plan-*.md` at module root
- Codebase template: `context/plan-*.md`

**Naming:** `plan-<slug>.md` where slug is short, lowercase, hyphenated (e.g. `plan-auth-refactor.md`, `plan-deploy-staging.md`).

**Multiple plans per module:** allowed. Each is self-contained with its own slug.

**Tests and verification:** A plan may include **Review** work — unit tests, integration tests, `build`, `curl` checks, or probes. Say **what to run** and **where evidence goes** (e.g. "save stdout to `meta/last-smoke.txt`"). Small scripts and log captures belong in the module's **`meta/`** folder, not mixed into `context/`; put pass/fail conclusions and impact on system state in **Notes** and in **`context/current-state.md`**.

**Standard structure:**
```markdown
# plan-<slug>.md — <short description>

Self-contained. A new agent with no chat history should be able to read
this file and continue the work.

## Context references

- Module: `path/to/module/`
- Read: `context/current-state.md` (current state), `context/index.md` (code map)
- Guidelines: `guidelines.md` (if one exists for this module)

## Background

What we're doing and why. 1-3 sentences.

## Plan

Full approach, dependencies, risks.

## Progress

- [x] Step 1: Set up database schema — done
- [x] Step 2: Implement repository layer — done, deviated: used query builder instead of raw SQL
- [ ] Step 3: Add API endpoints — next
- [ ] Step 4: Write integration tests

## Next steps

What specifically should happen next. A fresh agent should be able to read
Background + Next Steps and get moving without parsing the entire plan.

Step 3 is next. Need POST /users and GET /users/:id endpoints.
Repository layer from step 2 is ready. See `context/index.md` for file locations.

## Notes

Failed attempts with enough detail to avoid re-trying:
- Step 2: tried raw SQL with template literals, hit SQL injection concerns.
  Switched to query builder. Recorded in `context/decisions.md`.

Decisions made during this task:
- Chose query builder over ORM to keep dependency footprint small.

## Verification (optional)

Commands or test targets for Review, and where output is stored:
- `npm test` — expect green; last log: `meta/test-output.txt`
- Or: smoke script `meta/probe-api.sh` (document result in Notes)
```

Plan file sections explained:
- **Context references** — direct paths to files the agent should read before continuing. Tells a new agent exactly what to load without navigating the full tree.
- **Background** — what and why, brief.
- **Plan** — full approach, not just what's next but the complete picture.
- **Progress** — status per step with notes on deviations and failures. Not just checkboxes — include what happened.
- **Next steps** — what to do right now. A fresh agent reads Background + Next Steps to get moving fast.
- **Notes** — failed attempts (what was tried, what error, why it didn't work), decisions made during the task. Enough detail that a future agent won't re-try something that already failed.
- **Verification (optional)** — tests, builds, or checks to run during Review; paths under **`meta/`** for scripts and captured output; conclusions still summarized in Notes and context files.

**README references active plans** so the agent discovers them through normal navigation: "Active work: [plan-auth-refactor.md](context/plan-auth-refactor.md) — refactoring the authentication module."

---

## Direct file references

All context files, READMEs, plan files, and guides should reference other files using exact relative paths. Not "the state file" — `context/current-state.md`. Not "the setup guide" — `setup-guide.md`. The agent should always know exactly where a file is without searching.

This applies to:
- README descriptions of what's in a folder
- Plan file context references and notes
- Index.md nodes and edges
- Any cross-reference between documentation files

---

## Creating a new module

1. Choose a template (or combination) based on what the module is.
2. Create the folder with README.md and the template's default context files.
3. Write the README: what this module is, what's in it, which template pieces are in use, any guidelines.
4. If there's immediate work to do, create a plan file.
5. Update the parent folder's README to list the new module.

---

## Regenerating system-environment.md

When setting up this project on a new machine, regenerate `agent/system-environment.md`:

1. Read the current file to see its structure.
2. Run system commands to gather environment data (OS, kernel, CPU, memory, storage, user, hostname, installed runtimes, git version — adapt for the platform).
3. Rewrite the file with the new data, keeping the same structure.
