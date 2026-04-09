#!/usr/bin/env node

const { program } = require('commander');
const execa = require('execa');
const inquirer = require('inquirer');
const chalk = require('chalk');

async function getGitReflog() {
  try {
    const { stdout } = await execa('git', ['reflog', '--format=%H|%gD|%gs|%cr', '-20']);
    const entries = stdout.split('\n').filter(line => line.trim()).map(line => {
      const [hash, ref, subject, relativeTime] = line.split('|');
      return {
        hash: hash.substring(0, 7),
        fullHash: hash,
        ref,
        subject,
        relativeTime,
        display: `${chalk.yellow(hash.substring(0, 7))} ${chalk.dim(relativeTime)} - ${subject}`
      };
    });
    return entries;
  } catch (error) {
    if (error.message.includes('not a git repository')) {
      console.error(chalk.red('Error: Not in a git repository'));
      process.exit(1);
    }
    throw error;
  }
}

function parseOperationType(subject) {
  if (subject.includes('commit:') || subject.includes('commit (')) return 'commit';
  if (subject.includes('reset:')) return 'reset';
  if (subject.includes('checkout:')) return 'checkout';
  if (subject.includes('rebase:')) return 'rebase';
  if (subject.includes('merge:')) return 'merge';
  if (subject.includes('pull:')) return 'pull';
  if (subject.includes('cherry-pick:')) return 'cherry-pick';
  if (subject.includes('commit (amend):')) return 'amend';
  return 'other';
}

async function undoOperation(entry, prevEntry) {
  const operationType = parseOperationType(entry.subject);
  
  console.log(chalk.blue(`\n📝 Operation: ${entry.subject}`));
  console.log(chalk.dim(`   Type: ${operationType}`));
  console.log(chalk.dim(`   Hash: ${entry.fullHash}`));
  
  if (!prevEntry) {
    console.log(chalk.red('✗ Cannot undo: this is the first operation in the repository'));
    return;
  }

  console.log(chalk.dim(`   Will restore to: ${prevEntry.hash} (${prevEntry.subject})`));

  const { confirm } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirm',
    message: `Are you sure you want to undo this operation?`,
    default: false
  }]);
  
  if (!confirm) {
    console.log(chalk.yellow('Cancelled'));
    return;
  }

  try {
    const targetHash = prevEntry.fullHash;

    switch (operationType) {
      case 'commit':
      case 'amend':
        // Use previous reflog state instead of HEAD~1 for safety
        await execa('git', ['reset', targetHash], { stdio: 'inherit' });
        console.log(chalk.green('✓ Commit undone (changes kept in working tree)'));
        break;
      
      case 'merge':
        await execa('git', ['reset', '--hard', targetHash], { stdio: 'inherit' });
        console.log(chalk.green('✓ Merge undone'));
        break;
      
      case 'rebase':
        await execa('git', ['reset', '--hard', targetHash], { stdio: 'inherit' });
        console.log(chalk.green('✓ Restored to before rebase'));
        break;

      default:
        await execa('git', ['reset', '--hard', targetHash], { stdio: 'inherit' });
        console.log(chalk.green('✓ Restored to previous state'));
    }
  } catch (error) {
    console.error(chalk.red(`✗ Failed to undo: ${error.message}`));
    process.exit(1);
  }
}

async function main() {
  console.log(chalk.bold.cyan('\n🔄 git-undo - Interactive Git Undo Tool\n'));
  
  const entries = await getGitReflog();
  
  if (entries.length === 0) {
    console.log(chalk.yellow('No git operations found in reflog'));
    return;
  }

  const { selectedIndex } = await inquirer.prompt([{
    type: 'list',
    name: 'selectedIndex',
    message: 'Select an operation to undo:',
    choices: entries.map((entry, idx) => ({
      name: entry.display,
      value: idx
    })),
    pageSize: 15
  }]);

  const selectedEntry = entries[selectedIndex];
  const prevEntry = entries[selectedIndex + 1] || null;

  await undoOperation(selectedEntry, prevEntry);
}

program
  .name('git-undo')
  .description('Interactive tool to undo git operations')
  .version('1.0.0')
  .action(main);

program.parse();
