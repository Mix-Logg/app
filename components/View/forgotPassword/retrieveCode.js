import { useState, useEffect, useRef } from "react"
import { View, Text, TextInput ,Image, TouchableOpacity} from "react-native"
import Mix from '../../../img/uniqueIcons/woman.png'
import Toastify from "../../toastify"
export default function RetrieveCode({code, setCodeConfirm, setCode}){

    const [warning   , setWarning] = useState(false)
    const [error    , setError]  = useState(false)
    const [codeOne  , setCodeOne]   = useState(false)
    const [codeTwo  , setCodeTwo]   = useState(false)
    const [codeThree, setCodeThree] = useState(false)
    const [codeFour , setCodeFour]  = useState(false)
    const [timeLeft , setTimeLeft]  = useState(300)
    const [isRunning, setIsRunning] = useState(true);
    const timerRef = useRef(null);

    const handleSubmit = async () => {
        const userCode = codeOne+codeTwo+codeThree+codeFour
        console.log('code:' ,codeOne)
        if(userCode.length != 4 ){
            setNotify(true)
            return
        }
        if(code === userCode){
            setCodeConfirm(true)
            return
        }
        setError(true)
        setCodeOne(false)
        setCodeTwo(false)
        setCodeThree(false)
        setCodeFour(false)
    };

    const startTimer = () => {
        timerRef.current = setTimeout(decrementTime, 1000);
    };

    const formatTime   = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const decrementTime = () => {
        setTimeLeft((prevTime) => {
          if (prevTime > 0) {
            timerRef.current = setTimeout(decrementTime, 1000);
            return prevTime - 1;
          } else {
            setCode(false);
            return 0;
          }
        });
    };

    useEffect(() => {
        startTimer()
        return () => {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }
        };
    }, []);

    return(
        <View>
            <Toastify isVisible={warning} setIsVisible={setWarning} option={'warning'} info={'O código foi digitado incorretamente'}/>
            <Toastify isVisible={error}   setIsVisible={setError} option={'danger'}  info={'Código incorreto'}/>
            <View className='items-center'>
                <View className='h-44 w-44'>
                    <Image
                        source={Mix}
                        className='w-full h-full'
                        resizeMode="contain"
                    />
                </View>
                <View className='items-center'>
                    <Text className='text-xl mt-2 font-semibold text-primary'>
                        Enviamos o código !
                    </Text>
                    <Text className='font-light'>
                        Acabamos de enviar o código para o seu whatsapp
                    </Text>
                </View>
                <View className='mt-10 flex-row justify-around w-full'>
                    <TextInput 
                        className='border border-[#C7C7C7] w-16 h-16 rounded-xl text-primary text-center text-3xl'
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={(event)=>setCodeOne(event)}
                    />
                    <TextInput 
                        className='border border-[#C7C7C7] w-16 h-16 rounded-xl text-primary text-center text-3xl'
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={(event)=>setCodeTwo(event)}
                    />
                    <TextInput 
                        className='border border-[#C7C7C7] w-16 h-16 rounded-xl text-primary text-center text-3xl'
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={(event)=>setCodeThree(event)}
                    />
                    <TextInput 
                        className='border border-[#C7C7C7] w-16 h-16 rounded-xl text-primary text-center text-3xl'
                        keyboardType="number-pad"
                        maxLength={1}
                        onChangeText={(event)=>setCodeFour(event)}
                    />
                </View>
                <View className='mt-5 px-4'>
                    <Text className='text-3xl text-primary font-bold'>
                        {formatTime(timeLeft)}
                    </Text>
                </View>
                <View className='mt-14 items-center w-full'>
                    <TouchableOpacity
                        className='w-3/4 items-center justify-center bg-primary h-10 rounded-full'
                        onPress={handleSubmit}
                    >
                        <Text className='text-white text-lg font-semibold'>
                            Confirmar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}