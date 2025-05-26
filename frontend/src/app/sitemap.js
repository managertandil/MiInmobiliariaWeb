// frontend/src/app/sitemap.js

// URL base de tu sitio. ¡Cámbiala por tu dominio de producción cuando despliegues!
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Función para obtener todos los slugs (o identificadores) de las propiedades desde Strapi
async function getAllPropertySlugs() {
  const strapiApiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api';
  const apiIdPlural = 'propiedads';
  const slugField = 'slug'; // O 'id' si usas IDs numéricos en la URL
  const updatedAtField = 'updatedAt'; // Para lastModified

  // Pedimos solo los campos slug y updatedAt, y todas las entradas (ajusta la paginación si tienes MUCHAS)
  // Aumentamos el pageSize para intentar traer todos en una sola petición si no son demasiados.
  // Si tienes miles de propiedades, necesitarías implementar paginación aquí también.
  const queryParams = `fields[0]=${slugField}&fields[1]=${updatedAtField}&pagination[pageSize]=1000`; 

  try {
    const res = await fetch(`${strapiApiUrl}/${apiIdPlural}?${queryParams}`, {
      next: { revalidate: 3600 } // Revalidar cada hora, por ejemplo
    });
    if (!res.ok) {
      console.error("Sitemap: Error fetching property slugs from Strapi", res.status, await res.text());
      return [];
    }
    const responseJson = await res.json();
    
    // Asumiendo estructura plana donde los campos están directamente en cada objeto del array data
    return responseJson.data?.map(property => ({
      slug: property[slugField],
      updatedAt: property[updatedAtField] 
    })) || [];

  } catch (error) {
    console.error("Sitemap: Exception fetching property slugs:", error);
    return [];
  }
}

export default async function sitemap() {
  // Obtener los slugs y fechas de actualización de todas las propiedades
  const properties = await getAllPropertySlugs();

  const propertyUrls = properties.map(property => ({
    url: `${SITE_URL}/propiedad/${property.slug}`,
    lastModified: property.updatedAt ? new Date(property.updatedAt).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly', // O 'daily' si cambian muy frecuentemente
    priority: 0.8, // Las páginas de propiedad son importantes
  }));

  // URLs estáticas de tu sitio
  const staticUrls = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/propiedades`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily', // La lista de propiedades puede cambiar a menudo
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/nosotros`,
      lastModified: new Date().toISOString().split('T')[0], // O la fecha real de última modificación si la tienes
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/servicios`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'yearly', // A menos que cambies mucho tus datos de contacto
      priority: 0.6,
    },
    // Añade otras URLs estáticas si las tienes
  ];

  return [...staticUrls, ...propertyUrls];
}