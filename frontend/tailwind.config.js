// frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Rutas a todos tus archivos de plantilla (páginas, componentes)
  // donde Tailwind buscará clases para generar el CSS.
  // Asegúrate de que estas rutas cubran todos los lugares donde usas clases de Tailwind.
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}', // Si tuvieras una carpeta 'pages' (para Page Router antiguo)
    './src/components/**/*.{js,ts,jsx,tsx,mdx}', // Para tus componentes
    './src/app/**/*.{js,ts,jsx,tsx,mdx}', // MUY IMPORTANTE para el App Router de Next.js
  ],
  theme: {
    // Aquí puedes extender el tema por defecto de Tailwind.
    // Si quieres SOBRESCRIBIR algo del tema por defecto (ej. la paleta de colores entera),
    // lo pondrías directamente dentro de `theme: { ... }` en lugar de `theme: { extend: { ... } }`.
    // Pero para añadir colores personalizados, `extend` es lo correcto.
    extend: {
      colors: {
        // Tus colores personalizados
        'schonfeld-blue-dark': '#143159',
        'schonfeld-red': '#e90000',
        'schonfeld-gray': '#8492a6',
        'schonfeld-blue-medium': '#164e78',
        // Ejemplo de cómo añadir un rojo más oscuro para hovers si lo necesitas:
        // 'schonfeld-red-dark': '#c30000', // Ajusta el valor hexadecimal
      },
      backgroundImage: {
        // Estos son ejemplos que vienen a veces por defecto, puedes quitarlos si no los usas.
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // Aquí puedes extender otras partes del tema como fuentes, espaciado, breakpoints, etc.
      // Ejemplo de fuentes (si las configuras):
      // fontFamily: {
      //   sans: ['TuFuentePrincipal', 'system-ui', 'sans-serif'],
      //   serif: ['TuFuenteSerif', 'Georgia', 'serif'],
      // },
    },
  },
  // Aquí puedes añadir plugins de Tailwind.
  plugins: [
    // Ejemplo de plugins comunes (necesitarías instalarlos primero con npm/yarn):
    // require('@tailwindcss/forms'),        // Para mejores estilos base de formularios
    // require('@tailwindcss/typography'),   // Para estilizar contenido HTML generado (prose classes)
    // require('@tailwindcss/aspect-ratio'), // Para controlar la relación de aspecto de elementos
  ],
};