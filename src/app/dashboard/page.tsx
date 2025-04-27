"use client";

import React, { useState } from "react"; // Asegúrate de importar useState
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  User, 
  CreditCard, 
  Users, 
  Wrench, 
  CheckCircle, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  Settings,
  LogOut
} from "lucide-react";


export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  const dashboardSections = [
    { icon: Users, label: 'Técnicos', value: 12, color: 'text-blue-600' },
    { icon: User, label: 'Clientes', value: 157, color: 'text-green-600' },
    { icon: Wrench, label: 'Servicios Activos', value: 42, color: 'text-purple-600' },
    { icon: TrendingUp, label: 'Servicios Completados', value: 523, color: 'text-yellow-600' }
  ];

  const subscriptionDetails = {
    plan: 'Anual',
    type: 'Climas HL',
    status: 'Activo',
    nextBillingDate: '15 de Marzo, 2025',
    price: '$5500/anual'
  };

  const paymentMethods = [
    { 
      type: 'Tarjeta de Crédito', 
      last4: '4321', 
      expiry: '12/26', 
      icon: CreditCard 
    }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
    
      {/* Main Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {dashboardSections.map((section, index) => (
            <motion.div
              key={section.label}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1 
              }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between">
                <div>
                  <section.icon className={`w-8 h-8 mb-2 ${section.color}`} />
                  <h3 className="text-gray-600 text-sm">{section.label}</h3>
                  <p className="text-2xl font-bold text-blue-900">{section.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subscription and Payment Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Subscription Details */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-900">Suscripción</h2>
              <CheckCircle className="text-green-600 w-6 h-6" />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Tipo:</span>
                <span className="font-semibold">{subscriptionDetails.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Empresa:</span>
                <span className="font-semibold">{subscriptionDetails.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estado:</span>
                <span className="text-green-600 font-semibold">
                  {subscriptionDetails.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Próxima Facturación:</span>
                <span className="font-semibold">{subscriptionDetails.nextBillingDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Precio:</span>
                <span className="font-semibold">{subscriptionDetails.price}</span>
              </div>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-blue-900">Métodos de Pago</h2>
              <CreditCard className="text-blue-600 w-6 h-6" />
            </div>
            {paymentMethods.map((method) => (
              <div key={method.last4} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <method.icon className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="font-semibold">{method.type}</p>
                      <p className="text-gray-600">**** **** **** {method.last4}</p>
                    </div>
                  </div>
                  <span className="text-gray-600">Exp. {method.expiry}</span>
                </div>
                <div className="mt-4">
                  <Link 
                    href="/payment-methods" 
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors block text-center"
                  >
                    Administrar Métodos de Pago
                  </Link>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
// Excluir el layout global
Dashboard.getLayout = function getLayout(page: React.ReactNode) {
    return <>{page}</>;
  };