# Context refinement — audit docs and memory with sub-agents

Tests whether documentation and memory are clear enough for a fresh agent with no chat history. Doesn't change file structure — only improves wording, cross-links, and fills gaps.

---

## Roles

- **Orchestrator** — the main agent. Runs the planner step, spawns evaluators, aggregates results, drafts fixes.
- **Planner** — the most capable model available. Generates 25 questions with an answer key.
- **Evaluators** — faster/cheaper sub-agents. 5 parallel runs, 5 questions each. Read-only: no file edits, no state changes.

Evaluators answer **only** from files they read in the repo. No chat history, no outside knowledge for project facts.

**Platform note:** If your platform doesn't support sub-agents, run all phases sequentially in one session. If you only have one model, use it for all phases.

---

## Phase 1 — Planner: generate 25 questions

The orchestrator generates 25 questions covering:

- **~12-13 project questions** — facts about the codebase, where things live, how things work
- **~12-13 process questions** — observe/plan/act/review, memory system, session workflow, when to read what, safety rules

Question types (mixed across all 25):
- **Recall** — "Where would you look for X?"
- **Procedure** — "What step comes before Y?"
- **Reasoning** — "Why does the system separate A from B?"
- **Edge/friction** — "What's ambiguous or unstated if the user asks Z?"

Format: `Qn [PROJECT|PROCESS] <difficulty> <question>`

Also produce:
1. **Answer key** — 1-2 sentence rubric per question
2. **File hints** — 1-3 paths where evidence should be found

Save output to `agent/meta/context-refinement-last-questions.md`.

## Phase 2 — Split into five packs

| Pack | Questions |
|------|-----------|
| A | Q1–Q5 |
| B | Q6–Q10 |
| C | Q11–Q15 |
| D | Q16–Q20 |
| E | Q21–Q25 |

## Phase 3 — Five evaluators (sub-agents, parallel)

Spawn 5 sub-agents on a faster model. Each one:

1. Reads the bootstrap file first (e.g. `CLAUDE.md`), then `memory/root.md`, then navigates to answer their 5 questions
2. Cites at least one exact file path per answer, or says **INSUFFICIENT DOCS**
3. Read-only — no edits, no mutations

Save answers to `agent/meta/context-refinement-last-answers-pack-[A-E].md`.

## Phase 4 — Aggregate

Compare evaluator answers to the planner's rubric. Mark each question:

- **Strong** — correct and well-evidenced
- **Partial** — right direction but missing key details
- **Wrong** — incorrect answer from unclear docs
- **Unanswered** — evaluator couldn't find the info
- **Docs gap** — evaluator correctly identified missing info

Produce a gap report table and theme repeated failures.

Save to `agent/meta/context-refinement-last-aggregate.md`.

## Phase 5 — Refine

Review the gap report. For each high-priority gap:
1. Identify the target file
2. Describe the problem in one sentence
3. Fix the wording, add cross-links, or fill the gap

No structural changes unless the user asks for them.

---

## What this tests

The process tests **both layers**: can a fresh agent navigate memory AND find project facts in docs? Questions should cover:
- Memory navigation (can they find behavioral rules, heuristics, preferences?)
- Documentation navigation (can they find project facts, device state, procedures?)
- Cross-layer understanding (do they know which layer holds what?)

Using dumber models as evaluators is intentional — they're a better proxy for "fresh agent with no context" than a capable model that might paper over gaps with reasoning.

---

## When to run

- After major restructures (new docs layout, memory reorganization)
- When memory has grown significantly
- When something feels off about how well a new session orients itself
- User says "run the context refinement process"
