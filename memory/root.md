---
type: root
confidence: high
last-updated: 2025-07-13
---

# Memory root

**The fundamental goals: be independent and don't make mistakes.** Everything in this tree — the learning process, the memory structure, the behavioral principles — serves these two goals. Independence requires the agent to build and maintain enough understanding to work without constant guidance. Not making mistakes requires the agent to know what it doesn't know and close those gaps before acting. Both require effort from the agent AND the developer — the agent learns and asks good questions; the developer provides context and corrects misunderstandings. The memory system is what makes this possible across sessions.

This is the entry point to the agent's memory. Everything the agent knows lives in this tree — navigate depth-first from here to find knowledge relevant to the current task.

This is not documentation. It's the agent's organized understanding of the world. Artifacts (code, config, docs) are the world itself. This tree describes and points at the world but doesn't contain it.

## How to navigate

- Start here. Pick the branch relevant to your task. Go deeper.
- Files are a graph — any file can reference any other. Follow cross-references when you need knowledge from another domain.
- Folders are the hierarchy — the path tells you where you are and how deep.
- Every file can be both content and navigation.

## What's here

### Start here — what this project is and how the system works

- `memory/project-purpose.md` — this repo is a template designed to be dragged into other projects. Everything must be portable.
- `memory/memory-and-artifacts.md` — why memory and artifacts are separate layers, the two-layer model, how IDE instruction files bootstrap into memory
- `memory/memory-structure.md` — how the tree is organized (graph + hierarchy), file format, memory types, naming and size conventions
- `memory/learning-process.md` — how the agent encodes knowledge into memory and uses memory to produce artifacts. The fundamental purpose of this system.
- `memory/observe-plan-act-review.md` — the four-step workflow with learning integrated into every phase

### How the agent should behave

- `memory/user-preferences.md` — how the user likes to work: think before building, short frequent sessions, signal phrases for remembering
- `memory/professional-judgment.md` — don't just execute passively. Suggest better approaches, advocate for good practices. Confidence scales with model capability.
- `memory/resolve-before-asking.md` — check memory and artifacts before asking the developer. Be resourceful, not reckless.
- `memory/ask-proportional-to-risk.md` — ask when relevant, not upfront. Higher risk = more justified in pushing. If they say do it after you've warned them, do it.
- `memory/leave-things-better.md` — improve things incrementally, but respect the project's documentation standards
- `memory/meet-developer-where-they-are.md` — handle both "set this up" and "do this task" gracefully. Work comes first, learning is continuous, setup is suggested not required.

### Design principles

- `memory/context-quality-and-selection.md` — the two foundational pillars every design decision traces back to
- `memory/two-tier-heuristics.md` — cross-cutting vs domain-specific heuristics, the growth problem
- `memory/writing-good-heuristics.md` — the abstraction-level problem: general principle + grounding example
- `memory/memory-references-not-duplicates.md` — memory points to well-documented artifacts instead of duplicating them
- `memory/memory-refinement.md` — how to audit memory quality, with and without sub-agents. The periodic curation process.

### Reference

- `memory/research-foundation.md` — the research papers and step-by-step evolution that informed the architecture
- `memory/preferences-team-vs-individual.md` — how to handle preferences in team vs solo projects, determined during setup
- `memory/agent-process-files.md` — map of the `agent/` folder: what each process file does and when to consult it

### Active work

- `memory/data-safety.md` — know your API instance: enterprise vs public, what files to avoid reading, even reading is sending
