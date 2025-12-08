const Viewer3D = () => {
  return (
    <section id="3d-viewer" className="container mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="text-sm font-semibold text-primary uppercase tracking-wider">Interactive Showcase</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-2">Project Videos</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Watch my creative process and final project results.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* YouTube Video 1 */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/20 bg-card">
          <iframe
            src="https://www.youtube.com/embed/p4o1ss5fiZo"
            title="Project Video 1"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
        
        {/* Placeholder for Video 2 */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🎥</div>
            <p className="text-muted-foreground text-lg font-medium">Upload Project Video 2</p>
            <p className="text-sm text-muted-foreground/70 mt-2">Supported formats: MP4, WebM, MOV</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Viewer3D;