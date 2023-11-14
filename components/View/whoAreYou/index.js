import { View, Text, Image, StyleSheet, Pressable } from "react-native"

export default function Register({navigation}){
    return(
        <View style={styles.container}>
            <View style={styles.containerLogo}> 
                <Image style={styles.logo}
                source={require('../../../src/main/res/drawable-mdpi/assets/logo/logoSemArco.png')}
                />
                <Text style={[styles.label,{marginStart:'0%'}]}>O que você é?</Text>
            </View>

            <View style={styles.containerButton}>
                {/* Empresa */}
                <Pressable 
                    style={styles.button}
                    onPress={()=>{navigation.navigate('RegisterContact',{sou:'empresa'})}}
                >
                    <Image style={styles.icon}
                        source={require('../../../src/main/res/drawable-mdpi/assets/icons/empresa.png')}
                    />
                    <Text style={styles.label}>Empresa</Text>
                </Pressable>
                {/* Transportadora */}
                <Pressable 
                    style={styles.button}
                    onPress={()=>{navigation.navigate('RegisterContact',{sou:'transportadora'})}}
                >
                    <Image style={[styles.icon,{height:80,width:80}]}
                        source={require('../../../src/main/res/drawable-mdpi/assets/icons/caminhao.png')}
                    />
                    <Text style={[styles.label,{marginStart:'10%'}]}>Transportadora</Text>
                </Pressable>
                {/* Motorista */}
                <Pressable 
                    style={styles.button}
                    onPress={()=>{navigation.navigate('RegisterContact',{sou:'motorista'})}}
                >
                    <Image style={styles.icon}
                        source={require('../../../src/main/res/drawable-mdpi/assets/icons/volante.png')}
                    />
                    <Text style={styles.label}>Motorista de Entrega</Text>
                </Pressable>
                {/* Auxiliar */}
                <Pressable 
                    style={styles.button}
                    onPress={()=>{navigation.navigate('RegisterContact',{sou:'auxiliar'})}}
                >
                    <Image style={styles.icon}
                        source={require('../../../src/main/res/drawable-mdpi/assets/icons/ajudante.png')}
                    />
                    <Text style={styles.label}>Auxiliar de Entrega</Text>
                </Pressable>
            </View>
                
            <View style={styles.containerHelp}>
                <Image style={[styles.icon,{
                    width:30,
                    height:30,
                }]}
                    source={require('../../../src/main/res/drawable-mdpi/assets/icons/whats.png')}
                />
                <Text style={[styles.label, {
                    marginStart:0,
                    fontFamily:'Roboto_300Light'
                    }]}>Precisa de ajuda?</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-between'
    },
    containerLogo:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:'center',
        padding:16,
    },
    logo:{
        width:155,
        height:160,
        // marginTop:35
    },
    containerButton:{
        width:'100%',
        padding:16,
    },
    button:{
        width:'100%',
        height:80,
        flexDirection:'row',
        alignItems:'center',
        borderWidth:2,
        borderRadius:5,
        borderColor:'#FF5F00',
        marginBottom: 15,
    },
    icon:{
        width:65,
        height:65,
        tintColor:'#FF5F00',
        marginStart:'5%'
    },
    label:{
        fontFamily:'Roboto_500Medium',
        color:'#FF5F00',
        fontSize:20,
        marginStart:'15%'
    },
    containerHelp:{
        height:20,
        borderColor:'#FF5F00',
        borderTopWidth:2,
        width:'100%',
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'center',
        height:65
    }
})