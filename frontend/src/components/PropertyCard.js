// frontend/src/components/PropertyCard.js
import Image from 'next/image';
import Link from 'next/link';

const formatPrice = (price, currency) => {
  if (price === null || typeof price === 'undefined' || price === 0) {
    return 'Consultar Precio';
  }
  let validCurrency = 'USD'; 
  if (typeof currency === 'string' && currency.trim().length === 3) {
    validCurrency = currency.trim().toUpperCase();
  }
  try {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: validCurrency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  } catch (e) {
    console.error("Error formateando precio en PropertyCard, usando USD por defecto. Moneda recibida:", currency, "Error:", e);
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  }
};

export default function PropertyCard({ property, index }) {
  if (!property || typeof property.titulo === 'undefined') {
    return null; 
  }

  const { 
    titulo, 
    precio, 
    moneda, 
    localidad_simple, 
    fotos,            
    operacion,         
    tipo_de_propiedad, 
    slug,
    // 'piso' ya no se desestructura aquí si no se va a usar
  } = property;       

  const imageUrl = fotos?.[0]?.formats?.small?.url ||
                   fotos?.[0]?.url ||
                   '/placeholder-image.png'; 

  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || 'http://localhost:1337';
  const finalImageUrl = imageUrl.startsWith('/') ? `${strapiBaseUrl}${imageUrl}` : imageUrl;

  const propertyLinkIdentifier = slug || String(property.id); 

  return (
    <div className="border rounded-lg shadow-lg overflow-hidden bg-white group hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <Link href={`/propiedad/${propertyLinkIdentifier}`} className="block">
        <div className="relative w-full aspect-[4/3] bg-gray-200">
          <Image
            src={finalImageUrl}
            alt={titulo || 'Imagen de la propiedad'}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={index !== undefined && index < 3}
            unoptimized={finalImageUrl.includes('http://localhost:1337')}
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/propiedad/${propertyLinkIdentifier}`}>
          <h3 className="text-xl font-semibold text-schonfeld-blue-dark mb-1 truncate group-hover:text-schonfeld-red transition-colors">
            {titulo || 'Propiedad sin título'}
          </h3>
        </Link>
        <p className="text-sm text-schonfeld-gray mb-1">
          {tipo_de_propiedad?.nombre || 'Tipo no especificado'} en {operacion?.nombre?.replace('Quiero ', '') || 'Operación no especificada'}
        </p>
        <p className="text-lg font-bold text-schonfeld-red mb-2">
          {formatPrice(precio, moneda)} 
        </p>
        
        {/* --- LÍNEA DE LOCALIDAD (SIN PISO) --- */}
        <p className="text-sm text-gray-600 mb-3 truncate">{localidad_simple || 'Ubicación no especificada'}</p>
        {/* --- FIN LÍNEA DE LOCALIDAD --- */}

        <div className="mt-auto pt-2"> 
          <Link
            href={`/propiedad/${propertyLinkIdentifier}`}
            className="inline-block w-full text-center bg-schonfeld-red text-white text-sm font-medium py-2.5 px-4 rounded hover:bg-opacity-80 transition-colors"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </div>
  );
}