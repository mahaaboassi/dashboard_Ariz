import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// icon
import { MdEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
const Page_2 = React.forwardRef(({page,isReview},ref) =>{
    const [ currentPage , setCurrentPage ] = useState({})
    const [ row , setRow ] = useState("")
    const colors = useSelector(state => state.colors)
    const [ openAdd , setOpenAdd] = useState(false)
    useEffect(()=>{
        if(localStorage.getItem("page_2")){
            setCurrentPage(JSON.parse(localStorage.getItem("page_2")))
        }else{
            setCurrentPage(page)
        }
    },[])
    const deleteRowFromTable = (index) =>{
        const data = currentPage.table.filter((ele,i) => i != index)
        setCurrentPage(prev=>({
            ...prev,
            table : data
        }))
    }
    const saveRow = () => {
       
        const data = currentPage.table
        data.push({
            title: row
        })
        setCurrentPage(prev=>({...prev,
            table : data
        }))
        setRow("")

    }
    const save = ()=>{
        setOpenAdd(false)
        
        localStorage.setItem("page_2",JSON.stringify(currentPage))
    }
    return ( <div ref={ref} className={`${isReview && "p-6"} page-2  `} style={{color : colors.light}}>
        <div>
            <h2 className={`${isReview ? "py-4" : ""} uppercase`}  style={{color: colors.dark}} > {currentPage.title} </h2>
            <div style={{borderBottom:`2px solid ${colors.subMain}`}} ></div>
        </div>
       
        <div className="flex">
            <div className={`${isReview ? "w-1/4 flex items-center":"w-1/4 md:flex hidden items-center"} `}>
                <img className="" alt="image" src={currentPage.img} />
            </div>
            <div className={`${isReview?"w-3/4":"w-full md:w-3/4"}  table`}>
                <div className={`${isReview && "no-print"} flex items-center justify-end cursor-pointer `}>
                    <IoIosAddCircleOutline onClick={()=>setOpenAdd(true)}  style={{color: colors.subMain, fontSize : "40px"}} />
                </div>
                <ul className="w-full py-5" style={{color : colors.dark}}>
                    {openAdd && <li className="flex w-full gap-2  items-center mb-3">
                        <div onClick={saveRow} className="cursor-pointer flex items-center">
                            <FaRegSave style={{color: colors.subMain, fontSize : "20px"}}/>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div><input value={row} onChange={(e)=>setRow(e.target.value)} placeholder="Title" /></div>
                        </div>
                    </li>}
                    {"table"in currentPage && currentPage.table.map((table , index)=>(<li className="flex w-full gap-2  items-center mb-3"  key={`Table_${table.title}_${table.number}`}>
                        <div onClick={()=>deleteRowFromTable(index)} className={`${isReview && "no-print"} cursor-pointer flex items-center`}>
                            <MdDeleteOutline style={{color: colors.subMain, fontSize : "20px"}}/>
                        </div>
                        <div className="flex w-full items-center justify-between">
                            <div className="capitalize">
                                <p>{table.title}</p>
                            </div>
                            <div className="flex justify-center items-center" style={{width:"30px",height:"30px",
                            borderRadius:"50%",background:colors.subMain,color:colors.light}}>{index}</div>
                        </div>
                    </li>))}
                    
                </ul>
                

            </div>

        </div>
        <div className={`${isReview && "no-print"} justify-center flex`}>
            <button onClick={save}>Save</button>
        </div>

    </div> );
})

export default Page_2;