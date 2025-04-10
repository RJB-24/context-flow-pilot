
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

interface AssistantContextProps {
  isListening: boolean;
  startListening: () => void;
  stopListening: () => void;
  currentQuery: string;
  setCurrentQuery: (query: string) => void;
  processQuery: (query: string) => void;
  isProcessing: boolean;
}

const AssistantContext = createContext<AssistantContextProps | undefined>(undefined);

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error("useAssistant must be used within an AssistantProvider");
  }
  return context;
};

interface AssistantProviderProps {
  children: ReactNode;
}

export const AssistantProvider: React.FC<AssistantProviderProps> = ({ children }) => {
  const [isListening, setIsListening] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const startListening = () => {
    setIsListening(true);
    toast({
      title: "Voice Recognition Active",
      description: "Speak now. I'm listening...",
    });
    
    // This would be replaced with actual Web Speech API implementation
    setTimeout(() => {
      stopListening();
      setCurrentQuery("What's on my schedule today?");
      processQuery("What's on my schedule today?");
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const processQuery = (query: string) => {
    if (!query.trim()) return;
    
    setIsProcessing(true);
    toast({
      title: "Processing Query",
      description: `"${query}"`,
    });
    
    // This would be replaced with actual AI processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Response Ready",
        description: "Check the relevant assistant for detailed information.",
      });
      setCurrentQuery("");
    }, 2000);
  };

  const value = {
    isListening,
    startListening,
    stopListening,
    currentQuery,
    setCurrentQuery,
    processQuery,
    isProcessing
  };

  return (
    <AssistantContext.Provider value={value}>
      {children}
    </AssistantContext.Provider>
  );
};
