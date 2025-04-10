
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AssistantProvider } from "@/contexts/AssistantContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Dashboard from "@/pages/Dashboard";
import CodingAssistant from "@/pages/CodingAssistant";
import EmailAssistant from "@/pages/EmailAssistant";
import DocumentAssistant from "@/pages/DocumentAssistant";
import ResearchAssistant from "@/pages/ResearchAssistant";
import MeetingAssistant from "@/pages/MeetingAssistant";
import ActivityHistory from "@/pages/ActivityHistory";
import Settings from "@/pages/Settings";
import Help from "@/pages/Help";
import Auth from "@/pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const { user } = useAuth();
  
  return (
    <Routes>
      <Route path="/auth" element={user ? <Navigate to="/" replace /> : <Auth />} />
      
      <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />
        <Route path="coding" element={<CodingAssistant />} />
        <Route path="email" element={<EmailAssistant />} />
        <Route path="document" element={<DocumentAssistant />} />
        <Route path="research" element={<ResearchAssistant />} />
        <Route path="meeting" element={<MeetingAssistant />} />
        <Route path="history" element={<ActivityHistory />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <AssistantProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AssistantProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
