import '../styles/cuenta.css'
import { useState, useEffect } from 'react'
import bcrypt from "bcryptjs";
import Swal from 'sweetalert2'

export const Cuenta = ()=>{

//cambiar entre login y register==============

    const login = ()=>{
        const logeo = document.getElementById('inputsL')
        const regist = document.getElementById('inputsR')
        logeo.classList.toggle('inputsv', 'inputsnv')
        regist.classList.replace('inputsv', 'inputsnv')
    }
    const register = ()=>{
        const logeo = document.getElementById('inputsL')
        const regist = document.getElementById('inputsR')
        if(regist.className !== 'inputsnv inputsv'){
            regist.classList.toggle('inputsv')
            logeo.classList.toggle('inputsv')
        }
    }
    //cambiar entre login y register==============

    
    //PROCESO DE REGISTRO=======================================================
    const regex = [/^[a-zA-ZáéíóúÁÉÍÓÚ]+$/,/^[a-zA-ZáéíóúÁÉÍÓÚ]+$/, /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/,/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!#%*?&]|[^ ]){8,15}$/]
    const datosR = [document.getElementById('nombre'), document.getElementById('apellido'),document.getElementById('emailR'),document.getElementById('passwordR')]

    const comprobarData = ()=>{

        for (let i = 0; i < datosR.length; i++) {
            if(regex[i].test(datosR[i].value)){
                datosR[i].style.backgroundColor = 'green'
            }else{
                datosR[i].style.backgroundColor = 'red'
            }
    }
}

    const [nombre,setNombre] = useState('')
    const [apellido,setApellido] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const submit = (e)=>{
        e.preventDefault()

        if(localStorage.getItem('usuarios') == null){
            const passwordEncryptAdmin = bcrypt.hashSync('Jose1234$', 10)
            localStorage.setItem('usuarios',JSON.stringify([{nombre: 'Jose',apellido: 'Perdomo',email: 'jose@gmail.com',password: passwordEncryptAdmin, rol: 'admin'}]))
        }

        comprobarData()
        if(!regex[0].test(nombre) || !regex[1].test(apellido) || !regex[2].test(email) || !regex[3].test(password)){
            Swal.fire({
                title: "Ingresa los datos correctamente",
                text: "La contraseña debe tener minimo una mayuscula, una minuscula, numeros y simbolos especiales (8-15 caracteres)",
                icon: "error",
                background:'#393d42',
                color: "white"
              })
            return
        }

        const usuariosExistentes = JSON.parse(localStorage.getItem('usuarios'))
        let existencia = 0

        const existeUsuario = ()=>{
            for (let i = 0; i < usuariosExistentes.length; i++) {
                if(usuariosExistentes[i].email === email){
                    existencia = 1
                    return
                }else{
                    datosR[2].style.backgroundColor = 'green'
                    existencia = 0
                }
            }
        }

        existeUsuario()
        if (existencia === 1) {
            Swal.fire({
                title: "Este correo ya está registrado",
                text: "El correo que proporciono ya se encuentra en la base de datos",
                icon: "error",
                background:'#393d42',
                color: "white"
              })
            datosR[2].style.backgroundColor = 'red'
            return
        }
       
        const passwordEncrypt = bcrypt.hashSync(password, 10)

        const nuevoUsuario = {nombre: nombre,apellido: apellido,email: email,password: passwordEncrypt, rol: 'user'}
        usuariosExistentes.push(nuevoUsuario)
        localStorage.setItem('usuarios', JSON.stringify(usuariosExistentes))

        setNombre('')
        setApellido('')
        setEmail('')
        setPassword('')
        datosR[0].value = ''
        datosR[1].value = ''
        datosR[2].value = ''
        datosR[3].value = ''
        Swal.fire({
            title: "Registro exitoso!",
            text: "Ya puede iniciar sesión",
            icon: "success",
            background:'#393d42',
            color: "white"
          })
    }
    //PROCESO DE REGISTRO=======================================================  

    //PROCESO DE LOGIN==========================================================

    const [emailL,setEmailL] = useState('')
    const [passwordL,setPasswordL] = useState('')
    const [code,setCode] = useState(0)

    useEffect(()=>{
        setCode(Math.floor(Math.random()*10000))
    },[emailL,passwordL])

    const submitLogin = (e)=>{
        e.preventDefault()

        if(localStorage.getItem('usuarios') == null){
            const passwordEncryptAdmin = bcrypt.hashSync('Jose1234$', 10)
            localStorage.setItem('usuarios',JSON.stringify([{nombre: 'Jose',apellido: 'Perdomo',email: 'jose@gmail.com',password: passwordEncryptAdmin, rol: 'admin'}]))
        }

        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

        let validez = 0
        let valor = 0

        const existeCorreo = ()=>{
            for (let i = 0; i < usuarios.length; i++) {
                if(usuarios[i].email === emailL){
                    validez = 1
                    valor = i
                    return
                }else{
                    validez = 0
                }
            }
        }
        existeCorreo()

        if (localStorage.getItem('token') !== null){
            Swal.fire({
                title: "Ya hay una sesion iniciada",
                text: "Cierre la sesion actual para iniciar una nueva",
                icon: "warning",
                background:'#393d42',
                color: "white"
              })
            return
        }

        if (validez == 1) {
            bcrypt.compare(passwordL,usuarios[valor].password,(err,isMatch)=>{
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
                    Swal.fire({
                        title: "Inicio de sesion exitoso",
                        icon: "success",
                        background:'#393d42',
                        color: "white",
                        preConfirm: ()=>{
                            var nuevaData = usuarios.map((e)=>{
                                if(e.email === emailL){
                                e.token = code
                                return e
                            }
                            e.token = ''
                            return e
                            })
                            localStorage.setItem('usuarios',JSON.stringify(nuevaData))
                            localStorage.setItem('token',code)
                            return window.location.href = "/dashboard"
                        }
                      })
                }
                
        })
        }else{
            Swal.fire({
                title: "El correo no está en la base de datos",
                text: "Verifiquelo o regístrese",
                icon: "warning",
                background:'#393d42',
                color: "white"
              })
        }
    }

    //PROCESO DE LOGIN==========================================================

    return(
        <>
        <main>
            <div className="login">
                <div className='botonesLG'>
                    <button onClick={login}>Register</button>
                    <button onClick={register}>Login</button>
                </div>
                <form onSubmit={submit} id='inputsL' className='inputsv inputsnv'>
                    <input type="text" name="nombre" id="nombre" placeholder="Ingrese su nombre" onChange={(e)=>setNombre(e.target.value)}/>
                    <input type="text" name="apellido" id="apellido" placeholder="Ingrese su apellido" onChange={(e)=>setApellido(e.target.value)}/>
                    <input type="email" name="emailR" id="emailR" placeholder="ingrese su email" onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" name="passwordR" id="passwordR" placeholder="Ingrese su contraseña" onChange={(e)=>setPassword(e.target.value)}/>
                    <input type="submit" value="REGISTRAR"/>
                </form>
                <form onSubmit={submitLogin} id='inputsR' className='inputsnv'>
                    <input type="email" name="emailL" id="emailL" placeholder="ingrese su email" onChange={(e)=>setEmailL(e.target.value)}/>
                    <input type="password" name="passwordL" id="passwordL" placeholder="Ingrese su contraseña" onChange={(e)=>setPasswordL(e.target.value)}/>
                    <input type="submit" value="INICIAR SESION" />
                </form>
            </div>
        </main>
        </>
    )
}