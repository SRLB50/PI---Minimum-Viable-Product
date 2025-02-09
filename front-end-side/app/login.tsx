import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const router = useRouter();

  const handleLogin = () => {
    AsyncStorage.setItem('token', 'teste')
    // Aqui você pode adicionar lógica de autenticação
    router.replace("/(tabs)"); // Redireciona para as abas após o login
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <View className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <Text className="mb-4 text-center text-2xl font-bold">Login</Text>
        
        <View className="space-y-4">
          <TextInput placeholder="E-mail" className="w-full rounded-md border border-gray-300 p-3" />
          <TextInput placeholder="Senha" secureTextEntry className="w-full rounded-md border border-gray-300 p-3" />
          <TouchableOpacity onPress={handleLogin} className="items-center rounded-md bg-blue-500 p-3">
            <Text className="font-bold text-white">Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
