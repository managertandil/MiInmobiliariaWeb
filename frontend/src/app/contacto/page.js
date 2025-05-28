// frontend/src/app/contacto/page.js
import ContactFormGeneral from '@/components/ContactFormGeneral';
import Link from 'next/link';
// import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaInstagram } from 'react-icons/fa';

export const metadata = {
  title: 'Contacto - Schonfeld Desarrollos Inmobiliarios',
  description: 'Contáctenos para consultas sobre propiedades, tasaciones o cualquier otro servicio inmobiliario.',
};

export default function ContactoPage() {
  const infoSchonfeld = {
    direccion: "9 de Julio 35, Tandil, Buenos Aires", // Puedes ajustar esta dirección si es diferente a la de las coordenadas
    whatsappNumero: "5492494683536", 
    whatsappDisplay: "+54 9 249 468-3536",
    email: "info.schonfeld@gmail.com",
    instagramUser: "schonfeld.inmobiliaria",
    instagramLink: "https://www.instagram.com/schonfeld.inmobiliaria/",
    // --- COORDENADAS ACTUALIZADAS ---
    latitudOficina: -37.33238570701355, 
    longitudOficina: -59.131001668446636, 
    // --- FIN COORDENADAS ACTUALIZADAS ---
  };

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-schonfeld-blue-dark mb-10 text-center">
        Ponete en Contacto
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Columna de Información de Contacto */}
        <div className="bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-schonfeld-blue-dark mb-5">Nuestra Oficina</h2>
          
          <div className="space-y-3 text-gray-700">
            <p className="flex items-start">
              <span>{infoSchonfeld.direccion}</span>
            </p>
            <p className="flex items-center">
              <span>WhatsApp: <a href={`https://wa.me/${infoSchonfeld.whatsappNumero}`} target="_blank" rel="noopener noreferrer" className="text-schonfeld-red hover:underline">{infoSchonfeld.whatsappDisplay}</a></span>
            </p>
            <p className="flex items-center">
              <span>Email: <a href={`mailto:${infoSchonfeld.email}`} className="text-schonfeld-red hover:underline">{infoSchonfeld.email}</a></span>
            </p>
            <p className="flex items-center">
              <span>Instagram: <a href={infoSchonfeld.instagramLink} target="_blank" rel="noopener noreferrer" className="text-schonfeld-red hover:underline">@{infoSchonfeld.instagramUser}</a></span>
            </p>
          </div>
          
          {/* Mapa Embebido */}
          {infoSchonfeld.latitudOficina && infoSchonfeld.longitudOficina && googleMapsApiKey ? (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-schonfeld-blue-dark mb-3">Encontranos en el Mapa</h3>
              <div className="relative w-full aspect-video rounded-md overflow-hidden shadow-md bg-gray-300"> 
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${infoSchonfeld.latitudOficina},${infoSchonfeld.longitudOficina}&zoom=16`} // Puedes ajustar el zoom (ej. 15, 17)
                  width="100%" 
                  height="100%" 
                  style={{ border:0 }}
                  allowFullScreen={true} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Ubicación de ${metadata.title}`}
                ></iframe>
              </div>
            </div>
          ) : (
            infoSchonfeld.latitudOficina && infoSchonfeld.longitudOficina && !googleMapsApiKey && (
              <div className="mt-6 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                <p className="font-bold">Mapa no disponible</p>
                <p className="text-sm">La API Key de Google Maps no está configurada. El mapa no se puede mostrar.</p>
              </div>
            )
          )}
        </div>

        {/* Columna del Formulario de Contacto */}
        <div className="mt-8 md:mt-0">
          <ContactFormGeneral />
        </div>
      </div>
    </div>
  );
}