import { useState } from "react";
import { Gift, Star, TrendingUp, Filter, Award, Target, ShoppingBag, Store } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BenefitCard } from "@/components/eco/benefit-card";
import { MarketplaceProduct } from "@/components/eco/marketplace-product";

const Benefits = () => {
  // Mock marketplace products
  const mockProducts = [
    {
      id: "1",
      name: "Botella de Acero Inoxidable 750ml",
      description: "Botella térmica libre de BPA, mantiene temperatura 12h. Perfecta para hidratarte de forma sostenible.",
      price: 45,
      originalPrice: 60,
      rating: 4.8,
      reviews: 234,
      image: "🍃",
      category: "Hidratación",
      ecoScore: 9,
      certifications: ["BPA Free", "Reciclable"],
      inStock: true,
      fastShipping: true
    },
    {
      id: "2",
      name: "Set de Bolsas Reutilizables x5",
      description: "Bolsas de algodón orgánico certificado. Diferentes tamaños para todas tus compras.",
      price: 28,
      originalPrice: 35,
      rating: 4.6,
      reviews: 156,
      image: "♻️",
      category: "Compras Sostenibles",
      ecoScore: 10,
      certifications: ["Algodón Orgánico", "Comercio Justo"],
      inStock: true,
      fastShipping: false
    },
    {
      id: "3",
      name: "Panel Solar Portátil 50W",
      description: "Carga tus dispositivos con energía solar. Resistente al agua, perfecto para camping y uso doméstico.",
      price: 120,
      originalPrice: 150,
      rating: 4.9,
      reviews: 89,
      image: "☀️",
      category: "Energía Renovable",
      ecoScore: 10,
      certifications: ["IP65", "Garantía 5 años"],
      inStock: true,
      fastShipping: true
    },
    {
      id: "4",
      name: "Kit de Cubiertos Bambú + Estuche",
      description: "Set completo de cubiertos de bambú orgánico con estuche de algodón. Ideal para llevar.",
      price: 22,
      rating: 4.5,
      reviews: 312,
      image: "🎋",
      category: "Alimentación",
      ecoScore: 8,
      certifications: ["Bambú Orgánico"],
      inStock: false,
      fastShipping: false
    },
    {
      id: "5",
      name: "Cepillo de Dientes de Bambú x4",
      description: "Pack familiar de cepillos biodegradables. Cerdas suaves de origen vegetal.",
      price: 18,
      originalPrice: 24,
      rating: 4.7,
      reviews: 198,
      image: "🦷",
      category: "Cuidado Personal",
      ecoScore: 9,
      certifications: ["Biodegradable", "Vegano"],
      inStock: true,
      fastShipping: true
    },
    {
      id: "6",
      name: "Compostador Doméstico 20L",
      description: "Convierte tus residuos orgánicos en abono natural. Incluye filtro anti-olores.",
      price: 85,
      originalPrice: 110,
      rating: 4.4,
      reviews: 67,
      image: "🌱",
      category: "Jardín Sostenible",
      ecoScore: 9,
      certifications: ["Reciclado", "Libre de BPA"],
      inStock: true,
      fastShipping: false
    }
  ];

  // Mock benefits data
  const mockBenefits = [
    {
      id: "1",
      title: "20% descuento en accesorios de bicicleta",
      description: "Obtén descuentos en cascos, luces, candados y más accesorios para tu bicicleta",
      partner: {
        name: "BiciMundo",
        logo: "🚴‍♂️"
      },
      category: "transport" as const,
      requirement: {
        co2Saved: 15,
        period: "mes"
      },
      discount: {
        type: "percentage" as const,
        value: "20% OFF"
      },
      validUntil: "31 Dic",
      usedBy: 234,
      maxUses: 500,
      isUnlocked: true,
      userProgress: 18,
      terms: ["Válido solo para productos en stock", "No acumulable con otras ofertas", "Presentar código en tienda"]
    },
    {
      id: "2", 
      title: "Botella reutilizable gratis",
      description: "Recibe una botella de acero inoxidable libre de BPA por reducir tu consumo de plástico",
      partner: {
        name: "EcoBottle",
        logo: "🍃"
      },
      category: "lifestyle" as const,
      requirement: {
        co2Saved: 8,
        period: "mes"
      },
      discount: {
        type: "gift" as const,
        value: "GRATIS"
      },
      validUntil: "28 Feb",
      usedBy: 156,
      maxUses: 300,
      isUnlocked: false,
      userProgress: 6.2,
      terms: ["Una botella por usuario", "Recoger en sucursal", "Disponible en 3 colores"]
    },
    {
      id: "3",
      title: "Envío gratis en productos orgánicos",
      description: "Disfruta de envío gratuito en tu compra de alimentos orgánicos y de comercio justo",
      partner: {
        name: "Orgánico Market",
        logo: "🌱"
      },
      category: "food" as const,
      requirement: {
        co2Saved: 12,
        period: "mes"
      },
      discount: {
        type: "free_shipping" as const,
        value: "Envío GRATIS"
      },
      validUntil: "15 Mar",
      usedBy: 89,
      isUnlocked: true,
      userProgress: 15.3,
      terms: ["Compra mínima $50", "Solo productos orgánicos", "Válido en CABA y GBA"]
    },
    {
      id: "4",
      title: "Kit de bolsas ecológicas + descuento",
      description: "Set completo de bolsas reutilizables de algodón orgánico con 15% de descuento",
      partner: {
        name: "GreenBags Co",
        logo: "♻️"
      },
      category: "shopping" as const,
      requirement: {
        co2Saved: 10,
        period: "mes"
      },
      discount: {
        type: "percentage" as const,
        value: "15% OFF"
      },
      validUntil: "20 Abr",
      usedBy: 67,
      maxUses: 200,
      isUnlocked: false,
      userProgress: 8.7,
      terms: ["Set de 3 bolsas incluido", "Material certificado", "Garantía de 1 año"]
    },
    {
      id: "5",
      title: "Consulta gratuita de eficiencia energética",
      description: "Auditoría profesional para optimizar el consumo energético de tu hogar",
      partner: {
        name: "EcoConsulting",
        logo: "⚡"
      },
      category: "energy" as const,
      requirement: {
        co2Saved: 25,
        period: "mes"
      },
      discount: {
        type: "gift" as const,
        value: "GRATIS"
      },
      validUntil: "30 Jun",
      usedBy: 43,
      maxUses: 100,
      isUnlocked: false,
      userProgress: 12.4,
      terms: ["Consulta de 2 horas", "Incluye informe técnico", "Zona CABA únicamente"]
    },
    {
      id: "6",
      title: "50% descuento en panel solar portátil",
      description: "Ideal para camping y uso doméstico. Energía limpia donde la necesites",
      partner: {
        name: "SolarTech",
        logo: "☀️"
      },
      category: "energy" as const,
      requirement: {
        co2Saved: 35,
        period: "mes"
      },
      discount: {
        type: "percentage" as const,
        value: "50% OFF"
      },
      validUntil: "15 May",
      usedBy: 21,
      maxUses: 50,
      isUnlocked: false,
      userProgress: 12.4,
      terms: ["Panel de 100W incluido", "Incluye batería y cables", "Garantía de 5 años"]
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Todos", count: mockBenefits.length },
    { id: "transport", label: "Transporte", count: mockBenefits.filter(b => b.category === "transport").length },
    { id: "food", label: "Alimentación", count: mockBenefits.filter(b => b.category === "food").length },
    { id: "energy", label: "Energía", count: mockBenefits.filter(b => b.category === "energy").length },
    { id: "shopping", label: "Compras", count: mockBenefits.filter(b => b.category === "shopping").length },
    { id: "lifestyle", label: "Estilo de Vida", count: mockBenefits.filter(b => b.category === "lifestyle").length },
  ];

  const unlockedBenefits = mockBenefits.filter(b => b.isUnlocked);
  const featuredBenefits = mockBenefits.slice(0, 3);

  const handleClaimBenefit = (benefitId: string) => {
    console.log("Claiming benefit:", benefitId);
    // TODO: Implement claim benefit logic
  };

  const handleViewTerms = (benefitId: string) => {
    console.log("Viewing terms for benefit:", benefitId);
    // TODO: Implement view terms logic
  };

  const handleAddToCart = (productId: string) => {
    console.log("Adding product to cart:", productId);
    // TODO: Implement add to cart logic
  };

  const filteredBenefits = selectedCategory === "all" 
    ? mockBenefits 
    : mockBenefits.filter(b => b.category === selectedCategory);

  return (
    <section className="space-y-4 sm:space-y-6 p-2 sm:p-4">
      {/* Header */}
      <header className="text-center space-y-3 sm:space-y-4">
        <h1 className="font-poppins font-bold text-2xl sm:text-3xl text-foreground">Tienda Eco</h1>
        <p className="text-sm sm:text-base text-muted-foreground font-inter max-w-2xl mx-auto px-4">
          Productos sostenibles y beneficios exclusivos para una vida más eco-friendly
        </p>
      </header>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4" aria-label="Estadísticas de la tienda">
        <Card className="shadow-card text-center">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-eco-green">{mockProducts.length}</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-inter">Productos disponibles</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card text-center">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-eco-orange">{unlockedBenefits.length}</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-inter">Beneficios desbloqueados</div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card text-center">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl font-poppins font-bold text-foreground">15%</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-inter">Descuento promedio</div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Featured Products */}
      <section aria-labelledby="productos-destacados-preview">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle id="productos-destacados-preview" className="font-poppins text-base sm:text-lg flex items-center space-x-2">
              <Store size={20} className="text-eco-green" />
              <span>Productos Destacados</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {mockProducts.slice(0, 3).map((product) => (
                <article key={product.id} className="p-3 sm:p-4 border rounded-lg bg-gradient-subtle hover:shadow-eco transition-all duration-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xl sm:text-2xl" role="img" aria-label={`Icono de ${product.name}`}>
                      {product.image}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-poppins font-semibold text-sm line-clamp-1">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-poppins font-bold text-base sm:text-lg text-eco-green">
                      ${product.price}
                    </div>
                    <Badge className="bg-eco-green text-white text-xs">
                      Eco {product.ecoScore}/10
                    </Badge>
                  </div>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Main Content */}
      <section className="w-full" role="region" aria-label="Catálogo de productos y beneficios">
        <Tabs defaultValue="products" className="w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
            <TabsList className="grid w-full max-w-lg grid-cols-3">
              <TabsTrigger value="products" className="font-inter text-sm">Productos</TabsTrigger>
              <TabsTrigger value="benefits" className="font-inter text-sm">Beneficios</TabsTrigger>
              <TabsTrigger value="unlocked" className="font-inter text-sm">Desbloqueados</TabsTrigger>
            </TabsList>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center space-x-2 w-full sm:w-auto"
              aria-label="Abrir filtros"
            >
              <Filter size={16} />
              <span className="font-inter">Filtros</span>
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex space-x-2 mb-4 sm:mb-6 overflow-x-auto pb-2" role="tablist" aria-label="Filtros por categoría">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap flex items-center space-x-2 font-inter text-xs sm:text-sm"
                onClick={() => setSelectedCategory(category.id)}
                role="tab"
                aria-selected={selectedCategory === category.id}
                aria-controls={`panel-${category.id}`}
              >
                <span>{category.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
        </div>

          <TabsContent value="products" className="space-y-4" role="tabpanel" id="panel-products">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {mockProducts.map((product) => (
                <MarketplaceProduct
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="benefits" className="space-y-4" role="tabpanel" id="panel-benefits">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {filteredBenefits.map((benefit) => (
                <BenefitCard
                  key={benefit.id}
                  benefit={benefit}
                  onClaim={handleClaimBenefit}
                  onViewTerms={handleViewTerms}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="unlocked" className="space-y-4" role="tabpanel" id="panel-unlocked">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              {unlockedBenefits.map((benefit) => (
                <BenefitCard
                  key={benefit.id}
                  benefit={benefit}
                  onClaim={handleClaimBenefit}
                  onViewTerms={handleViewTerms}
                />
              ))}
            </div>
            {unlockedBenefits.length === 0 && (
              <Card className="shadow-card bg-gradient-subtle border-dashed">
                <CardContent className="p-6 sm:p-8 text-center space-y-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-eco-green/10 rounded-full flex items-center justify-center mx-auto">
                    <Target size={24} className="text-eco-green sm:w-8 sm:h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-poppins font-semibold text-base sm:text-lg">Aún no tienes beneficios desbloqueados</h3>
                    <p className="text-sm sm:text-base text-muted-foreground font-inter max-w-md mx-auto">
                      Continúa registrando acciones sostenibles para desbloquear descuentos exclusivos
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

        </Tabs>
      </section>

      {/* How it Works */}
      <section aria-labelledby="como-funciona">
        <Card className="shadow-card bg-gradient-subtle">
          <CardHeader>
            <CardTitle id="como-funciona" className="font-poppins text-base sm:text-lg flex items-center space-x-2">
              <Award size={20} className="text-eco-green" />
              <span>¿Cómo funciona?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center space-y-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-eco-green/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="font-poppins font-bold text-eco-green text-sm sm:text-base">1</span>
                </div>
                <h3 className="font-poppins font-semibold text-sm sm:text-base">Registra acciones</h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-inter">
                  Usa transporte sostenible, come vegano, ahorra energía
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-eco-green/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="font-poppins font-bold text-eco-green text-sm sm:text-base">2</span>
                </div>
                <h3 className="font-poppins font-semibold text-sm sm:text-base">Reduce CO₂</h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-inter">
                  Cada acción suma a tu reducción mensual de emisiones
                </p>
              </div>
              
              <div className="text-center space-y-2">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-eco-green/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="font-poppins font-bold text-eco-green text-sm sm:text-base">3</span>
                </div>
                <h3 className="font-poppins font-semibold text-sm sm:text-base">Desbloquea beneficios</h3>
                <p className="text-xs sm:text-sm text-muted-foreground font-inter">
                  Accede a descuentos exclusivos de nuestros partners
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </section>
  );
};

export default Benefits;