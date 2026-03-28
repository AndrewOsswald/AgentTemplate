---
type: heuristic
confidence: high
last-updated: 2026-03-28
---

# Memory references artifacts, doesn't duplicate them

When a well-documented artifact already exists (a process file, a guide, a well-commented config), memory shouldn't duplicate its contents. Instead, memory should:

- Know what the artifact is and why it exists
- Point to it with the file path
- Contain enough context that the agent understands the artifact's purpose without opening it
- Know when to consult it

**The amount of detail in memory is inversely proportional to how explicit the artifact is.** A well-written process file needs lightweight memory coverage � just a pointer and context. A poorly-documented codebase needs more detailed memory to bridge the gap.

This keeps redundancy low and prevents staleness � if the artifact changes, memory doesn't become outdated because it points rather than copies. The artifact is the source of truth for its own content; memory is the source of truth for why it matters and when to use it.

**Example:** The bootstrap file (e.g. `CLAUDE.md`) describes core agent behavior. Memory doesn't need to reproduce its contents. It needs to know: "this is the behavioral core, loaded every session, establishes the decision loop and core rules." Memory points to the artifact; it doesn't copy it.

**Why:** Duplication creates two sources of truth. When one changes, the other goes stale. Memory and artifacts should complement, not copy.

**Applies when:** Any time memory is encoding knowledge about something that already has a well-documented artifact. Also applies in reverse � if memory contains detailed knowledge, creating an artifact that says the same thing is redundant unless the artifact serves a different audience (like IDE auto-injection).
