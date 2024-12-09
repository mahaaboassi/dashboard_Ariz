import  React , { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// icon
import { MdEdit } from "react-icons/md";
const  Page_1 = React.forwardRef(({page,isReview = false},ref) => {
    const colors = useSelector(state => state.colors)
    
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [currentPage , setCurrentPage ] = useState({})

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        };
        if(localStorage.getItem("page_1")){
            setCurrentPage(JSON.parse(localStorage.getItem("page_1")))
        }else{
            setCurrentPage(page)
        }
        
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const [isOpenInput , setIsOpenInput] = useState({
        title : false,
        subTitle : false,
        firstPhrass :false,
        secondPhrass : false
    })
    const handleChange = (e,type) => {
        setCurrentPage(prev=>({...prev,[type]:e.target.value}))

    }
    const saveUpdates = ()=>{
        localStorage.setItem("page_1",JSON.stringify(currentPage))
        setIsOpenInput({
            title : false,
            subTitle : false,
            firstPhrass :false,
            secondPhrass : false
        })
    }
    return ( <div ref={ref} className={`w-full  ${isReview?"review":"p-10"}`}>
        
        <div className="w-full items-center">
            <div style={{background:colors.main}} className={ `p-10 `}>
                <div>
                    <img className="h-20" alt="logo" src={page.img} />
                </div>
                <div  className={`${isReview ? "grid grid-cols-3":" grid gap-2 md:grid-cols-3"}   `}>
                    <div className="col-span-2 " style={isMobile && !isReview?{borderBottom:`2px solid ${colors.subMain}`}:{borderRight:`2px solid ${colors.subMain}`}}>
                        <div className="py-10">
                            <div className="flex gap-2 items-center">
                                <h1  className={`${isReview?" font-bold":""} uppercase `} style={{color:colors.light}}>{currentPage.title}</h1> 
                                {!isOpenInput.title && <MdEdit onClick={()=> setIsOpenInput(prev=>({...prev,title:true}))} className={`${isReview &&"no-print"} cursor-pointer `} style={{fontSize:"25px",color:colors.light}} />}
                            </div>
                            {isOpenInput.title && <input className="w-3/4" value={currentPage.title} onChange={(e)=>handleChange(e,"title")}  placeholder="Title"/>}
                            <div className="flex gap-2 items-center">
                                <h3 className={`${isReview?"font-bold":""} uppercase`} style={{color:colors.subMain}}>{currentPage.subTitle}</h3> 
                                {!isOpenInput.subTitle && <MdEdit onClick={()=> setIsOpenInput(prev=>({...prev,subTitle:true}))} className={`${isReview &&"no-print"} cursor-pointer `} style={{fontSize:"25px",color:colors.light}} />}
                            </div>
                            {isOpenInput.subTitle && <input  className="w-3/4" value={currentPage.subTitle} onChange={(e)=>handleChange(e,"subTitle")} placeholder="Subtitle"/>}
                        </div>
                        <div  style={{background:colors.subMain}} className="h-1 rounded w-1/4 mb-4"></div>
                        <div className="mb-3">
                            <div className="flex gap-2 items-center">
                                <p className="uppercase"  style={{color:colors.light}}>{currentPage.firstPhrass}</p> 
                                {!isOpenInput.firstPhrass && <MdEdit onClick={()=> setIsOpenInput(prev=>({...prev,firstPhrass:true}))} className={`${isReview &&"no-print"} cursor-pointer `} style={{fontSize:"25px",color:colors.light}} />}
                            </div>
                            {isOpenInput.firstPhrass && <input  className="w-3/4" value={currentPage.firstPhrass} onChange={(e)=>handleChange(e,"firstPhrass")}  placeholder="First Phrass"/>}
                            <div className="flex gap-2 items-center">
                               <p className="uppercase"  style={{color:colors.light}}>{currentPage.secondPhrass}</p>
                               {!isOpenInput.secondPhrass && <MdEdit onClick={()=> setIsOpenInput(prev=>({...prev,secondPhrass:true}))} className={`${isReview &&"no-print"} cursor-pointer `} style={{fontSize:"25px",color:colors.light}} />}
                            </div>
                            
                            {isOpenInput.secondPhrass && <input  className="w-3/4" value={currentPage.secondPhrass} onChange={(e)=>handleChange(e,"secondPhrass")}  placeholder="Second Phrass"/>}
                        </div>
                    </div>
                    <div className={`col-span-1 flex flex-col gap-3 md:p-5 ${isReview && "p-5 "}`}>
                        
                        <div >
                            <label  style={{color:colors.light}}>File Name : </label>
                            <div className="pt-2">
                                <p style={{color:colors.light}} className={`${!isReview &&"no-print"} `}>{currentPage.fileName}</p>
                             <input className={`${isReview &&"no-print"} w-full`} value={currentPage.fileName} onChange={(e)=>handleChange(e,"fileName")}  placeholder="File Name" />
                            </div>
                            
                        </div>
                        <div>
                            <label  className="flex" style={{color:colors.light}}>Date : </label>
                            <div className="pt-2">
                             <p style={{color:colors.light}} className={`${!isReview &&"no-print"}   `}>{currentPage.date}</p>
                             <input className={`${isReview &&"no-print"} w-full `} value={currentPage.date} onChange={(e)=>handleChange(e,"date")}  type="date" placeholder="Date" />
                            </div>
                           
                        </div>
                        <div>
                            <label style={{color:colors.light}}>Prepared For : </label>
                            <div className="pt-2">
                                <p style={{color:colors.light}} className={`${!isReview &&"no-print"}  `}>{currentPage.preparedFor}</p>
                                <input className={`${isReview &&"no-print"} w-full `}  value={currentPage.preparedFor} onChange={(e)=>handleChange(e,"preparedFor")}   placeholder="Prepared For" />
                            </div>
                            
                        </div>
                        <div>
                            <label  style={{color:colors.light}}>Prepared By : </label>
                            <div className="pt-2">
                                <p style={{color:colors.light}} className={`${!isReview &&"no-print"}  `}>{currentPage.perparedBy}</p>
                                <input  className={`${isReview &&"no-print"} w-full `}  value={currentPage.perparedBy} onChange={(e)=>handleChange(e,"perparedBy")}  placeholder="Prepared By" />
                            </div>
                            
                        </div>
                    </div>
                    
                </div>
                
                </div>
                <div style={{background:colors.subMain}} className={` h-32`}>
                    
                </div>
        </div>
         <div className={`${isReview && "no-print"} flex  justify-center my-3 `}  >
                <button onClick={saveUpdates}> Save </button>
         </div>
    </div> );
})

export default Page_1;