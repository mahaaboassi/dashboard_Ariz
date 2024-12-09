import { useState } from "react";
import { TbLogout2 } from "react-icons/tb"; 
import { useNavigate } from "react-router-dom";

function Avatar({user}) {
    const [isOpen , setIsOpen] = useState(false)
    const navigate = useNavigate()
    const logout = ()=> {
        setIsOpen(false)
        localStorage.removeItem("user")
        navigate("/")
    }
    return ( <div onClick={()=>setIsOpen(!isOpen)} className="avatar relative h-10 w-10 cursor-pointer lg:h-12 lg:w-12 flex items-center justify-center ">
        <p>
          {user.name && user.name.substring(0,2)}
        </p>
        <div className={`p-3 menu-avatar top-12 lg:top-16 ${isOpen?"":"hidden"}`}>
            <div onClick={()=> setIsOpen(false)} className="title-menu py-1 flex justify-center"> {user.name }</div>
            <div onClick={logout} className="cursor-pointer flex gap-1 items-center pt-1"> 
                <TbLogout2 />
                 <div>Logout</div>
            </div>
        </div>
    </div> );
}

export default Avatar;