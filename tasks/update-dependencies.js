var shell = require('shelljs');

// Check that git is present
if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

// Get the files that have been modified or null as a fallback
var changedFiles = shell.exec('git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD').grep('yarn.lock').stdout || null;

// Execute the scripts if needed
if(changedFiles !== null) {
  shell.rm('-rf', 'node_modules');
  shell.exec('yarn cache clean');
  shell.exec('yarn');
  shell.echo('\n---------------------------------------\n  The dependencies have been updated  \n---------------------------------------\n');
}
else {
  shell.echo('\n-------------------------------\n  No files have been modified  \n-------------------------------\n');
}
shell.exit(0);