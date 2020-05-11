import chalk from 'chalk';
import program from 'commander';
import pkg from '../package.json';
import { resetStatsAndSkills } from './utils';

program.version(pkg.version);
program.description(pkg.description);
program
  .command('reset [file]')
  .description('Reset stats & skills')
  .action(resetStatsAndSkills);

console.log(
  chalk.magenta(` ___    ___   ___      ___   _      ___ 
|   \\  |_  ) / __|    / __| | |    |_ _|
| |) |  / /  \\__ \\   | (__  | |__   | | 
|___/  /___| |___/    \\___| |____| |___|   v0.1.0
                                          `)
);

program.parse(process.argv);
