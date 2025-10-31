import { useState } from 'react';
import { Apartamento, EstadoUnidad } from '../../lib/mock-data';
import { Building2, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface BuildingMapProps {
  apartamentos: Apartamento[];
  onUnitClick: (apartamento: Apartamento) => void;
}

export function BuildingMap({ apartamentos, onUnitClick }: BuildingMapProps) {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

  // Group apartments by floor
  const apartamentosPorPiso = apartamentos.reduce((acc, apt) => {
    if (!acc[apt.Piso]) {
      acc[apt.Piso] = [];
    }
    acc[apt.Piso].push(apt);
    return acc;
  }, {} as Record<number, Apartamento[]>);

  const pisos = Object.keys(apartamentosPorPiso)
    .map(Number)
    .sort((a, b) => b - a); // Sort descending (6 to 1)

  const getEstadoStyle = (estado: EstadoUnidad) => {
    switch (estado) {
      case 'Disponible':
        return 'gradient-success text-white hover:opacity-90 shadow-lg border-0';
      case 'Ocupado':
        return 'bg-gradient-to-br from-stone-400 to-stone-600 text-white opacity-70 cursor-not-allowed';
      case 'Mantenimiento':
        return 'gradient-warm text-white opacity-80 cursor-not-allowed';
    }
  };

  const toggleFloor = (piso: number) => {
    setSelectedFloor(selectedFloor === piso ? null : piso);
  };

  const countByEstado = (piso: number) => {
    const units = apartamentosPorPiso[piso];
    const disponible = units.filter(u => u.Estado === 'Disponible').length;
    const total = units.length;
    return { disponible, total };
  };

  const getFloorGradient = (index: number) => {
    const gradients = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-teal-500 to-blue-500'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <div className="text-center mb-6 sm:mb-8 md:mb-10">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-3 sm:mb-4">
          <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-700" />
          <span className="text-xs sm:text-sm text-green-800">Disponibilidad en Tiempo Real</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">
          <span className="text-gradient">Mapa del Edificio</span>
        </h2>
        <p className="text-slate-600 text-sm sm:text-base md:text-lg px-4">
          Explora cada piso y descubre tu futuro hogar
        </p>
      </div>

      {/* Modern Legend */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8 p-4 sm:p-6 bg-white rounded-2xl shadow-lg">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg gradient-success shadow-md" />
          <span className="text-sm sm:text-base">Disponible</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-stone-400 to-stone-600 shadow-md" />
          <span className="text-sm sm:text-base">Ocupado</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg gradient-warm shadow-md" />
          <span className="text-sm sm:text-base">Mantenimiento</span>
        </div>
      </div>

      {/* Building floors */}
      <div className="space-y-4 w-full max-w-full">
        {pisos.map((piso, index) => {
          const { disponible, total } = countByEstado(piso);
          const isExpanded = selectedFloor === piso;
          
          return (
            <div 
              key={piso} 
              className="card-hover bg-white rounded-2xl overflow-hidden shadow-xl border-0 w-full"
            >
              {/* Floor header */}
              <button
                onClick={() => toggleFloor(piso)}
                className="w-full flex items-center justify-between p-4 sm:p-5 md:p-6 hover:bg-gradient-to-r hover:from-green-50 hover:to-transparent transition-all"
              >
                <div className="flex items-center gap-3 sm:gap-4 md:gap-5 min-w-0 flex-1">
                  <div className={`relative flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br ${getFloorGradient(index)} rounded-xl sm:rounded-2xl text-white shadow-lg flex-shrink-0`}>
                    {disponible > 0 && (
                      <Sparkles className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 animate-pulse" />
                    )}
                    <span className="text-xs opacity-90 hidden sm:block">Piso</span>
                    <span className="text-2xl sm:text-3xl">{piso}</span>
                  </div>
                  <div className="text-left min-w-0 flex-1">
                    <h3 className="mb-0.5 sm:mb-1 text-base sm:text-lg md:text-xl">Piso {piso}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 truncate">
                      {disponible > 0 ? (
                        <span className="text-green-600">
                          ✓ {disponible} de {total} {window.innerWidth < 640 ? 'disp.' : 'disponibles'}
                        </span>
                      ) : (
                        <span className="text-slate-500">
                          Sin disponibles
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  {disponible > 0 && (
                    <Badge className="gradient-success text-white border-0 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 shadow-md text-xs sm:text-sm hidden sm:inline-flex">
                      {disponible} {disponible === 1 ? 'Disponible' : 'Disponibles'}
                    </Badge>
                  )}
                  <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-slate-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600" />
                    )}
                  </div>
                </div>
              </button>

              {/* Floor units */}
              {isExpanded && (
                <div className="px-3 sm:px-4 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-2 bg-gradient-to-b from-green-50 to-white w-full overflow-x-hidden">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mt-3 sm:mt-4 w-full">
                    {apartamentosPorPiso[piso].map(apt => (
                      <button
                        key={apt.ID_Unidad}
                        onClick={() => apt.Estado === 'Disponible' && onUnitClick(apt)}
                        disabled={apt.Estado !== 'Disponible'}
                        className={`
                          relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 touch-manipulation
                          ${getEstadoStyle(apt.Estado)}
                          ${apt.Estado === 'Disponible' 
                            ? 'cursor-pointer transform active:scale-95 hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-xl' 
                            : 'opacity-70'
                          }
                        `}
                      >
                        {apt.Estado === 'Disponible' && (
                          <div className="absolute -top-2 -right-2 sm:-top-2.5 sm:-right-2.5 w-6 h-6 sm:w-7 sm:h-7 gradient-warm rounded-full flex items-center justify-center shadow-lg animate-pulse">
                            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" />
                          </div>
                        )}
                        <div className="text-center">
                          <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-1.5 font-semibold">{apt.ID_Unidad}</div>
                          <div className="text-xs sm:text-sm opacity-90 mb-1.5 sm:mb-2 truncate font-medium">{apt.Tipo_Unidad === 'Apartamento' ? 'Apto' : 'Studio'}</div>
                          <div className="text-xs sm:text-sm font-semibold">
                            {apt.Estado === 'Disponible' 
                              ? `${(apt.Precio_Oferta / 1000).toFixed(0)}K`
                              : apt.Estado === 'Mantenimiento' ? 'Mant.' : apt.Estado
                            }
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
