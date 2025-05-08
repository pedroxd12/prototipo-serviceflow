"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Estado para mensajes de error

  // Lógica de envío
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return; // Previene doble submit
    setError(null); // Limpia errores previos
    handleLogin(); // Inicia la lógica de login
  };

  // Lógica de login (simulada)
  const handleLogin = () => {
    setIsLoading(true);
    console.log('Login attempt', { email, password });

    // Simula llamada a API
    setTimeout(() => {
      // ---- Reemplaza esto con tu lógica de autenticación real ----
      if (email === "abdiel@gmail.com" && password === "password") {
        console.log("Login successful, redirecting...");
        router.push('/dashboard');
        // No necesitas setIsLoading(false) aquí si rediriges inmediatamente
      } else {
        console.log("Login failed");
        setError("Correo electrónico o contraseña incorrectos.");
        setIsLoading(false); // Detiene la carga si hay error
      }
      // ---- Fin de la lógica de autenticación ----
    }, 2000);
  };

  // Variantes para animación escalonada del contenedor principal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delayChildren: 0.2,
        staggerChildren: 0.3,
      }
    }
  };

  // Variantes para los elementos hijos (izquierda/derecha)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Variantes para los elementos del formulario
  const formItemVariants = {
     hidden: { opacity: 0, x: -15 },
     visible: {
       opacity: 1,
       x: 0,
       transition: { duration: 0.4, ease: "easeOut" }
     }
  };

  return (
    // Contenedor principal con gradiente y centrado
    <div className="bg-gradient-to-br from-blue-50 via-white to-sky-50 min-h-screen flex items-center justify-center p-4">
      <motion.div
        className="container mx-auto max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Grid principal para layout de dos columnas */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* --- Lado Izquierdo - Logo y Descripción --- */}
          <motion.div
            variants={itemVariants}
            className="space-y-6 flex flex-col" // Flex column para controlar hijos
          >
             {/* Contenedor para el Logo con Flexbox para centrado/alineación */}
             <div className="flex justify-center md:justify-start">
                <motion.div // Animación aplicada al contenedor del logo
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5, type: 'spring', stiffness: 150 }}
                >
                  <Image
                    src="/logo.svg" // Asegúrate que la ruta sea correcta
                    alt="ServiceFlow Logo"
                    width={230}
                    height={130}
                    priority // Carga prioritaria
                    // Quitar clases de margen auto aquí, se controla en el div padre
                  />
                </motion.div>
             </div>

             {/* Contenedor para el texto con alineación controlada */}
             <div className="text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 leading-tight">
                  Bienvenido de nuevo
                </h2>
                <p className="mt-4 text-lg text-gray-600 leading-relaxed">
                  Accede a tu cuenta para gestionar tus servicios de forma eficiente.
                </p>
             </div>
          </motion.div>

          {/* --- Lado Derecho - Formulario de Login --- */}
          <motion.div
            variants={itemVariants}
            layout // Permite animaciones de layout si el tamaño cambia
          >
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow-xl border border-gray-100/80 space-y-6"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } }
              }}
              noValidate // Deshabilita validación HTML5 si manejas todo en JS
            >
              <motion.h3
                variants={formItemVariants}
                className="text-2xl font-bold text-blue-900 text-center mb-4"
              >
                Iniciar Sesión
              </motion.h3>

              {/* Email Input */}
              <motion.div className="space-y-2" variants={formItemVariants}>
                <label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Correo Electrónico</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="tu@ejemplo.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors duration-200 ease-in-out text-base" // Asegura tamaño de texto base
                  />
                </div>
              </motion.div>

              {/* Password Input */}
              <motion.div className="space-y-2" variants={formItemVariants}>
                <label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span>Contraseña</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors duration-200 ease-in-out text-base" // Asegura tamaño de texto base
                  />
                </div>
              </motion.div>

               {/* Mensaje de Error */}
               <AnimatePresence>
                 {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="text-red-600 text-sm text-center bg-red-50 p-2 rounded-md border border-red-200"
                    >
                      {error}
                    </motion.div>
                 )}
               </AnimatePresence>

              {/* Forgot Password Link */}
              <motion.div variants={formItemVariants} className="text-right">
                <Link
                  href="/password" // Ruta para recuperar contraseña
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-200 ease-in-out"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={formItemVariants}>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.03 }}
                  whileTap={{ scale: isLoading ? 1 : 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  // Aplicar altura fija (h-12 es 48px) y overflow-hidden
                  className={`
                    w-full h-12 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out
                    flex items-center justify-center group font-medium relative overflow-hidden
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    ${isLoading
                      ? 'bg-blue-400 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg'
                    }
                  `}
                >
                  {/* AnimatePresence maneja la transición entre estados */}
                  <AnimatePresence mode="wait" initial={false}>
                    {isLoading ? (
                      // Estado de Carga
                      <motion.div
                        key="loading" // Clave única para AnimatePresence
                        initial={{ opacity: 0, y: 5 }} // Ligeramente desde abajo
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }} // Ligeramente hacia arriba
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center absolute inset-0" // Posición absoluta para superponerse
                      >
                        <motion.div
                           key="loader-icon-rotate" // Key única para el elemento que rota
                           animate={{ rotate: 360 }}
                           transition={{
                             repeat: Infinity,
                             duration: 1,
                             ease: "linear"
                           }}
                           style={{ display: 'inline-block' }} // Necesario para rotación correcta
                        >
                           <Loader2 className="h-5 w-5" /> {/* Sin margen extra aquí */}
                        </motion.div>
                        <span className="ml-2">Validando...</span> {/* Texto al lado */}
                      </motion.div>
                    ) : (
                      // Estado Normal
                      <motion.span
                        key="login" // Clave única para AnimatePresence
                        initial={{ opacity: 0, y: -5 }} // Ligeramente desde arriba
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }} // Ligeramente hacia abajo
                        transition={{ duration: 0.2 }}
                        className="flex items-center"
                      >
                        Iniciar Sesión
                        <ArrowRight className="ml-2 h-5 w-5 transform transition-transform duration-200 ease-in-out group-hover:translate-x-1" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>

              {/* Register Prompt */}
              <motion.div variants={formItemVariants} className="text-center text-sm text-gray-600 pt-4">
                ¿No tienes una cuenta?
                <Link
                  href="/register" // Ruta para registrarse
                  className="font-medium text-blue-600 hover:text-blue-800 hover:underline ml-1 transition-colors duration-200 ease-in-out"
                >
                  Regístrate
                </Link>
              </motion.div>
            </motion.form>
          </motion.div>

        </div> {/* Fin del grid principal */}
      </motion.div> {/* Fin del contenedor animado */}
    </div> // Fin del contenedor de fondo
  );
}