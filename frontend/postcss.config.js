// frontend/postcss.config.js

module.exports = {
  plugins: {
    // Opción 1: La forma moderna y más común (intenta esta primero)
    tailwindcss: {}, 
    autoprefixer: {},

    // Opción 2: Si la Opción 1 sigue dando el error específico sobre "@tailwindcss/postcss"
    // entonces comenta la línea de arriba "tailwindcss: {}," y descomenta la siguiente:
    // '@tailwindcss/postcss': {}, 
  },
};