import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';

/**
 * 读取文件内容的工具
 * 
 * @param {string} filePath 
 */
function readFile(filePath) {
    return readFileSync(filePath, 'utf-8');
}

/**
 * 写入文件内容的工具
 * 
 * @param {string} filePath 
 * @param {string} content 
 */
function writeFile(filePath, content) {
    writeFileSync(filePath, content);
    return '执行成功'
}

/**
 * 执行终端命令的工具
 * 
 * @param {string} filePath 
 */
function runTerminalCommand(command) {
    try {
        // 默认配置：输出为utf8字符串，继承父进程的stdio（可直接打印命令输出）
        const defaultOptions = {
            encoding: 'utf8',
            stdio: 'inherit', // 让命令的输出直接显示在终端
            cwd: process.cwd() // 命令执行的工作目录，默认是当前进程目录
        };

        // 执行命令并返回结果
        execSync(command, defaultOptions);
        return '执行成功';
    } catch (error) {
        console.error(`命令执行失败：${command}`);
        console.error(`错误信息：${error.message}`);
        // 抛出错误让外层处理，或返回null
        return error.message;
    }
}