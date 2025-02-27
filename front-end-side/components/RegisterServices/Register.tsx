import { Controller, useForm } from "react-hook-form"
import { Text, View, TextInput, TouchableOpacity } from "react-native"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const registerSchema = z.object({
    serviceType: z.string().min(1, "Tipo de Serviço é Obrigatório").max(40, "Serviço Inválido"),
    serviceValue: z.number().min(3, 'Valor do Serviço é Obrigatório').max(4, "Valor inválido!").positive('Valor inválido!')
})

type ServicesFormData = z.infer<typeof registerSchema>

const Register = () => {

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<ServicesFormData>(
        {
            resolver: zodResolver(registerSchema),
            defaultValues: {
                serviceType: '',
                serviceValue: 0
            }
        }
    )

    return (
        <View className="bg-white h-[170px] p-[15] my-[25] rounded-[10px] gap-[10px]">
            <View>
                <Text className="text-[#8D8D8D] text-[0.9rem]">Tipo de Serviço</Text>
                <Controller
                    name="serviceType"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            value={value}
                            onChangeText={onChange}
                            placeholder="Digite o tipo de serviço"
                            placeholderTextColor="#A0A0A0"
                            className={`w-full px-[2] py-[5] text-black text-[1.4rem] font-medium `}
                        />
                    )} />
            </View>

            <View>
                <Text className="text-[#8D8D8D] text-[0.9rem]">Valor</Text>
                <Controller
                    name="serviceValue"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            keyboardType="numeric"
                            placeholder="Digite um valor"
                            placeholderTextColor="#A0A0A0"
                            className={`w-full px-[2] py-[5] text-black text-[1.4rem] font-medium `}
                        />
                    )} />
            </View>
            <View>
                <TouchableOpacity className="bg-[#78CA25] w-[150] p-[5] rounded-[10px] flex-row justify-center items-center">
                    <Text className="text-[#FFF]">Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Register