import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from "~/types/types";
import { HeaderButton } from '../components/Template/HeaderButton';
import { TabBarIcon } from '../components/Template/TabBarIcon';
import home from '~/screens/home';
import Profile from '~/screens/profile';
import registerServices from '~/screens/registerServices';

const Tab = createBottomTabNavigator();

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export default function TabLayout({ navigation }: Props) {
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
        name='register-services'
        component={registerServices}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="gear" color={color} />,
          headerShown: false,
          tabBarShowLabel: false
        }}
      />
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
