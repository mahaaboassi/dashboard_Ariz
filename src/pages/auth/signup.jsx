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
    name :  Yup.string()// Ensures it's a valid email format
        .min(4, "Name must be at least 4 characters") // Ensures the email is at least 4 characters long
        .required("Name is required"),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

function SignUp() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors },watch } = useForm({
        resolver: yupResolver(validationSchema),
         mode: 'onChange'
      });

    const [loading ,setLoading ] = useState(false)
    const onSubmit = (data)=>{
        setLoading(true)
        fetch(`${Host}auth/signup`,{
            body : JSON.stringify({
                email : data.email ,
                name : data.name,
                password :  data.password ,
            }) ,
            headers :{
                "Content-Type" : "application/json"
            },
            credentials: "include",
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
        <h3 className="flex justify-center">SIGN Up</h3>
    </div>
    
    <div className="flex flex-col gap-2">
        <label for={"name"}>Name</label>
        <input id="name" {...register("name")} type="text" placeholder="Name"/>
        {errors.name && <p className="p-0.5 text-error">{errors.name.message}</p>}
    </div>
    <div className="flex flex-col gap-2">
        <label for={"email"}>Email</label>
        <input id="email" {...register("email")} type="text" placeholder="Email"/>
        {errors.email && <p className="p-0.5 text-error">{errors.email.message}</p>}
    </div>
    <div className="flex flex-col gap-2">
        <label for={"password"}>Password</label>
        <input id="password" {...register("password")} type="password" placeholder="Password" />
        {errors.password && <p className="p-0.5 text-error">{errors.password.message}</p>}
    </div>
    <div >
        <p className="flex">I have an account &nbsp; <Link to={"/"} className="cursor-pointer hover:text-zinc-600">Sign In</Link></p>
    </div>
    <div className="flex justify-center ">
        <button disabled={loading} type="submit">
            {loading ? "Loading" : "Submit"}
        </button>
    </div>
</form> );
}

export default SignUp;