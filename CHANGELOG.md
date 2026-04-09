# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-04-09

### Improved
- Complete UI overhaul with beautiful ASCII art banner
- Operation icons (📝 commit, 🔗 merge, 🔄 reset, etc.)
- Detailed operation info panel with box-drawing characters
- Shows restore target and effect description before confirming
- Better error messages for non-git repos and empty repos
- "Undo the undo" tip after successful operation

### Fixed
- Fixed crash when undoing with no parent commit (HEAD~1 error)
- Now uses reflog-based targeting instead of HEAD~1
- Fixed ESM compatibility issues (chalk, inquirer, execa)

## [1.0.0] - 2026-04-09

### Added
- Initial release of git-undo
- Interactive CLI to undo git operations
- Support for undoing commits, resets, checkouts, merges, rebases, cherry-picks, and amends
- Smart operation type detection from reflog
- Safety confirmations for destructive operations
- Color-coded interactive interface
- Comprehensive README with examples
- MIT License
- Contributing guidelines

### Features
- Parse git reflog to show recent operations
- Interactive selection menu with inquirer.js
- Automatic operation type detection
- Safe undo commands for each operation type
- User-friendly error messages
- Works with any git repository

### Technical
- Built with Node.js
- Dependencies: commander, inquirer, chalk, execa
- ~150 lines of code
- Requires Git 2.0+ and Node.js 14+

[1.0.0]: https://github.com/yourusername/git-undo/releases/tag/v1.0.0
