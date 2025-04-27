"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {Mail, Lock, ArrowRight,Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login attempt', { email, password });
  };


  const handleLogin = () => {
    setIsLoading(true);
    
    // Simula un tiempo de carga
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000); // 2 segundos de carga
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
          className="space-y-6 text-center md:text-left "
        >
          <Image 
            src="/logo.svg" 
            alt="ServiceFlow Logo" 
            width={250} 
            height={150} 
            className="mx-auto md:mx-0"
          />
          
          <h2 className="text-4xl font-extrabold text-blue-900 mb-4">
            Bienvenido a ServiceFlow
          </h2>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Accede a la plataforma. 
          </p>
          
          <div className="flex flex-col space-y-4 mt-8">
            <div className="flex items-center space-x-3 text-blue-600">
              <Lock className="w-6 h-6" />
              <span>Acceso seguro y protegido</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form 
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-xl space-y-6"
          >
            <h3 className="text-2xl font-bold text-blue-900 text-center mb-4">
              Iniciar Sesión
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

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-700 flex items-center space-x-2">
                <Lock className="w-5 h-5 text-blue-600" />
                <span>Contraseña</span>
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link 
                href="/password" 
                className="text-blue-600 hover:text-blue-800 transition-colors text-sm"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

           {/* Submit Button */}
        <motion.button
          type="button"
          onClick={handleLogin}
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.05 }}
          whileTap={{ scale: isLoading ? 1 : 0.95 }}
          className={`
            w-full px-6 py-3 rounded-lg shadow-lg transition-all 
            flex items-center justify-center group
            ${isLoading 
              ? 'bg-blue-500 text-white cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }
          `}
        >
          {isLoading ? (
  <div className="flex items-center">
    <motion.div
      style={{ display: "inline-block" }} // Asegura que la rotación sea sobre su propio eje
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ 
        repeat: Infinity, 
        duration: 1, 
        ease: "linear" 
      }}
    >
      <Loader2 className="mr-2" />
    </motion.div>
    Validando...
  </div>
) : (
  <>
    Iniciar Sesión
    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
  </>
)}

        </motion.button>

            {/* Register Prompt */}
            <div className="text-center text-gray-600 mt-4">
              ¿No tienes una cuenta? 
              <Link 
                href="/register" 
                className="text-blue-600 hover:text-blue-800 ml-2 transition-colors"
              >
                Regístrate
              </Link>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}