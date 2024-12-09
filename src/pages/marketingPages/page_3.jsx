import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// icon
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
const Page_3 = React.forwardRef(({page,isReview},ref) => {
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
        if(localStorage.getItem("page_3")){
            setCurrentPage(JSON.parse(localStorage.getItem("page_3")))
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
        localStorage.setItem("page_3",JSON.stringify(currentPage))
        setIsOpenInput({
            title : false,
            description : false,
            subTitle :false,
        })
    }
    const handleChange = (e,type) => {
        setCurrentPage(prev=>({...prev,[type]:e.target.value}))

    }
    return ( <div ref={ref} className={`${isReview && "p-6"} page-3`} style={{color : colors.light}}>

        <div className="flex">
            <div className={`${isReview?"flex w-1/4 items-center":"w-1/4 md:flex hidden items-center"}`}>
                <img className="" alt="image" src={currentPage.img} />
            </div>
            <div className={`${isReview?"w-3/4":"w-full md:w-3/4 "}  border-accent p-10`}>
                <div style={{background : colors.dark}} className="left-border"></div>
                <div style={{background : colors.dark}} className="bottom-border"></div>
                <div style={{background : colors.dark}} className="top-border"></div>
                <div style={{background : colors.dark}} className="right-border"></div>
                <div className="flex-col flex gap-2">
                    <div className="flex gap-2 items-center">
                                <h2  className="uppercase" style={{color : colors.dark}}>{currentPage.title}</h2> 
                                {!isOpenInput.title && <MdEdit onClick={()=> setIsOpenInput(prev=>({...prev,title:true}))} className={`${isReview && "no-print"} cursor-pointer`} style={{fontSize:"25px",color:colors.subMain}} />}
                     </div>
                     {isOpenInput.title && <input style={{color:colors.dark}} className="w-3/4" value={currentPage.title} onChange={(e)=>handleChange(e,"title")}  placeholder="Title"/>}
                     {
                        isOpenInput.description ?<textarea  style={{color:colors.dark}} className="w-full" value={currentPage.description} onChange={(e)=>handleChange(e,"description")}  placeholder="Title"/>
                         :<div className="flex gap-2 items-center">
                                <p style={{color : colors.dark}}>{currentPage.description}</p>
                                {!isOpenInput.description && <MdEdit onClick={()=> setIsOpenInput(prev=>({...prev,description:true}))} className={`${isReview && "no-print"} cursor-pointer`} style={{fontSize:"80px",color:colors.subMain}} />}
                           </div>  
                     }
                    
                </div>
                <div style={{background:colors.subMain}} className="h-1 rounded w-full my-8 "></div>
                <div className="">
                    <div className="flex gap-2 items-center">
                                    <h2  className="uppercase" style={{color : colors.subMain}}>{currentPage.subTitle}</h2> 
                                    {!isOpenInput.subTitle && <MdEdit onClick={()=> setIsOpenInput(prev=>({...prev, subTitle:true}))} className={`${isReview && "no-print"} cursor-pointer`} style={{fontSize:"25px",color:colors.subMain}} />}
                                    <div className={`${isReview && "no-print"} cursor-pointer`}><IoIosAddCircleOutline  onClick={()=>setOpenAdd(true)}  style={{color: colors.subMain, fontSize : "25px"}} /></div>
                        </div>
                    {isOpenInput.subTitle &&
                    <input style={{color:colors.dark}} className="w-3/4" value={currentPage.subTitle} onChange={(e)=>handleChange(e,"subTitle")}  placeholder="Subtitle"/>
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
                            <div onClick={()=>deleteRowFromTable(index)} className={`${isReview && "no-print"} cursor-pointer flex items-center`}>
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

        </div>
        <div className={`${isReview && "no-print"} justify-center flex`}>
            <button onClick={save}>Save</button>
        </div>

    </div> );
})

export default Page_3;