import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";

const Precios = () => {
  const pricingPlans = [
    {
      title: "Plan Mensual",
      price: 550,
      currency: "MXN",
      period: "mes",
      features: [
        "Gestión de servicios",
        "Seguimiento en tiempo real",
        "Hasta 7 técnicos",
        "Soporte básico",
        "Reportes mensuales"
      ],
      recommended: false
    },
    {
      title: "Plan Anual",
      price: 5500,
      currency: "MXN",
      period: "año",
      features: [
        "Todas las funciones del plan mensual",
        "Ahorro del 17%",
        "Sin limite de técnicos",
        "Soporte prioritario",
        "Capacitación incluida"
      ],
      recommended: true
    }
  ];

  return (
    <motion.section 
      className="container mx-auto px-4 py-16 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-blue-900 mb-4">Nuestros Planes</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Elige el plan que mejor se adapte a las necesidades de tu negocio.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.title}
            className={`
              rounded-xl shadow-lg overflow-hidden transform transition-all duration-300
              ${plan.recommended 
                ? 'border-2 border-blue-500 scale-105 bg-white' 
                : 'bg-white hover:shadow-xl'}
            `}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            <div className="p-6 bg-blue-50">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-blue-900">{plan.title}</h3>
                {plan.recommended && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    Más Popular
                  </span>
                )}
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-extrabold text-blue-900">${plan.price}</span>
                <span className="text-gray-500 ml-2">/{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href="/contacto" 
                className={`
                  w-full text-center py-3 rounded-lg transition-all 
                  ${plan.recommended 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}
                `}
              >
                Contratar Plan
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8 text-gray-600">
        <p>
          ¿Necesitas un plan personalizado? 
          <Link href="/contactanos" className="text-blue-600 ml-1 hover:underline">
            Contáctanos
          </Link>
        </p>
      </div>
    </motion.section>
  );
};

export default Precios;