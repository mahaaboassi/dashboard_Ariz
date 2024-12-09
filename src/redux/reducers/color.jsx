
const initialValues = {
    dark : "#0b081d",
    main :  "#211d37",
    light : "#D3D9D4",
    subMain :"#a06f3a",
}

export const reducerColor = (state = initialValues , action)=>{
switch(action.type){
    case "CART-ITEMS-NUMBER":
        return{
            ...state,
            dark : action.dark,
            main : action.main,
            light : action.light,
            subMain : action.subMain
        }

    break;
    default :
        return { ...state }
        break;
}
}