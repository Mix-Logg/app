import { View, Text, StyleSheet, Image, Pressable, Modal, ActivityIndicator, SafeAreaView, ScrollView } from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import  { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import MaskInput from 'react-native-mask-input';
import twrnc from 'twrnc';
import Btn from "../../btn";
import Help from "../../help";
import FixBar from "../../fixBar";
import PopUp from "../../modal";
import RegisterUser from "../../../hooks/registerUser";
import { AntDesign } from '@expo/vector-icons';

export default function UpLoadDocCar({navigation}){
    const route = useRoute();
    const [loading, setLoading] = useState(false);
    const [typeVehicle, setTypeVehicle] = useState('');
    const [infoCadastroCar, setInfoCadastroCar] = useState(false);
    const [numberDocument, setNumberDocument] = useState(0)
    const [isVisible, setIsVisible] = useState(false);
    const [modalBtn, setModalBtn] = useState(false);
    const [contDocument, setCountDocument] = useState(0)
    const [modal, setModal] = useState('');
    
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
    const [phoneOwner, setPhoneOwner] = useState(null);
    const [relationOwner, setRelationOwner] = useState(null);
    const [api, setApi] = useState(null);

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
          const response = await axios.post('https://seashell-app-inyzf.ondigitalocean.app/'+'upload-bucket/upload', formData, {
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

    useEffect(() => {
        const cadaster = route.params.vehicle.cadaster;
        const owner    = route.params.vehicle.owner;
        setTypeVehicle(route.params.vehicle.typeVehicle)
        if(cadaster === 'fisica' && owner === 'eu'){
            setInfoCadastroCar('fisicaEu')
            setNumberDocument(2)
            // console.log('Pessoa fisica e Proprietario')
        }
        if(cadaster === 'juridica' && owner === 'eu'){
            setInfoCadastroCar('juridicoEu')
            setNumberDocument(4)
            // console.log('Pessoa Juridica e Proprietario')
        }
        if(cadaster === 'fisica' && owner === 'outraPessoa'){
            setInfoCadastroCar('fisicaOutra')
            setNumberDocument(4)
        }
        if(cadaster === 'juridica' && owner === 'outraPessoa'){
            setInfoCadastroCar('juridicoOutra')
            setNumberDocument(4)
        }

    }, []);

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
        setModalBtn(false)
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

    const modalInfo = async (option) => {
        setModal('')
        if(option === 'clv'){
            await setModal(<PopUp type={'warning'} txt={'Você deve enviar a documentação CLV'} show={true} />);
            return;
        }
        if(option === 'antt'){
            await setModal(<PopUp type={'warning'} txt={'Você deve enviar a documentação ANTT'} show={true} />);
            return;
        }
        if(option === 'cnpj'){
            await setModal(<PopUp type={'warning'} txt={'Você deve enviar a documentação CNPJ'} show={true} />);
            return;
        }
        if(option === 'legal'){
            await setModal(<PopUp type={'warning'} txt={'Você deve enviar a documentação Inscrição Estadual'} show={true} />);
            return;
        }
        if(option === 'addressOwner'){
            await setModal(<PopUp type={'warning'} txt={'Você deve enviar o documento de comprovante de endereço do proprietário do veículo.'} show={true} />);
            return;
        }
        if(option === 'cpfOwner'){
            await setModal(<PopUp type={'warning'} txt={'Você deve enviar o documento de comprovante de RG/CPF do proprietário do veículo.'} show={true} />);
            return;
        }
        if(option === 'relation'){
            await setModal(<PopUp type={'warning'} txt={'Você deve digitar o nível de parentesco que você tem com o dono do veículo'} show={true} />);
            return;
        }
        if(option === 'phone'){
            await setModal(<PopUp type={'warning'} txt={'Você deve digitar o número de telefone do proprietário do veículo'} show={true} />);
            return;
        }
        if(option === 'error'){
            await setModal(<PopUp type={'danger'} txt={'Algo deu errado, tente novamente mais tarde!'} show={true} />);
            return;
        }
    }

    const handleSubmit = async () => {
        await setModal('')
        if(clvImage === null){
            modalInfo('clv')
            return;
        }
        if(typeVehicle != 'tour' && typeVehicle != 'motorcycle'){
            if(anttImage === null){
                modalInfo('antt')
                return;
            }
        }
        if(infoCadastroCar === 'juridicoEu' || infoCadastroCar === 'juridicoOutra'){
            if(cnpjImage === null){
                modalInfo('cnpj')
                return;
            }
            if(inscricaoEstadualImage === null){
                modalInfo('legal')
                return;
            }
        }   
        if(infoCadastroCar === 'fisicaOutra'){
            if(residenciaDonoImage === null){
                modalInfo('addressOwner')
                return;
            }
            if(cpfDonoImage === null){
                modalInfo('cpfOwner')
                return;
            }
            if(phoneOwner === null){
                modalInfo('phone')
                return;
            }
            if(relationOwner === null){
                modalInfo('relation')
                return;
            }
        }
        setLoading(true)
        vehicle = {
            clvImage:clvImage,
            anttImage:anttImage,
            cnpjImage:cnpjImage,
            estadualImage:inscricaoEstadualImage,
            cpfDonoImage:cpfDonoImage,
            residenciaDono:residenciaDonoImage,
        }
        route.params.vehicle.phoneOwner = phoneOwner;
        route.params.vehicle.relationOwner = relationOwner;
        route.params.picture.vehicle = vehicle
        const res = await RegisterUser(route.params)
        if(res === 200){
            navigation.navigate('Welcome')
            return;
        }
        setLoading(false)
        modalInfo('error')
        return;
    }

    return(
        <>
         {loading === false ? 
            <SafeAreaView style={twrnc`h-full bg-white`}>
                <FixBar navigation={navigation} opition={'register'} />
                <ScrollView>
                    {modal}
                    <View style={styles.container}>
                        <Text style={styles.h1}>Foto</Text>
                        <View style={twrnc`mt-5 mb-8`}>
                            <Help txt={'Você deve enviar as imagens para a avaliação interna, assim informaremos se você está hábito a trabalhar'} />
                        </View>
                        <View style={twrnc`px-15 gap-5 mb-10`}>
                            
                            <Pressable
                                onPress={()=>{openModalDocCar('clv')}}
                                style={[twrnc`flex-row border py-3 rounded-xl px-2 ${ clvImage != null ? 'bg-[#28a745] border-[#28a745]' : ''}` ]}
                            >
                                <View style={twrnc`w-1/6`}>
                                    <AntDesign name="upload" size={20} style={twrnc` ${ clvImage != null ? 'text-white font-bold' : ''}`} />
                                </View>

                                <View style={twrnc`w-4/6 justify-center`}>
                                    <Text style={[twrnc`text-center ${ clvImage != null ? 'text-white font-bold' : ''}`]}>
                                        CLV
                                        {/* {route.params.user.am === 'auxiliary'? ' (opcional)' : '' }  */}
                                    </Text>
                                </View>
                            </Pressable>

                            { typeVehicle !== 'tour' && typeVehicle !== 'motorcycle' &&
                            <Pressable
                                onPress={()=>{openModalDocCar('antt')}}
                                style={[twrnc`flex-row border py-3 rounded-xl px-2 ${ anttImage != null ? 'bg-[#28a745] border-[#28a745]' : ''}` ]}
                            >
                                <View style={twrnc`w-1/6`}>
                                    <AntDesign name="upload" size={20} style={twrnc` ${ anttImage != null ? 'text-white font-bold' : ''}`} />
                                </View>
                                <View style={twrnc`w-4/6 justify-center`}>
                                    <Text style={[twrnc`text-center ${ anttImage != null ? 'text-white font-bold' : ''}`]}>
                                        ANTT
                                    </Text>
                                </View>
                            </Pressable>
                            }

                            {infoCadastroCar === 'juridicoEu' || infoCadastroCar === 'juridicoOutra' ?
                            <Pressable
                                onPress={()=>{ openModalDocCar('cnpj') }}
                                style={[twrnc`flex-row border py-3 rounded-xl px-2 ${ cnpjImage != null ? 'bg-[#28a745] border-[#28a745]' : ''}` ]}
                            >
                                <View style={twrnc`w-1/6`}>
                                    <AntDesign name="upload" size={20} style={twrnc` ${ cnpjImage != null ? 'text-white font-bold' : ''}`} />
                                </View>
                                <View style={twrnc`w-4/6 justify-center`}>
                                    <Text style={[twrnc`text-center ${ cnpjImage != null ? 'text-white font-bold' : ''}`]}>
                                        CNPJ
                                    </Text>
                                </View>
                            </Pressable> : ''}
                            
                            {infoCadastroCar === 'juridicoEu' || infoCadastroCar === 'juridicoOutra' ?
                            <Pressable
                                onPress={()=>{openModalDocCar('estadual')}}
                                style={[twrnc`flex-row border py-3 rounded-xl px-2 ${ inscricaoEstadualImage != null ? 'bg-[#28a745] border-[#28a745]' : ''}` ]}
                            >
                                <View style={twrnc`w-1/6`}>
                                    <AntDesign name="upload" size={20} style={twrnc` ${ inscricaoEstadualImage != null ? 'text-white font-bold' : ''}`} />
                                </View>
                                <View style={twrnc`w-4/6 justify-center`}>
                                    <Text style={[twrnc`text-center ${ inscricaoEstadualImage != null ? 'text-white font-bold' : ''}`]}>
                                        Inscrição Estadual
                                    </Text>
                                </View>
                            </Pressable> : ''}

                            {infoCadastroCar === 'fisicaOutra' ?
                            <View style={twrnc`w-full`}>
                                <Text style={twrnc`text-center text-base`}>Informações referente ao dono do <Text style={twrnc`font-bold`}>Veículo!</Text></Text>
                            </View>
                            : ''}

                            {infoCadastroCar === 'fisicaOutra' ?
                            <Pressable
                                onPress={()=>{openModalDocCar('endereco')}}
                                style={[twrnc`flex-row border py-3 rounded-xl px-2 ${ residenciaDonoImage != null ? 'bg-[#28a745] border-[#28a745]' : ''}` ]}
                            >
                                <View style={twrnc`w-1/6`}>
                                    <AntDesign name="upload" size={20} style={twrnc` ${ residenciaDonoImage != null ? 'text-white font-bold' : ''}`} />
                                </View>
                                <View style={twrnc`w-5/6 justify-center`}>
                                    <Text style={[twrnc`text-center ${ residenciaDonoImage != null ? 'text-white font-bold' : ''}`]}>
                                        Comprovante de Residência
                                    </Text>
                                </View>
                            </Pressable> : ''}

                            {infoCadastroCar === 'fisicaOutra' ?
                            <Pressable
                                onPress={()=>{openModalDocCar('cpf')}}
                                style={[twrnc`flex-row border py-3 rounded-xl px-2 ${ cpfDonoImage != null ? 'bg-[#28a745] border-[#28a745]' : ''}` ]}
                            >
                                <View style={twrnc`w-1/6`}>
                                    <AntDesign name="upload" size={20} style={twrnc` ${ cpfDonoImage != null ? 'text-white font-bold' : ''}`} />
                                </View>
                                <View style={twrnc`w-4/6 justify-center`}>
                                    <Text style={[twrnc`text-center ${ cpfDonoImage != null ? 'text-white font-bold' : ''}`]}>
                                        RG/CPF
                                    </Text>
                                </View>
                            </Pressable> : ''
                            }

                            {infoCadastroCar === 'fisicaOutra' && (
                                <View style={twrnc`gap-3`}>
                                    <View style={twrnc``}>
                                    <Text style={twrnc`text-base`}>Número de celular</Text>
                                    <MaskInput
                                        style={twrnc`py-3 pl-5 bg-white border border-[#d4d4d4] rounded-xl`}
                                        value={phoneOwner}
                                        keyboardType="phone-pad"
                                        onChangeText={(masked, unmasked) => {
                                            setPhoneOwner(unmasked);
                                        }}
                                        placeholder=""
                                        mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    />
                                    </View>
                                    <View>
                                        <Text style={twrnc`text-base`}>Parentesco</Text>
                                        <MaskInput
                                            style={twrnc`py-3 pl-5 bg-white border border-[#d4d4d4] rounded-xl`}
                                            value={relationOwner}
                                            onChangeText={(txt) => {
                                                setRelationOwner(txt);
                                            }}
                                            placeholder="Primo"
                                            
                                        />
                                    </View>
                                </View>
                            )}

                            

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
                                        <Pressable onPress={openModalDocCar}>
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
                                            style={[styles.imgExemplo, {
                                                height: clvVisible ? 420 : anttVisible ? 390 : cnpjVisible ? 360 : 380,
                                            }]}
                                            source={
                                                cpfVisible
                                                ? require('../../../img/imgExemplo/cpfRg.png')
                                                : clvVisible
                                                ? require('../../../img/imgExemplo/clv.png')
                                                : anttVisible
                                                ? require('../../../img/imgExemplo/antt.png')
                                                : cnpjVisible
                                                ? require('../../../img/imgExemplo/cnpj.png')
                                                : inscicaoEstadualVisible
                                                ? require('../../../img/imgExemplo/inscricaoEstadual.png')
                                                : residenciaVisible
                                                ? require('../../../img/imgExemplo/compravanteResidencia.png')
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
                        <Btn title={'Finalizar'} action={handleSubmit} />
                        {/* <View style={styles.containerInfo}>
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
                        </View> */}
                    </View> 
                </ScrollView>
            </SafeAreaView>
        : 
            <View style={twrnc`h-full justify-center items-center `}>
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

