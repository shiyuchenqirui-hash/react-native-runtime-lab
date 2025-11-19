import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";

export default function App() {
  // 检测新架构特性
  const isFabricEnabled = global.nativeFabricUIManager != null;
  const isTurboModuleEnabled = global.__turboModuleProxy != null;
  // Bridgeless 检测：检查是否没有传统的 Bridge
  // 注意：在 RN 0.73 中，Bridgeless 可能未完全启用（0.74+ 才默认启用）
  const isBridgelessEnabled =
    global.__fbBatchedBridge == null && isFabricEnabled;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 React Native 0.73 csy</Text>
      <Text style={styles.subtitle}>基于 Expo SDK 50</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>平台:</Text>
        <Text style={styles.value}>{Platform.OS}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>RN 版本:</Text>
        <Text style={styles.value}>0.73.6</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Fabric 渲染器:</Text>
        <Text
          style={[
            styles.value,
            isFabricEnabled ? styles.enabled : styles.disabled,
          ]}
        >
          {isFabricEnabled ? "✅ 已启用" : "❌ 未启用"}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>TurboModule:</Text>
        <Text
          style={[
            styles.value,
            isTurboModuleEnabled ? styles.enabled : styles.disabled,
          ]}
        >
          {isTurboModuleEnabled ? "✅ 已启用" : "❌ 未启用"}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Bridgeless:</Text>
        <Text
          style={[
            styles.value,
            isBridgelessEnabled ? styles.enabled : styles.disabled,
          ]}
        >
          {isBridgelessEnabled ? "✅ 已启用" : "❌ 未启用"}
        </Text>
      </View>

      <Text style={styles.footer}>开始学习 React Native 0.73 的 API！</Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    width: "80%",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
  enabled: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  disabled: {
    color: "#F44336",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 32,
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});
