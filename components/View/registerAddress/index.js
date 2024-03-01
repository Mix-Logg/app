import { useState } from "react";
import { StyleSheet ,View, Text, Image, TextInput, Pressable, ActivityIndicator, Alert, ScrollView, SafeAreaView } from "react-native";
import MaskInput from 'react-native-mask-input';
import api from './serviceCep'
import { CheckBox } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import twrnc from "twrnc";
import FixBar from "../../fixBar";
import PopUp from "../../modal";
import Btn from "../../btn";
export default function RegisterAddress({navigation}){
    const route = useRoute();
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
    const [popUp, setPopUp] = useState('');

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

    const modal = async (option) => {
        await setPopUp('') 
        if(option === 'cep'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve digitar seu CEP'} show={true} />)
            return;
        }
        if(option === 'street'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve digitar seu logradouro'} show={true} />)
            return;
        }
        if(option === 'number'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve digitar seu número'} show={true} />)
            return;
        }
        if(option === 'complement'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve digitar seu complemento'} show={true} />)
            return;
        }
        if(option === 'district'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve digitar seu bairro'} show={true} />)
            return;
        }
        if(option === 'city'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve digitar sua cidade'} show={true} />)
            return;
        }
        if(option === 'uf'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve digitar seu UF'} show={true} />)
            return;
        }
    }

    const handleSubmit = async () => {
        await setPopUp('')  
        if(!cepValid){
            modal('cep')
            return;
        }
        if(!logradouroValid){
            modal('street')
            return;
        }
        if(!numeroValid){
            modal('number')
            return;
        }
        if(!complementoValid){
            modal('complement')
            return;
        }
        if(!bairroValid){
            modal('district')
            return;
        }
        if(!cidadeValid){
            modal('city')
            return;
        }
        if(!ufValid){
            modal('uf')
            return;
        }
        route.params.addres = {
            zipCode: cepNumber,
            street: logradouro,
            number: numero,
            complement: complemento,
            district: bairro,
            city: cidade,
            uf: uf,
        }
        navigation.navigate('InfoPhotoAuMo', route.params)
    }

    return(
        <SafeAreaView style={twrnc`mt-6 bg-white h-full`}>
            <FixBar navigation={navigation} opition={'register'} />
                <ScrollView style={twrnc`p-4 bg-white`}>
                    {popUp}
                    <Text style={styles.h1}> Endereço </Text> 
                    <View style={twrnc`mb-15`}>
                            <View style={twrnc`w-full flex-row items-center gap-12 items-center mt-5`}>
                                <View style={twrnc`w-2/6`}>
                                    <Text style={[twrnc`text-base`,{
                                        color: cepValid === null ? '': '#16a34a'
                                    }]}>CEP</Text>
                                    <MaskInput style={[twrnc`py-2 pl-5 border rounded-xl ${cepValid === null ? 'border-[#d4d4d4]': 'border-[#16a34a]'}`,{
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
                                        placeholder=""
                                        mask= {[ /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                                    />
                                </View>
                                <Pressable style={twrnc`w-2/6`}
                                    onPress={buscaCep}
                                >
                                    {isLoading === true ? 
                                            <ActivityIndicator size="large" color="#FF5F00" />
                                        : 
                                        <View style={[twrnc`py-1 mt-5 flex-row border border-[#d4d4d4] justify-center items-center rounded-lg ${cepValid === true ? 'bg-green-500 border-green-500 text-white' : 'transparent'}`]}>
                                            <Text style={[styles.txtBtnCep, { color: cepValid === true ? 'white' : 'black' }]}>
                                                Pesquisar
                                            </Text>
                                            <Image
                                                style={[styles.icon, { tintColor: cepValid === true ? 'white' : 'black', transform: [{ scaleX: -1 }] }]}
                                                    source={require('../../../img/icons/buscaCep.png')}
                                            />
                                        </View>
                                        
                                    }
                                </Pressable>
                            </View>

                            <View style={twrnc`w-full mt-5 gap-3`}>  
                                <View style={twrnc`flex w-5/6`}>
                                    <Text style={[twrnc`text-base`,{
                                        color: logradouroValid === null ? 'black' : '#28a745'
                                    }]}>Logradouro</Text>
                                    <TextInput style={[twrnc`py-2 pl-5 border rounded-xl`,{borderColor: logradouroValid === true ? '#28a745': '#d4d4d4'}]}
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

                                <View style={twrnc`flex-row items-center`}>
                                    { isChecked === false ? 
                                    <View style={[styles.inputNumberUf,{width:'39%' }]}>
                                        <Text style={[twrnc`text-base`,{
                                            color: numeroValid ? '#28a745': 'black'
                                        }]}>N°</Text>
                                        <TextInput style={[twrnc`py-2 pl-5 border rounded-xl`,{
                                            borderColor: numeroValid ? '#28a745': '#d4d4d4'
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
                                    <CheckBox
                                        title="S/N"
                                        checkedColor= {isChecked ? '#28a745' :"#d4d4d4"}
                                        uncheckedColor="#d4d4d4"
                                        containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                        titleProps={{
                                            style: { 
                                                color:isChecked ? '#28a745' :"black",
                                                fontFamily:'Roboto_500Medium',
                                            }
                                        }}
                                        checked={isChecked}
                                        size={26}
                                        onPress={CheckNumber}
                                    />
                                </View>

                                <View style={twrnc`w-5/6`}>
                                    <Text style={[twrnc`text-base`,{
                                        color: complementoValid ? '#28a745': 'black'
                                    }]}>Complemento</Text>
                                    <TextInput style={[twrnc`py-2 pl-5 border rounded-xl`,{
                                        borderColor: complementoValid ? '#28a745': '#d4d4d4'
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

                                <View style={twrnc`w-5/6`}>
                                    <Text style={[twrnc`text-base`,{ color: bairroValid ? '#28a745': 'black'}]}>Bairro</Text>
                                    <TextInput style={[twrnc`py-2 pl-5 border rounded-xl`,{
                                        borderColor: bairroValid ? '#28a745': '#d4d4d4'
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

                                <View style={[twrnc`w-5/6 flex-row items-center justify-between`]}>
                                    <View style={twrnc`w-3/6`}>
                                        <Text style={[twrnc`text-base`,{ color: cidadeValid ? '#28a745': 'black' }]}>Cidade</Text>
                                        <TextInput style={[twrnc`py-2 pl-5 border rounded-xl`, {borderColor: cidadeValid ? '#28a745': '#d4d4d4'
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
                                    </View>
                                    <View style={twrnc`w-2/6`}>
                                        <Text style={[twrnc`text-base`,{
                                            color: ufValid ? '#28a745': 'black'
                                        }]}>UF</Text>
                                        <TextInput style={[twrnc`py-2 pl-5 border rounded-xl`,{
                                            borderColor: ufValid ? '#28a745': '#d4d4d4'
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
                    <Btn title={'Continue'} action={handleSubmit} />
                </ScrollView>
        </SafeAreaView>
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
        marginTop:20,
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