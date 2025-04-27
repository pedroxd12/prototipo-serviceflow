"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add password reset logic here
    console.log('Password reset request', { email });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setEmail('');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center justify-center">
      <motion.div 
        className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Left Side - Logo and Description */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 text-center md:text-left"
        >
          <Image 
            src="/logo.svg" 
            alt="ServiceFlow Logo" 
            width={250} 
            height={150} 
            className="mx-auto md:mx-0"
          />
          
          <h2 className="text-4xl font-extrabold text-blue-900 mb-4">
            Restablecer Contraseña
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            {!isSubmitted 
              ? "¿Olvidaste tu contraseña? No te preocupes. Ingresa tu correo electrónico y te enviaremos instrucciones para restablecerla."
              : "Hemos enviado un enlace de restablecimiento de contraseña a tu correo electrónico. Revisa tu bandeja de entrada (y la carpeta de spam)."
            }
          </p>
          
          <div className="flex flex-col space-y-4 mt-8">
            <div className="flex items-center space-x-3 text-blue-600">
              <Mail className="w-6 h-6" />
              <span>Recuperación segura de cuenta</span>
            </div>
            <div className="flex items-center space-x-3 text-blue-600">
              <RefreshCw className="w-6 h-6" />
              <span>Restablece tu acceso en minutos</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Forgot Password Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div 
            className="bg-white p-8 rounded-xl shadow-xl space-y-6"
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                <h3 className="text-2xl font-bold text-blue-900 text-center mb-6">
                  Recuperar Contraseña
                </h3>

                {/* Email Input */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-gray-700 flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <span>Correo Electrónico</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="email" 
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="usuario@ejemplo.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center group mt-6"
                >
                  Enviar Correo Electronico
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Login Link */}
                <div className="text-center text-gray-600 mt-4">
                  <Link 
                    href="/login" 
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Volver al Inicio de Sesión
                  </Link>
                </div>
              </form>
            ) : (
              <div className="text-center space-y-6">
                <div className="bg-green-100 p-4 rounded-xl">
                  <h3 className="text-2xl font-bold text-green-800 mb-4">
                    Correo Enviado
                  </h3>
                  <p className="text-green-700 mb-4">
                    Hemos enviado un enlace para restablecer tu contraseña a {email}
                  </p>
                </div>

                <motion.button
                  onClick={handleReset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center group"
                >
                  Intentar Otro Correo
                  <RefreshCw className="ml-2 group-hover:rotate-180 transition-transform" />
                </motion.button>

                <Link 
                  href="/signup" 
                  className="text-blue-600 hover:text-blue-800 transition-colors block"
                >
                  Volver al Inicio de Sesión
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}