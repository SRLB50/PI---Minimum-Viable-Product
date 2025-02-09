import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="login">
      {/* Página de login deve vir primeiro */}
      <Stack.Screen name="login" options={{ headerShown: false }} />

      {/* Layout principal com abas */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Modal */}
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
