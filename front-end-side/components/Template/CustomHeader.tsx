import React from 'react'
import { Image, View } from 'react-native'

// @ts-ignore
import Logo from '../../assets/Logo.png'


const Header = () => {
  return (
          <View className="bg-bgHeader h-60 rounded-b-[50px] justify-end pb-16">
            <View className="items-center">
              <Image 
                source={Logo}
                className='scale-125'  
              />
            </View>
          </View>
  )
}

export default Header
