// frontend/postcss.config.mjs (Alternativa si la anterior no funciona y el error persiste)
// Asegúrate de tener @tailwindcss/postcss instalado: npm install -D @tailwindcss/postcss

// Si es postcss.config.mjs (ES Module)
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // Usando el paquete específico
    autoprefixer: {},
    // Otros plugins de PostCSS si los tienes
  },
};

// Si fuera postcss.config.js (CommonJS)
// module.exports = {
//   plugins: {
//     '@tailwindcss/postcss': {},
//     autoprefixer: {},
//   },
// };