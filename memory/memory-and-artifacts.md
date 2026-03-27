---
type: decision
confidence: high
last-updated: 2025-07-13
---

# Memory and artifacts: the two-layer model

Two distinct layers exist in this repo:

- **Memory** (`memory/`) — the agent's knowledge. Understanding of the codebase, the project, the user's intentions, decisions, principles — everything the agent knows. The agent owns and organizes this freely.
- **Artifacts** — everything else. Code, human documentation, config files, IDE instruction files (`copilot-instructions.md`, `.cursorrules`, `agent/intro.md`), plan files — anything in the repo that isn't memory.

**The learning process is bidirectional.** Memory informs how artifacts are created. Creating and working with artifacts generates knowledge that the agent encodes back into memory. Session history is temporary — encoding it into memory is how knowledge persists.

**IDE instruction files are artifacts.** They get auto-injected into prompts by their IDE. They point to `memory/root.md` to bootstrap the agent into the memory system. The memory tree stays IDE-agnostic; the instruction files are IDE-specific artifacts.

**The agent is an active participant in its own prompt engineering.** It encodes knowledge into memory, then can generate or update instruction-file artifacts from that knowledge — shaping its own behavior in future sessions.

## Why separation exists

Context files stored alongside code kept growing by appending rules. Longer files degraded comprehension. Organizing into a tree helped, but reorganizing the tree disrupted the code files next to it. The memory tree must exist outside of code and documentation so it can grow, reorganize, and evolve without affecting the project it lives inside.

**Why:** Failed approach — storing agent knowledge alongside code. Reorganizing knowledge disrupted code structure. Separation lets each layer evolve independently.

**Applies when:** Always. This is the foundational architecture of the system.
