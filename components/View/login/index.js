import twrnc from 'twrnc';
import { View, StyleSheet, Image,Text ,TextInput, Pressable  } from 'react-native';

export default function Login({navigation}){

    return(
        <View style={[twrnc`flex items-center  justify-center h-full `]} >
            
            <View style={[twrnc`flex w-full items-center mt-3`,{height:'20%'} ]}>
                <Image style={[twrnc``, {width:'45%', height:'90%',} ] }
                source={require('../../../img/logo/logoAsa.png')}
                />
            </View>

            <View style={twrnc`w-full gap-5`}>
                <View style={twrnc`px-5`}>
                    <Text style={twrnc`text-[#FF5F00] font-bold text-sm px-4`}>CPF / CNPJ</Text>
                    <View style={twrnc`w-full border-2 border-[#FF5F00] rounded-xl flex flex-row items-center p-2`}>
                        <Image
                            style={[twrnc``, {width:'7%', height:'55%',tintColor: '#FF5F00'}]}
                            source={require('../../../img/icons/user.png')}/>
                        <TextInput style={twrnc`p-2 w-full text-lg`}
                            keyboardType="numeric"
                        /> 
                    </View>
                </View>

                <View style={twrnc`px-5`}>
                    <Text style={twrnc`text-[#FF5F00] font-bold text-sm px-4`}>Senha</Text>
                    <View style={twrnc`w-full border-2 border-[#FF5F00] rounded-xl flex flex-row items-center p-2`}>
                        <Image
                            style={[twrnc``, {width:'7%', height:'55%',tintColor: '#FF5F00'}]}
                            source={require('../../../img/icons/senha.png')}/>
                        <TextInput style={twrnc`p-2 w-full text-lg`}
                            secureTextEntry
                        />
                    </View>
                </View>
            </View>

            <View style={twrnc`flex w-3/6 mt-10 gap-5`}>
                {/* ENTRAR */}
                <Pressable style={twrnc`bg-[#FF5F00] font-bold flex justify-center flex-row py-5 rounded-lg`}>
                    <Text style={twrnc`font-bold text-white`}>
                        Entrar
                    </Text>
                </Pressable>
                {/* CADASTRAR  */}
                <Pressable style={twrnc`border-2 border-[#FF5F00] font-bold flex justify-center flex-row py-5 rounded-lg`}
                    onPress={()=>{navigation.navigate('Register')}}
                    >
                    <Text style={twrnc`font-bold text-[#FF5F00]`}>Não sou cadastrado</Text>
                </Pressable>
                {/* ESQUECI A SENHA */}
                <Pressable style={twrnc`items-center`}>
                    <Text style={twrnc`font-bold text-[#FF5F00]`}>Esqueci minha senha</Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
        alignItems:'center',
        padding:16
    },
    logo:{
        width:211,
        height:209,
        marginTop:35
    },
    containerInputs:{
        flexDirection:'column',
        width:'100%'
    },
    containerInputs:{
        width:'100%',
    },
    input:{
        width: '100%',
        borderWidth: 2,
        borderColor:'#FF5F00',
        borderRadius: 5,
        height:50,
        paddingStart: 50
    },
    icon:{
        tintColor: '#FF5F00',
        width:35,
        height:35,
        position:'absolute',
        top:27,
        left: 8
    },
    textInput:{
        color:'#FF5F00',
        fontFamily:'Roboto_500Medium'
    },
    defaultButtons:{
        width:250,
        height:70,
        borderRadius: 5,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:15
    },
    logoNome:{
        width:300,
        height:80
    },
    containerLogo:{
        justifyContent:'center',
        alignItems:'center'
    }
})