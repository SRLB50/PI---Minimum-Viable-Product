import Dashboard from "@components/Home/Dashboard"
import Header from "@components/Home/Header"
import { View, Text } from "react-native"

const home = () => {
  return (
    <View className="container flex-1 bg-white">
      <Header name="Jean" />

      <View className="p-[25px] flex-row justify-between">
        <Dashboard value="4" description="Serviços para Hoje" bg="bg-[##7FCCFF]" />
        
        <Dashboard value="30" description="Atendidos no mês" bg="bg-[#2C2C2C]" />
      </View>
    </View>
  )
}

export default home