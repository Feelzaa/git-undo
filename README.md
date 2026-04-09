<p align="center">
  <br>
  <img width="120" src="https://raw.githubusercontent.com/Feelzaa/git-undo/main/.github/logo.svg" alt="git-undo logo">
  <br><br>
</p>

<h1 align="center">⏪ git-undo</h1>

<p align="center">
  <b>Ctrl+Z for your git mistakes</b>
  <br>
  <sub>Interactive CLI to undo any git operation in seconds</sub>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@feelzaa/git-undo"><img src="https://img.shields.io/npm/v/@feelzaa/git-undo?color=cb3837&label=npm&logo=npm" alt="npm version"></a>
  <a href="https://github.com/Feelzaa/git-undo/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Feelzaa/git-undo?color=blue" alt="license"></a>
  <a href="https://github.com/Feelzaa/git-undo/stargazers"><img src="https://img.shields.io/github/stars/Feelzaa/git-undo?style=social" alt="stars"></a>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-features">Features</a> •
  <a href="#-what-can-you-undo">What Can You Undo</a> •
  <a href="#-how-it-works">How It Works</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

> **Stop Googling "how to undo git ___"** — just run `git-undo`, pick the mistake, and it's fixed.

<br>

## 🖥️ Preview

```
  ┌─────────────────────────────────────┐
  │  ⏪  g i t - u n d o                │
  │  Ctrl+Z for your git mistakes       │
  └─────────────────────────────────────┘

  Found 5 recent operations:

  🎯 Select an operation to undo:
  ❯ 📝 a1b2c3d │ commit: Accidental debug code (5 minutes ago)
    📝 d4e5f6g │ commit: Add new feature (1 hour ago)
    🔄 h7i8j9k │ reset: moving to HEAD~3 (2 hours ago)
    🔗 l0m1n2o │ merge: Merge branch 'develop' (3 hours ago)
    🔀 p3q4r5s │ checkout: moving from main to feature (1 day ago)

  ┌ Operation Details
  │
  │  📝  commit: Accidental debug code
  │     Type:    commit
  │     Hash:    a1b2c3d...
  │     When:    5 minutes ago
  │
  │  → Restore to: d4e5f6g commit: Add new feature
  │  → Effect:     Remove commit, keep changes in working tree
  │
  └──

  ⚡ Proceed with undo? Yes
  ✓ Commit undone! Changes kept in working tree

  💡 Tip: Run git-undo again to undo this undo!
```

<br>

## 🚀 Quick Start

```bash
# Use directly (no install needed)
npx @feelzaa/git-undo

# Or install globally
npm install -g @feelzaa/git-undo
git-undo
```

That's it. Run it inside any git repository. 

<br>

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎯 **Interactive** | Beautiful menu to browse & select operations |
| 🧠 **Smart Detection** | Auto-detects commits, merges, rebases, resets, etc. |
| 🛡️ **Safe by Default** | Confirmation prompt + shows exactly what will happen |
| ⚡ **Quick Undo** | `git-undo --last` to instantly undo the last operation |
| 🔍 **Dry Run** | `git-undo --dry-run` to preview without executing |
| ⏪ **Undo the Undo** | Made a mistake undoing? Run it again! |
| 📝 **Detailed Info** | Shows operation type, hash, timestamp, and restore target |
| 🚀 **Zero Config** | No setup needed — just run the command |

<br>

## 🎯 What Can You Undo?

| Operation | Icon | Behavior |
|-----------|------|----------|
| `git commit` | 📝 | Removes commit, **keeps changes** in working tree |
| `git commit --amend` | ✏️ | Reverts to pre-amend state |
| `git merge` | 🔗 | Removes merge, restores branch |
| `git rebase` | 📚 | Restores to pre-rebase state |
| `git reset` | 🔄 | Restores to pre-reset state |
| `git checkout` / `git switch` | 🔀 | Switches back to previous branch |
| `git pull` | 📥 | Reverts pull changes |
| `git cherry-pick` | 🍒 | Removes cherry-picked commit |

<br>

## 💡 Examples

### Undo an accidental commit
```bash
$ git commit -m "oops, wrong files"   # 😱 Mistake!

$ git-undo                             # 🔄 Select it, confirm

✓ Commit undone! Changes kept in working tree
```

### Undo a bad merge
```bash
$ git merge feature-branch             # 💥 Conflicts everywhere!

$ git-undo                             # 🔄 Select the merge

✓ Merge undone! Restored to pre-merge state
```

### Undo a hard reset
```bash
$ git reset --hard HEAD~5              # 😰 Lost 5 commits!

$ git-undo                             # 🔄 Select the reset

✓ Restored! Back to previous state
```

### Quick undo (no menu)
```bash
$ git-undo --last                      # ⚡ Undo last operation instantly
```

### Preview before undoing
```bash
$ git-undo --dry-run                   # 🔍 See what would happen
$ git-undo --last --dry-run            # 🔍 Preview last operation undo
```

<br>

## 🛠️ How It Works

```
┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────┐
│ git-undo │ →  │ Parse reflog │ →  │ Select entry │ →  │   Undo   │
│  (run)   │    │ (20 entries) │    │ (interactive)│    │  (safe)  │
└──────────┘    └──────────────┘    └──────────────┘    └──────────┘
```

1. **Reads `git reflog`** — your full operation history that git tracks automatically
2. **Parses & categorizes** — identifies what each operation was (commit, merge, etc.)
3. **Interactive selection** — pick which operation to undo with arrow keys
4. **Smart undo** — uses the correct git command based on operation type
5. **Safety first** — shows what will happen and asks for confirmation

<br>

## 🔒 Safety

- ✅ **Confirmation required** before any destructive action
- ✅ **Shows restore target** so you know exactly where you're going
- ✅ **Reflog preserved** — you can always undo the undo
- ✅ **Commits keep changes** — undo a commit without losing your work
- ✅ **Clear error messages** when something goes wrong

<br>

## 📋 Requirements

- **Git** 2.0 or higher
- **Node.js** 14 or higher

<br>

## 🤝 Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

```bash
git clone https://github.com/Feelzaa/git-undo.git
cd git-undo
npm install
node index.js   # Test locally
```

<br>

## 📜 License

[MIT](LICENSE) © 2026 [Feelzaa](https://github.com/Feelzaa)

<br>

---

<p align="center">
  <sub>If <b>git-undo</b> saved you from a disaster, give it a ⭐</sub>
  <br>
  <sub>Made with ❤️ for developers who make git mistakes <i>(aka all of us)</i></sub>
</p>
