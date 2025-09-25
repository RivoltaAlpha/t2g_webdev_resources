# Git and GitHub Refresher

---

## ✅ 1. What is Git and GitHub?

- **Git**: A distributed version control system to track changes in source code.
- **GitHub**: A remote platform to host Git repositories and collaborate.

---

## ✅ 2. Git Setup

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## ✅ 3. Basic Git Workflow

| Command                     | Purpose                     |
|-----------------------------|-----------------------------|
| `git init`                  | Initialize a Git repo       |
| `git clone <repo-url>`      | Clone a remote repo         |
| `git status`                | Check changes               |
| `git add <file>` or `.`     | Stage changes               |
| `git commit -m "message"`   | Commit staged changes       |
| `git push origin main`      | Push to remote              |
| `git pull`                  | Pull changes from remote    |

### 🧪 Practice:

```bash
mkdir my-app && cd my-app
git init
touch index.html
git add .
git commit -m "Initial commit"
```

---

## ✅ 4. Branching

- **Create a branch**:  
  ```bash
  git branch feature-1
  ```

- **Switch to a branch**:  
  ```bash
  git checkout feature-1
  ```

- **Create and switch to a branch**:  
  ```bash
  git checkout -b feature-2
  ```

### Merge:

```bash
git checkout main
git merge feature-1
```

### Delete a branch:

```bash
git branch -d feature-1
```

---

## ✅ 5. Resolving Merge Conflicts

Conflicts occur when changes on two branches clash.

### Steps:
1. Git marks conflict areas.
2. Manually fix the file.
3. Add the resolved file:  
   ```bash
   git add <file>
   ```
4. Commit to finalize:  
   ```bash
   git commit
   ```

---

## ✅ 6. Git Logs & Undoing

- **View commit history**:  
  ```bash
  git log
  git log --oneline
  ```

- **View HEAD changes**:  
  ```bash
  git reflog
  ```

- **Undo changes**:  
  ```bash
  git checkout <commit>    # View an old state (detached HEAD)
  git revert <commit>      # Safely undo a commit
  git reset --soft HEAD~1  # Undo last commit, keep changes staged
  git reset --hard HEAD~1  # Undo commit and discard changes
  ```

---

## ✅ 7. Git Stash

Git stash temporarily saves (or “stashes”) your uncommitted changes — both staged and unstaged — without committing them to the current branch. You can then apply or pop them back later.:

```bash
git stash               # Stash changes
git stash list          # View stashes
git stash apply         # Reapply the last stash
git stash drop          # Remove a stash
git stash pop          # Apply the last stash and remove it from the stash list
```

---

## ✅ 8. Git Rebase vs Merge

- **Merge**: Preserves branch history.
- **Rebase**: Rewrites history to be linear.

```bash
git checkout feature
git rebase main         # Rebase feature onto the latest main
```

---

## ✅ 9. Git Squash

Combine commits:

```bash
git rebase -i HEAD~3    # Pick or squash
```

### Example:
```plaintext
pick abc123 Add login
squash def456 Fix typo
squash ghi789 More fixes
```

---

## ✅ 10. Git Cherry-pick

Apply a specific commit from one branch to another while preserving the commit's changes:

```bash
git cherry-pick <commit-hash>
```

---

## ✅ 11. GitHub: Pushing to Remote

```bash
git remote add origin https://github.com/yourname/repo.git
git push -u origin main
```

---

## ✅ 12. Pull Requests (on GitHub)

1. Push a feature branch.
2. Create a Pull Request (PR) to `main`.
3. Review, test, and merge.
   
---

## Summary table
| Action        | Use Case                       | Command                  |
| ------------- | ------------------------------ | ------------------------ |
| `merge`       | Combine branches, keep history | `git merge branch`       |
| `rebase`      | Clean history, linear commits  | `git rebase branch`      |
| `squash`      | Combine multiple commits       | `git rebase -i HEAD~n`   |
| `cherry-pick` | Apply specific commits only    | `git cherry-pick <hash>` |

---

```
