import Header from "@components/Home/Header";
import { View, Text, ScrollView } from "react-native";
import ServicoCliente from "./ServicoCliente";

const HomeCliente = () => {
    return (
        <View className="container flex-1 bg-[#EDEDED]">
            <Header />

            <View className="p-[25px] ">
                <View className="my-[25]">
                    <Text className="text-[1.8rem] font-medium text-[#2C2C2C]">Serviços</Text>
                    <ScrollView className="h-[400] mt-[5]">
                        <ServicoCliente prestador="João Vieira" telefone="11954776404" titulo="Arrumar Encanamento" valor="160,00" nomeCliente="José" />
                        <ServicoCliente prestador="Michel Kruger" telefone="53999254275" titulo="Pintor de Parede" valor="200,00" nomeCliente="José" />
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default HomeCliente