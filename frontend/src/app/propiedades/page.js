// frontend/src/app/propiedades/page.js
'use client';

import { useState, useEffect } from 'react'; // useCallback no se usa aquí, se puede quitar si no lo añades luego
import { useRouter, useSearchParams } from 'next/navigation';
import PropertyCard from '@/components/PropertyCard';
import PaginationControls from '@/components/PaginationControls';
import { ChevronDownIcon, ChevronUpIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'; // Iconos

// Componente Spinner
function Spinner({ size = 'h-5 w-5', color = 'border-schonfeld-blue-dark' }) {
  return ( <div className={`animate-spin rounded-full ${size} border-2 border-solid ${color} border-r-transparent`} role="status"> <span className="sr-only">Cargando...</span> </div> );
}

// --- fetchFilteredProperties (se mantiene igual que tu última versión) ---
async function fetchFilteredProperties(searchParamsObject) {
  const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
  const apiIdPlural = 'propiedads';
  const fotosField = 'fotos'; 
  const operacionRelField = 'operacion'; 
  const operacionNameField = 'nombre'; 
  const tipoPropRelField = 'tipo_de_propiedad'; 
  const tipoPropNameField = 'nombre'; 
  const localidadSimpleField = 'localidad_simple'; 
  const ambientesField = 'ambientes';
  const precioField = 'precio'; 
  const cocheraField = 'cochera'; 
  const ascensorField = 'ascensor';

  let queryStringParts = [];
  if (searchParamsObject.operacion) { const val = `Quiero ${searchParamsObject.operacion.charAt(0).toUpperCase() + searchParamsObject.operacion.slice(1)}`; queryStringParts.push(`filters[${operacionRelField}][${operacionNameField}][$eqi]=${encodeURIComponent(val)}`); }
  if (searchParamsObject.tipo) { const val = searchParamsObject.tipo.charAt(0).toUpperCase() + searchParamsObject.tipo.slice(1); queryStringParts.push(`filters[${tipoPropRelField}][${tipoPropNameField}][$eqi]=${encodeURIComponent(val)}`);  }
  if (searchParamsObject.localidad) { queryStringParts.push(`filters[${localidadSimpleField}][$containsi]=${encodeURIComponent(searchParamsObject.localidad)}`); }
  if (searchParamsObject.ambientes && parseInt(searchParamsObject.ambientes) > 0) { queryStringParts.push(`filters[${ambientesField}][$eq]=${searchParamsObject.ambientes}`); }
  if (searchParamsObject.precioMin && parseFloat(searchParamsObject.precioMin) >= 0) { queryStringParts.push(`filters[${precioField}][$gte]=${searchParamsObject.precioMin}`); }
  if (searchParamsObject.precioMax && parseFloat(searchParamsObject.precioMax) > 0) { queryStringParts.push(`filters[${precioField}][$lte]=${searchParamsObject.precioMax}`); }
  if (searchParamsObject.cochera === 'true') { queryStringParts.push(`filters[${cocheraField}][$eq]=true`); }
  if (searchParamsObject.ascensor === 'true') { queryStringParts.push(`filters[${ascensorField}][$eq]=true`); }
  const filterQuery = queryStringParts.join('&');

  const populateFieldsArray = [fotosField, operacionRelField, tipoPropRelField];
  const populateQuery = populateFieldsArray.map((field) => `populate[]=${field}`).join('&');

  const fieldsForCard = ['titulo', 'precio', 'localidad_simple', 'slug', 'id', 'moneda']; 
  const fieldsQuery = fieldsForCard.map(f => `fields[]=${f}`).join('&');
  
  const currentPage = parseInt(searchParamsObject?.page) || 1;
  const pageSize = 9; 
  const paginationQuery = `pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`;
  
  const queryParts = [filterQuery, populateQuery, fieldsQuery, paginationQuery].filter(Boolean);
  const fullQuery = queryParts.join('&');

  const fetchUrl = `${strapiApiUrl}/${apiIdPlural}?${fullQuery}`;

  try {
    const res = await fetch(fetchUrl, { cache: 'no-store' });
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Error al obtener propiedades filtradas:", res.status, errorText, "URL:", fetchUrl);
      let errorMessage = `Error ${res.status}`;
      try { const errorJson = JSON.parse(errorText); errorMessage = errorJson.error?.message || errorMessage; } catch (e) { /* no es json */ }
      throw new Error(errorMessage);
    }
    const responseJson = await res.json();
    const propertiesToReturn = responseJson.data?.map(prop => prop) || [];
    return { properties: propertiesToReturn, pagination: responseJson.meta?.pagination || null, error: null };
  } catch (error) {
    console.error("Excepción al obtener propiedades filtradas:", error.message);
    return { properties: [], pagination: null, error: error.message };
  }
}

// fetchTiposDePropiedad (se mantiene igual)
async function fetchTiposDePropiedad() {
  const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
  const endpoint = 'tipo-de-propiedads'; 
  try {
    const res = await fetch(`${strapiApiUrl}/${endpoint}?fields[0]=nombre&sort=nombre:asc`, { cache: 'force-cache' });
    if (!res.ok) { const errorText = await res.text(); console.error(`[DEBUG] Error al obtener tipos de propiedad: ${res.status}`, errorText); return []; }
    const responseData = await res.json();
    let itemsArray = [];
    if (responseData && Array.isArray(responseData.data)) { itemsArray = responseData.data;
    } else if (Array.isArray(responseData)) { itemsArray = responseData;
    } else { console.error("[DEBUG] La respuesta de Strapi para tipos no tiene la estructura esperada:", responseData); return []; }
    const mappedOptions = itemsArray.map((item) => {
        if (!item || typeof item.nombre === 'undefined' || typeof item.id === 'undefined') { return null; }
        return { id: item.id, nombre: String(item.nombre).trim() };
      }).filter(option => option !== null); 
    return mappedOptions;
  } catch (error) { console.error("[DEBUG] Excepción atrapada en fetchTiposDePropiedad:", error); return []; }
}


export default function PropiedadesPage() {
  const router = useRouter();
  const searchParamsHook = useSearchParams(); 
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para los filtros avanzados (los que ya tenías)
  const [tiposPropiedadOptions, setTiposPropiedadOptions] = useState([]);
  const [selectedTipo, setSelectedTipo] = useState(searchParamsHook.get('tipo')?.toLowerCase() || '');
  const [ambientes, setAmbientes] = useState(searchParamsHook.get('ambientes') || '');
  const [precioMin, setPrecioMin] = useState(searchParamsHook.get('precioMin') || '');
  const [precioMax, setPrecioMax] = useState(searchParamsHook.get('precioMax') || '');
  const [conCochera, setConCochera] = useState(searchParamsHook.get('cochera') === 'true');
  const [conAscensor, setConAscensor] = useState(searchParamsHook.get('ascensor') === 'true');

  // --- NUEVO ESTADO para controlar la visibilidad de los filtros en móvil ---
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Función para alternar la visibilidad de los filtros en móvil
  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };
  // --- FIN NUEVOS ESTADOS Y FUNCIÓN ---


  useEffect(() => { fetchTiposDePropiedad().then(options => { setTiposPropiedadOptions(options); }); }, []); 

  useEffect(() => {
    const paramsObj = {};
    for (const [key, value] of searchParamsHook.entries()) { paramsObj[key] = value; }
    // Sincronizar estado de filtros con URL
    setSelectedTipo(searchParamsHook.get('tipo')?.toLowerCase() || '');
    setAmbientes(searchParamsHook.get('ambientes') || '');
    setPrecioMin(searchParamsHook.get('precioMin') || '');
    setPrecioMax(searchParamsHook.get('precioMax') || '');
    setConCochera(searchParamsHook.get('cochera') === 'true');
    setConAscensor(searchParamsHook.get('ascensor') === 'true');
    
    setLoading(true); setError(null);
    fetchFilteredProperties(paramsObj)
      .then(data => {
        setProperties(data.properties); setPagination(data.pagination);
        if(data.error) setError(data.error);
      })
      .catch(err => { setError(err.message); setProperties([]); setPagination(null); })
      .finally(() => setLoading(false));
  }, [searchParamsHook]); 

  const handleAdvancedFilterSubmit = () => {
    const currentParams = new URLSearchParams(searchParamsHook.toString());
    if (selectedTipo) currentParams.set('tipo', selectedTipo.toLowerCase()); else currentParams.delete('tipo');
    if (ambientes) currentParams.set('ambientes', ambientes); else currentParams.delete('ambientes');
    if (precioMin) currentParams.set('precioMin', precioMin); else currentParams.delete('precioMin');
    if (precioMax) currentParams.set('precioMax', precioMax); else currentParams.delete('precioMax');
    if (conCochera) currentParams.set('cochera', 'true'); else currentParams.delete('cochera');
    if (conAscensor) currentParams.set('ascensor', 'true'); else currentParams.delete('ascensor');
    currentParams.delete('page'); 
    const newQueryString = currentParams.toString();
    router.push(`/propiedades${newQueryString ? `?${newQueryString}` : ''}`);
    
    // Opcional: cerrar el menú de filtros en móvil después de aplicar
    if (isMobileFiltersOpen) {
        setIsMobileFiltersOpen(false);
    }
  };

  let initialFilterSummary = "Mostrando propiedades.";
  const initialOperacion = searchParamsHook.get('operacion');
  const initialTipoURL = searchParamsHook.get('tipo'); 
  const initialLocalidad = searchParamsHook.get('localidad');
  const activeInitialFilters = [];
  if(initialOperacion) activeInitialFilters.push(`Operación: "${initialOperacion}"`);
  if(initialTipoURL) activeInitialFilters.push(`Tipo: "${initialTipoURL}"`); 
  if(initialLocalidad) activeInitialFilters.push(`Localidad: "${initialLocalidad}"`);
  if(activeInitialFilters.length > 0) initialFilterSummary = `Resultados iniciales para: ${activeInitialFilters.join('; ')}`;
  
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* --- BOTÓN PARA MOSTRAR/OCULTAR FILTROS EN MÓVIL --- */}
      <div className="md:hidden mb-6 text-center"> {/* Solo visible en pantallas < md */}
        <button
          onClick={toggleMobileFilters}
          className="w-full flex items-center justify-center bg-schonfeld-blue-dark text-white py-2.5 px-4 rounded-md hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-schonfeld-blue-light"
          aria-expanded={isMobileFiltersOpen}
          aria-controls="advanced-filters-panel"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
          {isMobileFiltersOpen ? 'Ocultar Filtros' : 'Mostrar Filtros Avanzados'}
          {isMobileFiltersOpen ? <ChevronUpIcon className="h-5 w-5 ml-2"/> : <ChevronDownIcon className="h-5 w-5 ml-2"/>}
        </button>
      </div>
      {/* --- FIN BOTÓN --- */}

      <div className="md:flex md:gap-8">
        {/* --- PANEL DE FILTROS AVANZADOS --- */}
        <aside 
          id="advanced-filters-panel"
          className={`
            md:w-1/4 lg:w-1/5 md:mb-0 
            ${isMobileFiltersOpen ? 'block mb-8' : 'hidden'} {/* Se muestra/oculta en móvil y añade margen si está abierto */}
            md:block  {/* Siempre visible en pantallas md y mayores */}
          `}
        >
          <div className="p-4 bg-white rounded-lg shadow-lg md:sticky md:top-24"> {/* md:shadow-lg para que el sticky tenga sombra solo en escritorio */}
            <h3 className="text-lg font-semibold text-schonfeld-blue-dark mb-4">Filtros Avanzados</h3>
            <div className="space-y-4">
              <div> <label htmlFor="adv_tipo_propiedad" className="block text-sm font-medium text-gray-700">Tipo de Propiedad</label> <select id="adv_tipo_propiedad" value={selectedTipo} onChange={(e) => setSelectedTipo(e.target.value)} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-schonfeld-blue-dark focus:border-schonfeld-blue-dark" disabled={tiposPropiedadOptions.length === 0} > <option value="">Cualquiera</option> {tiposPropiedadOptions.map(tipo => ( <option key={tipo.id} value={tipo.nombre.toLowerCase()}>{tipo.nombre}</option> ))} </select> </div>
              <div> <label htmlFor="adv_ambientes" className="block text-sm font-medium text-gray-700">Ambientes</label> <select id="adv_ambientes" value={ambientes} onChange={(e) => setAmbientes(e.target.value)} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-schonfeld-blue-dark focus:border-schonfeld-blue-dark"> <option value="">Cualquiera</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5+</option> </select> </div>
              <div> <label htmlFor="adv_precioMin" className="block text-sm font-medium text-gray-700">Precio Mín. (USD)</label> <input type="number" id="adv_precioMin" value={precioMin} onChange={(e) => setPrecioMin(e.target.value)} placeholder="Ej: 50000" className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-schonfeld-blue-dark focus:border-schonfeld-blue-dark"/> </div>
              <div> <label htmlFor="adv_precioMax" className="block text-sm font-medium text-gray-700">Precio Máx. (USD)</label> <input type="number" id="adv_precioMax" value={precioMax} onChange={(e) => setPrecioMax(e.target.value)} placeholder="Ej: 200000" className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm focus:ring-schonfeld-blue-dark focus:border-schonfeld-blue-dark"/> </div>
              <div className="flex items-center"><input id="adv_cochera" type="checkbox" checked={conCochera} onChange={(e) => setConCochera(e.target.checked)} className="h-4 w-4 text-schonfeld-red border-gray-300 rounded focus:ring-schonfeld-red"/><label htmlFor="adv_cochera" className="ml-2 block text-sm text-gray-900">Con Cochera</label></div>
              <div className="flex items-center"><input id="adv_ascensor" type="checkbox" checked={conAscensor} onChange={(e) => setConAscensor(e.target.checked)} className="h-4 w-4 text-schonfeld-red border-gray-300 rounded focus:ring-schonfeld-red"/><label htmlFor="adv_ascensor" className="ml-2 block text-sm text-gray-900">Con Ascensor</label></div>
              <button onClick={handleAdvancedFilterSubmit} className="w-full bg-schonfeld-red text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors mt-4 focus:outline-none focus:ring-2 focus:ring-schonfeld-red-dark">Aplicar Filtros</button>
            </div>
          </div>
        </aside>
        {/* --- FIN PANEL DE FILTROS --- */}

        <main className="w-full md:w-3/4 lg:w-4/5"> {/* Ajustado para que ocupe todo el ancho si los filtros están ocultos en móvil */}
          <h1 className="text-3xl font-bold text-schonfeld-blue-dark mb-1">Propiedades Encontradas</h1>
          <p className="text-schonfeld-gray mb-6 text-sm">{initialFilterSummary}</p>
          {error && ( <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert"> <strong className="font-bold">¡Error al cargar datos!</strong> <span className="block sm:inline"> {error}</span> <p className="text-xs mt-1">Por favor, revisa la consola del servidor para más detalles técnicos o intenta de nuevo.</p> </div> )}
          {loading && ( <div className="flex justify-center items-center py-10"> <Spinner /> <p className="ml-3 text-schonfeld-gray">Cargando resultados...</p> </div> )}
          {!loading && !error && Array.isArray(properties) && properties.length > 0 ? (
            <> <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"> {properties.map((property, index) => ( <PropertyCard key={property.id || `prop-${index}`} property={property} index={index} /> ))} </div>
              {pagination && pagination.pageCount > 1 && ( <PaginationControls currentPage={pagination.page} pageCount={pagination.pageCount} totalProperties={pagination.total} /> )} </>
          ) : ( !loading && !error && ( <p className="text-center text-schonfeld-gray py-10 text-lg"> No se encontraron propiedades que coincidan con tus criterios de búsqueda. </p> ) )}
        </main>
      </div>
    </div>
  );
}