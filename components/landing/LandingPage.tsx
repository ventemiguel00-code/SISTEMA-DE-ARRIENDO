import { useState } from 'react';
import { mockEventos, mockApartamentos, Apartamento } from '../../lib/mock-data';
import { EventsCarousel } from './EventsCarousel';
import { BuildingMap } from './BuildingMap';
import { UnitDetailModal } from './UnitDetailModal';
import { Button } from '../ui/button';
import { Building, LogIn, Calendar, Home, Star, Shield, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface LandingPageProps {
  onLoginClick: () => void;
}

export function LandingPage({ onLoginClick }: LandingPageProps) {
  const [selectedUnit, setSelectedUnit] = useState<Apartamento | null>(null);
  const [showUnitModal, setShowUnitModal] = useState(false);

  const handleUnitClick = (apartamento: Apartamento) => {
    setSelectedUnit(apartamento);
    setShowUnitModal(true);
  };

  const handleCloseModal = () => {
    setShowUnitModal(false);
    setTimeout(() => setSelectedUnit(null), 300);
  };

  const availableUnitsCount = mockApartamentos.filter(a => a.Estado === 'Disponible').length;

  return (
    <div className="min-h-screen overflow-x-hidden max-w-full">
      {/* Header with glass effect */}
      <header className="sticky top-0 z-20 glass-effect shadow-lg border-b border-green-100 w-full">
        <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-5 max-w-full">
          <div className="flex items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 touch-manipulation">
              <div className="w-12 h-12 sm:w-14 sm:h-14 gradient-forest rounded-xl flex items-center justify-center shadow-xl flex-shrink-0 transition-transform hover:scale-105">
                <Building className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="min-w-0">
                <h1 className="text-gradient truncate text-lg sm:text-xl md:text-2xl">Edificio Forest</h1>
                <p className="text-xs sm:text-sm text-slate-600 hidden sm:block">Tu nuevo hogar te espera</p>
              </div>
            </div>
            <Button 
              onClick={onLoginClick}
              size="lg"
              className="gradient-forest text-white hover:opacity-90 shadow-xl hover:shadow-2xl border-0 px-4 sm:px-6 flex-shrink-0 btn-lift btn-glow h-12 sm:h-auto min-w-[100px] sm:min-w-0"
            >
              <LogIn className="w-5 h-5 sm:w-4 sm:h-4 sm:mr-2" />
              <span className="hidden sm:inline">Portal Residentes</span>
              <span className="sm:hidden ml-1.5">Portal</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with modern overlay */}
      <section className="relative h-[450px] sm:h-[500px] md:h-[600px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1611095210561-67f0832b1ca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjA5NDUwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Edificio Forest"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 via-emerald-800/70 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white max-w-3xl animate-fade-in">
              <div className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Tu espacio en armonía con la naturaleza</span>
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl mb-4 sm:mb-6 leading-tight">
                Vive la experiencia<br />
                <span className="bg-gradient-to-r from-green-300 to-emerald-200 bg-clip-text text-transparent">
                  Edificio Forest
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl opacity-95 mb-6 sm:mb-8 leading-relaxed">
                Más que un edificio, una comunidad vibrante donde cada día es una nueva oportunidad
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base lg:text-lg">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>{availableUnitsCount} disponibles</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
                  <Building className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>6 pisos</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                  <span className="hidden sm:inline">Calidad superior</span>
                  <span className="sm:hidden">Premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-br from-lime-400 to-green-600 rounded-full opacity-20 blur-3xl" />
      </section>

      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16 space-y-10 sm:space-y-12 md:space-y-16 max-w-full overflow-x-hidden">
        {/* Events Section */}
        <section className="animate-fade-in max-w-full">
          <div className="text-center mb-6 sm:mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-3 sm:mb-4">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-700" />
              <span className="text-xs sm:text-sm text-green-800">Próximos Eventos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">
              <span className="text-gradient">Eventos Destacados</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg px-4">
              Participa en las actividades de nuestra vibrante comunidad
            </p>
          </div>
          <EventsCarousel eventos={mockEventos} />
        </section>

        {/* Building Availability Map */}
        <section className="animate-fade-in">
          <BuildingMap
            apartamentos={mockApartamentos}
            onUnitClick={handleUnitClick}
          />
        </section>

        {/* Features Section with modern cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 py-4 sm:py-6 md:py-8">
          <div className="group card-hover p-6 sm:p-8 glass-effect rounded-2xl shadow-xl border-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 gradient-forest opacity-10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-forest rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Building className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="mb-2 sm:mb-3">Ubicación Privilegiada</h3>
              <p className="text-slate-600 text-sm sm:text-base">
                En el corazón de la ciudad, conectado con todo lo que necesitas para tu día a día
              </p>
            </div>
          </div>
          
          <div className="group card-hover p-6 sm:p-8 glass-effect rounded-2xl shadow-xl border-0 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 gradient-sunset opacity-10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-sunset rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Home className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="mb-2 sm:mb-3">Diseño Excepcional</h3>
              <p className="text-slate-600 text-sm sm:text-base">
                Espacios modernos con acabados premium y la última tecnología en confort
              </p>
            </div>
          </div>
          
          <div className="group card-hover p-6 sm:p-8 glass-effect rounded-2xl shadow-xl border-0 relative overflow-hidden sm:col-span-2 lg:col-span-1">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 gradient-warm opacity-10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 gradient-warm rounded-2xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="mb-2 sm:mb-3">Seguridad Total</h3>
              <p className="text-slate-600 text-sm sm:text-base">
                Sistema de seguridad 24/7 y comunidad activa para tu tranquilidad
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
          <div className="absolute inset-0 gradient-forest opacity-90" />
          <div className="relative px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16 lg:py-20 text-center text-white">
            <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 sm:mb-6 animate-pulse" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4">¿Listo para tu nuevo hogar?</h2>
            <p className="text-base sm:text-lg md:text-xl opacity-90 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Únete a nuestra comunidad y descubre por qué Edificio Forest es el lugar perfecto para vivir
            </p>
            <Button 
              onClick={onLoginClick}
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50 shadow-2xl hover:shadow-3xl px-8 sm:px-10 py-5 sm:py-7 text-base sm:text-lg btn-lift border-2 border-green-100"
            >
              <LogIn className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Acceder ahora
            </Button>
          </div>
        </section>
      </div>

      {/* Modern Footer */}
      <footer className="relative mt-10 sm:mt-16 md:mt-20 gradient-cool text-white py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                <Building className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <h3 className="text-base sm:text-lg">Edificio Forest</h3>
            </div>
            <p className="opacity-90 mb-2 text-sm sm:text-base">&copy; 2025 Edificio Forest. Todos los derechos reservados.</p>
            <p className="text-xs sm:text-sm opacity-75">Plataforma de Gestión de Arriendos y Comunidad</p>
          </div>
        </div>
      </footer>

      {/* Unit Detail Modal */}
      <UnitDetailModal
        apartamento={selectedUnit}
        open={showUnitModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}
