import { ScrollView, View, Text, TextInput } from "react-native";
import FixBar from "../fixBar";
import { useEffect } from "react";
import { Input } from "react-native-elements";
export default function RegisterPersonWallet({ navigation }) {
  useEffect(() => {}, []);

  return (
    <>
      <FixBar navigation={navigation} opition={"wallet"} />
      <ScrollView className="bg-white">
        <View className='mt-5 px-5'>
            <View>
                <Text className='text-lg'>Data de nascimento</Text>
            </View>
            <View className='flex-row px-5 mt-5 items-center'>
                    <TextInput className='border text-center border-primary w-10 rounded-lg h-10'>
                    </TextInput>
                <Text className='text-xl text-primary border-primary rounded-2xl ml-3 mr-3'>/</Text>
                    <TextInput className='border text-center w-10 border-primary rounded-lg h-10'>
                    </TextInput>
                <Text className='text-xl text-primary rounded-2xl ml-3 mr-3'>/</Text>
                    <TextInput className='border text-center border-primary w-14 rounded-lg h-10'>
                    </TextInput>
            </View>
        </View>
        <View className='mt-5 px-5'>
           <View>
                <View>
                    <Text className='text-sm'>Primeiro nome</Text>
                </View>
                <View className='mt-3'>
                    <TextInput className='border-b'>

                    </TextInput>
                </View>
           </View>
            <View className='mt-10'>
                <View>
                    <Text className='text-sm'>Segundo nome</Text>
                </View>
                <View className='mt-3'>
                    <TextInput className='border-b'>

                    </TextInput>
                </View>
            </View>
        </View>
      </ScrollView>
    </>
  );
}
