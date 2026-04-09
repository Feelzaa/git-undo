#!/usr/bin/env node

const { program } = require('commander');
const execa = require('execa');
const inquirer = require('inquirer');
const chalk = require('chalk');

const BANNER = `
  ${chalk.cyan('┌─────────────────────────────────────┐')}
  ${chalk.cyan('│')}  ${chalk.bold.white('⏪  g i t - u n d o')}                 ${chalk.cyan('│')}
  ${chalk.cyan('│')}  ${chalk.dim('Ctrl+Z for your git mistakes')}       ${chalk.cyan('│')}
  ${chalk.cyan('└─────────────────────────────────────┘')}
`;

const ICONS = {
  commit: '📝',
  amend: '✏️ ',
  reset: '🔄',
  checkout: '🔀',
  merge: '🔗',
  rebase: '📚',
  pull: '📥',
  'cherry-pick': '🍒',
  other: '⚙️ ',
};

async function getGitReflog() {
  try {
    const { stdout } = await execa('git', ['reflog', '--format=%H|%gD|%gs|%cr', '-20']);
    const entries = stdout.split('\n').filter(line => line.trim()).map(line => {
      const [hash, ref, subject, relativeTime] = line.split('|');
      const type = parseOperationType(subject);
      const icon = ICONS[type] || ICONS.other;
      return {
        hash: hash.substring(0, 7),
        fullHash: hash,
        ref,
        subject,
        type,
        relativeTime,
        display: `${icon} ${chalk.yellow(hash.substring(0, 7))} ${chalk.dim('│')} ${chalk.white(subject)} ${chalk.dim('(' + relativeTime + ')')}`
      };
    });
    return entries;
  } catch (error) {
    if (error.message.includes('not a git repository')) {
      console.log(`\n  ${chalk.red('✗')} ${chalk.bold.red('Not a git repository')}`);
      console.log(`  ${chalk.dim('Run this command inside a git project')}\n`);
      process.exit(1);
    }
    if (error.message.includes('does not have any commits')) {
      console.log(`\n  ${chalk.yellow('⚠')} ${chalk.bold.yellow('No commits yet')}`);
      console.log(`  ${chalk.dim('Make some commits first, then use git-undo')}\n`);
      process.exit(0);
    }
    throw error;
  }
}

function parseOperationType(subject) {
  if (subject.includes('commit (amend):')) return 'amend';
  if (subject.includes('commit:') || subject.includes('commit (')) return 'commit';
  if (subject.includes('reset:')) return 'reset';
  if (subject.includes('checkout:')) return 'checkout';
  if (subject.includes('rebase:')) return 'rebase';
  if (subject.includes('merge:')) return 'merge';
  if (subject.includes('pull:')) return 'pull';
  if (subject.includes('cherry-pick:')) return 'cherry-pick';
  return 'other';
}

function getUndoDescription(type) {
  switch (type) {
    case 'commit': return 'Remove commit, keep changes in working tree';
    case 'amend': return 'Revert to state before amend';
    case 'merge': return 'Remove merge, restore previous branch state';
    case 'rebase': return 'Restore to state before rebase';
    case 'reset': return 'Restore to state before reset';
    case 'checkout': return 'Switch back to previous branch/commit';
    case 'pull': return 'Revert pull, restore previous state';
    case 'cherry-pick': return 'Remove cherry-picked commit';
    default: return 'Restore to previous state';
  }
}

async function executeUndo(entry, prevEntry, dryRun) {
  const type = entry.type;
  const targetHash = prevEntry.fullHash;

  if (dryRun) {
    console.log(`\n  ${chalk.cyan('🔍')} ${chalk.bold.cyan('DRY RUN — no changes made')}\n`);
    console.log(`  ${chalk.dim('Would execute:')}`);
    switch (type) {
      case 'commit':
      case 'amend':
        console.log(`  ${chalk.white(`git reset ${targetHash.substring(0, 7)}`)}`);
        console.log(`  ${chalk.dim('Effect: Remove commit, keep changes in working tree')}`);
        break;
      default:
        console.log(`  ${chalk.white(`git reset --hard ${targetHash.substring(0, 7)}`)}`);
        console.log(`  ${chalk.dim(`Effect: ${getUndoDescription(type)}`)}`);
    }
    console.log(`\n  ${chalk.dim('Run without --dry-run to execute')}\n`);
    return;
  }

  try {
    console.log('');
    switch (type) {
      case 'commit':
      case 'amend':
        await execa('git', ['reset', targetHash], { stdio: 'inherit' });
        console.log(`\n  ${chalk.green('✓')} ${chalk.bold.green('Commit undone!')} ${chalk.dim('Changes kept in working tree')}`);
        break;
      
      case 'merge':
        await execa('git', ['reset', '--hard', targetHash], { stdio: 'inherit' });
        console.log(`\n  ${chalk.green('✓')} ${chalk.bold.green('Merge undone!')} ${chalk.dim('Restored to pre-merge state')}`);
        break;
      
      case 'rebase':
        await execa('git', ['reset', '--hard', targetHash], { stdio: 'inherit' });
        console.log(`\n  ${chalk.green('✓')} ${chalk.bold.green('Rebase undone!')} ${chalk.dim('Restored to pre-rebase state')}`);
        break;

      default:
        await execa('git', ['reset', '--hard', targetHash], { stdio: 'inherit' });
        console.log(`\n  ${chalk.green('✓')} ${chalk.bold.green('Restored!')} ${chalk.dim('Back to previous state')}`);
    }

    console.log(`  ${chalk.dim('  Target:')} ${chalk.yellow(prevEntry.hash)} ${chalk.dim(prevEntry.subject)}`);
    console.log(`\n  ${chalk.dim('💡 Tip: Run')} ${chalk.cyan('git-undo')} ${chalk.dim('again to undo this undo!')}\n`);

  } catch (error) {
    console.error(`\n  ${chalk.red('✗')} ${chalk.bold.red('Failed to undo')}`);
    console.error(`  ${chalk.dim(error.message)}\n`);
    process.exit(1);
  }
}

async function undoOperation(entry, prevEntry, options = {}) {
  const type = entry.type;
  
  console.log('');
  console.log(`  ${chalk.cyan('┌')} ${chalk.bold('Operation Details')}`);
  console.log(`  ${chalk.cyan('│')}`);
  console.log(`  ${chalk.cyan('│')}  ${ICONS[type] || ICONS.other}  ${chalk.bold.white(entry.subject)}`);
  console.log(`  ${chalk.cyan('│')}     ${chalk.dim('Type:')}    ${chalk.magenta(type)}`);
  console.log(`  ${chalk.cyan('│')}     ${chalk.dim('Hash:')}    ${chalk.yellow(entry.fullHash)}`);
  console.log(`  ${chalk.cyan('│')}     ${chalk.dim('When:')}    ${entry.relativeTime}`);
  
  if (!prevEntry) {
    console.log(`  ${chalk.cyan('│')}`);
    console.log(`  ${chalk.cyan('└')} ${chalk.red('✗ Cannot undo: this is the first operation')}`);
    console.log(`    ${chalk.dim('There is no previous state to restore to')}\n`);
    return;
  }

  console.log(`  ${chalk.cyan('│')}`);
  console.log(`  ${chalk.cyan('│')}  ${chalk.dim('→')} ${chalk.green('Restore to:')} ${chalk.yellow(prevEntry.hash)} ${chalk.dim(prevEntry.subject)}`);
  console.log(`  ${chalk.cyan('│')}  ${chalk.dim('→')} ${chalk.green('Effect:')}     ${getUndoDescription(type)}`);
  console.log(`  ${chalk.cyan('│')}`);
  console.log(`  ${chalk.cyan('└──')}`);

  if (options.dryRun) {
    return executeUndo(entry, prevEntry, true);
  }

  console.log('');

  const { confirm } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirm',
    message: chalk.bold('Proceed with undo?'),
    default: false,
    prefix: '  ⚡'
  }]);
  
  if (!confirm) {
    console.log(`\n  ${chalk.yellow('⏸')}  ${chalk.dim('Operation cancelled. Nothing changed.')}\n`);
    return;
  }

  return executeUndo(entry, prevEntry, false);
}

async function main(options) {
  console.log(BANNER);
  
  const entries = await getGitReflog();
  
  if (entries.length === 0) {
    console.log(`  ${chalk.yellow('⚠')} ${chalk.dim('No operations found in reflog')}\n`);
    return;
  }

  // --last flag: undo last operation without interactive menu
  if (options.last) {
    console.log(`  ${chalk.dim('Quick mode: undoing last operation')}`);
    const selectedEntry = entries[0];
    const prevEntry = entries[1] || null;
    return undoOperation(selectedEntry, prevEntry, { dryRun: options.dryRun });
  }

  console.log(`  ${chalk.dim(`Found ${entries.length} recent operations:`)}\n`);

  const { selectedIndex } = await inquirer.prompt([{
    type: 'list',
    name: 'selectedIndex',
    message: chalk.bold('Select an operation to undo:'),
    choices: entries.map((entry, idx) => ({
      name: entry.display,
      value: idx
    })),
    pageSize: 12,
    prefix: '  🎯'
  }]);

  const selectedEntry = entries[selectedIndex];
  const prevEntry = entries[selectedIndex + 1] || null;

  await undoOperation(selectedEntry, prevEntry, { dryRun: options.dryRun });
}

program
  .name('git-undo')
  .description('⏪ Ctrl+Z for your git mistakes — interactive CLI to undo git operations')
  .version('1.1.0')
  .option('-l, --last', 'undo the last operation without interactive selection')
  .option('-n, --dry-run', 'preview what would happen without executing')
  .action(main);

program.parse();
