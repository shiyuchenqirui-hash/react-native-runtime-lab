# 实验索引

> 类型：implementation
> 状态：持续学习；验证范围见正文
> 作者：chenshiyu
> 创建日期：2026-10-05
> 最后更新：2026-10-05

## TL;DR

本项目当前是环境搭建与运行时观察起点，没有已完成的架构性能对照实验。

| 编号 | 问题 | 入口 | 当前状态 |
| --- | --- | --- | --- |
| RN-01 | 配置能否解析、JS 能否打包？ | package.json / app.json / index.js | 2026-10-05 配置与 Android bundle 导出通过 |
| RN-02 | 设备上哪些运行时信号存在？ | App.js | 有探针代码；原生设备复验待做 |
| RN-03 | 主题与计数器如何工作？ | examples/NewArchitectureExample.js | 代码未接入入口；未复验 |
| RN-04 | 原生工具链如何恢复？ | check-env.js / 历史排错文档 | 有历史脚本与声明；当前工具链待复验 |

- [运行时实验记录](implementation/impl_runtime_observation.md)
- [历史资料](archive/README.md)

计划验证与已经完成分开记录；不要仅凭目录名 NewArchitectureExample 宣称实现了原生模块或新的渲染器。
