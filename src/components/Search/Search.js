import Card from '../Cards/Card'
import { useState,useEffect } from 'react'
import './Search.css'

export default function Search(){
    const [datos,setDatos] = useState([]);
    const [nombreBuscado, setNombreBuscado] = useState('');

    const traerInfo = async () => {
        try {
          const url = `https://consultorio-api.onrender.com/infoPaciente/${encodeURIComponent(nombreBuscado)}`;
          const respuesta = await fetch(url);
          const data = await respuesta.json();
          setDatos(data);
        } catch (error) {
          console.log(`ERROR ${error}`);
        }
    };
    
    
    useEffect(() => {
        traerInfo();
         // eslint-disable-next-line react-hooks/exhaustive-deps    
    }, [nombreBuscado]);
    
        const eliminarPaciente = (dni) => {
            setDatos((prevDatos) => prevDatos.filter((paciente) => paciente.dni !== dni));
          };
    


    return(
        <nav class="search-form d-flex" role="search">
        <input className='search form-control me-2' type="search" value={nombreBuscado} onChange={(e) => setNombreBuscado(e.target.value)} placeholder="Search" aria-label="Search" />
        
            {Array.isArray(datos) && datos.length > 0 ? (
            datos.map((dato) => (
                <Card key={dato.dni} info={dato} eliminarPaciente={eliminarPaciente} />
            ))
            ) : (
                <p>No se encontraron resultados</p>
                 )}
    </nav>
    );
}