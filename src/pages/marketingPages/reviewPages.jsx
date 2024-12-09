import { useEffect, useState ,useRef} from "react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate, useParams } from "react-router-dom";
import Page_1 from "./page_1";
import Page_2 from "./page_2";
import Page_3 from "./page_3";
import { object } from "yup";
import { templates } from "../../data/templates";
import { SendEmail } from "../../functionality/functions";


function ReviewPages() {
    const pageRefs = [useRef(), useRef(), useRef()]; // Array of refs for multiple pages
    const [ info_1 , setInfo_1 ] = useState({})
    const [ info_2 , setInfo_2 ] = useState({})
    const [ info_3 , setInfo_3 ] = useState({})
    const [loading, setLoading ] = useState(false)
    useEffect(()=>{
        if(localStorage.hasOwnProperty("page_1") ){
            setInfo_1(JSON.parse(localStorage.getItem("page_1"))) 
        }else{
            setInfo_1(templates[0].pages[0])
        }
        if(localStorage.hasOwnProperty("page_2")){
            setInfo_2(JSON.parse(localStorage.getItem("page_2")))
        }else{
            setInfo_2(templates[0].pages[1])
        }
        if(localStorage.hasOwnProperty("page_3")){
            setInfo_3(JSON.parse(localStorage.getItem("page_3")))
        }else{
            setInfo_3(templates[0].pages[2])
        }
    },[])
    const downloadPDF = async () => {
        setLoading(true)
        
  
        const pdf = new jsPDF('l',  'mm','a4',true);
    
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
    
        for (let i = 0; i < pageRefs.length; i++) {
            const element = pageRefs[i].current;
    
            // Add PDF-specific styles
            element.classList.remove('review');
            element.classList.add('change-number');
            // Render to canvas
            const canvas = await html2canvas(element, {
                scale: 3, // High resolution
                useCORS: true, // Ensures external assets are rendered
                windowWidth: 1280,
            });
    
            // Convert canvas to image
            const imgData = canvas.toDataURL('image/png', 1.0);
    
            // Add image to the PDF
            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight, '', 'FAST');
    
            // Remove PDF-specific styles
            element.classList.add('review');
            element.classList.remove('change-number');
    
        }
        sendEmailFun("Markerting",pdf)
        
    };
    const sendEmailFun = async(namePdf,pdf)=>{
        const data = JSON.parse(localStorage.getItem("user"))
        const {result} = await SendEmail(data.name , data.email,namePdf)
        if(result){
            setLoading(false)
            alert("Saved Successfully")
            pdf.save('Markerting');
        }else{
            setLoading(false)
            alert(result.message)
        }  
    }
    return ( <div>
        <h1 className = "flex justify-center text-center">Review Pages To Download It</h1>
        { Object.keys(info_1).length > 0  && <Page_1 isReview={true} ref={pageRefs[0]}  page={info_1} /> }
        { Object.keys(info_2).length >0 && <Page_2 isReview={true} ref={pageRefs[1]}  page={info_2} />}
        { Object.keys(info_3).length>0 && <Page_3 isReview={true} ref={pageRefs[2]}   page={info_3} />}
        <div className="flex justify-center">
            <div className="flex gap-2">
                <button disabled={loading} onClick={downloadPDF}>
                    {loading ? "Loading" : "Download"}
                </button>
            </div>
        </div>



    </div> );
}

export default ReviewPages;