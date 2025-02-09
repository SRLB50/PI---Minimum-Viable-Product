import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

//images
import Logo from "../assets/Logo.png"

const LoginScreen = () => {
  const router = useRouter();

  const handleLogin = () => {
    AsyncStorage.setItem('token', 'teste')
    router.replace("/(tabs)");
  };

  const handleRegister = () => {
    //router.push("/register");
  };

  return (
    <View className="flex-1 bg-white">
      {/* Black curved header */}
      <View className="bg-black h-48 rounded-b-[50px]">
        <View className="flex-row items-center justify-center space-x-2 p-6 mt-12">
          <Image source={Logo} />
        </View>
      </View>

      {/* Login form */}
      <View className="px-6 mt-8">
        <Text className="text-2xl font-medium mb-8">Login</Text>

        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 text-base font-normal mb-2">E-mail</Text>
            <TextInput 
              placeholder="Digite seu e-mail"
              placeholderTextColor="#A0A0A0"
              className="w-full bg-gray-50 rounded-lg p-4 text-black"
            />
          </View>

          <View>
            <Text className="text-gray-700 text-base mb-2 mt-5 font-normal">Senha</Text>
            <TextInput 
              placeholder="Digite sua senha"
              placeholderTextColor="#A0A0A0"
              secureTextEntry
              className="w-full bg-gray-50 rounded-lg p-4 text-black"
            />
          </View>

          <TouchableOpacity 
            onPress={handleLogin}
            className="w-full bg-black rounded-lg py-4 mt-4 mb-4"
          >
            <Text className="text-white text-center font-semibold">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleRegister}
            className="mt-4 border-t-2 border-gray-200 pt-4"
          >
            <Text className="text-center text-gray-600">
              Não faz parte? Cadastre-se
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;