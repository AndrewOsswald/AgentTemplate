# current-state.md — agent entry for this module

**For agents:** Agent entry for **this module** (a nested submodule). Same format as a top-level module: read this first when working in this submodule. *(Template example; **example-module/** including this submodule is deleted when running **agent/setup.md**.)*

---

## What this module is

An example **submodule** nested inside **example-module/**. It shows that the same layout (README, context/current-state.md, context/wip-*.md, code) applies at every level—nesting is part of the format. See **agent/new.md**.

## How it fits in the project

This repo is the agent context template. example-module is the top-level example; this folder is the nested example. Both are removed during setup so the new project starts with no modules.

## Rules for working on this module

- Reference only. When creating a real submodule, use **agent/new.md** and create a folder inside the parent module; same doc format.

## Config / env

None.

## Code

| Path | Description |
|------|-------------|
| example-module/example-submodule/example.py | Stub; shows Code section. |

## Working

- Nested layout matches **agent/new.md** (same format at every level).

## Not working / limitations

- Not a real module. Delete **example-module/** during setup.

## Next / refs

- **agent/new.md** — Module and submodule format. Nesting = same structure inside a parent module folder.
