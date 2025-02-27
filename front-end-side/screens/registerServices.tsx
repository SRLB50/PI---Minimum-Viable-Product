import ItemRegister from '@components/RegisterServices/ItemRegister';
import Register from '@components/RegisterServices/Register';
import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native';

const registerServices = () => {
  return (
    <SafeAreaView>
        <View className='p-[20px]'>
            <Text className='text-[1.7rem] font-medium'>Cadastrar Serviços</Text>

            <Register />

            <ItemRegister title='Pintura' value={100} />
        </View>
    </SafeAreaView>
  )
}

export default registerServices