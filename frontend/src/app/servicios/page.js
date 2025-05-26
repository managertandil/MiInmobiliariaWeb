// frontend/src/app/servicios/page.js
import Link from 'next/link';

export const metadata = {
  title: 'Servicios - Schonfeld Desarrollos Inmobiliarios',
  description: 'Descubre los servicios inmobiliarios que ofrecemos: tasaciones, ventas, alquileres, administración de propiedades y más.',
};

export default function ServiciosPage() {
  const servicios = [
    {
      titulo: "Venta de Propiedades",
      descripcion: "Te acompañamos en todo el proceso de venta de tu inmueble, desde la valoración inicial hasta el cierre de la operación, asegurando la mejor estrategia y visibilidad.",
      // icono: <FaHome className="text-schonfeld-red text-3xl mb-3" /> // Ejemplo con react-icons
    },
    {
      titulo: "Alquiler de Propiedades",
      descripcion: "Gestionamos el alquiler de tu propiedad o te ayudamos a encontrar el inmueble perfecto para alquilar, con un servicio ágil y profesional.",
      // icono: <FaKey className="text-schonfeld-red text-3xl mb-3" />
    },
    {
      titulo: "Tasaciones Profesionales",
      descripcion: "Realizamos tasaciones precisas y fundamentadas de tu propiedad, basadas en un profundo conocimiento del mercado actual y análisis comparativos.",
      // icono: <FaCalculator className="text-schonfeld-red text-3xl mb-3" />
    },
    {
      titulo: "Administración de Alquileres",
      descripcion: "Ofrecemos un servicio completo de administración de alquileres para que no tengas que preocuparte por nada, desde la selección de inquilinos hasta el mantenimiento.",
      // icono: <FaFileContract className="text-schonfeld-red text-3xl mb-3" />
    },
    {
      titulo: "Asesoramiento en Inversiones",
      descripcion: "Te brindamos asesoramiento experto para tus inversiones inmobiliarias, identificando las mejores oportunidades del mercado para maximizar tu rentabilidad.",
      // icono: <FaChartLine className="text-schonfeld-red text-3xl mb-3" />
    },
    // Puedes añadir más servicios aquí
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-schonfeld-blue-dark mb-10 text-center">
        Nuestros Servicios
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicios.map((servicio, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-xl flex flex-col">
            {/* Si usas iconos: <div className="flex justify-center mb-4">{servicio.icono}</div> */}
            <h2 className="text-xl font-semibold text-schonfeld-blue-dark mb-3 text-center md:text-left">
              {servicio.titulo}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed flex-grow">
              {servicio.descripcion}
            </p>
            {/* <div className="mt-auto pt-4">
              <Link href="/contacto" className="text-schonfeld-red hover:underline font-medium">
                Consultar
              </Link>
            </div> */}
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-lg text-gray-700 mb-4">¿Tenés alguna consulta o necesitás un servicio que no está listado?</p>
        <Link href="/contacto" className="inline-block bg-schonfeld-red text-white font-semibold py-3 px-6 rounded-md hover:bg-opacity-80 transition-colors">
          ¡Contactanos Hoy Mismo!
        </Link>
      </div>
    </div>
  );
}