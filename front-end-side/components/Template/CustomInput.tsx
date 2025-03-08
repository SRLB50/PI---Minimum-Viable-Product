import React from 'react';
import { Controller, Control, RegisterOptions, useForm } from 'react-hook-form';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface CustomInputProps extends TextInputProps {
    label: string;
    className?: string;
    name: string;
    control: Control<any>;
    rules?: RegisterOptions;
    secureTextEntry?: boolean;
    disabled?: boolean
}

const CustomInput: React.FC<CustomInputProps> = ({ 
    label, 
    className, 
    name, 
    control, 
    rules,
    secureTextEntry,
    disabled,
    ...props 
}) => {

  const {register , watch} = useForm();
  const emptyInput = watch(name);

  return (
    <View className={`mb-5 ${className}`}>
        <Text className='font-inter font-normal text-xl color-inputLabelText mb-3'>
            {label}
        </Text>
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <>
              <TextInput
                  {...register(name)}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={secureTextEntry}
                  editable={!disabled}
                  className={`text-xl border border-inputBorder rounded-xl px-4 py-2 ${emptyInput ? ' color-inputText' : 'color-inputLabelText'} ${disabled && "bg-gray-300"}`}
                  {...props}
              />
              {error && (
                <Text className='text-red-500 mt-1 text-sm'>{error.message}</Text>
              )}
            </>
          )}
        />
    </View>
  );
};

export default CustomInput;