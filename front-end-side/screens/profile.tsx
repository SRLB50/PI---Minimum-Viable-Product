import React, { useState, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useAuth } from '~/context/AuthContext';

//library
import { useForm, useWatch } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

//components
import CustomInput from '@components/Template/CustomInput';

//utils
import { getApiUrl } from '~/utils/decrypt';

const Profile = () => {
  const [showProfile, setShowProfile] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean | null>(null);
  const { logout } = useAuth();

  const {
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const backAction = () => {
      setShowProfile(true)
      return true; 
    };

    // Adiciona o evento ao pressionar o botão "Voltar"
    const backHandlerAction = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Limpa o listener quando o componente for desmontado
    return () => {
      backHandlerAction.remove();
    };
  }, []);

  useEffect(() => {
    const fetchCompanyData = async () => {
      const empresa = await AsyncStorage.getItem('empresa');
      setIsClient(empresa !== 'true');
    };

    fetchCompanyData();
  }, []);

  useEffect(() => {
    // Limpa o formulário quando o componente for desmontado
    return () => {
      reset();
      setShowProfile(true);
    };
  }, [reset]);

  const handleResetValues = (response: any) => {
    reset({
      nome: response.nome,
      email: response.email,
      telefone: response.telefone,
      enderecos: [
        {
          cep: response.enderecos[0].cep,
          cidade: response.enderecos[0].cidade,
          estado: response.enderecos[0].estado,
          endereco: response.enderecos[0].endereco,
          numero: response.enderecos[0].numero,
          complemento: response.enderecos[0].complemento,
        },
      ],
      // Condição para verificar se é cliente ou empresa
      ...(isClient
        ? {
            cpf: response.cpf,
          }
        : {
            cnpj: response.cnpj,
            tipoServico: response.tipoServico,
          }),
    });
  };

  const handleShowData = async () => {
    const userEmail = await AsyncStorage.getItem('email');

    if (isClient) {
      axios
        .get(`${getApiUrl()}/user/getuserinfo?email=${userEmail}`)
        .then((response) => {
          const responseFormated = response.data;
          handleResetValues(responseFormated);
          setShowProfile(false);
        })
        .catch((error) => {
          console.log(error, 'erro');
        });
    } else {
      axios
        .get(`${getApiUrl()}/company/getCompanyData?email=${userEmail}`)
        .then((response) => {
          const responseFormated = response.data;
          handleResetValues(responseFormated);
          setShowProfile(false);
        })
        .catch((error) => {
          console.log(error, 'erro');
        });
    }
  };

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 bg-gray-100 px-4 py-6">
        {showProfile && (
          <View>
            <Text className="mb-4 text-2xl font-semibold">Perfil</Text>
            <View className="mt-2 border-b-2 border-gray-200 " />

            <View className="p-4" onTouchStart={handleShowData}>
              <Text className="text-gray-800">Dados {isClient ? 'do usuário' : 'da Empresa'}</Text>
            </View>
            <View className="mt-2 border-b-2 border-gray-200 " />

            <View className="p-4" onTouchStart={() => logout()}>
              <Text className="text-gray-800">Sair</Text>
            </View>
            <View className="mt-2 border-b-2 border-gray-200 " />
          </View>
        )}

        {!showProfile && (
          <View>
            <CustomInput
              name="nome"
              control={control}
              label="Nome"
              placeholder="Digite seu nome"
              disabled
            />
            <CustomInput
              name="email"
              control={control}
              label="E-mail"
              placeholder="usuario@gmail.com"
              disabled
            />
            {isClient ? (
              <CustomInput
                name="cpf"
                control={control}
                label="CPF"
                placeholder="000.000.000-00"
                disabled
              />
            ) : (
              <>
                <CustomInput
                  name="cnpj"
                  control={control}
                  label="CNPJ"
                  placeholder="00.000.000/0000-00"
                  disabled
                />

                <CustomInput
                  name="tipoServico"
                  control={control}
                  label="Tipo de Serviço"
                  placeholder="Manutenção Domiciliar"
                  disabled
                />
              </>
            )}
            <CustomInput
              name="telefone"
              control={control}
              label="Telefone"
              placeholder="(00) 00000-0000"
              disabled
            />
            <View>
              <CustomInput
                name="enderecos[].cep"
                control={control}
                label="CEP"
                placeholder="00000-000"
                disabled
              />
              <View className="w-full flex-row gap-3">
                <CustomInput
                  name="enderecos[].cidade"
                  control={control}
                  label="Cidade"
                  placeholder="São Paulo"
                  className="w-[70%]"
                  disabled
                />
                <CustomInput
                  name="enderecos[].estado"
                  control={control}
                  label="Estado"
                  placeholder="SP"
                  className="flex-grow"
                  disabled
                />
              </View>
              <CustomInput
                name="enderecos[].endereco"
                control={control}
                label="Endereço"
                placeholder="Rua João das Neves"
                disabled
              />
              <CustomInput
                name="enderecos[].numero"
                control={control}
                label="Número"
                placeholder="0000"
                disabled
              />
              <CustomInput
                name="enderecos[].complemento"
                control={control}
                label="Complemento"
                placeholder="Casa"
                disabled
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;
