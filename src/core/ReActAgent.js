import { ZhipuAI } from 'zhipuai';
import { getEnv } from '../utils/env.js';

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
            { role: 'user', content: userPrompt }
        ];
        this.invokeLLM(msgs)
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