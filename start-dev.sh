#!/bin/bash

# React Native 0.73 开发启动脚本
# 自动清理端口、设置 adb 转发并启动 Metro 服务器
# TODO: 启动前应让用户确认端口归属，避免强制结束其他应用；当前推荐直接 npm start。

echo "🧹 清理 8081 端口..."
lsof -ti:8081 | xargs kill -9 2>/dev/null

echo "📱 设置 Android 端口转发..."
# 检查是否有 Android 设备连接
if adb devices | grep -q "device$"; then
    adb reverse tcp:8081 tcp:8081 2>/dev/null && echo "✅ Android 端口转发已设置" || echo "⚠️  无 Android 设备或转发失败"
else
    echo "ℹ️  未检测到 Android 设备（如使用 iOS 可忽略）"
fi

echo ""
echo "🚀 启动 Metro Bundler..."
echo ""
echo "📱 开发提示："
echo "  - Android 真机: 摇晃设备或按 RR 重新加载"
echo "  - Android 模拟器: Cmd+M (Mac) 或 Ctrl+M (Win) 打开菜单"
echo "  - iOS: 在 Xcode 中选择设备并运行"
echo "  - 修改 JS 代码后自动刷新"
echo ""

npm start
