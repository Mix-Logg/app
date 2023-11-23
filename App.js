import React, { useState } from 'react';
import { View, Image } from 'react-native';
import AllRoutes from './router';
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from '@expo-google-fonts/roboto';
import 'react-native-gesture-handler';
 
export default function App() {
  const [count, setCount] = useState(false);

  const delayLogo = () => {
    setTimeout(() => {
      setCount(true);
    }, 3000); // Atraso de 3000 milissegundos (3 segundos)
  };

  delayLogo();

  let [fontsLoaded] = useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      >
        <Image
          style={{
            width: 287,
            height: 283,
          }}
          source={require('./img/logo/logoSemArco.png')}
        />
      </View>
    );
  }

  return count ? <AllRoutes /> : (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Image
        style={{
          width: 287,
          height: 283,
        }}
        source={require('./img/logo/logoSemArco.png')}
      />
    </View>
  );
}
