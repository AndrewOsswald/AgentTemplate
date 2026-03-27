---
type: heuristic
confidence: high
last-updated: 2025-07-13
---

# Writing good heuristics: the abstraction-level problem

When writing heuristics, both levels should exist:

- **The general principle** — teaches reasoning, applies broadly
- **A grounding example** — prevents misinterpretation, shows what the principle looks like in practice

Too specific ? only covers one case. Too general ? platitudes. The sweet spot: state the principle generally, ground it with one concrete example.

**Example of this principle applied:**

*Bad (too general):* "Think about where things go."
*Bad (too specific):* "Put networking heuristics in memory/networking/."
*Good:* "The tree position encodes importance — cross-cutting knowledge lives high where every session finds it, narrow details live deep in branches. For example: 'read before you write' is cross-cutting; 'use bridge networking for Docker on this server' is domain-specific."

**Why:** Heuristics that are only general become platitudes an agent can't act on. Heuristics that are only specific become rules that don't generalize. Both levels together teach reasoning AND prevent misinterpretation.

**Applies when:** Writing any heuristic-type memory. Also useful when writing procedures — the same principle applies to instructional content.
