# index.md — example-module code map

Graph-based map of the module. Nodes describe every file; edges describe relationships. The agent uses this to understand the codebase without opening every file.

Update when files are created, deleted, renamed, or their purpose/relationships change.

---

## Nodes

- `README.md` — Module overview, guidelines, what's here
- `context/index.md` — This file. Graph-based code map.
- `context/current-state.md` — Deployment status, known issues, what's working
- `src/server.ts` — Express server entry point. Configures middleware, mounts routes, starts listening on the configured port.

## Edges

*(No edges yet — this is a single-file placeholder. As the module grows, document imports, calls, and dependencies here.)*
