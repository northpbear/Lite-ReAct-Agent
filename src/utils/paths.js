import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * 将相对路径转换为绝对路径
 * @param {string} relativePath - 待转换的相对路径（支持空值、绝对路径）
 * @param {string} [baseDir] - 解析的基准目录，默认是当前工作目录(process.cwd())
 *                             传 "__dirname" 可基于当前文件所在目录解析
 * @returns {string} 标准化的绝对路径
 */
export function relativeToAbsolute(relativePath, baseDir = process.cwd()) {
    // 处理空路径/无效路径
    if (!relativePath || typeof relativePath !== 'string') {
        throw new Error('参数错误：relativePath 必须是非空字符串');
    }

    // 特殊处理：如果传入的是 __dirname（ES6 模块中需手动转换）
    let resolvedBaseDir = baseDir;
    if (baseDir === '__dirname') {
        // ES6 模块中没有 __dirname，需通过 import.meta.url 转换
        const __filename = fileURLToPath(import.meta.url);
        resolvedBaseDir = dirname(__filename);
    }

    // 核心：解析为绝对路径（path.resolve 会自动处理相对路径、..、. 等）
    const absolutePath = path.resolve(resolvedBaseDir, relativePath);

    // 标准化路径（统一分隔符、去除多余的 / 或 \）
    return path.normalize(absolutePath);
}