// frontend/src/components/Navbar.js
'use client'; 

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Para cerrar el menú al cambiar de ruta

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Obtener la ruta actual

  // Efecto para cerrar el menú móvil cuando cambia la ruta
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Clases comunes para los enlaces del menú
  const commonLinkClasses = "px-3 py-2 rounded-md font-medium hover:bg-schonfeld-blue-medium hover:text-white transition-colors";
  const desktopLinkClasses = `text-sm ${commonLinkClasses}`;
  const mobileLinkClasses = `block text-base ${commonLinkClasses}`; // 'block' para que ocupen todo el ancho

  return (
    <nav className="bg-schonfeld-blue-dark text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-schonfeld.png" 
                alt="Schonfeld Desarrollos Inmobiliarios Logo"
                width={180} 
                height={45} 
                className="h-9 md:h-10 w-auto" // Ajusta el tamaño del logo aquí si es necesario
                priority 
              />
            </Link>
          </div>

          {/* Enlaces de Navegación (para escritorio) */}
          <div className="hidden md:flex md:ml-6">
            <div className="flex space-x-1 items-center"> {/* items-center para alinear verticalmente los enlaces */}
              <Link href="/" className={desktopLinkClasses}>
                Inicio
              </Link>
              <Link href="/propiedades" className={desktopLinkClasses}>
                Propiedades
              </Link>
              <Link href="/nosotros" className={desktopLinkClasses}>
                Nosotros
              </Link>
              <Link href="/servicios" className={desktopLinkClasses}>
                Servicios
              </Link>
              <Link href="/contacto" className={desktopLinkClasses}>
                Contacto
              </Link>
            </div>
          </div>

          {/* Botón Menú Hamburguesa para móviles */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-schonfeld-blue-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen} // Para accesibilidad
            >
              <span className="sr-only">Abrir menú principal</span>
              {/* Icono: Hamburguesa o X */}
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {/* Se controla la visibilidad con clases de Tailwind basadas en isMobileMenuOpen */}
      <div 
        className={`
          md:hidden  /* Oculto en pantallas medianas y grandes */
          transition-all duration-300 ease-in-out overflow-hidden 
          ${isMobileMenuOpen ? 'max-h-96 opacity-100 visible border-t border-schonfeld-blue-medium' : 'max-h-0 opacity-0 invisible'}
          absolute w-full bg-schonfeld-blue-dark shadow-lg lg:shadow-none /* Para que se superponga y tenga fondo */
        `} 
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className={mobileLinkClasses}>Inicio</Link>
          <Link href="/propiedades" className={mobileLinkClasses}>Propiedades</Link>
          <Link href="/nosotros" className={mobileLinkClasses}>Nosotros</Link>
          <Link href="/servicios" className={mobileLinkClasses}>Servicios</Link>
          <Link href="/contacto" className={mobileLinkClasses}>Contacto</Link>
        </div>
      </div>
    </nav>
  );
}