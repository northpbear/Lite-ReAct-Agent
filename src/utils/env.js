import dotenv from 'dotenv';
dotenv.config();

export function getEnv() {
    return {
        ZHIPU_API_KEY: process.env.ZHIPU_API_KEY,
        GLM_MODEL: process.env.GLM_MODEL,
    }
}