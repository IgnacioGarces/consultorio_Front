import { Fragment,useState } from "react"

export default function FormPacientes() {
    
    const [mensajeOculto,setMensajeOculto] = useState(true)
    
    const cargarPaciente = async (event) => {
        event.preventDefault();
    
        const formData = new FormData();
        formData.append("nombre", event.target[0].value);
        formData.append("apellido", event.target[1].value);
        formData.append("genero", event.target[2].value);
        formData.append("edad", event.target[3].value);
        formData.append("dni", event.target[4].value);
        formData.append("cel", event.target[5].value);
        formData.append("imagen", event.target[6].files[0]);
    
        const response = await fetch('https://consultorio-api.onrender.com/cargarPaciente', {
            method: 'POST',
            body: formData,
        });
    
        if (response.ok) {
            setMensajeOculto(false);
        }
    };
   

    return(
        <Fragment>
            {mensajeOculto === true?
            <form className="w-75 mb-5" onSubmit={(event)=>{cargarPaciente(event)}} method="POST">
                
                <div>
                    <label htmlFor="nombre" className="form-label">Nombre de Paciente</label>
                    <input id="nombre" type="text" className="form-control" aria-label="Nombre del o la Paciente" name="nombre" ></input>
                </div>

                <div>
                    <label htmlFor="apellido" className="form-label">Apellido de Paciente</label>
                    <input id="apellido" type="text" className="form-control" aria-label="Apellido de Paciente" name="apellido" ></input>
                </div>

                <div className="mb-3">
                    <label htmlFor="genero" className="form-label">Genero</label>
                    <select className="form-select" aria-label="genero de paciente" name="genero" id="genero">
                        <option defaultValue=''> Seleccione un Genero </option>
                        <option value='Mujer'>Mujer</option>
                        <option value='Hombre'>Hombre</option>
                        <option value='Hombre Transexual'>Hombre Transexual</option>
                        <option value='No Binario'>No Binario</option>
                        <option value='Sin género'>Sin género</option>
                        <option value='No estoy seguro'>No estoy seguro</option>
                        <option value='Prefiero no decir'>Prefiero no decir</option>
                        <option value='Otro'>Otro</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="edad" className="form-label">Edad</label>
                    <input type="number" className="form-control" id="edad" name="edad" />
                </div>

                <div className="mb-3">
                    <label htmlFor="dni" className="form-label">DNI</label>
                    <input type="number" className="form-control" id="dni" name="dni"  />
                </div>

                <div className="mb-3">
                    <label htmlFor="cel" className="form-label">Celular</label>
                    <input type="number" className="form-control" id="cel" name="cel" />
                </div>
            <input type="file" name="imagen" id="imagen" />
            <button type="submit" className="btn btn-success">Cargar</button>
            </form>
            :
            alert('Paciente Cargado!')
        }
        </Fragment>
    )
}