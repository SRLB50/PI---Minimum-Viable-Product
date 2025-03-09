import React, { useEffect, useState } from "react";

import Dashboard from "@components/Home/Dashboard";
import Header from "@components/Home/Header";
import HomeCliente from "@components/Home/HomeCliente";
import HomePrestador from "@components/Home/HomePrestador";
import Servico from "@components/Home/Servico";
import { View, Text, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const home = () => {
  const [isCompany, setIsCompany] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchCompanyData = async () => {
      const empresa = await AsyncStorage.getItem('empresa');
      setIsCompany(empresa == 'true');
    };

    fetchCompanyData();
  }, []);

  return (isCompany ? <HomePrestador  /> : <HomeCliente />)
}


export default home