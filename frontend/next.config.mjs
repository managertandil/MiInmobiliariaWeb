// frontend/next.config.js o next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aquí podrías tener otras configuraciones como reactStrictMode, etc.
  // Si no tienes otras, puedes dejarlo así o añadir reactStrictMode: true, por ejemplo.
  // reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '', // Puerto por defecto para https (443)
        // pathname: '/**', // Opción más general y simple para empezar
        // Opción más específica y segura (recomendada):
        // Necesitarás definir NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME en tu .env.local
        pathname: `/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'TU_CLOUD_NAME_AQUI'}/image/upload/**`, 
      },
      {
        // Para permitir imágenes locales de Strapi durante el desarrollo
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // Asegúrate que este sea el puerto de tu Strapi
        pathname: '/uploads/**',
      },
      // Puedes añadir más patrones aquí para otros dominios si los necesitas
    ],
  },
};

export default nextConfig;