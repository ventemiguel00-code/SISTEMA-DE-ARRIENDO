import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useAuth } from '../../lib/auth-context';
import { LogIn, UserPlus, Sparkles, Lock, Mail, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AuthDialog({ open, onClose }: AuthDialogProps) {
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    const success = login(loginEmail, loginPassword);
    if (success) {
      toast.success('¡Bienvenido de nuevo!');
      onClose();
      setLoginEmail('');
      setLoginPassword('');
    } else {
      toast.error('Email o contraseña incorrectos');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    if (registerPassword !== registerConfirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    if (registerPassword.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const success = register(registerName, registerEmail, registerPassword);
    if (success) {
      toast.success('¡Cuenta creada exitosamente!');
      onClose();
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterConfirmPassword('');
    } else {
      toast.error('Este email ya está registrado');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg p-0 gap-0 overflow-hidden">
        {/* Modern Header with gradient */}
        <div className="relative gradient-forest text-white p-8">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <DialogTitle className="text-2xl mb-2">Portal de Residentes</DialogTitle>
            <DialogDescription className="text-white/90 text-base">
              Ingresa a tu cuenta o regístrate para acceder a todas las funcionalidades
            </DialogDescription>
          </div>
        </div>

        <div className="p-8">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'login' | 'register')}>
            <TabsList className="grid w-full grid-cols-2 p-1.5 bg-slate-100 rounded-xl h-auto">
              <TabsTrigger 
                value="login"
                className="rounded-lg data-[state=active]:gradient-forest data-[state=active]:text-white data-[state=active]:shadow-lg py-3 sm:py-3.5 text-sm sm:text-base transition-all touch-manipulation"
              >
                <LogIn className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Iniciar Sesión</span>
                <span className="sm:hidden ml-1">Entrar</span>
              </TabsTrigger>
              <TabsTrigger 
                value="register"
                className="rounded-lg data-[state=active]:gradient-forest data-[state=active]:text-white data-[state=active]:shadow-lg py-3 sm:py-3.5 text-sm sm:text-base transition-all touch-manipulation"
              >
                <UserPlus className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Registrarse</span>
                <span className="sm:hidden ml-1">Registro</span>
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-slate-700">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="pl-11 h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-slate-700">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="pl-11 h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full gradient-forest text-white border-0 h-14 shadow-2xl hover:shadow-3xl btn-nature btn-glow"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Iniciar Sesión
                </Button>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                  <p className="text-sm text-slate-700 mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <strong>Cuentas de prueba:</strong>
                  </p>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><strong>Residente:</strong> maria@example.com / demo123</p>
                    <p><strong>Admin:</strong> admin@example.com / admin123</p>
                  </div>
                </div>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="mt-6">
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="register-name" className="text-slate-700">Nombre Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Juan Pérez"
                      value={registerName}
                      onChange={(e) => setRegisterName(e.target.value)}
                      className="pl-11 h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-slate-700">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="tu@email.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className="pl-11 h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-slate-700">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className="pl-11 h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password" className="text-slate-700">Confirmar Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder="Repite tu contraseña"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      className="pl-11 h-12 border-slate-200 focus:border-purple-400 focus:ring-purple-400"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full gradient-accent text-white border-0 h-12 shadow-lg hover:opacity-90"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Crear Cuenta
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
