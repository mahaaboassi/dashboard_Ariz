import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// icon
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";

function Page_4({page}) {
    const [ currentPage , setCurrentPage ] = useState({})
    const [ row , setRow ] = useState("")
    const colors = useSelector(state => state.colors)
    const [ openAdd , setOpenAdd] = useState(false)
    const [isOpenInput , setIsOpenInput] = useState({
        title : false,
        description : false,
        subTitle :false,
    })
    useEffect(()=>{
        if(localStorage.getItem("page_4")){
            setCurrentPage(JSON.parse(localStorage.getItem("page_4")))
        }else{
            setCurrentPage(page)
        }
    },[])
    const deleteRowFromTable = (index) =>{
        const data = currentPage.options.filter((ele,i) => i != index)
        setCurrentPage(prev=>({
            ...prev,
            options : data
        }))
    }
    const saveRow = () => {
        const data = currentPage.options
        data.push(row)
        setCurrentPage(prev=>({...prev,
            options : data
        }))
        setRow("")

    }
    const save = ()=>{
        localStorage.setItem("page_4",JSON.stringify(currentPage))
        setIsOpenInput({
            title : false,
            firstContent:{
                title : false,
                title_1 :false,
                title_2 : false,
                title_3 : false
            },
            secondTitle : false,
            thirdTitle : false,
        })
    }
    const handleChange = (e,type) => {
        setCurrentPage(prev=>({...prev,[type]:e.target.value}))

    }
    return ( <div className="page-4" style={{color : colors.light}}>
       <div>
       <div className="flex  gap-2  items-center">
                    <h2  className="uppercase" style={{color : colors.dark}}>{currentPage.title}</h2> 
                    {!isOpenInput.title && <MdEdit onClick={()=> setIsOpenInput(prev=>({...prev,title:true}))} className="cursor-pointer" style={{fontSize:"25px",color:colors.subMain}} />}
                </div>
                {isOpenInput.title && <input style={{color:colors.dark}} className="w-3/4" value={currentPage.title} onChange={(e)=>handleChange(e,"title")}  placeholder="Title"/>}
            <div style={{borderBottom:`2px solid ${colors.subMain}`}} ></div>
        </div>
        <div className="grid gird-cols-1  md:gird-cols-2 gap-2">
           {
            "currentPage" in currentPage &&  <div>
            <h4  >test</h4>
            <div className="">
                <div className="flex  gap-2  items-center">
                    <h3  className="uppercase" style={{color : colors.subMain}}>{currentPage.firstContent.title}</h3> 
                    {!isOpenInput.firstContent && <MdEdit onClick={()=> setIsOpenInput(prev=>({...prev, [currentPage.firstContent.title]:true}))} className="cursor-pointer" style={{fontSize:"25px",color:colors.subMain}} />}
                    <div className="cursor-pointer"><IoIosAddCircleOutline onClick={()=>setOpenAdd(true)}  style={{color: colors.subMain, fontSize : "25px"}} /></div>
                </div>
                { isOpenInput.subTitle &&
                    <input style={{color:colors.dark}} className="w-3/4" value={currentPage.firstContent.title} onChange={(e)=>handleChange(e,"subTitle")}  placeholder="Subtitle"/>
                }
                <ul className="w-full py-5" style={{color : colors.dark}}>
                    {openAdd && <li className="flex w-full gap-2  items-center mb-3">
                        <div onClick={saveRow} className="cursor-pointer flex items-center">
                            <FaRegSave style={{color: colors.subMain, fontSize : "20px"}}/>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div><input  value={row} onChange={(e)=>setRow(e.target.value)} placeholder="Title" /></div>
                        </div>
                    </li>}
                    {"options" in currentPage && currentPage.options.map((ele , index)=>(<li className="flex w-full gap-2 items-center mb-3"  key={`Table_${ele}_${index}`}>
                        <div onClick={()=>deleteRowFromTable(index)} className="cursor-pointer flex items-center">
                            <MdDeleteOutline style={{color: colors.subMain, fontSize : "20px"}}/>
                        </div>
                        <div className="flex gap-3 w-full items-center ">
                            <div className="flex justify-center items-center" style={{width:"10px",height:"10px",
                            borderRadius:"50%",background:colors.dark,color:colors.light}}></div>
                            <div className="capitalize">
                                <p>{ele}</p>
                            </div>
                            
                        </div>
                    </li>))}
                    
                </ul>
            </div>
        </div>
           }
        </div>

        <div className="justify-center flex">
            <button onClick={save}>Save</button>
        </div>

    </div> );
}

export default Page_4;