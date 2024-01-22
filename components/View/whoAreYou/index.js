import { View, Text, Image, StyleSheet, Pressable, StatusBar } from "react-native"
import twrnc from 'twrnc';

export default function Register({navigation}){
    return(
        
        <View style={twrnc`flex items-center justify-between gap-5`}>
            <View style={[twrnc`flex items-center gap-2 mt-5`,{height:'15%',width:'30%'}]}> 
                <Image style={[twrnc`mr-6 h-full w-full mr-10`]}
                    source={require('../../../img/logo/logoAsa.png')}
                />
                <Text style={twrnc`font-bold text-[#FF5F00] text-lg`}>O que você é ?</Text>
            </View>

            <View style={twrnc`w-full px-8 py-10`}>
                {/* Empresa */}
                <Pressable 
                    style={styles.button}
                    onPress={()=>{navigation.navigate('RegisterContact',{sou:'empresa'})}}
                >
                    <Image style={styles.icon}
                        source={require('../../../img/icons/empresa.png')}
                    />
                    <Text style={styles.label}>Empresa</Text>
                </Pressable>
                {/* Transportadora */}
                <Pressable 
                    style={styles.button}
                    onPress={()=>{navigation.navigate('RegisterContact',{sou:'transportadora'})}}
                >
                    <Image style={[styles.icon,{height:60,width:60}]}
                        source={require('../../../img/icons/caminhao.png')}
                    />
                    <Text style={[styles.label,{marginStart:'10%'}]}>Transportadora</Text>
                </Pressable>
                {/* Motorista */}
                <Pressable 
                    style={styles.button}
                    onPress={()=>{navigation.navigate('RegisterContact',{sou:'motorista'})}}
                >
                    <Image style={styles.icon}
                        source={require('../../../img/icons/volante.png')}
                    />
                    <Text style={styles.label}>Motorista de Entrega</Text>
                </Pressable>
                {/* Auxiliar */}
                <Pressable 
                    style={styles.button}
                    onPress={()=>{navigation.navigate('RegisterContact',{sou:'auxiliar'})}}
                >
                    <Image style={styles.icon}
                        source={require('../../../img/icons/ajudante.png')}
                    />
                    <Text style={styles.label}>Auxiliar de Entrega</Text>
                </Pressable>
            </View>
                
            <View style={twrnc`w-full flex flex-row items-center justify-center`}>
                <View style={twrnc`flex flex-row bg-[#FF5F00] rounded-xl px-5 py-3 items-center gap-3`}>
                    <Image style={[styles.icon,{ width:30, height:30, tintColor:'white'}]}
                        source={require('../../../img/icons/whats.png')}
                    />
                    <Text style={[twrnc`font-bold text-white` ,{fontFamily:'Roboto_300Light'}]}>Precisa de ajuda?</Text>
                </View>
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
        width:50,
        height:50,
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