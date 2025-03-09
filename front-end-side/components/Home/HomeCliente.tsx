import Header from "@components/Home/Header";
import { View, Text, ScrollView } from "react-native";
import ServicoCliente from "./ServicoCliente";
import { useEffect, useState } from "react";
import registerServices from "~/service/registerServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

type EmpresaAPI = {
    nome: string
    telefone: string
}
type ServiceAPI = {
    titulo: string
    valor: number,
    id: number,
    empresa: EmpresaAPI
}

const HomeCliente = () => {
    const [services, setServices] = useState<ServiceAPI[]>([])

    const [name, setName] = useState<string | null>(null)

    useEffect(() => {
        const fetchCompanyData = async () => {
            const nome = await AsyncStorage.getItem('nome');
            setName(nome);
        };

        fetchCompanyData();

        
        getAllServices()
    }, []);


    const getAllServices = async () => {
        const instance = new registerServices.GetAllServices()

        const allServices = await instance.execute()

        console.dir(allServices)
        allServices.success ? setServices(allServices.dataResult) : setServices([])
        
    }

    return (
        <View className="container flex-1 bg-[#EDEDED]">
            <Header name={name}/>

            <View className="p-[25px] ">
                <View className="my-[25]">
                    <Text className="text-[1.8rem] font-medium text-[#2C2C2C]">Serviços</Text>
                    <ScrollView className="h-[500px] mt-[5]">
                        {
                            services ? 
                            services.map((data, i) => (
                                <ServicoCliente 
                                    prestador={data.empresa.nome} 
                                    telefone={data.empresa.telefone} 
                                    titulo={data.titulo} 
                                    valor={data.valor} 
                                    nomeCliente={name} 
                                    key={i}
                                />
                            )) 
                            : <Text>Não há serviços cadastrados</Text>
                        }
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default HomeCliente