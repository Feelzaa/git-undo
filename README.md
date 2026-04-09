# 🔄 git-undo

> Interactive CLI tool to undo git operations with ease

Ever committed the wrong files? Reset to the wrong branch? Accidentally deleted commits? **git-undo** makes fixing git mistakes as simple as selecting from a menu.

## ✨ Features

- 🎯 **Interactive selection** - Browse your recent git operations
- 🔍 **Smart detection** - Automatically detects operation types (commit, reset, merge, etc.)
- 🛡️ **Safe by default** - Confirmation prompt before any destructive action
- 🎨 **Beautiful output** - Color-coded, easy-to-read interface
- ⚡ **Lightning fast** - Instant reflog parsing and operation

## 🚀 Quick Start

### Installation

```bash
# Global install
npm install -g git-undo

# Or use directly with npx
npx git-undo
```

### Usage

Just run in any git repository:

```bash
git-undo
```

You'll see an interactive menu of recent git operations:

```
🔄 git-undo - Interactive Git Undo Tool

? Select an operation to undo:
❯ a1b2c3d 5 minutes ago - commit: Add new feature
  d4e5f6g 1 hour ago - reset: moving to HEAD~1
  h7i8j9k 2 hours ago - checkout: moving from main to feature-branch
  l0m1n2o 3 hours ago - merge: Merge branch 'develop' into main
  p3q4r5s 1 day ago - commit (amend): Update documentation
```

Select the operation you want to undo, confirm, and done! ✨

## 🎯 What Can You Undo?

- ✅ **Commits** - Undo accidental commits (keeps changes)
- ✅ **Resets** - Restore to previous state
- ✅ **Checkouts** - Go back to previous branch/commit
- ✅ **Merges** - Undo merges that went wrong
- ✅ **Rebases** - Restore to before rebase
- ✅ **Amends** - Undo commit amendments
- ✅ **Most other git operations**

## 💡 Common Use Cases

### Undo Last Commit
```bash
# You committed too early
git commit -m "WIP: incomplete feature"

# Oops! Undo it
git-undo
# Select the commit → confirmed → back to staging
```

### Restore Deleted Branch
```bash
# Accidentally deleted branch
git branch -D important-feature

# Check reflog and restore
git-undo
# Select the checkout operation → restored!
```

### Undo Failed Merge
```bash
# Merge created conflicts
git merge feature

# Too messy, undo it
git-undo
# Select the merge → clean state
```

## 🛠️ How It Works

1. **Reads git reflog** - Your complete git operation history
2. **Parses operations** - Identifies what you did and when
3. **Interactive selection** - Choose what to undo
4. **Smart undo** - Executes the right command for each operation type

## 🔒 Safety

- All destructive operations require confirmation
- Original reflog remains intact (you can always undo the undo!)
- Shows exactly what will happen before executing

## 📋 Requirements

- Git 2.0+
- Node.js 14+

## 🤝 Contributing

Found a bug? Have a feature request? PRs welcome!

```bash
git clone https://github.com/yourusername/git-undo
cd git-undo
npm install
node index.js
```

## 📜 License

MIT © 2026

## ⭐ Show Your Support

If git-undo saved you from a git disaster, give it a star! ⭐

---

**Made with ❤️ for developers who make git mistakes (aka all of us)**
