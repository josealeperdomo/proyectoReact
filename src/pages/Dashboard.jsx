import { useState } from 'react'
import '../styles/dashboars.css'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'

export const Dashboard = ()=>{

    const token = localStorage.getItem('token')
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    var usuario = usuario = usuarios.find((e)=> e.token == token)

    const regex = [/^[a-zA-ZáéíóúÁÉÍÓÚ]+$/,/^[a-zA-ZáéíóúÁÉÍÓÚ]+$/]

    const [nombre2,setNombre2] = useState(usuario.nombre)
    const [apellido2,setApellido2] = useState(usuario.apellido)
    const [email2,setEmail2] = useState(usuario.email)

    const cambiarDatos = (e)=>{
        e.preventDefault()
        if(!regex[0].test(nombre2) || !regex[1].test(apellido2)){
            Swal.fire({
                title: "Rellene los campos correctamente",
                text: "Debe llenar el nombre y el apellido. Evite los espacios",
                icon: "error",
                background:'#393d42',
                color: "white"
              })
            return
        }

        const index = usuarios.findIndex(e=>e.email === usuario.email)
        usuarios[index].nombre = nombre2
        usuarios[index].apellido = apellido2
        localStorage.setItem('usuarios',JSON.stringify(usuarios))
        Swal.fire({
                title: "Cambio exitoso",
                text: "Sus datos han sido cambiados",
                icon: "success",
                background:'#393d42',
                color: "white"
              })
    }

    const cerrarSesion = ()=>{
        usuario.token = ''
        localStorage.removeItem('token')
        window.location.href = '/cuenta'
    }
        

    return(
        <>
        <main id='main'>
            <div className="identidad">
                <div className="imagen">
                    <img src="https://cdn-icons-png.flaticon.com/256/848/848006.png" alt="perfil" />
                </div>
                <form onSubmit={cambiarDatos} className="datos">
                    <input type="text" name="nombre2" id="nombre2" placeholder={usuario.nombre} onChange={(e)=>setNombre2(e.target.value)}/>
                    <input type="text" name="apellido2" id="apellido2" placeholder={usuario.apellido} onChange={(e)=>setApellido2(e.target.value)}/>
                    <input type="text" name="email2" id="email2" value={usuario.email} onChange={(e)=>setEmail2(e.target.value)}/>
                    <input type="submit" value="CAMBIAR NOMBRE Y/O APELLIDO" />
                </form>
                <div className='botones'>
                    <NavLink to={'/dashboardPassword'}>
                    <button>CAMBIAR CONTRASEÑA</button>
                    </NavLink>
                    <button onClick={cerrarSesion}>CERRAR SESION</button>
                </div>
            </div>
        </main>
        </>
    )
}