import { motion } from "framer-motion";
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
    color: "orange",
    colorClass: "from-orange-500/20 to-yellow-500/20",
    borderClass: "border-orange-500/40 hover:border-orange-400",
    shadowClass: "hover:shadow-orange-500/40",
    glowClass: "via-orange-500/40",
    textClass: "group-hover:text-orange-400",
    achievements: [
      { icon: Trophy, label: "NBL 2023", value: "#1", prize: "$30,000" },
      { icon: Medal, label: "PMCO 2021", value: "#6" }
    ]
  },
  {
    name: "Valorant",
    logo: "https://cdn.worldvectorlogo.com/logos/valorant.svg",
    category: "Tactical Shooter",
    color: "red",
    colorClass: "from-red-500/20 to-pink-500/20",
    borderClass: "border-red-500/40 hover:border-red-400",
    shadowClass: "hover:shadow-red-500/40",
    glowClass: "via-red-500/40",
    textClass: "group-hover:text-red-400",
    achievements: [
      { icon: Gamepad2, label: "Rank", value: "Immortal" }
    ]
  },
  {
    name: "CS2",
    logo: "https://cdn.worldvectorlogo.com/logos/counter-strike-global-offensive.svg",
    category: "Tactical Shooter",
    color: "blue",
    colorClass: "from-blue-500/20 to-cyan-500/20",
    borderClass: "border-blue-500/40 hover:border-blue-400",
    shadowClass: "hover:shadow-blue-500/40",
    glowClass: "via-blue-500/40",
    textClass: "group-hover:text-blue-400",
    achievements: [
      { icon: Award, label: "Competitive", value: "Pro Level" }
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12
    }
  }
};

const Tools = () => {
  return (
    <section id="tools" className="container mx-auto px-6 py-24">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.span 
          className="text-sm font-semibold text-primary uppercase tracking-wider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          My Arsenal
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">The Tools & Techniques</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Professional-grade software and tools I use to bring creative visions to life
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
            className="group relative"
          >
            <div className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/30 overflow-hidden">
              <motion.div 
                className="w-full h-24 flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1, rotateZ: 5 }}
                transition={{ duration: 0.4 }}
              >
                <img 
                  src={tool.logo} 
                  alt={tool.name}
                  className="w-16 h-16 object-contain filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-500"
                />
              </motion.div>
              <h3 className="text-lg font-bold text-center group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-muted-foreground text-center mt-1">
                {tool.category}
              </p>
              
              {/* Animated glow effect */}
              <motion.div 
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Games Section */}
      <motion.div 
        className="text-center mt-24 mb-16"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <motion.span 
          className="text-sm font-semibold text-primary uppercase tracking-wider inline-flex items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Gamepad2 className="w-4 h-4" />
          Competitive Gaming
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">Games I Play</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Professional esports experience across multiple competitive titles
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {games.map((game, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.03,
              y: -10,
              transition: { duration: 0.3, type: "spring", stiffness: 300 }
            }}
            className="group relative"
          >
            <div className={`relative bg-gradient-to-br ${game.colorClass} backdrop-blur-sm border ${game.borderClass} rounded-2xl p-8 transition-all duration-500 hover:shadow-2xl ${game.shadowClass} overflow-hidden`}>
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${game.colorClass} opacity-40`}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0.2, 0.6, 0.2],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    }}
                  />
                ))}
              </div>

              <motion.div 
                className="w-full h-28 flex items-center justify-center mb-4 relative z-10"
                whileHover={{ scale: 1.15, rotateY: 15 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <img 
                  src={game.logo} 
                  alt={game.name}
                  className="w-24 h-24 object-contain drop-shadow-2xl transition-all duration-500"
                />
              </motion.div>
              
              <h3 className={`text-2xl font-bold text-center ${game.textClass} transition-colors relative z-10`}>
                {game.name}
              </h3>
              <p className="text-sm text-muted-foreground text-center mt-1 relative z-10">
                {game.category}
              </p>

              {/* Achievement Badges */}
              <div className="mt-6 space-y-3 relative z-10">
                {game.achievements.map((achievement, achIndex) => (
                  <motion.div
                    key={achIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + achIndex * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-center justify-between bg-background/30 backdrop-blur-sm rounded-lg px-4 py-3 border border-border/30`}
                  >
                    <div className="flex items-center gap-3">
                      <achievement.icon className={`w-5 h-5 ${game.textClass.replace('group-hover:', '')}`} />
                      <span className="text-sm font-medium text-foreground/80">{achievement.label}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-lg font-bold ${game.textClass.replace('group-hover:', '')}`}>
                        {achievement.value}
                      </span>
                      {achievement.prize && (
                        <p className="text-xs text-muted-foreground">{achievement.prize}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Gaming glow effect */}
              <motion.div 
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent ${game.glowClass} to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 -z-10`}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Gameplay Videos Section */}
      <GameplayVideos />
    </section>
  );
};

export default Tools;
