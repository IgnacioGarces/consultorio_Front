import Card from '../Cards/Card'
import { useState,useEffect } from 'react'
import './Pacientes.css'

export default function Pacientes(){
    const [datos,setDatos] = useState([]);

    const eliminarPaciente = (dni) => {
        setDatos((prevDatos) => prevDatos.filter((paciente) => paciente.dni !== dni));
      };

    const traerInfo = async ()=>{
        let info = await fetch ('https://consultorio-api.onrender.com/infoCompletaPacientes')
                         .then(respuesta => respuesta.json())
                         .then(data => setDatos(data))
                         .catch(error=> console.log(`ERROR ${error}`))
        return info
    }

    useEffect(()=>{
        traerInfo()
    }, [])


    return(
        <div className='section-cards d-flex justify-content-center flex-wrap'>
           {Array.isArray(datos) && datos.map((dato) => (
      <Card key={dato.dni} info={dato} eliminarPaciente={eliminarPaciente} />
    ))}

        </div>
    )
}