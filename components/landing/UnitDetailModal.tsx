import { useState } from 'react';
import { Apartamento } from '../../lib/mock-data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Home, 
  Maximize, 
  Bed, 
  Bath, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Check
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface UnitDetailModalProps {
  apartamento: Apartamento | null;
  open: boolean;
  onClose: () => void;
}

export function UnitDetailModal({ apartamento, open, onClose }: UnitDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!apartamento) return null;

  const goToPreviousImage = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? apartamento.Media_URLS.length - 1 : prev - 1
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex(prev => 
      (prev + 1) % apartamento.Media_URLS.length
    );
  };

  const features = [
    'Cocina equipada',
    'Closets empotrados',
    'Pisos laminados',
    'Iluminación LED',
    'Ventanas panorámicas',
    'Zona de lavandería'
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 gap-0">
        {/* Hidden accessibility elements */}
        <DialogHeader className="sr-only">
          <DialogTitle>Detalles del Departamento {apartamento.ID_Unidad}</DialogTitle>
          <DialogDescription>
            Información detallada del departamento {apartamento.ID_Unidad} - {apartamento.Tipo_Unidad} de {apartamento.Area} m² en piso {apartamento.Piso}
          </DialogDescription>
        </DialogHeader>
        {/* Image Gallery */}
        <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] bg-slate-900">
          <ImageWithFallback
            src={apartamento.Media_URLS[currentImageIndex]}
            alt={`Departamento ${apartamento.ID_Unidad} - Imagen ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {apartamento.Media_URLS.length > 1 && (
            <>
              <button
                onClick={goToPreviousImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 glass-effect hover:bg-white/40 active:scale-90 text-white rounded-full flex items-center justify-center transition-all shadow-2xl hover:shadow-3xl touch-manipulation z-20"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
              <button
                onClick={goToNextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 glass-effect hover:bg-white/40 active:scale-90 text-white rounded-full flex items-center justify-center transition-all shadow-2xl hover:shadow-3xl touch-manipulation z-20"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>

              {/* Image counter */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 glass-effect text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm shadow-xl">
                {currentImageIndex + 1} / {apartamento.Media_URLS.length}
              </div>

              {/* Thumbnails */}
              <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-2.5 max-w-[calc(100%-2rem)] overflow-x-auto scrollbar-hide p-1">
                {apartamento.Media_URLS.map((url, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border-3 transition-all touch-manipulation flex-shrink-0 ${
                      index === currentImageIndex
                        ? 'border-orange-400 scale-110 shadow-2xl ring-2 ring-orange-300'
                        : 'border-white/40 hover:border-white/70 opacity-70 hover:opacity-100 hover:scale-105'
                    }`}
                  >
                    <ImageWithFallback
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Floating badge */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
            <Badge className="gradient-success text-white border-0 px-3 sm:px-4 py-1.5 sm:py-2 shadow-xl text-sm sm:text-base">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              {apartamento.Estado}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-5 md:space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                <h2 className="text-2xl sm:text-3xl">
                  {apartamento.Tipo_Unidad === 'Apartamento' ? 'Departamento' : 'Apartaestudio'} {apartamento.ID_Unidad}
                </h2>
                <span className="px-2.5 sm:px-3 py-1 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-xs sm:text-sm">
                  Piso {apartamento.Piso}
                </span>
              </div>
              <p className="text-slate-600 text-base sm:text-lg">{apartamento.Tipo_Unidad}</p>
            </div>
          </div>

          {/* Unit specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-all touch-manipulation">
              <Home className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mb-2" />
              <div className="text-xs sm:text-sm text-slate-600 mb-1">Tipo</div>
              <div className="text-sm sm:text-base text-slate-900 font-semibold">{apartamento.Tipo_Unidad}</div>
            </div>

            <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl sm:rounded-2xl border border-amber-100 shadow-sm hover:shadow-md transition-all touch-manipulation">
              <Maximize className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 mb-2" />
              <div className="text-xs sm:text-sm text-slate-600 mb-1">Área</div>
              <div className="text-sm sm:text-base text-slate-900 font-semibold">{apartamento.Area} m²</div>
            </div>

            {apartamento.Habitaciones && (
              <div className="p-4 sm:p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl border border-green-100 shadow-sm hover:shadow-md transition-all touch-manipulation">
                <Bed className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 mb-2" />
                <div className="text-xs sm:text-sm text-slate-600 mb-1">Habitaciones</div>
                <div className="text-sm sm:text-base text-slate-900 font-semibold">{apartamento.Habitaciones}</div>
              </div>
            )}

            {apartamento.Banos && (
              <div className="p-4 sm:p-5 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl sm:rounded-2xl border border-cyan-100 shadow-sm hover:shadow-md transition-all touch-manipulation">
                <Bath className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-600 mb-2" />
                <div className="text-xs sm:text-sm text-slate-600 mb-1">Baños</div>
                <div className="text-sm sm:text-base text-slate-900 font-semibold">{apartamento.Banos}</div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2 sm:mb-3 flex items-center gap-2 text-base sm:text-lg">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
              Descripción
            </h3>
            <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed">{apartamento.Descripcion}</p>
          </div>

          {/* Features */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg">Características</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-slate-700 text-sm sm:text-base">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 gradient-success rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price and CTA */}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="absolute inset-0 gradient-ocean opacity-10" />
            <div className="relative flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 gap-4">
              <div className="text-center sm:text-left">
                <div className="text-xs sm:text-sm text-slate-600 mb-1">Precio mensual</div>
                <div className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  ${apartamento.Precio_Oferta.toLocaleString()}
                </div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1">Incluye administración</div>
              </div>
              <Button 
                onClick={() => window.open('https://w.app/edificio_forest', '_blank')}
                size="lg"
                className="gradient-forest text-white border-0 shadow-2xl hover:shadow-3xl px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto btn-nature btn-glow"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Solicitar Información
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
