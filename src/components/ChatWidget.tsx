// src/components/ChatWidget.tsx
"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react'; // Iconos

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botón flotante */}
      <motion.button
        className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? "Cerrar chat" : "Abrir chat"}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isOpen ? "x" : "message"}
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Ventana de Chat (Placeholder) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-[75px] right-5 sm:bottom-[90px] sm:right-8 z-40 w-[calc(100%-40px)] max-w-sm h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            {/* Header del Chat */}
            <div className="p-4 bg-blue-600 text-white font-semibold">
              Chat de Soporte
            </div>
            {/* Contenido del Chat (Placeholder) */}
            <div className="flex-grow p-4 text-gray-700 overflow-y-auto">
              <p>¡Hola! ¿Cómo podemos ayudarte?</p>
              {/* Aquí iría la interfaz de chat real */}
            </div>
             {/* Input del Chat (Placeholder) */}
             <div className="p-3 border-t border-gray-200">
                <input type="text" placeholder="Escribe tu mensaje..." className="w-full p-2 border rounded"/>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;