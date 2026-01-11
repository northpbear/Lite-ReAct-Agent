import { ZhipuAI } from 'zhipuai';
import { getEnv, getSystemInfo as _getSystemInfo } from '../utils/env.js';
import { getReActAgentSystemPrompt } from '../configs/index.js';
import path from 'path';
import fs from 'fs';

export class ReActAgent {
    constructor(projectDir) {
        const env = getEnv()
        this.projectDir = projectDir;
        // TODO 暂时先只支持智谱，后续增加其他模型支持
        this.model = env.GLM_MODEL;
        this.client = new ZhipuAI({
            apiKey: env.ZHIPU_API_KEY,
        });
    }

    run = (userPrompt) => {
        const msgs = [
            {
                role: 'system', content: this.genSystemPrompt()
            },
            { role: 'user', content: userPrompt }
        ];
        this.invokeLLM(msgs)
    }

    genSystemPrompt = () => {
        const getFilesSync = (dirPath) => {
            try {
                const absoluteDir = path.resolve(dirPath);
                const dirContents = fs.readdirSync(absoluteDir);

                // 筛选出仅文件（排除子目录）
                const files = dirContents.filter(item => {
                    const itemPath = path.join(absoluteDir, item);
                    // 获取文件状态，判断是否为文件
                    return fs.statSync(itemPath).isFile();
                });

                console.log(`✅ 成功获取目录 [${absoluteDir}] 下的文件：`);
                console.log(files);
                return files;
            } catch (err) {
                console.error('❌ 获取文件失败：', err.message);
                return [];
            }
        }

        const getSystemInfo = () => {
            const { nodeVersion, v8Version, arch, platformName } = _getSystemInfo()
            return `当前运行环境为 ${platformName} (${arch}) 系统，Node.js 版本 ${nodeVersion}，V8 引擎版本 ${v8Version}。`;
        }


        return getReActAgentSystemPrompt({
            tools: [],
            system: getSystemInfo(),
            fileList: getFilesSync(this.projectDir)
        })
    }

    invokeLLM = async (messages) => {
        console.log('开始请求大模型');
        const resp = await this.client.chat.completions.create({
            messages,
            model: this.model
        })
        console.log('大模型返回：', JSON.stringify(resp));
    }


}