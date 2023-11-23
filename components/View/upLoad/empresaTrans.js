import { View, Text, StyleSheet, Image, Pressable, Modal, ActivityIndicator, TextInput  } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import  { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useRoute } from '@react-navigation/native';
import axios from "axios";


export default function UpLoadEntregador({navigation}){
    const route = useRoute();
    const [loading, setLoading] = useState(false);

    const [isVisible, setIsVisible] = useState(false);
    const [modalBtnVisible, setModalBtnVisible] = useState(false);
    const [contDocument, setCountDocument] = useState(0)
    
    const [inscricaoEstadualVisible , setInscricaoEstadualVisible ] = useState(false)
    const [enderecoVisible , setenderecoVisible ] = useState(false)
    const [cnpjVisible , setCnpjVisible] = useState(false)
    
    const [inscricaoEstadualImage, setInscricaoEstadualImage] = useState(null);
    const [EnderecoImage, setEnderecoImage] = useState(null);
    const [cnpjImage, setCnpjImage] = useState(null);
    const [ramo, setRamo] = useState('');

    const [api, setApi] = useState('');
    console.log(route.params)
    const newParam = {
        ...route.params,
        ramo:ramo,
        imgDoc:{
            addressImage: EnderecoImage,
            cnpjImage: cnpjImage,
            inscricaoEstadual:inscricaoEstadualImage,
        }
    };

    async function uploadFile(filename, valor,chave) {
        const extend = filename.split('.')[1];
        const formData = new FormData();
        formData.append('file', JSON.parse(JSON.stringify({
          name: chave+'.'+extend,
          uri: valor,
          type: 'image/' + extend,
        })));
        
        try {
          let urlProducao;
          if(route.params.sou === 'empresa'){
            urlProducao = 'https://clownfish-app-nc7ss.ondigitalocean.app/empresa/image';
            }else{
            urlProducao = 'https://clownfish-app-nc7ss.ondigitalocean.app/transportadora/image';
            }
            let urlLocal = 'http://192.168.0.22:8081/empresa/image'
          await axios.post(urlProducao, formData, {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          });
        } catch (error) {
          console.error(`Erro ao enviar o arquivo ${filename}:`, error);
        }
    }
    
    useEffect(() => {
        // Função que verifica o estado de cada variável e atualiza o contador
        const updateCount = () => {    
          let newCount = 0
          if (inscricaoEstadualImage != null) newCount++;
          if (EnderecoImage != null) newCount++;
          if (cnpjImage != null) newCount++;
          setCountDocument(newCount);
        };
        // Chama a função de atualização sempre que alguma variável muda de estado
        updateCount();
      }, [inscricaoEstadualImage, EnderecoImage, cnpjImage]);
    
    const SelectOpition = async (escolha) =>{        
        
        if(escolha === 'galeria'){
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
                includeBase64:true,
                saveToPhotos:true
            });
                        
            if(inscricaoEstadualVisible){
                setInscricaoEstadualImage(result.assets[0].uri)
            }else if(enderecoVisible){
                setEnderecoImage(result.assets[0].uri)
            }else if(cnpjVisible){
                setCnpjImage(result.assets[0].uri) 
            }
        }

        if(escolha === 'camera'){
            const options = {
                allowsEditing: true, // Permite a edição da imagem (opcional)
            };
            const result = await ImagePicker.launchCameraAsync(options);
            if (!result.cancelled) {
                if(inscricaoEstadualVisible){
                    setInscricaoEstadualImage(result.uri)

                }else if(enderecoVisible){
                    setEnderecoImage(result.uri)
                }else if(cnpjVisible){
                    setCnpjImage(result.uri) 
                }
            }
        }

        if(escolha === 'arquivo'){
            try {
                const result = await DocumentPicker.getDocumentAsync({});
                // console.log(result.assets[0].uri)
                if(inscricaoEstadualVisible){
                setInscricaoEstadualImage(result.assets[0].uri)
                }else if(enderecoVisible){
                    setEnderecoImage(result.assets[0].uri)
                }else if(cnpjVisible){
                    setCnpjImage(result.assets[0].uri) 
                }

            } catch (error) {
                console.error('Erro ao selecionar o documento:', error);
            }
        }
        
        openModal()
    }

    const openModal = (option = '') => {
        setenderecoVisible(false)
        setInscricaoEstadualVisible(false)
        setCnpjVisible(false)
        if(option === "cnpj"){
            setenderecoVisible(false)
            setInscricaoEstadualVisible(false)
            setCnpjVisible(true)

            return setIsVisible(!isVisible)
        }
        else if(option === "endereco"){
            setInscricaoEstadualVisible(false)
            setCnpjVisible(false)
            setenderecoVisible(true)

            return setIsVisible(!isVisible)
        }
        else if(option === "inscricaoEstadual"){
            setCnpjVisible(false)
            setenderecoVisible(false)
            setInscricaoEstadualVisible(true)

            return setIsVisible(!isVisible)
        }
        setIsVisible(!isVisible)
    }
    
    const showModalOpotion = () => {
        setModalBtnVisible(!modalBtnVisible)
    }

    const navegacao = async () => {
        if(route.params.sou === 'empresa' && inscricaoEstadualImage && EnderecoImage && cnpjImage && ramo.length > 2){
            // console.log(newParam)
            setLoading(true)
            setApi('Avaliando os dados.')
            try{
                setApi('Inserindo os dados.')
                let urlProducao = 'https://clownfish-app-nc7ss.ondigitalocean.app/empresa/register'
                let urlLocal = 'http://192.168.0.22:8081/empresa/register'
                let response = await axios.post(urlProducao, newParam) 
                const imgDoc = response.data.doc;
                for (const chave in imgDoc) {
                    const valor = imgDoc[chave];
                    if (valor != null) {
                        const filename = valor.substring(valor.lastIndexOf('/') + 1);
                        uploadFile(filename, valor, chave);
                        }
                }
                try{
                    setApi('Avaliando as imagens.')
                    let urlProducao = 'https://clownfish-app-nc7ss.ondigitalocean.app/empresa/registerImage'
                    let urlLocal = 'http://192.168.0.22:8081/empresa/registerImage'
                    await axios.post(urlProducao)
                    try{
                        setApi('Inserindo as imagens.')
                        let urlProducao = 'https://clownfish-app-nc7ss.ondigitalocean.app/empresa/uploadBucker'
                        let urlLocal = 'http://192.168.0.22:8081/empresa/uploadBucker'
                        let response = await axios.post(urlProducao)
                        if(response.status === 200){
                            navigation.navigate('RegistrationStuation');
                        }else{
                            setApi('Algo deu errado, tente mais tarde!')
                        }
                    }catch(err){
                        console.log('erro ao enviar pro bucket', err)
                    }
                }catch(err){
                    console.log('erro ao registrar a imagem: ',err)
                }
            }catch(err){
                console.log('erro na inserção de uma nova empresa na api: ', err)
            }
        }
        else if(route.params.sou === 'transportadora' && inscricaoEstadualImage && EnderecoImage && cnpjImage){
            setLoading(true)
            setApi('Avaliando os dados.')
            try{
                setApi('Inserindo os dados.')
                let urlProducao = 'https://clownfish-app-nc7ss.ondigitalocean.app/transportadora/register'
                let urlLocal = 'http://192.168.0.22:8081/transportadora/register'
                let response = await axios.post(urlProducao, newParam) 
                const imgDoc = response.data.doc;
                for (const chave in imgDoc) {
                    const valor = imgDoc[chave];
                    if (valor != null) {
                        const filename = valor.substring(valor.lastIndexOf('/') + 1);
                        uploadFile(filename, valor, chave);
                        }
                }
                try{
                    setApi('Avaliando as imagens.')
                    let urlProducao = 'https://clownfish-app-nc7ss.ondigitalocean.app/transportadora/registerImage'
                    let urlLocal = 'http://192.168.0.22:8081/transportadora/registerImage'
                    await axios.post(urlProducao)
                    try{
                        setApi('Inserindo as imagens em nosso banco de talentos.')
                        let urlProducao = 'https://clownfish-app-nc7ss.ondigitalocean.app/transportadora/uploadBucker'
                        let urlLocal = 'http://192.168.0.22:8081/transportadora/uploadBucker'
                        let response = await axios.post(urlProducao)
                        setLoading(false)
                        if(response.status === 200){
                            navigation.navigate('RegistrationStuation');
                        }else{
                            setApi('Algo deu errado, tente mais tarde!')
                        }
                    }catch(err){
                        console.log('erro ao enviar pro bucket', err)
                    }
                }catch(err){
                    console.log('erro ao registrar a imagem: ',err)
                }
            }catch(err){
                console.log('erro na inserção de uma nova transportadora na api: ', err)
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
                    {contDocument} de 3 arquivos.
                    </Text>
                </View>
                <View style={{marginTop:50,}}>
                    
                    <Pressable
                        onPress={()=>{openModal('cnpj')}}
                        style={[styles.btn, {marginTop:0, borderColor: cnpjImage != null ? '#28a745' : '#FF5F00'}]}
                    >
                        <Image
                            style={[styles.icon, {tintColor: cnpjImage != null ? '#28a745' : '#FF5F00'}]}
                            source={require('../../../img/icons/upload.png')}
                        />
                        <Text style={[styles.btnTxt, {color: cnpjImage != null ? '#28a745' : '#FF5F00'}]}> CNPJ  </Text>

                        { cnpjImage != null ?
                            <Image
                            style={[styles.icon, {width:30,height:30,tintColor: cnpjImage != null ? '#28a745' : '#FF5F00'} ]}
                            source={require('../../../img/icons/ok.png')}
                        /> : <View></View> }
                    </Pressable>

                    <Pressable
                        onPress={()=>{openModal('inscricaoEstadual')}}
                        style={[styles.btn,{ borderColor: inscricaoEstadualImage != null ? '#28a745' : '#FF5F00' }]}
                    >
                        <Image
                            style={[styles.icon, {tintColor: inscricaoEstadualImage != null ? '#28a745' : '#FF5F00'} ]}
                            source={require('../../../img/icons/upload.png')}
                        />
                        <Text style={[styles.btnTxt, {color:inscricaoEstadualImage != null ? '#28a745' : '#FF5F00' }]}>Inscrição Estadual</Text>
                        {inscricaoEstadualImage != null ?
                            <Image
                            style={[styles.icon, {width:30,height:30 ,tintColor: inscricaoEstadualImage != null ? '#28a745' : '#FF5F00'} ]}
                            source={require('../../../img/icons/ok.png')}
                        /> : <View></View> }
                    </Pressable>

                    <Pressable
                        onPress={()=>{ openModal('endereco') }}
                        style={[styles.btn, {borderColor: EnderecoImage != null ? '#28a745' : '#FF5F00'}]}
                    >
                        <Image
                            style={[styles.icon, {tintColor : EnderecoImage != null ? '#28a745' : '#FF5F00'}]}
                            source={require('../../../img/icons/upload.png')}
                        />
                        <Text style={[styles.btnTxt,{marginLeft:5, color: EnderecoImage != null ? '#28a745' : '#FF5F00'}]}>Comprovante de Residência</Text>

                        {EnderecoImage != null ?
                            <Image
                            style={[styles.icon, {width:30,height:30,tintColor: EnderecoImage != null ? '#28a745' : '#FF5F00'} ]}
                            source={require('../../../img/icons/ok.png')}
                        /> : <View></View> }
                    </Pressable>
                
                    {route.params.sou != 'transportadora' ?<Pressable style={{
                        borderColor: ramo.length > 2  ? '#28a745':'#FF5F00',
                        width:'65%',
                        height:65,
                        borderWidth: 2,
                        borderRadius:15,
                        marginTop:20
                    }}>
                        <Text style={{
                            position:'absolute',
                            marginLeft:10,
                            top:5,
                            color: ramo.length > 2  ? '#28a745':'#FF5F00',
                            fontFamily:'Roboto_500Medium'
                        }}>Ramo</Text>
                        <TextInput 
                        style={{
                            top:28,
                            left:15,
                            fontFamily:'Roboto_500Medium',
                        }}
                        placeholder="Exemplo: Restaurante"
                        onChangeText={(value) => setRamo(value)}
                        >

                        </TextInput>
                    </Pressable> : ''}      
                
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
                                    onPress={() => SelectOpition('galeria',)}
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
                                    onPress={() => SelectOpition('arquivo')}
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
                    
                    : 
                    
                    <View style={styles.modal}>
                        <View style={styles.containerModal}>
                            <View style={styles.modalHeader}>
                                <Text> </Text>
                                <Text style={styles.title}>
                                    Exemplo
                                </Text>
                                <Pressable onPress={openModal}>
                                    <Image
                                        style={[styles.icon, {height:25, width:25, marginTop:5}]}
                                        source={require('../../../img/icons/x.png')}
                                    />
                                </Pressable>
                            </View>
                            <View style={styles.containerInfoModal}> 
                                <Text style={styles.txtModal}> 
                                    Se for tirar foto não se esqueça de abrir o documento assim como o exemplo abaixo: 
                                </Text> 
                                <Image
                                    style={[styles.imgExemplo,{width:cnpjVisible? 315: 280 }]}
                                    source={
                                          inscricaoEstadualVisible
                                          ? require('../../../img/imgExemplo/inscricaoEstadual.png')
                                          : enderecoVisible
                                          ? require('../../../img/imgExemplo/compravanteResidencia.png')
                                          : cnpjVisible
                                          ? require('../../../img/imgExemplo/cnpjExemplo.png')
                                          : null // Defina um valor padrão ou nulo, se necessário
                                      }
                                />
                            </View> 
                            <View style={styles.containerBtnModal}>
                                <Pressable style={styles.btnModal}
                                    onPress={showModalOpotion}
                                >
                                    <Text style={styles.btnTxtModal}>Continuar</Text>
                                </Pressable>
                            </View>

                        </View>
                    </View>}
                </Modal>
                <View style={styles.containerInfo}>
                    <Pressable 
                        style={[styles.btnContinue,{backgroundColor:inscricaoEstadualImage && EnderecoImage && cnpjImage && (route.params.sou === 'transportadora' || ramo.length > 2) ? '#FF5F00' : 'transparent'}]}
                        onPress={navegacao}
                    >
                        <Text style={[styles.btnTxt,{color: inscricaoEstadualImage && EnderecoImage && cnpjImage && (route.params.sou === 'transportadora' || ramo.length > 2) ? 'white' : '#FF5F00'}]}>Continuar</Text>
                    </Pressable>
                </View>
            </View>
        </KeyboardAwareScrollView> : 
            <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator size="large" color="#FF5F00" />
                    <Text>{api}</Text>
            </View>
        }

  
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
        width:280,
        height:355
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

