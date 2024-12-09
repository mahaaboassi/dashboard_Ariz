export const color = ({dark,main,light,subMain}) => {

    return{
        type: "CHANGE-COLOR",
        dark : dark,
        main : main,
        light :light,
        subMain :subMain
    }
}