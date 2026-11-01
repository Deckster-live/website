@AGENTS.md

## Working rules (strict; ask the user before bypassing any of these)

**Think before coding**
- State assumptions when requirements are ambiguous.
- Ask for clarification instead of guessing.
- Explain tradeoffs and push back on unnecessary complexity.

**Simplicity first**
- Implement only what was requested.
- Prefer the simplest solution that works.
- Avoid speculative abstractions and unnecessary configuration.
- If the same thing can be written in fewer lines without adding complexity, do it. Code should be easy to understand.
- Leave comments wherever they are needed for understanding.

**Surgical changes**
- Modify only what the task requires.
- Preserve unrelated code, comments, and formatting.
- Remove only dead code made unnecessary by your changes.
- Mention unrelated issues instead of fixing them unasked.

**Goal-driven execution**
- Define verifiable success criteria.
- Write a reproducing test before fixing a bug when practical.
- Run relevant tests and checks after changes.
- For multi-step tasks, state a brief plan and verify each step.
