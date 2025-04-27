'use client';

import { FaHome, FaSignInAlt, FaUserPlus, FaServicestack} from 'react-icons/fa';  // Importamos iconos
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function RootLayout({ children }: { children: React.ReactNode }) {

  const pathname = usePathname(); // Obtiene la ruta actual

  // Si la ruta es "/dashboard" o sus subrutas, no aplicar este layout
  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
      <html lang="es">
          <body className="bg-white text-gray-900 font-sans">
              <nav className="p-4 bg-[#12306C] text-[#F9F9F9] flex gap-6 items-center shadow-md">
                  <a href="/" className="flex items-center gap-2 hover:underline">
                    <Image src="/logo.svg" className="flex" alt="" width={100} height={50} />
                  </a>
                  <a href="/signup" className="text-lg font-bold shadow-md transition ease-in-out duration-300 text-white hover:text-blue-500">
                      <FaSignInAlt /> <span>Inicia sesión</span>
                  </a>
                  <a href="/register" className="text-lg font-bold shadow-md transition ease-in-out duration-300 text-white hover:text-blue-500">
                      <FaUserPlus /> <span>Regístrate</span>
                  </a>
                  <a href="/planes" className="text-lg font-bold shadow-md transition ease-in-out duration-300 text-white hover:text-blue-500">
                      <FaServicestack /> <span>Planes</span>
                  </a>
              </nav>
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
