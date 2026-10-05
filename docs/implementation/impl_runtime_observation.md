# 运行时观察与验证边界

> 类型：implementation
> 状态：持续学习；验证范围见正文
> 作者：chenshiyu
> 创建日期：2026-10-05
> 最后更新：2026-10-05

## TL;DR

当前代码是架构信号观察器，不是架构实现。必须把应用配置、生成的原生配置、JS 探针、实际设备行为和性能测量分开。

## 基线与历史

代码基线 `18f0752`，RN 0.73.6 / React 18.2.0 / Expo 50.0.21（SDK 50）。`594ed1f` 初始化于 2025-11-19，随后有 Android、iOS 配置提交，`18f0752` 修改 Bridgeless 判断。提交标题只证明发生过修改，不证明设备验证成功。

2026-10-05 整理基线未升级依赖；应用原生标识符保持原值，以免文档整理改变安装身份。

## 入口与边界

| 层级 | 代码依据 | 能说明什么 | 不能说明什么 |
| --- | --- | --- | --- |
| 配置 | app.json 的 newArchEnabled | 项目表达启用意图 | 原生项目已重新生成、设备已启用 |
| 启动 | index.js 注册 App | 实际首页来自 App.js | examples 目录会自动运行 |
| Fabric 信号 | global.nativeFabricUIManager | 该内部全局是否存在 | 任何场景必然更快 |
| TurboModule 信号 | global.__turboModuleProxy | 该内部代理是否存在 | 所有模块都完成迁移，或不存在就绝无 TurboModule |
| Bridgeless 信号 | App.js 检查 Bridge 缺失且 Fabric 存在 | 作者当时采用的启发式判据 | 跨版本可靠检测 |
| 示例计数器 | TouchableOpacity + useState | 点击会更新状态的代码路径 | 新架构性能提升 |

`examples/NewArchitectureExample.js` 只检查 Fabric 就标 Bridgeless，与 App.js 不一致。**推断**：它会把部分非 Bridgeless 环境误标为已启用。当前保留问题用于后续受控实验，不把原文结论复制到 README。

## 复现顺序

1. 按根目录 README 安装依赖并解析配置，记录实际版本。
2. 使用匹配的 Xcode 或 Android SDK 构建应用；记录设备型号、OS、Debug/Release、Hermes、是否改过原生配置。
3. 查看首页三个信号，记录原值、屏幕输出及原生构建依据，不只抄“已启用”。
4. 若要试主题/计数器，临时在 index.js 将 App 导入切到 `./examples/NewArchitectureExample`，重载观察，结束后恢复导入。这个操作尚未在本轮执行。
5. 做架构开关对照必须重新生成/构建相应原生应用；只刷新 JavaScript 不足以证明架构已切换。

本轮不执行自动 `prebuild --clean`，避免覆盖原生工程；也不执行会抢占端口的 start-dev.sh。

## 本次验证记录

2026-10-05 / macOS / Node 22.23.2：

| 命令或操作 | 结果 |
| --- | --- |
| npm ci --ignore-scripts --no-audit --no-fund | 成功，1128 个包；存在历史依赖弃用警告 |
| npx --no-install expo config --type public | 退出码 0，SDK 50、配置 newArchEnabled 为 true |
| npx --no-install expo export --platform android --output-dir dist-study-check | 退出码 0，导出 1 个约 1.47MB Hermes bundle 和 metadata |
| 原生构建 / 真机 / 模拟器 / 性能基准 | 本轮未执行 |
| 依赖漏洞审计 | 本轮未执行 |

导出日志有 baseline-browser-mapping 数据过期提示与终端颜色提示，未导致失败；没有因此升级锁文件。临时 dist-study-check 产物在核对后清理。

## 下一次只做一件事

选一个实际设备，建立“配置 → 生成原生配置 → 设备探针值”的记录，再决定是否改进探针。不要先补虚拟列表、登录或商城功能。

## 官方资料

- [Expo SDK 50 发布说明](https://expo.dev/changelog/2024-01-18-sdk-50)：了解这份历史基线。
- [React Native 架构概览](https://reactnative.dev/architecture/landing-page)：用于概念阅读，当前文档不等于 0.73 的全部实现。
- [RN 0.74 发布说明](https://reactnative.dev/blog/2024/04/22/release-0.74)：Bridgeless 默认启用的说明有“启用新架构”这一前提，不能简化成所有 0.74 应用都默认启用。
