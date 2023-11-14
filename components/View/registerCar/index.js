import { View, Text, StyleSheet, Pressable, Image, Modal, TextInput, Keyboard  } from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';
import  { useState, useEffect } from 'react';
import { CheckBox } from 'react-native-elements';

export default function RegisterPhotoDoc({navigation}){
    const route = useRoute();
    
    const [proprietario, setProprietario] = useState(false);
    const [cadastroVeiculo, setCadastroVeiculo] = useState(false);

    const [modalVisible,setModalVisible] = useState(false);
    const [checkCar,setCheckCar] = useState(false);
    const [txtInputCar,setTxtInputCar] = useState(false);
    const [typeCar,setTypeCar] = useState(false)
    const [btnIsVisible, setBtnIsVisible] = useState(true)

    console.log(route.params)
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
            <View style={styles.container}>
                <View>
                    <Text style={styles.h1}>Foto</Text>
                    <Text style={styles.info}>Vamos registrar o seu veículo na <Text style={styles.span}>MIX</Text> </Text>
                </View>
                <View style={styles.containerOpitions}>
                    <View>
                        <View style={styles.containerTitle}>
                            <Text style={[styles.info, {marginTop:0,}]}>Quem é o <Text style={styles.span}>proprietário</Text> do veículo?</Text>
                        </View>

                        <View style={styles.containerOpition}>
                            
                            <Pressable 
                                style={[styles.btn,{
                                    backgroundColor: proprietario === 'eu' ? '#FF5F00' : 'transparent'
                                }]}
                                onPress={()=>{whoTheOwner('eu')}}
                            >
                                <View style={[styles.btnContainer, {width:'80%'}]}>
                                    <Image 
                                    style={[styles.btnIcon, {
                                        tintColor: proprietario === 'eu' ? 'white' : '#FF5F00'
                                    }]}
                                    source={require('../../../src/main/res/drawable-mdpi/assets/icons/pessoa.png')}
                                    />
                                    <Text style={[styles.btnTxt,{
                                        color: proprietario === 'eu' ? 'white' : '#FF5F00'
                                    }]}>Eu sou proprietário</Text>
                                </View>
                            </Pressable>
                            <Pressable 
                                style={[styles.btn,{
                                    backgroundColor: proprietario === 'outraPessoa' ? '#FF5F00' : 'transparent'
                                }]}
                                onPress={()=>{whoTheOwner('outraPessoa')
                            }}
                            >
                                <View style={styles.btnContainer}>
                                    <Image 
                                    style={[styles.btnIcon,{
                                        tintColor: proprietario === 'outraPessoa' ? 'white' : '#FF5F00'
                                    }]}
                                    source={require('../../../src/main/res/drawable-mdpi/assets/icons/outraPessoa.png')}
                                    />
                                    <Text style={[styles.btnTxt,{
                                        color: proprietario === 'outraPessoa' ? 'white' : '#FF5F00'
                                    }]}>Outra Pessoa</Text>
                                </View>
                            </Pressable>
                        </View>

                    </View>

                    {proprietario  != false? 
                    <View style={styles.containerOpitions}>
                        <View style={styles.containerTitle}>
                            <Text style={[styles.info, {marginTop:0,}]} >O veículo está <Text style={styles.span}>cadastrado</Text> como?</Text>
                        </View>
                        <View style={styles.containerOpition}>
                            <Pressable 
                                style={[styles.btn, {
                                    backgroundColor: cadastroVeiculo === 'fisica' ? '#FF5F00' : 'transparent'
                                }]}
                                onPress={()=>{HowAreYouRegistered('fisica')}}
                            >
                            
                            <View style={styles.btnContainer}>
                                <Image
                                source={require('../../../src/main/res/drawable-mdpi/assets/icons/fisica.png')}
                                style={[styles.btnIcon,{
                                    width:59,
                                    tintColor: cadastroVeiculo === 'fisica' ? 'white' : '#FF5F00'
                                }]}
                                />
                                <Text style={[styles.btnTxt,{
                                    color: cadastroVeiculo === 'fisica' ? 'white' : '#FF5F00'
                                }]}>Pessoa Física</Text>
                            </View>
                               
                            </Pressable>

                            <Pressable 
                                style={[styles.btn,{
                                    backgroundColor: cadastroVeiculo === 'juridica' ? '#FF5F00' : 'transparent'
                                }]}
                                onPress={()=>{HowAreYouRegistered('juridica')}}
                            >
                            <View style={[styles.btnContainer, {width:'75%'}]}>
                            <Image
                                source={require('../../../src/main/res/drawable-mdpi/assets/icons/juridico.png')}
                                style={[styles.btnIcon, {
                                    marginLeft:8,
                                    tintColor: cadastroVeiculo === 'juridica' ? 'white' : '#FF5F00'
                                }]}
                                />
                                <Text style={[styles.btnTxt,{
                                    color: cadastroVeiculo === 'juridica' ? 'white' : '#FF5F00'
                                }]}>Pessoa Jurídica</Text>
                            </View>
                            </Pressable>
                        </View>
                    </View>:''}
                </View>
                {proprietario && cadastroVeiculo != false?<View style={styles.containerBtnNext}>
                    <Pressable 
                        style={styles.btnNext}
                        onPress={modalIsVisible}
                    >
                        <Text style={[styles.btnNextTxt]}>Continuar</Text>
                    </Pressable>
                </View>:''}
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
                                                source={require('../../../src/main/res/drawable-mdpi/assets/icons/x.png')}
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
                                                source={require('../../../src/main/res/drawable-mdpi/assets/icons/caminhaoLeve.png')}
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
                                                source={require('../../../src/main/res/drawable-mdpi/assets/icons/caminhaoMedio.png')}
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
                                                source={require('../../../src/main/res/drawable-mdpi/assets/icons/caminhaoPesado.png')}
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
                                        ? require('../../../src/main/res/drawable-mdpi/assets/icons/caminhaoLeve.png'):
                                        typeCar === 'medio'
                                        ? require('../../../src/main/res/drawable-mdpi/assets/icons/caminhaoMedio.png') :
                                        typeCar === 'pesado' 
                                        ? require('../../../src/main/res/drawable-mdpi/assets/icons/caminhaoPesado.png'):
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


