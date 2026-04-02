---
description: Draft a commit message following project standards
---

# Commit Code

When asked to commit updates, use this workflow to comply with the project standards:

1. **Follow Conventional Commits**: The project uses `@commitlint/config-conventional`. Your commit message prefix must be one of:
   - `feat`: A new feature
   - `fix`: A bug fix
   - `docs`: Documentation only changes
   - `style`: Formatting, white-space
   - `refactor`: A code change that neither fixes a bug nor adds a feature
   - `perf`: A performance enhancement
   - `test`: Adding/correcting tests
   - `chore`: Auxiliary tools, library updates
   - `ci`: CI configuration changes
   - `build`: Build system or dependencies
   - `revert`: Reverting previous commits
2. **Check Changes**: Run `git status` or review exact code diffs.
3. **Format the Commit**: The format must be `type(optional-scope): description`. Note the header max length in `commitlint.config.mjs` is 1500 chars limit.
4. **Finalize**: Proceed with executing the correct `git commit` command.
