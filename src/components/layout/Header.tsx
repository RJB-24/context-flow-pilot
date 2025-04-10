
import React, { useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Search, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Header: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const handleVoiceCommand = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      toast({
        title: "Voice Recognition Active",
        description: "Speak now. I'm listening...",
      });
      
      // This would be replaced with actual Web Speech API implementation
      setTimeout(() => {
        setIsListening(false);
        toast({
          title: "Voice Command Received",
          description: "Processing your request...",
        });
      }, 3000);
    }
  };

  return (
    <header className="border-b border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold text-assistant-primary hidden md:block">
            Universal Assistant
          </h1>
        </div>
        
        <div className="flex-1 max-w-2xl mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Ask anything or type a command..."
              className="pl-9 pr-9 py-2 w-full"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query) {
                  toast({
                    title: "Processing Query",
                    description: `"${query}"`,
                  });
                  setQuery("");
                }
              }}
            />
            <Button
              variant="ghost"
              size="icon"
              className={`absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 ${
                isListening ? "text-assistant-accent animate-pulse-light" : "text-gray-400"
              }`}
              onClick={handleVoiceCommand}
            >
              <Mic className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Button variant="ghost" size="icon" aria-label="Settings">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};
