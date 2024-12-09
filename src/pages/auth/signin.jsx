import img from "../../ariz_logo.png" 
// for validation
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Host } from "../../functionality/apiRoutes";

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email format") // Ensures it's a valid email format
        .min(4, "Email must be at least 4 characters") // Ensures the email is at least 4 characters long
        .required("Email is required"),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

function SignIn() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors },watch } = useForm({
        resolver: yupResolver(validationSchema),
         mode: 'onChange'
      });

    const [loading ,setLoading ] = useState(false)
    const onSubmit = (data)=>{
        console.log(data);
        setLoading(true)
        fetch(`${Host}auth/signin`,{
            body : JSON.stringify({
                email : data.email ,
                password :  data.password ,
            }) ,
            credentials: "include",
            headers :{
                "Content-Type" : "application/json"
            },
            method : "POST"
        }).then((res)=> res.json()).then((result)=>{
            console.log(result);
            if(result.error == 0){
                navigate("/dashboard")
                localStorage.setItem("user",JSON.stringify(result.data))
            }else{
                alert(result.message)
            }
            setLoading(false)
            
        })
       
        
    }
    return ( <form className="border min-w-30 md:min-w-42 lg:min-w-96 shadow  rounded p-8 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
    <div className="flex flex-col items-center justify-center">
        <img className="max-h-20" alt="Ariz global Logo" src={img} />
        <h3 className="flex justify-center">SIGN IN</h3>
    </div>
    
    <div className="flex flex-col gap-2">
        <label for={"email"}>Email</label>
        <input id="email" {...register("email")} type="text" placeholder="email"/>
        {errors.email && <p className="p-0.5 text-error">{errors.email.message}</p>}
    </div>
    <div className="flex flex-col gap-2">
        <label for={"password"}>Password</label>
        <input id="password" {...register("password")} type="password" placeholder="Password" />
        {errors.password && <p className="p-0.5 text-error">{errors.password.message}</p>}
    </div>
    <div >
        <p className="flex">Create an account &nbsp; <Link to={"/signup"} className="cursor-pointer hover:text-zinc-600">Sign Up</Link></p>
    </div>
    <div className="flex justify-center ">
        <button disabled={loading} type="submit">
            {loading ? "Loading" : "Submit"}
        </button>
    </div>
</form> );
}

export default SignIn;