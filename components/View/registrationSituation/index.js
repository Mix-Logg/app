import { View, Text, StyleSheet, Image } from "react-native"

export default function RegistrationStuation(){
    
    return(
        <View style={styles.container}>
            
            <View style={styles.containerInfo}>
                <Image
                    style={styles.logo}
                    source={require('../../../img/logo/logoSemArco.png')}
                />
                <Text style={styles.h1}> Essa é sua <Text style={styles.span}>situação cadastral</Text> </Text>  
                <View style={styles.containerTime}>
                    
                    <View style={styles.containerTxtIcon}>
                        <Image style={[styles.iconTime,{
                            tintColor:'#28a745'
                        }]}
                            source={require('../../../img/icons/redondoOk.png')}
                        />
                        <Text style={[styles.txtTime, {
                            color:'#28a745'
                        }]}>Cadastro {"\n"} enviado</Text>
                    </View>

                    <View style={[styles.hr,{
                        backgroundColor:'#28a745'
                    }]}/>

                    <View style={styles.containerTxtIcon}>
                        <Image style={styles.iconTime}
                            source={require('../../../img/icons/relogioRedondo.png')}
                        />
                        <Text style={styles.txtTime}>Análise</Text>
                    </View>

                    <View style={styles.hr}/>

                    <View style={styles.containerTxtIcon}>
                        <Image style={styles.iconTime}
                            source={require('../../../img/icons/relogioRedondo.png')}
                        />
                        <Text style={styles.txtTime}>Aprovado</Text>
                    </View>

                    <View style={[styles.hr]}/>

                    <View style={styles.containerTxtIcon}>
                        <Image style={styles.iconTime}
                            source={require('../../../img/icons/relogioRedondo.png')}
                        />
                        <Text style={styles.txtTime}>Integração</Text>
                    </View>
                </View>
            </View>
            
            <View style={styles.containerListen}>
                <View style={styles.titleListen}>
                    <Image
                        style={[styles.iconTime,{
                            width:60,
                            height:60
                        }]}
                        source={require('../../../img/icons/megaFone.png')}
                    />
                    <Text style={[styles.span,{
                        fontSize:18,
                        fontFamily:'Roboto_500Medium',
                    }]}>Fique atento!</Text>
                </View>
                <Text style={styles.h2}>
                    Seu cadastro foi finalizado, acompanhe as próximas etapa 
                </Text>
            </View>

           <View style={styles.containerBtn}> 
                {/* <Pressable style={styles.btn}>
                    <Text style={styles.bntTxt}>
                        Entendi
                    </Text>
                </Pressable> */}
           </View>
        </View>
    )
}

const styles = StyleSheet.create({
container:{
    flex:1,
    padding:16,
    justifyContent:'space-between'
},
logo:{
    width:185,
    height:185,
    marginTop:30
},
h1:{
    fontFamily:'Roboto_500Medium',
    fontSize:20,
    marginTop:20,
    marginBottom:20
},
h2:{
    fontFamily:'Roboto_300Light',
    fontSize:20
},
containerInfo:{
    alignItems:'center'
},
containerTime:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:5,
    width:'100%'
},
containerTxtIcon:{
    alignItems:'center'
},
hr:{
    backgroundColor:'#FF5F00',
    width:'11%',
    height:2,
    marginTop:'6%'
},
iconTime:{
    width:40,
    height:40,
    tintColor:'#FF5F00'
},
txtTime:{
    fontSize:9,
    fontFamily:'Roboto_500Medium',
    color:'#FF5F00'
},
containerListen:{
    alignItems:'center',
    padding:10
},
titleListen:{
    flexDirection:'row',
    alignItems:'center'
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
span:{
    color:'#FF5F00'
}
})