import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
} from 'react-native';

/**
 * React Native 0.73 新架构示例
 * 展示 Fabric 渲染器和新的 API 使用
 */
export default function NewArchitectureExample() {
  const [counter, setCounter] = useState(0);
  const colorScheme = useColorScheme(); // 响应系统主题
  const isDark = colorScheme === 'dark';

  // 检测新架构特性
  const features = {
    fabric: {
      name: 'Fabric 渲染器',
      enabled: global.nativeFabricUIManager != null,
      description: '新的 UI 渲染系统，提供更好的性能和类型安全',
    },
    turboModule: {
      name: 'TurboModule',
      enabled: global.__turboModuleProxy != null,
      description: '新的原生模块系统，支持懒加载和更好的类型支持',
    },
    bridgeless: {
      name: 'Bridgeless 模式',
      enabled: global.nativeFabricUIManager != null,
      description: '移除旧的 Bridge，直接通信，大幅提升性能',
    },
  };

  const containerStyle = [
    styles.container,
    isDark && styles.containerDark,
  ];

  const textStyle = [
    styles.text,
    isDark && styles.textDark,
  ];

  return (
    <ScrollView style={containerStyle}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.textDark]}>
          React Native 0.73 新架构
        </Text>
        <Text style={[styles.subtitle, isDark && styles.textDark]}>
          当前主题: {isDark ? '深色' : '浅色'}
        </Text>
      </View>

      {/* 特性列表 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
          新架构特性检测
        </Text>
        {Object.values(features).map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <View style={styles.featureHeader}>
              <Text style={styles.featureName}>{feature.name}</Text>
              <Text style={[
                styles.badge,
                feature.enabled ? styles.badgeEnabled : styles.badgeDisabled,
              ]}>
                {feature.enabled ? '✓ 已启用' : '✗ 未启用'}
              </Text>
            </View>
            <Text style={styles.featureDesc}>{feature.description}</Text>
          </View>
        ))}
      </View>

      {/* 性能测试 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
          性能测试
        </Text>
        <View style={styles.performanceCard}>
          <Text style={styles.counterText}>点击次数: {counter}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setCounter(c => c + 1)}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>点击测试</Text>
          </TouchableOpacity>
          <Text style={styles.perfHint}>
            {features.fabric.enabled
              ? '✓ Fabric 提供更快的渲染性能'
              : '使用传统渲染器'}
          </Text>
        </View>
      </View>

      {/* API 说明 */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, isDark && styles.textDark]}>
          RN 0.73 新特性
        </Text>
        <View style={styles.apiCard}>
          <Text style={styles.apiTitle}>🎨 useColorScheme Hook</Text>
          <Text style={styles.apiDesc}>
            响应式主题支持，自动跟随系统深色/浅色模式
          </Text>
        </View>
        <View style={styles.apiCard}>
          <Text style={styles.apiTitle}>⚡ Improved Performance</Text>
          <Text style={styles.apiDesc}>
            新架构带来的性能提升，特别是在列表滚动和动画方面
          </Text>
        </View>
        <View style={styles.apiCard}>
          <Text style={styles.apiTitle}>🔧 Better Type Safety</Text>
          <Text style={styles.apiDesc}>
            TurboModule 提供更好的 TypeScript 类型支持
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, isDark && styles.textDark]}>
          开始探索 React Native 0.73 的强大功能！
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
  },
  text: {
    color: '#333',
  },
  textDark: {
    color: '#e0e0e0',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
  },
  badgeEnabled: {
    backgroundColor: '#e8f5e9',
    color: '#4caf50',
  },
  badgeDisabled: {
    backgroundColor: '#ffebee',
    color: '#f44336',
  },
  featureDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  performanceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  counterText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  perfHint: {
    fontSize: 12,
    color: '#4caf50',
    textAlign: 'center',
  },
  apiCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  apiTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  apiDesc: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.6,
  },
});
