// frontend/src/components/WhatsAppButton.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// import { FaWhatsapp } from 'react-icons/fa'; // Descomenta si usas react-icons

export default function WhatsAppButton() { // LA FUNCIÓN COMIENZA AQUÍ
  const [isVisible, setIsVisible] = useState(false); 
  const phoneNumber = '5492494683536'; // TU NÚMERO AQUÍ
  const message = encodeURIComponent("Hola, estoy interesado/a en una propiedad y quisiera más información.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') { // Asegurarse que window exista (para SSR/pre-render)
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        }
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }
  }, []);

  // EL RETURN DEBE ESTAR DENTRO DE LA FUNCIÓN
  return (
    <>
      {/* El Link y su contenido ahora están dentro del return de la función */}
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          fixed bottom-6 right-6 z-50 
          bg-green-500 hover:bg-green-600 text-white 
          p-4 rounded-full shadow-xl 
          transition-all duration-300 ease-in-out
          hover:scale-110 
          flex items-center justify-center
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        `}
        aria-label="Contactar por WhatsApp"
        style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      >
        {/* Contenedor para el ping */}
        <span className="relative flex h-full w-full items-center justify-center">
          {/* El ping como un círculo detrás del icono */}
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          {/* Icono de WhatsApp encima del ping */}
          <span className="relative inline-flex rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 md:w-8 md:h-8">
              <path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2-.1-.3 0-.5.1-.1.2-.3.4-.4.1-.1.2-.2.3-.3.1-.1.1-.2 0-.4-.1-.1-.6-1.3-.8-1.8-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9 0 1.2.8 2.2 1 2.4.1.2 1.5 2.3 3.6 3.2.5.2.8.3 1.1.4.5.1.9.1 1.2.1.4-.1.8-.4 1.1-.8.2-.3.2-.6.1-.8l-.1-.1zM12 2a10 10 0 100 20 10 10 0 000-20zm0 18.4a8.4 8.4 0 110-16.8 8.4 8.4 0 010 16.8z" />
            </svg>
          </span>
        </span>
      </Link>
    </>
  );
} // LA FUNCIÓN WhatsAppButton TERMINA AQUÍ