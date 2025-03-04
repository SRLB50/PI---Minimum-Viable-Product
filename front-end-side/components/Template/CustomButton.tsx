import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  text: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onPress, ...props}) => {
  return (
    <TouchableOpacity 
      className='bg-darkButton p-4 rounded-xl mt-5'
      onPress={onPress}
      {...props}
    >
        <Text className='text-center font-inter text-xl color-darkButtonText'>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;