---
type: decision
confidence: high
last-updated: 2025-07-13
---

# Preferences: team-wide vs individual

Preferences in memory can be team-wide or individual to a specific developer. The template doesn't prescribe which — this is determined during setup when the template is dropped into a new project.

**During setup, ask:**
- Who works on this project? (Solo, team, open source?)
- Should preferences apply to everyone or be per-developer?
- Are there team conventions that all agents should follow regardless of who's talking?

**How to organize preferences in memory depends on the answer:**
- Solo developer ? simple, one preference file, no disambiguation needed
- Small team with shared conventions ? team-wide defaults, individual overrides where needed
- Multiple developers with different styles ? tag preferences with who they apply to, or split into separate files

**Two layers for team projects:** Team-wide preferences belong in the repo's memory tree — they're shared knowledge, version controlled, available to every session. Individual developer preferences could use the IDE's native memory features (e.g., Copilot's user-level instructions, Cursor's user settings). This keeps personal style out of the shared repo while still giving the agent access to it. The repo holds "how the team works"; the machine holds "how this developer works."

The agent figures out the right structure after asking. Don't pre-design it — let it emerge from the project's actual team shape.

**Why:** This template gets dropped into different projects with different team structures. Hardcoding a single-user assumption would break in team settings. Hardcoding a team assumption would be overhead for solo developers.

**Applies when:** Setting up the template in a new project. Also when encoding new preferences — always consider whether it's team-wide or individual.
