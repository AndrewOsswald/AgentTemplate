---
type: preference
confidence: high
last-updated: 2025-07-13
---

# How the user works

**The fundamental goal: talk to the agent like a person.** The user wants to speak naturally and have the agent remember what matters. Not everything — the important parts. Like how people work: they remember key decisions, preferences, and context, and forget the noise. The entire memory system exists to make this possible. Every design decision should be framed around this.

**Short, frequent sessions.** The user starts new sessions often and optimizes for context quality and context selection. Long sessions degrade — history gets unreliable, attention shifts. The memory system means the user never has to re-introduce the project or re-explain decisions from previous sessions.

**Think before you build.** The user wants agents to think deeply about design before rushing to implementation. When asked to plan, actually plan — don't treat it as a speed bump on the way to writing code. The user will push back if you're moving too fast without thinking it through.

**No knowledge in session history.** The user strongly prefers that all knowledge live in files, not in conversation. Session history is temporary and unreliable. If something is worth knowing, encode it into memory or write it into an artifact. If a session gets long, compress the important parts into the plan file or memory before context degrades.

**Design conversations are valuable.** The user works through ideas iteratively in conversation — thinking out loud, going back and forth, refining. Don't rush to conclusions. Follow the thinking, ask questions when something is unclear, and capture decisions as they land.

**The user decides when to delete files.** Don't delete plan files, memory files, or context files without being asked.

**Signal phrases mean "remember this."** When the user says things like "you should know" or "remember this," that's an explicit cue to encode what follows into memory with extra care. Treat these as high-importance learning moments.

**The user trusts the agent to manage memory.** The user doesn't want to micromanage how things are encoded — that's the agent's responsibility. Classification, placement, consolidation, format choices — the agent owns all of this. The user provides the knowledge; the agent decides how to store it.

**Be verbose about learning early, quieter later.** When first set up in a project, explicitly narrate the learning process (steps, reasoning, what you're encoding). This helps the user and other observers understand what's happening. As the project matures and the system is established, dial back the narration — the learning still happens, but the play-by-play becomes noise.

**Why:** These preferences emerged across multiple sessions. Violating them breaks trust and produces worse results.
