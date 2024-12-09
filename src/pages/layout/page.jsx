import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import img from "../../images/arizglobal-logo-web-white.png"
import Avatar from "../../components/avatar";
function Layout() {
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    useEffect(()=>{
        if(!localStorage.getItem("user"))
            navigate("/")
        const data = JSON.parse(localStorage.getItem("user"))
        setUser(data)
    },[])
   
    return ( <div >
        <div className="flex justify-between items-center nav p-1 ">
            <div>
                <img className="max-h-12 lg:max-h-14" src={img} alt="logo" />
            </div>
            <div>
                <Avatar user={"name" in user ? user :{}} />
            </div>
        </div>
        <div className="mt-3">
            <Outlet/>
        </div>

    </div> );
}

export default Layout;