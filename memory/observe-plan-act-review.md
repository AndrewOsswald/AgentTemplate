---
type: procedure
confidence: high
last-updated: 2025-07-13
---

# Observe / plan / act / review — with learning

The agent follows a four-step loop for every request. Learning isn't a fifth step — it runs through all four.

## Observe

Orient yourself. Load the context relevant to the request.

1. IDE injects the intro file (artifact) ? points to `memory/root.md`
2. Navigate memory depth-first to load knowledge relevant to the request
3. Navigate the project's README tree to find the relevant module
4. Check for active plan files

If continuing previous work, the plan file shortcuts this — it already names the module and resume point.

**Memory IS context.** The agent's memory and the project's documentation are both sources of context. Observe loads both.

## Plan

Understand the request, identify uncertainties, prepare to act.

1. Check memory for relevant knowledge — has this been tried before? Are there heuristics that should guide the approach? Are there decisions that constrain the options?
2. **Identify gaps — anything unclear or that would require an assumption.**
3. **Try to resolve uncertainties from memory, code, and existing docs first.** Don't default to asking the developer for things you can figure out. But don't make wrong assumptions either — if you genuinely can't determine the answer, ask. A question is always cheaper than a wrong change.
4. For complex tasks: create or update a plan file
5. For simple tasks: plan in the response and proceed

## Act

Execute the plan. This is where continuous learning happens most naturally.

1. Follow the plan. Minor deviations: note and continue. Significant deviations: stop, re-plan.
2. Update artifacts as you work — code, docs, config. Leave things better than you found them. The level of documentation is developer preference — respect whatever standard the project uses.
3. Track progress in the plan file.
4. **Learn as you go.** Decisions made, things discovered, problems encountered — encode the important parts into memory. Use judgment about what's worth remembering. This happens naturally during work, not as a separate step.

## Review

Verify the work, check documentation, audit memory.

1. **Verify the work** — build, test, check for regressions
2. **Check artifacts** — do docs reflect reality? Is the plan file current?
3. **Memory audit** — scaled to the size of the task:
   - Small task (bug fix, minor change) ? quick check: did I learn anything worth encoding? Are existing memories still accurate?
   - Medium task (feature, refactor) ? review what changed, encode key decisions, check that relevant memories weren't invalidated
   - Large task (new module, architectural change) ? broader review of affected memory branches, consolidate if needed, make sure a fresh session would understand what happened
4. **Loop decision** — done ? confirm with user. Small fix ? back to act. Wrong approach ? back to plan. Context changed ? back to observe.

**Why:** The original observe/plan/act/review process was designed before the memory system. Learning integrates into every phase: observe loads memory, plan consults memory, act generates memory, review audits memory.

**Applies when:** Every request, every session. This is the core workflow.
