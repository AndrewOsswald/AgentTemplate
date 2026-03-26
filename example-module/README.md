# Example Module

This is a placeholder codebase module showing the template layout. **Delete this entire folder during setup** — it exists only to demonstrate the structure.

Uses the **codebase template** from `agent/new.md`.

---

## What's here

```
example-module/
├── README.md                  # This file — module overview
├── context/
│   ├── index.md               # Graph-based code map (nodes + edges)
│   └── current-state.md       # Deployment status, known issues
└── src/
    └── server.ts              # (placeholder) Express server entry point
```

## Context files

- **`context/index.md`** — graph-based map of all files in this module with descriptions and relationships. The agent reads this to understand the codebase without opening every file.
- **`context/current-state.md`** — what's deployed, what's working, what's broken. Updated immediately when state changes.

## Guidelines

*(Add coding standards, conventions, or rules here. For extensive guidelines, use a separate `guidelines.md` at the module root.)*

## Active work

*(No active plans. When starting a task, create `context/plan-<slug>.md` — see `agent/new.md` for the standard.)*
