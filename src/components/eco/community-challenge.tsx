import { Users, Clock, Trophy, Target, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommunityChallenge {
  id: string;
  title: string;
  description: string;
  category: "transport" | "food" | "energy" | "shopping";
  duration: string;
  participants: number;
  maxParticipants?: number;
  progress: number;
  goalValue: number;
  currentValue: number;
  unit: string;
  reward: {
    type: "badge" | "points";
    value: string;
    icon: string;
  };
  participantAvatars: string[];
  isParticipating: boolean;
  difficulty: "easy" | "medium" | "hard";
}

interface CommunityChallengeProps {
  challenge: CommunityChallenge;
  onJoin: (challengeId: string) => void;
  onViewDetails: (challengeId: string) => void;
}

const categoryColors = {
  transport: "bg-blue-100 text-blue-800 border-blue-200",
  food: "bg-eco-green/10 text-eco-green border-eco-green/20",
  energy: "bg-yellow-100 text-yellow-800 border-yellow-200",
  shopping: "bg-purple-100 text-purple-800 border-purple-200"
};

const categoryLabels = {
  transport: "Transporte",
  food: "Alimentación", 
  energy: "Energía",
  shopping: "Compras"
};

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800", 
  hard: "bg-red-100 text-red-800"
};

const difficultyLabels = {
  easy: "Fácil",
  medium: "Medio",
  hard: "Difícil"
};

export const CommunityChallenge = ({ challenge, onJoin, onViewDetails }: CommunityChallengeProps) => {
  const progressPercentage = (challenge.currentValue / challenge.goalValue) * 100;

  return (
    <Card className="shadow-card hover:shadow-lg transition-all duration-300 animate-slide-up">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Badge className={`text-xs ${categoryColors[challenge.category]}`}>
                {categoryLabels[challenge.category]}
              </Badge>
              <Badge className={`text-xs ${difficultyColors[challenge.difficulty]}`}>
                {difficultyLabels[challenge.difficulty]}
              </Badge>
            </div>
            <CardTitle className="font-poppins text-lg">{challenge.title}</CardTitle>
          </div>
          
          <div className="text-2xl">{challenge.reward.icon}</div>
        </div>
        
        <p className="text-sm text-muted-foreground font-inter leading-relaxed">
          {challenge.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-inter text-muted-foreground">Progreso de la comunidad</span>
            <span className="font-poppins font-semibold text-eco-green">
              {challenge.currentValue} / {challenge.goalValue} {challenge.unit}
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="text-xs text-muted-foreground font-inter">
            {progressPercentage.toFixed(0)}% completado
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 py-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <Users size={16} className="text-muted-foreground" />
            <div>
              <div className="text-sm font-poppins font-semibold">
                {challenge.participants}
                {challenge.maxParticipants && `/${challenge.maxParticipants}`}
              </div>
              <div className="text-xs text-muted-foreground font-inter">Participantes</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock size={16} className="text-muted-foreground" />
            <div>
              <div className="text-sm font-poppins font-semibold">{challenge.duration}</div>
              <div className="text-xs text-muted-foreground font-inter">Tiempo restante</div>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {challenge.participantAvatars.slice(0, 4).map((avatar, index) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={avatar} />
                  <AvatarFallback className="bg-gradient-eco text-white text-xs">
                    {index + 1}
                  </AvatarFallback>
                </Avatar>
              ))}
              {challenge.participants > 4 && (
                <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                  <span className="text-xs text-muted-foreground font-inter">+{challenge.participants - 4}</span>
                </div>
              )}
            </div>
            <span className="text-xs text-muted-foreground font-inter">participando</span>
          </div>

          <div className="flex items-center space-x-1 text-eco-green">
            <Trophy size={14} />
            <span className="text-xs font-inter font-medium">{challenge.reward.value}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2 pt-2">
          {challenge.isParticipating ? (
            <Button 
              variant="outline" 
              className="flex-1 border-eco-green/20 text-eco-green hover:bg-eco-green/10 font-inter"
              onClick={() => onViewDetails(challenge.id)}
            >
              <Target size={16} className="mr-2" />
              Mi Progreso
            </Button>
          ) : (
            <>
              <Button 
                className="flex-1 bg-gradient-eco hover:shadow-eco font-inter"
                onClick={() => onJoin(challenge.id)}
              >
                Unirme al Desafío
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => onViewDetails(challenge.id)}
              >
                <ChevronRight size={16} />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};