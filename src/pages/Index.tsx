import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { FeedSection } from "@/components/eco/feed-section";
import { ExploreSection } from "@/components/eco/explore-section";
import { CarbonDashboard } from "@/components/eco/carbon-dashboard";
import { UserProfile } from "@/components/eco/user-profile";

const Index = () => {
  const [activeTab, setActiveTab] = useState("feed");

  // Mock data
  const currentUser = {
    name: "Ana García",
    username: "ana_eco",
    avatar: undefined,
  };

  const mockPosts = [
    {
      user: { name: "Carlos Verde", username: "carlos_v", avatar: undefined },
      content: "Hoy caminé al trabajo en lugar de usar el auto. 30 minutos de ejercicio y aire fresco mientras cuido el planeta 🚶‍♂️🌱",
      co2Impact: 2.1,
      actionType: "transport" as const,
      likes: 15,
      comments: 3,
      isLiked: false,
      timestamp: "hace 2h",
      hasSustainableAction: true,
    },
    {
      user: { name: "María Sustentable", username: "maria_sust", avatar: undefined },
      content: "Preparé una comida vegana deliciosa con vegetales locales. La quinoa con verduras asadas quedó increíble 🥗✨",
      co2Impact: 1.8,
      actionType: "food" as const,
      likes: 23,
      comments: 7,
      isLiked: true,
      timestamp: "hace 4h",
      hasSustainableAction: true,
    },
    {
      user: { name: "Luis Ecológico", username: "luis_eco", avatar: undefined },
      content: "Instalé paneles solares en casa. La inversión inicial vale la pena por el ahorro energético a largo plazo ☀️⚡",
      co2Impact: 5.2,
      actionType: "energy" as const,
      likes: 32,
      comments: 12,
      isLiked: false,
      timestamp: "hace 1d",
      hasSustainableAction: true,
    },
  ];

  const carbonData = {
    total: 12.4,
    weeklyChange: -15,
    monthlyGoal: 50,
    breakdown: {
      transport: 4.2,
      food: 3.8,
      energy: 2.1,
      shopping: 2.3,
    },
  };

  const userProfile = {
    user: {
      name: "Ana García",
      username: "ana_eco",
      avatar: undefined,
      bio: "Apasionada por un futuro sostenible 🌱 | Reduciendo mi huella de carbono día a día | Madrid, España",
      location: "Madrid, España",
      joinedDate: "marzo 2024",
      stats: {
        posts: 12,
        followers: 156,
        following: 89,
        totalCO2Saved: 24.8,
      },
      badges: [
        {
          id: "1",
          name: "EcoStarter",
          description: "Registraste tu primera acción",
          icon: "🌱",
          rarity: "common" as const,
        },
        {
          id: "2", 
          name: "Eco Warrior",
          description: "10 acciones sostenibles completadas",
          icon: "⚡",
          rarity: "rare" as const,
        },
        {
          id: "3",
          name: "Carbon Fighter",
          description: "Redujiste 20kg de CO₂ este mes",
          icon: "🏆",
          rarity: "epic" as const,
        },
      ],
    },
    posts: mockPosts.slice(0, 2),
  };

  const trendingTags = ["veganismo", "transporte", "energia", "reciclaje", "sostenible", "plantbased"];

  const handleCreatePost = () => {
    console.log("Opening post creation modal...");
  };

  const handleRegisterAction = () => {
    console.log("Opening action registration modal...");
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "feed":
        return (
          <FeedSection
            posts={mockPosts}
            currentUser={currentUser}
            onCreatePost={handleCreatePost}
          />
        );
      case "explore":
        return (
          <ExploreSection
            posts={mockPosts}
            trendingTags={trendingTags}
            onSearch={handleSearch}
          />
        );
      case "footprint":
        return (
          <CarbonDashboard
            data={carbonData}
            onRegisterAction={handleRegisterAction}
          />
        );
      case "profile":
        return (
          <UserProfile
            {...userProfile}
            isOwnProfile={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <main className="pt-16 md:pt-20 pb-20 md:pb-8">
        <div className="container mx-auto max-w-2xl">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;