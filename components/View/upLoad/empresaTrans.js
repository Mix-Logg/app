import { View, Text, StyleSheet, Image, Pressable, Modal, ActivityIndicator  } from "react-native"
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
    
    const [cpfVisible , setCpfVisible ] = useState(false)
    const [enderecoVisible , setenderecoVisible ] = useState(false)
    const [cnpjVisible , setCnpjVisible] = useState(false)
    
    const [cpfImage, setCpfImage] = useState(null);
    const [EnderecoImage, setEnderecoImage] = useState(null);
    const [cnpjImage, setCnpjImage] = useState(null);

    const newParam = {
        ...route.params,
        imgDoc:{
            addressImage: EnderecoImage,
            cnpjmage: cnpjImage,
            cpfImage:cpfImage
        }
    };

   

    useEffect(() => {
        // Função que verifica o estado de cada variável e atualiza o contador
        const updateCount = () => {    
          let newCount = 0
          if (cpfImage != null) newCount++;
          if (EnderecoImage != null) newCount++;
          if (cnpjImage != null) newCount++;
          setCountDocument(newCount);
        };
        // Chama a função de atualização sempre que alguma variável muda de estado
        updateCount();
      }, [cpfImage, EnderecoImage, cnpjImage]);
    
    const SelectOpition = async (escolha) =>{        
        if(escolha === 'galeria'){
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
                includeBase64:true,
                saveToPhotos:true
            });
                        
            if(cpfVisible){
                setCpfImage(result.assets[0].uri)
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
                if(cpfVisible){
                    setCpfImage(result.uri)

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
                if(cpfVisible){
                setCpfImage(result.assets[0].uri)
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
        setCpfVisible(false)
        setCnpjVisible(false)
        if(option === "cnpj"){
            setenderecoVisible(false)
            setCpfVisible(false)
            setCnpjVisible(true)

            return setIsVisible(!isVisible)
        }
        else if(option === "endereco"){
            setCpfVisible(false)
            setCnpjVisible(false)
            setenderecoVisible(true)

            return setIsVisible(!isVisible)
        }
        else if(option === "cpf"){
            setCnpjVisible(false)
            setenderecoVisible(false)
            setCpfVisible(true)

            return setIsVisible(!isVisible)
        }
        setIsVisible(!isVisible)
    }
    
    const showModalOpotion = () => {
        setModalBtnVisible(!modalBtnVisible)
    }

    const navegacao = async () => {
        if(cpfImage && EnderecoImage && cnpjImage){
            if(route.params.sou === 'motorista'){
                navigation.navigate('RegisterCar',newParam)
            }else if(route.params.sou === 'auxiliar'){
                // ENVIAR PRA API
                setLoading(true)
                const expoUrl = 'https://clownfish-app-nc7ss.ondigitalocean.app/auxiliar/register';
                const servidorUrl = 'http://192.168.0.22:8081/auxiliar/register'

                // console.log(newParam)
                try{
                    const response = await axios.post(expoUrl,newParam)
                    const imgDocFisica = response.data.doc;
                    for (const chave in imgDocFisica) {
                        const valor = imgDocFisica[chave]
                        if (valor != null) {
                          const filename = valor.substring(valor.lastIndexOf('/') + 1);
                          uploadFile(filename, valor, chave);
                        }
                    }
                    async function uploadFile(filename, valor,chave) {
                        const extend = filename.split('.')[1];
                        
                        const formData = new FormData();
                            formData.append('file', JSON.parse(JSON.stringify({
                            name: chave+'.'+extend,
                            uri: valor,
                            type: 'image/' + extend,
                            }))
                        );
                        
                        try {
                          const expoUrlImage = 'https://clownfish-app-nc7ss.ondigitalocean.app/auxiliar/image';
                          const servidorUrl = 'http://192.168.0.22:8081/auxiliar/image'
                          await axios.post(expoUrlImage, formData, {
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'multipart/form-data',
                            },
                          });
                          console.log(`arquivo enviado: ${filename}`)
                        } catch (error) {
                          console.error(`Erro ao enviar o arquivo ${filename}:`, error);
                        }
                    }
                    try{
                        const expoUrl = 'https://clownfish-app-nc7ss.ondigitalocean.app/auxiliar/registerImage';
                        const servidorUrl = 'http://192.168.0.22:8081/auxiliar/registerImage'

                        const result = await axios.post(expoUrl)
                        console.log(result.body)
                        try{
                            const expoUrl = 'https://clownfish-app-nc7ss.ondigitalocean.app/auxiliar/uploadBucker';
                            const servidorUrl = 'http://192.168.0.22:8081/auxiliar/uploadBucker'
                            
                            const result = await axios.post(expoUrl)
                            console.log(result)
                            if(result.status == 200){
                                navigation.navigate('RegistrationStuation');
                                setLoading(false)
                            }
                        }catch(err){
                            console.log('erro ao enviar a pasta: ', err)
                        }
                    }catch(err){
                        console.error('Erro na requisição:', err);
                        setLoading(false)
                    }
                }catch(err){
                    console.log('não chegou erro:', err.response.data)
                    setLoading(false)
                }
                return setLoading(false)
            }
        }
    }

    return(
    <>
         {loading === false ? <KeyboardAwareScrollView>
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
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/upload.png')}
                        />
                        <Text style={[styles.btnTxt, {color: cnpjImage != null ? '#28a745' : '#FF5F00'}]}> CNPJ  </Text>

                        { cnpjImage != null ?
                            <Image
                            style={[styles.icon, {width:30,height:30,tintColor: cnpjImage != null ? '#28a745' : '#FF5F00'} ]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/ok.png')}
                        /> : <View></View> }
                    </Pressable>

                    <Pressable
                        onPress={()=>{openModal('cpf')}}
                        style={[styles.btn,{ borderColor: cpfImage != null ? '#28a745' : '#FF5F00' }]}
                    >
                        <Image
                            style={[styles.icon, {tintColor: cpfImage != null ? '#28a745' : '#FF5F00'} ]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/upload.png')}
                        />
                        <Text style={[styles.btnTxt, {color:cpfImage != null ? '#28a745' : '#FF5F00' }]}>Inscrição Estadual</Text>
                        {cpfImage != null ?
                            <Image
                            style={[styles.icon, {width:30,height:30 ,tintColor: cpfImage != null ? '#28a745' : '#FF5F00'} ]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/ok.png')}
                        /> : <View></View> }
                    </Pressable>

                    <Pressable
                        onPress={()=>{ openModal('endereco') }}
                        style={[styles.btn, {borderColor: EnderecoImage != null ? '#28a745' : '#FF5F00'}]}
                    >
                        <Image
                            style={[styles.icon, {tintColor : EnderecoImage != null ? '#28a745' : '#FF5F00'}]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/upload.png')}
                        />
                        <Text style={[styles.btnTxt,{marginLeft:5, color: EnderecoImage != null ? '#28a745' : '#FF5F00'}]}>Comprovante de Residência</Text>

                        {EnderecoImage != null ?
                            <Image
                            style={[styles.icon, {width:30,height:30,tintColor: EnderecoImage != null ? '#28a745' : '#FF5F00'} ]}
                            source={require('../../../src/main/res/drawable-mdpi/assets/icons/ok.png')}
                        /> : <View></View> }
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
                                        source={require('../../../src/main/res/drawable-mdpi/assets/icons/x.png')}
                                    />
                                </Pressable>
                            </View>
                            <View style={styles.containerInfoModal}> 
                                <Text style={styles.txtModal}> 
                                    Se for tirar foto não se esqueça de abrir o documento assim como o exemplo abaixo: 
                                </Text> 
                                <Image
                                    style={styles.imgExemplo}
                                    source={
                                        cpfVisible
                                          ? require('../../../src/main/res/drawable-mdpi/assets/imgExemplo/cpfRg.png')
                                          : enderecoVisible
                                          ? require('../../../src/main/res/drawable-mdpi/assets/imgExemplo/compravanteResidencia.png')
                                          : cnpjVisible
                                          ? require('../../../src/main/res/drawable-mdpi/assets/imgExemplo/cnhFisica.png')
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
                        style={[styles.btnContinue,{backgroundColor:cpfImage && EnderecoImage && cnpjImage ? '#FF5F00' : ''}]}
                        onPress={navegacao}
                    >
                        <Text style={[styles.btnTxt,{color: cpfImage && EnderecoImage && cnpjImage ? 'white' : '#FF5F00'}]}>Continuar</Text>
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
        width:250,
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

