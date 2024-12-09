import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { templates } from "../../data/templates";
// icons
import { FaRegFile } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import { BiCollapseAlt } from "react-icons/bi";
import { GoDownload } from "react-icons/go";

function Template() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [ data, setData ] = useState({})
    useEffect(()=>{
       const dataTemp =  templates.find(ele => ele.id == id)
       if(!data)
        navigate("/dashboard")
       navigate("/dashboard/proposal/1/page/1")
       setData(dataTemp)
    },[id])
    const [ isCollapse , setIsCollapse] = useState(false)
    const [ isOpenSmallSize , setOpenSmallSize] = useState(true)
    const [ page , setPage] = useState({})
    useEffect(()=>{
        if(window.innerWidth <= 766){
            setOpenSmallSize(false)
        }
    },[])
    return ( <div className="flex flex-col gap-10">
        <div className="flex h-full">
            <div>
                <ul className={` ${isCollapse?"half-opened !w-fit":"no-opened"} ${isOpenSmallSize?"block md:flex":"hidden"} flex-col gap-2 px-4 menu-pages h-full  md:w-80 lg:w-96`}>
                    <div onClick={()=>setOpenSmallSize(false)} className={`icon-close`}><MdOutlineClose/></div>
                    <div onClick={()=>setIsCollapse(!isCollapse)} className={`hidden icon-div md:flex ${isCollapse? "justify-center mb-5" :"justify-end"}`}>
                            <BiCollapseAlt/>
                        </div>
                    <div onClick={()=>navigate(`/dashboard/review/${id}`)} className="flex justify-center">
                        {isCollapse?<div className="number-page cursor-pointer">
                            <GoDownload/>
                            </div>
                        :<button >Review</button>}
                    </div>
                    <li className="flex justify-center py-3 title-menu"><h2>{data.title}</h2></li>
                    {"pages" in data && data.pages.length > 0 && data.pages.map((page)=>(
                        <li onClick={()=>{
                            setPage(page)
                            // setOpenSmallSize(false)
                            }} className="gap-2 cursor-pointer name-file " key={`Page_${page.title}`}>
                                <NavLink className={({ isActive }) => 
                                    isActive ? "active-link flex items-center justify-between  font-bold " : "flex items-center justify-between "
                                }  to={`/dashboard/proposal/${id}/page/${page.id}`}>
                                    <div className="flex  items-center icon-file">
                                        <FaRegFile style={{fontSize:"20px"}}/>
                                    </div>
                                    
                                    <div className="flex w-full justify-between items-center">
                                        <div className="title-page  uppercase flex items-center">
                                            {page.title}
                                        </div>
                                        <div className="number-page">
                                            {page.id}
                                        </div>
                                    </div>
                                </NavLink>
                        
                    </li>))}
                </ul>
            </div>
            <div className={`${isCollapse?"half-opened-right ":"no-opened-right"}`} >
                <div onClick={()=>setOpenSmallSize(true)} className="flex  md:hidden icon-file-open-menu"><FaRegFile/></div>
                <div className="p-2">
                    <div>
                        <Outlet/>
                    </div>
                </div>
                
            </div>

        </div>
        
    </div> );
}

export default Template;