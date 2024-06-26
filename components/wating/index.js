import React from "react";
import { ActivityIndicator, View, Text, Image } from "react-native";

export default function Wating() {
  const Primary = require('../../img/logo/logoAsa.png');
  return (
    <View className="flex-1 justify-center items-center">
      <View className="justify-center items-center">
        <Image className="absolute h-4 w-4" source={Primary} />
        <ActivityIndicator size="large" color="#FF5F00" className="" />
      </View>
      <Text className="text-neutral-400 font-medium text-center mt-2 text-xs">
        Aguarde...
      </Text>
    </View>
  );
}
