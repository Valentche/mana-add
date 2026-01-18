import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './Layout';
import Home from './pages/Home';
import GroupDetail from './pages/GroupDetail';
import OrderDetail from './pages/OrderDetail';
import { Toaster } from "@/components/ui/sonner"; // Verifique se o caminho está certo no seu projeto

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  // TRUQUE: Forçamos o sistema a achar que estamos sempre logados
  // e que não há carregamento pendente.
  const isAuthenticated = true; 
  const loading = false;

  // Removemos todo o useEffect que fazia a verificação de login
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            {/* Passamos isAuthenticated=true para a Home mostrar os botões de logado */}
            <Route 
              path="/" 
              element={<Home isAuthenticated={true} />} 
            />
            
            {/* Rotas liberadas sem verificação real */}
            <Route path="/groups/:groupId" element={<GroupDetail />} />
            <Route path="/orders/:orderId" element={<OrderDetail />} />
            
            {/* Rota padrão */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;