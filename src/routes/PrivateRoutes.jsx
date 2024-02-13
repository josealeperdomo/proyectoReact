import { Navigate, Outlet } from "react-router-dom"

export const PrivateRoutes = ()=>{

    const token = localStorage.getItem('token')
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    var usuario = usuario = usuarios.find((e)=> e.token == token)

    return(
        usuario !== undefined ? <Outlet/> : <Navigate to={'/cuenta'}/>
    )
}