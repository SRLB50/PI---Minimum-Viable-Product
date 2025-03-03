import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '.';
import { HeaderButton } from '../components/Template/HeaderButton';
import { TabBarIcon } from '../components/Template/TabBarIcon';
import One from '../screens/one';
import Two from '../screens/two';
import home from '~/screens/home';
import CompanyData from '~/screens/companyData';

const Tab = createBottomTabNavigator();

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export default function TabLayout({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
      }}>
      {/* <Tab.Screen
        name="One"
        component={One}
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => <HeaderButton onPress={() => navigation.navigate('Modal')} />,
        }}
      />
      <Tab.Screen
        name="Two"
        component={Two}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      /> */}
      <Tab.Screen
        name="home"
        component={home}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="CompanyData"
        component={CompanyData}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="briefcase" color={color} />,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
