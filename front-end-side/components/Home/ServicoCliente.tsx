import { useEffect, useState } from "react"
import { Text, TouchableOpacity, View, Linking } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';

type ServicoProps = {
    titulo: string
    prestador: string
    telefone : string
    valor : string
    nomeCliente : string
}


const ServicoCliente = ({ titulo, prestador, telefone, valor, nomeCliente }: ServicoProps) => {
    
    const clickWhatsapp = () => {
        const message = `Olá ${prestador}, tudo bem? Me chamo ${nomeCliente} e tenho interesse no seu serviço de ${titulo}, com o valor aproximado de R$ ${valor}, podemos negociar?`

        const url = `https://wa.me/55${telefone}?text=${message}`
        Linking.openURL(url)
        .then(data => console.log("Whats Aberto"))
        .catch(err => console.error(err))

    }

    return (
        <View className="bg-[#FFFFFF] p-[10] rounded-[15] my-[10] flex-row justify-between items-center h-[100]">
            <View className="gap-[6]">
                <Text className="text-[1.4rem] font-medium">{titulo}</Text>
                <Text className="text-[#8D8D8D] text-[1rem]">
                    <FontAwesome name="user" color={"#8D8D8D"} /> {prestador}
                </Text>
                <Text className="text-[#8D8D8D] text-[1rem] font-medium">
                    R$ {valor} aproximado
                </Text>
            </View>
            <View className="items-center gap-[5] justify-center">
                <TouchableOpacity onPress={clickWhatsapp}>
                    <FontAwesome name="whatsapp" size={45} color={"#25D366"} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ServicoCliente