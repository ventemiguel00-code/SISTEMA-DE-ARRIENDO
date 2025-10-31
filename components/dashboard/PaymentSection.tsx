import { useState, useEffect } from 'react';
import { Usuario, Apartamento, PagoHistorial } from '../../lib/mock-data';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { 
  CreditCard, 
  DollarSign, 
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Sparkles,
  AlertCircle,
  CalendarClock,
  Smartphone,
  Building2,
  Wallet
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Alert, AlertDescription } from '../ui/alert';

interface PaymentSectionProps {
  usuario: Usuario;
  unidad: Apartamento | null;
}

export function PaymentSection({ usuario, unidad }: PaymentSectionProps) {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentConcept, setPaymentConcept] = useState('Arriendo mensual');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  const handlePaymentForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountValue = totalAmountWithFee;
    
    if (!amountValue || amountValue <= 0) {
      toast.error('No se puede procesar un pago sin monto válido');
      return;
    }

    // Show payment methods modal
    setShowPaymentMethods(true);
  };

  const processPayment = (paymentMethod: string) => {
    setSelectedPaymentMethod(paymentMethod);
    setIsProcessing(true);
    setShowPaymentMethods(false);

    // Simulate payment processing
    setTimeout(() => {
      const finalConcept = lateFee.amount > 0 
        ? `${paymentConcept} + ${lateFee.description}`
        : paymentConcept;
        
      const newPayment: PagoHistorial = {
        ID_Pago: `pago${Date.now()}`,
        Fecha: new Date().toISOString().split('T')[0],
        Monto: totalAmountWithFee,
        Concepto: `${finalConcept} - ${paymentMethod}`,
        Estado: 'Completado'
      };

      usuario.Historial_Pagos.unshift(newPayment);

      toast.success(`¡Pago procesado exitosamente con ${paymentMethod}!`);
      setIsProcessing(false);
      setSelectedPaymentMethod(null);
      setPaymentConcept('Arriendo mensual');
    }, 3000);
  };

  const getPaymentStatusIcon = (estado: string) => {
    switch (estado) {
      case 'Completado':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Pendiente':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'Rechazado':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Calculate next payment due date (5th of each month)
  const getNextPaymentDueDate = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const currentDay = now.getDate();
    
    // If we're before the 5th of current month, due date is 5th of current month
    // If we're on or after the 5th, due date is 5th of next month
    let dueMonth = currentMonth;
    let dueYear = currentYear;
    
    if (currentDay >= 5) {
      dueMonth += 1;
      if (dueMonth > 11) {
        dueMonth = 0;
        dueYear += 1;
      }
    }
    
    return new Date(dueYear, dueMonth, 5);
  };

  const getPaymentStatus = () => {
    const now = new Date();
    const dueDate = getNextPaymentDueDate();
    const daysUntilDue = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) {
      return { status: 'overdue', days: Math.abs(daysUntilDue), message: 'Pago vencido' };
    } else if (daysUntilDue <= 3) {
      return { status: 'urgent', days: daysUntilDue, message: 'Pago próximo a vencer' };
    } else if (daysUntilDue <= 7) {
      return { status: 'warning', days: daysUntilDue, message: 'Recordatorio de pago' };
    } else {
      return { status: 'normal', days: daysUntilDue, message: 'Fecha límite' };
    }
  };

  // Calculate late payment fee based on current date
  const calculateLateFee = () => {
    const now = new Date();
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Check if we're past the 5th of the current month
    const dueDate = new Date(currentYear, currentMonth, 5);
    
    if (now > dueDate) {
      if (currentDay >= 6 && currentDay <= 15) {
        return { amount: 50000, period: '6 al 15', description: 'Recargo por mora (6-15)' };
      } else if (currentDay >= 16 && currentDay <= 30) {
        return { amount: 100000, period: '16 al 30', description: 'Recargo por mora (16-30)' };
      }
    }
    
    return { amount: 0, period: '', description: '' };
  };

  const lateFee = calculateLateFee();
  const baseAmount = unidad?.Precio_Oferta || 0;
  const totalAmountWithFee = baseAmount + lateFee.amount;

  const nextDueDate = getNextPaymentDueDate();
  const paymentStatus = getPaymentStatus();
  
  // Update payment amount when component mounts or late fee changes
  useEffect(() => {
    setPaymentAmount(totalAmountWithFee.toString());
  }, [totalAmountWithFee]);

  return (
    <div className="space-y-6">
      {/* Payment Due Date Alert */}
      <Alert className={`border-2 ${
        paymentStatus.status === 'overdue' ? 'border-red-200 bg-red-50' :
        paymentStatus.status === 'urgent' ? 'border-orange-200 bg-orange-50' :
        paymentStatus.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
        'border-blue-200 bg-blue-50'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            paymentStatus.status === 'overdue' ? 'bg-red-100' :
            paymentStatus.status === 'urgent' ? 'bg-orange-100' :
            paymentStatus.status === 'warning' ? 'bg-yellow-100' :
            'bg-blue-100'
          }`}>
            {paymentStatus.status === 'overdue' ? (
              <AlertCircle className="w-6 h-6 text-red-600" />
            ) : (
              <CalendarClock className="w-6 h-6 text-blue-600" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-semibold ${
                paymentStatus.status === 'overdue' ? 'text-red-900' :
                paymentStatus.status === 'urgent' ? 'text-orange-900' :
                paymentStatus.status === 'warning' ? 'text-yellow-900' :
                'text-blue-900'
              }`}>
                {paymentStatus.message}
              </h3>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                paymentStatus.status === 'overdue' ? 'bg-red-200 text-red-800' :
                paymentStatus.status === 'urgent' ? 'bg-orange-200 text-orange-800' :
                paymentStatus.status === 'warning' ? 'bg-yellow-200 text-yellow-800' :
                'bg-blue-200 text-blue-800'
              }`}>
                {paymentStatus.status === 'overdue' 
                  ? `${paymentStatus.days} días vencido` 
                  : `${paymentStatus.days} días restantes`
                }
              </div>
            </div>
            <AlertDescription className={
              paymentStatus.status === 'overdue' ? 'text-red-700' :
              paymentStatus.status === 'urgent' ? 'text-orange-700' :
              paymentStatus.status === 'warning' ? 'text-yellow-700' :
              'text-blue-700'
            }>
              <strong>Fecha límite de pago: 5 de cada mes</strong> • 
              Próximo vencimiento: {nextDueDate.toLocaleDateString('es-ES', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}
            </AlertDescription>
          </div>
        </div>
      </Alert>

      {/* Payment Form with modern design */}
      <Card className="p-0 overflow-hidden border-0 shadow-xl bg-white">
        <div className="relative gradient-earth text-white p-8">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg">
              <CreditCard className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl mb-1">Realizar Pago</h2>
              <p className="opacity-90">Completa el formulario para procesar tu pago</p>
            </div>
          </div>
        </div>

        <form onSubmit={handlePaymentForm} className="p-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="payment-amount">Monto a Pagar</Label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600" />
              <Input
                id="payment-amount"
                type="text"
                value={`${parseFloat(paymentAmount || '0').toLocaleString()}`}
                disabled
                className="pl-12 h-14 text-lg border-slate-300 bg-slate-100 text-slate-900 cursor-not-allowed font-semibold"
                required
              />
            </div>
            <p className="text-xs text-slate-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              El monto se calcula automáticamente según tu arriendo y recargos aplicables
            </p>
            {unidad && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <p className="text-sm text-slate-700">
                    Valor arriendo apto/estudio {unidad.ID_Unidad}: <span className="font-semibold">${unidad.Precio_Oferta.toLocaleString()}</span>
                  </p>
                </div>
                
                {/* Late Fee Alert */}
                {lateFee.amount > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <div className="flex-1">
                      <p className="text-sm text-red-700">
                        <span className="font-semibold">Recargo por mora aplicado:</span> +${lateFee.amount.toLocaleString()}
                      </p>
                      <p className="text-xs text-red-600">
                        Pago entre el {lateFee.period} del mes
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Total Amount Display */}
                {lateFee.amount > 0 && (
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-white" />
                      <span className="text-sm text-white font-medium">Total a pagar:</span>
                    </div>
                    <span className="text-lg font-bold text-white">${totalAmountWithFee.toLocaleString()}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <p className="text-sm text-slate-700">
                    <span className="font-semibold">Recordatorio:</span> Los pagos vencen el 5 de cada mes
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="payment-concept">Concepto del Pago</Label>
            <Input
              id="payment-concept"
              type="text"
              placeholder="Ej: Arriendo Febrero 2025"
              value={paymentConcept}
              onChange={(e) => setPaymentConcept(e.target.value)}
              className="h-14 text-lg border-slate-200 focus:border-purple-400 focus:ring-purple-400"
              required
            />
          </div>

          <div className="space-y-4">
            <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-900 mb-1">
                    <strong>Política de Pagos:</strong> Fecha límite el 5 de cada mes.
                  </p>
                  <p className="text-sm text-green-800 mb-2">
                    Realiza tu pago antes del 5 para evitar recargos por mora. Recuerda que los pagos se reflejan en 24-48 horas.
                  </p>
                  <div className="text-xs text-green-700 space-y-1">
                    <div>• <strong>Del 6 al 15:</strong> Recargo de $50,000 por mora</div>
                    <div>• <strong>Del 16 al 30:</strong> Recargo de $100,000 por mora</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-900 mb-1">
                    <strong>Métodos de Pago Disponibles:</strong>
                  </p>
                  <p className="text-sm text-blue-800">
                    Tarjetas de crédito/débito, Bancolombia, Nequi y PSE. Selecciona tu método preferido al procesar el pago.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full gradient-earth text-white border-0 h-16 text-lg shadow-2xl hover:shadow-3xl btn-nature btn-glow"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Clock className="w-5 h-5 mr-2 animate-spin" />
                Procesando Pago...
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5 mr-2" />
                Procesar Pago Ahora
              </>
            )}
          </Button>
        </form>
      </Card>

      {/* Payment History with modern cards */}
      <Card className="p-0 overflow-hidden border-0 shadow-xl bg-white">
        <div className="relative gradient-forest text-white p-8">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl mb-1">Historial de Pagos</h2>
              <p className="opacity-90">
                {usuario.Historial_Pagos.length} pago{usuario.Historial_Pagos.length !== 1 ? 's' : ''} registrado{usuario.Historial_Pagos.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {usuario.Historial_Pagos.length > 0 ? (
            <div className="space-y-4">
              {usuario.Historial_Pagos.map((pago) => (
                <div
                  key={pago.ID_Pago}
                  className="card-hover flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${
                      pago.Estado === 'Completado' ? 'bg-green-100' :
                      pago.Estado === 'Pendiente' ? 'bg-yellow-100' :
                      'bg-red-100'
                    }`}>
                      {getPaymentStatusIcon(pago.Estado)}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 mb-1">{pago.Concepto}</div>
                      <div className="text-sm text-slate-600">
                        {formatDate(pago.Fecha)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-slate-900 mb-1">${pago.Monto.toLocaleString()}</div>
                    <div className={`text-sm px-3 py-1 rounded-full inline-block ${
                      pago.Estado === 'Completado' ? 'bg-green-100 text-green-700' :
                      pago.Estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {pago.Estado}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 gradient-ocean rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-2">No hay pagos registrados</h3>
              <p className="text-slate-600">Los pagos que realices aparecerán aquí</p>
            </div>
          )}
        </div>
      </Card>

      {/* Payment Methods Modal */}
      <Dialog open={showPaymentMethods} onOpenChange={setShowPaymentMethods}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
              Selecciona tu método de pago
            </DialogTitle>
            <DialogDescription>
              Elige cómo quieres realizar el pago de ${totalAmountWithFee.toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-3 py-4">
            {/* Credit/Debit Cards */}
            <button
              onClick={() => processPayment('Tarjeta de Crédito/Débito')}
              className="w-full flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
              disabled={isProcessing}
            >
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-slate-900">Tarjeta de Crédito/Débito</div>
                <div className="text-sm text-slate-600">Visa, MasterCard, American Express</div>
              </div>
            </button>

            {/* Bancolombia */}
            <button
              onClick={() => processPayment('Bancolombia')}
              className="w-full flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-yellow-300 hover:bg-yellow-50 transition-all group"
              disabled={isProcessing}
            >
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center group-hover:bg-yellow-200">
                <Building2 className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-slate-900">Bancolombia</div>
                <div className="text-sm text-slate-600">Transferencia desde app móvil</div>
              </div>
            </button>

            {/* Nequi */}
            <button
              onClick={() => processPayment('Nequi')}
              className="w-full flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-pink-300 hover:bg-pink-50 transition-all group"
              disabled={isProcessing}
            >
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200">
                <Smartphone className="w-5 h-5 text-pink-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-slate-900">Nequi</div>
                <div className="text-sm text-slate-600">Pago desde app móvil</div>
              </div>
            </button>

            {/* PSE */}
            <button
              onClick={() => processPayment('PSE')}
              className="w-full flex items-center gap-3 p-4 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              disabled={isProcessing}
            >
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200">
                <Wallet className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <div className="font-medium text-slate-900">PSE</div>
                <div className="text-sm text-slate-600">Débito directo desde tu banco</div>
              </div>
            </button>
          </div>

          {isProcessing && selectedPaymentMethod && (
            <div className="text-center py-4">
              <div className="inline-flex items-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4 animate-spin" />
                Procesando pago con {selectedPaymentMethod}...
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
