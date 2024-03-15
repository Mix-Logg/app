import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

//IMPORT VIEWS
import Login from '../components/View/login'
import Register from '../components/View/whoAreYou'
import RegisterContact from '../components/View/registerContact';
import RegisterAddress from '../components/View/registerAddress';
import InfoPhoto from '../components/View/infoPhoto/motoristaAuxiliar';
import infoEmpresaTrans from '../components/View/infoPhoto/empresaTrans';
import upLoadParicero from '../components/View/upLoad/empresaTrans'
import upLoadEntregador from '../components/View/upLoad/motoristaAuxiliar'
import RegisterCar from '../components/View/registerCar'
import upLoadDocCar from '../components/View/upLoad/upLoadDocCar'
import RegistrationStuation from '../components/View/registrationSituation'
import Welcome from '../components/View/welcome'
import Home from '../components/View/Home';
import Profile from '../components/View/profile';
import AvalidPhoto from '../components/View/profile/avalidPhoto';
import RegisterUser from '../components/View/cadastre/registerUser';
import RegisterCarProfile from '../components/View/registerCar/registerCarProfile';
import ChangePassword from '../components/View/changePassword';
import AllAccess from '../components/access/AllAcess';
import Race from '../components/View/race';
import Wallet from '../components/View/wallet';
import History from '../components/View/history';
export default function AllRoutes() {

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={Login}>
            <Stack.Screen name="Login" component={Login} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="Home" component={Home} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: 'transparent', // Define a cor de fundo do cabeçalho
                },
                headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="RegisterUser" component={RegisterUser} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: 'transparent', // Define a cor de fundo do cabeçalho
                },
                headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="AvalidPhoto" component={AvalidPhoto} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: 'transparent', // Define a cor de fundo do cabeçalho
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
                headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="RegisterContact" component={RegisterContact} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="RegisterAddress" component={RegisterAddress} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="InfoPhotoAuMo" component={InfoPhoto} 
            options={{
              title: '', 
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="RegisterUploadEntregador" component={upLoadEntregador} 
            options={{
              title: '', 
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="RegisterCar" component={RegisterCar} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="RegisterCarProfile" component={RegisterCarProfile} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="upLoadDocCar" component={upLoadDocCar} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: false // Exibe o cabeçalho nesta tela
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
             <Stack.Screen name="infoPhotoEmTr" component={infoEmpresaTrans} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: true // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="upLoadParceiro" component={upLoadParicero} 
            options={{
              title: '',  
              headerStyle: {
                  backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                },
                headerShown: true // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="Profile" component={Profile} 
              options={{
                title: '',  
                headerStyle: {
                    backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                  },
                  headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="ChangePassword" component={ChangePassword} 
              options={{
                title: '',  
                headerStyle: {
                    backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                  },
                  headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="AllAccess" component={AllAccess} 
              options={{
                title: '',  
                headerStyle: {
                    backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                  },
                  headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="Wallet" component={Wallet} 
              options={{
                title: '',  
                headerStyle: {
                    backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                  },
                  headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="History" component={History} 
              options={{
                title: '',  
                headerStyle: {
                    backgroundColor: '#FF5F00', // Define a cor de fundo do cabeçalho
                  },
                  headerShown: false // Exibe o cabeçalho nesta tela
              }}
            />
            <Stack.Screen name="Race" component={Race} 
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