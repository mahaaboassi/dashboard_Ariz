import { useState } from "react";

function Signup() {
    const [values, setValues ] = useState({
        name :"",
        email : "",
        password :""
    })
    const handleChange = (type,value)=>{
        setValues(prev=>({...prev,[type]:value}))

    }
    const handleSubmit = ()=>{
        fetch("http://localhost:5000/api/auth/signup",{
            body : JSON.stringify({
                name : values.name ,
                email : values.email ,
                password :  values.password ,
            }) ,
            headers :{
                "Content-Type" : "application/json"
            },
            method : "POST"
        }).then((res)=> res.json()).then((data)=>{
            console.log(data);
            
        })
    }
    return ( <div>
        <div className="py-3">
            <input onChange={(e)=>handleChange("name",e.target.value)} placeholder="Enter name" />
        </div>
        <div className="py-3">
            <input onChange={(e)=>handleChange("email",e.target.value)} placeholder="Enter email" />
        </div>
        <div className="py-3">
            <input onChange={(e)=>handleChange("password",e.target.value)} placeholder="Enter password" />
        </div>
        <div className="py-3">
            <button onClick={handleSubmit}>Submit</button>
        </div>
    </div> );
}

export default Signup;