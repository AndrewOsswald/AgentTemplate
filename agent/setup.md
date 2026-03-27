# setup.md — getting the agent acquainted with your project

This guide explains what happens when the agent is first introduced to your project. Whether you want a full walkthrough or just need the agent to start working immediately, the process adapts to you.

---

## What to expect

The agent will briefly introduce itself and what it can do. Then it needs to learn about your project — how much and how fast depends on you.

**Two common scenarios:**

### "I want to set this up properly"

Great — the agent will explore your project, ask you questions about it, and build an initial understanding. This is the ideal first session. See the full setup process below.

### "I just need you to do this task"

That works too. The agent will:
1. Ask a few quick questions about the task and any coding standards you follow
2. Do the work
3. Learn about the project through the work itself
4. When the task is done, suggest spending some time learning more about the project — no pressure, no rush

Both approaches work. The agent gets smarter over time regardless of which path you take. Full setup is faster; task-first is more natural. Either way, every session adds to what the agent knows.

---

## Before starting: two quick questions

The agent will ask:

1. **"Is this a company/enterprise API instance, or a personal one?"** — On a personal instance, the agent will avoid reading files that might contain secrets (private keys, `.env` files, credentials), because even reading a file sends its contents through the API.

2. **"Are there files or directories I should avoid reading?"** — If parts of your project are sensitive, let the agent know upfront.

The agent may run some read-only system commands to learn about your environment if it needs that information for the work. It will encode anything important into its memory.

---

## The full setup process

If you have time for a proper introduction, here's what the agent will do:

### 1. Explore your project

The agent looks at your project's structure — folders, files, languages, frameworks, existing documentation — without trying to read everything at once. It gets the lay of the land.

### 2. Interview you

The agent will ask about your project. This is a conversation, not a checklist — it follows what's interesting and asks follow-ups.

**Typical questions:**
- What is this project? What does it do?
- Who works on it?
- What's the current state — active development, maintenance, greenfield?
- Are there coding standards or conventions the team follows?
- How should the project be divided into modules?
- What IDE/agent platform are you using?
- What parts matter most?

You don't need to explain everything in one sitting. The agent can learn over several sessions.

### 3. Propose a plan

Before creating anything, the agent will show you what it plans to generate — module structure, documentation files, configuration. You approve before it proceeds.

### 4. Generate the skeleton

The agent creates initial documentation: a project overview, module-level READMEs, and placeholder context files. Things it doesn't know get marked as `*(to be documented)*` rather than guessed at.

It also creates the IDE-specific entrypoint file so future sessions start automatically.

### 5. Review together

The agent presents what was created and what's still placeholder. You verify accuracy and note what should be filled in during future sessions.

---

## How you can help the agent perform well

The agent is designed to be independent, but it needs your help to get there:

- **Explain the "why" behind things.** Code shows what something does. The agent needs to know *why* it does it that way, what was tried before, and what constraints exist.
- **Mention standards early.** If you have coding conventions, architecture patterns, or team practices, tell the agent before it starts writing code. It will ask, but volunteering helps.
- **Correct mistakes immediately.** When the agent gets something wrong, say so. It encodes corrections into memory so it doesn't repeat them.
- **Don't repeat yourself.** If you've explained something before and the agent asks again, something went wrong with its memory. Let it know — "I already told you this" is useful feedback.
- **Let it ask questions about high-risk topics.** The agent will be more persistent about things like git workflow, deployment triggers, and permissions. These questions prevent real damage.

---

## Ongoing learning

Setup isn't a one-time event. The agent continues learning through every session:

- **Working conversations** teach it about the project implicitly — every task adds understanding
- **Conventions** it discovers get remembered for future sessions
- **Decisions** you explain get recorded so the agent (and future sessions) don't re-try failed approaches
- **The agent may suggest better approaches** when it knows of them — this is by design, not a bug

If the agent seems like it's not using you effectively — not asking enough questions, not leveraging your knowledge, not understanding context — tell it. It's a tool, and a good tool helps the user use it well.

---

## After setup

- New sessions start automatically through the IDE entrypoint
- The agent orients itself from memory each session — no re-introduction needed
- Understanding grows session over session
- See `agent/architecture.md` if you want to understand why things are structured this way
