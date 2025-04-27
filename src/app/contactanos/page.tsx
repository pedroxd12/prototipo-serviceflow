"use client";

import Image from "next/image";
import Link from "next/link";
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
  Award 
} from "lucide-react";
import { useState } from "react";

export default function Contactanos() {
  const [activeSection, setActiveSection] = useState('about');

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const teamMembers = [
    { name: "Pedro Villatoro", role: "CEO y Full-stack", image: "/integrantes/yo.jpg" },
    { name: "Alondra Martinez", role: "Directora de diseño", image: "/integrantes/alondra.jpg" },
    { name: "Diego Rincón", role: "Programador back-end", image: "/integrantes/diego.jpg"},
    { name: "Gloria Estefanía", role: "Programadora Front-end", image: "/integrantes/gloria.jpg" }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 pt-8">
        <div className="flex justify-center space-x-4 mb-8">
          {[
            { key: 'about', label: 'Nosotros' },
            { key: 'contact', label: 'Contacto' },
            { key: 'team', label: 'Nuestro Equipo' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveSection(tab.key)}
              className={`
                px-4 py-2 rounded-lg transition-all duration-300 
                ${activeSection === tab.key 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* About Section */}
      {activeSection === 'about' && (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto px-4 py-8 md:py-16"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Sobre ServiceFlow</h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex items-center space-x-3">
                  <Target className="text-blue-600 w-6 h-6" />
                  <p className="text-lg">
                    <strong>Misión:</strong> Optimizar la gestión de servicios técnicos mediante soluciones tecnológicas innovadoras.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-600 w-6 h-6" />
                  <p className="text-lg">
                    <strong>Visión:</strong> Ser la plataforma líder en automatización de servicios, transformando la eficiencia empresarial.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="text-yellow-600 w-6 h-6" />
                  <p className="text-lg">
                    <strong>Valores:</strong> Innovación, eficiencia, compromiso y excelencia en cada solución que desarrollamos.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image 
                  src="/logo.svg" 
                  alt="ServiceFlow Oficinas" 
                  width={500} 
                  height={400} 
                  className="rounded-xl"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Contact Section */}
      {activeSection === 'contact' && (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto px-4 py-8 md:py-16"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-blue-900 mb-6">Información de Contacto</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <MapPin className="text-blue-600 w-8 h-8" />
                  <p className="text-gray-600 text-lg">3er sector de fidelac, melchor ocampo 60954, Lázaro Cárdenas, Michoacán</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-blue-600 w-8 h-8" />
                  <p className="text-gray-600 text-lg">+52 558 743 4105</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="text-blue-600 w-8 h-8" />
                  <p className="text-gray-600 text-lg">contacto@serviceflow.com</p>
                </div>
                <div className="flex space-x-6 pt-4">
                {[
                { icon: Facebook, href: "#facebook", name: "facebook" },
                { icon: Twitter, href: "#twitter", name: "twitter" },
                 { icon: Instagram, href: "#instagram", name: "instagram" }
                ].map(({ icon: Icon, href, name }) => (
                <motion.a 
                 key={name}  // Use the unique name as the key
                href={href} 
                 whileHover={{ scale: 1.2 }}
                className="text-blue-600 hover:text-blue-800"
                    >
                <Icon className="w-8 h-8" />
                </motion.a>
                ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-blue-900 mb-4">Ubicación</h3>
              <div className="bg-gray-200 rounded-xl overflow-hidden">
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.2979072804197!2d-100.87729162517743!3d18.267247987250594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85383ddc7c75555b%3A0x7e9bf241c6a6a4f5!2sMelchor%20Ocampo%2C%203ER%20Sect%20de%20Fidelac%2C%2060954%20Cd%20L%C3%A1zaro%20C%C3%A1rdenas%2C%20Mich.!5e0!3m2!1ses!2smx!4v1697495670786!5m2!1ses!2smx"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Team Section */}
      {activeSection === 'team' && (
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="container mx-auto px-4 py-8 md:py-16"
        >
          <h2 className="text-4xl font-bold text-blue-900 mb-12 text-center">Nuestro Equipo</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.name}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center"
              >
                <Image 
                  src={member.image} 
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-blue-900 mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}