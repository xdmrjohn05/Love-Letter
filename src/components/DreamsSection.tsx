const DreamsSection = () => {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="text-gold text-3xl">☆</span>
          <h2 className="font-script text-4xl md:text-5xl text-foreground mt-2">
            My Dreams for Us
          </h2>
        </div>

        {/* Dreams content */}
        <div className="decorative-border rounded-lg p-8 md:p-10 bg-card shadow-card">
          <div className="font-body text-lg md:text-xl leading-relaxed text-foreground/90 space-y-5">
            <p>
              Right now my biggest dream is for us to actually meet, and after that I want to continue meeting as much as we can and for you to come visit me in Sweden so I can show you around!! And then when you finish school my biggest dream is for us to be together for real (kitty reaching out).
            </p>

            <div className="flex justify-center gap-4 pt-4 text-2xl text-primary/60">
              <span className="animate-float" style={{ animationDelay: '0s' }}>✧</span>
              <span className="animate-float" style={{ animationDelay: '0.5s' }}>♥</span>
              <span className="animate-float" style={{ animationDelay: '1s' }}>✧</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamsSection;
