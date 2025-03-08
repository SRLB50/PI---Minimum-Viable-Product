import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { BackHandler } from 'react-native';
import { RootStackNavigationProp } from '~/types/types';

export const useBackHandler = (showProfile: boolean ) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if(!showProfile){
          showProfile = true;
        }else{
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            BackHandler.exitApp();
          }
          return true;
        };
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      
    }, [navigation , showProfile])
  );
};
