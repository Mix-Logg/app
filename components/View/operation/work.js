
import FixBar from "../../fixBar"
import { View, Text } from "react-native"
import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import findOneOperation from "../../../hooks/findOneOperation"
import Wating from "../../wating"
import FastShop from "./clients/fastShop"
import Frubana  from "./clients/frubana"
export default function WorkOperationToday(){
    const [operation, setOperation] = useState('')
    const [operationDetails, setOperationDetails] = useState(null)
    const navigation = useNavigation();

    useEffect(()=>{
        const dataFetch = async () => {
            const response = await findOneOperation();
            setOperation(response);
            switch (response.operation) {
                case 'Fast-Shop' :
                    setOperationDetails(<FastShop/>)
                    break;
                case 'frubana':
                    setOperationDetails(<Frubana/>)
                    break;
            
            }        }
        dataFetch()
    },[])

    return(
        <> 
            { operationDetails ?
                operationDetails
                :
                <Wating/>
            }
        </>
    )
}