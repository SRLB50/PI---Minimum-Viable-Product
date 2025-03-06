import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@components/Template/InputField';
import { Container } from '@components/Template/Container';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  cpf: z.string().min(1, 'CPF is required'),
  phone: z.string().min(1, 'Phone is required'),
  zipCode: z.string().min(1, 'ZIP Code is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  address: z.string().min(1, 'Address is required'),
  number: z.string().min(1, 'Number is required'),
  complement: z.string().optional(),
});

type UserFormData = z.infer<typeof userSchema>;

const UserData = ({ cpf }: { cpf: string }) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserFormData | null>(null);

  const {
    control,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/cliente/${cpf}`);
      const data = await response.json();

      if (response.ok) {
        setUserData(data);
        setValue('name', data.nome);
        setValue('email', data.email);
        setValue('cpf', data.cpf);
        setValue('phone', data.telefone);
        setValue('zipCode', data.endereco);
        setValue('city', data.cidade || '');
        setValue('state', data.estado || '');
        setValue('address', data.endereco);
        setValue('number', data.numero || '');
        setValue('complement', data.complemento || '');
      } else {
        Alert.alert('Erro', 'Cliente não encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao carregar os dados do cliente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [cpf]);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="mt-12 px-6">
          <Text className="mb-8 text-2xl font-medium">Dados do Usuário</Text>

          <InputField control={control} name="name" placeholder="Nome" errors={errors} />
          <InputField
            control={control}
            name="email"
            placeholder="E-mail"
            errors={errors}
            keyboardType="email-address"
          />
          <InputField control={control} name="cpf" placeholder="CPF" errors={errors} />
          <InputField
            control={control}
            name="phone"
            placeholder="Telefone"
            errors={errors}
            keyboardType="phone-pad"
          />
          <InputField control={control} name="zipCode" placeholder="CEP" errors={errors} />
          <View className="mb-6 flex-row space-x-4">
            <View className="mr-4 flex-1">
              <InputField control={control} name="city" placeholder="Cidade" errors={errors} />
            </View>
            <View className="flex-1">
              <InputField control={control} name="state" placeholder="Estado" errors={errors} />
            </View>
          </View>
          <InputField control={control} name="address" placeholder="Endereço" errors={errors} />
          <View className="mb-6 flex-row space-x-4">
            <View className="mr-4 flex-1">
              <InputField control={control} name="number" placeholder="Número" errors={errors} />
            </View>
            <View className="flex-1">
              <InputField
                control={control}
                name="complement"
                placeholder="Complemento"
                errors={errors}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default UserData;
