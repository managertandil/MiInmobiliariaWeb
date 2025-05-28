// frontend/postcss.config.mjs (o postcss.config.js si no usas módulos ES)

// Si es postcss.config.mjs (ES Module)
export default {
  plugins: {
    tailwindcss: {}, // Tailwind CSS se registra a sí mismo
    autoprefixer: {},
  },
};

// Si fuera postcss.config.js (CommonJS)
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// };