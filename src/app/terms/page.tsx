// app/terms/page.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsAndConditionsPage() {
  const sections = [
    {
      title: "1. Aceptación de los Términos",
      content: "Al acceder y utilizar los servicios de ServiceFlow (en adelante, el 'Servicio'), usted acepta estar sujeto a estos Términos y Condiciones (en adelante, 'Términos'). Si no está de acuerdo con alguna parte de los términos, no podrá acceder al Servicio."
    },
    {
      title: "2. Descripción del Servicio",
      content: "ServiceFlow proporciona una plataforma para la gestión de servicios técnicos, incluyendo programación, seguimiento de clientes, y gestión de pagos de suscripción. Nos reservamos el derecho de modificar o discontinuar el Servicio con o sin previo aviso."
    },
    {
      title: "3. Cuentas de Usuario",
      content: "Para acceder a ciertas funciones del Servicio, es posible que deba registrarse para obtener una cuenta. Usted es responsable de mantener la confidencialidad de la información de su cuenta, incluyendo su contraseña, y de todas las actividades que ocurran bajo su cuenta. Acepta notificar inmediatamente a ServiceFlow cualquier uso no autorizado de su cuenta."
    },
    {
      title: "4. Pagos y Suscripciones",
      content: "Algunas partes del Servicio pueden estar disponibles solo mediante el pago de una tarifa de suscripción. Usted acepta pagar todas las tarifas aplicables por su uso del Servicio. Las tarifas de suscripción se facturarán de forma recurrente (por ejemplo, mensual o anualmente) a menos que y hasta que cancele su suscripción. Todas las tarifas no son reembolsables, excepto según lo exija la ley."
    },
    {
      title: "5. Contenido del Usuario",
      content: "Usted es el único responsable de todo el contenido que cargue, publique, envíe por correo electrónico, transmita o ponga a disposición de otro modo a través del Servicio ('Contenido del Usuario'). Usted conserva todos los derechos sobre su Contenido del Usuario, pero otorga a ServiceFlow una licencia mundial, no exclusiva, libre de regalías para usar, reproducir, modificar y distribuir su Contenido del Usuario en relación con la prestación del Servicio."
    },
    {
      title: "6. Conducta Prohibida",
      content: "Usted se compromete a no utilizar el Servicio para: Violar cualquier ley o regulación aplicable; Infringir los derechos de propiedad intelectual de terceros; Transmitir cualquier material que sea ilegal, dañino, amenazante, abusivo, acosador, difamatorio, vulgar, obsceno o de cualquier otro modo objetable; Suplantar a cualquier persona o entidad, o declarar falsamente o tergiversar su afiliación con una persona o entidad."
    },
    {
      title: "7. Terminación",
      content: "Podemos suspender o cancelar su acceso al Servicio en cualquier momento, con o sin causa, con o sin previo aviso, con efecto inmediato. Si desea cancelar su cuenta, simplemente puede dejar de usar el Servicio o contactarnos para solicitar la eliminación de la cuenta."
    },
    {
      title: "8. Limitación de Responsabilidad",
      content: "En la máxima medida permitida por la ley aplicable, en ningún caso ServiceFlow será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo, o cualquier pérdida de beneficios o ingresos, ya sea incurrida directa o indirectamente, o cualquier pérdida de datos, uso, fondo de comercio u otras pérdidas intangibles, resultantes de su acceso o uso o incapacidad para acceder o usar el servicio."
    },
    {
      title: "9. Cambios a los Términos",
      content: "Nos reservamos el derecho, a nuestra entera discreción, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es material, intentaremos proporcionar al menos 30 días de aviso antes de que entren en vigor los nuevos términos. Lo que constituye un cambio material se determinará a nuestra entera discreción."
    },
    {
        title: "10. Ley Aplicable",
        content: "Estos Términos se regirán e interpretarán de acuerdo con las leyes de México, sin tener en cuenta sus disposiciones sobre conflicto de leyes."
    },
    {
      title: "11. Contacto",
      content: "Si tiene alguna pregunta sobre estos Términos, contáctenos en legal@serviceflow.com."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-xl"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center mb-4 sm:mb-0">
              <FileText className="w-12 h-12 text-blue-600 mr-4" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-blue-900">Términos y Condiciones</h1>
                <p className="text-gray-600">Última actualización: 07 de Mayo, 2025</p>
              </div>
            </div>
             <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
              <ArrowLeft size={20} className="mr-2" />
              Volver al Dashboard
            </Link>
          </div>

          <div className="prose prose-blue max-w-none text-gray-700">
            <p className="lead text-lg mb-6">
              Bienvenido a ServiceFlow. Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web y los servicios de ServiceFlow.
            </p>

            {sections.map((section, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-semibold text-blue-800 mb-3 flex items-center">
                  <AlertCircle size={22} className="mr-3 text-blue-500" />
                  {section.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">{section.content}</p>
              </motion.section>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: sections.length * 0.1 + 0.5, duration: 0.5}}
            className="mt-12 pt-6 border-t border-gray-200 text-center"
            >
             <p className="text-sm text-gray-500">
                Al utilizar ServiceFlow, usted indica su aceptación de estos Términos y Condiciones.
            </p>
           </motion.div>

        </motion.div>
      </div>
    </div>
  );
}
// Para el estilo de `prose`, asegúrate de tener instalado `@tailwindcss/typography`
// y agrégalo a tus plugins en `tailwind.config.js`:
// plugins: [require('@tailwindcss/typography')],