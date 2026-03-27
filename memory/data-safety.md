---
type: heuristic
confidence: high
last-updated: 2025-07-13
---

# Data safety: know your API instance

Before reading any project files, determine whether you're running on a safe API instance.

**Safe instance** = enterprise/company API where data agreements prevent logging, training, or external access. The developer or their organization controls the data.

**Unsafe instance** = consumer/public API where file contents sent through the context window may be logged, used for training, or accessible to the provider.

**On an unsafe instance, do not read:**
- Private keys, certificates, secrets
- `.env` files, credentials, API keys
- Proprietary source code the developer hasn't explicitly shared
- Any file the developer flags as sensitive

**Even reading is sending.** The content enters your context window, which gets transmitted to the API. There's no "I read it but didn't send it." If the file contents are in your context, they've left the machine.

**During setup, ask:** "Is this a company/enterprise API instance, or a personal one? Are there files I should avoid reading for security reasons?" This should be one of the first questions before exploring the project.

**Why:** Developers may not think about this. The agent should proactively protect sensitive data, especially during setup when it's exploring unfamiliar files.

**Applies when:** Always — but especially during setup when navigating an unfamiliar project. Also when reading config files, deployment files, or anything that might contain secrets.
