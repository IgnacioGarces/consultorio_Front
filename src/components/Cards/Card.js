import './Card.css';
import { Fragment , useState } from 'react';


export default function Card({info,eliminarPaciente}) {
    const [editedInfo, setEditedInfo] = useState(info); // Estado para almacenar la información editada del paciente
    const [editForm, setEditForm] = useState(false); //Formulario de edicion

    const handleInputChange = (e) => {
        setEditedInfo({
          ...editedInfo,
          [e.target.name]: e.target.value
        });
      };

    const borrarPaciente = async (info) => {
        await fetch (`https://consultorio-api.onrender.com/eliminarPaciente/${info.dni}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(editedInfo) // Enviar la información editada del paciente
        })
        .then(response=> response.json())
        .then(() => {
              eliminarPaciente(info.dni); // Llamar a la función eliminarPaciente con el DNI del paciente eliminado
              setEditForm(false); // Ocultar el formulario de edición
              setEditedInfo(info); // Restablecer el estado editedInfo
          })
        .catch(err=> console.log('ERROR: ' + err))
                
    }

    const modificarPaciente= ()=>{
        setEditForm(true)
    }
    
    const guardarPaciente = async () => {
        
           await fetch(`https://consultorio-api.onrender.com/modificarPaciente/${info.dni}`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(editedInfo), // Enviar la información editada del paciente
            
        })
        .then(response=> console.log(response))
        .then(setEditForm(false))
        .catch(err=> console.log('ERROR: ' + err))
      
    };


    return (
        <Fragment>

            <div className="card m-2" >
            {info.imagen && (<img src={info.imagen} className="card-img-top" alt="foto de paciente" />)}
            <div className="card-body">
                <h4 className="card-title">{editedInfo.nombre} {editedInfo.apellido}</h4>
                
                <ul className="list-group list-group-flush my-2">
                    <li className='list-group-item bg-secondary'>Genero :<strong>{editedInfo.genero}</strong> </li>
                    <li className='list-group-item bg-secondary'>Edad :<strong>{editedInfo.edad}</strong> </li>
                    <li className='list-group-item bg-secondary'>DNI:<strong>{editedInfo.dni}</strong> </li>
                    <li className='list-group-item bg-secondary'>Celular:<strong>{editedInfo.cel}</strong> </li>
                </ul>

                {/* Formulario para editar la información */}
        {editForm?
          <form>
            <label>Nombre:</label>
            <input type="text" name="nombre" value={editedInfo.nombre} onChange={handleInputChange} />
            <label>Apellido:</label>
            <input type="text" name="apellido" value={editedInfo.apellido} onChange={handleInputChange} />
            <label>Género:</label>
            <input type="text" name="genero" value={editedInfo.genero} onChange={handleInputChange} />
            <label>Edad:</label>
            <input type="text" name="edad" value={editedInfo.edad} onChange={handleInputChange} />
            <label>DNI:</label>
            <input type="text" name="dni" value={editedInfo.dni} onChange={handleInputChange} />
            <label>Celular:</label>
            <input type="text" name="cel" value={editedInfo.cel} onChange={handleInputChange} />
            
            <input type="file" name="imagen" value={editedInfo.image} onChange={handleInputChange}/>
            <button type="submit" className="btn btn-success">Cargar</button>

            <button type="button" className="btn btn-warning" onClick={()=>{guardarPaciente()}}> Guardar Cambios </button>
          </form>
        :
        <button type="button" className="btn btn-warning m-2" onClick={()=>{modificarPaciente()}}> Editar Paciente </button>
    
        }
                <button type="button" className="btn btn-danger" onClick={()=>borrarPaciente(info)}> Eliminar Paciente </button>
            </div>
            </div>
        </Fragment>
    )
}