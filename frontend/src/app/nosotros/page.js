// frontend/src/app/nosotros/page.js
import Image from 'next/image'; // Si quieres añadir alguna imagen
import Link from 'next/link';   // Para enlaces internos si es necesario

export const metadata = {
  title: 'Nosotros - Schonfeld Desarrollos Inmobiliarios',
  description: 'Conoce más sobre Schonfeld Desarrollos Inmobiliarios, nuestra historia, equipo y valores.',
};

export default function NosotrosPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-schonfeld-blue-dark mb-8 text-center">
        Sobre Nosotros
      </h1>

      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl prose prose-lg max-w-none text-gray-700"> {/* 'prose' para estilos de texto */}
        {/* Puedes usar clases de Tailwind Typography ('prose') para un buen estilo de texto por defecto */}
        
        <p className="lead text-xl text-schonfeld-gray mb-6"> {/* Clase 'lead' para un párrafo introductorio */}
          En Schonfeld Desarrollos Inmobiliarios, nos dedicamos con pasión y profesionalismo a conectar personas con sus propiedades ideales en Tandil y la región. 
          Con años de experiencia en el mercado, entendemos las necesidades de nuestros clientes y trabajamos incansablemente para superar sus expectativas.
        </p>

        {/* Si quieres una imagen */}
        {/* 
        <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden">
          <Image 
            src="/ruta/a/tu/imagen-nosotros.jpg" // Coloca la imagen en la carpeta 'public'
            alt="Equipo de Schonfeld Inmobiliaria o fachada de la oficina" 
            fill 
            className="object-cover" 
          />
        </div>
        */}

        <h2 className="text-2xl font-semibold text-schonfeld-blue-dark mt-10 mb-4">Nuestra Historia</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
          eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>

        <h2 className="text-2xl font-semibold text-schonfeld-blue-dark mt-10 mb-4">Nuestra Misión</h2>
        <p>
          Nuestra misión es ofrecer un servicio inmobiliario integral, transparente y eficiente, basado en la confianza y el conocimiento profundo del mercado local. 
          Buscamos ser el puente que une a compradores y vendedores, inquilinos y propietarios, facilitando transacciones exitosas y satisfactorias para todas las partes.
        </p>

        <h2 className="text-2xl font-semibold text-schonfeld-blue-dark mt-10 mb-4">Nuestros Valores</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Profesionalismo:</strong> Actuamos con rigor, ética y conocimiento.</li>
          <li><strong>Confianza:</strong> Construimos relaciones duraderas basadas en la honestidad.</li>
          <li><strong>Compromiso:</strong> Nos dedicamos plenamente a alcanzar los objetivos de nuestros clientes.</li>
          <li><strong>Innovación:</strong> Buscamos constantemente mejorar nuestros procesos y servicios.</li>
          <li><strong>Conocimiento Local:</strong> Entendemos profundamente el mercado de Tandil y sus particularidades.</li>
        </ul>

        <div className="mt-10 text-center">
          <Link href="/contacto" className="inline-block bg-schonfeld-red text-white font-semibold py-3 px-6 rounded-md hover:bg-opacity-80 transition-colors">
            Contactate con Nosotros
          </Link>
        </div>
      </div>
    </div>
  );
}