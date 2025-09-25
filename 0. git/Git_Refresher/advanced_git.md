# Advanced Git Concepts Guide

A comprehensive guide to essential Git operations for version control and collaboration.

## Table of Contents

- [Git Cherry Pick](#git-cherry-pick)
- [Git Squash](#git-squash)
- [Git Diff](#git-diff)
- [Git Rebase](#git-rebase)
- [Git Merge](#git-merge)
- [Git Revert](#git-revert)

---

## Git Concepts Explained

**Git Cherry Pick**: Applies specific commits from one branch to another without merging the entire branch. Use when you need only certain commits from a feature branch.

**Git Squash**: Combines multiple commits into a single commit to clean up history. Use before merging feature branches to maintain a clean main branch history.

**Git Diff**: Shows differences between various Git objects (files, commits, branches). Use to review changes before committing or merging.

**Git Rebase**: Replays commits from one branch onto another, creating a linear history. Use to maintain a clean, linear project history instead of merge commits.

**Git Merge**: Combines changes from different branches, preserving branch history. Use when you want to maintain the complete development history.

**Git Revert**: Creates a new commit that undoes changes from previous commits without rewriting history. Use to safely undo changes in shared repositories.

## Git Cherry Pick

Cherry pick applies specific commits from one branch to another without merging the entire branch.

### When to use

- You need only specific commits from a feature branch
- Applying bug fixes to multiple branches
- Moving commits between branches selectively

### Syntax

```bash
git cherry-pick <commit-hash>
git cherry-pick <commit-hash1> <commit-hash2>  # Multiple commits
git cherry-pick <start-hash>..<end-hash>       # Range of commits
```

### Examples

```bash
# Apply single commit
git cherry-pick abc1234

# Apply multiple commits
git cherry-pick abc1234 def5678

# Apply range of commits (exclusive of start-hash)
git cherry-pick abc1234..def5678
```

### Common Options

- `-n, --no-commit`: Apply changes without creating commit
- `-x`: Add reference to original commit in message
- `--continue`: Continue after resolving conflicts
- `--abort`: Cancel the cherry-pick operation

---

## Git Squash

Combines multiple commits into a single commit to create cleaner history.

### When to use?

- Before merging feature branches
- Cleaning up development history
- Combining related commits into logical units

### Methods

#### Interactive Rebase (Most Common)

```bash
git rebase -i HEAD~n  # Where n is number of commits to squash
```

#### Merge with Squash

```bash
git checkout main
git merge --squash feature-branch
git commit -m "Squashed feature commits"
```

### Interactive Rebase Example

```bash
# Squash last 3 commits
git rebase -i HEAD~3

# In the editor, change 'pick' to 'squash' or 's' for commits to squash
pick abc1234 First commit
squash def5678 Second commit  
squash ghi9012 Third commit
```

---

## Git Diff

Shows differences between various Git objects (files, commits, branches).

### Git Diff Cheat Sheet

#### Basic Diff Commands

```bash
git diff                    # Working directory vs staging area
git diff --cached          # Staging area vs last commit
git diff HEAD              # Working directory vs last commit
git diff --stat            # Show only file names and change summary
```

#### Diff Between Commits

```bash
git diff commit1 commit2           # Between two commits
git diff HEAD~1 HEAD              # Between last commit and current
git diff abc1234 def5678          # Between specific commits
git diff abc1234..def5678         # Same as above (alternative syntax)
```

#### Diff Between Branches

```bash
git diff branch1 branch2          # Between two branches
git diff main feature-branch      # Compare branches
git diff main..feature-branch     # Changes in feature-branch not in main
git diff main...feature-branch    # Changes since branches diverged
```

#### File-Specific Diff

```bash
git diff file.txt                 # Specific file changes
git diff commit1 commit2 file.txt # File changes between commits
git diff branch1 branch2 file.txt # File changes between branches
```

### Useful Diff Options

- `--name-only`: Show only file names
- `--name-status`: Show file names with change status (A/M/D)
- `--color-words`: Highlight changed words
- `--no-index`: Compare files outside Git repository

---

## Git Rebase

Replays commits from one branch onto another, creating a linear history.

### When to use it

- Maintaining clean, linear project history
- Updating feature branch with latest main changes
- Cleaning up commit history before merging

### Types of Rebase

#### Simple Rebase

```bash
git checkout feature-branch
git rebase main
```

#### Interactive Rebase

```bash
git rebase -i HEAD~n  # Edit last n commits
git rebase -i main    # Rebase onto main interactively
```

### Interactive Rebase Commands

- `pick` (p): Use the commit as-is
- `reword` (r): Use commit but edit message
- `edit` (e): Use commit but stop for amending
- `squash` (s): Combine with previous commit
- `fixup` (f): Like squash but discard commit message
- `drop` (d): Remove the commit

### Example Workflow

```bash
# Start feature work
git checkout -b feature-branch

# Make commits
git add . && git commit -m "Feature work 1"
git add . && git commit -m "Feature work 2"

# Rebase onto updated main
git checkout main
git pull origin main
git checkout feature-branch
git rebase main

# Handle conflicts if they arise
git add .
git rebase --continue
```

### Rebase vs Merge

| Rebase | Merge |
|--------|-------|
| Linear history | Preserves branch history |
| Cleaner log | Shows actual development flow |
| Rewrites history | Doesn't change existing commits |
| Can cause conflicts | Less likely to have conflicts |

---

## Git Merge

Combines changes from different branches while **preserving branch history**.

### When to use merge

- Integrating completed features
- When you want to preserve development history
- Working in shared repositories where history matters

### Types of Merge

#### Fast-Forward Merge

```bash
git checkout main
git merge feature-branch  # When main hasn't changed
```

#### Three-Way Merge

```bash
git checkout main
git merge feature-branch  # Creates merge commit
```

#### No-Fast-Forward Merge

```bash
git merge --no-ff feature-branch  # Always create merge commit
```

### Merge Strategies

```bash
git merge -s ours branch-name      # Keep current branch changes
git merge -s theirs branch-name    # Prefer incoming changes
git merge --squash branch-name     # Squash and merge
```

### Example of a Workflow

```bash
# Create and switch to feature branch
git checkout -b feature-branch

# Make changes and commit
git add .
git commit -m "Implement new feature"

# Switch back to main and merge
git checkout main
git merge feature-branch

# Clean up
git branch -d feature-branch
```

---

## Git Revert

Creates a new commit that **undoes changes from previous commits without rewriting history**.

### When to use revert

- Safely undoing changes in shared repositories
- Maintaining history integrity
- Undoing changes without affecting other developers

### Basic Syntax

```bash
git revert <commit-hash>           # Revert single commit
git revert <hash1> <hash2>         # Revert multiple commits
git revert HEAD                    # Revert last commit
git revert HEAD~2                  # Revert commit 2 steps back
```

### Revert Range

```bash
git revert --no-commit HEAD~3..HEAD  # Revert last 3 commits
git commit -m "Revert last 3 commits"
```

### Common Options

- `--no-commit` (-n): Don't create commit automatically
- `--edit` (-e): Edit the commit message
- `--mainline` (-m): Specify parent for merge commits
- `--no-edit`: Don't open editor for commit message

### Example Scenarios

```bash
# Revert a bug fix that caused issues
git revert abc1234

# Revert merge commit (specify parent with -m)
git revert -m 1 merge-commit-hash

# Revert multiple commits without individual commits
git revert --no-commit HEAD~3..HEAD
git commit -m "Revert problematic changes"
```

## Git Reset vs Git Revert

### **Git Reset**

- **Moves the HEAD pointer** to a previous commit
- **Rewrites history** - commits disappear from the log
- **Dangerous for shared repositories** - can cause issues for other developers
- **Three modes**: `--soft`, `--mixed` (default), `--hard`
- **Use for**: Local changes you haven't pushed yet

```bash
git reset HEAD~1        # Undo last commit, keep changes staged
git reset --soft HEAD~1 # Undo commit, keep changes staged
git reset --hard HEAD~1 # Undo commit, discard all changes
```

### **Git Revert**

- **Creates a new commit** that undoes previous changes
- **Preserves history** - all commits remain in the log
- **Safe for shared repositories** - doesn't rewrite existing history
- **Only one mode** - always creates a new commit
- **Use for**: Undoing changes that have been pushed/shared

```bash
git revert HEAD         # Create new commit undoing last commit
git revert abc1234      # Create new commit undoing specific commit
```

### Visual Example

**Before:**
```
A - B - C - D (HEAD, main)
```

**After `git reset --hard B`:**
```
A - B (HEAD, main)
```
*Commits C and D are gone!*

**After `git revert D` (starting from original):**
```
A - B - C - D - D' (HEAD, main)
```
*D' is a new commit that undoes changes from D*

### When to Use Each

| Scenario | Use |
|----------|-----|
| Local commits not pushed | `git reset` |
| Commits already pushed/shared | `git revert` |
| Want to completely remove commits | `git reset` |
| Want to keep full history | `git revert` |
| Working alone | Either (but reset is cleaner) |
| Working in team | `git revert` (safer) |

### Key Takeaway

- **Reset** = "Pretend this never happened" (rewrites history)
- **Revert** = "I made a mistake, here's the fix" (adds to history)

## Best Practices

1. **Use descriptive commit messages**
2. **Commit often, perfect later**
3. **Keep commits atomic** (one logical change per commit)
4. **Test before committing**
5. **Use branches for features**

### When to Use Each Command

- **Cherry Pick**: Selective commit application
- **Squash**: Clean up before merging
- **Diff**: Review changes before committing
- **Rebase**: Clean, linear history
- **Merge**: Preserve development history
- **Revert**: Safe undo in shared repositories

### Workflow Recommendations

```bash
# Feature development workflow
git checkout -b feature-branch     # Create feature branch
# ... make commits ...
git rebase -i HEAD~n              # Clean up commits
git checkout main                  # Switch to main
git pull origin main              # Update main
git checkout feature-branch       # Back to feature
git rebase main                   # Rebase onto updated main
git checkout main                 # Switch to main
git merge feature-branch          # Merge feature
git branch -d feature-branch      # Clean up
```

---

## Troubleshooting

### Common Issues

1. **Merge conflicts**: Use `git status`, edit files, `git add`, then continue
2. **Detached HEAD**: Create branch with `git checkout -b new-branch`
3. **Wrong commit**: Use `git revert` for shared repos, `git reset` for local
4. **Lost commits**: Check `git reflog` to recover

### Emergency Commands

```bash
git reflog                    # See all HEAD changes
git reset --hard HEAD~1       # Undo last commit (dangerous)
git cherry-pick <commit>      # Recover specific commit
git stash                     # Save work temporarily
git stash pop                 # Restore stashed work
```

---

## Additional Resources

- [Official Git Documentation](https://git-scm.com/doc)
- [Git Visualization Tools](https://git-school.github.io/visualizing-git/)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)