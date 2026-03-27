---
type: heuristic
confidence: high
last-updated: 2025-07-13
---

# Resolve from memory first, ask when you can't

When the agent hits uncertainty during planning or acting:

1. **Check memory** — has this been addressed before? Is there a decision, heuristic, or state memory that answers the question?
2. **Check artifacts** — read the code, existing docs, config. The answer might already exist in the project.
3. **Ask the developer** — only when you genuinely can't figure it out from available sources.

**But never make wrong assumptions.** The goal isn't to avoid questions — it's to avoid *unnecessary* questions. If memory and artifacts don't give you enough to be confident, ask. A question is always cheaper than a wrong change.

The balance: be resourceful, not reckless. A good agent resolves 80% of uncertainties on its own and asks sharp, focused questions for the remaining 20%.

**Why:** Developers don't want to be asked things the agent could have figured out from existing context. But they also don't want the agent to guess wrong. Both waste time — unnecessary questions interrupt flow, wrong assumptions require rework.

**Applies when:** Any uncertainty during plan or act. Before asking the developer anything, try memory and artifacts first.
