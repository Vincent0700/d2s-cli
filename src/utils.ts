import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import walkdir from 'walkdir';
import inquirer from 'inquirer';

const CHECKSUM_POS = 12;
const RESET_STATS_POS = 427;

const DEFAULT_SAVE_DIR = '/Applications/Diablo II/Save';

/**
 * Log info
 * @param {String} msg Log message
 */
function _log(msg: string): void {
  console.log(chalk.greenBright('[D2S]'), msg);
}

/**
 * Log wran
 * @param {String} msg Log message
 */
_log.warn = function(msg: string): void {
  console.log(chalk.yellowBright('[D2S][WRAN]'), msg);
};

/**
 * Log error
 * @param {String} msg Log message
 */
_log.error = function(msg: string): void {
  console.log(chalk.redBright('[D2S][ERROR]'), msg);
};

/**
 * Select d2s file from default save dir.
 * @param {Buffer} buffer
 */
async function selectD2sFile(): Promise<string> {
  if (!fs.existsSync(DEFAULT_SAVE_DIR)) {
    // save folder not exists
    _log.error(`Cannot find saves from "${DEFAULT_SAVE_DIR}"`);
    process.exit(0);
  } else {
    const files = walkdir
      .sync(DEFAULT_SAVE_DIR)
      .filter((file) => path.extname(file).toLowerCase() === '.d2s');

    if (!files || !files.length) {
      // no d2s file found
      _log.error(`Cannot find any d2s file from "${DEFAULT_SAVE_DIR}"`);
      process.exit(0);
    }

    const { result } = await inquirer.prompt([
      {
        type: 'list',
        message: 'Select your hero',
        name: 'result',
        choices: [
          ...files.map((item) => ({
            name: path.basename(item).slice(0, path.basename(item).length - 4),
            value: item
          }))
        ]
      }
    ]);
    console.log();
    return result;
  }
}

/**
 * Calculate & write checksome to buffer.
 * @param {Buffer} buffer
 */
export function setChecksome(buffer: Buffer): void {
  buffer.writeUInt32BE(0, CHECKSUM_POS);
  let checksum = 0;
  for (let i = 0; i < buffer.length; ++i) {
    checksum = (checksum << 1) + buffer.readUInt8(i) + Number(checksum < 0);
  }
  buffer.writeInt32LE(checksum, CHECKSUM_POS);
}

/**
 * Re-enables the ability to reset stat and skill points through Akara in normal Act 1.
 * Make sure you've completed the Den of Evil first.
 * @param {Buffer} buffer
 */
export async function resetStatsAndSkills(filePath: string): Promise<void> {
  if (!filePath) {
    filePath = await selectD2sFile();
  }
  const buffer = fs.readFileSync(filePath);
  const isReset = buffer.readUInt8(RESET_STATS_POS) === 0x2;

  if (isReset) {
    _log(`No need to reset.`);
    _log.warn(`You can reset stats & skill points through Akara in normal Act 1.`);
    _log.warn(`Make sure you've completed the Den of Evil first.`);
    process.exit(0);
  } else {
    buffer.writeUInt8(0x2, RESET_STATS_POS);
    setChecksome(buffer);
    fs.writeFileSync(filePath, buffer);
    _log(`Done.`);
    _log.warn(`You can reset stats & skill points through Akara in normal Act 1.`);
    _log.warn(`Make sure you've completed the Den of Evil first.`);
  }
}
