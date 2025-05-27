// frontend/src/app/page.js
import PropertyCard from '@/components/PropertyCard';
import HeroSearchForm from '@/components/HeroSearchForm';

// Función para obtener las propiedades destacadas desde Strapi
// async function getFeaturedProperties() { // <--- TEMPORALMENTE COMENTADA
//   const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
  
//   const apiIdPlural = 'propiedads';                
//   const esDestacadaField = 'es_destacada';        
//   const fotosField = 'fotos';                      
//   const operacionField = 'operacion';                
//   const tipoPropiedadField = 'tipo_de_propiedad';    
  
//   const populateFieldsArray = [fotosField, operacionField, tipoPropiedadField];
//   const populateQueryString = populateFieldsArray.map((field) => `populate[]=${field}`).join('&');
  
//   const fieldsForCard = ['titulo', 'precio', 'moneda', 'localidad_simple', 'slug', 'piso', 'id'];
//   const fieldsQuery = fieldsForCard.map(f => `fields[]=${f}`).join('&');

//   const queryParams = `filters[${esDestacadaField}][$eq]=true&${populateQueryString}&${fieldsQuery}&pagination[limit]=3`; 

//   console.log("HomePage - URL para fetch destacadas (DESACTIVADO TEMPORALMENTE):", `${strapiApiUrl}/${apiIdPlural}?${queryParams}`);

//   try {
//     const res = await fetch(`${strapiApiUrl}/${apiIdPlural}?${queryParams}`, { 
//       cache: 'no-store', 
//     });

//     if (!res.ok) {
//       const errorText = await res.text();
//       console.error("HomePage - Error al obtener propiedades destacadas (Respuesta no OK):", res.status, errorText);
//       return [];
//     }

//     const data = await res.json();
//     const propertiesToReturn = data.data || [];
//     return propertiesToReturn; 
    
//   } catch (error) {
//     console.error("HomePage - Excepción al obtener propiedades destacadas (Catch):", error);
//     return [];
//   }
// }

export default async function HomePage() {
  // const featuredProperties = await getFeaturedProperties(); // <--- LLAMADA COMENTADA
  const featuredProperties = []; // <--- DEVOLVER ARRAY VACÍO TEMPORALMENTE

  console.log("[HomePage] Renderizando con featuredProperties vacío (prueba de despliegue)."); // Log para saber que esta versión se está ejecutando

  return (
    <> 
      <section 
        className="relative text-center min-h-[500px] md:min-h-[600px] flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat py-16 md:py-20"
        style={{ backgroundImage: "url('/hero-background.jpg')" }} 
      >
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

        <div className="container mx-auto px-4 z-10 w-full max-w-4xl flex flex-col items-center relative">
          
          <div className="mb-10 md:mb-12 text-center"> 
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 shadow-text-md">
              Encontrá la Propiedad de tus Sueños
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-xl lg:max-w-2xl mx-auto shadow-text-sm">
              Explorá catálogo y encontrá tu próximo hogar o inversión en Tandil y la zona.
            </p>
          </div>
          
          <div className="w-full pb-2 md:pb-0">
            <HeroSearchForm /> 
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-schonfeld-blue-dark text-center mb-10 md:mb-12">
            Propiedades Destacadas
          </h2>
          {/* Esta sección ahora mostrará el mensaje de "no hay propiedades" porque featuredProperties está vacío */}
          {Array.isArray(featuredProperties) && featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProperties.map((property, index) => (
                <PropertyCard key={property.id || `featured-${index}`} property={property} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-schonfeld-gray text-lg">
                Actualmente no hay propiedades destacadas para mostrar.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}