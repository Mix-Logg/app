import { View, Text, Image, StyleSheet, Pressable, } from "react-native"
import { useRoute } from '@react-navigation/native';
import { useState } from "react";
import React, { useEffect } from 'react';
import MaskInput from 'react-native-mask-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CheckBox } from 'react-native-elements';

export default function RegisterContact({navigation}){
    const [checkPermission, setCheckPermission] = useState(false);
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

    const permission = () => {
        setCheckPermission(!checkPermission)
    }
    
    return(
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <View style={styles.containerIconTxt}>
                        { empresa ?
                        <Image
                            style={[styles.icon]}
                            source={require('../../../assets/icons/redePessoas.png')}
                        /> : ''}

                        {transportadora ?
                            <Image
                                style={[styles.icon]}
                                source={require('../../../assets/icons/caminhao.png')}
                            /> : ''
                        }

                        { motorista ? <Image
                            style={[styles.icon]}
                            source={require('../../../assets/icons/volante.png')}
                            /> : '' 
                        }

                        { auxiliar ? <Image
                            style={[styles.icon]}
                            source={require('../../../assets/icons/cargaCoracao2.png')}
                            /> : ''
                        }

                        {transportadora || empresa ?<Text style={[styles.txtIcon]}>Torne-se nosso parceiro</Text>:''}
                        {motorista || auxiliar ?<Text style={[styles.txtIcon]}>Torne-se nosso entregador</Text>:''}
                        <View style={styles.containerInputTxtinfo}>
                            <Text style={styles.label}>Número de celular</Text>
                            { phoneIsValid === true ? 
                                <Image
                                    style={[styles.iconValid]}
                                    source={require('../../../assets/icons/ok.png')}
                                /> : '' 
                            }
                            { phoneIsValid === false ? 
                                <Image
                                    style={[styles.iconValid,{height:24, width:24, top:26, left:315 }]}
                                    source={require('../../../assets/icons/x.png')}
                                /> : '' 
                            }
                            <MaskInput
                                style={[styles.input]}
                                value={phone}
                                keyboardType="phone-pad"
                                onChangeText={(masked, unmasked) => {
                                    setPhone(masked);
                                    setPhoneNumber(unmasked);
                                    unmasked.length === 11 ? setPhoneIsValid(true) : setPhoneIsValid(false) 
                                }}
                                mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            />
                            <Text style={[styles.label,{top:95,bottom:0}]}>Endereço de email</Text>
                            { emailIsValid === true ? 
                                <Image
                                    style={[styles.iconValid,{top:116}]}
                                    source={require('../../../assets/icons/ok.png')}
                                /> : '' 
                            }
                            { emailIsValid === false ? 
                                <Image
                                    style={[styles.iconValid,{height:24, width:24, top:116, left:315 }]}
                                    source={require('../../../assets/icons/x.png')}
                                /> : '' 
                            }
                            <MaskInput
                                style={[styles.input,{marginTop:15, fontSize:16}]}
                                value={email}
                                autoCompleteType="email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholder="exemplo@email.com"
                                onChangeText={handleEmail}
                            ></MaskInput>
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
                <View style={styles.containerButton}>
                        <Pressable
                            style={[styles.button,{backgroundColor: phoneIsValid && emailIsValid && checkPermission ? '#FF5F00' :'transparent'}]}
                            onPress={()=>{ phoneIsValid && emailIsValid && checkPermission ? navigation.navigate ('RegisterAddress',{
                                sou : route.params.sou,
                                phone : phoneNumber,
                                email : email
                            }) : ''}}
                        >
                            <Text style={[styles.txtButton, {
                            color: phoneIsValid && emailIsValid && checkPermission
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
    }
})