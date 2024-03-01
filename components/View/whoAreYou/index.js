import { View, Text, Image, StyleSheet, Pressable, ScrollView, StatusBar, Linking  } from "react-native"
import { useState } from "react";
import twrnc from 'twrnc';
import FixBar from "../../fixBar";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
export default function Register({navigation}){
    const [numberWhats,setNumberWhats] = useState('5511978612671')
    const handleWhatsapp = () => {
        const whatsappUrl = `whatsapp://send?phone=${numberWhats}`;
        Linking.openURL(whatsappUrl)
    }
    return(
        // <ScrollView style={twrnc`bg-white`}>
        //     <StatusBar
        //         backgroundColor='#EFEFEF'
        //     />
        //     <FixBar navigation={navigation} opition={'register'} />
        //     <View style={twrnc`h-200`}>
        //         <View style={twrnc`h-150 justify-between`}>
        //             <View style={[twrnc`flex items-center gap-2 mt-5 w-full`,]}> 
        //                 <Image  style={{ height: 50, width: 60 }}
        //                     source={require('../../../img/logo/logoAsa.png')}
        //                 />
        //                 <Text style={twrnc`font-bold text-lg `}>O que você é ?</Text>
        //             </View>

        //             <View style={twrnc`w-full p-5 px-10 gap-8`}>
        //                 <Pressable 
        //                     style={twrnc`gap-5 p-3 h-20 flex-row items-center border border-[#FF5F00] rounded-2xl`}
        //                     onPress={()=>{navigation.navigate('RegisterUser',{am:'pilot'})}}
        //                 >
        //                     <View style={twrnc`w-2/6 justify-center items-center`}>
                                
        //                         {/* <MaterialCommunityIcons name="racing-helmet" size={50} style={twrnc`text-[#404040]`} /> */}
        //                         {/* <Image
        //                             style={twrnc`w-4/6 h-full`}
        //                             resizeMode="contain"
        //                             source={Motorcycle}
        //                         /> */}
        //                     </View>
        //                     <View style={twrnc`w-4/6 justify-center`}>
        //                         <Text style={twrnc`font-bold text-base text-[#FF5F00]`}>
        //                             Entregador
        //                         </Text>
        //                     </View>
        //                 </Pressable>

        //                 {/* <Pressable 
        //                     style={twrnc`gap-5 p-3 h-20 flex-row items-center border border-[#FF5F00] rounded-2xl`}
        //                     onPress={()=>{navigation.navigate('RegisterUser',{am:'driver'}) }}
        //                 >
        //                     <View style={twrnc`w-2/6 justify-center items-center`}>
        //                         <Image
        //                             style={twrnc`w-3/6 h-full`}
        //                             resizeMode="contain"
        //                             source={Wheel}
        //                         />
        //                     </View>
        //                     <View style={twrnc`w-4/6 justify-center`}>
        //                         <Text style={twrnc`font-bold text-base text-[#FF5F00]`}>
        //                             Motorista
        //                         </Text>
        //                     </View>
        //                 </Pressable> */}

        //                 <Pressable 
        //                     style={twrnc`p-3 h-20 flex-row items-center border border-[#FF5F00] rounded-2xl`}
        //                     onPress={()=>{navigation.navigate('RegisterUser',{am:'auxiliary'})}}
        //                 >
        //                     <View style={twrnc`w-2/6 justify-center items-center`}>
        //                         <Text style={twrnc`font-bold`}>Auxiliar</Text>
        //                         {/* <Image
        //                             style={twrnc`w-4/6 h-full`}
        //                             resizeMode="contain"
        //                             source={Helper}
        //                         /> */}
        //                     </View>
        //                     <View style={twrnc`w-4/6 h-full`}>
        //                         <Text style={twrnc`p-1 text-sm`}>
        //                             Ideal para quem gosta de ajudar a entregar sonhos
        //                         </Text>
        //                     </View>
        //                 </Pressable>
        //             </View>
                    
        //             <Pressable style={twrnc`w-full flex flex-row items-center justify-center`}
        //                 onPress={handleWhatsapp}
        //             >
        //                 <View style={twrnc`flex flex-row bg-[#a3a3a3] rounded-xl px-5 py-3 items-center gap-3`}>
        //                     <FontAwesome name="whatsapp" size={24} color="white" />
        //                     <Text style={[twrnc`font-bold text-white` ,{fontFamily:'Roboto_300Light'}]}>Precisa de ajuda?</Text>
        //                 </View>
        //             </Pressable>
        //         </View>
        //     </View>
        // </ScrollView>
        <>
        </>
    )

}

// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         alignItems:'center',
//         justifyContent:'space-between'
//     },
//     containerLogo:{
//         flexDirection:"column",
//         justifyContent:"center",
//         alignItems:'center',
//         padding:16,
//     },
//     logo:{
//         width:155,
//         height:160,
//         // marginTop:35
//     },
//     containerButton:{
//         width:'100%',
//         padding:16,
//     },
//     button:{
//         width:'100%',
//         height:80,
//         flexDirection:'row',
//         alignItems:'center',
//         borderWidth:1,
//         borderRadius:10,
//         borderColor:'#FF5F00',
//         marginBottom: 15,
//     },
//     icon:{
//         width:50,
//         height:50,
//         tintColor:'#FF5F00',
//         marginStart:'5%'
//     },
//     label:{
//         fontFamily:'Roboto_500Medium',
//         color:'#FF5F00',
//         fontSize:20,
//         marginStart:'5%'
//     },
//     containerHelp:{
//         height:20,
//         borderColor:'#FF5F00',
//         borderTopWidth:2,
//         width:'100%',
//         flexDirection:"row",
//         alignItems:'center',
//         justifyContent:'center',
//         height:65
//     }
// })