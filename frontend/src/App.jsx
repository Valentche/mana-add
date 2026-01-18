import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { client } from './api/client';
import Layout from './Layout';
import Home from './pages/Home';
import GroupDetail from './pages/GroupDetail';
import OrderDetail from './pages/OrderDetail';
import { Loader2 } from 'lucide-react';
import { Toaster } from "@/components/ui/sonner";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await client.auth.me();
        setIsAuthenticated(true);
      } catch (error) {
        // Erro 401 é normal aqui (usuário não logado)
        console.log("Usuário não está logado");
        setIsAuthenticated(false);
      } finally {
        // IMPORTANTE: Isso destrava a tela de loading
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route 
              path="/" 
              element={<Home isAuthenticated={isAuthenticated} />} 
            />
            {/* Rotas Protegidas - Só acessa se estiver logado */}
            {isAuthenticated && (
              <>
                <Route path="/groups/:groupId" element={<GroupDetail />} />
                <Route path="/orders/:orderId" element={<OrderDetail />} />
              </>
            )}
            {/* Se tentar acessar rota protegida sem login, volta pra Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;