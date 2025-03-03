import ItemRegister from '@components/RegisterServices/ItemRegister';
import Register from '@components/RegisterServices/Register';
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native';
import RegisterApi from './../service/registerServices'

type PropsAPI = {
  titulo: string
  valor: number
}

const registerServices = () => {
  const [services, setServices] = useState<PropsAPI[]>([])

  const userPK = "00.981.551/0001-88"

  const fetchAPI = async () => {
    const instance = new RegisterApi.GetRegister(userPK)

    const servicesData = await instance.execute()

    setServices(servicesData)
  }

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <SafeAreaView>
      <View className='p-[20px]'>
        <Text className='text-[1.7rem] font-medium'>Cadastrar Serviços</Text>

        <Register setServices={setServices} />

        <ScrollView className='h-[37vh]'>
          <View className='gap-[10]'>

            {services.length > 0 ?
              services.map((data: PropsAPI, i) => (<ItemRegister title={data.titulo} value={data.valor} key={i} />))
              : <Text>Ops... Não há serviços cadastrados!</Text>
            }
          </View>
        </ScrollView>

      </View>
    </SafeAreaView>
  )
}

export default registerServices