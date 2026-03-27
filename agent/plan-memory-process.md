# plan-memory-process.md — design the agent memory system

Self-contained. A new agent with no chat history should be able to read this
file and continue the work.

## Context references

- Module: `agent/` (project-level process layer)
- Read: `agent/intro.md` (core rules, including "memory lives in the repo" rule)
- Read: `agent/architecture.md` (why the system is structured this way — especially context quality and context selection)
- Read: `agent/new.md` (module templates, plan file standard)
- Read: `agent/context-refinement.md` (doc audit process — will be extended to audit memory)

## Background

Agents don't have a clear process for storing learned knowledge in a way that survives across sessions and devices. When asked to "remember" something, they don't know where to put it or how to structure it. When relevant knowledge exists in repo files, they sometimes lack the decision-making framework to apply it correctly.

Adding one-off rules for each failure is tape on leaks — patching symptoms instead of building a system for the agent to learn from experience. We need a defined process that teaches agents how to think about memory, not just where to put things.

## Key insight: the tree IS the memory

The README tree isn't just documentation navigation — it's a **memory retrieval structure**. Everything an agent reads to make a decision is context: READMEs, state files, heuristics, even code. The tree organizes how the agent finds and loads that context. "Everything is context, everything is memory."

This means:
- The tree grows when knowledge becomes more complex (branches split, new nodes appear)
- Depth-first navigation is literally the agent deciding "what's relevant to think about right now" — that's memory recall
- Context selection (only load what's relevant) is what makes the memory system scale
- Context quality (clear, explicit, well-structured) is what makes individual memories useful

**Separation of concerns — three distinct things:**

- **Memory tree** (`memory/`) — agent's knowledge, organized for retrieval. Can be restructured freely. The agent maintains this. This is the agent's *understanding of the world*.
- **Code and config** — normal project folder structures, organized however makes sense for the codebase. Memory tree points at these but doesn't contain them. This is *the world itself*.
- **Documentation articles** — human-readable knowledge for people. Can be exported from agent memory but lives separately from it. (Future — not yet implemented.)

This separation means:
- The memory tree can be reorganized without touching code
- Code can follow its own conventions without conforming to memory structure
- Codebase files live outside the tree; the tree points at them
- Documentation articles can be written for humans, not agents
- Growing and restructuring memory doesn't risk breaking anything

## Decisions made

### Memory tree structure

**Location:** `memory/` at the repo root. Clean separation from everything else.

**Organization: by domain, not by type.** Folders represent domains of knowledge (e.g. devices, networking, workflows), not categories of memory (heuristics, state, preferences). Why: when an agent works on a task, it wants ALL relevant memory for that domain in one place. The memory type lives in file frontmatter, not folder structure.

**Entry points:** Root `memory/README.md` is mandatory — it's the agent's first stop for orienting in its own memory. Branch-level entry points (README.md) become mandatory once a branch has more than a few files or sub-branches. Small branches can be described adequately by the root index.

**File format:** Markdown with YAML frontmatter. Each memory file includes:

```markdown
---
type: state | heuristic | preference | procedure | decision | custom
type-description: (required only for custom — what this type means and why it doesn't fit a core type)
scope: cross-cutting | <domain name>
confidence: high | medium | low
last-verified: YYYY-MM-DD
---

# Title

Content — the actual knowledge.

**Why:** What motivated this.

**Applies when:** When an agent should use this knowledge.
```

**Core memory types:**
- `state` — what something looks like right now (facts, not opinions)
- `heuristic` — a principle that guides decision-making in ambiguous situations
- `preference` — how the user likes to work (communication, workflow, style)
- `procedure` — steps for doing something
- `decision` — why something is the way it is, what was tried and rejected
- `custom` — doesn't fit the above; requires `type-description` field explaining what it is and why it doesn't fit. During memory refinement, custom types that recur may become new core types.

**File naming:** Descriptive, kebab-case. The name should tell you what's inside without opening the file.

**Size constraint:** If a memory file exceeds ~50-60 lines, consider splitting it. Keeps individual memories focused and makes the tree do the organization work.

### Two-tier heuristics (centralized + distributed)

- A small centralized file for **cross-cutting principles** — short proverbs that apply everywhere, kept deliberately small
- **Domain-specific heuristics** stay in their branch of the memory tree — the agent finds them through depth-first navigation
- The constraint that keeps the central file small: **if a principle only matters in one domain, it doesn't go in the central file**
- The bar for cross-cutting: it changes how you think **regardless of which domain you're working in**

### Remembering process

When an agent is asked to "remember" something, it follows a defined process in `agent/remembering.md`. The intro file contains a compact pointer (the memory categories and their destinations) so the agent always knows the categories exist, but the full process lives in the tool file, loaded on demand.

**The remembering process (detailed in `agent/remembering.md`):**
1. **Understand** — what kind of knowledge is this?
2. **Classify** — which core type, which maps to which location in the memory tree
3. **Read what's already there** — before writing anything, look at existing content in the target location. This step is mandatory, not optional.
4. **Assess impact** — does this fit cleanly alongside what exists? Does it overlap with or supersede something? Does it suggest consolidation or restructuring?
5. **Act proportionally** — simple addition, consolidation of one file, or restructuring across several. The agent decides based on what it found in steps 3-4.
6. **Write at the right abstraction level** — specific enough to act on, general enough to apply broadly. Both levels should exist where possible: the general principle AND a grounding example.

**Consolidation is mandatory, not optional.** Every time a memory is added, the agent reviews existing memories in that location and asks:
- Does this new thing refine or replace something existing?
- Can two memories merge into one?
- Has something that started as cross-cutting actually proven to only matter in one domain? Push it down.
- Has a domain-specific memory proven to apply everywhere? Promote it.

**Model capability gate:** Any agent can *add* to memory. But *restructuring* (merging, rewriting, reorganizing across files) should be done by a capable model or the orchestrator. The rule: add freely, restructure carefully.

### Intro file additions

The intro file gets two things:
1. **More "why" in the intro** — explain that repos using this template are used from multiple devices that sync via git, sessions have no shared chat history, the repo is the only durable cross-device memory. Motivation helps agents internalize the rule.
2. **Compact memory classification table and pointer** — under the "memory lives in the repo" rule, a short reference of categories and destinations, plus "see `agent/remembering.md` for the full process."

### Memory refinement (extension of context-refinement)

The `agent/context-refinement.md` process currently audits documentation clarity. It should be extended to also audit memory quality:
- Are there `custom` types that have accumulated enough to become a core type?
- Are there `custom` types that are actually just a core type with a different name?
- Are cross-cutting principles still truly cross-cutting, or should some be pushed to domains?
- Are domain-specific memories that keep appearing in multiple domains actually cross-cutting?
- Are memories stale (`last-verified` too old)?
- Has the memory tree grown in a way that still serves context selection, or has a branch gotten too large?
- Should any categories be added, merged, or retired?

Categories emerge from usage rather than being designed upfront. The refinement process is how they evolve.

## Plan

### Phase 1: Design the remembering process and memory tree

- [ ] **1a. Create `agent/remembering.md`**
  The full tool file for the remembering process. Covers:
  - Why memory works this way (multi-device, git-synced, no session history)
  - Memory categories with descriptions and examples
  - The 6-step remembering process (understand → classify → read existing → assess → act → write)
  - Consolidation rules and the model capability gate
  - Abstraction-level guidance with worked examples
  - Where each category lives in the memory tree
  - How to know when you're done

- [ ] **1b. Update intro file**
  - Add motivation (why memory lives in the repo)
  - Add compact memory classification table and pointer to `agent/remembering.md`
  - Clarify that device-local files (permissions, settings) are fine but knowledge goes in the repo
  - Reference the remembering process

- [ ] **1c. Create initial `memory/` tree structure**
  - `memory/README.md` — root index explaining the tree and how to navigate it
  - Template for domain folders and memory files
  - Example seed content demonstrating the format

- [ ] **1d. Create cross-cutting principles file**
  - Seed with initial principles as they emerge — keep deliberately small
  - Decision TBD: may live inside the memory tree or in `agent/`, depends on whether it's always-loaded or navigated-to

### Phase 2: Integrate with existing architecture

- [ ] **2a. Update `agent/architecture.md`**
  - Add section on the memory tree: what it is, why it's separate from code/docs, how it fits context quality and context selection
  - Explain the two-tier heuristics model
  - Explain memory as the agent's understanding of the world vs. files as the world itself

- [ ] **2b. Design memory refinement process**
  Either extend `agent/context-refinement.md` or create `agent/memory-refinement.md`. The audit process for memory quality, category evolution, staleness, and tree health.

- [ ] **2c. Update root `README.md`**
  Add `memory/` to the project map. Add `agent/remembering.md` to the agent/ table.

- [ ] **2d. Review intro file for coherence**
  Make sure the remembering process, the "memory lives in the repo" rule, and the new memory tree all work together without redundancy.

### Phase 3: Future considerations (not yet planned)

- Documentation articles as exportable human-readable knowledge (separate from memory tree)
- Module splitting guidelines — when a module or memory branch gets too large, how to split it
- How the remembering process interacts with sub-agents (sub-agents can add memory but shouldn't restructure)

## Progress

Plan file created. Ready to begin Phase 1.

## Next steps

Start with **1a** (`agent/remembering.md`) — this is the tool file that everything else references. It needs to be written carefully because it teaches agents how to think about memory, not just where to put things.

## Notes

**Why not just expand the intro file:** The intro file is loaded every session. It needs to stay concise. Every line added competes for attention with core rules. The remembering process and memory tree details are loaded on demand.

**The abstraction-level problem:** When writing heuristics, both levels should exist. A general principle AND a grounding example. The principle teaches reasoning; the example prevents misinterpretation.

**Why two tiers work:** Same pattern as the existing architecture — the README tree solves context selection by loading only what's relevant. Memory should work the same way. Universal principles load centrally; domain-specific knowledge loads through navigation.

**The growth problem for cross-cutting principles:** Domain-specific memory scales fine — if a branch gets too big you split it. Cross-cutting principles don't have that escape valve. So the remembering process is biased against adding to the central file. The default is "this probably belongs in a domain branch" and you need a strong reason to promote it to cross-cutting.

**Everything is context:** The line between "document" and "memory" is blurry because from the agent's perspective, everything it reads to make a decision is context. The memory tree makes this explicit — it's the agent's organized understanding of the world. Code and config are the world. The tree describes and points at the world but doesn't contain it.
