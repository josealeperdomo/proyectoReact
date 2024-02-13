import '../styles/navbar.css'
import { NavLink } from "react-router-dom"

export const Navbar = ()=>{

    if(localStorage.getItem('token') > 0){
        const token = localStorage.getItem('token')
        const usuarios = JSON.parse(localStorage.getItem('usuarios'))
        var usuario = usuario = usuarios.find((e)=> e.token == token)
    }

    const hamburguesa = ()=>{
        const menu = document.getElementById('menu')
        menu.classList.toggle('ulNV')
    }

    return(
        <>
        
            <nav>
                <section>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png' alt="" width='75px'/>
                </section>
                <section>
                <ul id='menu' className='ulNV'>
                    <NavLink to={'/'}><li>Inicio</li></NavLink>
                    
                    <NavLink to={'/cuenta'}><li>Login/Register</li></NavLink>
                    
                    <NavLink to={localStorage.getItem('token') > 0 ? '/dashboard' : '/cuenta'}><li>Perfil</li></NavLink>

                    <NavLink to={localStorage.getItem('token') > 0 ? '/admin' : '/cuenta'}><li className={localStorage.getItem('token') > 0 ?usuario.rol == 'admin' ? 'flex' : 'hidden' : 'hidden'}>Admin</li></NavLink>
                    
                </ul>
                <button onClick={hamburguesa} id='hamburguesa'><img src="https://cdn0.iconfinder.com/data/icons/basic-ui-pack-filled-outline-s94/64/Basic_UI_Icon_Pack_-_Filled_Outline_menu-512.png" alt="" /></button>
                </section>
            </nav>
       
        </>
    )
}