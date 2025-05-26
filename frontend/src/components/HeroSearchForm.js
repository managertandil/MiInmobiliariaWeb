// frontend/src/components/HeroSearchForm.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Componente Spinner simple (puedes moverlo a su propio archivo si lo usas en más lugares)
function Spinner({ size = 'h-4 w-4', color = 'border-gray-200' }) {
  return (
    <div 
      className={`animate-spin rounded-full ${size} border-2 border-solid ${color} border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]`} 
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Cargando...
      </span>
    </div>
  );
}


export default function HeroSearchForm() {
  const [operaciones, setOperaciones] = useState([]);
  const [tiposPropiedad, setTiposPropiedad] = useState([]);
  const [selectedOperacion, setSelectedOperacion] = useState('');
  const [selectedTipo, setSelectedTipo] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [loadingOperaciones, setLoadingOperaciones] = useState(true);
  const [loadingTipos, setLoadingTipos] = useState(true);
  const [errorOperaciones, setErrorOperaciones] = useState(null);
  const [errorTipos, setErrorTipos] = useState(null);
  const router = useRouter();
  const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';

  useEffect(() => {
    setLoadingOperaciones(true);
    setErrorOperaciones(null);
    fetch(`${strapiApiUrl}/operacions`) 
      .then(res => {
        if (!res.ok) { return res.text().then(text => { throw new Error(`Error HTTP ${res.status} (Operaciones): ${text}`); }); }
        return res.json();
      })
      .then(data => {
        if (data && data.data && Array.isArray(data.data)) { setOperaciones(data.data); } 
        else { console.error("Respuesta inesperada para operaciones:", data); setErrorOperaciones("Formato incorrecto."); setOperaciones([]); }
      })
      .catch(error => { console.error("Excepción fetching operaciones:", error); setErrorOperaciones(error.message); setOperaciones([]); })
      .finally(() => setLoadingOperaciones(false));

    setLoadingTipos(true);
    setErrorTipos(null);
    fetch(`${strapiApiUrl}/tipo-de-propiedads`) 
      .then(res => {
        if (!res.ok) { return res.text().then(text => { throw new Error(`Error HTTP ${res.status} (Tipos): ${text}`); }); }
        return res.json();
      })
      .then(data => {
        if (data && data.data && Array.isArray(data.data)) { setTiposPropiedad(data.data); } 
        else { console.error("Respuesta inesperada para tipos:", data); setErrorTipos("Formato incorrecto."); setTiposPropiedad([]); }
      })
      .catch(error => { console.error("Excepción fetching tipos:", error); setErrorTipos(error.message); setTiposPropiedad([]); })
      .finally(() => setLoadingTipos(false));
  }, [strapiApiUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (selectedOperacion) queryParams.append('operacion', selectedOperacion);
    if (selectedTipo) queryParams.append('tipo', selectedTipo);
    if (localidad.trim()) queryParams.append('localidad', localidad.trim());
    const queryString = queryParams.toString();
    router.push(`/propiedades${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-schonfeld-blue-dark p-6 md:p-8 rounded-lg shadow-xl max-w-3xl mx-auto 
                 mt-[-30px] sm:mt-[-40px] md:mt-[-50px] relative z-20"
    >
      {errorOperaciones && <p className="text-red-300 text-xs mb-2 col-span-full md:col-span-4 text-center">Error Operaciones: {errorOperaciones}</p>}
      {errorTipos && <p className="text-red-300 text-xs mb-2 col-span-full md:col-span-4 text-center">Error Tipos: {errorTipos}</p>}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          {/* Label con Spinner para Operación */}
          <label htmlFor="operacion" className="flex items-center text-sm font-medium text-gray-200 mb-1">
            Operación
            {loadingOperaciones && <Spinner size="h-3 w-3" color="border-gray-200" />} {/* Spinner más pequeño y color ajustado */}
          </label>
          <select
            id="operacion"
            name="operacion"
            value={selectedOperacion}
            onChange={(e) => setSelectedOperacion(e.target.value)}
            disabled={loadingOperaciones}
            className="w-full p-2.5 border border-schonfeld-blue-medium bg-white text-schonfeld-blue-dark rounded-md shadow-sm focus:ring-schonfeld-red focus:border-schonfeld-red cursor-pointer"
          >
            <option value="" className="text-gray-500">{loadingOperaciones ? "Cargando..." : "Todas"}</option>
            {Array.isArray(operaciones) && operaciones.map((op) => (
              op && typeof op.nombre === 'string' ? (
                <option key={op.id} value={op.nombre.toLowerCase().replace('quiero ', '')} className="text-schonfeld-blue-dark">
                  {op.nombre}
                </option>
              ) : null
            ))}
          </select>
        </div>

        <div>
          {/* Label con Spinner para Tipo de Propiedad */}
          <label htmlFor="tipo" className="flex items-center text-sm font-medium text-gray-200 mb-1">
            Tipo de Propiedad
            {loadingTipos && <Spinner size="h-3 w-3" color="border-gray-200" />}
          </label>
          <select
            id="tipo"
            name="tipo"
            value={selectedTipo}
            onChange={(e) => setSelectedTipo(e.target.value)}
            disabled={loadingTipos}
            className="w-full p-2.5 border border-schonfeld-blue-medium bg-white text-schonfeld-blue-dark rounded-md shadow-sm focus:ring-schonfeld-red focus:border-schonfeld-red cursor-pointer"
          >
            <option value="" className="text-gray-500">{loadingTipos ? "Cargando..." : "Todos"}</option>
            {Array.isArray(tiposPropiedad) && tiposPropiedad.map((tipo) => (
              tipo && typeof tipo.nombre === 'string' ? (
                <option key={tipo.id} value={tipo.nombre.toLowerCase()} className="text-schonfeld-blue-dark">
                  {tipo.nombre}
                </option>
              ) : null
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="localidad" className="block text-sm font-medium text-gray-200 mb-1">Localidad</label>
          <input
            type="text"
            id="localidad"
            name="localidad"
            value={localidad}
            onChange={(e) => setLocalidad(e.target.value)}
            placeholder="Ej: Tandil"
            className="w-full p-2.5 border border-schonfeld-blue-medium bg-white text-schonfeld-blue-dark rounded-md shadow-sm focus:ring-schonfeld-red focus:border-schonfeld-red placeholder-gray-400"
          />
        </div>

        <div>
          <label htmlFor="buscar-btn-hero" className="block text-sm font-medium text-transparent mb-1 select-none">.</label> 
          <button
            id="buscar-btn-hero"
            type="submit"
            className="w-full bg-schonfeld-red text-white font-semibold py-2.5 px-4 rounded-md hover:bg-red-700 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-schonfeld-blue-dark focus:ring-schonfeld-red cursor-pointer flex items-center justify-center"
          >
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}