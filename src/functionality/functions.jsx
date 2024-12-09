import { Host } from "./apiRoutes";

export const  SendEmail = async (name,email,namePdf)=>{
    const result =await  fetch(`${Host}pdf/sendEmail`,{
        body : JSON.stringify({
            email : email,
            name : name,
            namePdf : namePdf
        }) ,
        credentials: "include",
        headers :{
            "Content-Type" : "application/json"
        },
        method : "POST"
    })
    const data = await result.json()
        return {
            result : data
        }

}
