import { View, Text, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Container } from '@components/Template/Container';
import InputField from '@components/Template/InputField';

const companySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  cnpj: z.string().min(1, 'CNPJ is required'),
  phone: z.string().min(1, 'Phone is required'),
  zipCode: z.string().min(1, 'ZIP Code is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  address: z.string().min(1, 'Address is required'),
  number: z.string().min(1, 'Number is required'),
  complement: z.string().optional(),
});

type CompanyFormData = z.infer<typeof companySchema>;

const UserData = () => {
  const {
    control,
    formState: { errors },
  } = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      name: '',
      email: '',
      cnpj: '',
      phone: '',
      zipCode: '',
      city: '',
      state: '',
      address: '',
      number: '',
      complement: '',
    },
  });

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
