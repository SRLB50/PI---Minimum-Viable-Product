import { TabBarIcon } from '@components/Template/TabBarIcon'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'


type ServiceType = {
    titulo: string
    valor: number
    id : number
    descricao : string
};

type ItemRegisterProps = {
    title: string
    value: number
    description : string
    id : number
    editService : React.Dispatch<React.SetStateAction<ServiceType | undefined>>
}

const ItemRegister = ({ title, value, description, id, editService }: ItemRegisterProps) => {
    const [formattValue, setFormattValue] = useState('')

    useEffect(() => {
        const newValue = new Intl.NumberFormat('pt-bt', {
            style: "currency",
            currency: "BRL"
        }).format(value)

        setFormattValue(newValue)
    }, [])

    const removeService = (id:number) => {
        console.log(id)
    }

    const handleEditService = ( title:string, value:number, description: string, id: number) => {
        editService({
            titulo : title, 
            valor: value, 
            descricao: description, 
            id: id
        })
    }

    return (
        <View className='flex-row justify-between items-center p-[15] bg-white rounded-[10px] '>
            <View className='w-[85%]'>
                <View>
                    <Text className="text-[#8D8D8D] text-[0.9rem]">Tipo de Serviço</Text>
                    <Text className="py-[5] text-black text-[1.4rem] font-medium">{title}</Text>
                </View>
                <View>
                    <Text className="text-[#8D8D8D] text-[0.9rem]">Descrição</Text>
                    <Text className="py-[5] text-black text-[1rem] font-medium">{description}</Text>
                </View>
                <View>
                    <Text className="text-[#8D8D8D] text-[0.9rem]">Valor</Text>
                    <Text className="py-[5] text-black text-[1.4rem] font-medium">{formattValue}</Text>
                </View>
            </View>
            <View className='justify-center items-center gap-5 w-[15%]'>
                
                <TouchableOpacity onPress={() => handleEditService(title, value, description, id)}>
                    <TabBarIcon name='pencil-square-o' color='#FFAF30' />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => removeService(id)}>
                    <TabBarIcon name='trash-o' color='#FF4747' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ItemRegister