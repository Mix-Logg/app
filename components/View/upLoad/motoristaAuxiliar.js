import { View, Text, StyleSheet, Image, Pressable, Modal, ActivityIndicator, ScrollView, SafeAreaView  } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import  { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import RegisterUser from "../../../hooks/registerUser";
import GetPath from "../../../function/getPathPicture";
import FixBar from "../../fixBar";
import PopUp from "../../modal";
import twrnc from "twrnc";
import Btn from "../../btn";
import { AntDesign } from '@expo/vector-icons';
import Help from "../../help";


export default function UpLoadEntregador({navigation}){
    const route = useRoute();
    const [loading, setLoading] = useState(false);

    const [isVisible, setIsVisible] = useState(false);
    const [modalBtnVisible, setModalBtnVisible] = useState(false);
    const [contDocument, setCountDocument] = useState(0)
    
    const [cpfVisible , setCpfVisible ] = useState(false)
    const [enderecoVisible , setenderecoVisible ] = useState(false)
    const [cnhVisible , setCnhVisible] = useState(false)
    
    const [cpfImage, setCpfImage] = useState(null);
    const [EnderecoImage, setEnderecoImage] = useState(null);
    const [cnhImage, setCnhImage] = useState(null);
    const [selfieImage, setSelfieImage] = useState(null);
    const [modal, setModal] = useState(null);
    const [popUp, setPopUp] = useState('');

    const [api, setApi] = useState(null);
    const newParam = {
        ...route.params,
        imgDoc:{
            addressImage: EnderecoImage,
            cnhImage: cnhImage,
            selfieImage:  selfieImage,
            cpfImage:cpfImage
        }
    };

    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLproduction
    
    
    useEffect(() => {
        // Função que verifica o estado de cada variável e atualiza o contador
        const updateCount = () => {    
          let newCount = 0
          if (cpfImage != null) newCount++;
          if (EnderecoImage != null) newCount++;
          if (cnhImage != null) newCount++;
          if (selfieImage != null) newCount++;
          setCountDocument(newCount);
        };
        // Chama a função de atualização sempre que alguma variável muda de estado
        updateCount();
      }, [cpfImage, EnderecoImage, cnhImage, selfieImage]);

      async function uploadFile(filename, valor,chave, ID, am, functionn ) {
        const extend = filename.split('.')[1];
        const formData = new FormData();
        formData.append('file', JSON.parse(JSON.stringify({
          name: chave+'.'+extend,
          uri: valor,
          type: 'image/' + extend,
        })));
        formData.append('id', ID)
        formData.append('am', am)
        formData.append('function', functionn)
        try {
          const response = await axios.post(URL+'upload-bucket/upload', formData, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          });
          if(await response.data.msg === 'success'){
            return true
          }else{
            return false
          }
        } catch (error) {
          console.error(`Erro ao enviar o arquivo ${filename}:`, error);
        }
      }
    
    const SelectOpition = async (option) =>{
        const path  = await GetPath(option);
        if(path.option === "file"){
            setIsVisible(false);
            setModalBtnVisible(false)
            setModal('')
            setModal(<PopUp type={'warning'} txt={'Aceitamos apenas arquivo do tipo PDF, e com o tamanho menor que 1GB.'} show={true}/>);
            return;
        }
        if(cpfVisible){
            setCpfImage(path)
        }else if(enderecoVisible){
            setEnderecoImage(path)
        }else if(cnhVisible){
            setCnhImage(path) 
        }else{
            setSelfieImage(path)
        }
        setIsVisible(false)
        setModalBtnVisible(false)
    }

    const openModal = (option = '') => {
        setenderecoVisible(false)
        setCpfVisible(false)
        setCnhVisible(false)
        if(option === "cnh"){
            setenderecoVisible(false)
            setCpfVisible(false)
            setCnhVisible(true)

            return setIsVisible(!isVisible)
        }
        else if(option === "endereco"){
            setCpfVisible(false)
            setCnhVisible(false)
            setenderecoVisible(true)

            return setIsVisible(!isVisible)
        }
        else if(option === "cpf"){
            setCnhVisible(false)
            setenderecoVisible(false)
            setCpfVisible(true)

            return setIsVisible(!isVisible)
        }
        setIsVisible(!isVisible)
    }
    
    const showModalOpotion = () => {
        setModalBtnVisible(!modalBtnVisible)
    }

    const modalInfo = async (option) => {
        setPopUp('')
        if(option === 'cnh'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve enviar a imagem da sua CNH'} show={true} />);
            return;
        }
        if(option === 'cpf'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve enviar a imagem do seu RG/CPF'} show={true} />);
            return;
        }
        if(option === 'address'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve enviar a imagem do seu endereço'} show={true} />);
            return;
        }
        if(option === 'selfie'){
            await setPopUp(<PopUp type={'warning'} txt={'Você deve enviar uma selfie'} show={true} />);
            return;
        }
        if(option === 'error'){
            await setModal(<PopUp type={'danger'} txt={'Algo deu errado, tente novamente mais tarde!'} show={true} />);
            return;
        }
    }

    const handleSubmit = async () => {
        await setPopUp('')
        const am = route.params.user.am
        const picture = {
            human: {
                addressImage: EnderecoImage,
                cnhImage: cnhImage,
                selfieImage: selfieImage,
                cpfImage: cpfImage
            }
        };
        route.params.picture = picture;
        if(am === 'driver' || am === 'motorcycle' || am === 'tour'){ 
            // if(cnhImage === null){
            //     await modalInfo('cnh')
            //     return;
            // }
            // if(cpfImage === null){
            //     await modalInfo('cpf')
            //     return;
            // }
            // if(EnderecoImage === null){
            //     await modalInfo('address')
            //     return;
            // }
            // if(selfieImage === null){
            //     await modalInfo('selfie')
            //     return;
            // }
            navigation.navigate('RegisterCar',route.params)
            return;
        }
        if(cpfImage === null){
                await modalInfo('cpf')
                return;
        }
        if(EnderecoImage === null){
                await modalInfo('address')
                return;
        }
        if(selfieImage === null){
                await modalInfo('selfie')
                return;
        }
        setLoading(true)
        const res = await RegisterUser(route.params)
        if(res == 200){
            navigation.navigate('Welcome')
            return;
        }
        setLoading(false)
        modalInfo('error')
        return;
    }

    return(
    <>
        {popUp}
        {loading === false ? 
        <SafeAreaView style={twrnc`h-full mt-6`}>
            <FixBar navigation={navigation} opition={'register'} />
            <ScrollView style={twrnc`bg-white`} >
                {modal}
                <View style={styles.container}>
                    <Text style={styles.h1}>Foto</Text>
                    <View style={twrnc`mt-5 mb-10`}>
                        <Help txt={'Você deve enviar as imagens para a avaliação interna, assim informaremos se você está hábito a trabalhar'} />
                    </View>
                    <View style={twrnc`px-15 gap-5 mb-10`}>
                        <Pressable
                            onPress={()=>{openModal('cnh')}}
                            style={[twrnc`flex-row border py-3 rounded-xl px-2 ${ cnhImage != null ? 'bg-[#28a745] border-[#28a745]' : ''}` ]}
                        >
                            <View style={twrnc`w-1/6`}>
                                <AntDesign name="upload" size={20} style={twrnc` ${ cnhImage != null ? 'text-white font-bold' : ''}`} />
                            </View>

                            <View style={twrnc`w-4/6 justify-center`}>
                                <Text style={[twrnc`text-center ${ cnhImage != null ? 'text-white font-bold' : ''}`]}>
                                    CNH 
                                    {route.params.user.am === 'auxiliary'? ' (opcional)' : '' } 
                                </Text>
                            </View>
                        </Pressable>

                        <Pressable
                            onPress={()=>{openModal('cpf')}}
                            style={twrnc`flex-row border py-3 rounded-xl px-2 ${cpfImage != null ? 'bg-[#28a745] border-[#28a745]' : ''}`}
                        >
                            <View style={twrnc`w-1/6`}>
                                <AntDesign name="upload" size={20} style={twrnc` ${ cpfImage != null ? 'text-white font-bold' : ''}`} />
                            </View>
                            <View style={twrnc`w-4/6 justify-center`}>
                                <Text style={twrnc`text-center ${ cpfImage != null ? 'text-white font-bold' : ''} `}>RG/CPF</Text>
                            </View>
                            
                        </Pressable>

                        <Pressable
                            onPress={()=>{ openModal('endereco') }}
                            style={twrnc`flex-row border py-4 rounded-xl px-2 ${EnderecoImage != null ? 'bg-[#28a745] border-[#28a745]' : ''}`}
                        >
                            <View style={twrnc`w-1/6`}>
                                <AntDesign name="upload" size={20} style={twrnc` ${ EnderecoImage != null ? 'text-white font-bold' : ''}`}  />
                            </View>
                            <View style={twrnc`w-5/6 justify-center`}>
                                <Text style={twrnc`text-center ${ EnderecoImage != null ? 'text-white font-bold' : ''} `}>Comprovante de Residência</Text>
                            </View>
                        </Pressable>
                        
                        <Pressable
                            onPress={()=>{openModal()}}
                            style={twrnc`flex-row border py-4 rounded-xl px-2 ${selfieImage != null ? 'bg-[#28a745] border-[#28a745]' : ''}`}
                        >
                            <View style={twrnc`w-1/6`}>
                            <AntDesign name="upload" size={20} style={twrnc` ${ selfieImage != null ? 'text-white font-bold' : ''}`}  />
                            </View>
                            <View style={twrnc`w-4/6 justify-center`}>
                                <Text style={twrnc`text-center ${ selfieImage != null ? 'text-white font-bold' : ''} `}>Selfie</Text>
                            </View>
                        </Pressable>

                    </View>
                    <Modal visible={isVisible} animationType='slide' transparent={true}>
                        {modalBtnVisible  ?  
                        <View style={styles.modal}>
                            <View style={[styles.containerModal, {height:'50%'}]}>
                                <View style={styles.modalHeader}>
                                    <Text> </Text>
                                    <Text style={styles.title}>
                                        Escolha uma opção
                                    </Text>
                                    <Pressable onPress={showModalOpotion}>
                                        <Image
                                            style={[styles.icon, {height:25, width:25, marginTop:5}]}
                                            source={require('../../../img/icons/x.png')}
                                        />
                                    </Pressable>
                                </View>
                                <View style={{marginBottom:15}}>
                                    <Pressable 
                                        style={styles.btn}
                                        onPress={() => SelectOpition('camera')}
                                    >
                                        <View style={styles.containerBtn}>
                                            <Image
                                                style={styles.icon}
                                                source={require('../../../img/icons/camera.png')}
                                            />
                                            <Text style={[styles.btnTxt,{marginLeft:0}]}>Abrir Câmera</Text>
                                        </View>
                                    </Pressable>

                                    <Pressable 
                                        style={styles.btn}
                                        onPress={() => SelectOpition('gallery')}
                                    >
                                        <View style={styles.containerBtn}>
                                            <Image
                                                style={styles.icon}
                                                source={require('../../../img/icons/galeria.png')}
                                            />
                                            <Text style={[styles.btnTxt,{marginLeft:0}]}>Abrir Galereria</Text>
                                        </View>
                                    </Pressable>

                                    <Pressable 
                                        style={styles.btn}
                                        onPress={() => SelectOpition('file')}
                                    >
                                        <View style={[styles.containerBtn, {width:'80%'} ]}>
                                            <Image
                                                style={styles.icon}
                                                source={require('../../../img/icons/arquivo.png')}
                                            />
                                            <Text style={[styles.btnTxt,{marginLeft:0}]}>Abrir Documentos</Text>
                                        </View>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        : <View style={styles.modal}>
                            <View style={styles.containerModal}>
                                
                                <View style={styles.modalHeader}>
                                    <Text> </Text>
                                    <Text style={styles.title}>
                                        { cpfVisible || cnhVisible || enderecoVisible ? 'Exemplo' : 'Selfie'}
                                    </Text>
                                    <Pressable onPress={openModal}>
                                        <Image
                                            style={[styles.icon, {height:25, width:25, marginTop:5}]}
                                            source={require('../../../img/icons/x.png')}
                                        />
                                    </Pressable>
                                </View>
                                { cpfVisible || cnhVisible || enderecoVisible ? <View style={styles.containerInfoModal}> 
                                    <Text style={styles.txtModal}> 
                                        Se for tirar foto não se esqueça de abrir o documento assim como o exemplo abaixo: 
                                    </Text> 
                                    <Image
                                        style={styles.imgExemplo}
                                        source={
                                            cpfVisible
                                            ? require('../../../img/imgExemplo/cpfRg.png')
                                            : enderecoVisible
                                            ? require('../../../img/imgExemplo/compravanteResidencia.png')
                                            : cnhVisible
                                            ? require('../../../img/imgExemplo/cnhFisica.png')
                                            : null // Defina um valor padrão ou nulo, se necessário
                                        }
                                    />
                                </View> : 
                                <View>
                                    <Text style={[styles.title,{marginTop:20}]}>Instruções:</Text>
                                    <View style={{marginTop:15}}>
                                        <Text style={[styles.txtSelfie, {marginTop:0}]}>1. Retire chapéu, boné e mascara. </Text>
                                        <Text style={styles.txtSelfie}>2. Retire óculos escuro. </Text>
                                        <Text style={styles.txtSelfie}>3. Foto centralizada. </Text>
                                        <Text style={styles.txtSelfie}>4. Lugar iluminado. </Text>
                                        <Text style={styles.txtSelfie}>5. Evite flash. </Text>
                                        <Text style={styles.txtSelfie}>6. Olhos abertos.</Text>
                                    </View>
                                    <View style={styles.containerIcon}>
                                    <Image
                                        style={[styles.icon,{ width:200, height: 200 }]}
                                        source={require('../../../img/icons/userSelfie.png')}
                                    />
                                    </View>

                                </View>
                                }
                                <View style={styles.containerBtnModal}>
                                    <Pressable style={styles.btnModal}
                                        onPress={showModalOpotion}
                                    >
                                        <Text style={styles.btnTxtModal}>Continuar</Text>
                                    </Pressable>
                                </View>

                            </View>
                        </View>  }
                    </Modal>
                    { route.params.user.am == 'auxiliary' ? 
                        <Btn title={'Finalizar'} action={handleSubmit} /> 
                        :
                        <Btn title={'Continue'} action={handleSubmit} />
                    }
                </View>
            </ScrollView> 
        </SafeAreaView>
        : 
            <View style={[twrnc`bg-white`,{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }]}>
                    <Text>Estamos cadastrando seus dados...</Text>
                    <ActivityIndicator size="large" color="#FF5F00" />
                    <Text style={twrnc`font-bold`}>Aguarde!</Text>
            </View>
        }

  
    </>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:16,
        backgroundColor:'white',
    },
    h1:{
        backgroundColor:'white',
        fontFamily:'Roboto_500Medium',
        fontSize:18
    },
    txtListen:{
        backgroundColor:'white',
        fontFamily:'Roboto_300Light',
        color:'#FF5F00',
        fontSize:16,
        marginTop:25,
        fontSize:25
    },
    containerInfo:{
        backgroundColor:'white',
        marginTop:25,
        padding:15,
        alignItems:'center'
    },
    txtInfo:{
        backgroundColor:'white',
        fontFamily:'Roboto_500Medium',
        fontSize:15
    },
    icon:{
        backgroundColor:'white',
        width:50,
        height:50,
        // marginLeft:15,
        tintColor:'#FF5F00'
    },
    btn:{
        backgroundColor:'white',
        borderWidth: 1,
        flexDirection:'row',
        borderRadius:15,
        height:80,
        alignItems:'center',
        marginTop:20,
        justifyContent:'space-between',
        paddingEnd:10,
        paddingStart:10,

    },
    btnTxt:{
        fontFamily:'Roboto_500Medium',
        color:'#FF5F00',
        fontSize: 18,
    },
    modal:{
        backgroundColor:'white',
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
        height:'90%',
        padding:16,
        justifyContent:'space-between'
    },
    modalHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    title:{
        fontSize:23,
        color:'#FF5F00',
        fontFamily:'Roboto_500Medium',
    },
    containerInfoModal:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:35
    },
    txtModal:{
        color:'#FF5F00',
        fontSize:15
    },
    imgExemplo:{
        marginTop:15,
        width:250,
        height:355
    },
    txtSelfie:{
        fontFamily:'Roboto_500Medium',
        fontSize:14,
        marginTop:10
    },
    containerIcon:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    },
    containerBtnModal:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    btnModal:{
        borderWidth:2,
        borderRadius:10,
        borderColor:'#FF5F00',
        padding:15,
        paddingLeft:45,
        paddingRight:45,
        backgroundColor:'#FF5F00'
    },
    btnTxtModal:{
        fontFamily:'Roboto_500Medium',
        color:'white',
        fontSize:18,
    },
    containerBtn:{
        alignItems:'center',
        justifyContent:'center', 
        flexDirection:'row',
        width:'75%',
        justifyContent:'space-between'
    },
    btnContinue:{
        borderWidth:2,
        borderColor:'#FF5F00',
        borderRadius:15,
        padding:10,
        paddingLeft:50,
        paddingRight:50
    }
})

