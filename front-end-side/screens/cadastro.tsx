import CustomButton from '@components/Template/CustomButton'
import CustomHeader from '@components/Template/CustomHeader'
import CustomInput from '@components/Template/CustomInput'
import CustomToggleButton from '@components/Template/CustomToggleButton'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RootStackParamList } from '~/types/types'
type NavigationProps = StackNavigationProp<RootStackParamList, 'Cadastro'>;
import { getApiUrl } from '~/utils/decrypt';

const Cadastro = () => {

    const [isClient, setIsClient] = useState<boolean>(true)

    const navigation = useNavigation<NavigationProps>();

    const { control, handleSubmit, formState: { errors }, watch, resetField} = useForm();

    useEffect(() => {
        if (isClient) {
          resetField("cnpj");
          resetField("tipoServico");
        } else {
          resetField("cpf");
        }
      }, [isClient, resetField]);

    const onSubmit = async (data: any) => {

        const apiUrl = getApiUrl();
        console.log('API URL:', apiUrl);
        console.log('Dados a serem enviados:', JSON.stringify(data, null, 2));
        const { confirmarSenha, ...dataToSend } = data;
        !isClient ? delete dataToSend.cpf : dataToSend;
        console.log('Dados a serem enviados:', JSON.stringify(dataToSend, null, 2));

        try {
            const response = await fetch(isClient ? `${apiUrl}/user/create` : `${apiUrl}/company/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Sucesso ao cadastrar usuário', result);
                navigation.navigate('Login');
            } else {
                const errorData = await response.json();
                Alert.alert('Erro ao cadastrar usuário', errorData.message || 'Tente novamente mais tarde');
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Erro ao cadastrar usuário', error.message);
                Alert.alert('Erro ao cadastrar usuário', error.message);
            } else {
                console.error('Erro ao cadastrar usuário', String(error));
                Alert.alert('Erro ao cadastrar usuário', 'Erro desconhecido');
            }
        }
    };


    return (
        <ScrollView>
            <SafeAreaView className='flex-1 bg-bg '>
                <CustomHeader/>
                <View className='px-8'>
                    <Text className='text-center font-inter text-4xl mt-14 mb-5 color-titleText'>Cadastro</Text>
                    <CustomInput 
                        name= 'nome'
                        control={control}        
                        label= 'Nome'
                        placeholder= 'Digite seu nome'
                    />
                    <CustomInput 
                        name= 'email'
                        control={control}
                        label= 'E-mail'
                        placeholder= 'usuario@gmail.com'
                    />
                    <CustomToggleButton
                        label='Tipo de Usuário'
                        firstOptionText='Cliente'
                        secondOptionText='Prestador'
                        firstOptionSelected={isClient}
                        setFirstOptionSelected={setIsClient}
                    />
                    {
                        isClient ? 
                            <CustomInput 
                                name= 'cpf'
                                control={control}
                                label= 'CPF'
                                placeholder= '000.000.000-00'
                            />
                        :
                            <>
                                <CustomInput 
                                    name= 'cnpj'
                                    control={control}
                                    label= 'CNPJ'
                                    placeholder= '00.000.000/0000-00'
                                />

                                <CustomInput 
                                    name= 'tipoServico'
                                    control={control}
                                    label= 'Tipo de Serviço'
                                    placeholder= 'Manutenção Domiciliar'
                                />
                            </>                        
                    }
                    <CustomInput 
                        name= 'telefone'
                        control={control}
                        label= 'Telefone'
                        placeholder= '(00) 00000-0000'
                    />
                    <View>
                        <CustomInput 
                            name= 'enderecos[].cep'
                            control={control}
                            label= 'CEP'
                            placeholder= '00000-000'
                        />
                        <View className='flex-row gap-3 w-full'>
                            <CustomInput 
                                name= 'enderecos[].cidade'
                                control={control} 
                                label= 'Cidade'
                                placeholder= 'São Paulo'
                                className='w-[70%]'
                            />
                            <CustomInput 
                                name= 'enderecos[].estado'
                                control={control}
                                label= 'Estado'
                                placeholder= 'SP'
                                className='flex-grow'
                            />
                        </View>
                        <CustomInput 
                            name= 'enderecos[].endereco'
                            control={control}
                            label= 'Endereço'
                            placeholder= 'Rua João das Neves'
                        />
                        <CustomInput 
                            name= 'enderecos[].numero'
                            control={control}
                            label= 'Número'
                            placeholder= '0000'
                        />
                        <CustomInput 
                            name= 'enderecos[].complemento'
                            control={control}
                            label= 'Complemento'
                            placeholder= 'Casa'
                        />
                    </View>
                    <CustomInput 
                        name= 'senha'
                        control={control}
                        label= 'Senha'
                        placeholder= '•••••••••••••••'
                        secureTextEntry={true}
                        rules={{
                            required: "Senha é obrigatória",
                            minLength: {
                                value: 6,
                                message: "A senha deve ter pelo menos 6 caracteres"
                            }
                        }}
                    />
                    <CustomInput 
                        name= 'confirmarSenha'
                        control={control}
                        label= 'Confirme sua senha'
                        placeholder= '•••••••••••••••'
                        secureTextEntry={true}
                        rules={{
                            required: "Confirmação de senha é obrigatória",
                            validate: (value) => value === watch("senha") || "As senhas não coincidem"
                        }}
                    /> 
                    <CustomButton
                        text='Cadastre-se'
                        onPress={handleSubmit(onSubmit)}
                    />
                    <View className="flex-row items-center justify-center gap-1 my-10">
                        <Text className='text-lg'>Já possui cadastro?</Text>
                        <TouchableOpacity 
                            onPress={()=> navigation.navigate('Login')}
                            className=""
                            >
                            <Text className='underline color-clickableText text-lg'>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default Cadastro
