import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Play, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Photo {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  video_url: string | null;
  category: string | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15
    }
  }
};

// Static photos data - add your photos here
const photos: Photo[] = [];

const Photography = () => {
  const [selectedMedia, setSelectedMedia] = useState<Photo | null>(null);

  if (photos.length === 0) {
    return null;
  }

  return (
    <section id="photography" className="container mx-auto px-6 py-24">
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
          <Camera className="w-4 h-4" />
          Visual Stories
        </motion.span>
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Photography & Videography
        </motion.h2>
        <motion.p 
          className="text-muted-foreground mt-4 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Capturing moments and creating visual narratives through lens
        </motion.p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            variants={itemVariants}
            whileHover={{ 
              scale: 1.02,
              y: -8,
              transition: { duration: 0.3, type: "spring" as const, stiffness: 300 }
            }}
            className="group relative cursor-pointer"
            onClick={() => setSelectedMedia(photo)}
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/80 to-card/40 border border-border/50 hover:border-primary transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20">
              {photo.image_url && (
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={photo.image_url} 
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              )}
              
              {photo.video_url && !photo.image_url && (
                <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                  <Play className="w-16 h-16 text-primary" />
                </div>
              )}

              {photo.video_url && (
                <motion.div 
                  className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm p-2 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" as const }}
                >
                  <Play className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              )}

              <div className="p-5">
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
                  {photo.title}
                </h3>
                {photo.category && (
                  <span className="text-xs text-primary/80 uppercase tracking-wider">
                    {photo.category}
                  </span>
                )}
                {photo.description && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {photo.description}
                  </p>
                )}
              </div>

              <motion.div 
                className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  boxShadow: ["0 0 0 0 rgba(var(--primary), 0)", "0 0 20px 5px rgba(var(--primary), 0.3)", "0 0 0 0 rgba(var(--primary), 0)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/95 backdrop-blur-xl">
          <button 
            onClick={() => setSelectedMedia(null)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {selectedMedia.video_url ? (
                <video 
                  src={selectedMedia.video_url} 
                  controls 
                  autoPlay
                  className="w-full max-h-[80vh] object-contain"
                />
              ) : selectedMedia.image_url ? (
                <img 
                  src={selectedMedia.image_url} 
                  alt={selectedMedia.title}
                  className="w-full max-h-[80vh] object-contain"
                />
              ) : null}
              
              <div className="p-6">
                <h3 className="text-xl font-bold">{selectedMedia.title}</h3>
                {selectedMedia.description && (
                  <p className="text-muted-foreground mt-2">{selectedMedia.description}</p>
                )}
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Photography;
