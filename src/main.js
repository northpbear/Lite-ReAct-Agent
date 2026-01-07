import { program } from 'commander';
import { relativeToAbsolute } from './utils/paths.js'

program
    .version('0.0.1')
    .requiredOption('-p, --project-directory <path>', 'ReAct Agent 将要运行的目录（必填），如 ./src/pages/a')

program.parse(process.argv);

const opts = program.opts();
// node ./src/main.js -p ./src/page-a ---> { projectDirectory: './src/page-a' }

function main(projectDirectory) {
    console.log('Agent projectDirectory 配置：', projectDirectory);

}

main(relativeToAbsolute(opts.projectDirectory))