import React, { useEffect, useState } from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Service from "@components/MyServices/Service";

const home = () => {
  const [isCompany, setIsCompany] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchCompanyData = async () => {
      const empresa = await AsyncStorage.getItem('empresa');
      setIsCompany(empresa == 'true');
    };

    fetchCompanyData();
  }, []);

  return (<Service services={servicesAPI()} />)
}

const servicesAPI = () => {
  type ServicesProps = {
    status: string
    cliente: string
    data: string
    endereco: string
    titulo: string
  }

  const services: ServicesProps[] = [
    {
      status: "Finalizado",
      cliente: "Isaque Viana",
      data: "2025-02-25T15:00:00",  // Formato ISO 8601
      endereco: "Rua Ermelina, São Paulo - SP",
      titulo: "Arrumar Encanamento"
    },
    {
      status: "Pendente",
      cliente: "João Estevão",
      data: "2025-02-25T15:00:00",  // Formato ISO 8601
      endereco: "Rua José, São Paulo - SP",
      titulo: "Pintar Parede"
    },
    {
      status: "Cancelado",
      cliente: "Andressa Nunes",
      data: "2025-02-25T17:00:00",  // Formato ISO 8601
      endereco: "Rua Pereira, São Paulo - SP",
      titulo: "Trocar Chuveiro"
    },
    {
      status: "Cancelado",
      cliente: "André Vieira",
      data: "2025-02-25T10:00:00",  // Formato ISO 8601
      endereco: "Rua Osmar, São Paulo - SP",
      titulo: "Troca de Pia"
    },
  ]

  return services
}

export default home