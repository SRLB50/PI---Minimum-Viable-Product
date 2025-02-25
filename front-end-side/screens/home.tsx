import Dashboard from "@components/Home/Dashboard";
import Header from "@components/Home/Header";
import Servico from "@components/Home/Servico";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const home = () => {

  const services = [
    {
      status: "Finalizado",
      cliente: "Isaque Viana",
      data: "25/02/2025 15:00",
      endereco: "Rua Ermelina, São Paulo - SP",
      titulo: "Arrumar Encanamento"
    },
    {
      status: "Pendente",
      cliente: "João Estevão",
      data: "25/02/2025 15:00",
      endereco: "Rua José, São Paulo - SP",
      titulo: "Pintar Parede"
    },
    {
      status: "Cancelado",
      cliente: "Andressa Nunes",
      data: "25/02/2025 17:00",
      endereco: "Rua Pereira, São Paulo - SP",
      titulo: "Trocar Chuveiro"
    },
    {
      status: "Cancelado",
      cliente: "André Vieira",
      data: "25/02/2025 10:00",
      endereco: "Rua Osmar, São Paulo - SP",
      titulo: "Troca de Pia"
    },
  ]

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

export default home