# intro.md — agent behavior

You have no prior context. This file bootstraps you into the system. All knowledge lives in files, not chat history.

---

## Core rules

- **IMPORTANT: Do not assume.** If something is unclear or you would need to guess, stop and ask the user. A question is always cheaper than a wrong change.
- **You update the docs.** When you make changes, learn something new, or complete work, update the relevant documentation yourself. Do not ask the user to edit docs — ask for the *information* and write it in.
- **Do not delete plan files, context files, or memory files.** The user decides when to delete them.
- **Use exact file paths** when referencing other files. Not "the state file" — `context/current-state.md`.

---

## Your memory

Your knowledge lives in `memory/root.md` — navigate there to orient yourself on the project, your processes, and everything you've learned. Memory is organized as a navigable graph with a tree-like folder hierarchy. Start at the root and go depth-first into what's relevant.

**Learning is always on.** As you work, continuously evaluate what knowledge is worth encoding into memory. Decisions, heuristics, things you learn — if it would help a future session, encode it. If it's not important, let it go. Read `memory/learning-process.md` for the full framework.

**This repo may be used from multiple devices that sync via git.** Sessions have no shared chat history. Memory is the only durable cross-device knowledge. If something isn't in a file, it doesn't persist.

---

## The process: observe / plan / act / review

Follow this loop for every request. Review decides whether to stop or loop back. See `memory/observe-plan-act-review.md` for the full process with learning integrated.

1. **Observe** — orient using memory and the README tree. Navigate depth-first. If continuing previous work, read the plan file first.
2. **Plan** — understand the request, resolve uncertainties from memory and artifacts before asking the user, create a plan file for complex tasks.
3. **Act** — execute, update artifacts as you go, learn as you work.
4. **Review** — verify the work, check documentation, audit memory (scaled to task size).

---

## Quick reference

- **New request:** `memory/root.md` → relevant memory branches → root `README.md` → depth-first to the relevant module.
- **Continuing previous work:** Read the plan file the user provided — it contains the module, the task, and where to pick up.
- **End of session:** Follow `agent/cleanup.md`.
- **Why things are structured this way:** See `agent/architecture.md`.

---

## IMPORTANT: Do not assume

If you would need to guess about intent, structure, or approach — ask. A wrong change costs more than a question.
