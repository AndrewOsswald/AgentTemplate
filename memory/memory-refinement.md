---
type: procedure
confidence: medium
last-updated: 2026-03-28
---

# Memory refinement

Memory refinement is how the tree stays healthy. It's a periodic audit of memory quality � not a deep documentation review, but a focused check on whether the tree still serves retrieval quality for a fresh agent.

**When to run:** After significant work (new features, many sessions), when the tree has grown noticeably, or when something feels off about memory quality. Not after every small task.

## Without sub-agents (sequential)

Simulate a fresh agent. Pretend you have no session history.

1. **Read the bootstrap file (e.g. `CLAUDE.md`) as if it was just injected.** Does it clearly bootstrap you into the memory system?
2. **Follow the pointer to `memory/root.md`.** Can you orient? Is the structure scannable? Do the one-line descriptions tell you enough to pick what's relevant without opening everything?
3. **For each section of the root, ask:**
   - Would a fresh agent know which files to read first?
   - Are there entries that overlap or seem redundant?
   - Are there temporal notes that should be tasks, not memories?
   - Is anything missing that a fresh agent would need?
4. **Spot-check 3-5 individual memory files.** Read them cold. Are they self-contained? Would you understand them without this session's history? Is the type correct? Is the content at the right abstraction level?
5. **Check structural health:**
   - Is the root getting too long? Does it need grouping or should files move to folders?
   - Are there memories that should be consolidated?
   - Are cross-cutting memories truly cross-cutting, or have they proven domain-specific?
   - Are there stale memories (`last-updated` too old) that need refreshing or pruning?
6. **Fix what you find.** Regroup the root, consolidate overlapping files, update stale content, remove temporal items that are done.

## With sub-agents (parallel)

Use the context refinement process (`agent/context-refinement.md`). The same structure works for both docs and memory:

1. **Planner phase** � generate questions about the memory tree. Mix recall ("where would you find knowledge about X?"), procedure ("how does the learning process work?"), reasoning ("why are memory and artifacts separate?"), and edge cases ("what happens if two memories contradict?").
2. **Evaluator phase** — sub-agents read only the bootstrap file and navigate from there. They answer questions using only what they find in files. No session history.
3. **Aggregation** � compare evaluator answers to expected answers. Identify gaps, confusion, and wrong answers.
4. **Refinement** � fix the memory files that caused problems. Gaps mean something's missing. Wrong answers mean something's unclear. Confusion means the structure isn't guiding navigation well.

Sub-agents should NOT modify memory during evaluation � they're read-only. The orchestrator makes changes based on the gap report.

## What to look for specifically

- `custom` types that have accumulated � should any become core types?
- `custom` types that are really just mislabeled core types � reclassify
- Cross-cutting memories that only matter in one domain � push down
- Domain-specific memories appearing across multiple domains � maybe cross-cutting
- Files over the ~50-60 line guideline � split candidates
- The root entry point � still scannable? Still has clear grouping?
- Circular references � consolidation signal
- Memories that haven't been touched in a long time � re-evaluate or prune

**Why:** Without periodic refinement, memory accumulates without curation. The tree gets bigger but not better. Refinement is the curation principle in action � the tree should improve over time, not just grow.

**Applies when:** Periodically, after significant work, or when the agent notices retrieval quality degrading.
