
import React from "react";
import { SidebarFooter as UISidebarFooter } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export const SidebarFooter: React.FC = () => {
  return (
    <UISidebarFooter className="p-4 border-t">
      <div className="flex items-center gap-3">
        <div className="bg-assistant-primary rounded-full p-1.5">
          <User className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">Account Settings</p>
          <p className="text-xs opacity-70">Customize your experience</p>
        </div>
      </div>
    </UISidebarFooter>
  );
};
