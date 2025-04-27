"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Monitor, Clock, MapPin, BarChart, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <motion.header
        className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-6">
          <motion.h2
            className="text-5xl md:text-5xl font-extrabold text-blue-900"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Haz fluir tus servicios
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 leading-relaxed"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            La plataforma inteligente para la gestión de servicios técnicos, optimizando cada aspecto de tu negocio con tecnología de vanguardia.
          </motion.p>
          
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="/register" 
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all group"
            >
              Comenzar Ahora
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image 
            src="/logo.svg" 
            alt="ServiceFlow Logo" 
            width={500} 
            height={300} 
            className="mx-auto rounded-lg"
          />
          <motion.h1
            className="text-5xl md:text-6xl text-center font-extrabold text-blue-900"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            ServiceFlow
          </motion.h1>

        </motion.div>
      </motion.header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Características Principales</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre cómo ServiceFlow transforma la gestión de servicios con herramientas Automáticas y eficientes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              icon: Clock, 
              title: "Agenda Automática", 
              description: "Optimiza horarios de servicios con asignación automática." 
            },
            { 
              icon: MapPin, 
              title: "Seguimiento en Tiempo Real", 
              description: "Monitorea a tu equipo con geolocalización precisa." 
            },
            { 
              icon: Users, 
              title: "Gestión Centralizada", 
              description: "Administra clientes, órdenes y servicios en un solo lugar." 
            },
            { 
              icon: BarChart, 
              title: "Reportes Avanzados", 
              description: "Analiza tiempos de respuesta y rendimiento." 
            },
            { 
              icon: Monitor, 
              title: "Aplicación de Escritorio", 
              description: "Gestiona todo desde una interfaz potente y amigable." 
            },
            { 
              icon: Smartphone, 
              title: "App Móvil", 
              description: "Control total desde tu dispositivo Android o iOS." 
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all group"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-blue-100 p-4 rounded-full w-fit mb-4 group-hover:bg-blue-200 transition-colors">
                <feature.icon className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <motion.section 
        className="bg-blue-900 text-white py-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">¿Listo para revolucionar tu negocio?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Cualquier duda, no dudes en contactarnos.
          </p>
          <Link 
            href="/contactanos" 
            className="bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-blue-100 transition-all flex items-center justify-center mx-auto w-fit"
          >
            Cóntactanos
          </Link>
        </div>
      </motion.section>


    </div>
  );
}