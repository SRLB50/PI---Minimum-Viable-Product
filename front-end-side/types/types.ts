// types/types.ts
import { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  home: undefined;
  'register-services': undefined;
  profile: undefined;
  profileInfo: undefined; // Definindo a tela profileInfo
};

// Tipo para o RootStackParamList, incluindo o TabNavigator
export type RootStackParamList = {
  Cadastro: undefined;
  Login: undefined;
  TabNavigator: NavigatorScreenParams<TabParamList>; // Usando NavigatorScreenParams para garantir a navegação correta dentro do TabNavigator
  Modal: undefined;
};
