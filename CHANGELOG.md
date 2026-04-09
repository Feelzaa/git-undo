# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
