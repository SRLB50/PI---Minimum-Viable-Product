import Dashboard from "@components/Home/Dashboard";
import Header from "@components/Home/Header";
import Servico from "@components/Home/Servico";
import { View, Text, ScrollView } from "react-native";

type ServicesProps = {
  status: string
  cliente: string
  data: string
  endereco: string
  titulo: string
}

type HomePrestadorProps = {
    services: ServicesProps[]  // ✅ Agora aceita um array dinâmico
}

const HomePrestador = ({services}: HomePrestadorProps) => {
  return (
    <View className="container flex-1 bg-[#EDEDED]">
      <Header name="Jean" />

      <View className="p-[25px] ">
        <View className="flex-row justify-between">
          <Dashboard value="4" description="Serviços para Hoje" bg="bg-[#7FCCFF]" />

          <Dashboard value="30" description="Atendidos no mês" bg="bg-[#2C2C2C]" />
        </View>

        <View className="my-[25]">
          <Text className="text-[1.8rem] font-medium text-[#2C2C2C]">Serviços</Text>
          <ScrollView className="h-[400] mt-[5]">

            {
              services.map((services, i) => (<Servico
                status={services.status}
                cliente={services.cliente}
                data={services.data}
                endereco={services.endereco}
                titulo={services.titulo}
                key={i}
              />))
            }
            
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default HomePrestador