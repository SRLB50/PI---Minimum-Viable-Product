import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// @ts-ignore
import Logo from "../assets/Logo.png";

const BASE_URL = 'http://localhost:3000'; // Ajuste para URL real do seu backend

type Empresa = {
  nome: string;
  cnpj: string;
  endereco: string;
};

const PerfilScreen = () => {
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmpresa = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error("Token não encontrado. Usuário precisa fazer login.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/empresa/1`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setEmpresa(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados da empresa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresa();
  }, []);

  const handleLogout = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      console.error("Token não encontrado.");
      return;
    }

    try {
      await axios.post(`${BASE_URL}/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      await AsyncStorage.removeItem('token');
      console.log("Usuário deslogado com sucesso!");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="bg-black h-48 rounded-b-[50px] flex items-center justify-center">
        <Image source={Logo} className="w-24 h-24" />
      </View>

      <View className="px-6 mt-8">
        <Text className="text-2xl font-medium mb-8">Perfil</Text>

        {empresa ? (
          <View className="p-4 bg-gray-100 rounded-lg">
            <Text className="text-gray-700 text-lg font-semibold">Dados da Empresa</Text>
            <Text className="text-gray-600 text-sm">Nome: {empresa.nome}</Text>
            <Text className="text-gray-600 text-sm">CNPJ: {empresa.cnpj}</Text>
            <Text className="text-gray-600 text-sm">Endereço: {empresa.endereco}</Text>
          </View>
        ) : (
          <Text className="text-red-500 text-center">Erro ao carregar dados da empresa.</Text>
        )}

        <TouchableOpacity 
          onPress={handleLogout} 
          className="w-full bg-red-500 rounded-lg py-4 mt-4"
        >
          <Text className="text-white text-center font-semibold">Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PerfilScreen;
