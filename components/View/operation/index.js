import NoHaveOperation from "./noHaveOperation";
import { useEffect, useState} from "react";
import { View, Text } from "react-native";
import BarOperation from "../../barOperation";
import findOneOperation from "../../../hooks/findOneOperation";
import Wating from "../../wating";
import Work from "./work";
export default function Operation(){
    const [haveOperation, setHaveOperation] = useState(null)
    
    useEffect(()=>{
        const fetchData = async () => {
           const operation = await findOneOperation();
           if(operation.status == 500){
            setHaveOperation(false)
            return 
           }
           setHaveOperation(true)
        }
        fetchData()
    },[])

    return(
       <>
        {haveOperation == null ?
            <Wating/>
            :
            haveOperation ?
            <Work/>
            :
            <NoHaveOperation/>
        }
       </>
    )
}