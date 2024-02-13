import Swal from 'sweetalert2'
import '../styles/admin.css'

export const Admin = ()=>{

    const token = localStorage.getItem('token')
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    var usuario = usuario = usuarios.find((e)=> e.token == token)
    
    const UserList = ({ users }) => {
        return (
          <div className="usuarios">
            {users.map((user, index) => (
              <div key={index} className={index}>
                <h3>Nombre: {user.nombre}</h3>
                <h3>Apellido: {user.apellido}</h3>
                <h3>Email: {user.email}</h3>
                <button onClick={()=>{
                    if (usuarios[index].rol !== 'admin') {
                        usuarios.splice(index,1)
                        localStorage.setItem('usuarios',JSON.stringify(usuarios))
                        Swal.fire({
                          title: "Usuario eliminado",
                          icon: "success",
                          background:'#393d42',
                          color: "white",
                          preConfirm: ()=>{
                            window.location.reload()
                          }
                        })
                    }else{
                      Swal.fire({
                        title: "No se pudo realizar la acción",
                        text: "No puedes eliminar a un admin",
                        icon: "error",
                        background:'#393d42',
                        color: "white"
                      })
                    }          
                    }}>Borrar usuario</button>
              </div>
            ))}
          </div>
        );
      };

    return(
        <>
        <main>
            <h1>Bienvenido {usuario.nombre}</h1>
            <UserList users={usuarios}/>
        </main>
        </>
    )
}