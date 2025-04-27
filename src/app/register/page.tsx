"use client";

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, Phone, Mail, Lock, Navigation } from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    phoneNumber: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  const [mapLocation, setMapLocation] = useState({
    lat: 17.9564, 
    lng: -102.1908,
    address: 'Lázaro Cárdenas, Michoacán, México'
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const initMap = () => {
    if (window.google && mapRef.current) {
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: { lat: mapLocation.lat, lng: mapLocation.lng },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      const markerInstance = new google.maps.Marker({
        position: { lat: mapLocation.lat, lng: mapLocation.lng },
        map: mapInstance,
        title: 'Ubicación de la Empresa'
      });

      setMap(mapInstance);
      setMarker(markerInstance);
    }
  };

  const updateMapLocation = (lat: number, lng: number, address: string) => {
    setMapLocation({ lat, lng, address });

    setFormData(prev => ({
      ...prev,
      address: address
    }));

    if (map && marker) {
      const newPosition = new google.maps.LatLng(lat, lng);
      map.setCenter(newPosition);
      marker.setPosition(newPosition);
    }
  };

  const initAutocomplete = () => {
    if (window.google && window.google.maps && window.google.maps.places && addressInputRef.current) {
      initMap();

      const autocompleteInstance = new google.maps.places.Autocomplete(addressInputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'mx' }
      });

      autocompleteInstance.addListener('place_changed', () => {
        const place = autocompleteInstance.getPlace();

        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          const address = place.formatted_address || '';
          
          updateMapLocation(lat, lng, address);
        }
      });

      setAutocomplete(autocompleteInstance);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      initAutocomplete();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', { ...formData, location: mapLocation });
  };

  return (
    <>
      <Script 
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="beforeInteractive"
        onReady={initAutocomplete}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-4">
        <motion.div 
          className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl grid md:grid-cols-3 overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo Section */}
          <div className="col-span-1 bg-[#FFFFFF] flex items-center justify-center p-8">
            <div className="text-center">
              <Image 
                src="/logo.svg" 
                alt="Company Logo"
                width={250}
                height={250}
                className="mx-auto mb-6 rounded-full"
              />
              <h1 className="text-3xl font-bold text-gray-800 mb-4">ServiceFlow</h1>
              <p className="text-gray-600 text-sm">
                Transforma tu gestión empresarial con tecnología de vanguardia
              </p>
            </div>
          </div>

          {/* Registration Form */}
          <div className="col-span-2 p-12 space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-blue-900">Registrate y comienza</h2>
              <p className="text-gray-600 mt-2">Crea tu cuenta de ServiceFlow</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Nombre de Empresa"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Número de Teléfono"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  ref={addressInputRef}
                  type="text"
                  name="address"
                  placeholder="Dirección de la Empresa"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    minLength={8}
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar Contraseña"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    minLength={8}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Registrar
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="bg-blue-100 hidden md:block col-span-3">
            <div className="p-12 h-full flex flex-col justify-center items-center">
              <div className="bg-white p-6 rounded-xl shadow-lg text-center w-full">
                <MapPin className="w-16 h-16 mx-auto text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Ubica tu negocio</h3>
                <p className="text-gray-600 mb-4">
                  Selecciona la ubicación exacta de tu negocio para estar en contacto contigo
                </p>
                <div 
                  ref={mapRef} 
                  className="w-full h-64 bg-gray-200 rounded-lg mb-4"
                />
                {mapLocation.address ? (
                  <div className="w-full bg-gray-100 flex items-center justify-center rounded-lg p-4">
                    <p className="text-gray-700 text-sm">{mapLocation.address}</p>
                  </div>
                ) : (
                  <div className="w-full bg-gray-200 flex items-center justify-center rounded-lg p-4">
                    <Navigation className="w-12 h-12 text-gray-500" />
                    <p className="text-gray-500">Selecciona una ubicación</p>
                  </div>
                )}
                <div className="mt-4 text-sm text-gray-600">
                  Lat: {mapLocation.lat.toFixed(4)}, Lng: {mapLocation.lng.toFixed(4)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}