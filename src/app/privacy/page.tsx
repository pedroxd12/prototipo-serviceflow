"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Shield, 
  Lock, 
  Database, 
  FileText, 
  UserCheck, 
  Globe 
} from "lucide-react";

export default function PrivacyPolicy() {
  const privacySections = [
    {
      icon: Shield,
      title: "Información que Recopilamos",
      content: "Recopilamos información personal necesaria para proporcionar y mejorar nuestros servicios. Esto puede incluir nombre, correo electrónico, información de contacto y datos de uso de la plataforma."
    },
    {
      icon: Lock,
      title: "Protección de Datos",
      content: "Implementamos medidas de seguridad de vanguardia para proteger tu información personal. Utilizamos encriptación SSL, almacenamiento seguro y protocolos de seguridad actualizados constantemente."
    },
    {
      icon: Database,
      title: "Uso de la Información",
      content: "Utilizamos tu información para gestionar tu cuenta, mejorar nuestros servicios, personalizar tu experiencia y comunicarnos contigo sobre actualizaciones y novedades relacionadas con ServiceFlow."
    },
    {
      icon: FileText,
      title: "Cookies y Tecnologías de Seguimiento",
      content: "Utilizamos cookies y tecnologías similares para mejorar la funcionalidad de nuestro sitio, analizar el tráfico y personalizar contenido. Puedes gestionar tus preferencias de cookies en cualquier momento."
    },
    {
      icon: UserCheck,
      title: "Tus Derechos",
      content: "Tienes derecho a acceder, corregir, eliminar o limitar el procesamiento de tus datos personales. Puedes ejercer estos derechos contactándonos en cualquier momento."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
      {/* Header Section */}
      <motion.header
        className="container mx-auto px-4 py-16 md:py-24 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Shield className="mx-auto text-blue-600 w-16 h-16 mb-4" />
            <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
              Política de Privacidad
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              En ServiceFlow, nos comprometemos a proteger tu información personal y garantizar tu privacidad.
            </p>
          </motion.div>
        </div>
      </motion.header>

      {/* Privacy Sections */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {privacySections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1 
              }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all group"
            >
              <div className="bg-blue-100 p-4 rounded-full w-fit mb-4 group-hover:bg-blue-200 transition-colors">
                <section.icon className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">
                {section.title}
              </h3>
              <p className="text-gray-600">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed Privacy Information */}
      <section className="container mx-auto px-4 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Información Detallada
          </h2>
          
          <div className="space-y-6 text-gray-700">
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Consentimiento
              </h3>
              <p>
                Al utilizar ServiceFlow, consientes el procesamiento de tus datos personales según se describe en esta política de privacidad.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Transferencia Internacional de Datos
              </h3>
              <p>
                Tus datos pueden ser transferidos y procesados en servidores ubicados fuera de tu país de residencia. Tomamos medidas para garantizar que estas transferencias cumplan con las leyes de protección de datos aplicables.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-3">
                Contacto de Privacidad
              </h3>
              <p>
                Si tienes preguntas o inquietudes sobre nuestra política de privacidad, contáctanos a:
              </p>
              <div className="mt-4 flex items-center space-x-3">
                <Globe className="text-blue-600 w-6 h-6" />
                <a 
                  href="mailto:privacidad@serviceflow.com" 
                  className="text-blue-600 hover:underline"
                >
                  privacidad@serviceflow.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <motion.section 
        className="bg-blue-900 text-white py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Comprometidos con tu Privacidad
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Actualizamos constantemente nuestra política para garantizar la máxima protección de tus datos.
          </p>
          <Link 
            href="/contactanos" 
            className="bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-blue-100 transition-all"
          >
            Contáctanos
          </Link>
        </div>
      </motion.section>
    </div>
  );
}