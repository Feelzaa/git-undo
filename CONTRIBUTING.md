# Contributing to git-undo

Thanks for your interest in contributing! 🎉

## Quick Start

```bash
# Clone the repo
git clone https://github.com/yourusername/git-undo.git
cd git-undo

# Install dependencies
npm install

# Test it locally
node index.js

# Or link it globally
npm link
git-undo
```

## Ways to Contribute

### 🐛 Bug Reports
Found a bug? [Open an issue](https://github.com/yourusername/git-undo/issues) with:
- What you expected to happen
- What actually happened
- Steps to reproduce
- Your git version (`git --version`)
- Your Node.js version (`node --version`)

### 💡 Feature Requests
Have an idea? [Open an issue](https://github.com/yourusername/git-undo/issues) describing:
- The problem you're trying to solve
- Your proposed solution
- Any alternatives you've considered

### 🔧 Pull Requests
PRs are welcome! For major changes:
1. Open an issue first to discuss
2. Fork the repo
3. Create a feature branch (`git checkout -b feature/amazing-feature`)
4. Make your changes
5. Test thoroughly
6. Commit (`git commit -m 'Add amazing feature'`)
7. Push (`git push origin feature/amazing-feature`)
8. Open a PR

## Development Guidelines

### Code Style
- Use clear, descriptive variable names
- Add comments for complex logic
- Keep functions focused and small
- Follow existing code patterns

### Testing New Features
Before submitting:
1. Create a test git repo
2. Make various commits, merges, etc.
3. Test your changes with different scenarios
4. Verify error handling

### Supported Operations
Currently supported:
- Commits
- Resets
- Checkouts
- Merges
- Rebases
- Cherry-picks
- Amends

Want to add more? Check `parseOperationType()` in index.js

### Error Handling
Always handle errors gracefully:
- Check if in a git repo
- Validate git commands exist
- Provide helpful error messages
- Don't leave the repo in a broken state

## Project Structure

```
git-undo/
├── index.js          # Main CLI code
├── package.json      # Dependencies & metadata
├── README.md         # User documentation
├── CONTRIBUTING.md   # This file
└── LICENSE          # MIT license
```

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md (if exists)
3. Commit: `git commit -m "Release v1.x.x"`
4. Tag: `git tag v1.x.x`
5. Push: `git push && git push --tags`
6. Publish: `npm publish`

## Questions?

Open an issue or discussion. We're happy to help!

## Code of Conduct

Be kind, respectful, and constructive. We're all here to make git less painful.

---

Thanks for making git-undo better! 🚀
