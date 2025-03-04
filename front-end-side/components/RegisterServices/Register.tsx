import { Controller, useForm } from "react-hook-form"
import { Text, View, TextInput, TouchableOpacity } from "react-native"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import RegisterApi from './../../service/registerServices'
import React, { useEffect, useState } from "react"

const registerSchema = z.object({
    serviceType: z.string().min(1, "Tipo de Serviço é Obrigatório").max(40, "Serviço Inválido"),
    serviceDescription: z.string().min(1, "Descreva o serviço").max(60, "Descrição Inválido"),
    serviceValue: z.string().min(2, 'Valor do Serviço é Obrigatório').max(4, "Valor inválido!")
})

type BodyServices = {
    titulo: string
    descricao: string
    valor: number
    idUser: string
}

type ServicesFormData = z.infer<typeof registerSchema>

type ServiceType = {
    titulo: string
    valor: number
    id : number
    descricao : string
};


type SetServicesProps = {
    setServices: React.Dispatch<React.SetStateAction<ServiceType[]>>
    dataService: React.Dispatch<React.SetStateAction<ServiceType | undefined>>
    setModal: React.Dispatch<React.SetStateAction<boolean>>,
    editService : ServiceType | undefined
};

const Register = ({ setServices, setModal, dataService, editService }: SetServicesProps) => {

    const userPK = "00.981.551/0001-88"

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        register
    } = useForm<ServicesFormData>(
        {
            resolver: zodResolver(registerSchema),
            defaultValues: {
                serviceType: '',
                serviceValue: '',
                serviceDescription: ''
            }
        }
    )

    const [edit, setEdit] = useState<ServiceType>()
    const [hasEdit, setHasEdit] = useState<boolean>(false)

    
    useEffect(() => {
        
        if (!['', undefined, null].includes(editService?.descricao)) {
            setHasEdit(true)
            setEdit(editService)
            
            setValue("serviceDescription", editService?.descricao == undefined ? "" : editService?.descricao)
            setValue("serviceType", editService?.titulo == undefined ? "" : editService?.titulo)
            setValue("serviceValue", editService?.valor == undefined ? '0' : String(editService?.valor))
        }else{
            setHasEdit(false)
        }
        
    }, [editService])

    const submitService = handleSubmit(async () => {

        const {
            serviceType,
            serviceValue,
            serviceDescription
        } = control._formValues

        if ([serviceType, serviceValue, serviceDescription].includes("")) {
            return false
        }

        const body: BodyServices = {
            titulo: serviceType,
            descricao: serviceDescription,
            valor: serviceValue,
            idUser: userPK
        }

        const instance = new RegisterApi.RegisterServices(body)

        const registerServices = await instance.execute()

        const successRegister = registerServices.success

        if(successRegister)  {
            fetchAPI()
            control._reset()
            setModal(true)
            dataService(registerServices)
            setHasEdit(false)
            setEdit({
                titulo: "",
                valor: 0,
                id : 0,
                descricao : ""
            })
        }
        else {
            alert("Erro ao cadastrar serviço!")
        }
    })

    const updateService = handleSubmit(async () => {
        console.log('atualizando')
        const {
            serviceType,
            serviceValue,
            serviceDescription
        } = control._formValues

        const id = edit?.id
        console.log(id)
        if ([serviceType, serviceValue, serviceDescription].includes("")) {
            return false
        }

        if (id == 0 || id == undefined) {
            return false
        }
        const body: BodyServices = {
            titulo: serviceType,
            descricao: serviceDescription,
            valor: serviceValue,
            idUser: userPK
        }

        const instance = new RegisterApi.UpdateService(body, id)

        const registerServices = await instance.execute()

        const successRegister = registerServices.success

        if(successRegister)  {
            fetchAPI()
            control._reset()
            setHasEdit(false)
            setEdit({
                titulo: "",
                valor: 0,
                id : 0,
                descricao : ""
            })
            alert(registerServices.message)
        }
        else {
            alert("Erro ao cadastrar serviço!")
        }
        
    })

    const clearEdit = () => {
        setHasEdit(false)
        control._reset()
        setEdit({
            titulo: "",
            valor: 0,
            id : 0,
            descricao : ""
        })
    }

    const fetchAPI = async () => {
        const instance = new RegisterApi.GetRegister(userPK)

        const servicesData = await instance.execute()

        setServices(servicesData)
    }


    return (
        <View className="bg-white h-[280px] p-[15] my-[25] rounded-[10px] gap-[10px] justify-between">
            <View>
                <Text className="text-[#8D8D8D] text-[0.9rem]">Tipo de Serviço</Text>
                <Controller
                    name="serviceType"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            value={value}
                            {...register("serviceType")}
                            onChangeText={onChange}
                            placeholder="Digite o tipo de serviço"
                            placeholderTextColor="#A0A0A0"
                            className={`w-full px-[2] py-[5] text-black text-[1.3rem] radius-5 font-medium ${errors.serviceType ? "border-1 border-red-500" : ""}`}
                        />
                    )} />
                {errors.serviceType && (
                    <Text className="text-red-500 text-sm">
                        {errors.serviceType.message}
                    </Text>
                )}
            </View>

            <View>
                <Text className="text-[#8D8D8D] text-[0.9rem]">Valor</Text>
                <Controller
                    name="serviceValue"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            {...register("serviceValue")}
                            value={value}
                            onChangeText={onChange}
                            keyboardType="numeric"
                            placeholder="Digite um valor"
                            placeholderTextColor="#A0A0A0"
                            className={`w-full px-[2] py-[5] text-black text-[1.3rem] radius-5 font-medium ${errors.serviceValue ? "border-1 border-red-500" : ""}`}
                        />
                    )} />

                {errors.serviceValue && (
                    <Text className="text-red-500 text-sm">
                        {errors.serviceValue.message}
                    </Text>
                )}
            </View>

            <View>
                <Text className="text-[#8D8D8D] text-[0.9rem]">Descrição do Serviço</Text>
                <Controller
                    name="serviceDescription"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                        {...register("serviceDescription")}
                            value={value}
                            onChangeText={onChange}
                            placeholder="Descreva o serviço"
                            placeholderTextColor="#A0A0A0"
                            className={`w-full px-[2] py-[5] text-black text-[1.3rem] radius-5 font-medium ${errors.serviceDescription ? "border-1 border-red-500" : ""
                                }`}
                        />
                    )}
                />

                {errors.serviceDescription && (
                    <Text className="text-red-500 text-sm">
                        {errors.serviceDescription.message}
                    </Text>
                )}
            </View>
            <View className="flex-row gap-[5]">
                <TouchableOpacity className="bg-[#78CA25] w-[150] p-[5] rounded-[10px] flex-row justify-center items-center" onPress={hasEdit ? updateService : submitService}>
                    <Text className="text-[#FFF]">Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#2C2C2C] w-[150] p-[5] rounded-[10px] flex-row justify-center items-center" onPress={clearEdit}>
                    <Text className="text-[#FFF]">Limpar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Register