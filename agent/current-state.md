# current-state.md — project-level agent context

**For agents:** Agent entry for the **whole project**. Read this when you need project overview (what the repo is, how it's organized, where to go next). For a **specific module**, read that module's **context/current-state.md** instead—not this file.

---

## What this project is

This repo is an **agent context template** for new projects. It contains only shared agent docs and no module folders. It is meant to be copied or cloned; then an agent runs **agent/setup.md** to initialize for the new machine, and **agent/new.md** is used to create modules and WIPs.

- **Purpose:** Give new projects a standard place for agent context (WIP state, module state, run environment, read order) so agents can onboard quickly from **agent/intro.md** and a WIP doc path.
- **Audience:** The root **README** is for humans (overview, how to use the template). This file is for agents (project scope, layout, where to read next).

---

## How the project is organized

| Location | For | Contents |
|----------|-----|----------|
| **README** (repo root) | Humans | What the template is, what's in agent/, how to use it (copy, setup, new module, point agent at intro + WIP). |
| **agent/current-state.md** (this file) | Agents | Project-level context: what the project is, layout, where to go next. |
| **agent/** | Both | Shared agent docs: intro, new, cleanup, setup, index, system-environment, current-state. No module-specific content. |
| **&lt;module&gt;/** (root or nested) | Per module | Each module has **README** (humans), **context/current-state.md** (agents), **context/** (WIP docs, notes), and code. Modules can be nested (e.g. `parent/sub-module/`); same format at every level. |

Modules live at repo root or nested inside another module (e.g. `my-service/`, `parent/sub-module/`). This template includes one **example-module/** folder to show the standard layout; when the user runs **agent/setup.md** to initialize a new project, delete **example-module/** so the new project starts with no modules. Real modules are added via **agent/new.md**.

---

## Where to go next

- **Workflow and read order:** **agent/intro.md** (context sources, paths, rules). **agent/index.md** to pick docs by description.
- **User gave a WIP doc path:** Follow that doc’s read order (typically that module’s **context/current-state.md**, then README, system-environment if needed).
- **Working in a module:** That module’s **context/current-state.md** first.
- **New project:** **agent/setup.md**. New WIP or module: **agent/new.md**. End-of-session: **agent/cleanup.md**.

---

## Project-level rules

Same as **agent/intro.md**: WIP state only from the WIP doc; run environment only from **agent/system-environment.md** or the module (do not guess). One branch per WIP (**main--&lt;wip-slug&gt;**). Keep **agent/index.md** (and **agent/system-environment.md** when relevant) updated as you add or change modules or docs.
