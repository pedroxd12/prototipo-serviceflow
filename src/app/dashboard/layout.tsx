"use client";

import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { 
    User, 
    Settings,
    LogOut
  } from "lucide-react";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="es">
          <body className="bg-white text-gray-900 font-sans">
               {/* Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-blue-900 text-white py-6 shadow-lg"
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image 
              src="/logo.svg" 
              alt="ServiceFlow Logo" 
              width={50} 
              height={50} 
            />
            <h1 className="text-2xl font-bold">Panel de Control</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/profile" className="hover:bg-blue-800 p-2 rounded-full">
              <User className="w-6 h-6" />
            </Link>
            <Link href="/settings" className="hover:bg-blue-800 p-2 rounded-full">
              <Settings className="w-6 h-6" />
            </Link>
            <Link href="/" className="hover:bg-blue-800 p-2 rounded-full">
              <LogOut className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </motion.header>

              <div className="p-6">{children}</div>


                 {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">© 2025 ServiceFlow. Todos los derechos reservados.</p>
          <div className="mt-4 space-x-4">
            <Link href="/privacy" className="text-gray-500 hover:text-blue-600">Privacidad</Link>
            <Link href="#" className="text-gray-500 hover:text-blue-600">Términos y condiciones </Link>
          </div>
        </div>
      </footer>

      
          </body>
             
      </html>
  );
}
