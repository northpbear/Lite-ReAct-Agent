import dotenv from 'dotenv';
dotenv.config();

export function getEnv() {
    return {
        ZHIPU_API_KEY: process.env.ZHIPU_API_KEY,
        GLM_MODEL: process.env.GLM_MODEL,
    }
}

export function getSystemInfo() {
    const nodeVersion = process.version; // Node.js 版本
    const v8Version = process.versions.v8; // V8 引擎版本
    const platform = process.platform; // 操作系统
    const arch = process.arch; // CPU 架构

    // 2. 优化系统名称显示（让输出更友好）
    const platformName = {
        'darwin': 'macOS',
        'win32': 'Windows',
        'linux': 'Linux',
        'freebsd': 'FreeBSD'
    }[platform] || platform;

    return {
        nodeVersion,
        v8Version,
        arch,
        platformName
    }
}