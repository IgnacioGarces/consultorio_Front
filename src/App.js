
import './App.css';
import Pacientes from './components/Pacientes/Pacientes'
import FormPacientes from './components/Forms/FormPacientes';
import Login from './components/Logeo/Login'
import { Fragment, useState } from 'react';
import Search from './components/Search/Search';

function App() {
  const [ocultarPacientes,setOcultarPacientes] = useState(true);
  const [ocultarForm, setOcultarForm] = useState(true);
  const[ocultarLogin,setOcultarLogin]=useState(true);

  return (
  <Fragment>
    <Search/>
    <main className="mt-5 d-flex flex-column align-items-center">
      <h1>Medical Spa App</h1>
      <div className="d-grid gap-2 col-6 mx-auto">
        {/* <button className="btn btn-info" type="button" onClick={()=>{setOcultarForm(true);setOcultarPacientes(true);setOcultarLogin(false)}}>Logeo</button> */}
        <button className="btn-mostrar btn btn-warning" type='button' onClick={()=>{setOcultarPacientes(false);setOcultarForm(true);setOcultarLogin(true)}}>Mostrar Pacientes</button>
        <button className="btn btn-success" type='button' onClick={()=>{setOcultarForm(false);setOcultarPacientes(true);setOcultarLogin(true)}}>Cargar Pacientes</button>
      </div>

      {ocultarLogin === false? <Login/>:''}

      {ocultarPacientes === false?
        <section className='w-100 d-flex flex-column align-items-center'>
          <button type="button" className="btn btn-danger align-self-end me-5" onClick={()=>setOcultarPacientes(true)}>X</button>
          <Pacientes/>
        </section>:''}

      {ocultarForm === false? 
        <section className='w-100 d-flex flex-column align-items-center'>
          <button type="button" className="btn btn-info align-self-end me-5" onClick={()=>setOcultarForm(true)}>X</button>
          <FormPacientes  />
        </section>:''}
    </main>
  </Fragment>
  );
}

export default App;
