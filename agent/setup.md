# setup.md — initialize a new project

**For agents:** Use when the user says to set yourself up after copying `agent/` into a new project. Main actions: regenerate **`agent/system-environment.md`** for this run environment; remove the example module (if present); **update all references to the project being a template** so that after setup the project is described as the user's project, not a template.

**Humans:** After copying the agent folder to a new project, tell the agent to read setup.md and set itself up.

---

## How the documentation is set up

- **intro.md** — First thing to read in a new chat (user points you here). Gives read order (WIP doc → module current-state → system-environment when relevant), context sources, how to read module docs, keeping docs in sync, paths, rules. Rules and best practices are in each module's context/current-state.md. One branch per WIP; cleanup pushes to it.
- **new.md** — When the user wants to start a new WIP or create a new module. Defines what a WIP is, module layout (one folder per module, each with README + context/), WIP doc format, branch naming (`main--<wip-slug>`), and two workflows: create a new module (new folder) or add a new WIP to an existing module.
- **cleanup.md** — When the user says to clean up (e.g. "clean up according to cleanup.md"). Final pass: update module README and WIP doc, update env and index if needed, push to the WIP's branch.
- **system-environment.md** — Run environment for **this** project (e.g. laptop, server, container, embedded host): OS, interfaces when applicable, config path, reference tables. **Regenerated per machine or run target**; in a new project you must regenerate it (see below).
- **index.md** — Paths and one-line descriptions of what's in each doc (agent docs + each module's README and context files). Agents use it to choose what to read without opening the file tree. Update it when you add/remove docs or modules so the descriptions stay accurate.
- **Module folders** — Created at repo root or nested inside another module when you start modules (see new.md). Each has a README and a context/ subfolder; same format at every level. New-module structure is described in new.md; there is no separate template folder. There is no module-specific context stored inside agent/.

Intro, new, and cleanup are **generic**. Only **system-environment.md** (and optionally index.md) must be updated when you initialize a new project.

---

## Running setup on an existing project

Setup **does not modify any application code** or any module other than the template’s **example-module/** folder. It only:

- Removes **example-module/** (if present) and updates **agent/index.md** to drop the example section.
- Overwrites **agent/system-environment.md** with fresh environment data.
- Optionally adds or removes rows in **agent/index.md** for other docs/modules.

So it is safe for your codebase. Two caveats: (1) If you have a **real** module named **example-module/** at repo root, setup will delete it—rename it first if you care about it. (2) Any custom content you added to **agent/system-environment.md** will be replaced; back it up or merge it back after if needed. On a project that never had the template’s example module, step 1 is a no-op (nothing to delete).

---

## What to do when initializing a new project

You've copied this agent folder into a new project folder. Do **steps 1–5 in order**. After setup, **the project is no longer a template**—it is the user's project. Step 4 ensures every doc that referred to "template" is updated to reflect that. (If the project already has real modules and no template example, step 1 is a no-op—see "Running setup on an existing project" above.)

### 1. Remove the example module

The template includes an **example-module/** folder at repo root only to show the standard layout (README, context/current-state.md, context/wip-*.md, code). When initializing a **new** project, delete this folder so the repo starts with no modules:

- **Delete the entire `example-module/` directory** (including README, context/, and example.py).
- **Update `agent/index.md`** — Remove the "Example module" section (or all rows that reference example-module/). The index should go back to listing no modules, with the placeholder text: *(Template: no modules yet. When you create modules with agent/new.md, add each module and its key files here.)*

Do not skip this step. The example module is for reference only; the new project should begin with only the agent/ docs (including agent/current-state.md) and the root README.

### 2. Regenerate `agent/system-environment.md`

That file currently describes a different machine. Regenerate it for **this** machine:

1. **Read the current `agent/system-environment.md`** to see its structure: when to use; constraints (if any); config path; pinout or interfaces (if applicable); hardware/software reference tables. Keep the same structure and formatting; only the **values** will change.
2. **Run system commands** to gather this run environment's data. If a command isn't available on this platform (e.g. `vcgencmd` only on Raspberry Pi), skip it and omit or adapt that section. Examples (adjust for OS and target—Linux server, macOS, Docker, embedded):
   - **OS:** `cat /etc/os-release` (or equivalent)
   - **Kernel:** `uname -a`, `cat /proc/version`
   - **CPU / board:** `cat /proc/cpuinfo` (model, revision; on embedded, device-tree model if present)
   - **Memory:** `free -h`, `cat /proc/meminfo` (head)
   - **Storage:** `df -h /`, `lsblk`
   - **Firmware/config (if applicable):** e.g. on Raspberry Pi: `vcgencmd` and `/boot/firmware/config.txt`; on other platforms use the relevant config path
   - **Interfaces (if applicable):** e.g. `ls /dev/` for serial, GPIO, I2C, SPI; `lsmod` for loaded modules; omit on pure software targets
   - **User / permissions:** `whoami`, `id`, `hostname`
   - **Runtimes:** `python3 --version`, `node --version`, or whatever the project uses
   - **Git:** `git --version`, optionally `gh --version`
3. **Rewrite `agent/system-environment.md`** with the new data. Keep the same structure; fill in values for **this** run environment. Remove or adapt sections that don't apply (e.g. no pinout on a pure server; no platform-specific commands on a different OS).

### 3. Update `agent/index.md` if needed

If you added or removed docs or module folders (other than the example module already removed in step 1), add or remove rows in `agent/index.md` with path and a one-line description. The index is more useful than the raw file structure because descriptions let an agent decide what to open without reading multiple files first.

### 4. Update references to the project being a template

After setup, **the project is no longer a template**—it is the user's project. Update every place that still describes the repo as a template so agents and humans see this as the project, not "the template."

**Files to update:**

- **README.md** — Change the title and any prose that says "template" or "this template." Describe the repo as this project (agent context for this project, what's in it, how to use it). Remove or reword "How to use this template" (e.g. "How to use this repo" or fold into overview). Remove instructions that only apply to someone who just copied the template (e.g. "Copy or clone this repo") if they no longer apply; or keep a short "This project was initialized from the agent context template" if useful.
- **agent/current-state.md** — In "What this project is," replace the template description with a short description of **this** project (what it is, what it's for). Update the table row for README (e.g. "What the project is, what's in agent/, how to use it"). Remove the sentence about "This template includes one example-module/" (example is gone). Keep the rest (where to go next, rules) or adapt to this project.
- **agent/index.md** — In the Project root table, the README row should say something like "For humans. What the project is, what's in agent/, how to use it" (not "What the template is"). Remove any other template-only wording that remains after step 1.

Do not change intro.md, new.md, or cleanup.md unless the user wants different rules. The goal is that no doc still says "this is a template" or "use this template" after setup.

### 5. You're done

- The project is now the user's project, not a template. Docs refer to it as such.
- The user can start a chat with intro + a WIP doc, or use new.md to start a WIP/module, or cleanup.md to clean up. system-environment.md describes this project's machine.
