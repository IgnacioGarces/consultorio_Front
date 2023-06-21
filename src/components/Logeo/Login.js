import {Fragment, useState} from 'react';
import './Login.css'

export default function Login() {
    const[mensajeOculto,setMensajeOculto]=useState(true);

    const registro=async (event)=>{
        event.preventDefault();
        const form=JSON.stringify({
            "user":event.target[0].value,
            "password":event.target[1].value,
        })
       
        const response= await fetch('https://consultorio-api.onrender.com/nuevoUsuario',{
            method:'POST',
            body:form,
            headers:{
                'Content-Type': 'application/json',
                
            }
        })// o hacemos esto .then().catch(err)
        if(response.ok){
            console.log(response)
          //  en la response voy a tener el token que lo voy a guardar  en una variable
            setMensajeOculto(false);
        }
    }
return(
    <Fragment> 
    { mensajeOculto === true? 
        <form className=" w-75 mb-5"  onSubmit={(event)=>{registro(event)}} method="POST">
            <div className="mb-3">
                <label htmlFor="user" className="form-label">Nombre Usuario</label>
                <input type="text" className="form-control"  aria-label="nombre de usuario" id="user" name="user" />
            </div>
           
            <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input type="password" className="form-control" id="password" name="password" />
            </div>

            <button type="submit" className="btn">Registrar</button>
        </form>
       :
       //mensaje de usuario registrado
       <div className="alert alert-dismissible alert-success mt-4">
            <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={()=> setMensajeOculto(true)}></button>
            <strong> Usuario registrado!</strong>
        </div> }
    </Fragment>
        
     
)
}