// frontend/src/app/nosotros/page.js
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Nosotros - Schonfeld Desarrollos Inmobiliarios',
  description: 'Conoce más sobre Schonfeld Desarrollos Inmobiliarios, nuestra historia, equipo y valores en Tandil.',
};

// Datos del equipo (roles actualizados)
const equipo = [
  {
    nombre: 'Matías Schonfeld',
    rol: 'Martillero y Corredor Público', // ROL ACTUALIZADO
    imagen: '/images/nosotros/Matias-schonfeld.jpg',
    bioBreve: 'Experto en el mercado inmobiliario de Tandil, dedicado a brindar asesoramiento integral y transparente en cada transacción, asegurando la satisfacción de nuestros clientes.' // EJEMPLO - Actualiza
  },
  {
    nombre: 'Raúl Schonfeld',
    rol: 'Director Empresa Constructora', // ROL ACTUALIZADO
    imagen: '/images/nosotros/Raul-schonfeld.jpg',
    bioBreve: 'Liderando la visión y ejecución de nuestros proyectos constructivos con innovación y calidad. Aporta años de experiencia en la gestión y desarrollo de obras.' // EJEMPLO - Actualiza
  },
];

export default function NosotrosPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-schonfeld-blue-dark mb-10 md:mb-12 text-center">
        Sobre Nosotros
      </h1>

      {/* Introducción e Imagen Principal */}
      <section className="mb-12 md:mb-16">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl">
          <p className="text-xl text-schonfeld-gray mb-6 leading-relaxed">
            En Schonfeld Desarrollos Inmobiliarios, nos dedicamos con pasión y profesionalismo a conectar personas con sus propiedades ideales en Tandil y la región. 
            Con años de experiencia en el mercado, entendemos las necesidades de nuestros clientes y trabajamos incansablemente para superar sus expectativas.
          </p>
          <div className="relative w-full aspect-[16/7] md:aspect-[16/5] my-8 rounded-lg overflow-hidden shadow-md">
            <Image 
              src="/images/nosotros/fachada-oficina.jpg" 
              alt="Oficina de Schonfeld Desarrollos Inmobiliarios" 
              fill 
              className="object-cover"
              priority 
            />
          </div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="mb-12 md:mb-16">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-schonfeld-blue-dark mb-6">Nuestra Historia</h2>
          <div className="md:flex md:gap-8 items-center">
            <div className="md:w-1/2 prose prose-lg max-w-none text-gray-700">
              <p>
                Desde nuestros inicios, Schonfeld Desarrollos Inmobiliarios se ha consolidado como un referente en el mercado de Tandil, fundado sobre la base de la confianza, la transparencia y un profundo conocimiento local. 
                Nuestra trayectoria está marcada por el compromiso con cada cliente, buscando siempre ofrecer soluciones inmobiliarias que se adapten a sus sueños y necesidades.
              </p>
              <p>
                A lo largo de los años, hemos acompañado a innumerables familias y empresas en la concreción de sus proyectos, evolucionando con el mercado pero manteniendo siempre nuestros valores fundamentales.
                Creemos en el potencial de Tandil y su zona, y trabajamos para contribuir a su crecimiento sostenible a través de desarrollos y transacciones responsables.
              </p>
            </div>
            <div className="md:w-1/2 mt-6 md:mt-0">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-md">
                <Image 
                  src="/images/nosotros/imagen-conceptual-tandil.jpg" 
                  alt="Paisaje representativo de Tandil" 
                  fill 
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestra Misión y Valores */}
      <section className="mb-12 md:mb-16">
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-schonfeld-blue-dark mb-4">Nuestra Misión</h2>
              <p className="prose prose-lg max-w-none text-gray-700">
                Nuestra misión es ofrecer un servicio inmobiliario integral, transparente y eficiente, basado en la confianza y el conocimiento profundo del mercado local. 
                Buscamos ser el puente que une a compradores y vendedores, inquilinos y propietarios, facilitando transacciones exitosas y satisfactorias para todas las partes.
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-schonfeld-blue-dark mb-4">Nuestros Valores</h2>
              <ul className="prose prose-lg max-w-none text-gray-700 list-disc list-inside space-y-2">
                <li><strong>Profesionalismo:</strong> Actuamos con rigor, ética y conocimiento.</li>
                <li><strong>Confianza:</strong> Construimos relaciones duraderas basadas en la honestidad.</li>
                <li><strong>Compromiso:</strong> Nos dedicamos plenamente a alcanzar los objetivos de nuestros clientes.</li>
                <li><strong>Innovación:</strong> Buscamos constantemente mejorar nuestros procesos y servicios.</li>
                <li><strong>Conocimiento Local:</strong> Entendemos profundamente el mercado de Tandil y sus particularidades.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nuestro Equipo */}
      {equipo.length > 0 && (
        <section className="mb-12 md:mb-16">
          <div className="p-0"> 
            <h2 className="text-3xl md:text-4xl font-semibold text-schonfeld-blue-dark text-center mb-10 md:mb-12">
              Nuestro Equipo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 justify-items-center">
              {equipo.map((miembro, index) => (
                <div key={index} className="bg-white rounded-lg shadow-xl overflow-hidden text-center p-6 flex flex-col items-center max-w-sm">
                  <div className="relative w-36 h-36 md:w-44 md:h-44 mb-5 rounded-full overflow-hidden mx-auto border-4 border-schonfeld-blue-medium shadow-lg">
                    <Image 
                      src={miembro.imagen} 
                      alt={`Foto de ${miembro.nombre}, ${miembro.rol} en Schonfeld Inmobiliaria`} // Alt text mejorado
                      fill
                      className="object-cover" 
                      sizes="(max-width: 768px) 144px, 176px"
                    />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold text-schonfeld-blue-dark mb-1">{miembro.nombre}</h3>
                  <p className="text-schonfeld-red text-md mb-3">{miembro.rol}</p>
                  {miembro.bioBreve && <p className="text-gray-600 text-sm leading-relaxed">{miembro.bioBreve}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Llamada a la Acción */}
      <section className="text-center py-8">
        <Link href="/contacto" className="inline-block bg-schonfeld-red text-white font-semibold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-colors text-lg shadow-md">
          Contactate con Nosotros
        </Link>
      </section>
    </div>
  );
}