import { useState } from 'react';
import { AuthProvider, useAuth } from './lib/auth-context';
import { LandingPage } from './components/landing/LandingPage';
import { ResidentDashboard } from './components/dashboard/ResidentDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { AuthDialog } from './components/auth/AuthDialog';
import { Toaster } from './components/ui/sonner';

function AppContent() {
  const { isAuthenticated, currentUser } = useAuth();
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const isAdmin = currentUser?.Rol === 'Administrador';

  return (
    <div className="overflow-x-hidden max-w-full w-full">
      {isAuthenticated ? (
        isAdmin ? <AdminDashboard /> : <ResidentDashboard />
      ) : (
        <LandingPage onLoginClick={() => setShowAuthDialog(true)} />
      )}
      
      <AuthDialog 
        open={showAuthDialog} 
        onClose={() => setShowAuthDialog(false)} 
      />
      
      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
