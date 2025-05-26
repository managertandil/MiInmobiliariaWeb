// frontend/src/app/propiedades/loading.js
export default function PropiedadesLoading() {
  // Puedes crear un componente Spinner simple o usar uno de una librería
  // Aquí un ejemplo de spinner simple con Tailwind
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center pt-10">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-schonfeld-red mb-6"></div>
      <p className="text-schonfeld-blue-dark text-lg">Cargando propiedades...</p>
      
      {/* Opcional: Skeleton para las tarjetas */}
      <div className="w-full mt-10">
        <h1 className="text-3xl font-bold text-gray-300 bg-gray-300 rounded animate-pulse mb-3 h-9 w-3/4 mx-auto"></h1>
        <p className="text-gray-300 bg-gray-300 rounded animate-pulse mb-8 h-5 w-1/2 mx-auto"></p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[...Array(6)].map((_, i) => ( // Muestra 6 Skeletons de tarjeta
            <div key={i} className="border rounded-lg shadow-md bg-white p-4 animate-pulse">
              <div className="w-full aspect-[4/3] bg-gray-300 rounded mb-3"></div>
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
              <div className="h-5 bg-gray-300 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}