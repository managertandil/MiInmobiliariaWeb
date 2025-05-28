// frontend/next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // No es necesario especificar 'port' si es el default (443 para https)
        // 'pathname: /**' permite cualquier ruta dentro de ese hostname de Cloudinary.
        pathname: '/**', 
      },
      { 
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // Puerto de tu Strapi local
        pathname: '/uploads/**', // Ruta de tus uploads locales en Strapi
      },
    ],
  },
};

export default nextConfig;