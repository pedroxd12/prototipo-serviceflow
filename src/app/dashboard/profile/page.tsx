// app/profile/page.tsx
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Edit3, Save, Mail, Phone, MapPin, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Climas HL',
    email: 'climashl@gmail.com',
    phone: '+52 753 111 27 25',
    address: 'Av. de tu corazón',
  });
  
  const [tempData, setTempData] = useState<ProfileData>(profileData);
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    setPasswordError(null);
  };

  const handleEdit = () => {
    setTempData(profileData);
    setIsEditing(true);
    setShowPasswordSection(false);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
    // Aquí iría la lógica para guardar en el backend
    console.log('Profile data saved:', tempData);
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    // Validación simple
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('Todos los campos son obligatorios');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Las contraseñas nuevas no coinciden');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    // Simulación de éxito
    setPasswordSuccess('Contraseña actualizada correctamente');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    // Aquí iría la lógica para actualizar la contraseña en el backend
    console.log('Password change requested:', passwordData);
  };

  const inputClass = "w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow";
  const labelClass = "block text-sm font-medium text-gray-600 mb-1";

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg overflow-hidden"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 border-b pb-4">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="bg-blue-50 p-3 rounded-full mr-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Mi Perfil</h1>
                <p className="text-gray-500 text-sm">Administra tu información personal</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              {!isEditing && !showPasswordSection && (
                <>
                  <button
                    onClick={handleEdit}
                    className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Editar
                  </button>
                  <button
                    onClick={() => setShowPasswordSection(true)}
                    className="flex items-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Cambiar Contraseña
                  </button>
                </>
              )}
              {isEditing && (
                <button
                  onClick={handleSave}
                  className="flex items-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </button>
              )}
              {showPasswordSection && (
                <button
                  onClick={() => setShowPasswordSection(false)}
                  className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </button>
              )}
            </div>
          </div>

          {/* Profile Edit Form */}
          {isEditing && (
            <motion.form 
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className={labelClass}>Nombre Completo</label>
                  <div className="relative">
                    <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input type="text" name="name" id="name" value={tempData.name} onChange={handleInputChange} className={`${inputClass} pl-10`} />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className={labelClass}>Correo Electrónico</label>
                  <div className="relative">
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input type="email" name="email" id="email" value={tempData.email} onChange={handleInputChange} className={`${inputClass} pl-10`} readOnly />
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className={labelClass}>Teléfono</label>
                  <div className="relative">
                    <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input type="tel" name="phone" id="phone" value={tempData.phone} onChange={handleInputChange} className={`${inputClass} pl-10`} />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="address" className={labelClass}>Dirección</label>
                  <div className="relative">
                    <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input type="text" name="address" id="address" value={tempData.address} onChange={handleInputChange} className={`${inputClass} pl-10`} />
                  </div>
                </div>
              </div>
            </motion.form>
          )}

          {/* Password Change Form */}
          {showPasswordSection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-medium text-gray-800 mb-4">Cambiar Contraseña</h2>
              {passwordError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                  {passwordError}
                </div>
              )}
              {passwordSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4">
                  {passwordSuccess}
                </div>
              )}
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className={labelClass}>Contraseña Actual</label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input 
                      type={showPassword.current ? "text" : "password"} 
                      name="currentPassword" 
                      id="currentPassword" 
                      value={passwordData.currentPassword} 
                      onChange={handlePasswordChange} 
                      className={`${inputClass} pl-10 pr-10`}
                    />
                    <button 
                      type="button"
                      onClick={() => togglePasswordVisibility('current')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="newPassword" className={labelClass}>Nueva Contraseña</label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input 
                      type={showPassword.new ? "text" : "password"} 
                      name="newPassword" 
                      id="newPassword" 
                      value={passwordData.newPassword} 
                      onChange={handlePasswordChange} 
                      className={`${inputClass} pl-10 pr-10`}
                    />
                    <button 
                      type="button"
                      onClick={() => togglePasswordVisibility('new')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className={labelClass}>Confirmar Nueva Contraseña</label>
                  <div className="relative">
                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input 
                      type={showPassword.confirm ? "text" : "password"} 
                      name="confirmPassword" 
                      id="confirmPassword" 
                      value={passwordData.confirmPassword} 
                      onChange={handlePasswordChange} 
                      className={`${inputClass} pl-10 pr-10`}
                    />
                    <button 
                      type="button"
                      onClick={() => togglePasswordVisibility('confirm')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    Actualizar Contraseña
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Profile View */}
          {!isEditing && !showPasswordSection && (
            <motion.div 
              className="grid md:grid-cols-2 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <User className="w-4 h-4 text-gray-500 mr-2" />
                  <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
                </div>
                <p className="text-gray-800 font-medium">{profileData.name}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Mail className="w-4 h-4 text-gray-500 mr-2" />
                  <h3 className="text-sm font-medium text-gray-500">Correo Electrónico</h3>
                </div>
                <p className="text-gray-800 font-medium">{profileData.email}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <Phone className="w-4 h-4 text-gray-500 mr-2" />
                  <h3 className="text-sm font-medium text-gray-500">Teléfono</h3>
                </div>
                <p className="text-gray-800 font-medium">{profileData.phone}</p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                  <h3 className="text-sm font-medium text-gray-500">Dirección</h3>
                </div>
                <p className="text-gray-800 font-medium">{profileData.address}</p>
              </div>
            </motion.div>
          )}

          <div className="mt-8 text-center border-t pt-4">
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Volver
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}