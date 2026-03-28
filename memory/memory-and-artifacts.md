---
type: decision
confidence: high
last-updated: 2026-03-28
---

# Memory and artifacts: the two-layer model

Two distinct layers exist in this repo:

- **Memory** (`memory/`) � the agent's knowledge. Understanding of the codebase, the project, the user's intentions, decisions, principles � everything the agent knows. The agent owns and organizes this freely.
- **Artifacts** — everything else. Code, human documentation, config files, IDE instruction files (`CLAUDE.md`, `.cursorrules`, `copilot-instructions.md`), plan files — anything in the repo that isn't memory.

**The learning process is bidirectional.** Memory informs how artifacts are created. Creating and working with artifacts generates knowledge that the agent encodes back into memory. Session history is temporary � encoding it into memory is how knowledge persists.

**IDE instruction files are artifacts.** They get auto-injected into prompts by their IDE. They point to `memory/root.md` to bootstrap the agent into the memory system. The memory tree stays IDE-agnostic; the instruction files are IDE-specific artifacts.

**The bootstrap file is a minimal entry point, not a behavioral manual.** Each IDE has its own auto-injected file (`CLAUDE.md` for Claude Code, `.cursorrules` for Cursor, etc.). `agent/intro.md` is the template — copy its content into whatever file your IDE uses. The bootstrap's job is to get the agent into the memory system — core rules, a brief process reminder, and a pointer to `memory/root.md`. Once the agent navigates to memory, it uses its own memory to learn detailed behavior. The bootstrap should be as slim as possible — every line competes for attention with the memory pointer.

**The agent is an active participant in its own prompt engineering.** It encodes knowledge into memory, then can generate or update instruction-file artifacts from that knowledge � shaping its own behavior in future sessions.

## Why separation exists

Context files stored alongside code kept growing by appending rules. Longer files degraded comprehension. Organizing into a tree helped, but reorganizing the tree disrupted the code files next to it. The memory tree must exist outside of code and documentation so it can grow, reorganize, and evolve without affecting the project it lives inside.

**Artifacts are for humans.** All guides, documentation, and process files in `agent/` should be written for developers to read and understand. If knowledge only matters to the agent, it belongs in memory � not in an artifact.

**One exception: the bootstrap file.** The IDE-specific instruction file (or `agent/intro.md` as the template) is written for the agent but lives as an artifact because IDEs need to inject it. It's the bridge between the IDE and the memory system. Every other `agent/` file should be human-readable.

**Why:** Failed approach � storing agent knowledge alongside code. Reorganizing knowledge disrupted code structure. Separation lets each layer evolve independently.

**Applies when:** Always. This is the foundational architecture of the system.
