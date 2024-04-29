import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import InputMask from "react-native-mask-input";
import { default as Mask } from "../../utils/custom/input-mask";
import { Ionicons } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

const Input = ({
  type = "text",
  placeholder = "",
  textColor = "text-terciary",
  border = "border border-neutral-300",
  value,
  width = "w-full",
  height = "",
  padding = "px-3 py-2",
  maxLength,
  readonly = false,
  label,
  onChangeText,
  maskType,
  secureTextEntry,
  messageError,
  hasError = false,
  space = "mb-4",
  hasLowerCase 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <View className={`${space} flex flex-col gap-2`}>
      {label && (
        <Text className="text-sm font-medium text-primary">{label}</Text>
      )}
      <InputMask
        readOnly={readonly}
        maxLength={maxLength}
        value={value}
        mask={maskType}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword && secureTextEntry}
        placeholder={placeholder}
        keyboardType={type === "number" ? "numeric" : "default"}
        className={`${width} ${height} ${padding} ${textColor} ${hasLowerCase ? "lowercase": ""}   items-center flex bg-neutral-100 font-medium transition duration-300 ease-in-out ${border} rounded-md placeholder-terciary focus:border-primary
        ${hasError ? border + " border-red-400" : border}`}
      />
      {hasError && messageError && (
        <Text className="ml-3 mt-1 text-red-400 text-xs font-light">
          {messageError}
        </Text>
      )}
      {secureTextEntry && (
        <TouchableOpacity
          className="absolute top-9 right-0 opacity-70"
          onPress={toggleShowPassword}
        >
          <Ionicons
            name={showPassword ? "eye-off-sharp" : "eye-sharp"}
            size={22}
            color='#FF5F00'
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;