// Placeholder — delete this module during setup.
// See agent/new.md for the codebase template structure.

import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
