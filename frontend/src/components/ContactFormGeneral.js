// frontend/src/components/ContactFormGeneral.js
'use client';
import { useState } from 'react';
import toast from 'react-hot-toast'; // <--- IMPORTAR toast

export default function ContactFormGeneral() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  // const [status, setStatus] = useState(''); // Ya no se usa para el mensaje en la UI
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading('Enviando mensaje...'); // Toast de carga con ID

    try {
      const res = await fetch('/api/contact-property', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name, 
          email, 
          phone, 
          message,
          propertyTitle: "Consulta General desde Página de Contacto", 
          propertyRef: "N/A" 
        }),
      });
      
      const result = await res.json();

      if (res.ok) {
        toast.success('¡Mensaje enviado con éxito!', { id: toastId });
        setName(''); 
        setEmail(''); 
        setPhone('');
        setMessage('');
      } else {
        throw new Error(result.message || 'Error desconocido al enviar el mensaje.');
      }
    } catch (err) {
      console.error("Error al enviar formulario de contacto general:", err);
      toast.error(`Error: ${err.message || 'No se pudo enviar el mensaje.'}`, { id: toastId });
      // setStatus(`Error: ${err.message || 'No se pudo enviar el mensaje.'}`); // Ya no
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-schonfeld-blue-dark mb-6 text-center md:text-left">Envianos tu Consulta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="gen_form_name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
          <input type="text" name="gen_form_name" id="gen_form_name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-schonfeld-red focus:border-schonfeld-red"/>
        </div>
        <div className="mb-4">
          <label htmlFor="gen_form_email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" name="gen_form_email" id="gen_form_email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-schonfeld-red focus:border-schonfeld-red"/>
        </div>
        <div className="mb-4">
          <label htmlFor="gen_form_phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono (Opcional)</label>
          <input type="tel" name="gen_form_phone" id="gen_form_phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-schonfeld-red focus:border-schonfeld-red"/>
        </div>
        <div className="mb-6">
          <label htmlFor="gen_form_message" className="block text-sm font-medium text-gray-700 mb-1">Tu Mensaje</label>
          <textarea name="gen_form_message" id="gen_form_message" rows="5" value={message} onChange={(e) => setMessage(e.target.value)} required className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-schonfeld-red focus:border-schonfeld-red"></textarea>
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-schonfeld-red text-white font-semibold py-3 px-4 rounded-md hover:bg-opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-schonfeld-red disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
        {/* El mensaje de estado ahora se maneja con toasts */}
        {/* {status && status !== 'Enviando...' && (
          <p className={`mt-4 text-center text-sm ${status.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {status}
          </p>
        )} */}
      </form>
    </div>
  );
}