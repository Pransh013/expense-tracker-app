import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
