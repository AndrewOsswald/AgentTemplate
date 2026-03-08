# intro.md — agent context

**For agents:** You have no prior context.

**Read order:** (1) This file. (2) If the user gave a WIP doc path, open it next—it gives the exact read order (e.g. current-state, README, system-environment if needed). Follow that. (3) If no WIP path, read **agent/current-state.md** for project overview, then **agent/index.md** to choose other docs by description (don’t scan the file tree).

**Humans:** Give agents this intro and a WIP doc path so they can load context efficiently.

---

## Context sources (where to get what)

| Need | Source |
|------|--------|
| Whole-project overview (for agents) | **`agent/current-state.md`**. What the project is, how it's organized, where to go next (intro, index, modules). Read first when you need project-level context. |
| WIP state (Planned / In progress / Completed) | WIP doc. User gives path or "the WIP doc"; search `**/context/wip-*.md` if needed. Do not assume; read the doc. |
| Module intro, rules, and state (for agents) | **`context/current-state.md`** in the module folder. Start here for this module: what the code is and does, how it fits in the project, rules (best practices, what not to do), then wiring/code/working/not/next. You don't need the whole-project description—just this file for this module. |
| Module overview, how to run (for humans) | **README** in the module folder. Human-oriented; open for narrative and run steps when needed. |
| Execution environment (OS, hardware, config, interfaces) | **`agent/system-environment.md`** when the WIP involves host or run environment. Module README may also specify (e.g. "runs in Docker", env vars). Do not guess. |
| List of docs and what's in each | **`agent/index.md`**. Path + one-line description per file so you can pick what to read without opening files to peek. |
| Start new WIP or create new module | **`agent/new.md`**. One branch per WIP (`main--<wip-slug>`); cleanup pushes to that branch. |

## How to read module docs

- **Agent entry for this module:** **`context/current-state.md`** first (what the code is, rules, wiring/code/working/not/next). Do not infer state from the WIP doc alone.
- **Overview and how to run:** **README** in the module folder. Other **context/** files (wiring, test-summary, API spec, etc.) as the WIP doc or task requires.

## Execution environment

**Where code runs is not assumed.** The project may target a laptop, a server, a container, or embedded hardware. The WIP doc and module current-state (and, when relevant, **`agent/system-environment.md`**) describe the run environment—what host or container, what config or interfaces are available. Read those; do not assume a specific OS or environment.

## Paths

- **Repo root** = project root. Contains **README** (for humans). Project-level agent context is **agent/current-state.md**.
- **`agent/`** — Shared agent docs: current-state.md, intro.md, new.md, cleanup.md, setup.md, index.md, system-environment.md. No module-specific content. **index.md** = paths + one-line descriptions (use it to choose what to open instead of scanning the tree).
- **Modules** — One folder per module (at repo root or nested, e.g. `my-service/`, `parent/sub-module/`). Each has README, **context/** (WIP docs, notes), and code. Same format at every level. New-module layout: **`agent/new.md`**.
- **New project init:** **`agent/setup.md`**.

## Rules

- WIP state only from the WIP doc. Run environment (OS, hardware, config) only from system-environment or the module. Do not guess.
- Work on the WIP's branch: **Branch:** `main--<wip-slug>` in the WIP doc; commits and cleanup push to that branch.

## Keeping docs in sync

- **As you work:** Update **context/current-state.md** and WIP doc (Planned / In progress / Completed); update README when overview or how-to changes. If you change agent/ or context/ layout or install/remove software, update **`agent/system-environment.md`** or **`agent/index.md`**.
- **Final pass:** User says "clean up according to cleanup.md" → follow **`agent/cleanup.md`** (sync docs, push to WIP branch).

## Best practices

**Per-module:** Each module's **context/current-state.md** states rules and best practices for that module. **Run environment:** **`agent/system-environment.md`** when the WIP involves host, hardware, or config.
