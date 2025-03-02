// import { useRouter } from "expo-router";
import { View, Text, TextInput, TouchableOpacity, Image, StatusBar } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// @ts-ignore
import Header from "@components/Template/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "~/types/types";

// Schema de validação
const loginSchema = z.object({
  email: z.string()
    .min(1, "E-mail é obrigatório")
    .email("E-mail inválido"),
  password: z.string()
    .min(6, "Senha deve ter no mínimo 6 caracteres")
    .max(50, "Senha muito longa"),
});

// Tipo inferido do schema
type LoginFormData = z.infer<typeof loginSchema>;

type NavigationProps = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  // const router = useRouter();

  const { 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      // Aqui você pode adicionar sua lógica de autenticação
      return false
      // await AsyncStorage.setItem('token', 'teste');
      // router.replace("/(tabs)");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = () => {
    //router.push("/register");
  };

  const navigation = useNavigation<NavigationProps>();

  return (
    <SafeAreaView className="flex-1">
      <StatusBar barStyle={"light-content"} translucent backgroundColor={'#1c1c1c'} />
        <Header/>
        <View className="px-6 mt-8">
          <Text className="text-2xl font-medium mb-8">Login</Text>

          <View className="space-y-4">
            <View>
              <Text className="text-gray-700 text-base font-normal mb-2">E-mail</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput 
                    value={value}
                    onChangeText={onChange}
                    placeholder="Digite seu e-mail"
                    placeholderTextColor="#A0A0A0"
                    className={`w-full bg-gray-50 rounded-lg p-4 text-black ${
                      errors.email ? "border-2 border-red-500" : ""
                    }`}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.email && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </Text>
              )}
            </View>

            <View>
              <Text className="text-gray-700 text-base mb-2 mt-5 font-normal">Senha</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput 
                    value={value}
                    onChangeText={onChange}
                    placeholder="Digite sua senha"
                    placeholderTextColor="#A0A0A0"
                    secureTextEntry
                    className={`w-full bg-gray-50 rounded-lg p-4 text-black ${
                      errors.password ? "border-2 border-red-500" : ""
                    }`}
                  />
                )}
              />
              {errors.password && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </Text>
              )}
            </View>

            <TouchableOpacity 
              onPress={handleSubmit(handleLogin)}
              className="w-full bg-black rounded-lg py-4 mt-4 mb-4"
            >
              <Text className="text-white text-center font-semibold">Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={()=> navigation.navigate('Cadastro')}
              className="mt-4 border-t-2 border-gray-200 pt-4"

            >
              <Text className="text-center text-gray-600">
                Não faz parte? Cadastre-se
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
};

export default LoginScreen;