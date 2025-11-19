# React Native 0.73 Demo 项目

这是一个基于 Expo SDK 50 和 React Native 0.73 的学习项目，用于学习和测试 RN 0.73 的相关 API。

## 快速启动

### 日常开发启动命令

**Android 开发**（已验证）：

**首次运行**：

1. 连接 Android 设备或启动模拟器
2. 确认设备连接：

   ```bash
   adb devices
   ```

3. 启动应用：

   ```bash
   npm run android
   ```

应用将自动构建并安装到你的 Android 设备上。首次构建需要 5-6 分钟下载依赖。

**日常开发**：

- ✅ 启动 Metro: `./start-dev.sh`（推荐，自动设置端口转发）或 `npm start`
- ✅ 修改 JavaScript/TypeScript 代码，保存后自动刷新
- ❌ **不需要**每次都运行 `npm run android`
- ✅ 仅在安装原生依赖或修改原生代码时需要重新构建

**Android 真机无法连接 Metro？**

如果应用显示 "Cannot connect to Metro"：

```bash
# 设置端口转发（让真机能访问电脑的 Metro 服务器）
adb reverse tcp:8081 tcp:8081

# 然后在设备上重新加载应用
# 方法 1: 摇晃设备
# 方法 2: 连续按两次 R 键（RR）
```

> 💡 提示：使用 `./start-dev.sh` 会自动设置端口转发！

---

**iOS 开发**（已验证 - 需要首次 Xcode 配置）：

**首次运行** - 需要在 Xcode 中打开项目进行初始化配置：

1. 在 Xcode 中打开项目：

   ```bash
   open ios/rn073demo.xcworkspace
   ```

2. 在 Xcode 中：
   - 等待项目加载完成（索引完成）
   - 点击顶部工具栏的设备选择器（在 ▶️ 按钮右侧）
   - 选择你想要的模拟器：
     - iPhone 16 Pro / 16 Pro Max
     - iPhone SE (3rd generation)
     - iPad Pro 等
   - 点击运行按钮 ▶️ 或按 `Cmd + R`

3. **日常开发**：
   - ✅ 启动 Metro: `./start-dev.sh` 或 `npm start`
   - ✅ 修改 JavaScript 代码，保存后自动刷新
   - ❌ 命令行构建 (`npm run ios`) 在 Xcode 26 上可能失败
   - ✅ 切换设备时，重新打开 Xcode 选择新设备并运行

> **注意**：
>
> - iOS 开发仅支持 macOS 系统
> - 需要安装 Xcode 14+ 和 CocoaPods 1.12+
> - 首次构建需要在 Xcode GUI 中进行项目配置（这是 Xcode 26+ 的已知问题）
> - 如遇到 UTF-8 编码错误，运行命令前先执行：
>
>   ```bash
>   export LANG=en_US.UTF-8 && export LC_ALL=en_US.UTF-8
>   ```

### 日常开发总结（Android 和 iOS）

**重要提示**：对于 RN 开发者，修改 JavaScript/TypeScript 代码**不需要**重新构建！

| 操作 | Android | iOS | 频率 |
|------|---------|-----|------|
| 修改 JS/TS 代码 | ✅ 自动刷新 | ✅ 自动刷新 | 每天 100+ 次 |
| 修改样式 | ✅ 自动刷新 | ✅ 自动刷新 | 每天 50+ 次 |
| 首次运行 | `npm run android` | Xcode GUI 运行 | 一次 |
| 安装原生依赖 | `npm run android` | Xcode GUI 运行 | 偶尔 |
| 修改原生代码 | `npm run android` | Xcode GUI 运行 | 很少 |

**日常开发只需要**：

```bash
# 1. 启动 Metro 服务器（一次，保持运行）
./start-dev.sh  # 自动清理端口

# 2. 编辑代码，保存
# 3. 应用自动刷新 ✅

# 无需重新构建！
```

### iOS 日常开发指南（针对 RN 开发者）

**适用场景**：主要编写 JavaScript/TypeScript 代码，很少修改原生代码。

#### 日常开发流程

```bash
# 1. 启动 Metro 服务器（保持运行）
npm start

# 2. 修改 JavaScript 代码（App.js、组件、样式等）
# 3. 保存后应用自动刷新 ✅
# 无需重新编译或打开 Xcode！
```

#### 切换 iPhone 模拟器型号

当需要在不同设备上测试时：

1. **打开 Xcode 项目**：

   ```bash
   open ios/rn073demo.xcworkspace
   ```

2. **找到设备选择器**：
   - 在 Xcode **主窗口**顶部工具栏（不是设置界面）
   - 位置：`[▶ 按钮] [项目名] [设备名 ▼]`
   - 点击设备名称旁的下拉箭头

3. **选择设备**：
   - iPhone SE (3rd generation)
   - iPhone 16 / 16 Plus / 16 Pro / 16 Pro Max
   - iPad Pro 等

4. **运行**：按 `Cmd + R` 或点击 ▶️ 按钮

5. **关闭 Xcode**：应用启动后可以关闭 Xcode，继续编写 JS 代码

#### 何时需要重新用 Xcode 构建

仅在以下情况：

- ❗ 首次运行项目
- ❗ 切换到不同的 iPhone/iPad 型号
- ❗ 安装了包含原生代码的 npm 包（并运行了 `pod install`）

#### 故障排除

**端口 8081 被占用**：

```bash
# 清理端口
lsof -ti:8081 | xargs kill -9

# 重新启动 Metro
npm start
```

**清理缓存**：

```bash
# 清理 Metro 缓存
npm start -- --reset-cache
```

## 项目配置

### 版本信息

- **React Native**: 0.73.6
- **Expo SDK**: ~50.0.0
- **React**: 18.2.0
- **Node.js**: 18.17.1（推荐使用 Node.js 18+）
- **JDK**: 17（必需）

### 新架构特性

本项目已启用 React Native 的新架构，包括：

1. **Fabric 渲染器** - 新的 UI 渲染系统
2. **TurboModule** - 更高效的原生模块系统
3. **Bridgeless 模式** - 移除旧的 Bridge，提升性能

#### 配置位置

**Android 配置**：

- `android/gradle.properties` 中设置 `newArchEnabled=true`
- `hermesEnabled=true` 已启用 Hermes 引擎

**iOS 配置**：

- `app.json` 中设置 `"newArchEnabled": true`
- Podfile 会自动配置新架构支持

## 环境要求

### 必需软件

1. **Node.js** >= 18.x

   ```bash
   node --version
   ```

2. **JDK 17**

   ```bash
   java -version
   ```

3. **Android Studio** (用于 Android 开发)
   - Android SDK Platform 33+
   - Android SDK Build-Tools
   - Android Emulator

4. **Xcode** (用于 iOS 开发，仅 macOS)
   - Xcode 14+
   - CocoaPods

### 可选软件

- **Watchman** - 提升开发性能

  ```bash
  brew install watchman
  ```

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 运行项目

#### 启动开发服务器

```bash
npm start
```

#### Android

```bash
npm run android
```

#### iOS (仅 macOS)

```bash
npm run ios
```

#### Web

```bash
npm run web
```

## 验证新架构

运行应用后，主屏幕会显示以下信息：

- ✅ Fabric 渲染器状态
- ✅ TurboModule 状态
- ✅ Bridgeless 模式状态

如果所有特性都显示为"已启用"，说明新架构配置成功！

## 项目结构

```
rn073demo/
├── android/                 # Android 原生代码
│   └── gradle.properties   # 新架构配置位置
├── ios/                     # iOS 原生代码
│   └── Podfile             # CocoaPods 配置
├── assets/                  # 静态资源
├── App.js                   # 主应用组件
├── app.json                 # Expo 配置
├── index.js                 # 应用入口
└── package.json            # 项目依赖

```

## 常见问题

### Q: 如何确认新架构是否启用？

A: 运行应用后，检查主屏幕显示的状态。也可以在代码中检查：

```javascript
const isNewArchEnabled = global.nativeFabricUIManager != null;
const isTurboModuleEnabled = global.__turboModuleProxy != null;
```

### Q: Android 构建失败怎么办？

A: 确保：

1. JDK 版本为 17
2. `android/gradle.properties` 中 `newArchEnabled=true`
3. 删除 `android/build` 文件夹后重新构建

### Q: iOS CocoaPods 安装失败？

A: 尝试以下步骤：

```bash
cd ios
pod deintegrate
pod install
cd ..
```

### Q: 如何禁用新架构？

A: 将 `android/gradle.properties` 中的 `newArchEnabled=false`，并在 `app.json` 中移除 `"newArchEnabled": true`

## 学习资源

- [React Native 官方文档](https://reactnative.dev/)
- [Expo 官方文档](https://docs.expo.dev/)
- [React Native 新架构介绍](https://reactnative.dev/docs/the-new-architecture/landing-page)
- [Fabric 渲染器](https://reactnative.dev/architecture/fabric-renderer)
- [TurboModule 系统](https://reactnative.dev/architecture/turbo-module)

## 开发建议

1. **学习新架构 API**
   - 研究 Fabric 组件的实现
   - 了解 TurboModule 的使用方法
   - 体验 Bridgeless 带来的性能提升

2. **性能测试**
   - 对比新旧架构的性能差异
   - 使用 React DevTools 进行性能分析

3. **原生模块开发**
   - 尝试创建自定义 TurboModule
   - 学习 Fabric 组件的开发

## 注意事项

⚠️ **重要提示**：

- 新架构仍在不断完善中，部分第三方库可能不兼容
- 建议在学习环境使用，生产环境需充分测试
- RN 0.73 是相对稳定的版本，但新架构特性可能有变化

## License

MIT
