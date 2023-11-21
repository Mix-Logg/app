import { useState } from "react";
import { StyleSheet ,View, Text, Image, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import MaskInput from 'react-native-mask-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from '../../../api/serviceCep'
import { CheckBox } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';

export default function RegisterAddress({navigation}){
    // VARIAVEIS FORM
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cep, setCep] = useState('');
    const [cepNumber, setCepNumber] = useState('');
    // VALID FORM
    const [cepValid, setCepValid] = useState(null);
    const [logradouroValid, setLogradouroValid] = useState(null);
    const [numeroValid, setNumeroValid] = useState(null);
    const [complementoValid, setComplementoValid] = useState(true);
    const [bairroValid, setBairroValid] = useState(null);
    const [cidadeValid, setCidadeValid] = useState(null);
    const [ufValid, setUFValid] = useState(null);
    // LOADING and CHECK
    const [isLoading, setIsLoading] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const buscaCep = async () => {
        try{
            setIsLoading(true)
            // console.log(cepNumber)
            const response = await api.get(`/${cepNumber}/json/`)
            // console.log(response.data)
            setLogradouro(response.data.logradouro)
            setBairro(response.data.bairro)
            setCidade(response.data.localidade)
            setUf(response.data.uf)
            if (response.data.logradouro === undefined && response.data.bairro === undefined && response.data.localidade === undefined && response.data.uf === undefined) {
                Alert.alert('Não encontramos seu CEP, \ndigite manualmente para continuar');
            }
            if(response.data.logradouro != undefined){
                setLogradouroValid(true)
            }
            if(response.data.bairro != undefined){
                setBairroValid(true)
            }
            if(response.data.localidade != undefined){
                setCidadeValid(true)
            }
            if(response.data.uf != undefined){
                setUFValid(true)
            }
            setIsLoading(false)
        }catch(erro){
            setIsLoading(false)
        }
    }

    const CheckNumber = () => {
        setIsChecked(!isChecked);
        if(!isChecked === false){
            setNumeroValid(false)
            setNumero('')
            setComplementoValid(true)
        }else{
            setNumeroValid(true)
            if(complemento.length > 4){
                setComplementoValid(true)
            }else{
                setComplementoValid(false)
            }
        }
    }

    const route = useRoute();

    // console.log(route.params)

    return(
        <KeyboardAwareScrollView>
            <View style={styles.container}>
            <Text style={styles.h1}> Endereço </Text> 
            <View style={styles.containerInputs}>
                    <View style={styles.containerIcon}>
                        <Text style={[styles.label,{
                            color: cepValid ? '#28a745': '#FF5F00'
                        }]}>CEP</Text>
                        <MaskInput style={[styles.inputCep,{
                            borderColor: cepValid ? '#28a745': '#FF5F00'
                        }]}
                            value={cep}
                            keyboardType="numeric"
                            onChangeText={(masked, unmasked) => {
                                setCep(masked)
                                setCepNumber(unmasked)
                                if(unmasked.length === 8){
                                    setCepValid(true)
                                }else{
                                    setCepValid(false)
                                }
                            }}
                            mask= {[ /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                        />
                        
                            { cepValid === true ? <Image
                                style={[styles.iconValid,{left:130, tintColor:'#28a745'}]}
                                source={require('../../../src/main/res/drawable-mdpi/assets/icons/ok.png')}
                            /> : '' }
                            
                            { cepValid === false ? 
                                <Image
                                    style={[styles.iconValid,{height:16,width:16,left:135,top:33}]}
                                    source={require('../../../src/main/res/drawable-mdpi/assets/icons/x.png')}
                                /> : '' 
                            }
                        <Pressable
                        onPress={buscaCep}
                        >
                            {isLoading === true ? 
                                    <ActivityIndicator size="large" color="#FF5F00" />
                                 : 
                                <View style={[styles.btnBuscaCep,{backgroundColor: cepValid === true  ? '#FF5F00' : 'transparent' }]}>
                                     <Text style={[styles.txtBtnCep, { color: cepValid === true ? 'white' : '#FF5F00' }]}>
                                        Buscar CEP
                                    </Text>
                                    <Image
                                        style={[styles.icon, { tintColor: cepValid === true ? 'white' : '#FF5F00', transform: [{ scaleX: -1 }] }]}
                                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/buscaCep.png')}
                                    />
                                </View>
                                
                            }
                        </Pressable>
                    </View>

                    <View style={styles.containerInputs}>  
                        <View style={styles.containerInput}>
                            <Text style={[styles.label,{
                                color: logradouroValid ? '#28a745' : '#FF5F00'
                            }]}>Logradouro</Text>
                            <TextInput style={[styles.input,{borderColor: logradouroValid === true ? '#28a745': '#FF5F00'}]}
                            onChangeText={(txt)=>{
                                setLogradouro(txt)
                                if(txt.length > 4){
                                    setLogradouroValid(true)
                                }else{
                                    setLogradouroValid(false)
                                }
                            }}
                            value={logradouro}
                            keyboardType="default"
                            ></TextInput>                        
                        </View>

                        <View style={styles.containerInputCheck}>
                            { isChecked === false ? <View style={[styles.inputNumberUf,{width:'39%' }]}>
                                <Text style={[styles.label,{
                                    color: numeroValid ? '#28a745': '#FF5F00'
                                }]}>N°</Text>
                                <TextInput style={[styles.input,{height:55, paddingBottom:7,
                                    borderColor: numeroValid ? '#28a745': '#FF5F00'
                                }]}
                                    maxLength={9}
                                    value={numero}
                                    onChangeText={(txt)=>{
                                        setNumero(txt)
                                        if(txt.length === 0 ){
                                            setNumeroValid(false)
                                        }else{
                                            setNumeroValid(true)
                                        }
                                    }}
                                    keyboardType="numeric"
                                ></TextInput>
                            </View> : ''}
                            <CheckBox style={styles.checkNumber}
                                title="S/N"
                                checkedColor= {isChecked ? '#28a745' :"#FF5F00"}
                                uncheckedColor="#FF5F00"
                                containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                titleProps={{
                                    style: { 
                                        color:isChecked ? '#28a745' :"#FF5F00",
                                        fontFamily:'Roboto_500Medium',
                                    }
                                  }}
                                checked={isChecked}
                                size={25}
                                onPress={CheckNumber}
                            />
                        </View>

                        <View style={styles.containerInput}>
                            <Text style={[styles.label,{
                                color: complementoValid ? '#28a745': '#FF5F00'
                            }]}>Complemento</Text>
                            <TextInput style={[styles.input,{
                                borderColor: complementoValid ? '#28a745': '#FF5F00'
                            }]} 
                            onChangeText={(txt)=>{
                                setComplemento(txt)
                                if(txt.length > 4){
                                    setComplementoValid(true)
                                }else{
                                    setComplementoValid(false)
                                }
                            }}
                            value={complemento}
                            keyboardType="default"
                            ></TextInput>
                        </View>

                        <View style={styles.containerInput}>
                            <Text style={[styles.label,{ color: bairroValid ? '#28a745': '#FF5F00'}]}>Bairro</Text>
                            <TextInput style={[styles.input,{
                                borderColor: bairroValid ? '#28a745': '#FF5F00'
                            }]} 
                            onChangeText={(txt)=>{
                                setBairro(txt)
                                if( txt.length > 1){
                                    setBairroValid(true)
                                }else{
                                    setBairroValid(false)
                                }
                            }}
                            value={bairro}
                            keyboardType="default"
                            ></TextInput>
                        </View>

                        <View style={[styles.containerInput, {justifyContent:'space-between'}]}>
                            <Text style={[styles.label,{ color: cidadeValid ? '#28a745': '#FF5F00' }]}>Cidade</Text>
                            <TextInput style={[styles.input,{width:'50%',
                                borderColor: cidadeValid ? '#28a745': '#FF5F00'
                            }]} 
                            value={cidade}
                            onChangeText={(txt)=>{
                                setCidade(txt)
                                if(txt.length > 3){
                                    setCidadeValid(true)
                                }else{
                                    setCidadeValid(false)
                                }
                            }}
                            ></TextInput>
                            <View style={styles.inputNumberUf}>
                                <Text style={[styles.label,{
                                    color: ufValid ? '#28a745': '#FF5F00'
                                }]}>UF</Text>
                                <TextInput style={[styles.input,{height:55, paddingBottom:7,
                                    borderColor: ufValid ? '#28a745': '#FF5F00'
                                }]} 
                                onChangeText={(txt)=>{
                                    setUf(txt)
                                    if(txt.length > 1){
                                        setUFValid(true)
                                    }else{
                                        setUFValid(false)
                                    }
                                }}
                                value={uf}
                                keyboardType="default"
                                maxLength={2}
                                ></TextInput>
                            </View>
                        </View>
                    </View>
            </View>
            <View style={styles.containerBtn}> 
                <Pressable style={[styles.buttonContinue,{
                    backgroundColor: logradouroValid && cepValid && numeroValid && complementoValid && bairroValid && cidadeValid && ufValid  ? '#FF5F00' : 'transparent'
                }]}
                onPress={() => {
                    if (
                      logradouroValid &&
                      cepValid &&
                      numeroValid &&
                      complementoValid &&
                      bairroValid &&
                      cidadeValid &&
                      ufValid
                    ) {
                      if (route.params.sou === 'motorista' || route.params.sou === 'auxiliar') {
                        navigation.navigate('InfoPhotoAuMo', {
                          email: route.params.email,
                          phone: route.params.phone,
                          sou: route.params.sou,
                          address: {
                            cep: cepNumber,
                            logradouro: logradouro,
                            numero: numero,
                            complemento: complemento,
                            bairro: bairro,
                            cidade: cidade,
                            uf: uf,
                          },
                        });
                      } else if (route.params.sou === 'empresa' || route.params.sou === 'transportadora') {
                        navigation.navigate('infoPhotoEmTr', {
                          email: route.params.email,
                          phone: route.params.phone,
                          sou: route.params.sou,
                          address: {
                            cep: cep,
                            logradouro: logradouro,
                            numero: numero,
                            complemento: complemento,
                            bairro: bairro,
                            cidade: cidade,
                            uf: uf,
                          },
                        });
                      }
                    }
                }}
                >
                    <Text style={[styles.txtBtnContinue,{
                        color: logradouroValid && cepValid && numeroValid && complementoValid && bairroValid && cidadeValid && ufValid  ? 'white' : '#FF5F00'
                    }]}>Continuar</Text>
                </Pressable>
            </View>
        </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
        padding:16
    },
    containerIcon:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'space-between',
        paddingRight:10,
        marginTop:50
    },
    h1:{
        fontFamily:'Roboto_500Medium',
        fontSize:18
    },
    containerInputs:{
        width:'100%',
        alignItems:'center',
    },
    containerInput:{
        width:'100%',
        flexDirection:'row',
        marginTop:25
    },
    icon:{
        tintColor:'#FF5F00',
        width:30,
        height:30
    },
    inputCep:{
        borderWidth:2,
        borderColor:'#FF5F00',
        width:'46%',
        height:65,
        borderRadius:5,
        paddingStart:25,
        paddingTop:20,
        fontFamily:'Roboto_500Medium',
        fontSize:18
    },
    input:{
        width:'100%',
        height:70,
        borderWidth:2,
        borderColor:'#FF5F00',
        borderRadius:5,
        paddingLeft:15,
        paddingTop:25,
        fontSize:18,
        fontFamily:'Roboto_500Medium',
    },
    label:{
        position:'absolute',
        color:'#FF5F00',
        fontFamily:'Roboto_500Medium',
        left:10, 
        top:5
    },
    btnBuscaCep:{
        flexDirection:'row',
        borderWidth:2,
        borderRadius:5,
        borderColor:'#FF5F00',
        alignItems:'center',
        padding:10,
    },
    txtBtnCep:{
        color:'#FF5F00',
        fontFamily:'Roboto_500Medium',
    },
    containerInputCheck:{
        marginTop:25,
        flexDirection:'row',
        width:'100%'
    },
    inputNumberUf:{
        width:'20%',
    },
    iconValid:{
        tintColor:'#FF5F00',
        width:25,
        height:25,
        position:"absolute",
        left:120,
        top:28
    },
    buttonContinue:{
        marginTop:50,
        borderWidth:2,
        borderColor:'#FF5F00',
        borderRadius:5,
        padding:15,
        paddingEnd:60,
        paddingLeft:60,
    },
    txtBtnContinue:{
        fontFamily:'Roboto_500Medium',
        fontSize:18,
        color:'#FF5F00',

    },
    containerBtn:{
        width:'100%',
        alignItems:'center'
    },
})