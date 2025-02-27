import { TabBarIcon } from '@components/Template/TabBarIcon'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

type ItemRegisterProps = {
    title: string
    value: number
}

const ItemRegister = ({ title, value }: ItemRegisterProps) => {
    const [formattValue, setFormattValue] = useState('')

    useEffect(() => {
        const newValue = new Intl.NumberFormat('pt-bt', {
            style: "currency",
            currency: "BRL"
        }).format(value)

        setFormattValue(newValue)
    }, [])
    return (
        <View className='flex-row justify-between items-center p-[15] bg-white rounded-[10px] '>
            <View className='w-[85%]'>
                <View>
                    <Text className="text-[#8D8D8D] text-[0.9rem]">Tipo de Serviço</Text>
                    <Text className="py-[5] text-black text-[1.4rem] font-medium">{title}</Text>
                </View>
                <View>
                    <Text className="text-[#8D8D8D] text-[0.9rem]">Valor</Text>
                    <Text className="py-[5] text-black text-[1.4rem] font-medium">{formattValue}</Text>
                </View>
            </View>
            <View className='justify-center items-center gap-5 w-[15%]'>
                
                <TouchableOpacity>
                    <TabBarIcon name='pencil-square-o' color='#FFAF30' />
                </TouchableOpacity>

                <TouchableOpacity>
                    <TabBarIcon name='trash-o' color='#FF4747' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ItemRegister