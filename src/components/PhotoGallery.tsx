import { useState } from "react";

interface Photo {
  id: number;
  // `src` can be a public path (e.g. `/photos/my-photo.jpg`) or an imported module
  src?: string;
  alt?: string;
  placeholder?: string;
  // allowGif: when true the tile will try `.gif` first when resolving an image
  allowGif?: boolean;
}

const extensions = [".jpg", ".jpeg", ".png", ".svg"];

function PhotoTile({ photo, index }: { photo: Photo; index: number }) {
  const [extIndex, setExtIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const isDataUrl = typeof photo.src === "string" && photo.src.startsWith("data:");
  const hasExtension = isDataUrl || (photo.src && /\.[a-zA-Z0-9]+$/.test(photo.src));
  const base = photo.src ?? `${import.meta.env.BASE_URL}photos/photo-${photo.id}`;

  const extList = hasExtension
    ? []
    : photo.allowGif
    ? [".gif", ".jpg", ".jpeg", ".png", ".svg"]
    : [".jpg", ".jpeg", ".png", ".svg"];

  const src = hasExtension ? base : `${base}${extList[extIndex]}`;

  function handleError() {
    if (hasExtension) {
      setFailed(true);
      return;
    }

    if (extIndex < extensions.length - 1) {
      setExtIndex((i) => i + 1);
    } else {
      setFailed(true);
    }
  }

  return (
    <div
      className="aspect-square relative group cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="absolute inset-0 rounded-lg border border-primary/20 overflow-hidden transition-all duration-300 group-hover:border-primary/40 group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_hsl(350_65%_60%/0.2)]">
        {!failed ? (
          <img
            src={src}
            alt={photo.alt ?? ''}
            className="w-full h-full object-cover bg-card transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={handleError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-card">
            <div className="text-center">
              <span className="text-primary/60 text-4xl block mb-2">♥</span>
              <span className="font-script text-muted-foreground text-lg">
                {photo.placeholder}
              </span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
      </div>

      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-primary-foreground text-xs">♥</span>
      </div>
    </div>
  );
}

// Example photos array. Replace the `src` values with your image base paths.
// If you place images in the `public/photos/` folder, use base names like `/photos/photo-1` and
// the component will try `.jpg`, `.png`, then `.svg` automatically.
const photos: Photo[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  alt: `Photo ${i + 1}`,
  placeholder: `Photo ${i + 1}`,
  // allow GIF specifically for the 8th photo (index 7)
  allowGif: i === 7,
}));

const PhotoGallery = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-card/50">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-primary text-3xl">✦</span>
          <h2 className="font-script text-4xl md:text-5xl text-foreground mt-2">
            My Favorite Photos of You
          </h2>
          <p className="font-body text-muted-foreground mt-3 text-lg italic">
            My pretty bunny
          </p>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {photos.map((photo, index) => (
            <PhotoTile key={photo.id} photo={photo} index={index} />
          ))}
        </div>

        {/* Small text box */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="romantic-text-box p-6 md:p-8 text-center">
            <p className="font-body text-foreground/85 text-lg leading-relaxed italic">
              I wish I was closer so we could create more memories together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
