import { View, Text, StyleSheet, Pressable, Image, Modal, TextInput, Keyboard  } from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import  { useState, useEffect } from 'react';
import { CheckBox } from 'react-native-elements';
import twrnc from 'twrnc';

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

    const newParams = {
        ...route.params,
        dataCar:{
            cadastroVeiculo:cadastroVeiculo,
            proprietario:proprietario,
            checkCar:checkCar,
            txtInputCar:txtInputCar,
            typeCar:typeCar,
        }
    }

    const handleTracker = (param) => {
        console.log(param)
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

    const modalIsVisible = () => {
        setModalVisible(!modalVisible)
    }

    const CheckCar = (car) => {
        if(checkCar === 'Outro'){
            setTxtInputCar('')
            return setCheckCar(false)
        }
        setCheckCar(car)
    }

    const typeCars = (car = '') => {
        if(car === ''){
            setCheckCar(false)
            return setTypeCar(false)
        }
        setTypeCar(car)
    }

    const navegacao = () => {
        if((checkCar != false || txtInputCar.length > 1) && (checkCar != 'Outro' || txtInputCar.length > 1)){
            modalIsVisible()
            navigation.navigate('upLoadDocCar', newParams)
        }
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
        <KeyboardAwareScrollView>
            <View style={[styles.container]}>
                <View>
                    <Text style={twrnc`text-lg mt-2`}>Vamos registrar o seu veículo na <Text style={styles.span}>MIX</Text> </Text>
                </View>
                <View style={twrnc`mt-5`}>
                        
                        <View style={twrnc`px-14`}>
                            <Text style={twrnc`text-sm`}>Quem é o <Text style={styles.span}>proprietário</Text> do veículo?</Text>
                           
                            <Pressable 
                                style={[twrnc`border border-[#FF5F00] p-4 flex flex-row justify-center items-center  mt-2 gap-5 rounded-lg ` , {
                                    backgroundColor: proprietario === 'eu' ? '#FF5F00' : 'transparent'
                                }]}
                                onPress={()=>{whoTheOwner('eu')}}
                            >
                                    <Image 
                                        style={[twrnc`w-5 h-5`, {
                                            tintColor: proprietario === 'eu' ? 'white' : '#FF5F00'
                                        }]}
                                        source={require('../../../img/icons/pessoa.png')}
                                    />
                                    <Text 
                                    style={[twrnc`font-bold w-40`,{
                                        color: proprietario === 'eu' ? 'white' : '#FF5F00'
                                    }]}>Eu sou proprietário</Text>
                            </Pressable>

                            <Pressable 
                                style={[twrnc`border border-[#FF5F00] p-4 flex flex-row justify-center items-center mt-2 gap-5 rounded-lg` ,{
                                    backgroundColor: proprietario === 'outraPessoa' ? '#FF5F00' : 'transparent'
                                }]}
                                onPress={()=>{whoTheOwner('outraPessoa')}}
                            >
                                    <Image 
                                        style={[twrnc`w-5 h-5`,{
                                            tintColor: proprietario === 'outraPessoa' ? 'white' : '#FF5F00'
                                    }]}
                                    source={require('../../../img/icons/outraPessoa.png')}
                                        />
                                        <Text style={[twrnc`font-bold w-40`,{
                                            color: proprietario === 'outraPessoa' ? 'white' : '#FF5F00'
                                    }]}>Outra Pessoa</Text>
                            </Pressable>
                        </View>

                    {proprietario !== false && ( 
                        <View style={twrnc`mt-5 px-14`}>
                            <Text style={twrnc`text-sm`} >O veículo está <Text style={styles.span}>cadastrado</Text> como?</Text>

                            <Pressable 
                                    style={[twrnc`border border-[#FF5F00] p-2 flex flex-row justify-center items-center  mt-2 gap-5 rounded-lg ` ,
                                        { backgroundColor: cadastroVeiculo === 'fisica' ? '#FF5F00' : 'transparent'}
                                    ]}
                                    onPress={()=>{HowAreYouRegistered('fisica')}}
                                >
                                    <Image
                                    source={require('../../../img/icons/fisica.png')}
                                    style={[twrnc`w-8 h-8`,{
                                        tintColor: cadastroVeiculo === 'fisica' ? 'white' : '#FF5F00'
                                    }]}
                                    />
                                    <Text style={[twrnc`font-bold w-40`,{
                                        color: cadastroVeiculo === 'fisica' ? 'white' : '#FF5F00'
                                    }]}>Pessoa Física</Text>
                            </Pressable>

                            <Pressable 
                                    style={[twrnc`border border-[#FF5F00] p-2 flex flex-row justify-center items-center mt-2 gap-5 rounded-lg ` ,{
                                        backgroundColor: cadastroVeiculo === 'juridica' ? '#FF5F00' : 'transparent'
                                    }]}
                                    onPress={()=>{HowAreYouRegistered('juridica')}}
                                >
                                <Image
                                    source={require('../../../img/icons/juridico.png')}
                                    style={[twrnc`w-8 h-8`, {
                                        marginLeft:8,
                                        tintColor: cadastroVeiculo === 'juridica' ? 'white' : '#FF5F00'
                                    }]}
                                    />
                                    <Text style={[twrnc`font-bold w-40`,{
                                        color: cadastroVeiculo === 'juridica' ? 'white' : '#FF5F00'
                                    }]}>Pessoa Jurídica</Text>
                            </Pressable>
                        </View>
                    )}

                    {proprietario && cadastroVeiculo != false && ( 
                        <View style={twrnc`mt-5 px-14`}>
                            <Text style={twrnc`text-sm`} >O veículo tem <Text style={styles.span}>rastreador</Text> ?</Text>

                            { tracker === true ?
                                <View style={twrnc`flex mt-2 gap-5`}>
                                    <View style={twrnc`flex border border-[#FF5F00]`}>
                                        <Text style={twrnc`flex text-xs ml-2 font-bold text-[#FF5F00]`}>Marca</Text>
                                        <TextInput style={twrnc`flex  p-1 pl-5`}
                                        onChangeText={(txt)=>{setBrandTracker(txt)}}
                                        value={brandTracker}
                                        ></TextInput>
                                    </View>
                                    <View style={twrnc`flex border border-[#FF5F00]`}>
                                        <Text style={twrnc`flex text-xs ml-2 font-bold text-[#FF5F00]`}>Nº Terminal</Text>
                                        <TextInput style={twrnc`flex p-1 pl-5`}
                                        onChangeText={(txt)=>{setNumberTracker(txt)}}
                                        value={numberTracker}
                                        ></TextInput>
                                    </View>

                                    <View style={twrnc`flex flex-row justify-center items-center`}>
                                        <Pressable 
                                        style={twrnc`bg-[#FF5F00] py-2 px-3`}
                                            onPress={()=>{
                                                handleTracker('back')
                                            }}
                                        >
                                            <Text style={twrnc`font-bold text-white rounded-xl`}>Voltar</Text>

                                        </Pressable>
                                        <CheckBox
                                                title="Ativo"
                                                checkedColor= {true ? '#28a745' :"#FF5F00"}
                                                uncheckedColor="#FF5F00"
                                                containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                titleProps={{
                                                    style: { 
                                                        color: statusTracker  ? '#28a745' :"#FF5F00",
                                                        fontFamily:'Roboto_500Medium',
                                                    }
                                                    }}
                                                    checked={statusTracker}
                                                    size={25}
                                                    onPress={()=>{setStatusTracker(true)}}
                                        />
                                        <CheckBox
                                                title="Inativo"
                                                checkedColor= {statusTracker === false ? '#28a745' :"#FF5F00"}
                                                uncheckedColor="#FF5F00"
                                                containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                titleProps={{
                                                    style: { 
                                                        color: statusTracker === false  ? '#28a745' :"#FF5F00",
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
                                            style={[twrnc`border border-[#FF5F00] p-2 flex flex-row justify-center items-center  mt-2 gap-5 rounded-lg ` ,
                                                { backgroundColor: tracker === true ? '#FF5F00' : 'transparent'}
                                            ]}
                                            onPress={()=>{ handleTracker(true) }}
                                        >
                                            <Image
                                            source={require('../../../img/icons/trackerOn.png')}
                                            style={[twrnc`w-7 h-7`,{
                                                tintColor: tracker === true ? 'white' : '#FF5F00'
                                            }]}
                                            />
                                            <Text style={[twrnc`font-bold w-40`,{
                                                color: tracker === true ? 'white' : '#FF5F00'
                                            }]}>Sim</Text>
                                    </Pressable>

                                    <Pressable 
                                            style={[twrnc`border border-[#FF5F00] p-2 flex flex-row justify-center items-center mt-2 gap-5 rounded-lg ` ,{
                                                backgroundColor: tracker === false ? '#FF5F00' : 'transparent'
                                            }]}
                                            onPress={()=>{handleTracker(false)}}
                                        >
                                        <Image
                                            source={require('../../../img/icons/trackerOf.png')}
                                            style={[twrnc`w-7 h-7`, {
                                                tintColor: tracker === false ? 'white' : '#FF5F00'
                                            }]}
                                            />
                                            <Text style={[twrnc`font-bold w-40`,{
                                                color: tracker === false ? 'white' : '#FF5F00'
                                            }]}>Não</Text>
                                    </Pressable> 
                                </>
                            }

                        </View>
                    )} 

                </View>
                {proprietario && cadastroVeiculo != false && (tracker === false || statusTracker != null && numberTracker != null && brandTracker != null ) && (
                    <View style={twrnc`mt-5 flex items-center`}>
                        <Pressable 
                            style={twrnc`bg-[#FF5F00] rounded py-2 px-5`}
                            onPress={modalIsVisible}
                        >
                            <Text style={twrnc`font-bold text-white`}>Continuar</Text>
                        </Pressable>
                    </View>
                )}
            </View>


            <Modal
                visible={modalVisible} animationType='slide' transparent={true}
            >
                        <View style={styles.modal}>
                            <View style={styles.containerModal}>
                                <View style={styles.modalHeader}>
                                        <Text> </Text>
                                        <Text style={[styles.btnTxt, {fontSize:25}]}>
                                        {typeCar === false ? 'Escolha uma opção' :'MIX Transportes'}
                                        </Text>
                                        <Pressable onPress={() => {
                                            if(typeCar === false){
                                                modalIsVisible()
                                            }else{
                                                typeCars()
                                                setTxtInputCar('')
                                            }
                                        }}>
                                            <Image
                                                style={[styles.btnIcon, {height:25, width:25, marginTop:5}]}
                                                source={require('../../../img/icons/x.png')}
                                            />
                                        </Pressable>
                                </View>
                                {typeCar === false ?<View style={[styles.containerOpition,{marginTop:'18%'}]}>
                                    <Pressable 
                                        style={styles.btn}
                                        onPress={()=>{typeCars('leve')}}
                                    >
                                        <View style={[styles.btnContainer, {width:'65%'}]}>
                                            <Image 
                                                style={[styles.btnIcon,{width:60,height:60}]}
                                                source={require('../../../img/icons/caminhaoLeve.png')}
                                            />
                                            <Text style={styles.btnTxt}>Leve</Text>
                                        </View>
                                    </Pressable>

                                    <Pressable 
                                        style={styles.btn}
                                        onPress={()=>{typeCars('medio')}}
                                    >
                                        <View style={styles.btnContainer}>
                                            <Image
                                                style={[styles.btnIcon,{width:60,height:60}]}
                                                source={require('../../../img/icons/caminhaoMedio.png')}
                                            />
                                            <Text style={styles.btnTxt}>Médio</Text>
                                        </View>
                                    </Pressable>

                                    <Pressable 
                                        style={styles.btn}
                                        onPress={()=>{typeCars('pesado')}}
                                    >
                                        <View style={[styles.btnContainer,{width:'74%'}]}>  
                                            <Image
                                                style={[styles.btnIcon,{width:60,height:60}]}
                                                source={require('../../../img/icons/caminhaoPesado.png')}
                                            />
                                            <Text style={styles.btnTxt}>Pesado</Text>
                                        </View>
                                    </Pressable>
                                    <View>
                                    </View>  
                                </View>:''}
                                <View style={styles.containerSelect}>
                                    {typeCar === false ? ''  : <Image
                                        style={[styles.btnIcon, {
                                            width:90,
                                            height:90,
                                            marginTop:20
                                        }]}
                                        source={ typeCar === 'leve' 
                                        ? require('../../../img/icons/caminhaoLeve.png'):
                                        typeCar === 'medio'
                                        ? require('../../../img/icons/caminhaoMedio.png') :
                                        typeCar === 'pesado' 
                                        ? require('../../../img/icons/caminhaoPesado.png'):
                                        null }
                                    />}
                                    
                                    <View style={{marginTop:20,width:'100%',alignItems:'center'}}>
                                        {typeCar === 'leve' ?
                                        <View style={{width:'100%',alignItems:'center'}}>
                                            { checkCar !='Outro'?
                                            <View>
                                            <CheckBox style={styles.checkCar}
                                                    title="3/4"
                                                    checkedColor= {checkCar ? '#28a745' :"#FF5F00"}
                                                    uncheckedColor="#FF5F00"
                                                    containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                    titleProps={{
                                                        style: { 
                                                            color:checkCar === '3/4' ? '#28a745' :"#FF5F00",
                                                            fontFamily:'Roboto_500Medium',
                                                        }
                                                    }}
                                                    checked={checkCar === '3/4' ? true : false}
                                                    size={25}
                                                    onPress={()=>{CheckCar('3/4')}}
                                            />
                                            <CheckBox style={styles.checkCar}
                                                    title="Fiorino"
                                                    checkedColor= {checkCar === 'fiorino'  ? '#28a745' :"#FF5F00"}
                                                    uncheckedColor="#FF5F00"
                                                    containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                    titleProps={{
                                                        style: { 
                                                            color:checkCar === 'fiorino' ? '#28a745' :"#FF5F00",
                                                            fontFamily:'Roboto_500Medium',
                                                        }
                                                    }}
                                                    checked={checkCar === 'fiorino' ? true : false}
                                                    size={25}
                                                    onPress={()=>{CheckCar('fiorino')}}
                                            />
                                            <CheckBox style={styles.checkCar}
                                                    title="Toco"
                                                    checkedColor= {checkCar ? '#28a745' :"#FF5F00"}
                                                    uncheckedColor="#FF5F00"
                                                    containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                    titleProps={{
                                                        style: { 
                                                            color:checkCar === 'toco' ? '#28a745' :"#FF5F00",
                                                            fontFamily:'Roboto_500Medium',
                                                        }
                                                    }}
                                                    checked={checkCar === 'toco' ? true : false}
                                                    size={25}
                                                    onPress={()=>{CheckCar('toco')}}
                                            />
                                            <CheckBox style={styles.checkCar}
                                                    title="VLC"
                                                    checkedColor= {checkCar ? '#28a745' :"#FF5F00"}
                                                    uncheckedColor="#FF5F00"
                                                    containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                    titleProps={{
                                                        style: { 
                                                            color:checkCar === 'vlc' ? '#28a745' :"#FF5F00",
                                                            fontFamily:'Roboto_500Medium',
                                                        }
                                                    }}
                                                    checked={checkCar === 'vlc' ? true : false}
                                                    size={25}
                                                    onPress={()=>{CheckCar('vlc')}}
                                            />
                                            </View> : ''}
                                            
                                            <View style={{width:'100%',alignItems:'center'}}>
                                                <CheckBox style={styles.checkCar}
                                                        title="Outro"
                                                        checkedColor= {checkCar === "Outro" ? '#28a745' :"#FF5F00"}
                                                        uncheckedColor="#FF5F00"
                                                        containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                        titleProps={{
                                                            style: { 
                                                                color:checkCar === 'Outro' ? '#28a745' :"#FF5F00",
                                                                fontFamily:'Roboto_500Medium',
                                                            }
                                                        }}
                                                        checked={checkCar === 'Outro' ? true : false}
                                                        size={25}
                                                    onPress={()=>{CheckCar('Outro')}}
                                                />
                                            </View>     
                                            {checkCar ==='Outro'?
                                                <View style={[styles.containerOutro,]}><Text style={styles.labelOutro}>Digite o perfil do veículo</Text>
                                                    <TextInput 
                                                        style={styles.inputOutro}
                                                        onChangeText={(txt)=>{
                                                            setTxtInputCar(txt)
                                                        }}
                                                        value={txtInputCar}
                                                    >
                                                    </TextInput>
                                                </View>:''}
                                                { btnIsVisible ? 
                                            <View style={[styles.containerBtnNext,{marginTop:
                                                checkCar != 'Outro' ? 0 : 50
                                            }]}>
                                                <Pressable 
                                                    style={[styles.btnNext, {
                                                        padding:11,
                                                        backgroundColor: (checkCar != false || txtInputCar.length > 1) && (checkCar != 'Outro' || txtInputCar.length > 1) ? '#FF5F00' : 'transparent'
                                                    }]}
                                                    onPress={navegacao}
                                                >
                                                    <Text style={[styles.btnNextTxt,{
                                                        color: (checkCar != false || txtInputCar.length > 1) && (checkCar != 'Outro' || txtInputCar.length > 1)   ? 'white' : '#FF5F00'
                                                    }]}>Continuar</Text>
                                                </Pressable>

                                            </View> : ''}
                                        </View> : ''}
                                        
                                        {typeCar === 'medio'? 
                                        <View style={{width:'100%', alignItems:'center'}}>
                                            { checkCar !='Outro'?<View>
                                                <CheckBox style={styles.checkCar}
                                                    title="Bitruck"
                                                    checkedColor= {checkCar === "Bitruck" ? '#28a745' :"#FF5F00"}
                                                    uncheckedColor="#FF5F00"
                                                    containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                    titleProps={{
                                                        style: { 
                                                            color:checkCar === 'Bitruck' ? '#28a745' :"#FF5F00",
                                                            fontFamily:'Roboto_500Medium',
                                                        }
                                                    }}
                                                    checked={checkCar === 'Bitruck' ? true : false}
                                                    size={25}
                                                    onPress={()=>{CheckCar('Bitruck')}}
                                                />

                                                <CheckBox style={styles.checkCar}
                                                    title="Truck"
                                                    checkedColor= {checkCar === "Truck" ? '#28a745' :"#FF5F00"}
                                                    uncheckedColor="#FF5F00"
                                                    containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                    titleProps={{
                                                        style: { 
                                                            color:checkCar === 'Truck' ? '#28a745' :"#FF5F00",
                                                            fontFamily:'Roboto_500Medium',
                                                        }
                                                    }}
                                                    checked={checkCar === 'Truck' ? true : false}
                                                    size={25}
                                                onPress={()=>{CheckCar('Truck')}}
                                            />
                                            </View>:''}
                                            <View style={{width:'100%',alignItems:'center'}}>
                                                <CheckBox style={styles.checkCar}
                                                        title="Outro"
                                                        checkedColor= {checkCar === "Outro" ? '#28a745' :"#FF5F00"}
                                                        uncheckedColor="#FF5F00"
                                                        containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                        titleProps={{
                                                            style: { 
                                                                color:checkCar === 'Outro' ? '#28a745' :"#FF5F00",
                                                                fontFamily:'Roboto_500Medium',
                                                            }
                                                        }}
                                                        checked={checkCar === 'Outro' ? true : false}
                                                        size={25}
                                                    onPress={()=>{CheckCar('Outro')}}
                                                />
                                               
                                                {checkCar ==='Outro'?
                                                <View style={[styles.containerOutro,]}><Text style={styles.labelOutro}>Digite o perfil do veículo</Text>
                                                    <TextInput 
                                                        style={styles.inputOutro}
                                                        onChangeText={(txt)=>{
                                                            setTxtInputCar(txt)
                                                        }}
                                                        value={txtInputCar}
                                                    >
                                                    </TextInput>
                                                </View>:''}
                                                { btnIsVisible ? 
                                            <View style={[styles.containerBtnNext,{marginTop:
                                                checkCar != 'Outro' ? 0 : 50
                                            }]}>
                                                <Pressable 
                                                    style={[styles.btnNext, {
                                                        padding:11,
                                                        backgroundColor: (checkCar != false || txtInputCar.length > 1) && (checkCar != 'Outro' || txtInputCar.length > 1) ? '#FF5F00' : 'transparent'
                                                    }]}
                                                    onPress={navegacao}
                                                >
                                                    <Text style={[styles.btnNextTxt,{
                                                        color: (checkCar != false || txtInputCar.length > 1) && (checkCar != 'Outro' || txtInputCar.length > 1)   ? 'white' : '#FF5F00'
                                                    }]}>Continuar</Text>
                                                </Pressable>

                                            </View> : ''}
                                            </View>
                                        </View> : ''}
                                        
                                        {typeCar === 'pesado'? 
                                        <View style={{width:'100%',alignItems:'center'}}>
                                            {checkCar !='Outro'?
                                            <View >
                                                <CheckBox style={styles.checkCar}
                                                    title="Bitrem"
                                                    checkedColor= {checkCar === "Bitrem" ? '#28a745' :"#FF5F00"}
                                                    uncheckedColor="#FF5F00"
                                                    containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                    titleProps={{
                                                        style: { 
                                                            color:checkCar === 'Bitrem' ? '#28a745' :"#FF5F00",
                                                            fontFamily:'Roboto_500Medium',
                                                        }
                                                    }}
                                                    checked={checkCar === 'Bitrem' ? true : false}
                                                    size={25}
                                                onPress={()=>{CheckCar('Bitrem')}}
                                                />

                                                <CheckBox style={styles.checkCar}
                                                        title="Truck"
                                                        checkedColor= {checkCar === "Carreta" ? '#28a745' :"#FF5F00"}
                                                        uncheckedColor="#FF5F00"
                                                        containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                        titleProps={{
                                                            style: { 
                                                                color:checkCar === 'Carreta' ? '#28a745' :"#FF5F00",
                                                                fontFamily:'Roboto_500Medium',
                                                            }
                                                        }}
                                                        checked={checkCar === 'Carreta' ? true : false}
                                                        size={25}
                                                    onPress={()=>{CheckCar('Carreta')}}
                                                />

                                                <CheckBox style={styles.checkCar}
                                                        title="Carreta LS"
                                                        checkedColor= {checkCar === "CarretaLS" ? '#28a745' :"#FF5F00"}
                                                        uncheckedColor="#FF5F00"
                                                        containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                        titleProps={{
                                                            style: { 
                                                                color:checkCar === 'CarretaLS' ? '#28a745' :"#FF5F00",
                                                                fontFamily:'Roboto_500Medium',
                                                            }
                                                        }}
                                                        checked={checkCar === 'CarretaLS' ? true : false}
                                                        size={25}
                                                    onPress={()=>{CheckCar('CarretaLS')}}
                                                />

                                                <CheckBox style={styles.checkCar}
                                                        title="RodoTrem"
                                                        checkedColor= {checkCar === "RodoTrem" ? '#28a745' :"#FF5F00"}
                                                        uncheckedColor="#FF5F00"
                                                        containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                        titleProps={{
                                                            style: { 
                                                                color:checkCar === 'RodoTrem' ? '#28a745' :"#FF5F00",
                                                                fontFamily:'Roboto_500Medium',
                                                            }
                                                        }}
                                                        checked={checkCar === 'RodoTrem' ? true : false}
                                                        size={25}
                                                    onPress={()=>{CheckCar('RodoTrem')}}
                                                />

                                                <CheckBox style={styles.checkCar}
                                                        title="Vanderléia"
                                                        checkedColor= {checkCar === "Vanderleia" ? '#28a745' :"#FF5F00"}
                                                        uncheckedColor="#FF5F00"
                                                        containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                        titleProps={{
                                                            style: { 
                                                                color:checkCar === 'Vanderleia' ? '#28a745' :"#FF5F00",
                                                                fontFamily:'Roboto_500Medium',
                                                            }
                                                        }}
                                                        checked={checkCar === 'Vanderleia' ? true : false}
                                                        size={25}
                                                        onPress={()=>{CheckCar('Vanderleia')}}
                                                /> 
                                            </View>: ''}

                                            <View style={{width:'100%',alignItems:'center'}}>
                                                <CheckBox style={styles.checkCar}
                                                        title="Outro"
                                                        checkedColor= {checkCar === "Outro" ? '#28a745' :"#FF5F00"}
                                                        uncheckedColor="#FF5F00"
                                                        containerStyle={{ backgroundColor: 'transparent', borderWidth:0 }}
                                                        titleProps={{
                                                            style: { 
                                                                color:checkCar === 'Outro' ? '#28a745' :"#FF5F00",
                                                                fontFamily:'Roboto_500Medium',
                                                            }
                                                        }}
                                                        checked={checkCar === 'Outro' ? true : false}
                                                        size={25}
                                                    onPress={()=>{CheckCar('Outro')}}
                                                />
                                                {checkCar ==='Outro'?
                                                <View style={[styles.containerOutro,]}><Text style={styles.labelOutro}>Digite o perfil do veículo</Text>
                                                    <TextInput 
                                                        style={styles.inputOutro}
                                                        onChangeText={(txt)=>{
                                                            setTxtInputCar(txt)
                                                        }}
                                                        value={txtInputCar}
                                                    >
                                                    </TextInput>
                                                </View>:''}
                                            </View>
                                            { btnIsVisible ? 
                                            <View style={[styles.containerBtnNext,{marginTop:
                                                checkCar != 'Outro' ? 0 : 50
                                            }]}>
                                                <Pressable 
                                                    style={[styles.btnNext, {
                                                        padding:11,
                                                        backgroundColor: (checkCar != false || txtInputCar.length > 1) && (checkCar != 'Outro' || txtInputCar.length > 1) ? '#FF5F00' : 'transparent'
                                                    }]}
                                                    onPress={navegacao}
                                                >
                                                    <Text style={[styles.btnNextTxt,{
                                                        color: (checkCar != false || txtInputCar.length > 1) && (checkCar != 'Outro' || txtInputCar.length > 1)   ? 'white' : '#FF5F00'
                                                    }]}>Continuar</Text>
                                                </Pressable>

                                            </View> : ''}

                                        </View> : ''}
                                    </View>
                                </View>
                            </View>
                        </View>
            </Modal>
        </KeyboardAwareScrollView>
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


