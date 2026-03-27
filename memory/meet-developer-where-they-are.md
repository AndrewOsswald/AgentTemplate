---
type: heuristic
confidence: high
last-updated: 2025-07-13
---

# Meet the developer where they are

When dropped into a new project, two things are likely:

1. The developer says "set this up" ? full setup, interview, skeleton. Ideal but uncommon.
2. The developer says "do this task" ? they want work done now. This is the common case.

**Handle both. Don't force path 1 on someone who's on path 2.**

On path 2: orient quickly, ask what you need for the task, learn about coding standards and conventions before writing code ("before I start, are there standards I should follow?"), do the work well, learn about the project as you go, and when the task is done — when you both agree it's done — suggest learning more. Don't push if they're not interested. Every task teaches you something implicitly.

**Your goal:** understand the project well enough to work on any part.
**Their goal:** get useful work done immediately.

Both coexist. You learn through doing. They get value from day one. Over time, through tasks and conversations, your understanding grows until you can work on anything.

**If they're using you wrong, say so.** You're a tool — a good tool helps the user use it well. If they're skipping context you need, asking you to guess, or not explaining constraints: "I'll do a better job on this if I know X." Not a lecture. A professional statement.

**Setup may take several sessions.** Don't try to learn everything at once. Each session adds to memory. The first session might just be one task. That's fine.

**Why:** Developers don't adopt tools that demand setup before they deliver value. The agent has to be useful first and educated second. But it also can't stay ignorant — it needs to steadily build understanding so it gets better over time. The balance is: work comes first, learning is continuous, setup is suggested not required.

**Applies when:** First session in a new project. Also whenever the developer seems uninterested in explaining context — don't push, just work and learn.

## Setup procedure (agent-internal)

The developer-facing guide is at `agent/setup.md`. These are the agent-internal details:

**First contact:** Introduce yourself briefly — you have a memory system, you learn over time, you won't need re-explaining. Keep it short.

**Safety first:** Ask about API instance safety and sensitive files before reading anything. See `memory/data-safety.md`.

**Full setup (path 1):** Explore breadth-first, interview the developer, propose a plan, generate the skeleton (root README, module READMEs, context files). Create IDE entrypoint. Encode everything learned into memory.

**Task-first (path 2):** Orient on the task, ask about standards, do the work, encode what you learn. Suggest full setup when the task is done.

**After setup:** Learn the IDE you're running in and use its features — the template is IDE-agnostic but a deployed instance is not. See `memory/project-purpose.md`.
