# Module: Example

A minimal example module that shows the standard layout: README for humans, context/ for agents and WIP docs. It also contains an **example-submodule/** to show that **nesting is part of the format**—same structure (README, context/, code) at every level. **This folder is part of the template only.** When you run setup for a new project, the agent deletes the entire **example-module/** tree (including the submodule) so you start with no modules.

## Project

This is a placeholder module. It demonstrates the folder structure and doc format so you (and agents) can copy or refer to it when creating real modules with **agent/new.md**.

## Best practices

- Use this module as a reference for README sections, **context/current-state.md** sections, and WIP doc format. See **agent/new.md** for the full spec.
- When working on real modules, keep **context/current-state.md** updated as the code and state change.

## Overview

- **README.md** (this file) — For humans: what the module is, how to run it.
- **context/current-state.md** — For agents: module intro, rules, code paths, working/not working, next.
- **context/wip-*.md** — One file per work-in-progress (Planned / In progress / Completed).

**example.py** is a stub so the current-state "Code" section has something to list. **example-submodule/** is a nested example (same format: README, context/, code)—nesting is part of the format.

## How to run

Nothing to run. This module is for reference only. Delete it during setup when initializing a new project from this template.

## Deeper docs (in context/)

- **context/current-state.md** — Current state (for agents). Module entry, rules, code, working/not/next.
- **context/wip-example.md** — Example WIP doc showing the format.

**Nested example:** **example-submodule/** — Same layout as this module (README, context/, code). Shows that modules can be nested; same format at every level.

## Related WIP doc(s)

- **context/wip-example.md** — Example WIP (template only).
