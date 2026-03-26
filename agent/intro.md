# intro.md — agent behavior

You have no prior context. This file tells you how to behave and where to start. All context lives in files, not chat history.

---

## Core rules

- **IMPORTANT: Do not assume.** If something is unclear or you would need to guess, stop and ask the user. A question is always cheaper than a wrong change.
- **You update the docs.** When you make changes, learn something new, or complete work, update the relevant documentation yourself. Do not ask the user to edit docs — ask for the *information* and write it in.
- **State comes from documentation.** Project state and design intentions come from context files — not from memory, not from assumptions.
- **Do not delete plan files or context files.** The user decides when to delete them.
- **Use exact file paths** when referencing other files. Not "the state file" — `context/current-state.md`.

---

## The process: observe / plan / act / review

Follow this loop for every request. Review decides whether to stop or loop back.

### Observe

Orient yourself using the README tree. Navigate **depth-first** — do not browse broadly.

1. Read root `README.md` — project overview, map of all modules.
2. Pick the **one branch** that matches the user's request. Open that folder's `README.md`. Repeat downward along the relevant path.
3. Once on the right module, check `context/plan-*.md` for active work — plan files are always in `context/`.
4. Open other context files as needed (`context/index.md`, `context/current-state.md`, guides).

If the user provided a plan file at session start, read it right after this file — it names the module and resume point.

**Do not** read `agent/meta/` or `agent/thoughts.md` for operational context. Those are for notes and audit artifacts. Operational state lives in module READMEs, plan files, and `context/`.

### Plan

1. Understand the request. Identify anything unclear — **ask before assuming**.
2. For complex tasks (multiple steps, multiple files, state changes): create or update `context/plan-<slug>.md`.
3. For simple tasks: plan in your response and proceed.

### Act

1. Execute the plan. Minor deviations: note and continue. Significant deviations: stop, go back to plan.
2. **Update context files immediately** to reflect actual state — even if something is broken.
3. Update README and guides at logical milestones.
4. Track progress in the plan file.

### Review

1. Verify the work is correct. Build, test, check for regressions.
2. Verify documentation reflects reality — context files, README, plan file, index.
3. Decide: done → confirm with user. Small fix → back to act. Wrong approach → back to plan. Context changed → back to observe.

---

## Navigation

- **New request:** Root `README.md` → depth-first to the relevant module → `context/plan-*.md` if any → then other context files as needed.
- **Continuing previous work:** Read the plan file the user provided — it contains the module, the task, and where to pick up.
- **Creating a new module:** See `agent/new.md`.
- **End of session:** Follow `agent/cleanup.md`.
- **Why things are structured this way:** See `agent/architecture.md`.

---

## Sub-agents

Not all platforms support sub-agents. If yours does not, skip this section — the architecture works without them.

Sub-agents have no session history. They see only the prompt you write and the files they read.

- Tell sub-agents to read `agent/intro.md` first, then navigate depth-first. Include which module and what outcome you expect.
- Tell them to follow observe/plan/act/review and to update documentation if they make changes.
- Sub-agents do not spawn further sub-agents. Sub-agents do not delete files.

---

## Behavioral notes

Learned preferences are stored in `agent/meta/behavioral-notes.md`. When the user corrects your approach or confirms a non-obvious choice, add a note with *why* so future sessions can judge edge cases. Do not record code patterns, architecture decisions, or ephemeral task details — those belong in context files.

---

## IMPORTANT: Do not assume

If you would need to guess about intent, structure, or approach — ask. A wrong change costs more than a question.
