import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { TipoSolicitud, Solicitud } from '../../lib/mock-data';
import { FileText, Send, Wrench, AlertCircle, Lightbulb } from 'lucide-react';

interface RequestFormProps {
  usuarioId: string;
  onSubmit: (solicitud: Solicitud) => void;
}

export function RequestForm({ usuarioId, onSubmit }: RequestFormProps) {
  const [tipo, setTipo] = useState<TipoSolicitud>('Mantenimiento');
  const [detalle, setDetalle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!detalle.trim()) {
      return;
    }

    const nuevaSolicitud: Solicitud = {
      ID_Solicitud: `sol${Date.now()}`,
      ID_Usuario: usuarioId,
      Tipo: tipo,
      Detalle: detalle,
      Estado: 'Pendiente',
      Fecha_Creacion: new Date().toISOString().split('T')[0],
      Fecha_Actualizacion: new Date().toISOString().split('T')[0]
    };

    onSubmit(nuevaSolicitud);
    
    // Reset form
    setDetalle('');
    setTipo('Mantenimiento');
  };

  const getTipoIcon = (tipoValue: TipoSolicitud) => {
    switch (tipoValue) {
      case 'Mantenimiento':
        return <Wrench className="w-5 h-5" />;
      case 'Reclamo':
        return <AlertCircle className="w-5 h-5" />;
      case 'Sugerencia':
        return <Lightbulb className="w-5 h-5" />;
    }
  };

  const getTipoGradient = (tipoValue: TipoSolicitud) => {
    switch (tipoValue) {
      case 'Mantenimiento':
        return 'from-blue-500 to-cyan-500';
      case 'Reclamo':
        return 'from-red-500 to-pink-500';
      case 'Sugerencia':
        return 'from-green-500 to-emerald-500';
    }
  };

  return (
    <Card className="p-0 overflow-hidden border-0 shadow-xl bg-white">
      <div className={`relative bg-gradient-to-r ${getTipoGradient(tipo)} text-white p-8 transition-all`}>
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg">
            {getTipoIcon(tipo)}
          </div>
          <div>
            <h2 className="text-2xl mb-1">Nueva Solicitud</h2>
            <p className="opacity-90">Envía un reclamo, solicitud de mantenimiento o sugerencia</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="request-type">Tipo de Solicitud</Label>
          <Select value={tipo} onValueChange={(value) => setTipo(value as TipoSolicitud)}>
            <SelectTrigger id="request-type" className="h-14 text-lg border-slate-200">
              <SelectValue placeholder="Selecciona el tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mantenimiento">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Wrench className="w-4 h-4 text-white" />
                  </div>
                  <span>Mantenimiento</span>
                </div>
              </SelectItem>
              <SelectItem value="Reclamo">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-white" />
                  </div>
                  <span>Reclamo</span>
                </div>
              </SelectItem>
              <SelectItem value="Sugerencia">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <span>Sugerencia</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="request-detail">Describe tu solicitud</Label>
          <Textarea
            id="request-detail"
            placeholder="Describe tu solicitud con el mayor detalle posible para que podamos atenderte de manera efectiva..."
            value={detalle}
            onChange={(e) => setDetalle(e.target.value)}
            className="min-h-[180px] text-base border-slate-200 focus:border-purple-400 focus:ring-purple-400 resize-none"
            required
          />
          <p className="text-sm text-slate-500 flex items-center gap-2 mt-2">
            <FileText className="w-4 h-4" />
            Cuanto más detallada sea tu descripción, más rápido podremos ayudarte
          </p>
        </div>

        <Button 
          type="submit"
          size="lg"
          className={`w-full bg-gradient-to-r ${getTipoGradient(tipo)} text-white border-0 h-16 text-lg shadow-2xl hover:shadow-3xl btn-nature btn-glow`}
        >
          <Send className="w-5 h-5 mr-2" />
          Enviar Solicitud
        </Button>
      </form>
    </Card>
  );
}
