# iOS 开发故障排除指南

> 历史资料：原文声明未经本轮逐项复验；不作为当前运行或性能保证。当前入口见 [项目 README](../../README.md)。归档整理：2026-10-05。

## 环境信息

**已验证环境**：
- ✅ macOS 24.6.0 (Darwin)
- ✅ Xcode 26.0.1 (Build 17A400)
- ✅ CocoaPods 1.12.1
- ✅ Ruby 2.7.6 (rbenv)
- ✅ Node.js 18.17.1

## 当前已知问题

### 问题 1: 命令行构建失败 - "Unable to find a destination"

**错误信息**：
```
xcodebuild: error: Unable to find a destination matching the provided destination specifier
Ineligible destinations for the "rn073demo" scheme:
{ platform:iOS, error:iOS 26.0 is not installed }
```

**原因**：
- Xcode 26 (Xcode 16) 与 React Native 0.73 的命令行构建存在兼容性问题
- 项目首次需要在 Xcode GUI 中进行初始化配置

**解决方案** ✅：

**方法 1：在 Xcode GUI 中首次构建（推荐）**

1. 打开项目：
   ```bash
   open ios/rn073demo.xcworkspace
   ```

2. 在 Xcode 中：
   - 等待索引完成（Xcode 顶部进度条）
   - 点击顶部工具栏的设备选择器
   - 选择一个模拟器（如 "iPhone 16 Pro" 或 "iPhone SE (3rd generation)"）
   - 点击运行按钮 ▶️ 或按 `Cmd + R`

3. 等待构建完成（首次构建约 3-5 分钟）

4. 构建成功后，后续可以使用命令行：
   ```bash
   npm run ios
   ```

**方法 2：使用启动脚本**

```bash
./run-ios.sh
```

如果失败，脚本会提示你在 Xcode 中打开项目。

---

### 问题 2: UTF-8 编码错误

**错误信息**：
```
WARNING: CocoaPods requires your terminal to be using UTF-8 encoding
Unicode Normalization not appropriate for ASCII-8BIT
```

**解决方案** ✅：

在运行命令前设置环境变量：

```bash
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
```

**永久解决**（添加到 shell 配置文件）：

```bash
# 对于 zsh (macOS 默认)
echo 'export LANG=en_US.UTF-8' >> ~/.zshrc
echo 'export LC_ALL=en_US.UTF-8' >> ~/.zshrc
source ~/.zshrc

# 对于 bash
echo 'export LANG=en_US.UTF-8' >> ~/.bash_profile
echo 'export LC_ALL=en_US.UTF-8' >> ~/.bash_profile
source ~/.bash_profile
```

---

### 问题 3: pod install 失败

**解决方案**：

```bash
cd ios
rm -rf Pods Podfile.lock
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
pod install
cd ..
```

---

### 问题 4: 模拟器无法启动或找不到

**检查可用模拟器**：
```bash
xcrun simctl list devices | grep -E "iPhone|iPad"
```

**启动特定模拟器**：
```bash
xcrun simctl boot "iPhone 16 Pro"
```

**打开模拟器应用**：
```bash
open -a Simulator
```

---

## 完整的 iOS 开发流程

### 首次设置（一次性）

1. **安装 Xcode**（如未安装）：
   - 从 App Store 安装 Xcode
   - 打开 Xcode 并安装额外组件
   - 接受许可协议：
     ```bash
     sudo xcodebuild -license accept
     ```

2. **安装 Command Line Tools**：
   ```bash
   xcode-select --install
   ```

3. **安装 CocoaPods**（如未安装）：
   ```bash
   sudo gem install cocoapods
   ```

4. **设置 UTF-8 编码**：
   ```bash
   echo 'export LANG=en_US.UTF-8' >> ~/.zshrc
   echo 'export LC_ALL=en_US.UTF-8' >> ~/.zshrc
   source ~/.zshrc
   ```

5. **安装项目依赖**：
   ```bash
   cd ios
   pod install
   cd ..
   ```

### 首次运行

**在 Xcode 中运行**（必需）：

```bash
open ios/rn073demo.xcworkspace
```

然后在 Xcode 中：
1. 选择模拟器
2. 按 `Cmd + R` 运行

### 日常开发

首次在 Xcode 中成功构建后：

```bash
# 启动开发服务器（新终端）
npm start

# 运行 iOS 应用（另一个终端）
npm run ios
```

或指定模拟器：
```bash
npx react-native run-ios --simulator="iPhone SE (3rd generation)"
```

---

## 环境检查

运行诊断命令：

```bash
npx react-native doctor
```

检查关键组件：

```bash
# Xcode 版本
xcodebuild -version

# CocoaPods 版本
pod --version

# Ruby 版本
ruby --version

# 可用的 iOS 模拟器
xcrun simctl list devices | grep iPhone

# iOS SDK
xcodebuild -showsdks | grep -i ios
```

---

## 常见问题 FAQ

### Q: 为什么命令行构建失败但 Xcode 可以？

A: Xcode 26 (Xcode 16) 引入了一些构建系统的变化，导致命令行工具 `xcodebuild` 在首次构建时无法正确识别项目配置。在 Xcode GUI 中首次构建会生成必要的配置文件和派生数据，之后命令行就能正常工作。

### Q: 每次都要在 Xcode 中运行吗？

A: 不需要。首次在 Xcode 中成功构建后，后续都可以使用命令行 `npm run ios`。

### Q: 如何选择不同的模拟器？

A: 
```bash
# 列出所有模拟器
xcrun simctl list devices

# 使用特定模拟器
npx react-native run-ios --simulator="iPhone 15 Pro"
npx react-native run-ios --simulator="iPhone SE (3rd generation)"
```

### Q: 模拟器很慢怎么办？

A: 
1. 确保你使用的是 Apple Silicon 模拟器（而非 Rosetta）
2. 在 Xcode > Settings > Platforms 中下载最新的模拟器
3. 减少同时运行的应用程序
4. 考虑使用真机开发

### Q: 如何清理构建缓存？

A:
```bash
# 清理 React Native 缓存
npx react-native start --reset-cache

# 清理 iOS 构建
cd ios
rm -rf build
xcodebuild clean
cd ..

# 清理 Pods
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..

# 清理派生数据（Xcode）
rm -rf ~/Library/Developer/Xcode/DerivedData/rn073demo-*
```

---

## 性能优化建议

### 开发模式 vs Release 模式

**开发模式**（默认）：
- 包含调试工具和热更新
- 性能较慢（正常现象）
- 启动时间较长

**Release 模式**（测试性能）：
```bash
npx react-native run-ios --configuration Release
```

### 启用 Hermes

Hermes 已在项目中默认启用（`ios/Podfile` 配置）。

验证 Hermes 是否启用：
```javascript
// 在应用中运行
console.log(global.HermesInternal != null ? 'Hermes' : 'JSC');
```

---

## 支持的 iOS 版本

- **最低支持**: iOS 13.4
- **推荐**: iOS 16.0+
- **测试**: iOS 18.1 (iPhone 16 Pro 模拟器)

---

## 相关资源

- [React Native iOS 环境配置](https://reactnative.dev/docs/environment-setup?os=macos&platform=ios)
- [Xcode 发行说明](https://developer.apple.com/documentation/xcode-release-notes)
- [CocoaPods 官方文档](https://guides.cocoapods.org/)
- [React Native 故障排除](https://reactnative.dev/docs/troubleshooting)

---

## 需要帮助？

如果以上方法都无法解决你的问题：

1. 查看完整的构建日志
2. 搜索 GitHub Issues
3. 在 React Native 社区求助
4. 检查是否有 Xcode 或 macOS 更新

---

**最后更新**: 2025年11月19日  
**Xcode 版本**: 26.0.1  
**RN 版本**: 0.73.6
