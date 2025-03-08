import ItemRegister from '@components/RegisterServices/ItemRegister';
import Register from '@components/RegisterServices/Register';
import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native';
import RegisterApi from './../service/registerServices'
import Modal from "~/components/Template/Modal"
import AsyncStorage from '@react-native-async-storage/async-storage';
const jwt_decode = require('jwt-decode');

type PropsAPI = {
  titulo: string
  valor: number,
  id: number,
  descricao: string
}

const registerServices = () => {
  const [services, setServices] = useState<PropsAPI[]>([])
  const [modal, setModal] = useState(false)
  const [dataService, setDataService] = useState<PropsAPI>()
  const [editService, setEditService] = useState<PropsAPI>()
  const [removeService, setRemoveService] = useState<boolean>(false)
  const [userPK, setUserPK] = useState<string>('') 

  const fetchAPI = async () => {
    const instance = new RegisterApi.GetRegister(userPK)

    const servicesData = await instance.execute()

    setServices(servicesData)
  }

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          // @ts-ignore
          const tokenDecoded: any = jwt_decode(token);
          const pk = String(tokenDecoded?.id);
          console.log(pk, 'pkjkkkkkkkkkk')
          setUserPK(pk);
        }
      } catch (error) {
        console.error("Erro ao decodificar o token:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if(userPK) {
      fetchAPI()
    }
  }, [removeService, userPK])

  return (
    <SafeAreaView>
      {
        modal ?
          <Modal handleCloseModal={setModal} dataService={dataService} />
          :
          <View className='p-[20px]'>
            <Text className='text-[1.7rem] font-medium'>Cadastrar Serviços</Text>

            <Register remove={removeService} editService={editService} setServices={setServices} setModal={setModal} dataService={setDataService} />

            <ScrollView className='h-[37vh]'>
              <View className='gap-[10]'>

                {
                  services.length > 0 ?
                    services.map((data: PropsAPI, i) => (<ItemRegister status={removeService} removeService={setRemoveService} companyId={userPK} editService={setEditService} title={data.titulo} value={data.valor} description={data.descricao} id={data.id} key={data.id} />))
                    : <Text>Ops... Não há serviços cadastrados!</Text>
                }
              </View>
            </ScrollView>

          </View>
      }
    </SafeAreaView>
  )
}

export default registerServices