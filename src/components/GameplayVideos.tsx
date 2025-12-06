import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Gamepad2, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface GameplayVideo {
  id: string;
  title: string;
  description: string | null;
  video_url: string;
  thumbnail_url: string | null;
  game: string | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -50, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 12
    }
  }
};

const gameColors: Record<string, { bg: string; border: string; shadow: string; text: string }> = {
  "PUBG": { bg: "from-orange-500/20 to-yellow-500/20", border: "border-orange-500/50", shadow: "shadow-orange-500/30", text: "text-orange-400" },
  "Valorant": { bg: "from-red-500/20 to-pink-500/20", border: "border-red-500/50", shadow: "shadow-red-500/30", text: "text-red-400" },
  "CS2": { bg: "from-blue-500/20 to-cyan-500/20", border: "border-blue-500/50", shadow: "shadow-blue-500/30", text: "text-blue-400" },
  "default": { bg: "from-primary/20 to-purple-500/20", border: "border-primary/50", shadow: "shadow-primary/30", text: "text-primary" }
};

const getGameColor = (game: string | null) => {
  if (!game) return gameColors.default;
  const key = Object.keys(gameColors).find(k => game.toLowerCase().includes(k.toLowerCase()));
  return key ? gameColors[key] : gameColors.default;
};

// Static videos data - add your videos here
const videos: GameplayVideo[] = [];

const GameplayVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState<GameplayVideo | null>(null);

  if (videos.length === 0) {
    return null;
  }

  return (
    <div className="mt-24">
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <motion.span 
          className="text-sm font-semibold text-primary uppercase tracking-wider inline-flex items-center gap-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Gamepad2 className="w-4 h-4" />
          Esports Highlights
        </motion.span>
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Gameplay Showcase
        </motion.h2>
        <motion.p 
          className="text-muted-foreground mt-4 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Watch highlights from tournaments and ranked matches
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {videos.map((video) => {
          const colors = getGameColor(video.game);
          return (
            <motion.div
              key={video.id}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                y: -5,
                transition: { duration: 0.3, type: "spring" as const, stiffness: 300 }
              }}
              className="group relative cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.bg} backdrop-blur-sm border ${colors.border} transition-all duration-500 hover:shadow-2xl ${colors.shadow}`}>
                <div className="aspect-video overflow-hidden relative">
                  {video.thumbnail_url ? (
                    <img 
                      src={video.thumbnail_url} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <video 
                      src={video.video_url} 
                      className="w-full h-full object-cover"
                      muted
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.div 
                      className={`p-5 rounded-full bg-gradient-to-br ${colors.bg} border ${colors.border} backdrop-blur-sm`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className={`w-10 h-10 ${colors.text}`} fill="currentColor" />
                    </motion.div>
                  </div>

                  {video.game && (
                    <motion.div 
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border ${colors.border}`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className={`text-xs font-bold uppercase ${colors.text}`}>{video.game}</span>
                    </motion.div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className={`text-xl font-bold ${colors.text} transition-colors`}>
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                </div>

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 rounded-full ${colors.text}`}
                      style={{
                        left: `${20 + i * 20}%`,
                        bottom: 0,
                      }}
                      animate={{
                        y: [0, -100, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-background/95 backdrop-blur-xl">
          <button 
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <video 
                src={selectedVideo.video_url} 
                controls 
                autoPlay
                className="w-full aspect-video object-contain bg-black"
              />
              
              <div className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  {selectedVideo.game && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getGameColor(selectedVideo.game).text} bg-${getGameColor(selectedVideo.game).bg}`}>
                      {selectedVideo.game}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold">{selectedVideo.title}</h3>
                {selectedVideo.description && (
                  <p className="text-muted-foreground mt-2">{selectedVideo.description}</p>
                )}
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameplayVideos;
