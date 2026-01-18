import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { client } from './api/client';
import Layout from './Layout';
import Home from './pages/Home';
import GroupDetail from './pages/GroupDetail';
import OrderDetail from './pages/OrderDetail';
import { Loader2 } from 'lucide-react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Não tentar reconectar infinitamente se der erro
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
        // Tenta verificar se o usuário está logado
        const isAuth = await client.auth.isAuthenticated();
        setIsAuthenticated(isAuth);
      } catch (error) {
        console.error("Erro na verificação de auth:", error);
        setIsAuthenticated(false);
      } finally {
        // O SEGREDO ESTÁ AQUI:
        // Independente se deu certo ou erro (401), paramos de carregar.
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
        {isAuthenticated ? (
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/groups/:groupId" element={<GroupDetail />} />
              <Route path="/orders/:orderId" element={<OrderDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        ) : (
          /* Se não estiver logado, mostra a Home (que tem o botão de Login) 
             ou redireciona para uma página de login dedicada se você tiver. 
             Assumindo que sua Home lida com o estado de deslogado: */
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        )}
      </Router>
    </QueryClientProvider>
  );
}

export default App;