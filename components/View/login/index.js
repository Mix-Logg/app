
import { View, StyleSheet, Image,Text ,TextInput, Pressable  } from 'react-native';
export default function Login({navigation}){
    return(
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image style={styles.logo}
                source={require('../../../img/logo/logoSemArco.png')}
                />
                <Image style={styles.logoNome}
                source={require('../../../img/logo/logoNome.png')}
                />
            </View>
            <View style={styles.containerInputs}>
                <View style={[styles.containerInput,{marginBottom:25}]}>
                    <Text style={styles.textInput}>CPF / CNPJ</Text>
                    <Image
                        style={styles.icon}
                        source={require('../../../img/icons/user.png')}/>
                    <TextInput style={styles.input}
                    /> 
                </View>
                <View style={styles.containerInput}>
                    <Text  style={styles.textInput}>Senha</Text>
                    <Image
                        style={styles.icon}
                        source={require('../../../img/icons/senha.png')}/>
                    <TextInput style={styles.input}
                    />
                </View>
            </View>
            <View>
                {/* ENTRAR */}
                <Pressable style={[styles.defaultButtons, {backgroundColor:'#FF5F00'}]}>
                    <Text style={{
                        color:'white',
                        fontFamily:'Roboto_500Medium'
                    }}>Entrar</Text>
                </Pressable>
                {/* CADASTRAR A SENHA */}
                <Pressable style={[styles.defaultButtons, {
                    borderWidth: 2,
                    borderRadius: 5,
                    borderColor:'#FF5F00',}]}
                    onPress={()=>{navigation.navigate('Register')}}
                    >
                    <Text style={styles.textInput}>Não sou cadastrado</Text>
                </Pressable>
                {/* ESQUECI A SENHA */}
                <Pressable style={{
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <Text style={styles.textInput}>Esqueci minha senha</Text>
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