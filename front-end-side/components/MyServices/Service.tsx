import { useState, useEffect } from 'react';
import Servico from '@components/Home/Servico';
import { View , Text , ScrollView } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

type ServicesProps = {
    status: string
    cliente: string
    data: string
    endereco: string
    titulo: string
  }
  
  type HomePrestadorProps = {
      services: ServicesProps[]
  }
  
const MyServices = ({services}: HomePrestadorProps) => {

  const [isCompany, setIsCompany] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchCompanyData = async () => {
      const empresa = await AsyncStorage.getItem('empresa');
      setIsCompany(empresa == 'true');
    };

    fetchCompanyData();
  }, []);

  return (
    <View className='p-7 bg-bgMyServices'>
        <Text className="text-[30px] font-medium text-[#2C2C2C] mb-6 mt-10 font-inter">
          {isCompany ? "Meus Serviços" : "Meus agendamentos"}
        </Text>
         <ScrollView className="h-[400] mt-[5]">
            {
                services.map((services, i) => (<Servico
                status={services?.status}
                cliente={services?.cliente}
                data={services?.data}
                endereco={services?.endereco}
                titulo={services?.titulo}
                key={i}
                />))
            }
        </ScrollView>

    </View>
  );
};

export default MyServices;