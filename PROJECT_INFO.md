# 项目配置详情

## 项目创建日期
2025年11月19日

## 技术栈版本

### 核心依赖
```json
{
  "expo": "~50.0.0",
  "react": "18.2.0",
  "react-native": "0.73.6",
  "expo-status-bar": "~1.11.1"
}
```

### 开发依赖
```json
{
  "@babel/core": "^7.20.0"
}
```

## 新架构配置

### 1. Android 配置

**文件**: `android/gradle.properties`

关键配置项：
```properties
# 启用新架构（Fabric + TurboModule + Bridgeless）
newArchEnabled=true

# 启用 Hermes JavaScript 引擎
hermesEnabled=true

# AndroidX 支持
android.useAndroidX=true
android.enableJetifier=true

# 支持的 CPU 架构
reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64
```

### 2. Expo 配置

**文件**: `app.json`

关键配置项：
```json
{
  "expo": {
    "name": "rn073demo",
    "slug": "rn073demo",
    "newArchEnabled": true,
    "ios": {
      "bundleIdentifier": "com.rn073demo.app"
    },
    "android": {
      "package": "com.rn073demo.app"
    }
  }
}
```

### 3. iOS 配置

**文件**: `ios/Podfile`

新架构会在 Podfile 中自动配置，主要包括：
- Fabric 渲染器支持
- TurboModule 支持
- Hermes 引擎支持

## 新架构特性说明

### Fabric 渲染器
- **作用**: 新的 UI 渲染系统
- **优势**: 
  - 更快的渲染性能
  - 更好的类型安全
  - 支持并发渲染
  - 改进的错误处理

- **检测方法**:
  ```javascript
  const isFabricEnabled = global.nativeFabricUIManager != null;
  ```

### TurboModule
- **作用**: 新的原生模块系统
- **优势**:
  - 懒加载原生模块
  - 更好的类型安全
  - 减少启动时间
  - 改进的性能

- **检测方法**:
  ```javascript
  const isTurboModuleEnabled = global.__turboModuleProxy != null;
  ```

### Bridgeless 模式
- **作用**: 移除旧的 JavaScript Bridge
- **优势**:
  - 直接通信，减少序列化开销
  - 更快的 JS-Native 通信
  - 更低的内存占用
  - 支持多 JS 运行时

- **检测方法**:
  ```javascript
  // Bridgeless 通常和 Fabric 一起启用
  const isBridgelessEnabled = global.nativeFabricUIManager != null;
  ```

### Hermes 引擎
- **作用**: React Native 的 JavaScript 引擎
- **优势**:
  - 更快的应用启动
  - 更低的内存占用
  - 更小的应用体积
  - 优化的字节码

## 环境要求

### 必需
- **Node.js**: >= 18.x (当前使用 18.17.1)
- **JDK**: 17 (推荐)
- **npm**: 9.x+

### Android 开发
- **Android Studio**: Arctic Fox 或更高
- **Android SDK**: API Level 33+
- **Gradle**: 8.x (由项目自动管理)

### iOS 开发 (仅 macOS)
- **Xcode**: 14.x 或更高
- **CocoaPods**: 1.12+
- **Ruby**: 2.7+ (用于 CocoaPods)

## 项目结构说明

```
rn073demo/
├── android/                    # Android 原生代码
│   ├── app/
│   │   ├── build.gradle       # App 级别构建配置
│   │   └── src/               # Java/Kotlin 源代码
│   └── gradle.properties      # ⭐ 新架构配置位置
│
├── ios/                        # iOS 原生代码
│   ├── Podfile                # CocoaPods 依赖管理
│   └── rn073demo/             # iOS 项目文件
│
├── examples/                   # 示例代码
│   └── NewArchitectureExample.js  # 新架构特性示例
│
├── assets/                     # 静态资源
│   ├── icon.png               # 应用图标
│   └── splash-icon.png        # 启动屏幕
│
├── App.js                      # ⭐ 主应用组件
├── app.json                    # ⭐ Expo 配置文件
├── index.js                    # 应用入口
├── package.json                # 项目依赖
├── check-env.js                # 环境检查脚本
├── README.md                   # 项目说明
└── PROJECT_INFO.md            # 本文件 - 项目配置详情
```

## 常用命令

### 开发命令
```bash
# 启动开发服务器
npm start

# 运行 Android 应用
npm run android

# 运行 iOS 应用 (仅 macOS)
npm run ios

# 运行 Web 版本
npm run web

# 检查环境配置
npm run check-env
```

### 原生项目管理
```bash
# 重新生成原生项目
npx expo prebuild --clean

# 仅生成 Android
npx expo prebuild --platform android --clean

# 仅生成 iOS
npx expo prebuild --platform ios --clean
```

### 清理命令
```bash
# 清理并重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 清理 Android 构建
cd android && ./gradlew clean && cd ..

# 清理 iOS 构建 (macOS)
cd ios && rm -rf Pods Podfile.lock && pod install && cd ..
```

## 性能优化建议

### 1. 利用新架构优势
- 使用 `React.memo` 和 `useMemo` 优化渲染
- 利用 Fabric 的并发渲染特性
- 使用 TurboModule 的懒加载能力

### 2. 代码分割
```javascript
// 使用动态导入
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));
```

### 3. 列表优化
```javascript
// 使用 FlashList 替代 FlatList (需要安装)
import { FlashList } from "@shopify/flash-list";
```

### 4. 图片优化
- 使用 WebP 格式
- 启用图片缓存
- 合理设置图片尺寸

## 调试技巧

### 1. 查看新架构状态
```javascript
console.log('Fabric:', global.nativeFabricUIManager != null);
console.log('TurboModule:', global.__turboModuleProxy != null);
```

### 2. 性能监控
```javascript
// 使用 React DevTools Profiler
import { Profiler } from 'react';

<Profiler id="MyComponent" onRender={callback}>
  <MyComponent />
</Profiler>
```

### 3. Chrome DevTools
```bash
# 启动应用后，在浏览器打开
chrome://inspect
```

## 升级路径

### 从其他版本迁移到 0.73
1. 更新 package.json 依赖
2. 运行 `npx expo prebuild --clean`
3. 启用 `newArchEnabled=true`
4. 测试第三方库兼容性
5. 更新原生模块（如有）

### 未来升级到 0.74+
- 关注 Expo SDK 51+ 的发布
- 查看 Breaking Changes 文档
- 逐步测试新特性

## 故障排除

### Android 构建失败
1. 检查 JDK 版本是否为 17
2. 清理 Gradle 缓存: `cd android && ./gradlew clean`
3. 检查 `gradle.properties` 配置

### iOS 构建失败
1. 运行 `pod install`
2. 检查 Xcode 版本
3. 清理 DerivedData

### Metro bundler 问题
```bash
# 清理 Metro 缓存
npx expo start --clear
```

### 新架构未启用
1. 确认 `android/gradle.properties` 中 `newArchEnabled=true`
2. 确认 `app.json` 中 `"newArchEnabled": true`
3. 重新运行 `npx expo prebuild --clean`
4. 完全卸载应用后重新安装

## 学习资源

### 官方文档
- [React Native 官网](https://reactnative.dev/)
- [Expo 文档](https://docs.expo.dev/)
- [新架构指南](https://reactnative.dev/docs/the-new-architecture/landing-page)

### 社区资源
- [React Native GitHub](https://github.com/facebook/react-native)
- [Expo GitHub](https://github.com/expo/expo)
- [React Native Community](https://reactnative.dev/community/overview)

### 推荐阅读
- [Fabric 渲染器详解](https://reactnative.dev/architecture/fabric-renderer)
- [TurboModule 系统](https://reactnative.dev/architecture/turbo-module)
- [Hermes 引擎](https://hermesengine.dev/)

## 更新日志

### 2025-11-19
- ✅ 创建项目
- ✅ 配置 React Native 0.73.6
- ✅ 配置 Expo SDK 50
- ✅ 启用新架构 (Fabric + TurboModule + Bridgeless)
- ✅ 启用 Hermes 引擎
- ✅ 创建示例代码
- ✅ 添加环境检查脚本

## 贡献者
- 项目创建者: Chen Shiyu
- 创建日期: 2025年11月19日

## License
MIT
