import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Políticas de Privacidad | Level Studio',
  description: 'Políticas de privacidad y manejo de datos de Level Studio.',
};

export default function PrivacidadPage() {
  return (
    <div className="bg-white min-h-screen text-zinc-900 py-20 px-6 md:px-20 lg:px-40 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 mb-10 transition-colors uppercase tracking-widest text-xs font-bold">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>
        
        <h1 className="text-4xl md:text-6xl font-gloock uppercase mb-12">
          Políticas de <span className="text-zinc-500 font-nothing normal-case tracking-tight block md:inline mt-2 md:mt-0">Privacidad</span>
        </h1>
        
        <div className="space-y-8 text-zinc-600 font-light leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-wider mb-4">1. Información General</h2>
            <p>
              En Level Studio, respetamos su privacidad y estamos comprometidos a proteger los datos de nuestros usuarios. 
              Esta política de privacidad explica cómo recopilamos y tratamos la información cuando usted visita nuestro sitio web.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-wider mb-4">2. Analíticas Web y Cookies (Navegación Anónima)</h2>
            <p>
              Nuestro sitio web utiliza herramientas de analítica (Google Analytics) configuradas bajo un <strong>modo de consentimiento estricto ("Cookieless")</strong>. 
              Esto significa que:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>No instalamos cookies de seguimiento en su dispositivo para fines analíticos ni publicitarios.</li>
              <li>No recopilamos información personal identificable a través de nuestras analíticas.</li>
              <li>Solo recopilamos información estadística anónima sobre la navegación (como páginas visitadas o clics) para entender el rendimiento de nuestra web, lo cual no requiere su consentimiento explícito de cookies según la normativa vigente.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-wider mb-4">3. Agenda de Citas y Terceros</h2>
            <p>
              Para la gestión de reservas, utilizamos la plataforma AgendaPro. Al hacer clic en "Agendar Cita", usted será redirigido a un sitio externo operado por AgendaPro. 
              Cualquier dato personal que ingrese para completar su reserva estará sujeto a las políticas de privacidad y términos de servicio de dicha plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-wider mb-4">4. Contacto por WhatsApp</h2>
            <p>
              Si decide contactarnos a través del botón de WhatsApp, la comunicación se realizará a través de dicha aplicación. 
              El número de teléfono que utilice y la información que decida compartir voluntariamente serán tratados exclusivamente para responder a su consulta y brindarle el servicio solicitado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-wider mb-4">5. Enlaces Externos</h2>
            <p>
              Nuestro sitio web puede contener enlaces a otros sitios de interés, como nuestras redes sociales (Instagram, TikTok). 
              Una vez que usted haga clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre el sitio al que es redirigido y, por lo tanto, 
              no somos responsables de la protección de sus datos en esos sitios externos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-wider mb-4">6. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de actualizar o modificar estas políticas de privacidad en cualquier momento. 
              Le recomendamos revisar esta página periódicamente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-zinc-900 uppercase tracking-wider mb-4">7. Contacto</h2>
            <p>
              Si tiene alguna duda sobre nuestras políticas de privacidad, puede contactarnos en:
              <br />
              <strong>Correo:</strong> contacto@levelstudio.cl
              <br />
              <strong>Dirección:</strong> Av. Apoquindo 4900, Loc 29, Las Condes, Región Metropolitana.
            </p>
          </section>
          
          <p className="text-sm mt-12 text-zinc-400">
            Última actualización: {new Date().toLocaleDateString('es-CL')}
          </p>
        </div>
      </div>
    </div>
  );
}
