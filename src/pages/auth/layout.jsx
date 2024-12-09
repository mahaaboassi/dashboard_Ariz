import { Outlet, useNavigate } from "react-router-dom";
import img from "../../ariz_logo.png" 
import { useEffect } from "react";

function LayoutAuth() {
    const navigate = useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("user"))
            navigate("/dashboard/proposal/1/page/1")
    },[])
    return ( <div className='grid grid-cols-1  lg:grid-cols-2 '>
        <div className="intro hidden lg:flex  lg:h-screen  flex flex-col justify-center items-center ">
            <img className="max-h-52" alt="Ariz global Logo" src={img} />
            <h2 className="pb-2"> Ariz Global</h2>
            <p> Start with or corporation to get updates</p>
        </div>
        <div  className="form-intro  flex h-screen flex justify-center items-center">
            <Outlet/>
        </div>
        
    </div>  );
}

export default LayoutAuth;