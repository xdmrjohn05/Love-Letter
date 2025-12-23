const loveReasons = [
  "I love how caring you are and that you always think about what I want and would like.",
  "I love how pretty you are even when you don't know it yourself.",
  "I love your goofy moods and how you feel comfortable being silly with me.",
  "I love your cat stickers and how you always manage to find new ones.",
  "I love how sweet you are and how sweet you treat me when I'm sad or act like a child (glup).",
  "I love how you always tell me how you feel and what you want me to do when I'm too stupid to understand.",
  "I love you and I love that you love me 😻",
];

const LoveSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-card/30">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="text-primary text-3xl animate-pulse-gentle">♥</span>
          <h2 className="font-script text-4xl md:text-5xl text-foreground mt-2">
            What I Love About You
          </h2>
          <p className="font-body text-muted-foreground mt-3 text-lg italic">
            An incomplete list of infinite reasons
          </p>
        </div>

        {/* Love reasons list */}
        <div className="romantic-text-box px-8 pt-8 pb-6 md:px-10 md:pt-10 md:pb-8">
          <ul className="space-y-4">
            {loveReasons.map((reason, index) => (
              <li 
                key={index}
                className="flex items-start gap-3 font-body text-lg text-foreground/90 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <span className="text-primary mt-1 flex-shrink-0">♥</span>
                <span>{reason}</span>
              </li>
            ))}
          </ul>

          <div className="group relative mt-8 pt-6 border-t border-rose-soft/50 text-center cursor-pointer h-12 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center gap-2 text-primary/70 transition-opacity duration-200 group-hover:opacity-0 text-center md:pt-6">
              <span className="text-2xl">♥</span>
              <span className="font-body text-sm uppercase tracking-wide select-none">put mouse here</span>
            </div>
            <p className="absolute inset-0 flex items-center justify-center font-script text-2xl text-transparent group-hover:text-primary transition-colors duration-200 italic md:pt-6 select-none">
              ...and i love and worship your beautiful, pretty and perfect body
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveSection;
