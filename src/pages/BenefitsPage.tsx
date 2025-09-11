import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import Benefits from "./Benefits";

const BenefitsPage = () => {
  const [activeTab, setActiveTab] = useState("benefits");
  const navigate = useNavigate();
  const location = useLocation();

  // Handle navigation based on tab selection
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab !== "benefits") {
      navigate("/");
    }
  };

  // Set active tab based on current route
  useEffect(() => {
    setActiveTab("benefits");
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Main Content */}
      <main className="pt-16 md:pt-20 pb-20 md:pb-8">
        <div className="container mx-auto max-w-4xl">
          <Benefits />
        </div>
      </main>
    </div>
  );
};

export default BenefitsPage;