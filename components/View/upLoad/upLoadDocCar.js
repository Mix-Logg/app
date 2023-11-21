import { View, Text, StyleSheet, Image, Pressable, Modal, ActivityIndicator  } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import  { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useRoute } from '@react-navigation/native';
import axios from "axios";


export default function UpLoadDocCar({navigation}){
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    
    const [infoCadastroCar, setInfoCadastroCar] = useState(false);
    const [numberDocument, setNumberDocument] = useState(0)
    const [isVisible, setIsVisible] = useState(false);
    const [modalBtn, setModalBtn] = useState(false);
    const [contDocument, setCountDocument] = useState(0)
    
    const [clvVisible,setClvVisible] = useState(null)
    const [anttVisible,setAnttVisible] = useState(null) 
    const [cnpjVisible, setCnpjVisible] = useState(null)
    const [inscicaoEstadualVisible, setInscicaoEstadualVisible] = useState(null)
    const [residenciaVisible, setResidenciaVisible] = useState(null)
    const [cpfVisible, setCpfVisible] = useState(null)
    
    const [clvImage, setClvImage] = useState(null);
    const [anttImage, setAnttImage] = useState(null);
    const [inscricaoEstadualImage, setInscricaoEstadualImage] = useState(null);
    const [residenciaDonoImage, setResidenciaDonoImage] = useState(null);
    const [cpfDonoImage, setCpfDonoImage] = useState(null);
    const [cnpjImage, setCnpjImage] = useState(null);
    
    const newParams = {
        ...route.params,
        imgDocCar:{
            clvImage:clvImage,
            anttImage:anttImage,
            estadualImage:inscricaoEstadualImage,
            cnpjImage:cnpjImage,
            residenciaDono:residenciaDonoImage,
            cpfDonoImage:cpfDonoImage,
        }
    }

    useEffect(() => {
        if(route.params.dataCar.cadastroVeiculo === 'fisica' && route.params.dataCar.proprietario === 'eu'){
            setInfoCadastroCar('fisicaEu')
            setNumberDocument(2)
            // console.log('Pessoa fisica e Proprietario')
        }
        if(route.params.dataCar.cadastroVeiculo === 'juridica' && route.params.dataCar.proprietario === 'eu'){
            setInfoCadastroCar('juridicoEu')
            setNumberDocument(4)
            // console.log('Pessoa Juridica e Proprietario')
        }
        if(route.params.dataCar.cadastroVeiculo === 'fisica' && route.params.dataCar.proprietario === 'outraPessoa'){
            setInfoCadastroCar('fisicaOutra')
            setNumberDocument(4)
        }
        if(route.params.dataCar.cadastroVeiculo === 'juridica' && route.params.dataCar.proprietario === 'outraPessoa'){
            setInfoCadastroCar('juridicoOutra')
            setNumberDocument(4)
        }
        const updateCount = () => {    
          let newCount = 0

          if (clvImage != null) newCount++;
          if (anttImage != null) newCount++;
          if (inscricaoEstadualImage != null) newCount++;
          if (residenciaDonoImage != null) newCount++;
          if (cpfDonoImage != null) newCount++;
          if (cnpjImage != null) newCount++;
          setCountDocument(newCount);
        };
        updateCount();
    }, [clvImage, anttImage, inscricaoEstadualImage, residenciaDonoImage, cpfDonoImage, cnpjImage, route.params.dataCar.cadastroVeiculo]);

    const SelectOpition = async (escolha) =>{        
        if(escolha === 'galeria'){
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
            });
            // console.log(result.assets[0].uri)
            if(cpfVisible){
                setCpfDonoImage(result.assets[0].uri)
            }else if(clvVisible){
                setClvImage(result.assets[0].uri)
            }else if(anttVisible){
                setAnttImage(result.assets[0].uri) 
            }else if(cnpjVisible){
                setCnpjImage(result.assets[0].uri)
            }else if(inscicaoEstadualVisible){
                setInscricaoEstadualImage(result.assets[0].uri)
            }else if(residenciaVisible){
                setResidenciaDonoImage(result.assets[0].uri)
            }
        }

        if(escolha === 'camera'){
            const options = {
                allowsEditing: true, // Permite a edição da imagem (opcional)
            };
            const result = await ImagePicker.launchCameraAsync(options);
            if (!result.cancelled) {
                // console.log('Caminho da imagem capturada: ', result);
                if(cpfVisible){
                    setCpfDonoImage(result.uri)
                }else if(clvVisible){
                    setClvImage(result.uri)
                }else if(anttVisible){
                    setAnttImage(result.uri) 
                }else if(cnpjVisible){
                    setCnpjImage(result.uri)
                }else if(inscicaoEstadualVisible){
                    setInscricaoEstadualImage(result.uri)
                }else if(residenciaVisible){
                    setResidenciaDonoImage(result.uri)
                }
            }
        }

        if(escolha === 'arquivo'){
            try {
                const result = await DocumentPicker.getDocumentAsync({});
                // console.log(result.assets[0].uri)
                if(cpfVisible){
                    setCpfDonoImage(result.assets[0].uri)
                }else if(clvVisible){
                    setClvImage(result.assets[0].uri)
                }else if(anttVisible){
                    setAnttImage(result.assets[0].uri) 
                }else if(cnpjVisible){
                    setCnpjImage(result.assets[0].uri)
                }else if(inscicaoEstadualVisible){ 
                    setInscricaoEstadualImage(result.assets[0].uri)
                }else if(residenciaVisible){
                    setResidenciaDonoImage(result.assets[0].uri)
                }

            } catch (error) {
                console.error('Erro ao selecionar o documento:', error);
            }
        }
        openModalDocCar()
    }

    const openModalDocCar = (option = '') => {
        setClvVisible(false)
        setAnttVisible(false)
        setCnpjVisible(false)
        setInscicaoEstadualVisible(false)
        setResidenciaVisible(false)
        setCpfVisible(false)
        
        if(option === "clv"){
            setClvVisible(true)
            
            setAnttVisible(false)
            setCnpjVisible(false)
            setInscicaoEstadualVisible(false)
            setResidenciaVisible(false)
            setCpfVisible(false)

            return setIsVisible(!isVisible)
        }
        else if(option === "antt"){
            setAnttVisible(true)
            
            setClvVisible(false)
            setCnpjVisible(false)
            setInscicaoEstadualVisible(false)
            setResidenciaVisible(false)
            setCpfVisible(false)

            return setIsVisible(!isVisible)
        }
        else if(option === "cnpj"){
            setCnpjVisible(true)
            
            setClvVisible(false)
            setAnttVisible(false)
            setInscicaoEstadualVisible(false)
            setResidenciaVisible(false)
            setCpfVisible(false)
            
            return setIsVisible(!isVisible)
        }
        else if(option === "estadual"){
            setInscicaoEstadualVisible(true)
            
            setCnpjVisible(false)
            setClvVisible(false)
            setAnttVisible(false)
            setResidenciaVisible(false)
            setCpfVisible(false)
            
            return setIsVisible(!isVisible)
        }
        else if(option === "endereco"){
            setResidenciaVisible(true)
            
            setInscicaoEstadualVisible(false)
            setCnpjVisible(false)
            setClvVisible(false)
            setAnttVisible(false)
            setInscicaoEstadualVisible(false)
            setCpfVisible(false)
            
            return setIsVisible(!isVisible)
        }
        else if(option === "cpf"){
            setCpfVisible(true)
            
            setInscicaoEstadualVisible(true)
            setCnpjVisible(false)
            setClvVisible(false)
            setAnttVisible(false)
            setInscicaoEstadualVisible(false)
            setResidenciaVisible(false)
            
            
            return setIsVisible(!isVisible)
        }

        setIsVisible(!isVisible)
    }
    
    const showModalDoc = () => {
        setModalBtn(!modalBtn)
    }

    const navegacao = async () => {
        setLoading(true)
        console.log('cliq')
        if(
        (infoCadastroCar === 'fisicaEu' && clvImage != null && anttImage != null) ||
        (infoCadastroCar === 'fisicaOutra' && clvImage != null && anttImage != null && residenciaDonoImage != null && cpfDonoImage != null) ||
        (infoCadastroCar === 'juridicoEu' && clvImage != null && anttImage != null && cnpjImage != null && inscricaoEstadualImage != null) ||
        (infoCadastroCar === 'juridicoOutra' && clvImage != null && anttImage != null && cnpjImage != null && inscricaoEstadualImage != null)
        ){     
            const expoUrl =  'clownfish-app-nc7ss.ondigitalocean.app/motorista/register';
            const res  = await axios.post(expoUrl, newParams)
            const imgDocCar = res.data.data.docCar;
            const imgDocFisica = res.data.data.doc;
            
            async function uploadFile(filename, valor,chave) {
                    const extend = filename.split('.')[1];
                    const formData = new FormData();
                    formData.append('file', JSON.parse(JSON.stringify({
                      name: chave+'.'+extend,
                      uri: valor,
                      type: 'image/' + extend,
                    })));
                    
                    try {
                      const expoUrl = 'clownfish-app-nc7ss.ondigitalocean.app/motorista/image';
                      await axios.post(expoUrl, formData, {
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'multipart/form-data',
                        },
                      });
                    } catch (error) {
                      console.error(`Erro ao enviar o arquivo ${filename}:`, error);
                    }
            }
                  
                 
            try{
                    for (const chave in imgDocFisica) {
                    const valor = imgDocFisica[chave];
                    if (valor != null) {
                      const filename = valor.substring(valor.lastIndexOf('/') + 1);
                    //   await new Promise(resolve => setTimeout(resolve, 2000));
                      uploadFile(filename, valor, chave);
                    }
                    }
                    
                    // console.log('PRE')
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    // console.log('APÓS')
                    
                    
                    for (const chave in imgDocCar) {
                    const valor = imgDocCar[chave];
                    if (valor != null) {
                      const filename = valor.substring(valor.lastIndexOf('/') + 1);
                    //   await new Promise(resolve => setTimeout(resolve, 2000));
                      uploadFile(filename, valor, chave);
                    }
                    }

                    try{
                        const expoUrl = 'clownfish-app-nc7ss.ondigitalocean.app/motorista/registerImage';
                        await axios.post(expoUrl,{id:res.data.data.id})
                        try{
                            const expoUrl = 'clownfish-app-nc7ss.ondigitalocean.app/motorista/uploadBucker';
                            await axios.post(expoUrl)
                            navigation.navigate('RegistrationStuation');
                            setLoading(false)
                        }catch(err){
                            console.error('Erro na requisição Bucket:', err);
                        }
                    }catch(err){
                        console.error('Erro na requisição:', err);
                    }
            }catch(err){
                console.log('erro: ')
            }
            
        }
    }

    return(
        <>
         {loading === false ? 
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <Text style={styles.h1}>Foto</Text>
                <Text style={styles.txtListen}>
                    Última coisa a verificar.
                </Text>
                <View style={styles.containerInfo}>
                    <Text style={styles.txtInfo}>
                        Lembre-se que você pode escolher tirar uma foto, selecionar um PDF, ou escolher uma foto que você  ja tenha na sua galeria
                    </Text>
                    <Text style={[styles.txtInfo, {position:'absolute', left:230, top: 95}]}>
                    {contDocument} de {numberDocument} arquivos.
                    </Text>
                </View>
                <View style={{marginTop:50,}}>
                    
                    <Pressable
                        onPress={()=>{openModalDocCar('clv')}}
                        style={[styles.btn, {marginTop:0, borderColor: clvImage != null ? '#28a745' : '#FF5F00'}]}
                    >
                        <Image
                            style={[styles.icon, {tintColor: clvImage != null ? '#28a745' : '#FF5F00'}]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/upload.png')}
                        />
                        <Text style={[styles.btnTxt, {color: clvImage != null ? '#28a745' : '#FF5F00'}]}>CLV (Documento do Veículo)</Text>

                        { clvImage != null ?
                            <Image
                            style={[styles.icon, {width:30,height:30,tintColor: clvImage != null ? '#28a745' : '#FF5F00'} ]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/ok.png')}
                        /> : <View></View> }
                    </Pressable>

                    <Pressable
                        onPress={()=>{openModalDocCar('antt')}}
                        style={[styles.btn,{ borderColor: anttImage != null ? '#28a745' : '#FF5F00' }]}
                    >
                        <Image
                            style={[styles.icon, {tintColor: anttImage != null ? '#28a745' : '#FF5F00'} ]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/upload.png')}
                        />
                        <Text style={[styles.btnTxt, {color:anttImage != null ? '#28a745' : '#FF5F00' }]}>ANTT</Text>
                        {anttImage != null ?
                            <Image
                            style={[styles.icon, {width:30,height:30 ,tintColor: anttImage != null ? '#28a745' : '#FF5F00'} ]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/ok.png')}
                        /> : <View></View> }
                    </Pressable>

                    {infoCadastroCar === 'juridicoEu' || infoCadastroCar === 'juridicoOutra' ?
                    <Pressable
                        onPress={()=>{ openModalDocCar('cnpj') }}
                        style={[styles.btn, {borderColor: cnpjImage != null ? '#28a745' : '#FF5F00'}]}
                    >
                        <Image
                            style={[styles.icon, {tintColor : cnpjImage != null ? '#28a745' : '#FF5F00'}]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/upload.png')}
                        />
                        <Text style={[styles.btnTxt,{marginLeft:5, color: cnpjImage != null ? '#28a745' : '#FF5F00'}]}>CNPJ</Text>

                        {cnpjImage != null ?
                            <Image
                            style={[styles.icon, {width:30,height:30,tintColor: cnpjImage != null ? '#28a745' : '#FF5F00'} ]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/ok.png')}
                        /> : <View></View> }
                    </Pressable> : ''}
                    
                    {infoCadastroCar === 'juridicoEu' || infoCadastroCar === 'juridicoOutra' ?
                    <Pressable
                        onPress={()=>{openModalDocCar('estadual')}}
                        style={[styles.btn , {borderColor: inscricaoEstadualImage != null  ?  '#28a745' : '#FF5F00'}]}
                    >
                        <Image
                            style={[styles.icon, {tintColor: inscricaoEstadualImage != null  ?  '#28a745' : '#FF5F00' }]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/upload.png')}
                        />
                        <Text style={[styles.btnTxt, { color: inscricaoEstadualImage != null  ?  '#28a745' : '#FF5F00' }]}> Inscrição Estadual </Text>
                        {inscricaoEstadualImage != null ?
                            <Image
                            style={[styles.icon, {width:30,height:30, tintColor: inscricaoEstadualImage != null ? '#28a745' : '#FF5F00'} ]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/ok.png')}
                        /> : <View></View> }
                    </Pressable> : ''}

                    {infoCadastroCar === 'fisicaOutra' ?
                    <Pressable
                        onPress={()=>{openModalDocCar('endereco')}}
                        style={[styles.btn , {borderColor: residenciaDonoImage != null  ?  '#28a745' : '#FF5F00'}]}
                    >
                        <Image
                            style={[styles.icon, {tintColor: residenciaDonoImage != null  ?  '#28a745' : '#FF5F00' }]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/upload.png')}
                        />
                        <Text style={[styles.btnTxt, { color: residenciaDonoImage != null  ?  '#28a745' : '#FF5F00', fontSize:15 }]}> Compravante de Resedência (DONO) </Text>
                        {residenciaDonoImage != null ?
                            <Image
                            style={[styles.icon, {width:30,height:30, tintColor: residenciaDonoImage != null ? '#28a745' : '#FF5F00'} ]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/ok.png')}
                        /> : <View></View> }
                    </Pressable> : ''}

                    {infoCadastroCar === 'fisicaOutra' ?
                    <Pressable
                        onPress={()=>{openModalDocCar('cpf')}}
                        style={[styles.btn , {borderColor: cpfDonoImage != null  ?  '#28a745' : '#FF5F00'}]}
                    >
                        <Image
                            style={[styles.icon, {tintColor: cpfDonoImage != null  ?  '#28a745' : '#FF5F00' }]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/upload.png')}
                        />
                        <Text style={[styles.btnTxt, { color: cpfDonoImage != null  ?  '#28a745' : '#FF5F00'}]}> RG/CPF (DONO)</Text>
                        {cpfDonoImage != null ?
                            <Image
                            style={[styles.icon, {width:30,height:30, tintColor: cpfDonoImage != null ? '#28a745' : '#FF5F00'} ]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/ok.png')}
                        /> : <View></View> }
                    </Pressable> : ''}

                </View>
                <Modal visible={isVisible} animationType='slide' transparent={true}>
                    {modalBtn  ?  
                    <View style={styles.modal}>
                        <View style={[styles.containerModal, {height:'50%'}]}>
                            <View style={styles.modalHeader}>
                                <Text> </Text>
                                <Text style={styles.title}>
                                    Escolha uma opção
                                </Text>
                                <Pressable onPress={showModalDoc}>
                                    <Image
                                        style={[styles.icon, {height:25, width:25, marginTop:5}]}
                                        source={require('../../../src/main/res/drawable-mdpi/assets/icons/x.png')}
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
                                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/camera.png')}
                                        />
                                        <Text style={[styles.btnTxt,{marginLeft:0}]}>Abrir Câmera</Text>
                                    </View>
                                </Pressable>

                                <Pressable 
                                    style={styles.btn}
                                    onPress={() => SelectOpition('galeria',)}
                                >
                                    <View style={styles.containerBtn}>
                                        <Image
                                            style={styles.icon}
                                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/galeria.png')}
                                        />
                                        <Text style={[styles.btnTxt,{marginLeft:0}]}>Abrir Galereria</Text>
                                    </View>
                                </Pressable>

                                <Pressable 
                                    style={styles.btn}
                                    onPress={() => SelectOpition('arquivo')}
                                >
                                    <View style={[styles.containerBtn, {width:'80%'} ]}>
                                        <Image
                                            style={styles.icon}
                                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/arquivo.png')}
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
                                    Exemplo
                                </Text>
                                <Pressable onPress={openModalDocCar}>
                                    <Image
                                        style={[styles.icon, {height:25, width:25, marginTop:5}]}
                                        source={require('../../../src/main/res/drawable-mdpi/assets/icons/x.png')}
                                    />
                                </Pressable>
                            </View>
                        
                            <View style={styles.containerInfoModal}> 
                                <Text style={styles.txtModal}> 
                                    Se for tirar foto não se esqueça de abrir o documento assim como o exemplo abaixo: 
                                </Text> 
                                <Image
                                    style={[styles.imgExemplo, {
                                        height: clvVisible ? 420 : anttVisible ? 390 : cnpjVisible ? 360 : 380,
                                    }]}
                                    source={
                                          cpfVisible
                                          ? require('../../../src/main/res/drawable-mdpi/assets/imgExemplo/cpfRg.png')
                                          : clvVisible
                                          ? require('../../../src/main/res/drawable-mdpi/assets/imgExemplo/clv.png')
                                          : anttVisible
                                          ? require('../../../src/main/res/drawable-mdpi/assets/imgExemplo/antt.png')
                                          : cnpjVisible
                                          ? require('../../../src/main/res/drawable-mdpi/assets/imgExemplo/cnpj.png')
                                          : inscicaoEstadualVisible
                                          ? require('../../../src/main/res/drawable-mdpi/assets/imgExemplo/inscricaoEstadual.png')
                                          : residenciaVisible
                                          ? require('../../../src/main/res/drawable-mdpi/assets/imgExemplo/compravanteResidencia.png')
                                          : null // Defina um valor padrão ou nulo, se necessário
                                      }
                                />
                            </View>
                            
                            <View style={styles.containerBtnModal}>
                                <Pressable style={styles.btnModal}
                                    onPress={showModalDoc}
                                >
                                    <Text style={styles.btnTxtModal}>Continuar</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>  }
                </Modal>
                <View style={styles.containerInfo}>
                <Pressable 
                        onPress={navegacao}
                        style={[
                            styles.btnContinue,
                            {
                                backgroundColor: (
                                    (infoCadastroCar === 'fisicaEu' && clvImage != null && anttImage != null) ||
                                    (infoCadastroCar === 'fisicaOutra' && clvImage != null && anttImage != null && residenciaDonoImage != null && cpfDonoImage != null) ||
                                    (infoCadastroCar === 'juridicoEu' && clvImage != null && anttImage != null && cnpjImage != null && inscricaoEstadualImage != null) ||
                                    (infoCadastroCar === 'juridicoOutra' && clvImage != null && anttImage != null && cnpjImage != null && inscricaoEstadualImage != null)
                                ) ? '#FF5F00' : 'transparent',
                            }
                        ]}
                    >

                        <Text style={{
                            fontSize: 15,
                            fontFamily: 'Roboto_500Medium',
                            color: (
                                (infoCadastroCar === 'fisicaEu' && clvImage != null && anttImage != null) ||
                                (infoCadastroCar === 'fisicaOutra' && clvImage != null && anttImage != null && residenciaDonoImage != null && cpfDonoImage != null) ||
                                (infoCadastroCar === 'juridicoEu' && clvImage != null && anttImage != null && cnpjImage != null && inscricaoEstadualImage != null) ||
                                (infoCadastroCar === 'juridicoOutra' && clvImage != null && anttImage != null && cnpjImage != null && inscricaoEstadualImage != null)
                            ) ? 'white' : '#FF5F00',
                            }}
                        >
                            Continuar
                        </Text>
                    </Pressable>
                </View>
            </View> 
        </KeyboardAwareScrollView>: ''}

        
        { loading ? 
           <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
           }}>
                <ActivityIndicator size="large" color="#FF5F00" />
            </View> : ''}
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        padding:16
    },
    h1:{
        fontFamily:'Roboto_500Medium',
        fontSize:18
    },
    txtListen:{
        fontFamily:'Roboto_300Light',
        color:'#FF5F00',
        fontSize:16,
        marginTop:25,
        fontSize:25
    },
    containerInfo:{
        marginTop:25,
        padding:15,
        alignItems:'center'
    },
    txtInfo:{
        fontFamily:'Roboto_500Medium',
        fontSize:15
    },
    icon:{
        width:50,
        height:50,
        // marginLeft:15,
        tintColor:'#FF5F00'
    },
    btn:{
        borderWidth: 2,
        borderColor:'#FF5F00',
        flexDirection:'row',
        borderRadius:15,
        height:80,
        alignItems:'center',
        marginTop:20,
        justifyContent:'space-between',
        paddingEnd:10,
        paddingStart:10
    },
    btnTxt:{
        fontFamily:'Roboto_500Medium',
        color:'#FF5F00',
        fontSize: 18,
    },
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
        width:300,
        height:380
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

