import { View, Text, TextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

const CompanyData = () => {
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
    <View className="flex-1 bg-white">
      <View className="mt-8 px-6">
        <Text className="mb-8 text-2xl font-medium">Dados da Empresa</Text>

        <View className="space-y-4">
          <View>
            <Text className="mb-2 text-base font-normal text-gray-700">Nome</Text>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Nome da Empresa"
                  placeholderTextColor="#A0A0A0"
                  className={`w-full rounded-lg bg-gray-50 p-4 text-black ${
                    errors.name ? 'border-2 border-red-500' : ''
                  }`}
                />
              )}
            />
            {errors.name && (
              <Text className="mt-1 text-sm text-red-500">{errors.name.message}</Text>
            )}
          </View>

          <View>
            <Text className="mb-2 text-base font-normal text-gray-700">E-mail</Text>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="E-mail da Empresa"
                  placeholderTextColor="#A0A0A0"
                  className={`w-full rounded-lg bg-gray-50 p-4 text-black ${
                    errors.email ? 'border-2 border-red-500' : ''
                  }`}
                  keyboardType="email-address"
                />
              )}
            />
            {errors.email && (
              <Text className="mt-1 text-sm text-red-500">{errors.email.message}</Text>
            )}
          </View>

          <View>
            <Text className="mb-2 text-base font-normal text-gray-700">CNPJ</Text>
            <Controller
              control={control}
              name="cnpj"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="CNPJ"
                  placeholderTextColor="#A0A0A0"
                  className={`w-full rounded-lg bg-gray-50 p-4 text-black ${
                    errors.cnpj ? 'border-2 border-red-500' : ''
                  }`}
                />
              )}
            />
            {errors.cnpj && (
              <Text className="mt-1 text-sm text-red-500">{errors.cnpj.message}</Text>
            )}
          </View>

          <View>
            <Text className="mb-2 text-base font-normal text-gray-700">Telefone</Text>
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Telefone"
                  placeholderTextColor="#A0A0A0"
                  className={`w-full rounded-lg bg-gray-50 p-4 text-black ${
                    errors.phone ? 'border-2 border-red-500' : ''
                  }`}
                  keyboardType="phone-pad"
                />
              )}
            />
            {errors.phone && (
              <Text className="mt-1 text-sm text-red-500">{errors.phone.message}</Text>
            )}
          </View>

          <View>
            <Text className="mb-2 text-base font-normal text-gray-700">CEP</Text>
            <Controller
              control={control}
              name="zipCode"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="CEP"
                  placeholderTextColor="#A0A0A0"
                  className={`w-full rounded-lg bg-gray-50 p-4 text-black ${
                    errors.zipCode ? 'border-2 border-red-500' : ''
                  }`}
                />
              )}
            />
            {errors.zipCode && (
              <Text className="mt-1 text-sm text-red-500">{errors.zipCode.message}</Text>
            )}
          </View>

          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text className="mb-2 text-base font-normal text-gray-700">Cidade</Text>
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Cidade"
                    placeholderTextColor="#A0A0A0"
                    className={`w-full rounded-lg bg-gray-50 p-4 text-black ${
                      errors.city ? 'border-2 border-red-500' : ''
                    }`}
                  />
                )}
              />
              {errors.city && (
                <Text className="mt-1 text-sm text-red-500">{errors.city.message}</Text>
              )}
            </View>
            <View className="flex-1">
              <Text className="mb-2 text-base font-normal text-gray-700">Estado</Text>
              <Controller
                control={control}
                name="state"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Estado"
                    placeholderTextColor="#A0A0A0"
                    className={`w-full rounded-lg bg-gray-50 p-4 text-black ${
                      errors.state ? 'border-2 border-red-500' : ''
                    }`}
                  />
                )}
              />
              {errors.state && (
                <Text className="mt-1 text-sm text-red-500">{errors.state.message}</Text>
              )}
            </View>
          </View>

          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text className="mb-2 text-base font-normal text-gray-700">Endereço</Text>
              <Controller
                control={control}
                name="address"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Endereço"
                    placeholderTextColor="#A0A0A0"
                    className={`w-full rounded-lg bg-gray-50 p-4 text-black ${
                      errors.address ? 'border-2 border-red-500' : ''
                    }`}
                  />
                )}
              />
              {errors.address && (
                <Text className="mt-1 text-sm text-red-500">{errors.address.message}</Text>
              )}
            </View>
            <View className="flex-1">
              <Text className="mb-2 text-base font-normal text-gray-700">Número</Text>
              <Controller
                control={control}
                name="number"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Número"
                    placeholderTextColor="#A0A0A0"
                    className={`w-full rounded-lg bg-gray-50 p-4 text-black ${
                      errors.number ? 'border-2 border-red-500' : ''
                    }`}
                  />
                )}
              />
              {errors.number && (
                <Text className="mt-1 text-sm text-red-500">{errors.number.message}</Text>
              )}
            </View>
          </View>

          <View>
            <Text className="mb-2 text-base font-normal text-gray-700">Complemento</Text>
            <Controller
              control={control}
              name="complement"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  placeholder="Complemento (opcional)"
                  placeholderTextColor="#A0A0A0"
                  className={`w-full rounded-lg bg-gray-50 p-4 text-black ${
                    errors.complement ? 'border-2 border-red-500' : ''
                  }`}
                />
              )}
            />
            {errors.complement && (
              <Text className="mt-1 text-sm text-red-500">{errors.complement.message}</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CompanyData;
