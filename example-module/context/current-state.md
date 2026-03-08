# current-state.md — agent entry for this module

**For agents:** Agent entry for **this module**. Read this first when working in this module. *(This is the template example module; delete **example-module/** when running **agent/setup.md** in a new project.)*

---

## What this module is

A placeholder module that illustrates the standard layout and doc format. It has a README (for humans), this current-state file (for agents), an example WIP doc, and a trivial code file. It also contains **example-submodule/** to show that **nesting is part of the format**—same structure at every level. Use it as a reference when creating real modules with **agent/new.md**.

## How it fits in the project

This repo is an agent context template. The example module (and its nested **example-submodule/**) exists only to show structure, including nesting. When the user runs setup in a new project, the agent removes the entire **example-module/** tree so the new project starts with no modules.

## Rules for working on this module

- This module is not meant to be extended. Use it only as a reference. When creating a real module, follow **agent/new.md** and copy or adapt the structure from here.
- If you are running setup (**agent/setup.md**), you must **delete the entire `example-module/` folder** so the new project starts with a clean slate.

## Config / env

None. This module has no configuration or environment.

## Code

| Path | Description |
|------|-------------|
| example-module/example.py | Stub script; no real behavior. Exists so this section has an example entry. |
| example-module/example-submodule/ | Nested example submodule (README, context/, code). Same format; shows nesting. |

## Working

- Folder layout matches **agent/new.md**.
- README and context/current-state.md and wip-example.md illustrate the expected sections.
- **example-submodule/** illustrates nested modules—same format at every level.

## Not working / limitations

- This is not a real module. Do not add features or fix "bugs" here. Delete it during setup.

## Next / refs

- **agent/new.md** — Full module and WIP format. Use it to create real modules.
- **agent/setup.md** — When initializing a new project, delete **example-module/** and update **agent/index.md** to remove the example module rows.
