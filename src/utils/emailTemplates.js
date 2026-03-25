/**
 * Email templates para La Casita de Mami
 * Plantillas de correo para confirmación y notificaciones
 */

export function generateConfirmationEmail(formData) {
  return {
    to: formData.parentEmail,
    subject: `Solicitud Recibida - La Casita de Mami (${new Date().getFullYear()})`,
    html: `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              color: #333;
              line-height: 1.6;
              max-width: 600px;
              margin: 0 auto;
              background-color: #f9fafb;
            }
            .container {
              background-color: white;
              margin: 20px;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%);
              color: white;
              padding: 40px 20px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 28px;
              font-weight: 700;
            }
            .content {
              padding: 40px 20px;
            }
            .section {
              margin-bottom: 30px;
            }
            .section h2 {
              font-size: 18px;
              font-weight: 700;
              color: #1f2937;
              margin-bottom: 15px;
              padding-bottom: 10px;
              border-bottom: 2px solid #e5e7eb;
            }
            .field {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #f3f4f6;
            }
            .field:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: 600;
              color: #6b7280;
            }
            .value {
              color: #1f2937;
              font-weight: 500;
            }
            .status-badge {
              display: inline-block;
              background-color: #d1fae5;
              color: #065f46;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 13px;
              font-weight: 700;
              margin-top: 10px;
            }
            .next-steps {
              background-color: #f0f9ff;
              padding: 20px;
              border-radius: 8px;
              border-left: 4px solid #0ea5e9;
              margin: 25px 0;
            }
            .next-steps h3 {
              margin-top: 0;
              color: #0369a1;
              font-size: 16px;
            }
            .next-steps ol {
              margin: 10px 0;
              padding-left: 20px;
            }
            .next-steps li {
              margin: 8px 0;
              color: #1e40af;
            }
            .contact-box {
              background-color: #fff7ed;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              text-align: center;
              border: 1px solid #fed7aa;
            }
            .contact-box p {
              margin: 5px 0;
              color: #b45309;
            }
            .footer {
              background-color: #f3f4f6;
              padding: 20px;
              text-align: center;
              font-size: 12px;
              color: #6b7280;
            }
            .footer a {
              color: #2dd4bf;
              text-decoration: none;
            }
            .button {
              display: inline-block;
              background-color: #2dd4bf;
              color: white;
              padding: 12px 24px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
              margin: 20px auto;
              display: block;
              width: fit-content;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✓ ¡Solicitud Recibida!</h1>
            </div>

            <div class="content">
              <p>Hola <strong>${formData.parentFullName.split(' ')[0]}</strong>,</p>
              
              <p>Recibimos correctamente tu solicitud de pre-inscripción para <strong>${formData.studentFullName}</strong>. Nos alegra mucho que te intereses en La Casita de Mami.</p>

              <div class="section">
                <h2>Datos de tu Solicitud</h2>
                
                <div class="field">
                  <span class="label">Número de Solicitud:</span>
                  <span class="value">#PRE-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}</span>
                </div>

                <div class="field">
                  <span class="label">Niño/a:</span>
                  <span class="value">${formData.studentFullName}</span>
                </div>

                <div class="field">
                  <span class="label">Edad:</span>
                  <span class="value">${formData.studentAge} años</span>
                </div>

                <div class="field">
                  <span class="label">Nivel Deseado:</span>
                  <span class="value">${formData.desiredLevel}</span>
                </div>

                <div class="field">
                  <span class="label">Contacto:</span>
                  <span class="value">${formData.parentPhone}</span>
                </div>

                <div class="field">
                  <span class="label">Fecha de Registro:</span>
                  <span class="value">${new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>

                <div class="status-badge">Pendiente de Revisión</div>
              </div>

              <div class="next-steps">
                <h3>¿Qué sigue ahora?</h3>
                <ol>
                  <li><strong>Revisión</strong> - Nuestro equipo revisará tu solicitud (1-2 horas)</li>
                  <li><strong>Contacto</strong> - Te llamaremos para confirmar disponibilidad</li>
                  <li><strong>Visita Guiada</strong> - Coordinaremos una cita para que conozcas nuestro espacio</li>
                  <li><strong>Decisión</strong> - Completamos el proceso de admisión</li>
                </ol>
              </div>

              <div class="contact-box">
                <p><strong>¿Necesitas ayuda?</strong></p>
                <p>📞 Llama: <strong>+51 908 880 326</strong></p>
                <p>💬 WhatsApp: <strong>+51 908 880 326</strong></p>
                <p>📧 Correo: <strong>lacasitademamisurco@gmail.com</strong></p>
                <p style="font-size: 11px; margin-top: 10px;">Lunes a Viernes · 8:00 a.m. a 6:00 p.m.</p>
              </div>

              <p style="color: #6b7280; font-size: 14px;">Si tienes dudas sobre tu solicitud, no dudes en contactarnos. Estamos aquí para ayudarte.</p>
            </div>

            <div class="footer">
              <p style="margin: 0; margin-bottom: 10px;">La Casita de Mami | Educación Inicial en Surco</p>
              <p style="margin: 0;">Calle Morropon 105, Santiago de Surco, Lima · Perú</p>
              <p style="margin-top: 15px; color: #999;">Este es un correo automático. Por favor no respondas a este mensaje.</p>
            </div>
          </div>
        </body>
      </html>
    `,
  }
}

export function generateAdminNotification(formData) {
  return {
    to: 'lacasitademamisurco@gmail.com',
    subject: `Nueva Pre-inscripción: ${formData.studentFullName} - ${new Date().toLocaleDateString('es-PE')}`,
    html: `
      <!DOCTYPE html>
      <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              color: #333;
              line-height: 1.6;
            }
            .container {
              background-color: white;
              padding: 20px;
              border-radius: 8px;
              max-width: 600px;
              margin: 0 auto;
            }
            h2 { color: #2dd4bf; }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
            }
            td {
              padding: 10px;
              border-bottom: 1px solid #e5e7eb;
            }
            .label { font-weight: 700; width: 30%; background-color: #f9fafb; }
            .value { color: #1f2937; }
            .workshop-tags {
              display: flex;
              flex-wrap: wrap;
              gap: 8px;
              margin-top: 5px;
            }
            .tag {
              background-color: #dbeafe;
              color: #1e40af;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>📋 Nueva Pre-inscripción Recibida</h2>
            
            <h3>Información del Apoderado</h3>
            <table>
              <tr>
                <td class="label">Nombre Completo</td>
                <td class="value">${formData.parentFullName}</td>
              </tr>
              <tr>
                <td class="label">Teléfono</td>
                <td class="value">${formData.parentPhone}</td>
              </tr>
              <tr>
                <td class="label">Correo</td>
                <td class="value"><a href="mailto:${formData.parentEmail}">${formData.parentEmail}</a></td>
              </tr>
              <tr>
                <td class="label">DNI</td>
                <td class="value">${formData.parentDNI}</td>
              </tr>
              <tr>
                <td class="label">Relación</td>
                <td class="value">${formData.parentRelation}</td>
              </tr>
            </table>

            <h3>Información del Niño/a</h3>
            <table>
              <tr>
                <td class="label">Nombre</td>
                <td class="value">${formData.studentFullName}</td>
              </tr>
              <tr>
                <td class="label">Fecha Nacimiento</td>
                <td class="value">${formData.studentBirthDate}</td>
              </tr>
              <tr>
                <td class="label">Edad</td>
                <td class="value">${formData.studentAge} años</td>
              </tr>
              <tr>
                <td class="label">Nivel Deseado</td>
                <td class="value">${formData.desiredLevel}</td>
              </tr>
              <tr>
                <td class="label">Colegio Anterior</td>
                <td class="value">${formData.previousSchool || 'No especificado'}</td>
              </tr>
            </table>

            <h3>Preferencias y Observaciones</h3>
            <table>
              <tr>
                <td class="label">Talleres de Interés</td>
                <td class="value">
                  ${formData.workshopPreferences.length > 0 
                    ? `<div class="workshop-tags">${formData.workshopPreferences.map(w => `<span class="tag">${w}</span>`).join('')}</div>`
                    : 'Ninguno seleccionado'
                  }
                </td>
              </tr>
              <tr>
                <td class="label">Condiciones Médicas</td>
                <td class="value">${formData.medicalConditions || 'Ninguna'}</td>
              </tr>
              <tr>
                <td class="label">¿Cómo se enteró?</td>
                <td class="value">${formData.howDidYouHear}</td>
              </tr>
              <tr>
                <td class="label">Horario Preferido</td>
                <td class="value">${formData.preferredSchedule}</td>
              </tr>
            </table>

            ${formData.additionalComments ? `
              <h3>Comentarios Adicionales</h3>
              <p style="background-color: #fef3c7; padding: 10px; border-radius: 4px; border-left: 4px solid #f59e0b;">
                ${formData.additionalComments}
              </p>
            ` : ''}

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #6b7280; font-size: 12px;">
              Solicitud recibida: ${new Date().toLocaleString('es-PE', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </body>
      </html>
    `,
  }
}
