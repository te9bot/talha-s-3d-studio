import { Trophy, Medal, Award, Gamepad2 } from "lucide-react";
import GameplayVideos from "./GameplayVideos";

const tools = [
  {
    name: "Blender",
    logo: "https://download.blender.org/branding/community/blender_community_badge_white.svg",
    category: "3D Modeling"
  },
  {
    name: "Substance Painter",
    logo: "https://cdn.worldvectorlogo.com/logos/substance-painter.svg",
    category: "Texturing"
  },
  {
    name: "Unreal Engine",
    logo: "https://cdn.worldvectorlogo.com/logos/unreal-1.svg",
    category: "Game Engine"
  },
  {
    name: "Photoshop",
    logo: "https://cdn.worldvectorlogo.com/logos/photoshop-cc-4.svg",
    category: "Image Editing"
  },
  {
    name: "After Effects",
    logo: "https://cdn.worldvectorlogo.com/logos/after-effects-1.svg",
    category: "Motion Graphics"
  },
  {
    name: "Lightroom",
    logo: "https://cdn.worldvectorlogo.com/logos/lightroom-cc.svg",
    category: "Photo Editing"
  }
];

const games = [
  {
    name: "PUBG Mobile",
    logo: "https://cdn.worldvectorlogo.com/logos/pubg-1.svg",
    category: "Battle Royale",
    colorClass: "from-orange-500/20 to-yellow-500/20",
    borderClass: "border-orange-500/40 hover:border-orange-400",
    textClass: "text-orange-400",
    achievements: [
      { icon: Trophy, label: "NBL 2023", value: "#1", prize: "$30,000" },
      { icon: Medal, label: "PMCO 2021", value: "#6" }
    ]
  },
  {
    name: "Valorant",
    logo: "https://cdn.worldvectorlogo.com/logos/valorant.svg",
    category: "Tactical Shooter",
    colorClass: "from-red-500/20 to-pink-500/20",
    borderClass: "border-red-500/40 hover:border-red-400",
    textClass: "text-red-400",
    achievements: [
      { icon: Gamepad2, label: "Rank", value: "Immortal" }
    ]
  },
  {
    name: "CS2",
    logo: "https://cdn.worldvectorlogo.com/logos/counter-strike-global-offensive.svg",
    category: "Tactical Shooter",
    colorClass: "from-blue-500/20 to-cyan-500/20",
    borderClass: "border-blue-500/40 hover:border-blue-400",
    textClass: "text-blue-400",
    achievements: [
      { icon: Award, label: "Competitive", value: "Pro Level" }
    ]
  }
];

const Tools = () => {
  return (
    <section id="tools" className="container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">My Arsenal</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">The Tools & Techniques</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Professional-grade software and tools I use to bring creative visions to life
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
        {tools.map((tool, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/20"
          >
            <div className="w-full h-24 flex items-center justify-center mb-4">
              <img 
                src={tool.logo} 
                alt={tool.name}
                className="w-16 h-16 object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300"
                loading="lazy"
              />
            </div>
            <h3 className="text-lg font-bold text-center group-hover:text-primary transition-colors">
              {tool.name}
            </h3>
            <p className="text-sm text-muted-foreground text-center mt-1">
              {tool.category}
            </p>
          </div>
        ))}
      </div>

      {/* Games Section */}
      <div className="text-center mt-24 mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider inline-flex items-center gap-2">
          <Gamepad2 className="w-4 h-4" />
          Competitive Gaming
        </span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">Games I Play</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Professional esports experience across multiple competitive titles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <div
            key={index}
            className={`group relative bg-gradient-to-br ${game.colorClass} backdrop-blur-sm border ${game.borderClass} rounded-2xl p-8 transition-all duration-300 hover:shadow-xl`}
          >
            <div className="w-full h-28 flex items-center justify-center mb-4">
              <img 
                src={game.logo} 
                alt={game.name}
                className="w-24 h-24 object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
            </div>
            
            <h3 className={`text-2xl font-bold text-center ${game.textClass} transition-colors`}>
              {game.name}
            </h3>
            <p className="text-sm text-muted-foreground text-center mt-1">
              {game.category}
            </p>

            {/* Achievement Badges */}
            <div className="mt-6 space-y-3">
              {game.achievements.map((achievement, achIndex) => (
                <div
                  key={achIndex}
                  className="flex items-center justify-between bg-background/30 backdrop-blur-sm rounded-lg px-4 py-3 border border-border/30"
                >
                  <div className="flex items-center gap-3">
                    <achievement.icon className={`w-5 h-5 ${game.textClass}`} />
                    <span className="text-sm font-medium text-foreground/80">{achievement.label}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${game.textClass}`}>
                      {achievement.value}
                    </span>
                    {achievement.prize && (
                      <p className="text-xs text-muted-foreground">{achievement.prize}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Gameplay Videos Section */}
      <GameplayVideos />
    </section>
  );
};

export default Tools;