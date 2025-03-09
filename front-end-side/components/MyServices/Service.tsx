import Servico from '@components/Home/Servico';
import { View , Text , ScrollView } from 'react-native';

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

  return (
    <View className='p-7 bg-bgMyServices'>
        <Text className="text-[30px] font-medium text-[#2C2C2C] mb-6 mt-10 font-inter">Meus Serviços</Text>
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
  );
};

export default MyServices;