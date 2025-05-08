"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Phone, Mail, Lock, Navigation, Check, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Script from 'next/script';
import Link from 'next/link';
import { LoadScript } from '@react-google-maps/api';

type FormData = {
  companyName: string;
  phoneNumber: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
};

type MapLocation = {
  lat: number;
  lng: number;
  address: string;
};

declare global {
  interface Window {
    google: typeof google;
  }
}

export default function RegisterPage() {
  // Form states
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    phoneNumber: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  
  const [formStage, setFormStage] = useState<number>(1);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Map states
  const [mapLocation, setMapLocation] = useState<MapLocation>({
    lat: 0,
    lng: 0,
    address: ''
  });
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [centerMarker, setCenterMarker] = useState<google.maps.Marker | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [mapLoading, setMapLoading] = useState<boolean>(true);
  const [mapError, setMapError] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  
  // Refs
  const mapRef = useRef<HTMLDivElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1
      } 
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 100, 
        damping: 12 
      }
    }
  };

  const mapContainerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 70, 
        damping: 20,
        delay: 0.2
      }
    }
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
    
    // Check password match
    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'password') {
        setPasswordsMatch(value === formData.confirmPassword || formData.confirmPassword === '');
      } else {
        setPasswordsMatch(value === formData.password);
      }
    }
  };

  // Initialize map
  const initMap = () => {
    try {
      if (!window.google || !window.google.maps) {
        throw new Error("Google Maps API no está disponible");
      }
      
      if (!mapRef.current) {
        // Retry after a short delay if the container isn't available yet
        setTimeout(() => {
          if (mapRef.current) {
            initMap();
          } else {
            throw new Error("El contenedor del mapa no existe");
          }
        }, 100);
        return;
      }

      // Default to Mexico City if geolocation fails or not supported
      const defaultLocation = { lat: 19.4326, lng: -99.1332 };
      
      const mapInstance = new google.maps.Map(mapRef.current, {
        center: defaultLocation,
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      });

      // Create center marker (pointer)
      const centerMarkerInstance = new google.maps.Marker({
        position: defaultLocation,
        map: mapInstance,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#4285F4",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "white"
        },
        draggable: false,
        zIndex: 999
      });

      // Create draggable marker for business location
      const markerInstance = new google.maps.Marker({
        position: defaultLocation,
        map: mapInstance,
        title: 'Ubicación de la Empresa',
        animation: google.maps.Animation.DROP,
        draggable: true
      });

      const geocoderInstance = new google.maps.Geocoder();

      // Get address for initial location
      geocoderInstance.geocode({ location: defaultLocation }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const address = results[0].formatted_address;
          updateMapLocation(defaultLocation.lat, defaultLocation.lng, address);
        }
      });

      // Update center marker position when map is dragged
      mapInstance.addListener('center_changed', () => {
        const center = mapInstance.getCenter();
        if (center) {
          centerMarkerInstance.setPosition(center);
        }
      });

      // Update address when map is idle (after dragging)
      mapInstance.addListener('idle', () => {
        const center = mapInstance.getCenter();
        if (center) {
          geocoderInstance.geocode({ location: center }, (results, status) => {
            if (status === 'OK' && results?.[0]) {
              const address = results[0].formatted_address;
              updateMapLocation(center.lat(), center.lng(), address);
            }
          });
        }
      });

      // Add click event to map
      mapInstance.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          updateMarkerPosition(e.latLng);
        }
      });

      // Add dragend event to marker
      markerInstance.addListener('dragend', () => {
        const position = markerInstance.getPosition();
        if (position) {
          updateMarkerPosition(position);
        }
      });

      setMap(mapInstance);
      setMarker(markerInstance);
      setCenterMarker(centerMarkerInstance);
      setGeocoder(geocoderInstance);
      setMapLoading(false);
      
      // Initialize autocomplete after map is loaded
      initAutocomplete();
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError("Error al inicializar el mapa. Por favor recarga la página.");
      setMapLoading(false);
    }
  };

  // Update marker position and get address
  const updateMarkerPosition = (latLng: google.maps.LatLng) => {
    if (marker && map && geocoder) {
      const lat = latLng.lat();
      const lng = latLng.lng();
      
      marker.setPosition(latLng);
      map.panTo(latLng);

      // Get address from coordinates
      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const address = results[0].formatted_address;
          updateMapLocation(lat, lng, address);
        } else {
          updateMapLocation(lat, lng, `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`);
        }
      });
    }
  };

  // Update map location state and form data
  const updateMapLocation = (lat: number, lng: number, address: string) => {
    setMapLocation({ lat, lng, address });
    setFormData(prev => ({
      ...prev,
      address: address
    }));
    
    // Clear address error
    if (formErrors.address) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.address;
        return newErrors;
      });
    }
  };

  // Initialize autocomplete
  const initAutocomplete = () => {
    try {
      if (window.google?.maps?.places && addressInputRef.current) {
        const autocompleteInstance = new google.maps.places.Autocomplete(addressInputRef.current, {
          types: ['address'],
          componentRestrictions: { country: 'mx' }
        });

        autocompleteInstance.addListener('place_changed', () => {
          const place = autocompleteInstance.getPlace();

          if (place.geometry?.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            const address = place.formatted_address || '';
            
            updateMapLocation(lat, lng, address);
            
            if (map && marker && centerMarker) {
              const newPosition = new google.maps.LatLng(lat, lng);
              map.setCenter(newPosition);
              map.setZoom(15);
              marker.setPosition(newPosition);
              centerMarker.setPosition(newPosition);
            }
          }
        });

        setAutocomplete(autocompleteInstance);
      }
    } catch (error) {
      console.error("Error initializing autocomplete:", error);
    }
  };

  // Handle find my location with better error handling
  const handleFindMyLocation = () => {
    if (!navigator.geolocation) {
      const errorMsg = "Tu navegador no soporta geolocalización o no has dado los permisos necesarios.";
      console.error(errorMsg);
      setLocationError(errorMsg);
      return;
    }

    if (!geocoder || !map || !marker || !centerMarker) {
      console.error("Map components not initialized");
      setLocationError("El mapa no se ha cargado correctamente. Por favor recarga la página.");
      return;
    }

    setMapLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latLng = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        
        map.setCenter(latLng);
        map.setZoom(15);
        marker.setPosition(latLng);
        centerMarker.setPosition(latLng);
        updateMarkerPosition(latLng);
        setMapLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setMapLoading(false);
        
        let errorMessage = "Error al obtener tu ubicación: ";
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Has denegado el permiso de geolocalización.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "La información de ubicación no está disponible.";
            break;
          case error.TIMEOUT:
            errorMessage += "La solicitud de ubicación ha caducado.";
            break;
          default:
            errorMessage += "Error desconocido.";
        }
        setLocationError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000, // 10 segundos de timeout
        maximumAge: 0
      }
    );
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (autocomplete) {
        google.maps.event.clearInstanceListeners(autocomplete);
      }
    };
  }, [autocomplete]);

  // Initialize map when script is loaded and container is available
  useEffect(() => {
    if (scriptLoaded && mapRef.current && formStage === 2) {
      initMap();
    }
  }, [scriptLoaded, formStage]);

  // Validate form
  const validateForm = (stage: number) => {
    const errors: Record<string, string> = {};
    
    if (stage === 1) {
      if (!formData.companyName.trim()) {
        errors.companyName = "Ingrese el nombre de su empresa";
      }
      
      if (!formData.phoneNumber.trim()) {
        errors.phoneNumber = "Ingrese un número de teléfono";
      } else if (!/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
        errors.phoneNumber = "Formato de teléfono inválido";
      }
      
      if (!formData.email.trim()) {
        errors.email = "Ingrese su correo electrónico";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.email = "Formato de correo inválido";
      }
    }
    
    if (stage === 2) {
      if (!formData.address.trim()) {
        errors.address = "Seleccione la ubicación de su empresa";
      }
    }
    
    if (stage === 3) {
      if (!formData.password) {
        errors.password = "Ingrese una contraseña";
      } else if (formData.password.length < 8) {
        errors.password = "La contraseña debe tener al menos 8 caracteres";
      }
      
      if (!formData.confirmPassword) {
        errors.confirmPassword = "Confirme su contraseña";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Las contraseñas no coinciden";
        setPasswordsMatch(false);
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle next stage
  const handleNextStage = () => {
    if (validateForm(formStage)) {
      setFormStage(prev => prev + 1);
    }
  };

  // Handle previous stage
  const handlePrevStage = () => {
    setFormStage(prev => prev - 1);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm(formStage)) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        console.log('Form Data:', { ...formData, location: mapLocation });
        
        // Redirect to success page or dashboard
        window.location.href = '/dashboard';
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <motion.div 
          className="bg-white shadow-xl rounded-2xl w-full max-w-5xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Progress Bar */}
          <div className="bg-blue-50 px-6 py-4">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-blue-900">Paso {formStage} de 3</span>
                <span className="text-xs font-medium text-blue-900">{Math.round((formStage / 3) * 100)}%</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-1.5">
                <motion.div 
                  className="bg-blue-600 h-1.5 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${(formStage / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3">
            {/* Logo Section - Visible on larger screens */}
            <div className="hidden md:flex bg-gradient-to-br from-blue-50 to-white flex-col items-center justify-center p-8">
              <div className="text-center">
                <Link href="/" className="block">
                  <Image 
                    src="/logo.svg" 
                    alt="ServiceFlow Logo"
                    width={150}
                    height={150}
                    className="mx-auto mb-6"
                  />
                </Link>
                <h1 className="text-2xl font-bold text-blue-900 mb-3">ServiceFlow</h1>
                <p className="text-gray-600 text-sm mb-8">
                  Transforma tu gestión empresarial con tecnología de vanguardia
                </p>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center text-gray-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Registro sencillo y rápido</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Plataforma personalizable</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm">Comienza gratis hoy mismo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Form with multi-stage approach */}
            <div className="col-span-2 p-6 md:p-12 space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-blue-900">Regístrate y comienza</h2>
                  <p className="text-gray-600 mt-1">Crea tu cuenta de ServiceFlow</p>
                </div>
                {/* Mobile Logo */}
                <Link href="/" className="block md:hidden">
                  <Image 
                    src="/logo.svg" 
                    alt="ServiceFlow Logo"
                    width={60}
                    height={60}
                  />
                </Link>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  {/* Stage 1: Basic Information */}
                  {formStage === 1 && (
                    <motion.div 
                      key="stage1"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <motion.div variants={itemVariants} className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="companyName"
                          placeholder="Nombre de Empresa"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border ${formErrors.companyName ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                        />
                        {formErrors.companyName && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.companyName}</p>
                        )}
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phoneNumber"
                          placeholder="Número de Teléfono"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border ${formErrors.phoneNumber ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                        />
                        {formErrors.phoneNumber && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.phoneNumber}</p>
                        )}
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Correo Electrónico"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-4 py-3 border ${formErrors.email ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                        )}
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Stage 2: Location */}
                  {formStage === 2 && (
                    <motion.div 
                      key="stage2"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <motion.div variants={itemVariants} className="relative">
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
                          className={`w-full pl-10 pr-4 py-3 border ${formErrors.address ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                        />
                        {formErrors.address && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.address}</p>
                        )}
                      </motion.div>
                      
                      <motion.div 
                        variants={mapContainerVariants} 
                        className="relative"
                      >
                        {/* Load Google Maps script */}
                        <Script
                          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
                          onLoad={() => setScriptLoaded(true)}
                          onError={() => {
                            setMapError("Error al cargar Google Maps. Por favor recarga la página.");
                            setMapLoading(false);
                          }}
                        />
                        
                        <div 
                          ref={mapRef} 
                          className="w-full h-64 bg-gray-100 rounded-lg mb-2"
                          style={{ minHeight: '256px' }}
                        />
                        
                        {mapLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                            <div className="animate-pulse text-gray-500">Cargando mapa...</div>
                          </div>
                        )}
                        {mapError && (
                          <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded-lg">
                            <div className="text-red-500">{mapError}</div>
                          </div>
                        )}
                        {locationError && (
                          <div className="absolute bottom-2 left-2 right-2 bg-yellow-50 p-2 rounded text-sm text-yellow-800">
                            {locationError}
                          </div>
                        )}
                        <button 
                          type="button"
                          onClick={handleFindMyLocation}
                          className="absolute top-2 right-2 bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title="Usar mi ubicación actual"
                          disabled={mapLoading}
                        >
                          <Navigation className="w-5 h-5 text-blue-600" />
                        </button>
                        
                        <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800 flex items-start">
                          <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                          <p>
                            Mueve el mapa para centrar el puntero en la ubicación exacta de tu empresa
                          </p>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Stage 3: Password */}
                  {formStage === 3 && (
                    <motion.div 
                      key="stage3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-4"
                    >
                      <motion.div variants={itemVariants} className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Contraseña"
                          value={formData.password}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-12 py-3 border ${formErrors.password ? 'border-red-400' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                          minLength={8}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                        {formErrors.password && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
                        )}
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Lock className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="Confirmar Contraseña"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className={`w-full pl-10 pr-12 py-3 border ${formErrors.confirmPassword ? 'border-red-400' : passwordsMatch ? 'border-gray-300' : 'border-red-400'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                          minLength={8}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                        {formErrors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-500">{formErrors.confirmPassword}</p>
                        )}
                        {!passwordsMatch && !formErrors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-500">Las contraseñas no coinciden</p>
                        )}
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800">
                        <p className="font-medium mb-1">La contraseña debe contener:</p>
                        <ul className="space-y-1">
                          <li className="flex items-center">
                            <Check className="w-4 h-4 mr-2 text-green-500" />
                            Al menos 8 caracteres
                          </li>
                          <li className="flex items-center">
                            <Check className="w-4 h-4 mr-2 text-green-500" />
                            Letras y números
                          </li>
                        </ul>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  {formStage > 1 ? (
                    <button
                      type="button"
                      onClick={handlePrevStage}
                      className="flex items-center justify-center w-1/3 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Atrás
                    </button>
                  ) : (
                    <Link href="/" className="flex items-center justify-center w-1/3 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500">
                      Cancelar
                    </Link>
                  )}
                  
                  {formStage < 3 ? (
                    <button
                      type="button"
                      onClick={handleNextStage}
                      className="flex items-center justify-center w-2/3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Continuar
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="flex items-center justify-center w-2/3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Registrando...
                        </>
                      ) : (
                        "Completar Registro"
                      )}
                    </button>
                  )}
                </div>
              </form>
              
              {/* Already have an account */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  ¿Ya tienes una cuenta? <Link href="/signup" className="text-blue-600 font-medium hover:text-blue-700">Inicia Sesión</Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}