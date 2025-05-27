// frontend/src/app/page.js (VERSIÓN SIMPLIFICADA PARA PRUEBA DE DESPLIEGUE)

// No necesitamos imports de componentes si no los vamos a usar en esta prueba
// import PropertyCard from '@/components/PropertyCard';
// import HeroSearchForm from '@/components/HeroSearchForm';

// La función getFeaturedProperties está completamente eliminada para esta prueba.

export default async function HomePage() {
  // No se llama a getFeaturedProperties
  const featuredProperties = []; // Devolvemos un array vacío para que el JSX no falle

  console.log("[HomePage - VERSIÓN SIMPLIFICADA] Renderizando página de inicio básica.");

  return (
    <> 
      <section 
        className="relative text-center min-h-[500px] md:min-h-[600px] flex flex-col justify-center items-center bg-gray-200 py-16 md:py-20"
        // style={{ backgroundImage: "url('/hero-background.jpg')" }} // Comentado para simplificar
      >
        {/* <div className="absolute inset-0 bg-black opacity-40 z-0"></div> */} {/* Comentado para simplificar */}

        <div className="container mx-auto px-4 z-10 w-full max-w-4xl flex flex-col items-center relative">
          
          <div className="mb-10 md:mb-12 text-center"> 
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-schonfeld-blue-dark mb-5"> {/* Color de texto cambiado por si el fondo es claro */}
              Encontrá la Propiedad de tus Sueños
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-xl lg:max-w-2xl mx-auto"> {/* Color de texto cambiado */}
              Explorá catálogo y encontrá tu próximo hogar o inversión en Tandil y la zona.
            </p>
            <p className="mt-8 text-red-500 font-semibold">
              ESTA ES UNA VERSIÓN DE PRUEBA SIMPLIFICADA DE LA PÁGINA DE INICIO.
            </p>
          </div>
          
          {/* HeroSearchForm comentado temporalmente para simplificar al máximo */}
          {/* <div className="w-full pb-2 md:pb-0">
            <HeroSearchForm /> 
          </div> */}
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-semibold text-schonfeld-blue-dark text-center mb-10 md:mb-12">
            Propiedades Destacadas
          </h2>
          <div className="text-center py-10">
            <p className="text-schonfeld-gray text-lg">
              (Sección de propiedades destacadas desactivada para esta prueba)
            </p>
          </div>
        </div>
      </section>
    </>
  );
}