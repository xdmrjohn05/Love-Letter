import { useEffect, useRef, useState } from "react";

export default function Music({
  // Default to the placeholder MP3 in `public/audio/placeholder.mp3` so replacing
  // that file in your repo will be picked up automatically.
  src = `${import.meta.env.BASE_URL}audio/placeholder.mp3`,
  title = "Sweet - Cigarettes After Sex",
  caption = "This song makes me thing of you",
}: {
  src?: string;
  title?: string;
  caption?: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [pinnedVisible, setPinnedVisible] = useState(false);
  const pinTimer = useRef<number | null>(null);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState<number | null>(null);
  // speech on play removed per user request
  const [volume, setVolume] = useState(0.8);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onPlay = () => {
      setPlaying(true);
      pinNow();
    };
    const onPause = () => {
      setPlaying(false);
      unpinNow();
    };
    const onTime = () => setTime(a.currentTime);
    const onLoaded = () => setDuration(isFinite(a.duration) ? a.duration : null);

    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onLoaded);
    // no-op: speech removed

    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onLoaded);
      // no-op: speech removed
    };
  }, []);

  // cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (pinTimer.current) {
        window.clearTimeout(pinTimer.current);
        pinTimer.current = null;
      }
    };
  }, []);

  // Keep the audio element's volume in sync with state
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
  }, [volume]);

  // Reload the audio element if `src` changes (handles replacing files on disk)
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    // pause and reset before loading new src to avoid playing stale audio
    try {
      a.pause();
      a.currentTime = 0;
    } catch (e) {}
    a.src = src;
    a.load();
    // ensure new source uses current volume setting
    a.volume = volume;
    setTime(0);
    setDuration(null);
    setPlaying(false);
    // no-op: speech removed
  }, [src]);

  function togglePlay() {
    const a = audioRef.current!;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  }

  function pinNow() {
    const node = boxRef.current;
    if (!node) {
      setIsPinned(true);
      setPinnedVisible(true);
      return;
    }

    // pin and fade/slide via CSS transitions (single element, no overlay)
    setIsPinned(true);
    // slight delay to let layout settle before showing pinned state fully
    if (pinTimer.current) window.clearTimeout(pinTimer.current);
    pinTimer.current = window.setTimeout(() => {
      setPinnedVisible(true);
      pinTimer.current = null;
    }, 10);
  }

  function unpinNow() {
    if (pinTimer.current) {
      window.clearTimeout(pinTimer.current);
      pinTimer.current = null;
    }
    setPinnedVisible(false);
    setIsPinned(false);
  }

  function seekTo(percent: number) {
    const a = audioRef.current!;
    if (!a.duration || !isFinite(a.duration)) return;
    a.currentTime = a.duration * percent;
  }

  function fmt(secs: number) {
    const s = Math.max(0, Math.floor(secs));
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, "0")}`;
  }

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-xl mx-auto">
        <div
          ref={boxRef}
          className={(isPinned ? "fixed top-4 right-4 z-50 w-64 max-w-[92vw] p-2 rounded-xl bg-[hsl(0_10%_11%/0.92)] text-card-foreground border border-[hsl(350_45%_35%/0.4)] ring-1 ring-[hsl(350_65%_60%/0.18)] backdrop-blur-md shadow-[0_12px_36px_hsl(350_65%_60%/0.15)] transform transition-[transform,opacity] duration-300 ease-out" : "romantic-text-box p-6 text-center transition-all") + (isPinned && !pinnedVisible ? " opacity-0 -translate-y-1 scale-95" : " opacity-100 translate-y-0 scale-100")}
          style={isPinned ? { willChange: "transform, opacity, top, right, width, height" } : undefined}
        >
        {isPinned ? (
          <div className="relative flex flex-col gap-1 px-2 py-1 min-h-[50px] select-none">
            <div className="flex items-center gap-[0.56rem] pr-[5px]">
              <button
                aria-label={playing ? "Pause" : "Play"}
                onClick={togglePlay}
                className="flex-none w-9 h-9 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-glow transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/60"
              >
                {playing ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 3v18l15-9L5 3z"/></svg>
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="text-[12px] leading-tight font-serif font-semibold tracking-tight text-foreground whitespace-nowrap overflow-hidden text-ellipsis" title={title}>
                  {title}
                </div>
                <div className="text-[11px] text-muted-foreground font-serif">{fmt(time)} / {duration ? fmt(duration) : "--:--"}</div>
              </div>

            </div>

            <div className="flex flex-col gap-1 mt-[5px]">
              <div
                className="h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  const x = (e as React.MouseEvent).clientX - rect.left;
                  seekTo(x / rect.width);
                }}
              >
                <div className="h-full bg-gradient-to-r from-primary to-rose-soft" style={{ width: `${duration ? (time / duration) * 100 : 0}%` }} />
              </div>

              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-serif">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M11 5 6 9H2v6h4l5 4V5z"/><path d="M19 9a4 4 0 0 1 0 6"/></svg>
                <input
                  aria-label="Volume"
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={Math.round(volume * 100)}
                  onChange={(e) => setVolume(Number(e.target.value) / 100)}
                  className="w-full h-1.5 rounded-full bg-slate-800 appearance-none cursor-pointer volume-slider"
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="text-2xl font-script text-foreground mb-3">{caption}</div>
            <div className="flex flex-col items-center gap-4">
              <div className="w-full bg-card/40 rounded-xl p-4 flex items-center gap-4 shadow-soft">
                <button
                  aria-label={playing ? "Pause" : "Play"}
                  onClick={() => {
                    const a = audioRef.current!;
                    if (a.paused) {
                      a.play().catch(() => {});
                      pinNow();
                    } else {
                      a.pause();
                      unpinNow();
                    }
                  }}
                  className="flex-none w-14 h-14 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-glow transition-transform hover:scale-105"
                >
                  {playing ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 3v18l15-9L5 3z"/></svg>
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-script text-foreground text-lg">{title}</div>
                    <div className="text-sm text-muted-foreground">{duration ? fmt(duration) : "--:--"}</div>
                  </div>

                  <div
                    className="h-2 bg-muted rounded-full overflow-hidden cursor-pointer"
                    onClick={(e) => {
                      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                      const x = (e as React.MouseEvent).clientX - rect.left;
                      seekTo(x / rect.width);
                    }}
                  >
                    <div
                      className="h-full bg-gradient-to-r from-primary to-rose-soft"
                      style={{ width: `${duration ? (time / duration) * 100 : 0}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
                    <div>{fmt(time)}</div>
                    <div className="flex items-center gap-3">
                      {/* volume icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19 9a4 4 0 0 1 0 6"/></svg>
                      <input
                        aria-label="Volume"
                        type="range"
                        min={0}
                        max={100}
                        step={1}
                        value={Math.round(volume * 100)}
                        onChange={(e) => setVolume(Number(e.target.value) / 100)}
                        className="w-28 h-1.5 rounded-full bg-muted appearance-none cursor-pointer volume-slider"
                        title="Volume"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* hint removed per request */}
            </div>
          </>
        )}

          <audio ref={audioRef} src={src} preload="metadata" />
        </div>
      </div>
    </section>
  );
}
