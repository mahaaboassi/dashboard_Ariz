import { useNavigate } from "react-router-dom";
import { templates } from "../../data/templates";

function Store() {
    const navigate = useNavigate()
    return ( <div className="flex flex-col gap-10 ">
        <div className="flex flex-col gap-2 ">
        <h1 className="flex justify-center ">PROPOSALS</h1>
        <p className="text-gray-600 text-lg flex justify-center px-3 text-center">
                Choose the proposal that suits your needs and take the first step towards achieving your goals.
        </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 ">
            {templates.map((ele, index)=>(<div onClick={()=>navigate(`/dashboard/proposal/${ele.id}`)}  className="flex justify-center items-center" key={`Store_Template_${ele.title}_${index}`}>
                    <div className="proposal min-h-52 flex justify-center items-center cursor-pointer ">
                        <p className="font-bold">{ele.title}</p>
                    </div>
            </div>))}

        </div>
    </div> );
}

export default Store;