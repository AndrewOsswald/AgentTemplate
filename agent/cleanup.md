# cleanup.md — end-of-session review

When the user asks to clean up, run these steps. Goal: all documentation accurately reflects what happened this session so a fresh agent can continue without chat history.

---

## 1. Review work done this session

List what was changed: code written, config modifications, completed tasks, files created or modified.

## 2. Verify context files

For each module touched this session:

- **Context files** (e.g. `context/current-state.md`, `context/index.md`, or equivalent per template) — do they accurately reflect the current state? Update if anything changed that wasn't captured during act.
- **Module README** — does the overview still match reality? Update if capabilities, guides, or current state changed. Do not duplicate context file content — the README is the stable overview.
- **Guides** — if you ran setup or operational steps, did the guide get updated with corrections, clarifications, or deviations?
- **Plan files** — is progress accurately tracked? Move items between planned/in-progress/done. Update next steps. Add notes about failures or decisions.

## 3. Verify project-level files

- **Root `README.md`** — update if modules were added/removed or the project map changed.
- **`agent/system-environment.md`** — update if software was installed/removed on the dev machine.
- **Parent README files** — if you added a sub-module or guide, does the parent's README list it?

## 4. Commit and push

Commit all changes and push to the remote so future sessions start from the latest state.

```bash
git add -A
git commit -m "<descriptive message>"
git push origin main
```

If the push fails because the remote is ahead, pull first, resolve conflicts with the user, then push. Do not force-push.

## 5. Confirm

Tell the user briefly:
- What modules were touched
- What documentation was updated
- Whether a commit was made
- Any remaining work tracked in plan files
