# 快速开始指南

> 历史资料：原文声明未经本轮逐项复验；不作为当前运行或性能保证。当前入口见 [项目 README](../../README.md)。归档整理：2026-10-05。

## 第一步：验证环境

运行环境检查脚本：

```bash
npm run check-env
```

如果看到 "✅ 所有检查通过！环境配置完美！"，说明环境已就绪。

## 第二步：启动开发服务器

```bash
npm start
```

这将启动 Expo 开发服务器。你会看到一个二维码和几个选项。

## 第三步：运行应用

### 选项 A: 使用 Android 模拟器

1. 确保 Android Studio 的模拟器已启动
2. 在新终端运行：
   ```bash
   npm run android
   ```

### 选项 B: 使用 iOS 模拟器 (仅 macOS)

```bash
npm run ios
```

### 选项 C: 使用真机

1. 在手机上安装 [Expo Go](https://expo.dev/client) 应用
2. 扫描终端显示的二维码

## 验证新架构

应用启动后，主屏幕会显示：

- ✅ **Fabric 渲染器**: 已启用
- ✅ **TurboModule**: 已启用  
- ✅ **Bridgeless**: 已启用

如果都显示"已启用"，恭喜！新架构配置成功！

## 开始学习

### 查看示例代码

查看 `examples/NewArchitectureExample.js` 文件，了解新架构的使用方法。

### 修改代码

1. 编辑 `App.js` 文件
2. 保存后应用会自动刷新 (Fast Refresh)
3. 尝试修改文本或样式

### 常用快捷键

在开发服务器终端中：
- 按 `a` - 打开 Android 应用
- 按 `i` - 打开 iOS 应用
- 按 `r` - 重新加载应用
- 按 `m` - 切换菜单
- 按 `j` - 打开调试器

## 推荐学习路径

### 1. 基础组件 (第1-2天)
- View, Text, Image
- ScrollView, FlatList
- TouchableOpacity, Button
- TextInput

### 2. Hooks (第3-4天)
- useState, useEffect
- useCallback, useMemo
- useRef, useContext
- 自定义 Hooks

### 3. 样式和布局 (第5-6天)
- StyleSheet API
- Flexbox 布局
- 响应式设计
- 动画基础

### 4. 新架构特性 (第7-10天)
- Fabric 渲染器原理
- TurboModule 使用
- 性能优化技巧
- 原生模块开发

## 常见问题

### Q: 应用无法启动？

A: 尝试以下步骤：
1. 确保没有其他进程占用 8081 端口
2. 运行 `npx expo start --clear` 清除缓存
3. 重启 Metro bundler

### Q: 修改代码后没有刷新？

A: 
1. 检查是否有语法错误
2. 尝试手动刷新：摇晃设备或按 `Cmd+R` (iOS) / `RR` (Android)
3. 重启开发服务器

### Q: 新架构显示未启用？

A:
1. 确认 `android/gradle.properties` 中 `newArchEnabled=true`
2. 完全卸载应用后重新安装
3. 运行 `npx expo prebuild --clean` 重新生成

### Q: Android 构建缓慢？

A:
1. 首次构建需要下载依赖，耐心等待
2. 确保网络连接稳定
3. 可以配置 Gradle 镜像加速

## 性能提示

1. **开发模式 vs 生产模式**
   - 开发模式包含调试信息，性能较低
   - 要测试真实性能，使用 Release 构建

2. **避免过度渲染**
   - 使用 React DevTools Profiler 分析
   - 合理使用 React.memo

3. **列表优化**
   - 设置 `keyExtractor`
   - 使用 `getItemLayout` (如果项高度固定)
   - 限制初始渲染数量

## 下一步

- 📖 阅读 `README.md` 了解完整功能
- 📄 查看 `PROJECT_INFO.md` 了解技术细节
- 💻 修改 `App.js` 开始你的第一个功能
- 🔍 探索 `examples/` 文件夹中的示例代码

## 获取帮助

- 📚 [React Native 文档](https://reactnative.dev/)
- 💬 [Expo 论坛](https://forums.expo.dev/)
- 🐛 [提交 Issue](https://github.com/facebook/react-native/issues)
- 💡 查看项目中的其他 Markdown 文档

---

祝学习愉快！🎉
