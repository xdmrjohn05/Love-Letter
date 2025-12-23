const LoveLetter = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 relative">
      <div className="love-letter-paper max-w-3xl w-full rounded-lg p-8 md:p-12 relative">
        {/* Decorative seal */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center animate-glow animate-pulse-gentle">
          <span className="text-primary-foreground text-xl">♥</span>
        </div>
        
        {/* Letter header */}
        <div className="text-center mb-8 pt-4">
          <p className="text-muted-foreground font-body italic text-lg">A letter for my love</p>
          <h1 className="font-script text-5xl md:text-7xl text-foreground mt-2 tracking-wide">
            Dear <span className="text-primary">Noemi</span>
          </h1>
        </div>

        {/* Letter content */}
        <div className="font-body text-lg md:text-xl leading-relaxed text-foreground/80 space-y-6 pl-4 md:pl-8">
          <p className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Almost nine months since we started talking and almost instantly i became attatched to you. You are the sweetest, prettiest girl in the world and you understand me so well. I know im not the greatest guy and i make a lot of mistakes but you make me want to try to be better for you everyday.
          </p>
        </div>

        {/* Signature */}
        <div className="mt-10 text-right pr-4 md:pr-8">
          <p className="font-script text-2xl md:text-3xl text-primary italic">
            Forever your good boy,
          </p>
          <p className="font-script text-3xl md:text-4xl text-foreground mt-1">
            ♥
          </p>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-4 left-4 text-primary/40 text-2xl">❦</div>
        <div className="absolute top-4 right-4 text-primary/40 text-2xl scale-x-[-1]">❦</div>
        <div className="absolute bottom-4 left-4 text-primary/40 text-2xl rotate-180">❦</div>
        <div className="absolute bottom-4 right-4 text-primary/40 text-2xl rotate-180 scale-x-[-1]">❦</div>
      </div>
    </section>
  );
};

export default LoveLetter;
