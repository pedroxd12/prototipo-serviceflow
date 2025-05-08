// app/payment-methods/page.tsx
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, PlusCircle, Trash2, Edit, AlertTriangle, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';

interface PaymentMethod {
  id: string;
  type: 'Tarjeta de Crédito' | 'PayPal' | 'Transferencia Bancaria';
  last4?: string;
  expiry?: string;
  email?: string; // For PayPal
  bankName?: string; // For Bank Transfer
  isDefault: boolean;
}

const initialPaymentMethods: PaymentMethod[] = [
  { id: 'pm_1', type: 'Tarjeta de Crédito', last4: '4321', expiry: '12/26', isDefault: true },
  { id: 'pm_2', type: 'PayPal', email: 'usuario@example.com', isDefault: false },
];

export default function PaymentMethodsPage() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState<PaymentMethod | null>(null);
  const [newMethod, setNewMethod] = useState<{ type: PaymentMethod['type'], number?: string, expiry?: string, cvv?: string, email?: string, bankName?: string }>({ type: 'Tarjeta de Crédito' });

  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev =>
      prev.map(method => ({ ...method, isDefault: method.id === id }))
    );
    // Lógica para actualizar en backend
  };

  const handleDelete = (method: PaymentMethod) => {
    setShowDeleteModal(method);
  };

  const confirmDelete = () => {
    if (showDeleteModal) {
      setPaymentMethods(prev => prev.filter(m => m.id !== showDeleteModal.id));
      // Lógica para eliminar en backend
      setShowDeleteModal(null);
    }
  };

  const handleAddNewMethod = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la validación y lógica para añadir el nuevo método
    const newId = `pm_${Date.now()}`;
    let newPaymentEntry: PaymentMethod;

    if (newMethod.type === 'Tarjeta de Crédito') {
        if (!newMethod.number || !newMethod.expiry || !newMethod.cvv) {
            alert("Por favor, completa todos los campos de la tarjeta.");
            return;
        }
        newPaymentEntry = {
            id: newId,
            type: 'Tarjeta de Crédito',
            last4: newMethod.number.slice(-4),
            expiry: newMethod.expiry,
            isDefault: paymentMethods.length === 0,
        };
    } else if (newMethod.type === 'PayPal') {
        if (!newMethod.email) {
            alert("Por favor, ingresa el correo de PayPal.");
            return;
        }
        newPaymentEntry = {
            id: newId,
            type: 'PayPal',
            email: newMethod.email,
            isDefault: paymentMethods.length === 0,
        };
    } else { // Transferencia Bancaria
         if (!newMethod.bankName) {
            alert("Por favor, ingresa el nombre del banco.");
            return;
        }
        newPaymentEntry = {
            id: newId,
            type: 'Transferencia Bancaria',
            bankName: newMethod.bankName,
            isDefault: paymentMethods.length === 0,
        };
    }

    setPaymentMethods(prev => [...prev, newPaymentEntry]);
    setShowAddModal(false);
    setNewMethod({ type: 'Tarjeta de Crédito' }); // Reset form
  };


  const CardIcon: React.FC<{ type: PaymentMethod['type'] }> = ({ type }) => {
    if (type === 'PayPal') return <img src="/icons/paypal.svg" alt="PayPal" className="w-8 h-8" />; // Asegúrate de tener este icono
    if (type === 'Transferencia Bancaria') return <img src="/icons/bank.svg" alt="Bank" className="w-8 h-8" />; // Asegúrate de tener este icono
    return <CreditCard className="w-8 h-8 text-blue-500" />;
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center">
            <CreditCard className="w-10 h-10 text-blue-700 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-blue-900">Métodos de Pago</h1>
              <p className="text-gray-600">Administra tus tarjetas y formas de pago.</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Añadir Método
          </button>
        </motion.div>

        {paymentMethods.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-xl shadow-md text-center"
          >
            <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No tienes métodos de pago guardados.</h2>
            <p className="text-gray-500 mb-6">Añade un método de pago para continuar con tus servicios.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all text-lg"
            >
              Añadir Nuevo Método de Pago
            </button>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <CardIcon type={method.type} />
                    <div className="ml-4">
                      <p className="font-bold text-lg text-blue-900">{method.type}</p>
                      {method.type === 'Tarjeta de Crédito' && <p className="text-gray-600">Terminada en **** {method.last4} <span className="ml-2 text-sm">Exp. {method.expiry}</span></p>}
                      {method.type === 'PayPal' && <p className="text-gray-600">{method.email}</p>}
                      {method.type === 'Transferencia Bancaria' && <p className="text-gray-600">{method.bankName}</p>}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto justify-end">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium py-1 px-2 rounded-md hover:bg-blue-50 transition-colors"
                      >
                        Marcar como Principal
                      </button>
                    )}
                    {method.isDefault && (
                      <span className="text-sm text-green-600 font-semibold bg-green-100 py-1 px-3 rounded-full flex items-center">
                        <CheckCircle size={16} className="mr-1" /> Principal
                      </span>
                    )}
                     <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-colors">
                        <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(method)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium">
            &larr; Volver
            </Link>
        </div>
      </div>

      {/* Add New Method Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-blue-900">Añadir Nuevo Método de Pago</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
            </div>
            <form onSubmit={handleAddNewMethod} className="space-y-4">
              <div>
                <label htmlFor="methodType" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Método</label>
                <select
                  id="methodType"
                  value={newMethod.type}
                  onChange={(e) => setNewMethod({ type: e.target.value as PaymentMethod['type'] })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                </select>
              </div>

              {newMethod.type === 'Tarjeta de Crédito' && (
                <>
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Número de Tarjeta</label>
                    <input type="text" id="cardNumber" value={newMethod.number || ''} onChange={e => setNewMethod(prev => ({...prev, number: e.target.value}))} placeholder="0000 0000 0000 0000" className="w-full p-3 border border-gray-300 rounded-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Exp. (MM/AA)</label>
                      <input type="text" id="expiryDate" value={newMethod.expiry || ''} onChange={e => setNewMethod(prev => ({...prev, expiry: e.target.value}))} placeholder="MM/AA" className="w-full p-3 border border-gray-300 rounded-lg" />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input type="text" id="cvv" value={newMethod.cvv || ''} onChange={e => setNewMethod(prev => ({...prev, cvv: e.target.value}))} placeholder="123" className="w-full p-3 border border-gray-300 rounded-lg" />
                    </div>
                  </div>
                </>
              )}

              {newMethod.type === 'PayPal' && (
                 <div>
                    <label htmlFor="paypalEmail" className="block text-sm font-medium text-gray-700 mb-1">Correo de PayPal</label>
                    <input type="email" id="paypalEmail" value={newMethod.email || ''} onChange={e => setNewMethod(prev => ({...prev, email: e.target.value}))} placeholder="usuario@example.com" className="w-full p-3 border border-gray-300 rounded-lg" />
                  </div>
              )}

               {newMethod.type === 'Transferencia Bancaria' && (
                 <div>
                    <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">Nombre del Banco</label>
                    <input type="text" id="bankName" value={newMethod.bankName || ''} onChange={e => setNewMethod(prev => ({...prev, bankName: e.target.value}))} placeholder="Ej: BBVA, Santander" className="w-full p-3 border border-gray-300 rounded-lg" />
                     <p className="text-xs text-gray-500 mt-1">Se proporcionarán los detalles para la transferencia al confirmar.</p>
                  </div>
              )}


              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors shadow-md"
                >
                  Añadir Método
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-sm text-center"
          >
            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-5" />
            <h2 className="text-xl font-bold text-gray-800 mb-3">¿Eliminar Método de Pago?</h2>
            <p className="text-gray-600 mb-6">
              Estás a punto de eliminar {showDeleteModal.type}
              {showDeleteModal.last4 && ` terminada en ${showDeleteModal.last4}`}.
              {showDeleteModal.email && ` (${showDeleteModal.email})`}.
              Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="px-6 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors shadow-md font-medium"
              >
                Sí, Eliminar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
