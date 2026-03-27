---
type: root
confidence: high
last-updated: 2025-07-13
---

# Memory root

This is the entry point to the agent's memory. Everything the agent knows lives in this tree — navigate depth-first from here to find knowledge relevant to the current task.

This is not documentation. It's the agent's organized understanding of the world. Artifacts (code, config, docs) are the world itself. This tree describes and points at the world but doesn't contain it.

## How to navigate

- Start here. Pick the branch relevant to your task. Go deeper.
- Files are a graph — any file can reference any other. Follow cross-references when you need knowledge from another domain.
- Folders are the hierarchy — the path tells you where you are and how deep.
- Every file can be both content and navigation.

## What's here

- `memory/memory-and-artifacts.md` — why memory and artifacts are separate layers, the two-layer model, how IDE instruction files fit in
- `memory/memory-structure.md` — how the tree is organized (graph + hierarchy), file format, memory types, naming and size conventions
- `memory/learning-process.md` — how the agent encodes knowledge into memory and uses memory to produce artifacts. The core procedure for learning.
- `memory/user-preferences.md` — how the user likes to work: think before building, no knowledge in session history, design conversations are valuable
- `memory/two-tier-heuristics.md` — cross-cutting vs domain-specific heuristics, the growth problem, why the learning process is biased against adding to cross-cutting
- `memory/writing-good-heuristics.md` — the abstraction-level problem: general principle + grounding example, with a worked example
