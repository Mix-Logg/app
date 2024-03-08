import twrnc from 'twrnc';
import { View, Text, StyleSheet, Pressable, Image, TextInput, Keyboard, ScrollView, SafeAreaView  } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { CheckBox } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FixBar from '../../fixBar';
import Btn from '../../btn';
export default function RegisterPhotoDoc({navigation}){
    const route = useRoute();
    
    const [proprietario, setProprietario] = useState(false);
    const [cadastroVeiculo, setCadastroVeiculo] = useState(false);
    const [modalVisible,setModalVisible] = useState(false);
    const [checkCar,setCheckCar] = useState(false);
    const [txtInputCar,setTxtInputCar] = useState(false);
    const [typeCar,setTypeCar] = useState(false)
    const [btnIsVisible, setBtnIsVisible] = useState(true)
    const [tracker, setTracker] = useState(null)
    const [statusTracker, setStatusTracker] = useState(null)
    const [brandTracker, setBrandTracker] = useState(null)
    const [numberTracker, setNumberTracker] = useState(null)
    const [noStop, setNoStop] = useState(null)
    const [statusNoStop, setStatusNoStop] = useState(null)
    const [noStopNumber, setNoStopNumber] = useState(null)

    const handleTracker = (param) => {
        if (param === true){
            setTracker(true);
        }
        if (param == 'back') {
            setTracker(null);
            setStatusTracker(null);
        }
        if(param == false){
            setTracker(false);
        }
    }

    const handleNoStop = (param) => {
        console.log(param)
        if (param === true){
            setNoStop(true);
        }
        if (param == 'back') {
            setNoStop(null);
            setStatusNoStop(null);
        }
        if(param == false){
            setNoStop(false);
        }
    }

    const whoTheOwner = (proprietarioParams) => {
        // if( proprietario != false){
        //    return setProprietario(false)
        // } 
        if(proprietarioParams === 'eu'){
            return setProprietario(proprietarioParams)
        }
        if(proprietarioParams === 'outraPessoa'){
            return setProprietario(proprietarioParams)
        }
    }

    const HowAreYouRegistered = (cadastroVeiculo) => {
        if(cadastroVeiculo === 'fisica'){
            return setCadastroVeiculo(cadastroVeiculo)
        }
        if(cadastroVeiculo === 'juridica'){
            return setCadastroVeiculo(cadastroVeiculo)
        }
    }

    const handleSubmit = () => {
        const tracker ={
            status:statusTracker,
            brand:brandTracker,
            number:numberTracker
            
        }
        const noStop = {
            status:statusNoStop,
            number:noStopNumber
        }
        route.params.vehicle.tracker = tracker
        route.params.vehicle.noStop = noStop
        route.params.vehicle.cadaster = cadastroVeiculo
        route.params.vehicle.owner = proprietario
        navigation.navigate('upLoadDocCar', route.params)
    }

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
            setBtnIsVisible(false);
        });
    
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setBtnIsVisible(true);
        });
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
    }, []);
    

    return(
        <SafeAreaView style={twrnc`bg-white mt-6 h-full`}>
            <FixBar navigation={navigation} opition={'register'} />
            <ScrollView style={twrnc`h-full`}>
                <View style={twrnc`px-1 mb-10 h-auto mt-5`}>
                    <View style={twrnc`px-2 `}>
                        <Text style={twrnc`text-lg mt-2`}>Vamos registrar o seu veículo na <Text style={twrnc`font-bold text-[#FF5F00]`}>MIX</Text> </Text>
                    </View>
                    <View style={twrnc`mt-5 mb-10`}>
                        <View style={twrnc`px-14`}>
                                <Text style={twrnc`text-sm`}>Quem é o <Text style={twrnc`font-bold`}>proprietário</Text> do veículo?</Text>
                            
                                <Pressable 
                                    style={[twrnc`border border-[#22c55e] p-4 flex flex-row justify-center items-center  mt-2 gap-5 rounded-lg ` , {
                                        backgroundColor: proprietario === 'eu' ? '#22c55e' : 'transparent'
                                    }]}
                                    onPress={()=>{whoTheOwner('eu')}}
                                >
                                        <Image 
                                            style={[twrnc`w-5 h-5`, {
                                                tintColor: proprietario === 'eu' ? 'white' : '#22c55e'
                                            }]}
                                            source={require('../../../img/icons/pessoa.png')}
                                        />
                                        <Text 
                                        style={[twrnc`font-bold w-40`,{
                                            color: proprietario === 'eu' ? 'white' : '#22c55e'
                                        }]}>Eu sou proprietário</Text>
                                </Pressable>

                                <Pressable 
                                    style={[twrnc`border border-[#22c55e] p-4 flex flex-row justify-center items-center mt-2 gap-5 rounded-lg` ,{
                                        backgroundColor: proprietario === 'outraPessoa' ? '#22c55e' : 'transparent'
                                    }]}
                                    onPress={()=>{whoTheOwner('outraPessoa')}}
                                >
                                        <Image 
                                            style={[twrnc`w-5 h-5`,{
                                                tintColor: proprietario === 'outraPessoa' ? 'white' : '#22c55e'
                                        }]}
                                        source={require('../../../img/icons/outraPessoa.png')}
                                            />
                                            <Text style={[twrnc`font-bold w-40`,{
                                                color: proprietario === 'outraPessoa' ? 'white' : '#22c55e'
                                        }]}>Outra Pessoa</Text>
                                </Pressable>
                        </View>

                        {proprietario !== false && ( 
                            <View style={twrnc`mt-5 px-14`}>
                                <Text style={twrnc`text-sm`} >O veículo está <Text style={twrnc`font-bold`}>cadastrado</Text> como?</Text>

                                <Pressable 
                                        style={[twrnc`border border-[#22c55e] p-2 flex flex-row justify-center items-center  mt-2 gap-5 rounded-lg ` ,
                                            { backgroundColor: cadastroVeiculo === 'fisica' ? '#22c55e' : 'transparent'}
                                        ]}
                                        onPress={()=>{HowAreYouRegistered('fisica')}}
                                    >
                                        <Image
                                        source={require('../../../img/icons/fisica.png')}
                                        style={[twrnc`w-8 h-8`,{
                                            tintColor: cadastroVeiculo === 'fisica' ? 'white' : '#22c55e'
                                        }]}
                                        />
                                        <Text style={[twrnc`font-bold w-40`,{
                                            color: cadastroVeiculo === 'fisica' ? 'white' : '#22c55e'
                                        }]}>Pessoa Física</Text>
                                </Pressable>

                                <Pressable 
                                        style={[twrnc`border border-[#22c55e] p-2 flex flex-row justify-center items-center mt-2 gap-5 rounded-lg ` ,{
                                            backgroundColor: cadastroVeiculo === 'juridica' ? '#22c55e' : 'transparent'
                                        }]}
                                        onPress={()=>{HowAreYouRegistered('juridica')}}
                                    >
                                    <Image
                                        source={require('../../../img/icons/juridico.png')}
                                        style={[twrnc`w-8 h-8`, {
                                            marginLeft:8,
                                            tintColor: cadastroVeiculo === 'juridica' ? 'white' : '#22c55e'
                                        }]}
                                        />
                                        <Text style={[twrnc`font-bold w-40`,{
                                            color: cadastroVeiculo === 'juridica' ? 'white' : '#22c55e'
                                        }]}>Pessoa Jurídica</Text>
                                </Pressable>
                            </View>
                        )}

                        {proprietario && cadastroVeiculo != false && ( 
                            <View style={twrnc`mt-5 px-14`}>
                                <Text style={twrnc`text-sm`} >O veículo tem <Text style={twrnc`font-bold`}>rastreador</Text> ?</Text>

                                { tracker === true ?
                                    <View style={twrnc`flex mt-2 gap-5`}>
                                        <View style={twrnc`flex`}>
                                            <Text style={twrnc`flex text-base`}>Marca</Text>
                                            <TextInput style={twrnc`flex p-1 pl-5 border ${noStopNumber === null || noStopNumber === '' ? 'border-[#d4d4d4]': 'border-[#16a34a]'} rounded-xl w-5/6`}
                                            onChangeText={(txt)=>{setBrandTracker(txt)}}
                                            value={brandTracker}
                                            ></TextInput>
                                        </View>
                                        <View style={twrnc`flex`}>
                                            <Text style={twrnc`flex text-base`}>
                                                Nº Terminal
                                            </Text>
                                            <TextInput style={twrnc`flex p-1 pl-5 border ${noStopNumber === null || noStopNumber === '' ? 'border-[#d4d4d4]': 'border-[#16a34a]'} rounded-xl w-5/6`}
                                            onChangeText={(txt)=>{setNumberTracker(txt)}}
                                            value={numberTracker}
                                            ></TextInput>
                                        </View>

                                        <View style={twrnc`flex flex-row justify-center items-center`}>
                                            <Pressable 
                                            style={twrnc`bg-[#94a3b8] py-2 px-3`}
                                                onPress={()=>{
                                                    handleTracker('back')
                                                }}
                                            >
                                                <Text style={twrnc`font-bold text-white rounded-xl`}>Voltar</Text>

                                            </Pressable>
                                            <CheckBox
                                                    title="Ativo"
                                                    checkedColor= {true ? '#28a745' :"#334155"}
                                                    uncheckedColor="#334155"
                                                    containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                    titleProps={{
                                                        style: { 
                                                            color: statusTracker  ? '#28a745' :"#334155",
                                                            fontFamily:'Roboto_500Medium',
                                                        }
                                                        }}
                                                        checked={statusTracker}
                                                        size={25}
                                                        onPress={()=>{setStatusTracker(true)}}
                                            />
                                            <CheckBox
                                                    title="Inativo"
                                                    checkedColor= {statusTracker === false ? '#28a745' :"#334155"}
                                                    uncheckedColor="#334155"
                                                    containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                    titleProps={{
                                                        style: { 
                                                            color: statusTracker === false  ? '#28a745' :"#334155",
                                                            fontFamily:'Roboto_500Medium',
                                                        }
                                                        }}
                                                        checked={statusTracker === false }
                                                        size={25}
                                                        onPress={()=>{setStatusTracker(false)}}
                                            />
                                        </View>
                                    </View>
                                    :
                                    <>
                                        <Pressable 
                                                style={[twrnc`border border-[#22c55e] p-2 flex flex-row justify-center items-center  mt-2 gap-5 rounded-lg ` ,
                                                    { backgroundColor: tracker === true ? '#22c55e' : 'transparent'}
                                                ]}
                                                onPress={()=>{ handleTracker(true) }}
                                            >
                                                <Image
                                                source={require('../../../img/icons/trackerOn.png')}
                                                style={[twrnc`w-7 h-7`,{
                                                    tintColor: tracker === true ? 'white' : '#22c55e'
                                                }]}
                                                />
                                                <Text style={[twrnc`font-bold w-40`,{
                                                    color: tracker === true ? 'white' : '#22c55e'
                                                }]}>Sim</Text>
                                        </Pressable>

                                        <Pressable 
                                                style={[twrnc`border border-[#22c55e] p-2 flex flex-row justify-center items-center mt-2 gap-5 rounded-lg ` ,{
                                                    backgroundColor: tracker === false ? '#22c55e' : 'transparent'
                                                }]}
                                                onPress={()=>{handleTracker(false)}}
                                            >
                                            <Image
                                                source={require('../../../img/icons/trackerOf.png')}
                                                style={[twrnc`w-7 h-7`, {
                                                    tintColor: tracker === false ? 'white' : '#22c55e'
                                                }]}
                                                />
                                                <Text style={[twrnc`font-bold w-40`,{
                                                    color: tracker === false ? 'white' : '#22c55e'
                                                }]}>Não</Text>
                                        </Pressable> 
                                    </>
                                }

                            </View>
                        )} 

                        {proprietario && cadastroVeiculo != false && (tracker === false || statusTracker != null && numberTracker != null && brandTracker != null ) && ( 
                            <View style={twrnc`mt-5 px-14 `}>
                                <Text style={twrnc`text-sm`} >O veículo tem <Text style={twrnc`font-bold`}>sem parar</Text> ?</Text>

                                { noStop === true ?
                                    <View style={twrnc`flex mt-2 gap-5`}>
                                        <View style={twrnc`flex gap-1`}>
                                            <Text style={twrnc`flex text-base`}>Tag</Text>
                                            <TextInput style={twrnc`flex p-1 pl-5 border ${noStopNumber === null || noStopNumber === '' ? 'border-[#d4d4d4]': 'border-[#16a34a]'} rounded-xl w-5/6`}
                                            onChangeText={(txt)=>{setNoStopNumber(txt)}}
                                            value={noStopNumber}
                                            ></TextInput>
                                        </View>

                                        <View style={twrnc`flex flex-row justify-center items-center`}>
                                            <Pressable 
                                            style={twrnc`bg-[#94a3b8] py-2 px-3`}
                                                onPress={()=>{
                                                    handleNoStop('back')
                                                }}
                                            >
                                                <Text style={twrnc`font-bold text-white rounded-xl`}>Voltar</Text>

                                            </Pressable>
                                            <CheckBox
                                                    title="Ativo"
                                                    checkedColor= {true ? '#28a745' :"#334155"}
                                                    uncheckedColor="#334155"
                                                    containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                    titleProps={{
                                                        style: { 
                                                            color: statusNoStop  ? '#28a745' :"#334155",
                                                            fontFamily:'Roboto_500Medium',
                                                        }
                                                        }}
                                                        checked={statusNoStop}
                                                        size={25}
                                                        onPress={()=>{setStatusNoStop(true)}}
                                            />
                                            <CheckBox
                                                    title="Inativo"
                                                    checkedColor= {statusNoStop === false ? '#28a745' :"#FF5F00"}
                                                    uncheckedColor="#334155"
                                                    containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                    titleProps={{
                                                        style: { 
                                                            color: statusNoStop === false  ? '#28a745' :"#334155",
                                                            fontFamily:'Roboto_500Medium',
                                                        }
                                                        }}
                                                        checked={statusNoStop === false }
                                                        size={25}
                                                        onPress={()=>{setStatusNoStop(false)}}
                                            />
                                        </View>
                                    </View>
                                    :
                                    <>
                                        <Pressable 
                                                style={[twrnc`border border-[#22c55e] p-2 flex flex-row justify-center items-center  mt-2 gap-5 rounded-lg ` ,
                                                    { backgroundColor: noStop === true ? '#22c55e' : 'transparent'}
                                                ]}
                                                onPress={()=>{handleNoStop(true) }}
                                            >
                                                <MaterialCommunityIcons name="flag-outline" size={24} style={twrnc`text-[#22c55e]`} />
                                                <Text style={[twrnc`font-bold w-40`,{
                                                    color: noStop === true ? 'white' : '#22c55e'
                                                }]}>Sim</Text>
                                        </Pressable>

                                        <Pressable 
                                                style={[twrnc`border border-[#22c55e] p-2 flex flex-row justify-center items-center mt-2 gap-5 rounded-lg ` ,{
                                                    backgroundColor: noStop === false ? '#22c55e' : 'transparent'
                                                }]}
                                                onPress={()=>{handleNoStop(false)}}
                                            >
                                                <MaterialCommunityIcons name="flag-off-outline" size={24} style={twrnc`${noStop === false ? 'text-white': 'text-[#22c55e]'}`} />
                                                <Text style={[twrnc`font-bold w-40`,{
                                                    color: noStop === false ? 'white' : '#22c55e'
                                                }]}>Não</Text>
                                        </Pressable> 
                                    </>
                                }

                            </View>
                        )} 

                    </View>
                    {proprietario && cadastroVeiculo != false && (tracker === false || statusTracker != null && numberTracker != null && brandTracker != null ) &&  (noStop === false || statusNoStop != null && noStop != null && noStopNumber != null ) && (
                        <Btn title={'Continue'} action={handleSubmit} />
                    )}

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:16,
    },
    h1:{
        fontFamily:'Roboto_500Medium',
        fontSize:18
    },
    span:{
        fontFamily:'Roboto_500Medium',
        color:'#FF5F00',
    },
    info:{
        fontFamily:'Roboto_300Light',
        fontSize:20,
        marginTop:20
    },
    containerOpitions:{
        marginTop:50,
    },
    containerOpition:{
        width:'100%',
        alignItems:'center',
    },
    btn:{
        borderWidth:2,
        borderColor:'#FF5F00',
        padding:8,
        borderRadius:20,
        flexDirection:'row',
        width:'90%',
        marginTop:20,
        alignItems:'center',
    },
    btnContainer:{
        width:'70%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        height:'100%'
    },
    btnIcon:{
        width:50,
        height:50,
        tintColor:'#FF5F00'
    },
    btnTxt:{
        color:'#FF5F00',
        fontSize:17,
        fontFamily:'Roboto_500Medium',
    },
    containerTitle:{
        width:'100%',
        alignItems:'center'
    },
    containerBtnNext:{
        width:'100%',
        alignItems:'center',
        marginTop:45
    },
    btnNext:{
        borderWidth:2,
        padding:15,
        paddingLeft:40,
        paddingRight:40,
        borderRadius:20,
        borderColor:'#FF5F00',
        backgroundColor:'#FF5F00'
    },
    btnNextTxt:{
        color:'white',
        fontSize:17,
        fontFamily:'Roboto_500Medium',
    },
    // MODAL
    modal:{
        backgroundColor:'rgba(0 ,0 ,0 ,0.5)',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    containerModal:{
        backgroundColor:'white',
        borderColor:'#FF5F00',
        borderWidth:2,
        borderRadius:15,
        width:'90%',
        height:'80%',
        padding:16,
        // justifyContent:'space-between'
    },
    modalHeader:{
        justifyContent:'space-between',
        flexDirection:'row'
    },
    containerSelect:{
        width:'100%',
        alignItems:'center',
    },
    containerOutro:{
        width:'100%',
        alignItems:'center'
    },
    inputOutro:{  
        width:'80%',
        height:70,
        borderColor:'#FF5F00',
        borderRadius:10,
        borderWidth:2,
        paddingLeft:15,
        paddingTop:20,
        fontSize:20
    },
    labelOutro:{
        position:'absolute',
        top:'1%',  
        left:'15%',
        fontSize:15,
        fontFamily:'Roboto_500Medium',
        color:'#FF5F00'
    },
})


