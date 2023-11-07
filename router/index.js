import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

//IMPORT VIEWS
import Teste from '../components/test'
import Login from '../components/View/login'
import Register from '../components/View/whoAreYou'
import RegisterContact from '../components/View/registerContact';
import RegisterAddress from '../components/View/registerAddress';
import InfoPhoto from '../components/View/infoPhoto/motoristaAuxiliar';
import upLoadEntregador from '../components/View/upLoad/motoristaAuxiliar'
import RegisterCar from '../components/View/registerCar'
import upLoadDocCar from '../components/View/upLoad/upLoadDocCar'
import RegistrationStuation from '../components/View/registrationSituation'
import Welcome from '../components/View/welcome'
//IMPORT VIEWS

export default function AllRoutes() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="Register" component={Register} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: true // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="RegisterContact" component={RegisterContact} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: true // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="RegisterAddress" component={RegisterAddress} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: true // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="InfoPhotoAuMo" component={InfoPhoto} 
            options={{
              title: '', 
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: true // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="RegisterUploadEntregador" component={upLoadEntregador} 
            options={{
              title: '', 
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: true // Exibe o cabeçalho nesta tela
              }}
            />
            {/* <Stack.Screen name="Teste" component={Teste} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: false // Exibe o cabeçalho nesta tela
              }}
            /> */}
            <Stack.Screen name="RegisterCar" component={RegisterCar} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: true // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="upLoadDocCar" component={upLoadDocCar} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: true // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="RegistrationStuation" component={RegistrationStuation} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="Welcome" component={Welcome} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
        </Stack.Navigator>
    </NavigationContainer>
  );
}