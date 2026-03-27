---
type: heuristic
confidence: high
last-updated: 2025-07-13
---

# Context quality and context selection

These are the two foundational pillars of the entire architecture. Every design decision traces back to one or both.

**Context quality** — the agent needs information that is highly explicit and in natural language. Code doesn't contain enough about design intentions — a function signature tells you what it accepts and returns, not why it exists, what business rule it implements, or what breaks if you change it. An agent looking at code without context is like a surgeon looking at an X-ray with no patient history. Good documentation bridges the gap between what files contain and what the developer intended.

**Context selection** — the agent needs information that is concise, compartmentalized, non-redundant, and easy to navigate. Too much non-relevant information causes inaccuracy even if the information is good. Research calls this "context shifting" — the model's attention gets pulled toward whatever is in front of it, relevant or not.

**Both are equally important.** Good information in too large a volume is still a problem. Selective, relevant context is what works. Bigger context windows and smarter models don't fix this — they give you more room to make the same mistake.

**How these principles shape the architecture:**
- The memory tree is organized for retrieval quality (selection) with clear, explicit files (quality)
- Small focused files (~50-60 lines) serve both — concise enough for selection, detailed enough for quality
- Depth-first navigation loads only what's relevant (selection)
- The two-tier heuristic model keeps cross-cutting knowledge small (selection) and domain knowledge focused (quality)
- The learning process emphasizes curation over accumulation (selection)

**Why:** These principles come from research — documentation relevance matters more than volume, graph-structured file maps improve comprehension, and clear upfront patterns improve agent consistency. The architecture is built to solve both simultaneously.

**Applies when:** Every design decision about the template, every memory placement choice, every documentation decision. Always ask: does this serve context quality, context selection, or both?
