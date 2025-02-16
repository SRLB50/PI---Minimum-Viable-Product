import { useState } from "react"

// context 
import { useAuth } from "../../context/AuthContext/index"

// libraries
import axios from "axios"
// import { useRouter } from 'expo-router';
import { UseFormSetError } from "react-hook-form"

// API Standarts
import { getApiBaseUrl } from '../api'

// Schema
import { LoginFormData } from "../../schemas/authSchema"

export const useAuthRequest = () => {
  const { login } = useAuth()
  // const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false)

  const generateHeaders = (username: string, password: string) => {
    const credentials = `${username}:${password}`
    return {
      Authorization: `Basic ${btoa(credentials)}`,
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Access-Control-Allow-Origin": "*",
    }
  }

  const onSubmit = async (
    data: LoginFormData,
    setError: UseFormSetError<LoginFormData>
  ) => {
    setIsSubmitting(true)

    try {
      const headers = {
        "Content-Type": "application/json",
        ...generateHeaders(data.username, data.password),
      };

      const response = await axios.post(
        `${getApiBaseUrl()}/autenticacao`,
        {
          username: data.username,
          password: data.password,
        },
        { headers }
      );

      if (response.data) {
        // Salva o token e redireciona
        login(response.data.dados.token, response.data.dados.expiraEm)
        // router.push("/")
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError("root", {
            type: "manual",
            message: "Usuário ou senha inválidos",
          })
        } else {
          setError("root", {
            type: "manual",
            message: error.response?.data.mensagem,
          })
        }
      } else {
        setError("root", {
          type: "manual",
          message: "Erro ao fazer login. Tente novamente.",
        })
      }

    } finally {
      setIsSubmitting(false)
    }
  }

  return { onSubmit, isSubmitting }
}