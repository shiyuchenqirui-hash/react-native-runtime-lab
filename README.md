# React Native Runtime Lab

基于 React Native 0.73.6、React 18.2.0、Expo SDK 50 的个人实验：练习启动原生应用、读取运行时特征、区分“配置希望启用”和“设备实际启用”。

历史代码始于 2025-11-19；本轮于 2026-10-05 整理。不把旧版练习包装成当前版本最佳实践，也不把几个全局变量检测包装成 Fabric / TurboModule 完整实现或性能研究。

## 当前做了什么

- [App.js](App.js)：展示平台、固定版本文案，以及 Fabric / TurboModule / Bridgeless 的启发式信号。
- [examples/NewArchitectureExample.js](examples/NewArchitectureExample.js)：主题与计数器示例，**当前未被 App.js 引入**。
- [app.json](app.json)：配置 `newArchEnabled: true`，原生目录由 Expo 生成，未纳入当前工作树。
- [实验索引](docs/README.md)：复现入口、局限、本次验证及下一步。

## 安装与运行

本轮依赖/JS 导出使用 macOS、Node 22.23.2；锁定安装得到 Expo 50.0.21。本轮没有复验原生工具链。

```sh
npm ci
npm start
```

运行原生应用需要对应工具链和设备/模拟器：

```sh
npm run android
# 或在 macOS + Xcode 环境下
npm run ios
```

首次运行可能生成 android/ios 工程、下载 SDK/Pods 并安装应用。停止 Metro 用终端 Ctrl+C；不要默认运行 `start-dev.sh`，它会强制杀掉占用 8081 的进程。

研究架构时使用与项目配置匹配的原生构建，不用“能在 Expo Go 中打开”证明本项目原生配置生效。当前没有安装 Web 所需依赖，本轮不把 `npm run web` 列为可用入口。

## 本次真实验证

2026-10-05：

- 依赖按锁文件安装成功。
- Expo 配置解析成功。
- Android **JavaScript/Hermes bundle 导出**成功。
- iOS/Android 原生编译、设备运行、架构信号及性能：本轮未验证。

```sh
npx --no-install expo config --type public
npx --no-install expo export --platform android --output-dir dist
```

JS 导出不是 APK 构建；配置字段存在也不是运行时启用证明。

## 已知局限

两份示例的 Bridgeless 判断不一致；未接入示例甚至仅用 Fabric 信号判断 Bridgeless。UI 中“已启用”等文字属于旧示例的判断输出，不能当成平台认证。环境检查脚本也依赖尚未生成的 android/gradle.properties，不是干净 checkout 的通过标准。

旧“完成报告”和环境记录保留在 [历史资料](docs/archive/README.md)，其中“已验证”“全部完成”只代表原文声明，没有随附的完整证据，不作为本次结果。具体边界见 [运行时实验记录](docs/implementation/impl_runtime_observation.md)。

## 后续维护

一次只验证一个信号或生命周期问题，记录设备、构建模式、依赖版本、操作和结果。不编造性能提升，不为展示扩成功能产品。依赖是历史基线，本轮未升级或完成漏洞审计。
