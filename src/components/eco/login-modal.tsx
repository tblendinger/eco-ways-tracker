import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Sparkles } from "lucide-react";

interface LoginModalProps {
  open: boolean;
  onLogin: (username: string) => void;
}

export const LoginModal = ({ open, onLogin }: LoginModalProps) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
      setUsername("");
    }
  };

  const handleGuestLogin = () => {
    const guestNames = [
      "Visitante Verde", 
      "Eco Explorer", 
      "Amigo Sustentable", 
      "Verde Anónimo",
      "Eco Guest"
    ];
    const randomName = guestNames[Math.floor(Math.random() * guestNames.length)];
    onLogin(randomName);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-eco-green/10 rounded-full flex items-center justify-center">
            <Sparkles size={32} className="text-eco-green" />
          </div>
          <DialogTitle className="text-2xl font-poppins">
            ¡Bienvenido a Eco Ways!
          </DialogTitle>
          <p className="text-muted-foreground">
            Ingresa tu nombre para comenzar tu viaje sostenible
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-sm font-medium">
              Tu nombre
            </Label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="username"
                type="text"
                placeholder="Ej: María Verde"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              disabled={!username.trim()}
              className="btn-pill-cta btn-pill-responsive"
            >
              Comenzar como {username || "..."}
            </button>

            <button
              type="button"
              onClick={handleGuestLogin}
              className="btn-pill-streak btn-pill-responsive"
            >
              <User size={16} />
              Continuar como invitado
            </button>
          </div>
        </form>

        <div className="text-center text-xs text-muted-foreground">
          Demo interactivo • No se guardan datos
        </div>
      </DialogContent>
    </Dialog>
  );
};