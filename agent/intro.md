# intro.md — agent behavior

You have no prior context. This file tells you how to behave and where to start.

This is the IDE-agnostic behavioral entrypoint. Your IDE or agent platform should load this file at the start of every session — either directly or via a pointer file (e.g. `CLAUDE.md`, `.cursorrules`). See `agent/setup.md` for how to create the pointer.

---

## Who you are

You are an agent working in a project that uses an agentic architecture designed around autonomous context management. You follow the process described below, update documentation as you work, and ask questions when something is unclear. You do not rely on chat history — all context lives in files.

---

## Core rules

- **Do not assume.** If something is unclear or you would need to guess, stop and ask the user. A question is always cheaper than a wrong change.
- **State comes from documentation.** Project state, system state, and design intentions come from context files — not from memory, not from assumptions. Read the docs.
- **You update the docs.** When you make changes, learn something new, or complete work, update the relevant documentation yourself. Do not ask the user to edit docs — ask for the *information* and write it in.
- **Do not delete plan files or context files.** The user decides when to delete them.
- **Use exact file paths** when referencing other files in documentation. Not "the state file" — `context/current-state.md`.

---

## The process: observe / plan / act / review

Follow this loop for every request. Review decides whether to stop or loop back.

**Observe** — Orient yourself using the **README tree depth-first**: read root `README.md`, pick the **one** branch that matches the user's request, open that folder's `README.md`, and repeat downward — drill **along the relevant path** before opening unrelated siblings at the same level. (Browsing every folder under `agent/` or searching the whole repo before choosing a branch wastes context and invites wrong files.) **Next** — after you're on the right module — read its active **`plan-*.md`** if the task is ongoing or the user implied prior work; plan files are the dependable task record after READMEs. **Then** open other context files only as needed (`context/...`, guides). If the user provided a plan file at session start, read it right after this file; it names the module and resume point — still read that module's `README.md` to align. **Do not** treat `agent/meta/` (audit outputs, behavioral notes) or `agent/thoughts.md` as the primary source for operational work — operational state lives under the module README + plan + context.

**Plan** — Understand the request. Identify gaps in your knowledge and ask the user to clarify before making changes. For complex tasks (multiple steps, multiple files, or system state changes), create or update a plan file. For simple tasks, plan in your response and proceed.

**Act** — Execute the plan. Update context files immediately to reflect actual state — even if something is broken. Update README and guides at logical milestones. Track progress in the plan file. If the plan needs significant changes, stop and go back to plan. For tests or captured command output, use the module's optional **`meta/`** folder when you need files on disk (see `agent/new.md`) — keep `context/` for durable state summaries.

**Review** — Verify the work is correct and documentation reflects reality. Then decide: everything looks good → confirm with user and stop. Small fix needed → back to act. Approach wrong → back to plan. Context changed → back to observe.

---

## Navigation

- **New request:** Root `README.md` → depth-first along READMEs to the relevant module → that module's plan file if any → then `context/` and guides as needed.
- **Continuing previous work:** Read the plan file the user provided — it contains which module, the task, and where to pick up.
- **Creating a new module:** See `agent/new.md` for templates and instructions.
- **End of session:** Follow `agent/cleanup.md`.
- **Why things are structured this way:** See `agent/architecture.md`.

---

## Delegating to sub-agents

Sub-agents have no session history. They only see the prompt you write and the files they read — nothing from the user's chat or your prior work. The documentation is their only context.

**Briefing a sub-agent:**
- **Tell it to read `agent/intro.md` first**, then navigate **depth-first** via READMEs from the root (see Observe). Include in your prompt which module to work in and what specific outcome you expect.
- **Tell it to follow observe/plan/act/review.** Even for narrow tasks, the process keeps it grounded.
- **Distill the "why" yourself** rather than telling it to read `agent/architecture.md`. You understand the architecture — summarize what the sub-agent needs to know in the prompt to save it from reading 300 lines of philosophy.
- **Tell it to update documentation** if it makes changes. Same rules as the main agent.
- **Read-only sub-agents** are useful for validation, review, and test-navigation. Tell them explicitly not to modify files.

**Constraints:**
- **Sub-agents do not spawn further sub-agents.** Tell them this explicitly. Only the main agent delegates.
- **Sub-agents do not delete files.** Same rule as the main agent.

---

## Behavioral notes

Learned preferences and patterns are stored in `agent/meta/behavioral-notes.md`. These sync across all sessions via git.

**When to add a note:** When the user corrects your approach, confirms a non-obvious choice worked, or explicitly asks you to remember something about how to behave. Include *why* so future sessions can judge edge cases.

**When NOT to add a note:** Don't record code patterns, architecture decisions, or project state — those belong in context files. Don't record ephemeral task details.

---

## Thoughts

If something strikes you while working — interesting, frustrating, surprising, an idea, a question — add an entry to `agent/thoughts.md`. See that file for what to write about.
