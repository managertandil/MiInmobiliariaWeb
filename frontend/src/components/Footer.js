// frontend/src/components/Footer.js
import Link from 'next/link';
import Image from 'next/image';
// Importamos los iconos específicos que vamos a usar
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const infoSchonfeld = {
    nombreCompleto: "Schonfeld Desarrollos Inmobiliarios",
    direccion: "9 de Julio 35, Tandil, Buenos Aires",
    whatsappNumero: "5492494683536", // Mantenemos el formato para wa.me
    whatsappDisplay: "+54 9 249 468-3536",
    email: "info.schonfeld@gmail.com", // <-- EMAIL CORREGIDO
    instagramUser: "schonfeld.inmobiliaria",
    instagramLink: "https://www.instagram.com/schonfeld.inmobiliaria/",
    facebookLink: "https://web.facebook.com/inmobiliaria.schonfeld", // <-- FACEBOOK AÑADIDO
  };

  return (
    <footer className="bg-schonfeld-blue-dark text-gray-300 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Columna 1: Logo y Descripción Corta */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo-schonfeld.png" 
                alt={`${infoSchonfeld.nombreCompleto} Logo`}
                width={180} 
                height={45} 
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed">
              Tu socio de confianza para encontrar la propiedad de tus sueños o realizar la mejor inversión inmobiliaria en Tandil y la zona.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Navegación</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-schonfeld-red transition-colors">Inicio</Link></li>
              <li><Link href="/propiedades" className="hover:text-schonfeld-red transition-colors">Propiedades</Link></li>
              <li><Link href="/nosotros" className="hover:text-schonfeld-red transition-colors">Nosotros</Link></li>
              <li><Link href="/servicios" className="hover:text-schonfeld-red transition-colors">Servicios</Link></li>
              <li><Link href="/contacto" className="hover:text-schonfeld-red transition-colors">Contacto</Link></li>
            </ul>
          </div>

          {/* Columna 3: Contacto */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Contacto Directo</h5>
            <ul className="space-y-2 text-sm">
              <li className="truncate flex items-start">
                {/* Podrías añadir un icono de ubicación aquí también si quieres */}
                <span className="mt-px">{infoSchonfeld.direccion}</span>
              </li>
              <li className="flex items-center">
                <FaWhatsapp className="text-green-400 mr-2 flex-shrink-0" size={16} />
                <a href={`https://wa.me/${infoSchonfeld.whatsappNumero}`} target="_blank" rel="noopener noreferrer" className="hover:text-schonfeld-red transition-colors">
                  {infoSchonfeld.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center">
                 {/* Icono de email si quieres: <FaEnvelope className="text-gray-400 mr-2 flex-shrink-0" size={16} /> */}
                <a href={`mailto:${infoSchonfeld.email}`} className="hover:text-schonfeld-red transition-colors break-all">
                  {infoSchonfeld.email}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Columna 4: Redes Sociales */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-4">Seguinos</h5>
            <div className="flex space-x-4">
              {infoSchonfeld.instagramLink && (
                <a href={infoSchonfeld.instagramLink} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Schonfeld Inmobiliaria" className="text-gray-400 hover:text-schonfeld-red transition-colors">
                  <FaInstagram size={24} />
                </a>
              )}
              {infoSchonfeld.facebookLink && (
                <a href={infoSchonfeld.facebookLink} target="_blank" rel="noopener noreferrer" aria-label="Facebook de Schonfeld Inmobiliaria" className="text-gray-400 hover:text-schonfeld-red transition-colors">
                  <FaFacebookF size={24} />
                </a>
              )}
              {/* Añade más redes si tienes */}
            </div>
            {/* Puedes añadir aquí los enlaces legales si los tienes listos */}
            {/* <h5 className="text-lg font-semibold text-white mb-4 mt-6">Información</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terminos-y-condiciones" className="hover:text-schonfeld-red transition-colors">Términos y Condiciones</Link></li>
              <li><Link href="/politica-de-privacidad" className="hover:text-schonfeld-red transition-colors">Política de Privacidad</Link></li>
            </ul> */}
          </div>

        </div>

        <div className="border-t border-schonfeld-blue-medium pt-6 text-center text-sm">
          <p>© {currentYear} {infoSchonfeld.nombreCompleto}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}