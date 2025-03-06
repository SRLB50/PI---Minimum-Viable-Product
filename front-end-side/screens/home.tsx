import Dashboard from "@components/Home/Dashboard";
import Header from "@components/Home/Header";
import HomeCliente from "@components/Home/HomeCliente";
import HomePrestador from "@components/Home/HomePrestador";
import Servico from "@components/Home/Servico";
import { View, Text, ScrollView } from "react-native";

const home = () => {
  const validateTypeUser:string = "prestador"


  return (validateTypeUser == "prestador" ? <HomePrestador services={servicesAPI()} /> : <HomeCliente />)
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

  return services
}

export default home