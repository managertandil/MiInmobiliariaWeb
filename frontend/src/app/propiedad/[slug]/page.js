// frontend/src/app/propiedad/[slug]/page.js
import Link from 'next/link';
import Script from 'next/script';
import PropertyImageGallery from '@/components/PropertyImageGallery'; 
import PropertyContactForm from '@/components/PropertyContactForm';

const formatPrice = (price, currency) => {
  if (price === null || typeof price === 'undefined' || price === 0) { return 'Consultar Precio'; }
  let validCurrency = 'USD'; 
  if (typeof currency === 'string' && currency.trim().length === 3) { validCurrency = currency.trim().toUpperCase(); }
  try { return new Intl.NumberFormat('es-AR', { style: 'currency', currency: validCurrency, minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price); } 
  catch (e) { console.error("Error formateando precio en [slug]/page.js, usando USD por defecto. Moneda recibida:", currency, "Error:", e); return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price); }
};

function getYouTubeEmbedUrl(url) { if (!url) return null; let videoId = null; try { const urlObj = new URL(url); if (urlObj.hostname === 'youtu.be') { videoId = urlObj.pathname.slice(1); } else if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') { videoId = urlObj.searchParams.get('v'); } } catch (e) { console.error("Error parsing YouTube URL:", e); return null; } return videoId ? `https://www.youtube.com/embed/${videoId}` : null; }
function getVimeoId(url) { if (!url) return null; const vimeoRegex = /(?:vimeo\.com\/(?:video\/|channels\/[A-Za-z0-9]+\/|groups\/[A-Za-z0-9]+\/videos\/)?|player\.vimeo\.com\/video\/)([0-9]+)/; const match = vimeoRegex.exec(url); return match ? match[1] : null; }

async function getPropertyDetailsBySlug(slugFromUrl) {
  const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
  const apiIdPlural = 'propiedads';
  const slugApiField = 'slug'; 
  const populateFieldsArray = ['fotos', 'operacion', 'tipo_de_propiedad'];
  const populateQueryString = populateFieldsArray.map((field) => `populate[]=${field}`).join('&');
  const fetchUrl = `${strapiApiUrl}/${apiIdPlural}?filters[${slugApiField}][$eq]=${encodeURIComponent(slugFromUrl)}&${populateQueryString}`;
  try {
    const res = await fetch(fetchUrl, { cache: 'no-store' });
    if (!res.ok) { const errorText = await res.text(); console.error(`PropertyDetailPage - Error fetching property (slug: ${slugFromUrl}, status: ${res.status}):`, errorText); return null; }
    const responseJson = await res.json();
    if (responseJson.data && Array.isArray(responseJson.data) && responseJson.data.length > 0) { return responseJson.data[0]; } 
    else { return null; }
  } catch (error) { console.error(`PropertyDetailPage - Exception while fetching property (slug: ${slugFromUrl}):`, error); return null; }
}

// --- FUNCIÓN generateMetadata (CON CORRECCIÓN EN OG IMAGE) ---
export async function generateMetadata({ params }) {
  const { slug } = params;
  const propertyData = await getPropertyDetailsBySlug(slug);

  if (!propertyData) {
    return {
      title: 'Propiedad no Encontrada | Schonfeld Inmobiliaria',
      description: 'La propiedad que buscas no está disponible o no existe.',
    };
  }

  const { titulo, descripcion, operacion, tipo_de_propiedad, localidad_simple, fotos } = propertyData;

  const operacionNombre = typeof operacion === 'object' && operacion !== null ? String(operacion.nombre || '').trim().replace('Quiero ', '') : 'Operación';
  const tipoPropiedadNombre = typeof tipo_de_propiedad === 'object' && tipo_de_propiedad !== null ? String(tipo_de_propiedad.nombre || '').trim() : 'Propiedad';
  const pageTitle = `${titulo || tipoPropiedadNombre} en ${operacionNombre.toLowerCase()} ${localidad_simple ? `en ${localidad_simple}` : ''} | Schonfeld Inmobiliaria`;
  let metaDescription = `Encuentra ${titulo || tipoPropiedadNombre} en ${operacionNombre.toLowerCase()} ${localidad_simple ? `en ${localidad_simple}` : ''}. Detalles y contacto en Schonfeld Desarrollos Inmobiliarios.`;
  if (descripcion) { 
    const plainTextDescription = descripcion.replace(/<[^>]+>/g, ' ').replace(/\s\s+/g, ' ').trim(); 
    metaDescription = plainTextDescription.substring(0, 155); 
    if (plainTextDescription.length > 155) { metaDescription += '...'; } 
  }
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || 'http://localhost:1337';
  
  let ogImageUrl = `${siteUrl}/default-og-image.jpg`; // Default image

  if (Array.isArray(fotos) && fotos.length > 0) {
    const primeraFoto = fotos[0]; 
    if (primeraFoto && typeof primeraFoto.url === 'string' && primeraFoto.url.trim() !== '') {
      ogImageUrl = primeraFoto.url.startsWith('/') 
        ? `${strapiBaseUrl}${primeraFoto.url}` 
        : primeraFoto.url;
    }
  }

  return {
    title: pageTitle, 
    description: metaDescription,
    openGraph: { 
      title: pageTitle, 
      description: metaDescription, 
      images: [{ url: ogImageUrl }], 
      url: `${siteUrl}/propiedad/${slug}`, 
      type: 'article' 
    },
    twitter: { 
      card: 'summary_large_image', 
      title: pageTitle, 
      description: metaDescription, 
      images: [ogImageUrl] 
    },
  };
}
// --- FIN FUNCIÓN generateMetadata ---


// --- COMPONENTE DE PÁGINA (PropertyDetailPage) ---
export default async function PropertyDetailPage({ params }) {
  const { slug } = params; 
  const propertyData = await getPropertyDetailsBySlug(slug);

  if (!propertyData || typeof propertyData.titulo === 'undefined') { 
    return ( 
      <div className="container mx-auto px-4 py-16 text-center min-h-screen flex flex-col justify-center items-center"> 
        <h1 className="text-3xl font-bold text-schonfeld-red mb-4">Propiedad no Encontrada</h1> 
        <p className="text-lg text-schonfeld-gray mb-8">
          Lo sentimos, la propiedad con el enlace <code className="bg-gray-200 p-1 rounded">{slug}</code> no existe o no está disponible.
        </p> 
        <Link href="/propiedades" className="bg-schonfeld-blue-dark text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors">
          Ver todas las propiedades
        </Link> 
      </div> 
    );
  }
  
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_BASE_URL || 'http://localhost:1337';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    
  const gallerySlides = (Array.isArray(propertyData.fotos) ? propertyData.fotos : []).map((img, idx) => { 
    const originalUrl = img.url; 
    const thumbnailUrl = img.formats?.thumbnail?.url || originalUrl; 
    return { 
      id: img.id, 
      original: originalUrl?.startsWith('/') ? `${strapiBaseUrl}${originalUrl}` : originalUrl, 
      thumbnail: thumbnailUrl?.startsWith('/') ? `${strapiBaseUrl}${thumbnailUrl}` : thumbnailUrl, 
      alt: img.alternativeText || propertyData.titulo || `Imagen ${idx + 1} de ${propertyData.titulo}`, 
      src: originalUrl?.startsWith('/') ? `${strapiBaseUrl}${originalUrl}` : originalUrl, 
    };
  }).filter(img => img.src && img.thumbnail) || []; 

  const { 
    titulo, descripcion, precio, moneda, localidad_simple, 
    ambientes, dormitorios, banos, superficie_cubierta, superficie_total,
    antiguedad, expensas, cochera, piso, ascensor, amenities,
    slug: propiedadSlugDeDatos, operacion, tipo_de_propiedad, codigo_interno, 
    direccion_completa, latitud, longitud, enlace_video,
    createdAt, publishedAt, 
  } = propertyData;
  
  const operacionNombre = typeof operacion === 'object' && operacion !== null ? String(operacion.nombre || '').trim() : '';
  const tipoPropiedadNombre = typeof tipo_de_propiedad === 'object' && tipo_de_propiedad !== null ? String(tipo_de_propiedad.nombre || '').trim() : '';
  const antiguedadNum = typeof antiguedad === 'string' ? parseInt(antiguedad, 10) : (typeof antiguedad === 'number' ? antiguedad : null);
  const cocheraNum = typeof cochera === 'string' ? parseInt(cochera, 10) : (typeof cochera === 'number' ? cochera : 0);
  let pisoDisplay = null;
  if (typeof piso === 'number' && piso >= 0) {
    pisoDisplay = piso === 0 ? 'Planta Baja' : `${piso}º`;
  } else if (typeof piso === 'string' && !isNaN(parseInt(piso, 10))) {
    const pisoNumero = parseInt(piso, 10);
    if (pisoNumero >= 0) {
        pisoDisplay = pisoNumero === 0 ? 'Planta Baja' : `${pisoNumero}º`;
    }
  }
  const youtubeEmbedUrl = enlace_video ? getYouTubeEmbedUrl(enlace_video) : null;
  const vimeoId = enlace_video ? getVimeoId(enlace_video) : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing", 
    "name": titulo || "Propiedad en Schonfeld Inmobiliaria",
    "description": descripcion ? descripcion.replace(/<[^>]+>/g, ' ').replace(/\s\s+/g, ' ').trim().substring(0, 5000) : `Detalles sobre ${titulo || tipoPropiedadNombre}.`,
    "url": `${siteUrl}/propiedad/${propiedadSlugDeDatos || slug}`,
    "image": gallerySlides.length > 0 ? gallerySlides.map(slide => slide.original) : (propertyData.fotos?.[0]?.url ? [`${strapiBaseUrl}${propertyData.fotos[0].url}`] : [`${siteUrl}/default-og-image.jpg`]),
    "datePosted": publishedAt ? new Date(publishedAt).toISOString() : (createdAt ? new Date(createdAt).toISOString() : new Date().toISOString()),
    ...(ambientes && !isNaN(parseInt(String(ambientes))) && { "numberOfRooms": parseInt(String(ambientes)) }),
    ...(dormitorios && !isNaN(parseInt(String(dormitorios))) && { "numberOfBedrooms": parseInt(String(dormitorios)) }),
    ...(banos && !isNaN(parseInt(String(banos))) && { "numberOfBathroomsTotal": parseInt(String(banos)) }),
    ...(superficie_total && !isNaN(parseFloat(String(superficie_total))) && parseFloat(String(superficie_total)) > 0 && { "floorSize": { "@type": "QuantitativeValue", "value": parseFloat(String(superficie_total)), "unitText": "m²", } }),
    ...(superficie_cubierta && !isNaN(parseFloat(String(superficie_cubierta))) && parseFloat(String(superficie_cubierta)) > 0 && { ...(!superficie_total && { "floorSize": { "@type": "QuantitativeValue", "value": parseFloat(String(superficie_cubierta)), "unitText": "m²" } }) }),
    ...(direccion_completa && { "address": { "@type": "PostalAddress", "streetAddress": direccion_completa, ...(localidad_simple && { "addressLocality": localidad_simple }), "addressRegion": "Buenos Aires", "addressCountry": "AR" } }),
    ...(latitud && longitud && !isNaN(parseFloat(String(latitud))) && !isNaN(parseFloat(String(longitud))) && { "geo": { "@type": "GeoCoordinates", "latitude": parseFloat(String(latitud)), "longitude": parseFloat(String(longitud)) } }),
    "offers": { "@type": "Offer", "price": precio ? parseFloat(String(precio).replace(/\./g, '').replace(',', '.')) : 0, "priceCurrency": (typeof moneda === 'string' && moneda.length === 3 ? moneda.toUpperCase() : 'USD'), "availability": "https://schema.org/InStock", "seller": { "@type": "RealEstateAgent", "name": "Schonfeld Desarrollos Inmobiliarios", "url": siteUrl, "logo": `${siteUrl}/logo-schonfeld.png`, "telephone": "+542494683535", "address": { "@type": "PostalAddress", "streetAddress": "9 de Julio 35", "addressLocality": "Tandil", "addressRegion": "Buenos Aires", "postalCode": "B7000", "addressCountry": "AR" } } },
  };

  return (
    <>
      <Script id="property-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ... (Resto del JSX se mantiene igual) ... */}
        <div className="text-sm text-gray-500 mb-6"> <Link href="/" className="hover:text-schonfeld-red">Inicio</Link> / {' '} <Link href="/propiedades" className="hover:text-schonfeld-red">Propiedades</Link> / {' '} <span className="text-gray-700">{titulo || 'Detalle de Propiedad'}</span> </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2"> <PropertyImageGallery images={gallerySlides} initialTitle={titulo} /> </div>
          <div className="lg:col-span-1"> <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24"> <h1 className="text-2xl lg:text-3xl font-bold text-schonfeld-blue-dark mb-1">{titulo || 'Propiedad sin Título'}</h1> <p className="text-md text-schonfeld-gray mb-3"> {tipoPropiedadNombre || ''} en {operacionNombre?.replace('Quiero ', '') || ''} {localidad_simple && ` | ${localidad_simple}`} {` (Ref: ${codigo_interno || propiedadSlugDeDatos || slug || propertyData.id})`} </p> <p className="text-3xl font-bold text-schonfeld-red mb-6">{formatPrice(precio, moneda)}</p> <div className="space-y-1 text-sm text-gray-700 mb-4 pb-4 border-b border-gray-200"> {ambientes !== undefined && ambientes !== null && (<p><strong>Ambientes:</strong> {ambientes}</p>)} {dormitorios !== undefined && dormitorios !== null && (<p><strong>Dormitorios:</strong> {dormitorios}</p>)} {banos !== undefined && banos !== null && (<p><strong>Baños:</strong> {banos}</p>)} {pisoDisplay !== null && ( <p> <strong>Piso:</strong>{' '} {pisoDisplay} </p> )} {cocheraNum > 0 && (<p><strong>Cochera(s):</strong> {cocheraNum}</p>)} </div> {(antiguedadNum !== null && !isNaN(antiguedadNum)) || (typeof expensas === 'number' && expensas > 0) || (ascensor === true || ascensor === false) || (amenities === true || amenities === false) || (superficie_cubierta !== undefined && superficie_cubierta !== null) || (superficie_total !== undefined && superficie_total !== null) ? ( <div className="mt-0"> <h4 className="text-md font-semibold text-schonfeld-blue-dark mb-2">Más Detalles y Comodidades:</h4> <div className="space-y-1 text-sm text-gray-700"> {antiguedadNum !== null && !isNaN(antiguedadNum) && (<p><strong>Antigüedad:</strong> {antiguedadNum} {antiguedadNum === 1 ? 'año' : 'años'}</p>)} {typeof expensas === 'number' && expensas > 0 && (<p><strong>Expensas:</strong> {formatPrice(expensas, 'ARS')}</p> )} {(ascensor === true || ascensor === false) && (<p><strong>Ascensor:</strong> {ascensor ? 'Sí' : 'No'}</p>)} {(amenities === true || amenities === false) && (<p><strong>Amenities (generales):</strong> {amenities ? 'Sí' : 'No'}</p>)} {superficie_cubierta !== undefined && superficie_cubierta !== null && (<p><strong>Sup. Cubierta:</strong> {superficie_cubierta} m²</p>)} {superficie_total !== undefined && superficie_total !== null && (<p><strong>Sup. Total:</strong> {superficie_total} m²</p>)} </div> </div> ) : null} {(latitud && longitud) || direccion_completa ? ( <div className="mt-4 pt-4 border-t border-gray-200"> <h4 className="text-md font-semibold text-schonfeld-blue-dark mb-2">Ubicación</h4> <div className="text-sm text-gray-700 space-y-1"> {direccion_completa && <p>{direccion_completa}</p>} {localidad_simple && !direccion_completa && <p>{localidad_simple}</p>} {latitud && longitud && ( <a href={`https://www.google.com/maps/search/?api=1&query=${latitud},${longitud}`} target="_blank" rel="noopener noreferrer" className="inline-block text-schonfeld-red hover:text-red-700 font-medium hover:underline mt-1"> Ver en Google Maps </a> )} </div> </div> ) : null} </div> </div>
        </div>
        {descripcion && ( <div className="mt-10 pt-8 border-t border-gray-200"> <h2 className="text-2xl font-semibold text-schonfeld-blue-dark mb-4">Descripción Detallada</h2> <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl max-w-none text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: descripcion.replace(/\n/g, '<br />') }} /> </div> )}
        {enlace_video && (youtubeEmbedUrl || vimeoId) && ( <div className="mt-10 pt-8 border-t border-gray-200"> <h2 className="text-2xl font-semibold text-schonfeld-blue-dark mb-4">Video de la Propiedad</h2> <div className="relative w-full overflow-hidden rounded-lg shadow-lg aspect-video bg-black"> {youtubeEmbedUrl && (<iframe src={youtubeEmbedUrl} title="Video de la Propiedad (YouTube)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen className="absolute top-0 left-0 w-full h-full"></iframe> )} {vimeoId && !youtubeEmbedUrl && (<iframe src={`https://player.vimeo.com/video/${vimeoId}`} frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Video de la Propiedad (Vimeo)" className="absolute top-0 left-0 w-full h-full"></iframe> )} </div> </div> )}
        {enlace_video && !youtubeEmbedUrl && !vimeoId && ( <div className="mt-10 pt-8 border-t border-gray-200"> <h2 className="text-2xl font-semibold text-schonfeld-blue-dark mb-4">Video</h2> <a href={enlace_video} target="_blank" rel="noopener noreferrer" className="text-schonfeld-red hover:underline"> Ver video de la propiedad </a> </div> )}
        <div className="mt-10 pt-8 border-t border-gray-200 max-w-2xl mx-auto"> <PropertyContactForm propertyTitle={titulo || 'Esta Propiedad'} propertyRef={codigo_interno || propiedadSlugDeDatos || slug || propertyData.id} /> </div>
      </div>
    </>
  );
}