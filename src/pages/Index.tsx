import FloatingHearts from '@/components/FloatingHearts';
import LoveLetter from '@/components/LoveLetter';
import PhotoGallery from '@/components/PhotoGallery';
import Music from '@/components/Music';
import DreamsSection from '@/components/DreamsSection';
import LoveSection from '@/components/LoveSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <FloatingHearts />
      
      <main className="relative z-10">
        <LoveLetter />
        <Music />
        <PhotoGallery />
        <DreamsSection />
        <LoveSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
