# Contributing to ChewTube

Thanks for helping improve ChewTube! This repo is a fast-moving UI prototype, so keeping your branch in sync is the best way to avoid merge conflicts.

## Sync with `main`

```bash
git fetch origin
git merge origin/main
```

If you prefer rebasing:

```bash
git fetch origin
git rebase origin/main
```

## If a merge conflict happens

1. Open the conflicted files and resolve the markers.
2. Re-run your formatter if needed.
3. Stage and commit the fix:

```bash
git add <resolved-files>
git commit -m "Resolve merge conflicts with main"
```

## Line endings

This repo normalizes line endings to LF to reduce platform-specific diffs. If your editor prompts to switch line endings, choose **LF**.

## Pull request checklist

- [ ] Your branch is up to date with `main`
- [ ] You resolved any merge conflicts locally
- [ ] You ran relevant checks (if applicable)
- [ ] You summarized the change in the PR description
