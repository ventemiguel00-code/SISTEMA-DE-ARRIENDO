import { useState, useEffect } from 'react';
import { Evento } from '../../lib/mock-data';
import { ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface EventsCarouselProps {
  eventos: Evento[];
}

export function EventsCarousel({ eventos }: EventsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const featuredEvents = eventos.filter(e => e.Destacado);
  const displayEvents = featuredEvents.length > 0 ? featuredEvents : eventos;

  useEffect(() => {
    if (displayEvents.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % displayEvents.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [displayEvents.length]);

  const goToPrevious = () => {
    setCurrentIndex(prev => 
      prev === 0 ? displayEvents.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % displayEvents.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.toLocaleDateString('es-ES', { day: '2-digit' }),
      month: date.toLocaleDateString('es-ES', { month: 'short' }),
      time: date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };
  };

  if (displayEvents.length === 0) {
    return null;
  }

  const currentEvent = displayEvents[currentIndex];
  const dateInfo = formatDate(currentEvent.Fecha);

  return (
    <div 
      className="relative w-full max-w-full rounded-2xl sm:rounded-3xl overflow-hidden group shadow-2xl"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative h-[280px] sm:h-[320px] md:h-[380px] lg:h-[420px] w-full">
        <ImageWithFallback
          src={currentEvent.Imagen_URL}
          alt={currentEvent.Titulo}
          className="w-full h-full object-cover select-none"
        />
        
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Date badge - Positioned at top */}
        <div className="absolute top-3 sm:top-4 md:top-5 left-3 sm:left-4 md:left-6 lg:left-8 z-10">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 bg-gradient-to-br from-orange-500 to-pink-500 text-white px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 md:py-2.5 rounded-lg sm:rounded-xl shadow-2xl border-2 border-white/30 backdrop-blur-sm">
            <div className="flex flex-col items-center bg-white/30 backdrop-blur-md rounded-lg px-2 sm:px-2.5 py-1 sm:py-1.5 min-w-[50px] sm:min-w-[55px] md:min-w-[60px]">
              <span className="text-lg sm:text-xl md:text-2xl font-bold leading-none">{dateInfo.day}</span>
              <span className="text-[10px] sm:text-xs uppercase font-semibold mt-0.5">{dateInfo.month}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span className="text-xs sm:text-sm md:text-base font-semibold">{dateInfo.time}</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 lg:p-8">
          <div className="max-w-3xl">
            <h2 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl mb-1.5 sm:mb-2 md:mb-3 leading-tight drop-shadow-lg">
              {currentEvent.Titulo}
            </h2>
            <p className="text-white/95 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 mb-3 sm:mb-4 md:mb-5 drop-shadow-md">
              {currentEvent.Descripcion}
            </p>
            
            <Button size="default" className="gradient-accent text-white border-0 shadow-2xl hover:shadow-3xl px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm btn-lift btn-glow">
              Más información
            </Button>
          </div>
        </div>

        {/* Navigation buttons */}
        {displayEvents.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 glass-effect hover:bg-white/40 active:scale-90 text-white rounded-full flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all shadow-2xl hover:shadow-3xl touch-manipulation z-20"
              aria-label="Evento anterior"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 glass-effect hover:bg-white/40 active:scale-90 text-white rounded-full flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-all shadow-2xl hover:shadow-3xl touch-manipulation z-20"
              aria-label="Siguiente evento"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </button>

            {/* Modern dots indicator */}
            <div className="absolute bottom-14 sm:bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-2.5 z-10 px-4">
              {displayEvents.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 sm:h-2.5 rounded-full transition-all touch-manipulation flex-shrink-0 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-orange-400 to-pink-500 w-10 sm:w-12 md:w-14 shadow-xl'
                      : 'bg-white/50 w-2 sm:w-2.5 hover:bg-white/80 hover:w-6 sm:hover:w-7'
                  }`}
                  aria-label={`Ir al evento ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
