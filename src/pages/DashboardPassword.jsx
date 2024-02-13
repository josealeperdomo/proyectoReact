import { useState } from 'react'
import bcrypt from "bcryptjs";
import Swal from 'sweetalert2'
import '../styles/dashboardPassword.css'

export const DashboardPassword = ()=>{

    const token = localStorage.getItem('token')
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    var usuario = usuario = usuarios.find((e)=> e.token == token)

    const [passwordV,setPasswordV] = useState("")
    const [passwordN,setPasswordN] = useState('')

    const cambiarPassword = (e)=>{
        e.preventDefault()

        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!#%*?&]|[^ ]){8,15}$/
        const nuevaPassword = passwordN


        if(regex.test(nuevaPassword) && nuevaPassword !== passwordV){
        bcrypt.compare(passwordV,usuario.password,(err,isMatch)=>{
            if(err){
                Swal.fire({
                    title: "Contraseña incorrecta",
                    text: "Verifique las minusculas y mayúsculas",
                    icon: "error",
                    background:'#393d42',
                    color: "white"
                  })
            }else if(!isMatch){
                Swal.fire({
                    title: "Contraseña incorrecta",
                    text: "Verifique las minusculas y mayúsculas",
                    icon: "error",
                    background:'#393d42',
                    color: "white"
                  })
            }else{
                const passwordEncrypt = bcrypt.hashSync(nuevaPassword, 10)
                usuario.password = passwordEncrypt
                const index = usuarios.findIndex(e=>e.email === usuario.email)
                usuarios[index].password = passwordEncrypt
                localStorage.setItem('usuarios',JSON.stringify(usuarios))
                Swal.fire({
                    title: "Cambio de contraseña exitoso",
                    text: "Vuelva a iniciar sesion",
                    icon: "success",
                    background:'#393d42',
                    color: "white",
                    preConfirm: ()=>{
                        usuario.token = ''
                        localStorage.removeItem('token')
                        return window.location.href = '/cuenta'
                    }
                  })
            }
            })
        }else if(nuevaPassword == passwordV){
            Swal.fire({
                title: "Contraseña no válida",
                text: "La contraseña debe ser diferente a la anterior",
                icon: "error",
                background:'#393d42',
                color: "white"
              })
        }else{
            Swal.fire({
                title: "Ingresa una nueva clave valida",
                text: "La contraseña debe tener minimo una mayuscula, una minuscula, numeros y simbolos especiales (8-15 caracteres)",
                icon: "error",
                background:'#393d42',
                color: "white"
              })
        }
    }

    return(
        <>
        <main>
            <section>
                <h1>Cambia tu contraseña</h1>
                <form  onSubmit={cambiarPassword} action="">
                    <input type="password" name="viejaClave" id="viejaClave" placeholder="ingrese su contraseña anterior" onChange={(e)=>setPasswordV(e.target.value)} />
                    <input type="password" name="nuevaClave" id="nuevaClave" placeholder="ingrese la nueva contraseña" onChange={(e)=>setPasswordN(e.target.value)}/>
                    <input className='inputSubmit' type="submit" value="Cambiar contraseña" />
                </form>
            </section>
        </main>
        </>
    )
}