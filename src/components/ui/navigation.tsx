import { Home, Search, BarChart3, User, Plus, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const tabs = [
    { id: "feed", icon: Home, label: "Inicio" },
    { id: "explore", icon: Search, label: "Explorar" },
    { id: "footprint", icon: BarChart3, label: "Huella" },
    { id: "benefits", icon: Gift, label: "Beneficios" },
    { id: "profile", icon: User, label: "Perfil" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-eco rounded-full flex items-center justify-center">
              <span className="text-white font-poppins font-bold text-sm">E</span>
            </div>
            <span className="font-poppins font-bold text-xl text-foreground">EcoRed</span>
          </div>
          
          <div className="flex items-center space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-inter",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-eco"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <Icon size={18} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

        {/* Mobile Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-t border-border">
          <div className="grid grid-cols-5 px-2 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "flex flex-col items-center justify-center py-3 px-2 rounded-xl transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Icon size={20} className="mb-1" />
                <span className="text-xs font-inter font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Button */}
      <button 
        className="fixed bottom-20 md:bottom-8 right-6 z-50 w-14 h-14 bg-gradient-eco rounded-full shadow-eco flex items-center justify-center transition-all duration-300 hover:scale-105 animate-pulse-eco"
        onClick={() => {/* TODO: Open action modal */}}
      >
        <Plus size={24} className="text-white" />
      </button>
    </>
  );
};