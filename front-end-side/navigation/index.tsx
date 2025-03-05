import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import TabNavigator from './tab-navigator';
import Modal from '../screens/modal';
import Login from '../screens/login';
import Cadastro from '../screens/cadastro';
import { RootStackParamList } from '~/types/types';
import { AuthProvider, useAuth } from '~/context/AuthContext';

const Stack = createStackNavigator<RootStackParamList>();

function RootStack() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator>
      {
        isAuthenticated ? (
          <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        ) : 
        (
          <>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" component={Cadastro} options={{ headerShown: false }} />
          </>
        )
      }

      <Stack.Screen
        name="Modal"
        component={Modal}
        options={{ presentation: 'modal', headerLeft: () => null }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </AuthProvider>
  );
}
