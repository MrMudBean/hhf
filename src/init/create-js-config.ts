import { writeFileSync } from 'node:fs';
import { configFileStartName } from '../aided/config-file-start-name';

/**
 *  构建 js 配置文件
 * @param cwd
 */
export function createJsConfigFile(cwd: string) {
  const data = `/**  请勿在函数体外添加非注释内容  */
// 配置项 https://earthnut.dev/npm/hhf/
export default ({
  // 监听文件的相对路径（这里不影响 \`cwd\` 路径， cwd 依旧相对于配置文件目录 ）
  "base": "../",
  // 监听的文件/夹，但他们内部文件变化，可触发再次启动
  "watch": ["${cwd}"],
  // 打包编译文件，不监听以下文件内文件变化
  "skip": ["dist", ".eg"],
  // 启动 \`code\` 的相对目录，可以为空
  // "cwd": ".",
  // 执行的具体的命令
  "code": "node  ./index.js",
  // 启动时赋予 \`code\` 的参数
  "args": ["-v"],
  // 监听变化后，相对目录在再次启动前执行的命令
  // 这个属性应与 \`watch\` 元素相同
  "beforeRestart": {
      "${cwd}": "npm  run build"
  }
})`;
  writeFileSync(configFileStartName + 'js', data, {
    encoding: 'utf-8',
    flag: 'w',
  });
}
