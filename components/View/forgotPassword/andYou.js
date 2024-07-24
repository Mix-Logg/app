import { useEffect } from "react"
import { View, Text } from "react-native"
import GetDelivery from "../../../api/getDelivery"
export default function AndYou({user}){
    
    useEffect(()=>{
        const fetchData = async () => {
            console.log('user:', user)
            const response = await GetDelivery(user.am, user.uuid);
            console.log(response)
        }
        fetchData()
    },[])

    return(
        <View>
            <Text>{user.name}</Text>
        </View>
    )
}