import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/ui/navigation";
import { FeedSection } from "@/components/eco/feed-section";
import { ExploreSection } from "@/components/eco/explore-section";
import { CarbonDashboard } from "@/components/eco/carbon-dashboard";
import { UserProfile } from "@/components/eco/user-profile";
import { FloatingActionButton } from "@/components/eco/floating-action-button";
import { RegisterActionModal } from "@/components/eco/register-action-modal";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  // Mock data - moved up to fix declaration order
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

  const [activeTab, setActiveTab] = useState("feed");
  const [posts, setPosts] = useState(mockPosts);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle navigation based on tab selection
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "benefits") {
      navigate("/benefits");
    }
    // Other tabs stay on the main page
  };

  // Set active tab based on current route
  useEffect(() => {
    if (location.pathname === "/benefits") {
      setActiveTab("benefits");
    } else {
      // Default to feed for main page
      setActiveTab("feed");
    }
  }, [location.pathname]);

  // Mock data
  const currentUser = {
    name: "Tomás Eco",
    username: "tomas_eco",
    avatar: undefined,
  };

  const carbonData = {
    total: 12.4,
    weeklyChange: -15,
    monthlyGoal: 50,
    streak: 7,
    breakdown: {
      transport: 4.2,
      food: 3.8,
      energy: 2.1,
      shopping: 2.3,
    },
  };

  const userProfile = {
    user: {
      name: "Tomás Eco",
      username: "tomas_eco",
      avatar: undefined,
      bio: "Apasionado por un futuro sostenible 🌱 | Reduciendo mi huella de carbono día a día | Córdoba, Argentina",
      location: "Córdoba, Argentina",
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
    posts: posts.slice(0, 2),
  };

  const trendingTags = ["veganismo", "transporte", "energia", "reciclaje", "sostenible", "plantbased"];

  const handleCreatePost = (content: string) => {
    const actionTypes = ["transport", "food", "energy"] as const;
    const randomAction = actionTypes[Math.floor(Math.random() * actionTypes.length)];
    
    const newPost = {
      user: { name: "Tomás Eco", username: "tomas_eco", avatar: undefined },
      content,
      co2Impact: Math.round((Math.random() * 3 + 0.5) * 10) / 10,
      actionType: randomAction,
      likes: 0,
      comments: 0,
      isLiked: false,
      timestamp: "ahora",
      hasSustainableAction: true,
    };
    setPosts([newPost, ...posts]);
  };

  const handleRegisterAction = () => {
    setShowRegisterModal(true);
  };

  const handleActionSaved = (savedCo2: number) => {
    toast({
      title: "¡Acción registrada!",
      description: `Ahorraste ${savedCo2} kg CO₂. ¡Excelente trabajo!`
    });
  };

  const handleActionShared = (content: string) => {
    const newPost = {
      user: { name: "Tomás Eco", username: "tomas_eco", avatar: undefined },
      content,
      co2Impact: 0,
      actionType: "transport" as const,
      likes: 0,
      comments: 0,
      isLiked: false,
      timestamp: "ahora",
      hasSustainableAction: true,
    };
    
    setPosts([newPost, ...posts]);
    
    toast({
      title: "¡Acción compartida!",
      description: "Tu acción sostenible fue publicada en el feed"
    });
  };

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "feed":
        return (
          <FeedSection
            posts={posts}
            currentUser={currentUser}
            onCreatePost={handleCreatePost}
          />
        );
      case "explore":
        return (
          <ExploreSection
            posts={posts}
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
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Main Content */}
      <main className="pt-16 md:pt-20 pb-20 md:pb-8" role="main">
        <div className="container mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {renderContent()}
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => setShowRegisterModal(true)} />

      {/* Register Action Modal */}
      <RegisterActionModal
        open={showRegisterModal}
        onOpenChange={setShowRegisterModal}
        onActionSaved={handleActionSaved}
        onActionShared={handleActionShared}
      />
    </div>
  );
};

export default Index;