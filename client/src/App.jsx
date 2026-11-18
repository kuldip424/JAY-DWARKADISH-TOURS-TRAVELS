import AppRoutes from '@/routes/AppRoutes';
import AuthModal from '@/components/Auth/AuthModal';
import WhatsAppButton from '@/components/Common/WhatsAppButton';
import { useAuth } from '@/hooks/auth/useAuth';
import { useScrollReveal } from '@/hooks/ui/useScrollReveal';

function App() {
  const { showAuth, setShowAuth } = useAuth();
  useScrollReveal();

  return (
    <div className="bg-stone-50 min-h-screen">
      <AppRoutes />

      {showAuth && <AuthModal closeAuth={() => setShowAuth(false)} />}
      <WhatsAppButton />
    </div>
  );
}

export default App;
