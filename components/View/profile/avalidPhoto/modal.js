import { useState } from "react";
import Modal from "react-native-modal";
import { View, Text, Pressable, Button, TouchableOpacity, ActivityIndicator } from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';
import SelectOpition from "../../../../function/getPathPicture";
import uploadFile   from "../../../../api/upLoadFiles";
import deleteFile   from "../../../../api/removeUploadFiles";
import removeStatus from "../../../../api/removeStatusPicture";
import { FontAwesome6 } from '@expo/vector-icons';
export default function OptionChangePhoto({picture, setChange}){
    const [visible, setVisible] = useState(true);
    const [wating, setWating] = useState(false);
    const [sendPicture, setSendPicture] = useState(false); 

    const closeModal = () => {
        setVisible(false)
        setSendPicture(false)
        setWating(false)
    }

    const handleSelectPicture = async (option) => {
        let picturesName = {
            cpf:'cpfImage',
            address:'addressImage',
            photo:'selfieImage',
            cnh:'cnhImage',
            antt:'anttImage',
            clv:'clvImage',
            cpfOwner:'cpfDonoImage',
            addressOwner:'residenciaDono',
            legal:'estadualImage',
            cnpj:'cnpjImage',
        }
        const path = await SelectOpition(option)
        if(path == 'cancel'){
            return
        }
        switch (picture) {
            case 'cpf':
                setWating(true)
                const cpfDelete = await deleteFile('cpfImage')
                if(cpfDelete === 200){
                    const respo = await uploadFile(path, 'cpfImage', 'physical' )
                    if(respo){
                        const res = await removeStatus('cpf')
                        if(res === 200){
                            setChange(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'address':
                setWating(true)
                const addressDelete = await deleteFile('addressImage')
                console.log('address delete:',addressDelete)
                if(addressDelete === 200){
                    const respo = await uploadFile(path, 'addressImage', 'physical' )
                    if(respo){
                        const res = await removeStatus('address')
                        if(res === 200){
                            setChange(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'photo':
                setWating(true)
                const selfieDelete = await deleteFile('selfieImage')
                if(selfieDelete === 200){
                    const respo = await uploadFile(path, 'selfieImage', 'physical' )
                    if(respo){
                        const res = await removeStatus('photo')
                        if(res === 200){
                            setChange(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'cnh':
                setWating(true)
                const respo = await deleteFile('cnhImage')
                console.log('response delete:', respo)
                if(respo === 200){
                    const respo = await uploadFile(path, 'cnhImage', 'physical' )
                    if(respo){
                        const res = await removeStatus('cnh')
                        if(res === 200){
                            setChange(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                
                break;
            case 'antt':
                setWating(true)
                const anttDelete = await deleteFile('anttImage')
                if(anttDelete === 200){
                    const respo = await uploadFile(path, 'anttImage', 'vehicle' )
                    if(respo){
                        const res = await removeStatus('antt')
                        if(res === 200){
                            setChange(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'clv':
                setWating(true)
                const clvDelete = await deleteFile('clvImage')
                if(clvDelete === 200){
                    const respo = await uploadFile(path, 'clvImage', 'vehicle' )
                    if(respo){
                        const res = await removeStatus('clv')
                        if(res === 200){
                            setChange(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'cpfOwner':
                setWating(true)
                const cpfOwnerDelete = await deleteFile('cpfDonoImage')
                if(cpfOwnerDelete === 200){
                    const respo = await uploadFile(path, 'cpfDonoImage', 'vehicle' )
                    if(respo){
                        const res = await removeStatus('cpfOwner')
                        if(res === 200){
                            setCpfOwner(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'addressOwner':
                setWating(true)
                const addressOwnerDelete = await deleteFile('residenciaDono')
                if(addressOwnerDelete === 200){
                    const respo = await uploadFile(path, 'residenciaDono', 'vehicle' )
                    if(respo){
                        const res = await removeStatus('addressOwner')
                        if(res === 200){
                            setChange(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'legal':
                setWating(true)
                const legalDelete = await deleteFile('estadualImage')
                if(legalDelete === 200){
                    const respo = await uploadFile(path, 'estadualImage', 'vehicle' )
                    if(respo){
                        const res = await removeStatus('legal')
                        if(res === 200){
                            setChange(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'cnpj':
                setWating(true)
                const cnpjDelete = await deleteFile('cnpjImage')
                if(cnpjDelete === 200){
                    const respo = await uploadFile(path, 'cnpjImage', 'vehicle' )
                    if(respo){
                        const res = await removeStatus('cnpj')
                        if(res === 200){
                            setChange(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            default:
                break;
        }
    };

    return(
        <Modal 
            isVisible={visible} 
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={300}
            animationOutTiming={300}
        >
            <View className={`justify-center items-center w-fit`}>
                <View className={`bg-white rounded-lg h-auto p-5 justify-center items-center w-5/6`}>

                        <TouchableOpacity className='items-start justify-start w-full '
                        onPress={closeModal}
                        >
                        <AntDesign name="close" size={24} color="#FF5F00" />
                        </TouchableOpacity>
                    
                    { !wating ?
                        <>
                            <View className={`flex-col gap-5 justify-center items-center`}>
                                <View className='items-center'>
                                    <View className='justify-between flex flex-row'>
                                        <FontAwesome6 name="arrows-rotate" size={24} color="#FF5F00" />
                                        <View></View>
                                    </View>
                                    <Text className={`font-bold text-lg text-primary`}>Reenvio de imagem</Text>
                                    <Text className={`font-light text-sm text-secondary`}>Escolha uma opção e reenvie sua foto</Text>
                                </View>
                                <Pressable className={`flex-row items-center w-52 p-2 text-center bg-[#FF5F00] bg-opacity-90 rounded-lg`}
                                    onPress={()=>handleSelectPicture('camera')}
                                >
                                    <AntDesign name="camerao" size={24} color="white" />
                                    <Text className={`ml-2 text-white text-lg w-28`}>Foto</Text>
                                </Pressable>
                                <Pressable className={`flex-row items-center w-52 p-2 text-center bg-[#FF5F00] bg-opacity-90 rounded-lg`}
                                    onPress={()=>handleSelectPicture('gallery')}
                                >
                                    <AntDesign name="picture" size={24} color="white" />
                                    <Text className={`ml-2 text-white text-lg w-28`}>Galeria</Text>
                                </Pressable>
                                <Pressable className={`flex-row items-center w-52 p-2 text-center bg-[#FF5F00] bg-opacity-90 rounded-lg`}
                                    onPress={()=>handleSelectPicture('file')}
                                >
                                    <AntDesign name="pdffile1" size={24} color="white" />
                                        <Text className={`ml-2 text-white text-lg w-28`}>Documentos</Text>
                                </Pressable>
                            </View>
                            {/* <View className={`mt-2 rounded bg-green-500`} >
                                    <Button
                                        onPress={()=>closeModal()}
                                        title="Fechar"
                                        color="#7b7b7b"
                                    />
                            </View> */}
                        </>
                        : 
                        <View>
                            { !sendPicture ?
                                <View className='h-32 items-center justify-center flex gap-2'>
                                    <Text>enviando imagem</Text>
                                    <ActivityIndicator size="large" color="#FF5F00" />
                                    <Text className='font-light'>Aguarde</Text>
                                </View>
                                :
                                <View className='h-32 items-center justify-center flex gap-2'>
                                    <View>
                                        <Feather name="check-circle" size={42} color="#22c55e" />
                                        <Text className={`font-bold text-xs text-[#22c55e]`}>sucesso!</Text>
                                    </View>
                                    <View>
                                        <Text className='font-light'>
                                            Entraremos em contato assim que a foto for avaliada!
                                        </Text>
                                    </View>
                                </View>
                            }
                        </View>
                    }
                </View>
            </View>
        </Modal>
    )
}