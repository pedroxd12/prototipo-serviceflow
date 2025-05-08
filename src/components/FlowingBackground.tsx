// src/components/FlowingBackground.tsx
"use client";
import { motion } from "framer-motion";

const FlowingBackground = () => {
  const numLines = 5; // Número de líneas de flujo

  // Variante para la animación infinita de cada línea
  const lineVariants = {
    animate: (i: number) => ({
      x: ["-100%", "100%"], // Mover de izquierda a derecha
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 20 + i * 5, // Duraciones diferentes para desincronizar
          ease: "linear",
          delay: i * 2, // Delay inicial diferente
        },
      },
    }),
  };

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-40 blur-sm" // Posición absoluta, detrás de todo, baja opacidad, blur
      aria-hidden="true"
    >
      <svg width="100%" height="100%" preserveAspectRatio="none">
        {/* Gradiente para las líneas */}
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4DAAFF" stopOpacity="0.5" /> {/* Azul claro del logo */}
            <stop offset="100%" stopColor="#2D79F3" stopOpacity="0.8" /> {/* Azul más oscuro del logo */}
          </linearGradient>
        </defs>

        {/* Generar múltiples líneas animadas */}
        {Array.from({ length: numLines }).map((_, i) => (
          <motion.path
            key={i}
            // Path curvo similar al del logo, ajustado para el fondo
            // La posición Y varía para cada línea
            d={`M -100 ${20 + i * 15} C -50 ${10 + i * 15}, 50 ${30 + i * 15}, 100 ${20 + i * 15} S 250 ${10 + i * 15}, 300 ${20 + i * 15}`}
            stroke="url(#flowGradient)"
            strokeWidth="2" // Más delgadas que las del logo
            fill="none"
            initial={{ x: "-100%" }} // Empieza fuera de la pantalla izquierda
            animate="animate"
            custom={i} // Pasa el índice para variar la animación
            variants={lineVariants}
            style={{
                // Asegura que las coordenadas del path se escalen con el contenedor SVG
                // Esto requiere que el contenedor SVG tenga un tamaño relativo (width/height 100%)
                // y que el viewBox se ajuste o no se use para que las coordenadas sean relativas al tamaño.
                // Alternativamente, hacer el viewBox muy grande y mover el path dentro.
                // Por simplicidad, mantenemos coordenadas fijas y movemos todo el path.
                // Ajustar la escala si es necesario: transform: 'scale(2)'
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default FlowingBackground;