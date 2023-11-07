import { View,Image,Text,StyleSheet,Pressable } from "react-native";

export default function Welcome(){
    return(
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Image style={styles.logo}
                    source={require('../../../assets/logo/logoSemArco.png')}
                />
                <Image style={styles.logoNome}
                    source={require('../../../assets/logo/logoNome.png')}
                />
            </View>
            <View style={styles.containerInfo}>
                <Text style={styles.h1}>Boas Vindas!</Text>
                <Text style={styles.txt}>Seu cadastro foi realizado</Text>
                <Text style={styles.txt}>com sucesso</Text>
            </View>
            <View style={styles.containerIcon}>
                <Image style={styles.icon}
                source={require('../../../assets/icons/palmas.png')}
                />
            </View>
            <View style={styles.containerBtn}> 
                <Pressable style={styles.btn}>
                    <Text style={styles.bntTxt}>
                        Acesse o APP
                    </Text>
                </Pressable>
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'space-between',
        padding:16
    },
    containerLogo:{
        alignItems:'center',
        marginTop:25
    },
    logo:{
        width:180,
        height:180
    },
    logoNome:{
        width:300,
        height:90
    },
    containerInfo:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    h1:{
        fontFamily:'Roboto_500Medium',
        color:'#FF5F00',
        fontSize:25
    },
    txt:{
        fontFamily:'Roboto_300Light',
        fontSize:20
    },
    containerIcon:{
        width:'100%',
        justifyContent:'flex-end',
        flexDirection: 'row', 
        alignItems: 'flex-end', 
    },
    icon:{
        width:100,
        height:100,
        tintColor:'#FF5F00'
    },
    containerBtn:{
        width:'100%',
        alignItems:'center'
    },
    btn:{
        marginBottom:20,
        borderWidth:2,
        borderColor:'#FF5F00',
        padding:15,
        paddingLeft:50,
        paddingRight:50,
        borderRadius:26
    },
    bntTxt:{
        color:'#FF5F00',
        fontSize:15,
        fontFamily:'Roboto_500Medium',
    },
})