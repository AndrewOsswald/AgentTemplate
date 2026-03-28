---
type: state
confidence: high
last-updated: 2026-03-28
---

# This repo is a template

This repo (AgentTemplate) is designed to be dragged and dropped into another project. It's not a standalone application � it's the scaffolding that gives an agent the ability to orient itself, learn, and work autonomously in any codebase.

When this template is dropped into a project, the agent gets:
- The `agent/` folder � behavioral rules, process loop, tool files
- The `memory/` folder � the agent's knowledge base, starting empty and growing through use
- IDE-specific instruction files that bootstrap the agent into the system

Everything in this repo should be designed with portability in mind. The memory system, the learning process, the file format � all of it needs to work in any project it lands in, not just here.

**IDE agnostic.** The behavioral core (the memory tree, the learning process, `agent/intro.md` as a template) works across any IDE or agent platform. During setup, the intro content gets copied into whatever file the IDE auto-injects (`CLAUDE.md` for Claude Code, `.cursorrules` for Cursor, etc.). These IDE-specific files are artifacts that bridge the IDE and the memory system. The template itself never depends on a specific IDE's features.

**But once deployed, use the IDE's features.** The template is portable. A deployed instance is not � it knows which IDE it's running in (learned during setup). After setup, the agent should actively leverage IDE-specific capabilities: native memory features for per-user preferences, available tool integrations, platform-specific workflows. Being IDE-agnostic as a template doesn't mean ignoring what the IDE gives you once you're running in it.

**Why:** This context matters for every design decision. Features that only work in this repo but break when transplanted into a real project are failures. The template must be self-contained and project-agnostic.

**Applies when:** Any design decision about the template's structure, conventions, or processes. Always ask: does this work when dropped into someone else's codebase?
