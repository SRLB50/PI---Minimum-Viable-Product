import react, { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from "~/types/types";
import { HeaderButton } from '../components/Template/HeaderButton';
import { TabBarIcon } from '../components/Template/TabBarIcon';
import home from '~/screens/home';
import Profile from '~/screens/profile';
import registerServices from '~/screens/registerServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import myServices from '~/screens/myServices';


const Tab = createBottomTabNavigator();

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export default function TabLayout({ navigation }: Props) {

  const [isCompany, setIsCompany] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchCompanyData = async () => {
      const empresa = await AsyncStorage.getItem('empresa');
      setIsCompany(empresa == 'true');
    };

    fetchCompanyData();
  }, []);


  useEffect(() => {
    const fetchCompanyData = async () => {
      const empresa = await AsyncStorage.getItem('empresa');
      setIsCompany(empresa == 'true');
    };

    fetchCompanyData();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      <Tab.Screen
        name='home'
        component={home}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
          tabBarShowLabel: false
        }}
      />
      <Tab.Screen
        name='schedule'
        component={myServices}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="calendar" color={color} />,
          headerShown: false,
          tabBarShowLabel: false
        }}
      />
      {
        isCompany && (
          <Tab.Screen
            name='register-services'
            component={registerServices}
            options={{
              tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
              headerShown: false,
              tabBarShowLabel: false
            }}
          />
        )
      }
      <Tab.Screen
        name='profile'
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerShown: false,
          tabBarShowLabel: false
        }}
      />
    </Tab.Navigator>
  );
}
