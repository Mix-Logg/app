import { View, Text, Image, StyleSheet, Pressable, Alert } from "react-native"
import { useRoute } from '@react-navigation/native';
import { useState } from "react";
import React, { useEffect } from 'react';
import MaskInput from 'react-native-mask-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox } from 'react-native-elements';
import axios from "axios";
import twrnc from 'twrnc';

export default function RegisterContact({navigation}){
    const URLproduction  = 'https://jellyfish-app-qc69e.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.45:8080/'
    const URL = URLproduction
    
    const [checkPermission, setCheckPermission] = useState(false);
    const [plate, setPlate] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneIsValid, setPhoneIsValid] = useState(null);
    const [email, setEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(null);

    const [motorista, setMotorista] = useState(false);
    const [auxiliar, setAuxiliar] = useState(false);
    const [empresa, setEmpresa] = useState(false);
    const [transportadora, setTransportadora] = useState(false);
   
    const route = useRoute();

    useEffect(() => {
      if (route.params.sou === 'motorista' && !motorista) {
        setMotorista(true);
      } else if (route.params.sou === 'auxiliar' && !auxiliar) {
        setAuxiliar(true);
      } else if (route.params.sou === 'empresa' && !empresa) {
        setEmpresa(true);
      } else if (route.params.sou === 'transportadora' && !transportadora) {
        setTransportadora(true);
      } else {
        console.log('Não foi identificada uma escolha.');
      }
    }, [route.params.sou]);
    
    const handleEmail = (text) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmail(text)
        if(emailRegex.test(text) === false){
            setEmailIsValid(false)
        }else{
            setEmailIsValid(true)
        }
    }

    const handlePlate = (text) =>{
        setPlate(text)
    }

    const handleName = (text) => {
        setName(text)
    }

    const permission = () => {
        setCheckPermission(!checkPermission)
    }

    const access = async () => {
        if(phoneIsValid && emailIsValid && checkPermission && plate && name ){
            const verify = {
                am : route.params.sou === 'motorista' ? 'driver' : '',
                phone : phoneNumber,
                email : email,
            }
            try{
                const res = await axios.get(URL+'auth/'+verify.phone+'/'+verify.email+'/'+verify.am)
                driver = res.data.driver
                if(driver === 'notExist'){
                    navigation.navigate ('RegisterAddress',
                    {
                        sou   : route.params.sou,
                        phone : phoneNumber,
                        email : email,
                        plate : plate,
                        name  : name
                    }
                    )
                }else if(driver === 'erroEmail'){
                    Alert.alert('Cadastro já Existe. \n email ou telefone inválido.');
                }else if(driver === 'erroPhone'){
                    Alert.alert('Cadastro já Existe. \n email ou telefone inválido.');
                }else{
                    navigation.navigate('RegistrationStuation');
                }
            }catch(err){
                console.log(err)
            }
            
            // navigation.navigate ('RegisterAddress',
            //     {
            //         sou : route.params.sou,
            //         phone : phoneNumber,
            //         email : email
            //     }
            // )
        }
            
    }
    
    return(
        <KeyboardAwareScrollView style={twrnc`bg-white`}>
            <View style={[styles.container]}>
                <View style={styles.containerIconTxt}>
                        { empresa ?
                        <Image
                            style={[twrnc`h-20 w-20 mb-5`, {tintColor:'#FF5F00'} ]}
                            source={require('../../../img/icons/redePessoas.png')}
                        /> : ''}

                        {transportadora ?
                            <Image
                                style={[twrnc`h-20 w-20 mb-5`, {tintColor:'#FF5F00'} ]}
                                source={require('../../../img/icons/caminhao.png')}
                            /> : ''
                        }

                        { motorista ? <Image
                            style={[twrnc`h-20 w-20 mb-5`, {tintColor:'#FF5F00'} ]}
                            source={require('../../../img/icons/volante.png')}
                            /> : '' 
                        }

                        { auxiliar ? <Image
                            style={[twrnc`h-20 w-20 mb-5`, {tintColor:'#FF5F00'} ]}
                            source={require('../../../img/icons/cargaCoracao2.png')}
                            /> : ''
                        }

                        {transportadora || empresa ?<Text style={twrnc`text-sm`}>Torne-se nosso parceiro</Text>:''}
                        {motorista || auxiliar ?<Text style={twrnc`text-lg font-bold`}>Torne-se nosso entregador</Text>:''}
                        <View style={styles.containerInputTxtinfo}>

                                <View style={twrnc`mt-2 mb-3`}>
                                    <Text style={twrnc`m-2 absolute text-[#ff5f00] text-xs font-bold `}>Nome Completo</Text>
                                    <MaskInput
                                        style={twrnc`pt-5 h-15 pl-5 border-2 border-[#ff5f00] rounded-xl capitalize`}
                                        value={name}
                                        onChangeText={handleName}
                                    />
                                </View>

                                <View style={twrnc`mt-2 mb-3`}>
                                    <Text style={twrnc`m-2 absolute text-[#ff5f00] text-xs font-bold `}>Número de celular</Text>
                                    <MaskInput
                                        style={twrnc`pt-5 h-15 pl-5 border-2 border-[#ff5f00] rounded-xl`}
                                        value={phone}
                                        keyboardType="phone-pad"
                                        onChangeText={(masked, unmasked) => {
                                            setPhone(masked);
                                            setPhoneNumber(unmasked);
                                            unmasked.length === 11 ? setPhoneIsValid(true) : setPhoneIsValid(false) 
                                        }}
                                        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    />
                                </View>

                                <View style={twrnc`mt-2 mb-3`}>
                                    <Text style={twrnc`m-2 absolute text-[#ff5f00] text-xs font-bold `}>Endereço de email</Text>
                                    <MaskInput
                                        style={twrnc`pt-5 h-15 pl-5 border-2 border-[#ff5f00] rounded-xl`}
                                        value={email}
                                        autoCompleteType="email"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        placeholder="exemplo@email.com"
                                        onChangeText={handleEmail}
                                    ></MaskInput>
                                </View>
                           
                                <View style={twrnc`mt-2 mb-3`}>
                                    <Text style={twrnc`m-2 absolute text-[#ff5f00] text-xs font-bold `}>Placa do Carro</Text>
                                    <MaskInput
                                        style={twrnc`pt-5 h-15 pl-5 border-2 border-[#ff5f00] rounded-xl`}
                                        value={plate}
                                        autoCapitalize="none"
                                        placeholder="Placa do Carro"
                                        onChangeText={handlePlate}
                                    ></MaskInput>
                                </View>

                                <Text style={styles.txtInfo}>
                                    Digite o <Text style={styles.span}>seu melhor</Text> número de <Text style={styles.span}>celular</Text> e <Text style={styles.span}>email</Text> , entraremos em contato com você atravez dessas informações.{'\n'}
                                    <CheckBox
                                            title="Concordo com os termos de uso"
                                            checkedColor= {checkPermission ? '#28a745' :"#FF5F00"}
                                            uncheckedColor="#FF5F00"
                                            containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                            titleProps={{
                                                style: { 
                                                    color:checkPermission ? '#28a745' :"#FF5F00",
                                                    fontFamily:'Roboto_500Medium',
                                                }
                                                }}
                                                checked={checkPermission ? true : false}
                                                size={25}
                                                onPress={permission}
                                    />
                                </Text>
                                
                        </View>
                </View>
                <View style={twrnc`w-full flex items-center mt-7`}>
                        <Pressable
                            style={twrnc`rounded-xl py-2 px-10 border border-[#FF5F00]  ${phoneIsValid && emailIsValid && checkPermission && plate && name ? 'bg-orange-500' : 'bg-transparent'}`}
                            onPress={()=>{ access() }}
                        >
                            <Text style={[styles.txtButton, {
                            color: phoneIsValid && emailIsValid && checkPermission && plate && name 
                             ? 'white' :'#FF5F00',
                            }]}>Continuar</Text>
                        </Pressable>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:16,
        flex:1,
        justifyContent:'space-between',
        alignContent:'center'
    },
    containerIconTxt:{
        justifyContent:'center',
        alignItems:'center'
    },
    icon:{
        width:250,
        height:250,
        tintColor:'#FF5F00'
    },
    txtIcon:{
        marginBottom:20,
        fontSize:25,
        fontFamily:'Roboto_500Medium',
        color:'#FF5F00'
    },
    containerInputTxtinfo:{
        width:'100%',
    },
    label:{
        position:'absolute',
        fontSize:12,
        top:5,
        left:15,
        fontFamily:'Roboto_500Medium',
        color:'#FF5F00'
    },
    input:{
        borderColor:'#FF5F00',
        borderWidth:2,
        borderRadius:10,
        height:75,
        fontFamily:'Roboto_500Medium',
        fontSize:20,
        paddingStart:25,
        paddingTop:15
    },
    txtInfo:{
        marginTop:10,
        fontFamily:'Roboto_300Light',
        fontSize:15,
    },
    span:{
        color:'#FF5F00',
        fontFamily:'Roboto_500Medium'
    },
    containerButton:{
        width: '100%',
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center',
        marginTop:80
    },
    button:{
        alignItems:'center',
        width:'75%',
        borderColor:'#FF5F00',
        borderWidth:2,
        borderRadius:5,
        padding:16,
    },
    txtButton:{
        fontFamily:'Roboto_500Medium',
    },
    iconValid:{
        position:'absolute',
        width:35,
        height:35,
        left:310,
        top:23,
        tintColor:'#FF5F00'
    },
    labelPlate:{
        position:'absolute',
        fontSize:12,
        top:185,
        left:15,
        fontFamily:'Roboto_500Medium',
        color:'#FF5F00'
    }
})