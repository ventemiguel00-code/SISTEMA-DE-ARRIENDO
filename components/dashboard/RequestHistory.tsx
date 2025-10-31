import { Solicitud, EstadoSolicitud, mockUsuarios } from '../../lib/mock-data';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useState } from 'react';
import { History, Clock, AlertCircle, CheckCircle, Wrench, Lightbulb, AlertTriangle, User } from 'lucide-react';

interface RequestHistoryProps {
  solicitudes: Solicitud[];
  isAdmin?: boolean;
}

export function RequestHistory({ solicitudes, isAdmin = false }: RequestHistoryProps) {
  const [filtroTipo, setFiltroTipo] = useState<string>('todas');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');

  const getUserName = (userId: string) => {
    const usuario = mockUsuarios.find(u => u.ID_Usuario === userId);
    return usuario?.Nombre || 'Usuario desconocido';
  };

  // Filtrar solicitudes
  const solicitudesFiltradas = solicitudes.filter(solicitud => {
    const matchTipo = filtroTipo === 'todas' || solicitud.Tipo === filtroTipo;
    const matchEstado = filtroEstado === 'todos' || solicitud.Estado === filtroEstado;
    return matchTipo && matchEstado;
  });

  // Estadísticas para contadores
  const stats = {
    todas: solicitudes.length,
    mantenimiento: solicitudes.filter(s => s.Tipo === 'Mantenimiento').length,
    reclamos: solicitudes.filter(s => s.Tipo === 'Reclamo').length,
    sugerencias: solicitudes.filter(s => s.Tipo === 'Sugerencia').length,
    pendientes: solicitudes.filter(s => s.Estado === 'Pendiente').length,
    proceso: solicitudes.filter(s => s.Estado === 'En Proceso').length,
    resueltas: solicitudes.filter(s => s.Estado === 'Resuelta').length
  };
  const getEstadoStyle = (estado: EstadoSolicitud) => {
    switch (estado) {
      case 'Pendiente':
        return 'bg-yellow-100 text-yellow-700';
      case 'En Proceso':
        return 'bg-blue-100 text-blue-700';
      case 'Resuelta':
        return 'bg-green-100 text-green-700';
    }
  };

  const getEstadoIcon = (estado: EstadoSolicitud) => {
    switch (estado) {
      case 'Pendiente':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'En Proceso':
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      case 'Resuelta':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'Mantenimiento':
        return <Wrench className="w-5 h-5 text-blue-600" />;
      case 'Reclamo':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'Sugerencia':
        return <Lightbulb className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  const getTipoGradient = (tipo: string) => {
    switch (tipo) {
      case 'Mantenimiento':
        return 'from-blue-500 to-cyan-500';
      case 'Reclamo':
        return 'from-red-500 to-pink-500';
      case 'Sugerencia':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-slate-500 to-slate-600';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card className={`p-0 overflow-hidden border-0 ${isAdmin ? '' : 'shadow-xl bg-white'}`}>
      {!isAdmin && (
        <div className="relative gradient-warm text-white p-4 sm:p-6 md:p-8">
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="relative flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <History className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl mb-0.5 sm:mb-1">Historial de Solicitudes</h2>
              <p className="opacity-90 text-sm sm:text-base">
                {solicitudes.length} solicitud{solicitudes.length !== 1 ? 'es' : ''} registrada{solicitudes.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={isAdmin ? '' : 'p-4 sm:p-6 md:p-8'}>
        {isAdmin && solicitudes.length > 0 && (
          <div className="space-y-4 mb-6">
            {/* Filtros por tipo */}
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-3">Filtrar por tipo:</h4>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFiltroTipo('todas')}
                  className={`text-xs whitespace-nowrap ${
                    filtroTipo === 'todas'
                      ? 'gradient-ocean text-white border-0'
                      : 'hover:bg-slate-100'
                  }`}
                >
                  Todas ({stats.todas})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFiltroTipo('Mantenimiento')}
                  className={`text-xs whitespace-nowrap ${
                    filtroTipo === 'Mantenimiento'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0'
                      : 'hover:bg-blue-50'
                  }`}
                >
                  <Wrench className="w-3 h-3 mr-1" />
                  Mantenimiento ({stats.mantenimiento})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFiltroTipo('Reclamo')}
                  className={`text-xs whitespace-nowrap ${
                    filtroTipo === 'Reclamo'
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-0'
                      : 'hover:bg-red-50'
                  }`}
                >
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Reclamos ({stats.reclamos})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFiltroTipo('Sugerencia')}
                  className={`text-xs whitespace-nowrap ${
                    filtroTipo === 'Sugerencia'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0'
                      : 'hover:bg-green-50'
                  }`}
                >
                  <Lightbulb className="w-3 h-3 mr-1" />
                  Sugerencias ({stats.sugerencias})
                </Button>
              </div>
            </div>

            {/* Filtros por estado */}
            <div>
              <h4 className="text-sm font-medium text-slate-700 mb-3">Filtrar por estado:</h4>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFiltroEstado('todos')}
                  className={`text-xs whitespace-nowrap ${
                    filtroEstado === 'todos'
                      ? 'gradient-ocean text-white border-0'
                      : 'hover:bg-slate-100'
                  }`}
                >
                  Todos los estados
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFiltroEstado('Pendiente')}
                  className={`text-xs whitespace-nowrap ${
                    filtroEstado === 'Pendiente'
                      ? 'bg-yellow-500 text-white border-0'
                      : 'hover:bg-yellow-50'
                  }`}
                >
                  <Clock className="w-3 h-3 mr-1" />
                  Pendientes ({stats.pendientes})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFiltroEstado('En Proceso')}
                  className={`text-xs whitespace-nowrap ${
                    filtroEstado === 'En Proceso'
                      ? 'bg-blue-500 text-white border-0'
                      : 'hover:bg-blue-50'
                  }`}
                >
                  <AlertCircle className="w-3 h-3 mr-1" />
                  En proceso ({stats.proceso})
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFiltroEstado('Resuelta')}
                  className={`text-xs whitespace-nowrap ${
                    filtroEstado === 'Resuelta'
                      ? 'bg-green-500 text-white border-0'
                      : 'hover:bg-green-50'
                  }`}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Resueltas ({stats.resueltas})
                </Button>
              </div>
            </div>
          </div>
        )}

        {solicitudesFiltradas.length > 0 ? (
          <>
            {isAdmin && (filtroTipo !== 'todas' || filtroEstado !== 'todos') && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-700">
                  Mostrando {solicitudesFiltradas.length} de {solicitudes.length} solicitudes
                  {filtroTipo !== 'todas' && ` • Tipo: ${filtroTipo}`}
                  {filtroEstado !== 'todos' && ` • Estado: ${filtroEstado}`}
                </p>
              </div>
            )}
            <div className="space-y-3 sm:space-y-4">
            {solicitudesFiltradas.map((solicitud) => (
              <div
                key={solicitud.ID_Solicitud}
                className="card-hover relative overflow-hidden p-4 sm:p-5 md:p-6 border-2 border-slate-100 rounded-xl sm:rounded-2xl bg-gradient-to-r from-white to-slate-50"
              >
                {/* Decorative gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getTipoGradient(solicitud.Tipo)}`} />
                
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-3 sm:gap-4 flex-1">
                    {/* Type icon */}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${getTipoGradient(solicitud.Tipo)} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      {getTipoIcon(solicitud.Tipo)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${getTipoGradient(solicitud.Tipo)} bg-gradient-to-r text-white`}>
                          {solicitud.Tipo}
                        </span>
                        <Badge className={`${getEstadoStyle(solicitud.Estado)} border-0 text-xs sm:text-sm`}>
                          <div className="flex items-center gap-1">
                            {getEstadoIcon(solicitud.Estado)}
                            <span>{solicitud.Estado}</span>
                          </div>
                        </Badge>
                      </div>
                      
                      {isAdmin && (
                        <p className="text-xs sm:text-sm text-slate-600 mb-2 flex items-center gap-1">
                          <User className="w-3 h-3 sm:w-4 sm:h-4" />
                          {getUserName(solicitud.ID_Usuario)}
                        </p>
                      )}
                      
                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-2 sm:mb-3">
                        {solicitud.Detalle}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span>Creada: {formatDate(solicitud.Fecha_Creacion)}</span>
                        </div>
                        {solicitud.Fecha_Actualizacion !== solicitud.Fecha_Creacion && (
                          <div className="flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>Actualizada: {formatDate(solicitud.Fecha_Actualizacion)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 gradient-warm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <History className="w-10 h-10 text-white" />
            </div>
            {solicitudes.length === 0 ? (
              <>
                <h3 className="text-xl mb-2">No hay solicitudes registradas</h3>
                <p className="text-slate-600 mb-6">
                  {isAdmin ? 'Los residentes aún no han enviado solicitudes' : 'Crea una nueva solicitud usando el formulario arriba'}
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl mb-2">No hay solicitudes con estos filtros</h3>
                <p className="text-slate-600 mb-6">
                  Prueba cambiando los filtros de tipo o estado para ver más resultados
                </p>
                {isAdmin && (
                  <div className="flex gap-2 justify-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setFiltroTipo('todas');
                        setFiltroEstado('todos');
                      }}
                    >
                      Ver todas las solicitudes
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
