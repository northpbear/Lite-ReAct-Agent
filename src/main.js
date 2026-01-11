import { program } from 'commander';
import inquirer from 'inquirer';
import { relativeToAbsolute } from './utils/paths.js'
import { ReActAgent } from './core/ReActAgent.js';
import { INQUIRER_USER_INPUT_CONFIG } from './configs/index.js';

program
    .version('0.0.1')
    .requiredOption('-p, --project-directory <path>', 'ReAct Agent 将要运行的目录（必填），如 ./src/pages/a')

program.parse(process.argv);

const opts = program.opts();
// node ./src/main.js -p ./src/page-a ---> { projectDirectory: './src/page-a' }

async function main(projectDirectory) {
    console.log('Agent projectDirectory 配置：', projectDirectory);
    const agent = new ReActAgent(projectDirectory);

    const { question } = await inquirer.prompt(INQUIRER_USER_INPUT_CONFIG)
    agent.run(question);
}

main(relativeToAbsolute(opts.projectDirectory))