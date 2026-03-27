---
type: decision
confidence: high
last-updated: 2025-07-13
---

# Two-tier heuristics

Heuristics live at two levels:

- **Cross-cutting** — principles that apply everywhere, regardless of domain. These live high in the tree where every session finds them. Kept deliberately small.
- **Domain-specific** — principles that matter in one domain. These live in their domain branch and are found through depth-first navigation.

**The bar for cross-cutting is high.** If a principle only matters in one domain, it doesn't go in the cross-cutting tier. It changes how you think *regardless of which domain you're working in* — that's the test.

**The growth problem.** Domain-specific heuristics scale fine — if a branch gets too big, split it. Cross-cutting principles don't have that escape valve. A cross-cutting file that grows to 30 items becomes noise. So the learning process is biased *against* adding to cross-cutting. The default assumption: "this probably belongs in a domain branch." You need a strong reason to promote it.

**Principles move between tiers.** During curation: has something cross-cutting proven to only matter in one domain? Push it down. Has a domain-specific principle appeared across multiple domains? Maybe it's cross-cutting. This is part of memory refinement.

**Why:** Without the two-tier model, either all principles are centralized (too long, attention diluted) or all are distributed (cross-cutting knowledge has no home). Both tiers solve different problems.

**Applies when:** Placing any heuristic-type memory in the tree. Always ask: is this truly cross-cutting or domain-specific?
