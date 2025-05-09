import { View, Text, Image, StyleSheet,Pressable } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useRoute } from '@react-navigation/native';


export default function InfoPhoto({navigation}){
    const route = useRoute();
    return(
    <KeyboardAwareScrollView>
        <View style={styles.container}>

            <Text style={styles.h1}>Foto</Text>

            <View style={styles.containerListen}>
                <Text style={styles.h2}> 
                    Leia atentamente as instruções 
                </Text>
            </View>

            <View style={styles.containerInfoOne}>
                <Text style={styles.txtInfoOne}>
                    Tenha em mãos os seguintes documentos e informações.
                </Text>
            </View>

            <View style={styles.containerIcons}>
                <View style={styles.containerInstrution}>
                    <Image style={styles.iconNumber}
                        source={require('../../../img/icons/1.png')}
                    />
                    <Text style={styles.label}>CNPJ</Text>
                </View>

                <View style={[styles.containerInstrution,{marginTop:15,marginBottom:15}]}>
                    <Image style={styles.iconNumber}
                            source={require('../../../img/icons/2.png')}
                    />
                    <Text style={styles.label}>Incrição Estadual</Text>
                </View>

                <View style={styles.containerInstrution}>
                    <Image style={styles.iconNumber}
                            source={require('../../../img/icons/3.png')}
                    />
                    <Text style={styles.label}>Comprovante de Residência</Text>
                </View>

                {route.params.sou != 'transportadora' ? <View style={[styles.containerInstrution, {marginTop:15,marginBottom:5}]}>
                    <Image style={styles.iconNumber}
                            source={require('../../../img/icons/4.png')}
                    />
                    <Text style={styles.label}>Ramo de Atividade</Text>
                </View>:''}
            </View>
            <View style={styles.containerInfoTwo}>
                <Text style={styles.txtInfoTwo}>
                    Lembre-se de tirar as fotos legíveis, em um ambiente bem iluminado.
                </Text>
            </View>
            <View style={styles.containerBtn}>
                <Pressable 
                    style={styles.btn}
                    onPress={() => {
                        navigation.navigate('upLoadParceiro',route.params)
                    }}
                >
                    <Text style={styles.btnTxt}>Vamos lá!</Text>
                </Pressable>
            </View>
            
        </View>
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
    containerListen:{
        width:'100%',
        alignItems:'center',
        marginTop:25
    },
    h2:{
        color:'#FF5F00',
        fontFamily:'Roboto_500Medium',
        fontSize:23
    },
    containerInfoOne:{
        marginTop:30,
        width:'100%'
    },
    txtInfoOne:{
        fontSize:23,
        fontFamily:'Roboto_300Light',
    },
    containerIcons:{
        marginTop:25,
        marginBottom:25
    },
    containerInstrution:{
        flexDirection:'row',
        alignItems:'center'
    },
    iconNumber:{
        height:40,
        width:40,
        tintColor:'#FF5F00',
    },
    label:{
        fontFamily:'Roboto_500Medium',
        fontSize:20,
        paddingStart:15,
        color:'#FF5F00',
    },
    containerInfoTwo:{
        width:'85%'
    },
    txtInfoTwo:{
        fontSize:23,
        fontFamily:'Roboto_300Light',
    },
    containerBtn:{
        width:'100%',
        alignItems:"center",
        justifyContent:'center',
        flexDirection:'row',
        marginTop:35
    },
    btn:{
        borderWidth:2,
        borderColor:'#FF5F00',
        padding:20,
        paddingEnd: 50,
        paddingStart: 50,
        borderRadius:5
    },
    btnTxt:{
        fontFamily:'Roboto_500Medium',
        fontSize:20,
        color:'#FF5F00'
    },
    imgSelfie:{
        width:150,
        height:150,
        tintColor:'#FF5F00'
    }
})