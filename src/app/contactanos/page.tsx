"use client";

import Image from "next/image";
// Link no se usa directamente pero se mantiene por si se necesita en el futuro.
import { motion } from "framer-motion";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  CheckCircle, 
  Target, 
  Award,
  Navigation // Icono para el botón de ruta
} from "lucide-react";
import { useState } from "react";

export default function Contactanos() {
  const [activeSection, setActiveSection] = useState('about');

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const navigationTabs = [
    { key: 'about', label: 'Nosotros' },
    { key: 'contact', label: 'Contacto' },
  ];

  const direccion = "3er sector de fidelac, melchor ocampo 60954, Lázaro Cárdenas, Michoacán";
  const direccionUrlEncoded = encodeURIComponent(direccion);
  
  const mapEmbedUrl = `https://maps.google.com/maps?q=${direccionUrlEncoded}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${direccionUrlEncoded}`;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen text-gray-800">
      <div className="container mx-auto px-4 pt-10 pb-6">
        <div className="flex justify-center space-x-6 md:space-x-8 border-b border-gray-200">
          {navigationTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key)}
              className={`
                pb-3 px-1 text-sm font-medium transition-all duration-300
                focus:outline-none
                ${activeSection === tab.key 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-500 hover:text-blue-600 border-b-2 border-transparent hover:border-gray-300'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeSection === 'about' && (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto px-6 md:px-4 py-12 md:py-16"
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8">
                Sobre ServiceFlow
              </h2>
              <div className="space-y-6 text-gray-700">
                <div className="flex items-start space-x-4">
                  <Target className="text-blue-600 w-6 h-6 flex-shrink-0 mt-1" />
                  <p className="text-lg">
                    <strong>Misión:</strong> Optimizar la gestión de servicios técnicos mediante soluciones tecnológicas innovadoras que impulsen la eficiencia y satisfacción del cliente.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="text-green-600 w-6 h-6 flex-shrink-0 mt-1" />
                  <p className="text-lg">
                    <strong>Visión:</strong> Ser la plataforma líder y referente en la automatización y gestión inteligente de servicios, transformando la forma en que las empresas operan y crecen.
                  </p>
                </div>
                <div className="flex items-start space-x-4">
                  <Award className="text-yellow-600 w-6 h-6 flex-shrink-0 mt-1" />
                  <p className="text-lg">
                    <strong>Valores:</strong> Innovación constante, compromiso con el cliente, eficiencia operativa y excelencia en cada solución que desarrollamos.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-8 md:mt-0">
              <motion.div
                whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
                transition={{ type: "spring", stiffness: 300 }}
                className="rounded-xl overflow-hidden"
              >
                <Image 
                  src="/logo.svg"
                  alt="ServiceFlow Oficinas" 
                  width={450}
                  height={360}
                  className="rounded-xl object-cover"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {activeSection === 'contact' && (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto px-6 md:px-4 py-12 md:py-16"
        >
          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-8">
                Información de Contacto
              </h2>
              <div className="space-y-5">
                <div className="flex items-center space-x-4">
                  <MapPin className="text-blue-600 w-7 h-7 flex-shrink-0" />
                  <p className="text-gray-600 text-lg">{direccion}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-blue-600 w-7 h-7 flex-shrink-0" />
                  <p className="text-gray-600 text-lg">+52 558 743 4105</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-blue-600 w-7 h-7 flex-shrink-0" />
                  <p className="text-gray-600 text-lg">contacto@serviceflow.com</p>
                </div>
                <div className="flex space-x-5 pt-5">
                  {[
                    { icon: Facebook, href: "https://facebook.com", name: "facebook" },
                    { icon: Twitter, href: "https://twitter.com", name: "twitter" },
                    { icon: Instagram, href: "https://instagram.com", name: "instagram" }
                  ].map(({ icon: Icon, href, name }) => (
                    <motion.a 
                      key={name}
                      href={href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -2 }}
                      className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    >
                      <Icon className="w-7 h-7" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-blue-800 mb-5">
                Nuestra Ubicación
              </h3>
              <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="350" // Altura ajustada para el mapa
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <motion.a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full md:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Navigation className="w-5 h-5 mr-2" />
                Cómo llegar
              </motion.a>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}