import { Heart } from 'lucide-react';

const CountdownSection = () => {
  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-3xl mx-auto text-center">
        {/* Decorative element */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-rose-soft" />
          <Heart className="w-6 h-6 text-primary animate-pulse-gentle" fill="currentColor" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-rose-soft" />
        </div>

        {/* Promise section */}
        <div className="love-letter-paper rounded-lg p-8 md:p-10">
          <h3 className="font-script text-3xl md:text-4xl text-foreground mb-6">
            My Promise to You
          </h3>
          
          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/90 mb-6">
            No matter how many miles separate us, no matter how many hours apart our clocks read, my heart beats for you and only you. Every sunset I watch, I know you'll see the same sun rise. We share the same moon, the same stars, and the same unwavering love.
          </p>

          <p className="font-body text-lg md:text-xl leading-relaxed text-foreground/90">
            I promise to be patient, to be present in every way I can, and to count down the days until we close this distance forever.
          </p>

          <div className="mt-8">
            <span className="inline-block text-3xl text-primary animate-pulse-gentle">∞</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountdownSection;
