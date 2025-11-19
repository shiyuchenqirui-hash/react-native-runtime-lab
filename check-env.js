#!/usr/bin/env node

/**
 * 环境检查脚本
 * 用于验证 React Native 0.73 开发环境是否正确配置
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 开始检查 React Native 0.73 开发环境...\n');

// 检查项
const checks = [];

// 1. 检查 Node.js 版本
try {
  const nodeVersion = process.version;
  const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
  checks.push({
    name: 'Node.js 版本',
    status: majorVersion >= 18 ? '✅' : '❌',
    message: `${nodeVersion} ${majorVersion >= 18 ? '(符合要求 >= 18)' : '(需要 >= 18)'}`,
  });
} catch (error) {
  checks.push({
    name: 'Node.js 版本',
    status: '❌',
    message: '无法检测',
  });
}

// 2. 检查 JDK 版本
try {
  const javaVersion = execSync('java -version 2>&1', { encoding: 'utf-8' });
  const match = javaVersion.match(/version "(\d+)/);
  const version = match ? match[1] : 'unknown';
  checks.push({
    name: 'JDK 版本',
    status: version === '17' ? '✅' : '⚠️',
    message: `${version} ${version === '17' ? '(推荐)' : '(推荐使用 JDK 17)'}`,
  });
} catch (error) {
  checks.push({
    name: 'JDK 版本',
    status: '❌',
    message: '未安装或未配置到 PATH',
  });
}

// 3. 检查 package.json 中的 React Native 版本
try {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8')
  );
  const rnVersion = packageJson.dependencies['react-native'];
  checks.push({
    name: 'React Native 版本',
    status: rnVersion.includes('0.73') ? '✅' : '⚠️',
    message: rnVersion,
  });
} catch (error) {
  checks.push({
    name: 'React Native 版本',
    status: '❌',
    message: '无法读取 package.json',
  });
}

// 4. 检查 android/gradle.properties 中的 newArchEnabled
try {
  const gradleProps = fs.readFileSync(
    path.join(__dirname, 'android/gradle.properties'),
    'utf-8'
  );
  const newArchEnabled = /newArchEnabled\s*=\s*true/.test(gradleProps);
  checks.push({
    name: 'Android 新架构',
    status: newArchEnabled ? '✅' : '❌',
    message: newArchEnabled ? '已启用' : '未启用 (检查 android/gradle.properties)',
  });
} catch (error) {
  checks.push({
    name: 'Android 新架构',
    status: '❌',
    message: '无法读取 gradle.properties',
  });
}

// 5. 检查 app.json 中的 newArchEnabled
try {
  const appJson = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'app.json'), 'utf-8')
  );
  const newArchEnabled = appJson.expo.newArchEnabled === true;
  checks.push({
    name: 'Expo 新架构配置',
    status: newArchEnabled ? '✅' : '❌',
    message: newArchEnabled ? '已启用' : '未启用 (检查 app.json)',
  });
} catch (error) {
  checks.push({
    name: 'Expo 新架构配置',
    status: '❌',
    message: '无法读取 app.json',
  });
}

// 6. 检查 Hermes 是否启用
try {
  const gradleProps = fs.readFileSync(
    path.join(__dirname, 'android/gradle.properties'),
    'utf-8'
  );
  const hermesEnabled = /hermesEnabled\s*=\s*true/.test(gradleProps);
  checks.push({
    name: 'Hermes 引擎',
    status: hermesEnabled ? '✅' : '⚠️',
    message: hermesEnabled ? '已启用' : '未启用 (推荐启用)',
  });
} catch (error) {
  checks.push({
    name: 'Hermes 引擎',
    status: '❌',
    message: '无法检测',
  });
}

// 7. 检查 node_modules 是否存在
const nodeModulesExists = fs.existsSync(path.join(__dirname, 'node_modules'));
checks.push({
  name: '依赖安装',
  status: nodeModulesExists ? '✅' : '❌',
  message: nodeModulesExists ? '已安装' : '请运行 npm install',
});

// 8. 检查 Android SDK (可选)
try {
  const androidHome = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
  if (androidHome && fs.existsSync(androidHome)) {
    checks.push({
      name: 'Android SDK',
      status: '✅',
      message: `已配置: ${androidHome}`,
    });
  } else {
    checks.push({
      name: 'Android SDK',
      status: '⚠️',
      message: '未配置 ANDROID_HOME 环境变量',
    });
  }
} catch (error) {
  checks.push({
    name: 'Android SDK',
    status: '⚠️',
    message: '无法检测',
  });
}

// 输出结果
console.log('检查结果:\n');
checks.forEach((check) => {
  console.log(`${check.status} ${check.name}: ${check.message}`);
});

// 总结
const allPassed = checks.every((check) => check.status === '✅');
const criticalPassed = checks
  .filter((c) => ['Node.js 版本', 'React Native 版本', 'Android 新架构', '依赖安装'].includes(c.name))
  .every((check) => check.status === '✅');

console.log('\n' + '='.repeat(60));
if (allPassed) {
  console.log('✅ 所有检查通过！环境配置完美！');
} else if (criticalPassed) {
  console.log('✅ 关键配置已完成，可以开始开发！');
  console.log('⚠️  部分可选配置需要注意。');
} else {
  console.log('❌ 存在关键配置问题，请检查上述失败项。');
}
console.log('='.repeat(60) + '\n');

// 提供下一步建议
console.log('下一步操作:');
if (!nodeModulesExists) {
  console.log('  1. 运行 npm install 安装依赖');
}
console.log('  2. 运行 npm start 启动开发服务器');
console.log('  3. 运行 npm run android 或 npm run ios 启动应用');
console.log('\n查看 README.md 获取更多信息。\n');
