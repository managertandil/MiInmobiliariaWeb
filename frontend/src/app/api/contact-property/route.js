// frontend/src/app/api/contact-property/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  console.log("API Route /api/contact-property: Petición POST recibida."); // Log inicial
  try {
    const body = await request.json();
    console.log("API Route - Cuerpo de la petición:", body); // Log del cuerpo

    const { name, email, message, propertyTitle, propertyRef, phone } = body;

    if (!name || !email || !message) {
      console.log("API Route - Error: Faltan campos requeridos.");
      return NextResponse.json({ message: 'Faltan campos requeridos: nombre, email y mensaje.' }, { status: 400 });
    }

    // Configuración del transporter de Nodemailer (USA TUS VARIABLES DE ENTORNO)
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT || 465), // Puerto como número
      secure: process.env.EMAIL_SERVER_PORT === '465', // true si el puerto es 465, false para otros como 587
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD, // Esta es la contraseña de aplicación si usas Gmail
      },
      // Opcional: Descomentar para desarrollo si tienes problemas con certificados autofirmados o locales
      // tls: {
      //   rejectUnauthorized: false,
      // },
    });
    console.log("API Route - Transporter configurado.");

    let emailSubject = `Nueva Consulta de ${name}: ${propertyTitle || 'Consulta General'} (Ref: ${propertyRef || 'N/A'})`;
    if (propertyTitle === "Consulta General desde Página de Contacto") { // Este es el título que pusimos en ContactFormGeneral
        emailSubject = `Nueva Consulta General de la web de: ${name}`;
    }
    
    let emailHtml = `
      <h2>Nueva Consulta Recibida</h2>
      <p>Has recibido una nueva consulta a través de tu sitio web.</p>
      <h3>Detalles del Contacto:</h3>
      <ul>
        <li><strong>Nombre:</strong> ${name}</li>
        <li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li>`;
    
    if (phone && phone.trim() !== '') {
      emailHtml += `<li><strong>Teléfono:</strong> ${phone}</li>`;
    }

    // Diferenciar si es consulta general o de propiedad específica
    if (propertyTitle && propertyTitle !== "Consulta General desde Página de Contacto" && propertyRef && propertyRef !== "N/A") {
        emailHtml += `
          </ul>
          <h3>Detalles de la Propiedad Consultada:</h3>
          <ul>
            <li><strong>Propiedad:</strong> ${propertyTitle}</li>
            <li><strong>Referencia:</strong> ${propertyRef}</li>`;
    } else {
        emailHtml += `<li><strong>Asunto:</strong> Consulta General</li>`;
    }
        
    emailHtml += `
      </ul>
      <h3>Mensaje:</h3>
      <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p> {/* white-space para mantener saltos de línea del textarea */}
      <hr>
      <p><em>Puedes responder directamente a este email para contactar al usuario.</em></p>
    `;

    const mailOptions = {
      from: `"Tu Inmobiliaria Schonfeld" <${process.env.EMAIL_FROM || process.env.EMAIL_SERVER_USER}>`, // Remitente visible
      to: process.env.EMAIL_TO,      
      replyTo: email,                
      subject: emailSubject,
      html: emailHtml,
    };

    console.log("API Route - Intentando enviar email...");
    await transporter.sendMail(mailOptions);
    console.log("API Route - Email enviado con éxito.");
    
    return NextResponse.json({ message: 'Consulta enviada con éxito.' }, { status: 200 });

  } catch (error) {
    console.error('API Route - Error completo en /api/contact-property:', error);
    let errorMessage = 'Error interno del servidor al procesar la consulta.';
    let statusCode = 500;

    if (error.responseCode === 535) { 
      errorMessage = 'Error de autenticación con el servidor de email. Verifica las credenciales en .env.local.';
      statusCode = 401; // Unauthorized o error de servidor específico
    } else if (error.code === 'ECONNECTION' || error.code === 'EENVELOPE') {
      errorMessage = 'No se pudo conectar al servidor de email o hubo un problema con la dirección. Verifica la configuración.';
      statusCode = 503; // Service Unavailable
    } else if (error.message.includes('Faltan campos')) {
        errorMessage = error.message;
        statusCode = 400;
    }
    
    return NextResponse.json({ message: errorMessage, errorDetails: error.message || String(error) }, { status: statusCode });
  }
}