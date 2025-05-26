// frontend/src/app/layout.js
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Toaster } from 'react-hot-toast'; // <--- IMPORTAR Toaster

export const metadata = {
  title: 'Schonfeld Desarrollos Inmobiliarios',
  description: 'Venta y alquiler de propiedades en Tandil y la zona.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        {/* --- AÑADIR EL COMPONENTE Toaster AQUÍ --- */}
        <Toaster 
          position="bottom-right" // Posición de los toasts
          toastOptions={{
            // Opciones por defecto para todos los toasts
            duration: 5000, // Duración en milisegundos
            style: {
              background: '#333', // Fondo oscuro
              color: '#fff',      // Texto blanco
              fontSize: '15px',
            },
            // Opciones específicas para toasts de éxito
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981', // Color del icono de éxito (verde)
                secondary: '#fff',
              },
            },
            // Opciones específicas para toasts de error
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#EF4444', // Color del icono de error (rojo)
                secondary: '#fff',
              },
            },
            // Opciones para toasts de carga (loading)
            loading: {
                iconTheme: {
                    primary: '#3B82F6', // Color del icono de carga (azul)
                    secondary: 'rgba(0,0,0,0.1)',
                }
            }
          }}
        />
        {/* --- FIN Toaster --- */}
      </body>
    </html>
  );
}