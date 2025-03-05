import React from 'react';
import { TextInput, Text, View } from 'react-native';
import { Controller } from 'react-hook-form';
import { KeyboardTypeOptions } from 'react-native';

interface InputFieldProps {
  control: any;
  name: string;
  placeholder: string;
  errors: any;
  keyboardType?: KeyboardTypeOptions;
}

const InputField: React.FC<InputFieldProps> = ({
  control,
  name,
  placeholder,
  errors,
  keyboardType = 'default',
}) => {
  return (
    <View className="mb-6">
      <Text className="mb-2 text-base font-normal text-gray-700">{placeholder}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor="#A0A0A0"
            className={`w-full rounded-lg bg-gray-50 p-4 text-black ${errors[name] ? 'border-2 border-red-500' : ''}`}
            keyboardType={keyboardType}
          />
        )}
      />
      {errors[name] && <Text className="mt-1 text-sm text-red-500">{errors[name].message}</Text>}
    </View>
  );
};

export default InputField;
