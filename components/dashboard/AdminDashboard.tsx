import { useState, useMemo } from 'react';
import { useAuth } from '../../lib/auth-context';
import { mockSolicitudes, mockUsuarios, Solicitud } from '../../lib/mock-data';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  LogOut,
  Bell,
  Building,
  FileText,
  DollarSign,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Users
} from 'lucide-react';
import { RequestHistory } from './RequestHistory';
import { toast } from 'sonner@2.0.3';

interface Notificacion {
  id: string;
  tipo: 'pago' | 'solicitud';
  mensaje: string;
  fecha: string;
  leida: boolean;
  usuario: string;
  detalle?: string;
}

type FiltroNotificacion = 'todas' | 'pagos' | 'solicitudes' | 'no-leidas';

export function AdminDashboard() {
  const { currentUser, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<'overview' | 'notifications' | 'requests'>('overview');
  const [filtroNotificacion, setFiltroNotificacion] = useState<FiltroNotificacion>('todas');
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>([
    {
      id: 'not001',
      tipo: 'pago',
      mensaje: 'María González ha realizado el pago de arriendo',
      fecha: '2025-01-20T14:30:00',
      leida: false,
      usuario: 'María González',
      detalle: 'Arriendo Enero 2025 - $850,000'
    },
    {
      id: 'not002',
      tipo: 'solicitud',
      mensaje: 'Nueva solicitud de mantenimiento - Departamento 102',
      fecha: '2025-01-20T10:15:00',
      leida: false,
      usuario: 'María González',
      detalle: 'Reparación de llave de agua caliente'
    },
    {
      id: 'not003',
      tipo: 'pago',
      mensaje: 'Carlos Rodríguez ha realizado el pago de arriendo',
      fecha: '2025-01-19T16:45:00',
      leida: true,
      usuario: 'Carlos Rodríguez',
      detalle: 'Arriendo Enero 2025 - $1,400,000'
    },
    {
      id: 'not004',
      tipo: 'solicitud',
      mensaje: 'Nueva sugerencia - Sistema de gimnasio',
      fecha: '2025-01-19T09:20:00',
      leida: true,
      usuario: 'María González',
      detalle: 'Horario extendido para el gimnasio'
    },
    {
      id: 'not005',
      tipo: 'pago',
      mensaje: 'Ana Martínez ha realizado el pago de arriendo',
      fecha: '2025-01-18T11:00:00',
      leida: true,
      usuario: 'Ana Martínez',
      detalle: 'Arriendo Enero 2025 - $1,200,000'
    }
  ]);

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada exitosamente');
  };

  const marcarComoLeida = (id: string) => {
    setNotificaciones(prev =>
      prev.map(not => not.id === id ? { ...not, leida: true } : not)
    );
    toast.success('Notificación marcada como leída');
  };

  const marcarTodasLeidas = () => {
    setNotificaciones(prev =>
      prev.map(not => ({ ...not, leida: true }))
    );
    toast.success('Todas las notificaciones marcadas como leídas');
  };

  const handleNotificationCardClick = () => {
    setActiveSection('notifications');
    setFiltroNotificacion('no-leidas');
    toast.info(`Mostrando ${stats.notificacionesNoLeidas} notificaciones sin leer`);
  };

  const handleRequestCardClick = () => {
    setActiveSection('requests');
    toast.info(`Mostrando ${stats.solicitudesPendientes} solicitudes pendientes`);
  };

  const handlePaymentCardClick = () => {
    setActiveSection('notifications');
    setFiltroNotificacion('pagos');
    toast.info(`Mostrando ${stats.pagosEsteMes} pagos de este mes`);
  };

  const handleResidentCardClick = () => {
    toast.info(`Hay ${stats.residentes} residentes activos en el edificio`);
  };

  const stats = useMemo(() => {
    const notificacionesNoLeidas = notificaciones.filter(n => !n.leida).length;
    const solicitudesPendientes = mockSolicitudes.filter(s => s.Estado === 'Pendiente').length;
    const pagosEsteMes = notificaciones.filter(n => n.tipo === 'pago').length;
    const solicitudesTotal = notificaciones.filter(n => n.tipo === 'solicitud').length;
    const residentes = mockUsuarios.filter(u => u.Rol === 'Residente/Arrendador').length;

    return {
      notificacionesNoLeidas,
      solicitudesPendientes,
      pagosEsteMes,
      solicitudesTotal,
      residentes
    };
  }, [notificaciones]);

  const notificacionesFiltradas = useMemo(() => {
    switch (filtroNotificacion) {
      case 'pagos':
        return notificaciones.filter(n => n.tipo === 'pago');
      case 'solicitudes':
        return notificaciones.filter(n => n.tipo === 'solicitud');
      case 'no-leidas':
        return notificaciones.filter(n => !n.leida);
      default:
        return notificaciones;
    }
  }, [notificaciones, filtroNotificacion]);

  const formatFecha = (fecha: string) => {
    const date = new Date(fecha);
    const ahora = new Date();
    const diff = ahora.getTime() - date.getTime();
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);

    if (minutos < 60) return `Hace ${minutos} min`;
    if (horas < 24) return `Hace ${horas}h`;
    if (dias < 7) return `Hace ${dias}d`;
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Modern Header with gradient */}
      <header className="sticky top-0 z-10 glass-effect shadow-lg">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
              <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-ocean rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-base sm:text-lg md:text-xl truncate">{currentUser.Nombre}</h2>
                <p className="text-xs sm:text-sm text-slate-600 truncate">Panel de Administración</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {stats.notificacionesNoLeidas > 0 && (
                <div className="relative">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                    {stats.notificacionesNoLeidas}
                  </span>
                </div>
              )}
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
                ? 'gradient-ocean text-white shadow-xl border-0 btn-glow scale-105' 
                : 'hover:bg-slate-100 hover:scale-105'
            }`}
          >
            <Building className="w-4 h-4 sm:mr-2" />
            <span className="sm:hidden ml-1">Inicio</span>
            <span className="hidden sm:inline">Resumen</span>
          </Button>
          <Button
            variant={activeSection === 'notifications' ? 'default' : 'ghost'}
            onClick={() => setActiveSection('notifications')}
            className={`flex-1 min-w-[100px] sm:min-w-[120px] whitespace-nowrap text-sm sm:text-base transition-all duration-300 relative ${
              activeSection === 'notifications' 
                ? 'gradient-ocean text-white shadow-xl border-0 btn-glow scale-105' 
                : 'hover:bg-slate-100 hover:scale-105'
            }`}
          >
            <Bell className="w-4 h-4 sm:mr-2" />
            {stats.notificacionesNoLeidas > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">
                {stats.notificacionesNoLeidas}
              </span>
            )}
            <span className="sm:hidden ml-1">Notif.</span>
            <span className="hidden sm:inline">Notificaciones</span>
          </Button>
          <Button
            variant={activeSection === 'requests' ? 'default' : 'ghost'}
            onClick={() => setActiveSection('requests')}
            className={`flex-1 min-w-[100px] sm:min-w-[120px] whitespace-nowrap text-sm sm:text-base transition-all duration-300 ${
              activeSection === 'requests' 
                ? 'gradient-ocean text-white shadow-xl border-0 btn-glow scale-105' 
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
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              <Card 
                className="p-4 sm:p-6 border-0 shadow-xl bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={handleNotificationCardClick}
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-accent rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  {stats.notificacionesNoLeidas > 0 && (
                    <Badge className="gradient-warm text-white border-0 text-xs animate-pulse">
                      Nuevas
                    </Badge>
                  )}
                </div>
                <div className="text-2xl sm:text-3xl mb-1 group-hover:text-purple-600 transition-colors">{stats.notificacionesNoLeidas}</div>
                <div className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-800 transition-colors">Notificaciones sin leer</div>
              </Card>

              <Card 
                className="p-4 sm:p-6 border-0 shadow-xl bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={handleRequestCardClick}
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-ocean rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  {stats.solicitudesPendientes > 0 && (
                    <Badge className="bg-blue-100 text-blue-700 border-0 text-xs">
                      Pendientes
                    </Badge>
                  )}
                </div>
                <div className="text-2xl sm:text-3xl mb-1 group-hover:text-blue-600 transition-colors">{stats.solicitudesPendientes}</div>
                <div className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-800 transition-colors">Solicitudes pendientes</div>
              </Card>

              <Card 
                className="p-4 sm:p-6 border-0 shadow-xl bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={handlePaymentCardClick}
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-success rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 group-hover:text-green-700 transition-colors" />
                </div>
                <div className="text-2xl sm:text-3xl mb-1 group-hover:text-green-600 transition-colors">{stats.pagosEsteMes}</div>
                <div className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-800 transition-colors">Pagos este mes</div>
              </Card>

              <Card 
                className="p-4 sm:p-6 border-0 shadow-xl bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                onClick={handleResidentCardClick}
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 gradient-warm rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <Badge className="bg-orange-100 text-orange-700 border-0 text-xs">
                    Activos
                  </Badge>
                </div>
                <div className="text-2xl sm:text-3xl mb-1 group-hover:text-orange-600 transition-colors">{stats.residentes}</div>
                <div className="text-xs sm:text-sm text-slate-600 group-hover:text-slate-800 transition-colors">Residentes activos</div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-4 sm:p-6 md:p-8 border-0 shadow-xl bg-white">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg md:text-xl flex items-center gap-2">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  Actividad Reciente
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveSection('notifications')}
                  className="text-xs sm:text-sm"
                >
                  Ver todas
                </Button>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {notificaciones.slice(0, 5).map((not) => (
                  <div
                    key={not.id}
                    className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all ${
                      !not.leida 
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-purple-500' 
                        : 'bg-slate-50'
                    }`}
                  >
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      not.tipo === 'pago' 
                        ? 'gradient-success' 
                        : 'gradient-ocean'
                    }`}>
                      {not.tipo === 'pago' ? (
                        <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      ) : (
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm sm:text-base mb-0.5 sm:mb-1">{not.mensaje}</p>
                      {not.detalle && (
                        <p className="text-xs sm:text-sm text-slate-600 mb-1">{not.detalle}</p>
                      )}
                      <p className="text-xs text-slate-500">{formatFecha(not.fecha)}</p>
                    </div>
                    {!not.leida && (
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-600 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Notifications Section */}
        {activeSection === 'notifications' && (
          <div className="space-y-4 sm:space-y-6 animate-fade-in">
            <Card className="p-4 sm:p-6 md:p-8 border-0 shadow-xl bg-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg md:text-xl flex items-center gap-2">
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  Notificaciones
                </h3>
                {stats.notificacionesNoLeidas > 0 && (
                  <Button
                    onClick={marcarTodasLeidas}
                    variant="outline"
                    size="sm"
                    className="text-xs sm:text-sm w-full sm:w-auto"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Marcar todas como leídas
                  </Button>
                )}
              </div>

              {/* Filter tabs */}
              <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto scrollbar-hide">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setFiltroNotificacion('todas')}
                  className={`text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                    filtroNotificacion === 'todas' 
                      ? 'gradient-ocean text-white border-0 shadow-lg scale-105' 
                      : 'hover:bg-slate-100 hover:scale-105'
                  }`}
                >
                  Todas ({notificaciones.length})
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setFiltroNotificacion('pagos')}
                  className={`text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                    filtroNotificacion === 'pagos' 
                      ? 'gradient-ocean text-white border-0 shadow-lg scale-105' 
                      : 'hover:bg-slate-100 hover:scale-105'
                  }`}
                >
                  Pagos ({stats.pagosEsteMes})
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setFiltroNotificacion('solicitudes')}
                  className={`text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                    filtroNotificacion === 'solicitudes' 
                      ? 'gradient-ocean text-white border-0 shadow-lg scale-105' 
                      : 'hover:bg-slate-100 hover:scale-105'
                  }`}
                >
                  Solicitudes ({stats.solicitudesTotal})
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setFiltroNotificacion('no-leidas')}
                  className={`text-xs sm:text-sm whitespace-nowrap transition-all duration-300 ${
                    filtroNotificacion === 'no-leidas' 
                      ? 'gradient-ocean text-white border-0 shadow-lg scale-105' 
                      : 'hover:bg-slate-100 hover:scale-105'
                  }`}
                >
                  No leídas ({stats.notificacionesNoLeidas})
                </Button>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {notificacionesFiltradas.length > 0 ? (
                  notificacionesFiltradas.map((not) => (
                    <div
                      key={not.id}
                      className={`group relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl transition-all cursor-pointer ${
                        !not.leida 
                          ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-l-4 border-purple-500 hover:shadow-lg' 
                          : 'bg-slate-50 hover:bg-slate-100 hover:shadow-md'
                      }`}
                      onClick={() => !not.leida && marcarComoLeida(not.id)}
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                          not.tipo === 'pago' 
                            ? 'gradient-success' 
                            : 'gradient-ocean'
                        }`}>
                          {not.tipo === 'pago' ? (
                            <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          ) : (
                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm sm:text-base mb-1">{not.mensaje}</p>
                              <p className="text-xs sm:text-sm text-slate-600 mb-1">
                                <User className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                                {not.usuario}
                              </p>
                            </div>
                            {!not.leida && (
                              <Badge className="gradient-warm text-white border-0 text-xs whitespace-nowrap">
                                Nueva
                              </Badge>
                            )}
                          </div>
                          {not.detalle && (
                            <p className="text-xs sm:text-sm text-slate-600 bg-white/50 rounded-lg p-2 sm:p-3 mb-2">
                              {not.detalle}
                            </p>
                          )}
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            {formatFecha(not.fecha)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 gradient-warm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl mb-2">No hay notificaciones</h3>
                    <p className="text-slate-600 text-sm sm:text-base">
                      {filtroNotificacion === 'todas' && 'No tienes notificaciones aún'}
                      {filtroNotificacion === 'pagos' && 'No hay notificaciones de pagos'}
                      {filtroNotificacion === 'solicitudes' && 'No hay notificaciones de solicitudes'}
                      {filtroNotificacion === 'no-leidas' && 'Todas las notificaciones están marcadas como leídas'}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Requests Section */}
        {activeSection === 'requests' && (
          <div className="animate-fade-in">
            <Card className="p-4 sm:p-6 md:p-8 border-0 shadow-xl bg-white">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                <h3 className="text-base sm:text-lg md:text-xl">Todas las Solicitudes</h3>
              </div>
              <RequestHistory solicitudes={mockSolicitudes} isAdmin />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}