# index.md — project index (with descriptions)

**For agents:** Paths and one-line descriptions. Use this to **choose what to open** (e.g. need test results → test-summary; need wiring → wiring doc) instead of scanning the file tree. Read **agent/intro.md** first for read order; use this file when you need to pick the next doc.

**Humans:** Table of contents with one-line summaries.

---

## Project root

| Path | What's in it |
|------|--------------|
| README.md | For humans. What the template is, what's in agent/, how to use it (copy, setup, new module, intro + WIP). |

## Agent docs (shared context)

| Path | What's in it |
|------|--------------|
| agent/current-state.md | For agents. Project-level entry: what the project is, how it's organized, where to go next (intro, index, modules). Read first for whole-project overview. |
| agent/intro.md | Entry point. Where to get WIP state, module state, execution env; read order; paths; rules. Read first when user points you here. |
| agent/new.md | How to start a new WIP or create a new module. Module layout, WIP doc format, branch naming, step-by-step workflows. Use when user says to start a WIP or create a module. |
| agent/system-environment.md | Run environment for this project (OS, interfaces, config). Regenerated per machine. Use when WIP involves host, hardware, or run environment. |
| agent/cleanup.md | End-of-session pass: sync module README and WIP doc, update env/index, push to WIP branch. Use when user says "clean up according to cleanup.md". |
| agent/setup.md | Initialize a new project after copying agent folder. Regenerate system-environment; update this index if needed. Use when user says to set yourself up. |
| agent/index.md | This file. Paths and descriptions of agent docs and each module's key files. |

## Modules

**Example module (template only).** The template includes **example-module/** to show the standard layout and **example-module/example-submodule/** to show **nesting**—same format (README, context/, code) at every level. When the user runs **agent/setup.md** to initialize a new project, **delete the entire example-module/ folder** (including the submodule) and remove this "Example module" section from the index so the new project starts with no modules.

| Path | What's in it |
|------|--------------|
| example-module/README.md | For humans. What the example module is; reference for module layout; mentions nested submodule. Deleted during setup. |
| example-module/context/current-state.md | For agents. Example of module current-state format; says to delete this module during setup. |
| example-module/context/wip-example.md | Example WIP doc format. Deleted during setup. |
| example-module/example-submodule/README.md | For humans. Nested example—same layout as top-level module; shows nesting is part of the format. Deleted during setup. |
| example-module/example-submodule/context/current-state.md | For agents. Example of submodule current-state; same format at every level. Deleted during setup. |
| example-module/example-submodule/context/wip-example.md | Example WIP doc for a nested module. Deleted during setup. |

When you create real modules with **agent/new.md**, add each module and its key files to this index with a one-line description. Modules live at repo root or can be nested (e.g. `parent/sub-module/`); each has a **README** (for humans), **context/** (current-state.md, WIP docs, notes), and code. Same format at every level.
