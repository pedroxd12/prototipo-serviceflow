"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Smartphone, Monitor, Clock, MapPin, BarChart, Users, DatabaseZap, CalendarClock, Route, FileCheck } from "lucide-react";
import FlowingBackground from "@/components/FlowingBackground"; // Ajusta la ruta si es necesario
import ChatWidget from "@/components/ChatWidget"; // Ajusta la ruta si es necesario

// --- Componente Contador Animado (Sin cambios) ---
function Counter({ value, direction = "up" }: { value: number; direction?: "up" | "down" }) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
    const springValue = useSpring(direction === "up" ? 0 : value, {
        damping: 60, stiffness: 100, restDelta: 0.5
    });

    useEffect(() => {
        if (isInView) { springValue.set(value); }
    }, [isInView, value, springValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat("es-MX").format(Math.round(latest));
            }
        });
        return () => { unsubscribe(); };
    }, [springValue]);

    return <span ref={ref} className="tabular-nums">{direction === 'up' ? 0 : value}</span>;
}

// --- Componente Animación de Carga "Flow" (Sin cambios) ---
function LoadingFlowAnimation() {
    return (
        <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
            <motion.div
                className="absolute w-64 h-64 bg-gradient-to-br from-blue-200 via-sky-100 to-blue-100 rounded-full filter blur-3xl opacity-80"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
            />
            <Image src="/logo.svg" alt="ServiceFlow Logo Cargando..." width={150} height={150} priority className="absolute animate-pulse" />
        </motion.div>
    );
}

// --- Página Principal ---
export default function Home() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1800);
        return () => clearTimeout(timer);
    }, []);

    // --- Datos de ejemplo (sin cambios) ---
    const workflowSteps = [
        { icon: DatabaseZap, title: "Almacenamiento de Datos", description: "Todos tus datos accesibles y seguros desde cualquier instante." },
        { icon: CalendarClock, title: "Agenda Automática", description: "Asignación inteligente para tus servicios basada en la disponibilidad de tus tecnicos." },
        { icon: Route, title: "Optimización de Rutas para tus tecnicos", description: "Tus rutas optimizadas para optimizar tus tiempos y recursos." },
        { icon: FileCheck, title: "Reportes de tus servicios", description: "Informes digitales de tus servicios y clientes." },
    ];
    const features = [
        { icon: Clock, title: "Agenda Inteligente", description: "Optimiza horarios y realiza asignaciones automáticamente." },
        { icon: MapPin, title: "Seguimiento a tus tecnicos", description: "Monitorea a tu equipo en campo con precisión." },
        { icon: Users, title: "Gestion de clientes", description: "Todo sobre clientes y órdenes de servicio en un solo lugar." },
        { icon: BarChart, title: "Reportes sobre tus servicios", description: "Analiza rendimiento y toma mejores decisiones." },
        { icon: Monitor, title: "Plataforma Web", description: "Gestiona todo desde una interfaz potente y amigable." },
        { icon: Smartphone, title: "App Móvil Intuitiva para tus tecnicos", description: "Manten a tus tecnicos conectados." },
    ];

    // --- Variantes de Animación (Sin cambios) ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 120, damping: 15 } }
    };

    return (
        // Contenedor principal
        <div className="relative bg-white min-h-screen w-full overflow-x-hidden antialiased">
            {/* Componentes de fondo */}
            <FlowingBackground />

            {/* Manejo de la animación de carga */}
            <AnimatePresence>
                {isLoading && <LoadingFlowAnimation />}
            </AnimatePresence>

            {/* Contenido principal que aparece después de la carga */}
            {/* *** IMPORTANTE: Ajusta este padding-top según la altura real de tu header curvo *** */}
            <motion.main
                className="relative z-10 pt-20 md:pt-24 lg:pt-28"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoading ? 0 : 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >

                {/* Hero Section (Sin padding-top extra si ya está en main) */}
                <motion.header
                    className="relative container mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 md:pb-32 lg:pb-36 grid md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-10 items-center overflow-hidden"
                    variants={containerVariants}
                    initial="hidden"
                    animate={!isLoading ? "visible" : "hidden"}
                >
                    {/* Elementos decorativos */}
                    <motion.div className="absolute top-0 left-0 w-64 h-64 bg-gradient-radial from-blue-100/50 via-blue-50/20 to-transparent rounded-full filter blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/3 pointer-events-none" /* ... */ />
                    <motion.div className="absolute bottom-0 right-0 w-52 h-52 bg-gradient-radial from-sky-100/40 via-sky-50/10 to-transparent rounded-full filter blur-3xl opacity-40 translate-x-1/2 translate-y-1/3 pointer-events-none" /* ... */ />

                    {/* Contenido de Texto */}
                    <div className="space-y-6 md:space-y-8 text-center md:text-left z-10 order-2 md:order-1">
                        <motion.h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-900 !leading-tight"
                            variants={itemVariants}
                        >
                            Haz <motion.span
                                className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-sky-500 to-blue-700"
                                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                style={{ backgroundSize: '200% auto' }}
                            >
                                fluir
                            </motion.span> tus servicios técnicos
                        </motion.h1>
                        <motion.p
                            className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto md:mx-0"
                            variants={itemVariants}
                        >
                            La plataforma inteligente que conecta cada punto de tu operación, optimizando tiempos y recursos de forma automática.
                        </motion.p>
                        <motion.div variants={itemVariants}>
                            <Link href="/register" className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 sm:px-7 sm:py-3 rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all group text-sm sm:text-base font-medium">
                                Comienza Gratis
                                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-1.5 transition-transform duration-200 ease-in-out" />
                            </Link>
                        </motion.div>
                    </div>

                    {/* Imagen Hero */}
                    <motion.div
                        className="relative flex justify-center z-10 order-1 md:order-2"
                        variants={itemVariants}
                    >
                        <motion.div style={{ y: useTransform(useScroll().scrollYProgress, [0, 0.5], ["0%", "-10%"]) }}>
                            <Image
                                src="/dashboard-mockup.svg"
                                alt="ServiceFlow Dashboard Mockup"
                                width={500} height={450}
                                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-auto rounded-lg object-contain shadow-xl shadow-blue-200/40"
                                priority
                            />
                        </motion.div>
                    </motion.div>
                </motion.header>

                {/* --- RESTO DE LAS SECCIONES --- */}
                {/* Sección: Visualiza el Flujo */}
                <section className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden bg-gradient-to-b from-white via-blue-50/20 to-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 md:mb-16 lg:mb-20 max-w-2xl mx-auto">
                            <motion.h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>
                                Visualiza el <span className="text-blue-600">Flujo</span> Perfecto
                            </motion.h2>
                            <motion.p className="text-base sm:text-lg text-gray-600" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.1 }}>
                                Desde la solicitud hasta el reporte final, ServiceFlow conecta cada paso.
                            </motion.p>
                        </div>
                        <div className="relative max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 md:gap-x-6 lg:gap-x-8 items-start relative z-10">
                                {workflowSteps.map((step, index) => (
                                    <motion.div key={index} className="flex flex-col items-center text-center px-2" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 300 } }}>
                                        <div className="relative mb-4">
                                            <div className="bg-blue-100 text-blue-600 p-4 rounded-full w-fit shadow-inner shadow-blue-200/30">
                                                <step.icon className="w-8 h-8" />
                                            </div>
                                            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ring-2 ring-white">{index + 1}</span>
                                        </div>
                                        <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-1">{step.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sección: Resultados que Fluyen */}
                <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-blue-50/40">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 md:mb-16 lg:mb-20 max-w-2xl mx-auto">
                            <motion.h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>
                                Resultados que<span className="text-blue-600">Fluyen</span> directamente a tu negocios
                            </motion.h2>
                            <motion.p className="text-base sm:text-lg text-gray-600" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.1 }}>
                                Optimización de tiempo y costos para tu negocio.
                            </motion.p>
                        </div>
                        <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-8 sm:gap-y-0 text-center max-w-4xl mx-auto" initial="hidden" whileInView="visible" variants={containerVariants} viewport={{ once: true, amount: 0.2 }}>
                            <motion.div className="bg-white p-6 rounded-xl shadow-md border border-gray-100/80 hover:shadow-lg transition-shadow duration-300" variants={itemVariants}>
                                <h3 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-2"> <Counter value={40} />% </h3>
                                <p className="text-sm sm:text-base text-gray-600 font-medium">Reducción de tiempo</p>
                            </motion.div>
                            <motion.div className="bg-white p-6 rounded-xl shadow-md border border-gray-100/80 hover:shadow-lg transition-shadow duration-300" variants={itemVariants}>
                                <h3 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-2"> +<Counter value={30} />% </h3>
                                <p className="text-sm sm:text-base text-gray-600 font-medium">Reducción de costos</p>
                            </motion.div>
                            <motion.div className="bg-white p-6 rounded-xl shadow-md border border-gray-100/80 hover:shadow-lg transition-shadow duration-300" variants={itemVariants}>
                                <h3 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-2"> <Counter value={100} />% </h3>
                                <p className="text-sm sm:text-base text-gray-600 font-medium">Flow</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-16 sm:py-20 md:py-24 lg:py-28 bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 md:mb-16 lg:mb-20 max-w-2xl mx-auto">
                            <motion.h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}>
                                Herramientas Diseñadas para <span className='text-blue-600'>Impulsarte</span>
                            </motion.h2>
                            <motion.p className="text-base sm:text-lg text-gray-600" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.1 }}>
                                Funcionalidades completas para cada aspecto de tu gestión de servicios.
                            </motion.p>
                        </div>
                        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" initial="hidden" whileInView="visible" variants={containerVariants} viewport={{ once: true, amount: 0.1 }}>
                            {features.map((feature, index) => (
                                <motion.div key={feature.title} className="bg-gray-50/70 p-6 rounded-xl border border-gray-200/80 group hover:border-blue-300/80 hover:bg-white transition-all duration-300 overflow-hidden" variants={itemVariants} whileHover={{ y: -6, boxShadow: "0 8px 25px rgba(59, 130, 246, 0.08)" }} transition={{ type: "spring", stiffness: 350, damping: 18 }}>
                                    <div className="bg-gradient-to-br from-blue-100 to-sky-100 text-blue-600 p-3 rounded-lg w-fit mb-5 shadow-sm inline-block">
                                        <feature.icon className="w-6 h-6 block" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-semibold text-blue-900 mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Call to Action Final */}
                <motion.section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.6 }}>
                    {/* <div className="absolute inset-0 opacity-[3%] mix-blend-overlay bg-[url('/path/to/your/subtle/pattern.svg')]"></div> */}
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                        <h2 className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-4">
                            ¿Listo para que tu fluya tu negocio?
                        </h2>
                        <p className="text-base sm:text-lg opacity-90 mb-8 max-w-md lg:max-w-xl mx-auto">
                            Descubre el poder de ServiceFlow y empieza a fluir tu negocio con rapidez y eficiencia.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/register" className="w-full sm:w-auto inline-flex items-center justify-center bg-white text-blue-700 px-7 py-3 rounded-lg shadow-md hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all group text-sm sm:text-base font-medium">
                                Inicia ahora
                                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-200 ease-in-out" />
                            </Link>
                            <Link href="/contactanos" className="w-full sm:w-auto inline-flex items-center justify-center text-white px-7 py-3 rounded-lg border-2 border-white/60 hover:bg-white/10 hover:border-white focus:outline-none focus:ring-4 focus:ring-white/30 transition-all text-sm sm:text-base font-medium">
                                Contactanos
                            </Link>
                        </div>
                    </div>
                </motion.section>

            </motion.main>

            <ChatWidget />

        </div>
    );
}