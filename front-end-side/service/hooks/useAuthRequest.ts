import { useState } from "react"

// context 
import { useAuth } from "../../context/AuthContext/index"

// libraries
import axios from "axios"
// import { useRouter } from 'expo-router';
import { UseFormSetError } from "react-hook-form"

// Schema
import { LoginFormData } from "../../schemas/authSchema"
import { getApiUrl } from '~/utils/decrypt';

//api
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "~/types/types";

type NavigationProps = StackNavigationProp<RootStackParamList, 'Login'>;

export const useAuthRequest = () => {
  const { login } = useAuth()
  // const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false)
  const apiUrl = getApiUrl();
  const navigation = useNavigation<NavigationProps>();

  const generateHeaders = () => {
    return {
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Access-Control-Allow-Origin": "*",
    }
  }

  const onSubmit = async (
    data: LoginFormData,
    //setError: UseFormSetError<LoginFormData>
  ) => {
    setIsSubmitting(true)

    try {
      const headers = {
        "Content-Type": "application/json",
        ...generateHeaders(),
      };

      const response = await axios.post(
        `${apiUrl}/login`,
        {
          email: data.email,
          senha: data.password,
        },
        { headers }
      );

      if (response) {
        // Salva o token e redireciona
        login(response.data.token, "6000000")
        navigation.navigate('TabNavigator', {
          screen: 'home'
        })
      }
    } catch (error: any) {
      throw new Error(error);
      // if (axios.isAxiosError(error)) {
      //   if (error.response?.status === 401) {
      //     setError("root", {
      //       type: "manual",
      //       message: "Usuário ou senha inválidos",
      //     })
      //   } else {
      //     setError("root", {
      //       type: "manual",
      //       message: error.response?.data.mensagem,
      //     })
      //   }
      // } else {
      //   setError("root", {
      //     type: "manual",
      //     message: "Erro ao fazer login. Tente novamente.",
      //   })
      // }

    } finally {
      setIsSubmitting(false)
    }
  }

  return { onSubmit, isSubmitting }
}