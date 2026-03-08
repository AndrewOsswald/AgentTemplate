## Cursor Cloud specific instructions

This repository is an **agent context template** — a documentation scaffold for new projects that use AI coding agents. It contains no application code, no services, no build system, and no dependencies.

### What's here

- `agent/` — Shared agent workflow docs (intro, setup, new, cleanup, index, system-environment, current-state).
- `example-module/` — Template-only folder showing the standard module layout; intended to be deleted when initializing a real project (see `agent/setup.md`).
- Two trivial Python stubs (`example-module/example.py`, `example-module/example-submodule/example.py`) exist only to demonstrate the layout.

### Running / testing

- There is no build, no lint, no test suite, and no dev server. The only executable code is `python3 example-module/example.py` and `python3 example-module/example-submodule/example.py`.
- No `package.json`, `requirements.txt`, `pyproject.toml`, `Makefile`, or `Dockerfile` exists.

### Workflow

The intended workflow is documented in `agent/intro.md` (read order and rules), `agent/new.md` (creating modules/WIPs), `agent/cleanup.md` (end-of-session sync), and `agent/setup.md` (one-time init for a new project). Refer to those files directly rather than duplicating their content here.
