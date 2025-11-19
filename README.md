# React Native 0.73 Demo 项目

这是一个基于 Expo SDK 50 和 React Native 0.73 的学习项目，用于学习和测试 RN 0.73 的相关 API。

## 快速启动

### 日常开发启动命令

**Android 开发**（已验证）：

1. 连接 Android 设备或启动模拟器
2. 确认设备连接：

   ```bash
   adb devices
   ```

3. 启动应用：

   ```bash
   npm run android
   ```

应用将自动构建并安装到你的 Android 设备上。首次构建需要 5-6 分钟下载依赖，后续构建会更快。

**iOS 开发**（待验证）：

```bash
npm run ios
```

> 注意：iOS 开发仅支持 macOS 系统，需要安装 Xcode 和 CocoaPods。

### 仅启动 Metro Bundler

如果你只想启动开发服务器而不构建应用：

```bash
npm start
```

然后在应用中重新加载即可。

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
