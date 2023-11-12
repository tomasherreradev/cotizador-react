import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Button from './components/Button';
import { formatearDinero, calcularTotalPagar } from './helpers';


function App() {
  
  const storedCantidad = localStorage.getItem('cantidad') || 10000;
  const storedMeses = localStorage.getItem('meses') || 6;

  
  const [cantidad, setCantidad] = useState(Number(storedCantidad));
  const [meses, setMeses] = useState(Number(storedMeses));
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0);

  useEffect(()=> {
    const resultadoTotalPagar = calcularTotalPagar(cantidad, meses);
    setTotal(resultadoTotalPagar); //cuando algun cambio ocurra, se hace esto <-

  }, [cantidad, meses, total]); //dependencias escuchando cambios


  useEffect(()=> {
    //calcular el pago mensual
    setPago(total / meses);

  }, [total])

  const min= 0;
  const max= 20000;
  const step= 100;


  function handleChange(e) {
      setCantidad(Number(e.target.value));
      localStorage.setItem('cantidad', e.target.value);
  }


  function handleClickDecremento() {
      const valor = cantidad - step;
      if(valor<min) {
        alert('Cantidad no válida');
        return;
      }
      setCantidad(valor);
      localStorage.setItem('cantidad', valor); //valor es la cantidad disminuida
  }

  function handleClickIncremento() {
    const valor = cantidad + step;
    if(valor>max) {
      alert('Cantidad no válida');
      return;
    }
    setCantidad(valor);
    localStorage.setItem('cantidad', valor);
}


function handleSelectChange(e) {
    setMeses(e.target.value);
    localStorage.setItem('meses', e.target.value);
}


  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header></Header>

      <div className='flex justify-between my-14'>
        <Button
          tipo="-"
          fn={handleClickDecremento} 
        ></Button>

        <Button
          tipo="+"
          fn={handleClickIncremento} 
        ></Button>
      </div>

      <input 
        type="range"
        className='w-full h-6 bg-gray-200 accent-lime-600 hover:accent-lime-500'
        onChange={handleChange}
        min={min}
        step={step}
        max={max}
        value={cantidad}
      />

      <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>
        {formatearDinero(cantidad)}
      </p>


      <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
        Elige un <span className='text-indigo-600'>Plazo</span> a pagar
      </h2>

      <select 
        className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500' 
        value={meses} 
        onChange={handleSelectChange}
        name="" 
        id="" >
          <option value="6">6 Meses</option>
          <option value="12">12 Meses</option>
          <option value="24">24 Meses</option>
      </select>


      <div className='my-5 space-y-3 bg-gray-50 p-5'>
        <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
          Resumen <span className='text-indigo-600'>de pagos</span>
        </h2>

        <p className='text-xl text-gray-500 text-center font-bold'>{meses} Meses</p>
        <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(total)} Total a pagar</p>
        <p className='text-xl text-gray-500 text-center font-bold'>{formatearDinero(pago)} Pagos mensuales</p>
      </div>

    </div>  
  )
}

export default App
