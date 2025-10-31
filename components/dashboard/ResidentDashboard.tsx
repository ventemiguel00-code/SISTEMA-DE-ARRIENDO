import { useState } from 'react';
import { useAuth } from '../../lib/auth-context';
import { mockApartamentos, mockSolicitudes, Solicitud } from '../../lib/mock-data';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { 
  Home, 
  CreditCard, 
  FileText, 
  LogOut,
  Bed,
  Maximize,
  Bath,
  DollarSign,
  Sparkles,
  User
} from 'lucide-react';
import { PaymentSection } from './PaymentSection';
import { RequestForm } from './RequestForm';
import { RequestHistory } from './RequestHistory';
import { toast } from 'sonner@2.0.3';

export function ResidentDashboard() {
  const { currentUser, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<'overview' | 'payments' | 'requests'>('overview');
  const [userSolicitudes, setUserSolicitudes] = useState<Solicitud[]>(
    mockSolicitudes.filter(s => s.ID_Usuario === currentUser?.ID_Usuario)
  );

  if (!currentUser) return null;

  const miUnidad = currentUser.Unidad_Asignada
    ? mockApartamentos.find(a => a.ID_Unidad === currentUser.Unidad_Asignada)
    : null;

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada exitosamente');
  };

  const handleNewRequest = (solicitud: Solicitud) => {
    setUserSolicitudes(prev => [solicitud, ...prev]);
    toast.success('Solicitud enviada correctamente');
    setActiveSection('requests');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Modern Header with gradient */}
      <header className="sticky top-0 z-10 glass-effect shadow-lg">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-forest rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg md:text-xl truncate">{currentUser.Nombre}</h2>
                <p className="text-xs sm:text-sm text-slate-600 truncate">{currentUser.Email}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="border-slate-200 hover:bg-slate-100 flex-shrink-0 px-3 sm:px-4"
            >
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        {/* Modern Navigation Tabs */}
        <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 p-1.5 sm:p-2 bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-x-auto scrollbar-hide">
          <Button
            variant={activeSection === 'overview' ? 'default' : 'ghost'}
            onClick={() => setActiveSection('overview')}
            className={`flex-1 min-w-[100px] sm:min-w-[120px] whitespace-nowrap text-sm sm:text-base transition-all duration-300 ${
              activeSection === 'overview' 
                ? 'gradient-forest text-white shadow-xl border-0 btn-glow scale-105' 
                : 'hover:bg-slate-100 hover:scale-105'
            }`}
          >
            <Home className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Mi Departamento</span>
            <span className="sm:hidden ml-1">Dpto.</span>
          </Button>
          <Button
            variant={activeSection === 'payments' ? 'default' : 'ghost'}
            onClick={() => setActiveSection('payments')}
            className={`flex-1 min-w-[100px] sm:min-w-[120px] whitespace-nowrap text-sm sm:text-base transition-all duration-300 ${
              activeSection === 'payments' 
                ? 'gradient-forest text-white shadow-xl border-0 btn-glow scale-105' 
                : 'hover:bg-slate-100 hover:scale-105'
            }`}
          >
            <CreditCard className="w-4 h-4 sm:mr-2" />
            <span className="sm:hidden ml-1">Pagos</span>
            <span className="hidden sm:inline">Pagos</span>
          </Button>
          <Button
            variant={activeSection === 'requests' ? 'default' : 'ghost'}
            onClick={() => setActiveSection('requests')}
            className={`flex-1 min-w-[100px] sm:min-w-[120px] whitespace-nowrap text-sm sm:text-base transition-all duration-300 ${
              activeSection === 'requests' 
                ? 'gradient-forest text-white shadow-xl border-0 btn-glow scale-105' 
                : 'hover:bg-slate-100 hover:scale-105'
            }`}
          >
            <FileText className="w-4 h-4 sm:mr-2" />
            <span className="sm:hidden ml-1">Solicitudes</span>
            <span className="hidden sm:inline">Solicitudes</span>
          </Button>
        </div>

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            {miUnidad ? (
              <Card className="p-0 overflow-hidden border-0 shadow-xl">
                {/* Header with gradient */}
                <div className="relative gradient-forest text-white p-4 sm:p-6 md:p-8">
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white/10 rounded-full blur-3xl" />
                  <div className="relative flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full mb-2 sm:mb-3">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="text-xs sm:text-sm">Tu Hogar</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">
                        {miUnidad.Tipo_Unidad === 'Apartamento' ? 'Departamento' : 'Apartaestudio'} {miUnidad.ID_Unidad}
                      </h2>
                      <p className="text-sm sm:text-base md:text-lg opacity-90">{miUnidad.Tipo_Unidad} - Piso {miUnidad.Piso}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <div className="text-xs sm:text-sm opacity-80 mb-1">Arriendo mensual</div>
                      <div className="text-2xl sm:text-3xl">${(miUnidad.Precio_Oferta / 1000).toFixed(0)}K</div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 md:p-8">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="p-4 sm:p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                      <Maximize className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mb-2" />
                      <div className="text-xs sm:text-sm text-slate-600">Área Total</div>
                      <div className="text-xl sm:text-2xl text-slate-900">{miUnidad.Area} m²</div>
                    </div>
                    {miUnidad.Habitaciones && (
                      <div className="p-4 sm:p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                        <Bed className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 mb-2" />
                        <div className="text-xs sm:text-sm text-slate-600">Habitaciones</div>
                        <div className="text-xl sm:text-2xl text-slate-900">{miUnidad.Habitaciones}</div>
                      </div>
                    )}
                    {miUnidad.Banos && (
                      <div className="p-4 sm:p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                        <Bath className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mb-2" />
                        <div className="text-xs sm:text-sm text-slate-600">Baños</div>
                        <div className="text-xl sm:text-2xl text-slate-900">{miUnidad.Banos}</div>
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-5 md:p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
                    <h3 className="mb-2 sm:mb-3 flex items-center gap-2 text-base sm:text-lg">
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                      Descripción
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{miUnidad.Descripcion}</p>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-12 text-center border-0 shadow-xl bg-white">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 gradient-forest rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Home className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl mb-3">Sin Departamento Asignado</h3>
                  <p className="text-slate-600 text-lg">
                    Actualmente no tienes un departamento asignado. Contacta con la administración para más información.
                  </p>
                </div>
              </Card>
            )}

            {/* Modern Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div 
                className="group card-hover relative overflow-hidden p-6 sm:p-8 bg-white rounded-2xl shadow-xl border-0 cursor-pointer"
                onClick={() => setActiveSection('payments')}
              >
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 gradient-accent opacity-10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 gradient-accent rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="mb-2 text-base sm:text-lg">Realizar Pago</h3>
                  <p className="text-slate-600 text-sm sm:text-base">
                    Paga tu arriendo o administración de forma rápida y segura
                  </p>
                </div>
              </div>

              <div 
                className="group card-hover relative overflow-hidden p-6 sm:p-8 bg-white rounded-2xl shadow-xl border-0 cursor-pointer"
                onClick={() => setActiveSection('requests')}
              >
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 gradient-forest opacity-10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 gradient-forest rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="mb-2 text-base sm:text-lg">Nueva Solicitud</h3>
                  <p className="text-slate-600 text-sm sm:text-base">
                    Envía un reclamo, solicitud de mantenimiento o sugerencia
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payments Section */}
        {activeSection === 'payments' && (
          <div className="animate-fade-in">
            <PaymentSection
              usuario={currentUser}
              unidad={miUnidad}
            />
          </div>
        )}

        {/* Requests Section */}
        {activeSection === 'requests' && (
          <div className="space-y-6 animate-fade-in">
            <RequestForm
              usuarioId={currentUser.ID_Usuario}
              onSubmit={handleNewRequest}
            />
            <RequestHistory solicitudes={userSolicitudes} />
          </div>
        )}
      </div>
    </div>
  );
}
