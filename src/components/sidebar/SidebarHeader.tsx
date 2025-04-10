
import React from "react";
import { SidebarHeader as UISidebarHeader } from "@/components/ui/sidebar";
import { Brain } from "lucide-react";

export const SidebarHeader: React.FC = () => {
  return (
    <UISidebarHeader className="p-4">
      <div className="flex items-center gap-2">
        <Brain className="h-8 w-8 text-assistant-primary" />
        <div>
          <h2 className="text-lg font-bold">Universal</h2>
          <p className="text-xs opacity-70">Contextual Assistant</p>
        </div>
      </div>
    </UISidebarHeader>
  );
};
