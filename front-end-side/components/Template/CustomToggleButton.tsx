import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface CustomToggleButtonProps {
  label: string;
  firstOptionText: string;
  secondOptionText: string;
  firstOptionSelected: boolean;
  setFirstOptionSelected: (valor:boolean) => void;
}

const CustomToggleButton: React.FC<CustomToggleButtonProps> = ({ label , firstOptionText , secondOptionText , firstOptionSelected , setFirstOptionSelected}) => {
  return (
    <View className='flex mb-5'>
        <Text className='font-inter text-xl color-inputLabelText mb-3'>{label}</Text>
        <View className='flex-row gap-1'>
          <TouchableOpacity 
            onPress={() => setFirstOptionSelected(true)}
            className='w-1/2'>
              <Text className={`${firstOptionSelected ? 'text-xl text-center border rounded-l-xl px-10 py-1 bg-darkButton color-darkButtonText': 'text-xl text-center border rounded-l-xl px-10 py-1'}`}>{firstOptionText}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setFirstOptionSelected(false)}
            className='w-1/2'>
              <Text className={` ${firstOptionSelected ? 'text-xl text-center border rounded-r-xl px-10 py-1': 'text-xl text-center border rounded-r-xl px-10 py-1 bg-darkButton color-darkButtonText'}`}>{secondOptionText}</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default CustomToggleButton;