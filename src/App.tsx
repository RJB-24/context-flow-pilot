
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { AssistantProvider } from "@/contexts/AssistantContext";
import Dashboard from "@/pages/Dashboard";
import CodingAssistant from "@/pages/CodingAssistant";
import EmailAssistant from "@/pages/EmailAssistant";
import DocumentAssistant from "@/pages/DocumentAssistant";
import ResearchAssistant from "@/pages/ResearchAssistant";
import MeetingAssistant from "@/pages/MeetingAssistant";
import ActivityHistory from "@/pages/ActivityHistory";
import Settings from "@/pages/Settings";
import Help from "@/pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AssistantProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/coding" element={<CodingAssistant />} />
              <Route path="/email" element={<EmailAssistant />} />
              <Route path="/document" element={<DocumentAssistant />} />
              <Route path="/research" element={<ResearchAssistant />} />
              <Route path="/meeting" element={<MeetingAssistant />} />
              <Route path="/history" element={<ActivityHistory />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </AssistantProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
