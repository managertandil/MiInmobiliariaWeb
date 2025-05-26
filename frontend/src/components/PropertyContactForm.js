// frontend/src/components/PropertyContactForm.js
'use client';
import { useState } from 'react';
import toast from 'react-hot-toast'; // <--- IMPORTAR toast

export default function PropertyContactForm({ propertyTitle, propertyRef }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); 
  const [message, setMessage] = useState(
    `Hola, estoy interesado/a en la propiedad: ${propertyTitle || ''} (Ref: ${propertyRef || ''}). Quisiera más información.`
  );
  // const [status, setStatus] = useState(''); // Ya no se usa para el mensaje en la UI
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading('Enviando consulta...'); // Toast de carga con ID

    try {
      const res = await fetch('/api/contact-property', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message, propertyTitle, propertyRef }),
      });
      
      const result = await res.json();

      if (res.ok) {
        toast.success('¡Consulta enviada con éxito!', { id: toastId }); // Actualiza el toast
        setName(''); 
        setEmail(''); 
        setPhone(''); 
        // Opcional: No resetear el mensaje para que el usuario vea lo que envió, o sí resetearlo:
        // setMessage(`Hola, estoy interesado/a en la propiedad: ${propertyTitle || ''} (Ref: ${propertyRef || ''}). Quisiera más información.`);
      } else {
        throw new Error(result.message || `Error del servidor: ${res.status}`);
      }
    } catch (err) {
      console.error("PropertyContactForm - Error en handleSubmit:", err);
      toast.error(`Error: ${err.message || 'No se pudo enviar la consulta.'}`, { id: toastId }); // Actualiza el toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl">
      <h3 className="text-xl font-semibold text-schonfeld-blue-dark mb-6 text-center">
        Contactar por esta Propiedad
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor={`prop_form_name_${propertyRef}`} className="block text-sm font-medium text-gray-700 mb-1">Nombre y Apellido</label>
          <input type="text" id={`prop_form_name_${propertyRef}`} name="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-schonfeld-red focus:border-schonfeld-red"/>
        </div>
        <div className="mb-4">
          <label htmlFor={`prop_form_email_${propertyRef}`} className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" id={`prop_form_email_${propertyRef}`} name="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-schonfeld-red focus:border-schonfeld-red"/>
        </div>
        <div className="mb-4">
          <label htmlFor={`prop_form_phone_${propertyRef}`} className="block text-sm font-medium text-gray-700 mb-1">Teléfono (Opcional)</label>
          <input type="tel" id={`prop_form_phone_${propertyRef}`} name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-schonfeld-red focus:border-schonfeld-red"/>
        </div>
        <div className="mb-6">
          <label htmlFor={`prop_form_message_${propertyRef}`} className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
          <textarea id={`prop_form_message_${propertyRef}`} name="message" value={message} onChange={(e) => setMessage(e.target.value)} rows="4" required className="mt-1 block w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-schonfeld-red focus:border-schonfeld-red"></textarea>
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-schonfeld-red text-white font-semibold py-3 px-4 rounded-md hover:bg-opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-schonfeld-red disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Consulta'}
        </button>
        {/* El mensaje de estado ahora se maneja con toasts, por lo que este <p> ya no es necesario */}
        {/* {status && status !== 'Enviando...' && (
          <p className={`mt-4 text-center text-sm ${status.startsWith('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {status}
          </p>
        )} */}
      </form>
    </div>
  );
}