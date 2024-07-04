import { useEffect, useState} from "react";
import NoHaveOperation from "./noHaveOperation";
import findOneOperation from "../../../hooks/findOneOperation";
import Wating from "../../wating";
import OperationHome from "./home";
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
                <OperationHome/>
            :
                <NoHaveOperation/>
        }
       </>
    )
}