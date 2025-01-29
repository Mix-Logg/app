import { View, Text, Image, StyleSheet, Pressable, Alert, ScrollView, SafeAreaView } from "react-native"
import { useRoute } from '@react-navigation/native';
import { useState } from "react";
import React, { useEffect } from 'react';
import MaskInput from 'react-native-mask-input';
import { CheckBox } from 'react-native-elements';
import axios from "axios";
import twrnc from 'twrnc';
import FixBar from "../../fixBar";
import PopUp from "../../modal";
import Btn from "../../btn";
export default function RegisterContact({navigation}){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction
    
    const [checkPermission, setCheckPermission] = useState(false);
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
    const [popUp, setPopUp] = useState('');
   
    const route = useRoute();

    useEffect(() => {
    }, []);
    
    const handleEmail = (text) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setEmail(text)
        if(emailRegex.test(text) === false){
            setEmailIsValid(false)
        }else{
            setEmailIsValid(true)
        }
    }

    const handleName = (text) => {
        setName(text)
    }

    const permission = () => {
        setCheckPermission(!checkPermission)
    }

    const modal = async (option) => {
        if(option === 'name'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve digitar o seu nome'} show={true} />)
            return;
        }
        if(option === 'phone'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve digitar o seu celular'} show={true} />)
            return;
        }
        if(option === 'email'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve digitar o seu email'} show={true} />)
            return;
        }
        if(option === 'check'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve concordar com os termos de uso'} show={true} />)
            return;
        }
    }

    const handleSubmit = async () => {
        await setPopUp('')
        if(!name){
            await modal('name')
            return;
        }
        if(!phoneIsValid){
            await modal('phone')
            return;
        }
        if(!emailIsValid){
            await modal('email')
            return;
        }
        if(!checkPermission){
            await modal('check')
            return;
        }
        route.params.user.name  = name
        route.params.user.email = email
        route.params.user.phone = phoneNumber
        console.log(route.params)
        navigation.navigate ('InfoPhotoAuMo',route.params)
    }
    
    return(
        < >
            <FixBar navigation={navigation} opition={'register'} />
            <ScrollView style={twrnc`bg-white`}>
            {popUp}
           <View style={twrnc`h-200`}>
                <View style={twrnc`p-5 gap-10`}>
                    <View style={styles.containerIconTxt}>
                            <View style={twrnc`gap-5 w-full mt-10`}>

                                <View style={twrnc`gap-1 px-10`}>
                                        <Text style={twrnc`text-base`}>Nome Completo</Text>
                                        <MaskInput
                                            style={twrnc`py-3 pl-5 bg-white border border-[#d4d4d4] rounded-xl`}
                                            value={name}
                                            onChangeText={handleName}
                                        />
                                </View>

                                <View style={twrnc`gap-1 px-10`}>
                                        <Text style={twrnc`text-base`}>Número de celular</Text>
                                        <MaskInput
                                            style={twrnc`py-3 pl-5 bg-white border border-[#d4d4d4] rounded-xl`}
                                            value={phone}
                                            keyboardType="phone-pad"
                                            onChangeText={(masked, unmasked) => {
                                                setPhone(masked);
                                                setPhoneNumber(unmasked);
                                                unmasked.length === 11 ? setPhoneIsValid(true) : setPhoneIsValid(false) 
                                            }}
                                            placeholder=""
                                            mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                        />
                                </View>

                                <View style={twrnc`gap-1 px-10`}>
                                        <Text style={twrnc`text-base`}>Endereço de email</Text>
                                        <MaskInput
                                            style={twrnc`py-3 pl-5 bg-white border border-[#d4d4d4] rounded-xl`}
                                            value={email}
                                            autoCompleteType="email"
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            placeholder=""
                                            onChangeText={handleEmail}
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
                    <Btn title={'Continue'} action={handleSubmit} />
                </View>
           </View>
            </ScrollView>
        </>
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
})