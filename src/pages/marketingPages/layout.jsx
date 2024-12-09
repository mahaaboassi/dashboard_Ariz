import { useEffect, useState ,useRef} from "react";

import { useNavigate, useParams } from "react-router-dom";
import { templates } from "../../data/templates";
import Page_1 from "./page_1";
import Page_2 from "./page_2";
import Page_3 from "./page_3";
import Page_4 from "./page_4";

function LayoutMarketing() {
    const { idPage } = useParams()
    const [ page, setPage ] = useState({})
    const navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem("user"))
            navigate("/")
        const data = templates[0].pages.find(ele => ele.id == idPage)
        setPage(data)
    },[idPage])

    return ( <div className="w-full">
        <h2 className="uppercase flex justify-center py-2">{page.title?page.title:""}</h2>
        {"id" in page && page.id == 1 && <Page_1 page={page} />}
        {"id" in page && page.id == 2 && <Page_2 page={page} />}
        {"id" in page && page.id == 3 && <Page_3 page={page} />}
        {"id" in page && page.id == 4 && <Page_4 page={page} />}
        
    </div> );
}

export default LayoutMarketing;