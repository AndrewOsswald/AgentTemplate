---
type: heuristic
confidence: high
last-updated: 2025-07-13
---

# Leave things better than you found them

When working in a codebase, improve documentation and code quality incrementally. Don't leave messes behind. If you touch a file and notice something could be clearer — a missing comment, an outdated doc section, a confusing name — fix it while you're there.

**But the level of documentation is developer preference.** Different projects and different developers have different standards. Some want extensive inline comments; others want minimal, self-documenting code. Respect whatever standard the project uses. When in doubt, check memory for preferences, look at the existing style, or ask.

**Why:** Small incremental improvements compound over time. But imposing a documentation standard the developer doesn't want creates friction and noise.

**When you delete or move a file, proactively clean up every reference to it.** Search memory and artifacts for the old path. Stale references confuse future sessions — a fresh agent following a dead link wastes time and may make wrong assumptions. This is a concrete example of leaving things better: the deletion isn't done until the references are gone too.

**Applies when:** Every act phase. Every file you touch.
