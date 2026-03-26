# context-refinement.md — audit documentation with parallel sub-agents

Use this process on **any** project that uses markdown documentation and an agentic workflow. It does **not** change folder layout or file names. It produces evidence about whether **wording and explanations** are clear enough for a new session, so you can refine prose in existing files.

**Platform note:** This process is designed for platforms that support sub-agents and multiple model tiers. If your platform does not support sub-agents, you can still run this process — execute all phases sequentially in a single session instead of in parallel. If you only have access to one model, use it for all phases.

**Roles:**
- **Orchestrator** — the main agent (you). Runs the smart step, splits questions, spawns exactly five evaluator sub-agents (or runs them sequentially if sub-agents aren't available), aggregates results, and optionally drafts doc edits.
- **Planner model** — use the **most capable** model available for generating the 25-question bank (reasoning, nuance, coverage). If you only have one model, use it.
- **Evaluator models** — use **faster / cheaper** models if available, otherwise use the same model. Five parallel runs (or sequential), five questions each. Read-only: no file edits, no shell commands that change state.

**Rules:**
- Evaluators follow `agent/intro.md` regarding sub-agents: **they do not spawn further sub-agents** and **they do not delete files**.
- Evaluators answer **only** from files they read in the repo during the run (no chat history, no outside knowledge for project facts).
- Paths in this document are conventional (`agent/intro.md`, `agent/architecture.md`, root `README.md`). **Adapt** if this project uses different names.

---

## Outcomes

1. A **question bank** (25 items) mixing **project truth** and **process / architecture** understanding.
2. **Five answer sheets** (5 questions each) from independent evaluators.
3. A **gap report**: which questions were missed or weakly answered → **recommended edits** (which file, what kind of fix: clarify, add cross-link, reduce ambiguity).
4. Optional: **concrete wording patches** (still no structural change) produced by the Planner model after the gap report.

---

## Phase 1 — Planner: generate 25 questions (smart model)

**You (orchestrator)** paste the following into a **capable** model session, filling the bracketed sections from the **target** project.

```markdown
You are designing an evaluation for whether documentation explains a project and its agentic workflow well enough for a **new agent session** with no chat history.

## Project snapshot (orchestrator fills in)
- Root README path: [e.g. README.md]
- Agent behavior entrypoint: [e.g. agent/intro.md]
- Architecture / "why" doc: [e.g. agent/architecture.md or "none — describe X instead"]
- Other canonical docs: [list key READMEs, context files, guides]
- Anything evaluators must NOT assume: [secrets, hardware, URLs]

## Requirements
Produce **exactly 25** numbered questions, **Q1–Q25**.

**Balance (approximate):**
- **~12–13 questions — PROJECT** — facts, navigation, and behavior implied by this repo's documentation (modules, where state lives, what a guide is for). Answers must be verifiable from files.
- **~12–13 questions — PROCESS** — observe/plan/act/review, session independence, README tree, plan files vs context files, assumptions, sub-agent rules, when to read what. Ground these in the project's actual agent docs (paths above).

**Question types (mix across all 25):**
- **Recall** — "Where in the repo would you look for X?"
- **Procedure** — "What step comes before Y in the documented process?"
- **Reasoning** — "Why does the architecture separate A from B?" (answer must cite doc language or structure)
- **Edge / friction** — "What is ambiguous or unstated if the user asks Z?"

**Format — each question must be one line after its number, with tags:**

`Qn [PROJECT|PROCESS] <difficulty: easy|medium|hard> <one sentence question>`

**Also output (after Q25):**
1. **Answer key (brief)** — For each Q1–Q25, 1–2 sentences: what a correct answer must include (not full prose — rubric for reviewers).
2. **Suggested file hints** — For each question, list 1–3 relative paths where an agent should find evidence (best effort; use [UNKNOWN] if unclear).

No preamble. Start at Q1.
```

**Orchestrator:** Save the full Planner output as `agent/meta/context-refinement-last-questions.md` (or a dated copy under `agent/meta/`) so the audit is reproducible.

---

## Phase 2 — Split into five packs of five

From the Planner output, build **five packs** fixed by question number:

| Pack | Questions |
|------|-----------|
| A | Q1–Q5 |
| B | Q6–Q10 |
| C | Q11–Q15 |
| D | Q16–Q20 |
| E | Q21–Q25 |

If the Planner used different numbering, remap so each evaluator gets **five** questions and every question appears **once**.

---

## Phase 3 — Five evaluators (dumber models, parallel)

**Orchestrator:** Spawn **five** sub-agents in parallel (or sequentially if limits apply). Each evaluator:

- **Read-only.** No writes, no mutating shell.
- **Must read** `agent/intro.md` first, then root `README.md` (or the paths your project uses), then **open other files as needed** to answer.
- **Must cite evidence:** every answer includes at least one **exact relative path** to a file that supports it, or states **NOT FOUND IN REPO** with what was searched.

**Evaluator prompt template** (orchestrator fills `[PACK LETTER]`, pastes the five questions and optional file hints from Phase 1):

```markdown
You are a new agent. READ ONLY — no file edits, no commands that change system state.

1. Read `agent/intro.md`, then the project root `README.md` (adapt if your project names differ).
2. Answer **only** these five questions using the repository. You may read additional files as needed.

Questions for Pack [A/B/C/D/E]:
[paste Qn..Qm here]

For each question, respond with:
**Qn —** Your answer (2–6 sentences unless a short fact suffices).
**Evidence —** Paths you relied on (e.g. `src/auth/README.md` § approximate section).
If you cannot answer from the repo: say **INSUFFICIENT DOCS** and what is missing.

Do not spawn sub-agents. Do not delete files.
```

**Orchestrator:** Collect five markdown transcripts. Optionally save as `agent/meta/context-refinement-last-answers-pack-A.md` … `E.md`.

---

## Phase 4 — Aggregate (orchestrator)

1. **Match** each answer to the Planner's **rubric** (brief answer key).
2. Mark each question: **Strong / Partial / Wrong / Unanswered / Docs gap** (docs gap = evaluator correctly said information is missing).
3. **Theme** repeated failures (e.g. "sub-agent rules unclear", "deployment flow scattered").
4. Produce a **single gap report** markdown table:

| Q# | Tag | Verdict | Notes | Candidate files to edit |

---

## Phase 5 — Review and refine wording (human + smart model)

**Human:** Skim the gap report. Confirm false positives (evaluator error vs doc error).

**Planner (smart model) again — optional prompt:**

```markdown
Here is our gap report from a documentation audit: [paste Phase 4 table + excerpts of weak answers].

Constraints:
- Do NOT propose new files, renames, or folder moves unless the user explicitly allows structural change.
- For each high-priority gap, propose: (1) target file path, (2) current problem in one sentence, (3) suggested revised wording or new paragraph (markdown), (4) what NOT to change.

Keep intro.md short; prefer moving detail to README tree or architecture.md per existing rules.
```

**Orchestrator / human:** Apply edits manually or in a follow-up act session. Re-run this process periodically after large doc changes.

---

## Checklist for the orchestrator

- [ ] Phase 1: Planner produced Q1–Q25 + rubric + file hints; saved copy under `agent/meta/` (or dated name there).
- [ ] Phase 2: Packs A–E assigned.
- [ ] Phase 3: Five evaluators run read-only; answers collected.
- [ ] Phase 4: Gap report completed.
- [ ] Phase 5: Human review; optional Planner patch suggestions; wording updates applied.

---

## When the user says "run the context refinement process"

1. Open this file and execute **Phase 1** with a capable model (or ask the user to run Planner in another window and paste back).
2. Execute **Phases 2–4** yourself.
3. Present the **gap report** and ask whether to run **Phase 5** auto-suggestions.
4. Do not change repository structure unless the user explicitly asks.
