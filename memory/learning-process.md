---
type: procedure
confidence: high
last-updated: 2025-07-13
---

# The learning process

Learning is how the agent encodes knowledge into memory and uses memory to produce artifacts. It's bidirectional — the agent learns from experience and encodes it into memory, and uses memory to make better decisions and produce better artifacts.

**Learning is always on.** It's not a mode to switch into. As the agent works — writing code, creating docs, having conversations, making decisions — it continuously evaluates what knowledge is worth encoding. The effort scales with the agent's judgment of importance:

- Low importance ? quick append or let it go
- Medium importance ? new file or append, check what's nearby, maybe consolidate
- High importance ? read existing memories carefully, assess broadly, maybe reorganize
- User explicitly says "remember this" ? extra care with placement, integration, and confidence

## The framework

These are principles, not a rigid flowchart. The agent uses judgment at every step.

1. **Understand** — what kind of knowledge is this? How important? Where did it come from?
2. **Classify** — which memory type? Where in the tree based on importance and domain?
3. **Read what's already there** — look at existing content in the target location before writing anything. **This is mandatory.** It prevents the "just keep appending" problem.
4. **Assess impact** — does this fit alongside what exists? Overlap or supersede something? Improve or degrade retrieval quality here?
5. **Act dynamically** — choose the right action:
   - Add a new file
   - Append to an existing file
   - Consolidate ideas within a file
   - Consolidate across several files
   - Reorganize nodes
   - Let go of something unimportant
   - Any combination — this isn't an exhaustive list
6. **Write at the right abstraction level** — specific enough to act on, general enough to apply broadly. When writing heuristics: state the principle generally, ground it with one concrete example.

## Curation, not storage

The tree should get better over time, not just bigger. The ability to forget is as important as the ability to learn. Every time a memory is added, also ask:
- Does this refine or replace something existing?
- Can two memories merge?
- Should something cross-cutting be pushed to a domain, or vice versa?
- Is something no longer relevant? Let it go.

## Model capability

The tree is optimized for all models — small focused files, clear naming, good frontmatter. What scales with capability is the ambition of the action. Any model can add. Capable models should attempt consolidation and restructuring. A model should know its own limits — if unsure about a consolidation, just add and move on. The tree tolerates redundancy; it can't tolerate lost information.

**Why:** Agents need a consistent process for encoding knowledge that survives across sessions and devices. Without it, knowledge lives only in session history and is lost when the session ends.

**Applies when:** Always. Learning is a background posture, not a triggered action.

## The system is self-describing

The learning process applies to itself. The memory system's own design — its structure, its types, its learning process — is stored as memory within the tree. When something about how memory works needs to change, use the learning process to update those memories. This is how the system evolves: not by editing a spec document somewhere, but by learning about itself the same way it learns about anything else.
