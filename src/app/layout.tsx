'use client';

import './globals.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LogIn, UserPlus, Layers, Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const navLinks = [
  { href: '/signup', label: 'Inicia sesión', icon: LogIn },
  { href: '/register', label: 'Regístrate', icon: UserPlus },
  { href: '/planes', label: 'Planes', icon: Layers },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Animación de scroll mejorada
  const { scrollY } = useScroll();
  const headerBgOpacity = useTransform(scrollY, [0, 100], [1, 0.95]);
  const headerShadow = useTransform(
    scrollY,
    [0, 10],
    ['0 4px 6px -1px rgba(0, 0, 0, 0)', '0 4px 6px -1px rgba(0, 0, 0, 0.1)']
  );

  // Efecto para controlar el scroll
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (y) => {
      setIsScrolled(y > 10);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Control del menú móvil y scroll
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Exclusión del dashboard (mejorado)
  if (pathname.startsWith('/dashboard')) {
    return (
      <html lang="es">
        <body className="bg-gray-50">{children}</body>
      </html>
    );
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const menuIconVariants = {
    closed: { rotate: 0, scale: 1 },
    open: { rotate: 180, scale: 1.1 },
  };

  return (
    <html lang="es" className="scroll-smooth">
      <body className="bg-gray-50 text-gray-800 font-sans flex flex-col min-h-screen antialiased selection:bg-blue-100 selection:text-blue-800">
        {/* Header mejorado con más efectos */}
        <motion.header
          className="sticky top-0 z-50 w-full bg-gradient-to-r from-blue-700 to-blue-600 text-white"
          style={{
            opacity: headerBgOpacity,
            boxShadow: headerShadow,
          }}
          animate={{
            backdropFilter: isScrolled ? 'blur(4px)' : 'none',
            backgroundColor: isScrolled ? 'rgba(29, 78, 216, 0.95)' : 'rgba(29, 78, 216, 1)',
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-20 flex justify-between items-center relative z-10">
              {/* Logo con mejor efecto de hover */}
              <Link 
                href="/" 
                className="flex items-center gap-2 flex-shrink-0 group"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Image 
                    src="/logo.svg" 
                    alt="ServiceFlow Logo" 
                    width={40} 
                    height={40} 
                    priority 
                    className="drop-shadow-md"
                  />
                </motion.div>
                <motion.span 
                  className="font-bold text-xl hidden sm:inline"
                  whileHover={{ scale: 1.02 }}
                >
                  Service
                  <motion.span
                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-sky-100 to-blue-300"
                    animate={{ 
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity, 
                      ease: "linear" 
                    }}
                    style={{ 
                      backgroundSize: '200% auto',
                      display: 'inline-block'
                    }}
                  >
                    Flow
                  </motion.span>
                </motion.span>
              </Link>

              {/* Navegación Desktop mejorada */}
              <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative flex items-center gap-2 text-sm font-semibold text-white hover:text-white/90 transition-colors duration-200 group`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2"
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      {link.icon && <link.icon className="w-5 h-5" />}
                      <span>{link.label}</span>
                      {pathname === link.href && (
                        <motion.span 
                          className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                          layoutId="navIndicator"
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </motion.div>
                  </Link>
                ))}
              </nav>

              {/* Botón Menú Móvil mejorado */}
              <motion.button
                onClick={toggleMobileMenu}
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                className="md:hidden p-2 text-white hover:text-white/90 focus:outline-none rounded-md relative z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <motion.div
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  initial={false}
                  variants={menuIconVariants}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </motion.header>

        {/* Menú Móvil con mejor animación */}
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
              onClick={toggleMobileMenu}
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 bottom-0 h-full w-80 max-w-[85%] bg-white shadow-2xl p-6 z-50 flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-10">
                  <Link href="/" className="flex items-center gap-3" onClick={toggleMobileMenu}>
                    <Image src="/logo.svg" alt="ServiceFlow Logo" width={32} height={32} />
                    <span className="font-bold text-xl text-blue-900">
                      Service
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-500">
                        Flow
                      </span>
                    </span>
                  </Link>
                  <motion.button 
                    onClick={toggleMobileMenu}
                    className="p-1 text-gray-500 hover:text-gray-700"
                    whileHover={{ rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                <nav className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.href}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <Link
                        href={link.href}
                        onClick={toggleMobileMenu}
                        className={`flex items-center gap-4 text-lg font-medium p-4 rounded-xl transition-all ${
                          pathname === link.href
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {link.icon && (
                          <span className={`p-2 rounded-lg ${
                            pathname === link.href 
                              ? 'bg-blue-100 text-blue-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            <link.icon className="w-5 h-5" />
                          </span>
                        )}
                        <span>{link.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-gray-200">
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Link 
                      href="/register" 
                      onClick={toggleMobileMenu}
                      className="w-full block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-center font-semibold"
                    >
                      Empezar Ahora
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contenido Principal con padding mejorado */}
        <main className="flex-grow w-full pb-20">
          {children}
        </main>

        {/* Pie de Página mejorado */}
        <footer className="bg-gray-100 py-12 border-t border-gray-200 mt-auto w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="inline-block mb-6"
                >
                  <Link href="/" className="flex items-center gap-2">
                    <Image src="/logo.svg" alt="ServiceFlow Logo" width={36} height={36} />
                    <span className="font-bold text-xl text-gray-800">
                      Service
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-500">
                        Flow
                      </span>
                    </span>
                  </Link>
                </motion.div>
                <p className="text-gray-600 text-sm mb-6 max-w-md">
                  La solución todo en uno para la gestión de servicios técnicos. Optimiza tus operaciones y mejora la experiencia de tus clientes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Enlaces</h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/planes" 
                      className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                    >
                      Planes y Precios
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/features" 
                      className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                    >
                      Características
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/blog" 
                      className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                    >
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <Link 
                      href="/privacy" 
                      className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                    >
                      Política de Privacidad
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/terms" 
                      className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                    >
                      Términos de Servicio
                    </Link>
                  </li>
                  <li>
                    <Link 
                      href="/cookies" 
                      className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
                    >
                      Política de Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-8 pt-8 text-center">
              <p className="text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} ServiceFlow. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}