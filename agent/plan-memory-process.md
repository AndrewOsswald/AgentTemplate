# plan-memory-process.md — design the memory tree and learning process

Self-contained. A new agent with no chat history should be able to read this
file and continue the work.

## Context references

- Module: `agent/` (project-level process layer)
- Read: `agent/intro.md` (core rules, process loop)
- Read: `agent/architecture.md` (context quality, context selection, README tree)
- Read: `agent/documentation-refinement.md` (documentation audit process)

## Problem

Agents don't have a clear process for storing learned knowledge in a way that survives across sessions and devices. When asked to "remember" something, they don't know where to put it or how to structure it. Adding one-off rules for each failure is tape on leaks — patching symptoms instead of building a system for the agent to learn from experience. We need a **learning process** — a way for agents to encode knowledge into memory and generate artifacts from memory, bidirectionally.

**How we got here:** Context files stored alongside code kept growing by appending rules. Longer files are understood worse. Organizing into a tree helped, but the tree needed to grow and reorganize, and that reorganization disrupted the code files sitting next to it. The memory tree must exist **outside** of code and outside of human documentation so it can change freely without affecting the project it lives inside.

## Core idea: the tree IS the memory

The README tree already works as a memory retrieval structure. Depth-first navigation is the agent deciding "what's relevant right now" — that's memory recall. The memory tree makes this explicit: a dedicated structure where the agent's learned knowledge lives, organized for retrieval.

**Everything is context, everything is memory.** From the agent's perspective, everything it reads to make a decision is context. The memory tree is the agent's organized understanding of the world. Code and config are the world itself. The tree describes and points at the world but doesn't contain it.

**This is not a documentation system that also serves as memory.** It's a memory system that an agent navigates to reconstruct its understanding of the world. The tree grows when knowledge becomes more complex (branches split, new nodes appear). The tree is structured purely for retrieval quality — not "where does this file logically belong in a project" but "where does an agent need to find this knowledge when it's making decisions."

## Memory and artifacts

Two distinct layers exist in a repo:

- **Memory** (`memory/`) — the agent's knowledge, organized for retrieval. The agent's understanding of the codebase, the project, the user's intentions, decisions, heuristics — everything the agent knows. The agent owns and organizes this. Can be restructured freely without touching anything else.
- **Artifacts** — everything the agent produces from that knowledge. Code, human documentation articles, config files, copilot-instructions, agent process files, IDE entrypoints — anything in the repo that isn't memory. Artifacts follow whatever conventions make sense for their purpose (code conventions, IDE conventions, project structure).

**The learning process is bidirectional:**
- **Memory → artifacts:** The agent uses its knowledge to produce and update artifacts. Code, docs, config, instruction files — all informed by what the agent knows.
- **Artifacts → memory:** The agent learns from the work it does. Creating code, reading docs, making decisions, receiving user feedback — all of this generates knowledge that the agent encodes back into memory.
- **Session history → memory:** Right now, knowledge lives in session history (like this conversation). That knowledge is lost when the session ends. The learning process encodes it into memory so it persists. This plan file is itself an artifact being generated from session-history knowledge — and soon we'll encode its contents into the memory tree, completing the loop.

The two layers are separate and can evolve independently.

**IDE instruction files are artifacts.** Files like `copilot-instructions.md`, `.cursorrules`, or `agent/intro.md` get auto-injected into prompts by their respective IDEs. They're artifacts the agent can generate and update from its memory.

**The agent is an active participant in its own prompt engineering.** Through the memory tree, the agent builds its own knowledge base of rules, guidelines, heuristics, and standards. It generates instruction-file artifacts that shape its own behavior in future sessions. The learning process is how this happens — the agent learns, encodes into memory, and produces artifacts from that memory.

This separation means:
- The memory tree can be reorganized without touching any artifact
- Artifacts follow their own conventions without conforming to memory structure
- Growing and restructuring memory doesn't risk breaking code, docs, or config
- The agent can freely create artifacts from memory: code, docs, instruction files, anything

## Architecture decisions

### Memory structure: a navigable graph with tree-like navigation

**Location:** `memory/` at the repo root. Clean separation from everything else.

**It's a graph, navigated like a tree.** We call it a "tree" because that's how the agent experiences it — start at the root, depth-first into the relevant branch. But the underlying structure is a graph: files can link to any other file, cross-references between branches are natural and encouraged. A networking memory can reference a device memory; a device memory can reference a networking concept.

**Folders provide the tree backbone.** The folder path tells the agent where it is and how deep:
- `memory/root.md` — root, broadest context
- `memory/networking/` — one level deep, domain-specific
- `memory/networking/protocols/` — two levels deep, narrower

Folders give the agent position awareness, hierarchy, and domain grouping. Even when following cross-references across branches, the agent always knows where it is from the path. This is what keeps the graph navigable — without folders, an agent following links in a flat directory has no sense of depth or position.

**Links between files provide the graph.** Cross-references connect knowledge across domains. These don't follow the folder hierarchy — they're lateral or upward connections that let the agent jump to related knowledge in other branches when needed.

**Circular references are allowed but are a signal.** If A references B and B references A, that's not an error — but it usually means the two are so closely related they should be consolidated, or the relationship only needs to go one direction. The agent should notice this and use judgment.

**No hard distinction between branch nodes and leaf nodes.** Any file can contain knowledge AND point to other files. An entry point that mostly navigates can also hold cross-cutting knowledge for its branch. A memory file that's mostly content can reference related files. It's a spectrum, not two file types.

**Organization: by domain, not by type.** Folders represent domains of knowledge (e.g. devices, networking, workflows), not categories of memory (heuristics, state, preferences). Why: when an agent works on a task, it wants ALL relevant memory for that domain in one place. The memory type lives in file frontmatter, not folder structure.

**Start flat. Folders emerge from content.** Don't pre-create domain folders. New memories start as files at whatever level makes sense. When a topic accumulates enough related files that the current level is getting crowded, the agent groups them into a folder. Creating the folder IS the hierarchy change — the agent is saying "this is now its own branch." The lifecycle: **file → several related files → folder → folder with entry point.** The agent decides when each transition happens based on whether the current structure still serves retrieval quality.

**Entry points:** Root `memory/root.md` is mandatory — it's the agent's first stop for orienting in its own memory. Branch-level entry points become useful once a branch has enough content that a newcomer would benefit from orientation. Not before. Structure emerges as branches grow — don't front-load overhead on a small branch.

**Navigation:** Agent reads root entry point → picks the relevant branch → follows the folder hierarchy deeper, using cross-references when needed to jump between branches. The folder structure provides the primary navigation path; cross-references provide secondary connections.

**File format:** Markdown with YAML frontmatter. Markdown because agents are trained heavily on it, frontmatter gives structured metadata that's both machine-parseable and human-readable, and headings/lists create scannable structure. The memory tree will be roughly human-readable but is primarily organized for agent retrieval, not human consumption.

**File naming:** Descriptive, kebab-case. The name should tell you what's inside without opening the file.

**Size constraint:** If a memory file exceeds ~50-60 lines, consider splitting it. Keeps individual memories focused and makes the tree do the organization work rather than relying on long files with internal structure.

### Memory file format

```markdown
---
type: root | state | heuristic | preference | procedure | decision | custom
type-description: (required only for custom — what this type means and why it doesn't fit a core type)
confidence: high | medium | low
last-updated: YYYY-MM-DD
---

# Title

Content — the actual knowledge.

**Why:** What motivated this.

**Applies when:** (optional) When an agent should use this knowledge.
```

**No `scope` field.** The file's position in the tree already encodes scope — a memory in `memory/networking/` is scoped to networking by definition. Cross-cutting memories live high in the tree (root level or a dedicated cross-cutting branch). The tree handles scoping; no need to duplicate it in metadata.

**`Applies when` is optional.** Useful for heuristics, preferences, and procedures where the trigger isn't obvious from position alone. Unnecessary for state or decisions where the tree location is sufficient context.

**`last-updated`, not `last-verified`.** The agent updates this date whenever it modifies the memory. No need for explicit "verification" — the date just reflects when the memory was last touched. This enables a natural aging lifecycle:
- Old untouched memories drift toward lower confidence over time
- When a memory proves useful during actual work, the agent refreshes it — bumps the date, maybe raises confidence
- Memories that never get touched again become candidates for pruning during refinement
- A memory that survives many sessions unchanged isn't necessarily more trustworthy — it might just be forgotten. Age without refresh is a signal to re-evaluate, not a signal of stability.

**Referencing artifacts.** Memory files reference artifacts (code, config, docs, instruction files) using file paths:
- **Inside the repo:** relative path from the repo root — e.g., `src/config/wireguard.conf`. Smallest path necessary, never more than needed from root.
- **Outside the repo:** note that it's external and use whatever path is meaningful for the context (device path, external URL, etc.).
- References live naturally in the content, not in structured frontmatter. No formal `references` field — that would create maintenance burden.

### Core memory types

- `root` — the entry point to a memory tree. Exactly one per project. Orients the agent in the memory structure and points to branches. An agent navigating into an unfamiliar project's memory can look for `type: root` to find the starting point.
- `state` — what something looks like right now (facts, not opinions)
- `heuristic` — a principle that guides decision-making in ambiguous situations. Short proverbs / "rules to live by" that make decisions easier — not exhaustive rulesets. The value is teaching the agent how to *think* about a situation, not enumerating every situation.
- `preference` — how the user likes to work (communication, workflow, style)
- `procedure` — steps for doing something
- `decision` — why something is the way it is, what was tried and rejected. Prevents future agents from re-trying failed approaches.
- `custom` — doesn't fit the above; requires `type-description` field explaining what it is and why it doesn't fit. The description requirement is the gate — an agent forced to justify "why isn't this a heuristic?" will often realize it is one. During memory refinement, custom types that recur may become new core types; customs that are miscategorized core types get reclassified.

**Structural knowledge doesn't need its own type.** That's what the README tree handles. If someone asks an agent to "remember where something is," the README tree needs updating, not a memory file.

**Categories evolve over time.** The core set covers ~90% of cases. The custom escape hatch handles the rest. The memory refinement process periodically audits whether new core types should be added, existing ones merged, or customs reclassified.

### Two-tier heuristics (centralized + distributed)

- A small centralized file for **cross-cutting principles** — short proverbs that apply everywhere, kept deliberately small
- **Domain-specific heuristics** stay in their branch of the memory tree — the agent finds them through depth-first navigation
- The constraint that keeps the central file small: **if a principle only matters in one domain, it doesn't go in the central file**
- The bar for cross-cutting: it changes how you think **regardless of which domain you're working in**

**The growth problem:** Domain-specific memory scales fine — if a branch gets too big you split it. Cross-cutting principles don't have that escape valve. So the learning process is biased *against* adding to the central file. The default assumption is "this probably belongs in a domain branch" and you need a strong reason to promote it.

**Memory size depends on the consumer.** Cross-cutting principles are small, always loaded, read by every agent. Module-level memory is medium, loaded only when working in that branch. Deep reference can be longer, only loaded when an agent navigates all the way down. Splitting a module when it gets too big isn't just housekeeping — it's maintaining retrieval quality.

### Heuristic quality: the abstraction-level problem

When writing heuristics, both levels should exist where possible:
- **The general principle** — teaches reasoning, applies broadly
- **A grounding example** — prevents misinterpretation, shows what the principle looks like in practice

Too specific → only covers one case. Too general → platitudes. The sweet spot: state the principle generally, ground it with one concrete example.

### The learning process: always on, effort scales with importance

Learning is not a mode the agent switches into. It's always running. As the agent works — writing code, creating docs, having conversations, making decisions — it continuously evaluates what knowledge is worth encoding into memory. The learning process is bidirectional: the agent learns from artifacts and experience, encodes that into memory, and uses memory to produce better artifacts.

**Effort scales with the agent's judgment of importance:**

- **Low importance** (trivial state fact, minor detail) → quick append to an existing file, or let it go entirely
- **Medium importance** (useful heuristic, a decision worth recording) → new file or append, check what's nearby, maybe light consolidation
- **High importance** (major insight, cross-cutting principle, something the user explicitly asks to remember) → read existing memories carefully, assess broadly, maybe reorganize several files, think hard about placement in the tree

When the user explicitly says "remember this," the agent should treat it with extra care — more thought about where it goes, how it integrates, what confidence level to assign. But the underlying process is the same; it's just dialed up.

**The tree position encodes importance.** Cross-cutting knowledge lives high in the tree where every session finds it. Narrow domain details live deep in branches where only relevant sessions encounter them. The agent is placing memories where future agents will find them at the right moment.

**The learning framework (principles, not a rigid flowchart):**
1. **Understand** — what kind of knowledge is this? How important is it? Where did it come from (user instruction, artifact work, observation)?
2. **Classify** — which core type? Where in the tree does it belong based on its importance and domain?
3. **Read what's already there** — before writing anything, look at existing content in the target location. **This is mandatory.** This is what prevents the "just keep appending" problem.
4. **Assess impact** — does this fit cleanly alongside what exists? Does it overlap with or supersede something? Would adding this improve or degrade retrieval quality in this part of the tree?
5. **Act dynamically** — the agent uses its discretion to choose the right action:
   - Add a new memory file
   - Append to an existing file
   - Consolidate ideas within a file
   - Consolidate across several files
   - Reorganize tree nodes
   - Let go of something that's no longer important
   - Any combination — the process is dynamic, not an exhaustive checklist
6. **Write at the right abstraction level** — specific enough to act on, general enough to apply broadly.

The effort the agent puts into steps 3–5 scales with importance. A trivial fact might skip straight to a quick append. A major insight warrants reading broadly, assessing carefully, and potentially restructuring.

### Curation, not just storage

The ability to forget is as important as the ability to learn. Not everything needs to be recorded. Every time a memory is added, the agent should also be asking:
- Does this new thing refine or replace something existing?
- Can two memories merge into one?
- Has something that started as cross-cutting proven to only matter in one domain? Push it down.
- Has a domain-specific memory proven to apply everywhere? Promote it.
- Is something no longer important or relevant? Let it go.

This keeps the tree focused and retrieval quality high.

### Model capability: optimize the tree for everyone, scale ambition with capability

**The tree is optimized for all models.** Small focused files, clear naming, good frontmatter — context quality and context selection should work for every model. If a memory node is too complex for a weaker model to understand, it's probably too complex period. The size constraint (~50-60 lines) pushes toward universally clear nodes. You don't need different tree structures for different models — you need a tree that's universally well-structured.

**What scales with capability is the ambition of the memory action:**
- **Any model** can navigate the tree and read memories — that's the whole point of the structure
- **Any model** can add straightforward memories — state facts, user preferences, simple decisions
- **Capable models** should attempt the harder work — writing good heuristics, consolidating across files, recognizing restructuring opportunities, assessing abstraction levels
- **Less capable models** should stick to additive changes and flag things for later rather than attempting consolidation that could lose nuance

**A model should know its own limits.** If it's not confident it can consolidate well, it should just add and move on. The tree can tolerate some redundancy — that's what refinement is for. What the tree can't tolerate is a bad consolidation that loses information.

### Intro file additions

The intro file gets two things:
1. **More "why"** — explain that repos using this template are used from multiple devices that sync via git, sessions have no shared chat history, the repo is the only durable cross-device memory. Motivation helps agents internalize the rule.
2. **Learning awareness + pointer to memory** — the agent should always be evaluating what's worth encoding into memory as it works. Point to `memory/root.md` as the entry to the agent's knowledge. The intro stays concise; detailed knowledge lives in memory, not in the intro.

### Memory refinement (extension of context-refinement)

The `agent/context-refinement.md` process currently audits documentation clarity. It should be extended (or a parallel process created) to also audit memory quality:
- Are there `custom` types that have accumulated enough instances to become a new core type?
- Are there `custom` types that are actually just a core type with a different name?
- Are cross-cutting principles still truly cross-cutting, or should some be pushed to domains?
- Are domain-specific memories that keep appearing in multiple domains actually cross-cutting?
- Are memories stale (`last-updated` too old)?
- Has the memory tree grown in a way that still serves context selection, or has a branch gotten too large?
- Should any categories be added, merged, or retired?

Categories emerge from usage rather than being designed upfront. The refinement process is how they evolve.

## Open questions

- **What happens to the existing `context/` pattern?** Deferred — the user wants to address this later when we reorganize the template.
- **How does the memory tree interact with sub-agents?** Sub-agents can add memory but shouldn't restructure. Details TBD.

## Plan

### Phase 1: Build the memory tree and encode the learning process

- [x] **1a.** Create `memory/root.md` — root entry point
- [x] **1b.** Encode the learning process and foundational knowledge into memory — 15 memory files covering: two-layer model, structure/format, learning process, observe/plan/act/review, user preferences, team vs individual, two-tier heuristics, heuristic quality, project purpose, resolve-before-asking, leave-things-better, context quality/selection, research foundation, memory-references-not-duplicates, setup guide status
- [x] **1c.** Review gaps — identified and filled three gaps (what memory IS, structure/format, types), encoded the self-describing insight

### Phase 2: Update intro file and bootstrap

`agent/learning.md` dropped — the learning process is foundational and lives in memory. Memory doesn't duplicate well-documented artifacts; creating a separate tool file would duplicate what's already in the tree.

- [x] **2a.** Decided: intro is a minimal bootstrap — core rules, process reminder, memory pointer. Detailed behavior lives in memory.
- [x] **2b.** Updated `agent/intro.md` — slimmed to bootstrap, added memory section with pointer to `memory/root.md`, added learning awareness, added "why" about multi-device/git-synced repos
- [x] **2c.** Created `memory/agent-process-files.md` — lightweight references to existing `agent/` process files (pointers, not duplicates)

### Phase 3: Integrate and finalize

- [x] **3a.** Observe/plan/act/review integration with learning — encoded in `memory/observe-plan-act-review.md`
- [x] **3b.** Update `agent/architecture.md` with memory tree section
- [ ] **3c.** Update root `README.md` — add `memory/` to project map
- [x] **3d.** Design memory refinement process — encoded in `memory/memory-refinement.md`
- [x] **3e.** Update `agent/setup.md` for the memory system — rewritten with memory integration, data safety, environment discovery, interview process
- [ ] **3f.** Revisit context/ pattern and module templates
- [ ] **3g.** Review everything for coherence — does this work when dropped into another project?

## Progress

Phases 1, 2, and most of 3 complete. Memory tree has 20 files across 7 types. All `agent/` artifacts rewritten as developer-facing (except `intro.md` which is the agent bootstrap). Deleted: `agent/new.md`, `agent/system-environment.md`, `example-module/`. Template is ready for initial use — being exported to real projects.

## Next steps

Remaining Phase 3 items for a future session:
- **3c.** Update root `README.md` — add `memory/` to project map
- **3f.** Revisit context/ pattern and module templates
- **3g.** Review everything for coherence — does this work when dropped into another project?

The coherence review (3g) will happen naturally as the template is used in real projects. Issues found during use become memory.

## Notes

**How we arrived here:** The design evolved through conversation across sessions. Started from "where do I put heuristics?" → discovered the two-tier pattern → realized heuristics are just one memory type → designed a category system → realized the memory tree must be separate from code and docs to allow free restructuring → landed on the memory/artifacts two-layer model → renamed remembering to learning when we realized the process is bidirectional. Each step built on the previous one.

**The bidirectional insight:** This plan file is itself an example. Knowledge lives in session history → gets encoded into an artifact (this plan file) → will be encoded into memory (the tree) → future agents will generate artifacts from that memory. The learning process goes both ways: memory → artifacts and artifacts → memory. Calling it "learning" instead of "remembering" captures this — learning includes both absorbing and producing.

**Why the tree must be self-organizing:** Early attempts used rigid module templates for memory. This made it extremely hard for the agent to do its own learning — the structure constrained the agent instead of serving it. The tree should still flow correctly (depth-first navigable, domain-organized) but the agent decides how to organize it. Standard memory types provide vocabulary, not rigid structure.

**The agent as prompt engineer:** The memory tree enables something powerful — the agent becomes an active participant in creating its own rules, guidelines, and standards. It encodes knowledge into memory, then generates artifacts (instruction files, copilot-instructions, etc.) from that knowledge. The learning process is how the agent builds its own prompt engineering, informed by accumulated experience.

**Memory like human intelligence:** Memory should grow, evolve, and change. The agent can forget things that aren't important — discretion in what to keep is as valuable as the ability to store. Confidence levels allow the agent to mark uncertain knowledge ("not sure about this, be cautious later").

**The "everything is context" insight:** The line between "document" and "memory" is blurry because from the agent's perspective, everything it reads to make a decision is context. The memory tree makes this explicit. Artifacts are the world. The tree is the agent's organized understanding of the world.

**Why not expand the intro file:** The intro file is loaded every session. Every line competes for attention with core rules. The learning process and memory tree details are loaded on demand through a pointer — same pattern as `agent/new.md`.
