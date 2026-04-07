---
name: 'skill-creator'
description: "Create new Claude Code skills for this developer portfolio project. Use this skill whenever the user wants to add a new skill, says 'create a skill', 'make a new slash command', 'add a skill for', or any request to extend the project's skill system. Also use when the user wants to modify or improve an existing project skill."
---

# Skill Creator

Create new skills (slash commands) for this developer portfolio project. Skills live in `.claude/skills/<name>/SKILL.md`.

## Skill Structure

Each skill is a folder containing a `SKILL.md` file with YAML frontmatter and markdown instructions:

```
.claude/skills/<skill-name>/
└── SKILL.md
```

### SKILL.md Format

```markdown
---
name: '<skill-name>'
description: '<when to trigger — be specific and slightly pushy so the skill activates reliably>'
---

# Skill Title

Instructions for what Claude should do when this skill is invoked.
```

## Writing Guidelines

1. **Name**: Short, lowercase, kebab-case. This becomes the `/slash-command`.

2. **Description**: This is the primary trigger mechanism. Include:
   - What the skill does
   - Specific phrases and contexts that should activate it
   - Be generous with trigger phrases — undertriggering is worse than overtriggering

3. **Body**: Write clear, imperative instructions. Explain _why_ things matter rather than just listing rules. The model reading this is smart — give it reasoning, not just rigid commands.

4. **Keep it focused**: One skill = one concern. Under 500 lines is ideal. If it's growing large, split into a main SKILL.md and `references/` files.

5. **Project-aware**: Reference this project's specific conventions, file paths, and patterns. Generic skills are less useful than ones tailored to how this codebase actually works.

## Existing Skills

Before creating a new skill, check what already exists:

| Skill            | Purpose                                         |
| ---------------- | ----------------------------------------------- |
| `/animation`     | Framer Motion patterns and conventions          |
| `/tools`         | Dev commands (bun, lint, format, build, shadcn) |
| `/rules`         | Coding conventions and architectural standards  |
| `/skill-creator` | This skill — creating new skills                |

## Process

1. **Ask what the skill should do** — understand the user's intent, trigger contexts, and expected behavior
2. **Check for overlap** — make sure it doesn't duplicate an existing skill
3. **Write the SKILL.md** — create in `.claude/skills/<name>/SKILL.md`
4. **Verify** — confirm the skill file is valid and the description covers the right trigger phrases

## Tips

- Extract patterns from the existing codebase rather than writing abstract rules
- Include code examples from the actual project when they help clarify a pattern
- If a skill needs reference data that's too long for the main file, put it in a `references/` subfolder and point to it from SKILL.md
