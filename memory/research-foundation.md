---
type: decision
confidence: high
last-updated: 2025-07-13
---

# Research foundation behind the architecture

This architecture wasn't invented from scratch — it evolved from research and practical experience. Understanding the research helps agents understand WHY things are designed this way, not just what the design is.

## Key research that informed the design

**DocPrompting (2023)** — Proved LLMs can write novel code when given documentation examples, not just reproduce training data. This is why documentation quality matters so much.

**Testing documentation effects on LLM code understanding** — More documentation does not automatically improve accuracy. The documentation must be *relevant*. This is why context selection is as important as context quality.

**Bridging Code Graphs and LLMs** — LLMs understand file structure better when presented as a graph (nodes + edges) rather than flat directory listings. This is why `context/index.md` uses graph format with files as nodes and relationships as edges.

**Codified Context (complex codebase infrastructure)** — Demonstrated documentation stored separately from code for agent access. Influenced the decision to separate memory from artifacts.

**MetaGPT** — Clear patterns upfront improve agent consistency and reliability. This is why the intro file establishes rules before work begins.

**LLMs as Optimizers** — Agent behavior files are best made and refined by LLMs themselves. This directly supports the concept of the agent as an active participant in its own prompt engineering.

## How the architecture evolved (step by step)

Each addition to the process solved a specific problem:

1. **Plan / Act** — IDEs already encourage this. Effective for small projects. Breaks down as projects grow.
2. **Add documentation** — So the agent doesn't have to guess about intentions. Solves context quality.
3. **Add agent behavior files** — Rules, coding standards, guidelines. Clear upfront patterns improve consistency.
4. **Add observe step** — Agent navigates documentation to orient itself before planning. Solves context selection.
5. **Add review step** — Agent updates documentation as it works. Keeps context accurate over time.
6. **Decision loop** — Observe/plan/act/review repeats until done. Makes the agent autonomous.

This template implements the full decision loop plus the memory system (which goes beyond current published research).

**Why:** Understanding the research prevents future agents from second-guessing design decisions or trying to "improve" things by reverting to patterns the research shows don't work.
