import Dashboard from "@components/Home/Dashboard";
import Header from "@components/Home/Header";
import Servico from "@components/Home/Servico";
import { View, Text, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ScheduledServices from './../../service/registerScheduledService'

type Services = {
  status: string
  id : number
  cliente: {
    nome : string
    cpf : string
  }
  data: string
  servico : {
    titulo : string
  }
  endereco: string
  titulo: string
}

const HomePrestador = () => {
  const [name, setName] = useState<string | null>(null)
  const [userPK, setUserPK] = useState<string | null>(null)
  const [services, setServices] = useState<Services[]>([])

  useEffect(() => {
    const fetchCompanyData = async () => {
      const nome = await AsyncStorage.getItem('nome');
      const cnpj = await AsyncStorage.getItem("userKey")

      setName(nome != null ? nome.split(' ')[0] : nome);
      setUserPK(cnpj)
    };

    fetchCompanyData();

    getMyServicesScheduledToday()
  }, []);



  const getMyServicesScheduledToday = async () => {
    const instance = new ScheduledServices.GetScheduledServices(userPK)

    const servicesToday = await instance.execute()

    servicesToday.success ? setServices(servicesToday.dataResult) : setServices([])
  }

  return (
    <View className="container flex-1 bg-[#EDEDED]">
      <Header name={name} />

      <View className="p-[25px] ">
        <View className="flex-row justify-between">
          <Dashboard value="4" description="Serviços para Hoje" bg="bg-[#7FCCFF]" />

          <Dashboard value="30" description="Atendidos no mês" bg="bg-[#2C2C2C]" />
        </View>

        <View className="my-[25]">
          <Text className="text-[1.8rem] font-medium text-[#2C2C2C]">Serviços</Text>
          <ScrollView className="h-[400] mt-[5]">

            {
              services.length > 0 ?
                services.map((services, i) => (<Servico
                  status={''}
                  cliente={services.cliente.nome}
                  data={services.data}
                  endereco={services.endereco}
                  titulo={services.servico.titulo}
                  key={i}
                />)) : <Text>Ops... Sua agenda está vazia hoje.</Text>
            }

          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default HomePrestador