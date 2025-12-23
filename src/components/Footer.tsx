const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-card/50 border-t border-primary/20">
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative hearts */}
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className="text-primary/40 text-lg"
              style={{ 
                animation: 'float 3s ease-in-out infinite',
                animationDelay: `${i * 0.3}s` 
              }}
            >
              ♥
            </span>
          ))}
        </div>

        <p className="font-script text-2xl md:text-3xl text-foreground mb-2">
          Made with all my love for you, Noemi
        </p>
        
        <p className="font-body text-muted-foreground italic">
          I love you ♥
        </p>

        {/* Bottom flourish */}
        <div className="mt-8 text-rose-soft/60 text-xl">
          ❧
        </div>
      </div>
    </footer>
  );
};

export default Footer;
