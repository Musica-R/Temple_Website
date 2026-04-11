import { useRef, useState, useEffect } from "react";
import { useLanguage } from "../Context/Languagecontext";
import translations from "../Json/templeVideoTranslations.json";
import "../Stylesheet/TempleVideo.css";

function useFadeIn(ref, delay = 0) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("tv-in"), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, delay]);
}

/* Lotus divider SVG */
function LotusDivider({ className = "" }) {
  return (
    <svg className={`tv-lotus ${className}`} viewBox="0 0 340 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="14" x2="140" y2="14" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="5 4" strokeOpacity="0.4" />
      <path d="M170 3 C157 3 149 10 149 14 C149 18 157 25 170 25 C183 25 191 18 191 14 C191 10 183 3 170 3Z"
        fill="none" stroke="#d4af37" strokeWidth="1.1" strokeOpacity="0.8" />
      <path d="M170 7 C161 7 157 11 157 14 C157 17 161 21 170 21 C179 21 183 17 183 14 C183 11 179 7 170 7Z"
        fill="#d4af37" opacity="0.12" />
      <circle cx="170" cy="14" r="2.5" fill="#d4af37" />
      <line x1="200" y1="14" x2="340" y2="14" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="5 4" strokeOpacity="0.4" />
    </svg>
  );
}

const gallery = [
  { src: "assets/gallery17.png", alt: "Gopuram" },
  { src: "assets/gallery5.jpg",  alt: "Sanctum" },
  { src: "assets/dharashana.jpg", alt: "Pooja" },
  { src: "assets/bamboo.jpg",    alt: "Deepam" },
];

export default function TempleVideo() {
  const { language } = useLanguage();
  const t = translations.templeVideo[language] || translations.templeVideo["EN"];

  const [playing, setPlaying] = useState(false);
  const videoRef   = useRef(null);
  const headerRef  = useRef(null);
  const playerRef  = useRef(null);
  const captionRef = useRef(null);
  const galleryRef = useRef(null);
  const footerRef  = useRef(null);

  useFadeIn(headerRef,  0);
  useFadeIn(playerRef,  80);
  useFadeIn(captionRef, 160);
  useFadeIn(galleryRef, 200);
  useFadeIn(footerRef,  260);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  }

  return (
    <section className="tv-section">
      <div className="tv-grain" aria-hidden="true" />

      {/* Dual radial ambient glows */}
      <div className="tv-glow-top" aria-hidden="true" />
      <div className="tv-glow-bottom" aria-hidden="true" />

      {/* ── HEADER ── */}
      <header className="tv-header tv-fade" ref={headerRef}>
        <p className="tv-label">
          <span className="tv-label-dot" />
          {t.sectionLabel}
          <span className="tv-label-dot" />
        </p>
        <h2 className="tv-title">{t.title}</h2>
        <p className="tv-subtitle">{t.subtitle}</p>
        <LotusDivider />
        <p className="tv-description">{t.description}</p>
      </header>

      {/* ── VIDEO PLAYER ── */}
      <div className="tv-player tv-fade" ref={playerRef}>
        {/* Ornamental border frame */}
        <div className="tv-frame">
          <div className="tv-frame-corner tv-fc--tl" />
          <div className="tv-frame-corner tv-fc--tr" />
          <div className="tv-frame-corner tv-fc--bl" />
          <div className="tv-frame-corner tv-fc--br" />
        </div>

        {/* Halo glow ring behind video */}
        <div className="tv-halo" />

        <div className="tv-video-box">
          <video
            ref={videoRef}
            className="tv-video"
            src="assets/sri.mp4"
            poster="assets/vedifestival.jpeg"
            loop
            playsInline
            controls
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        </div>
      </div>

      {/* ── CAPTION ── */}
      <p className="tv-caption tv-fade" ref={captionRef}>
        <span className="tv-cap-deco">🪔</span>
        {t.videoCaption}
        <span className="tv-cap-deco">🪔</span>
      </p>

      {/* ── GALLERY ── */}
      <div className="tv-gallery tv-fade" ref={galleryRef}>
        <div className="tv-gallery-head">
          <h3 className="tv-gallery-title">{t.galleryTitle}</h3>
          <p className="tv-gallery-sub">{t.gallerySubtitle}</p>
          <LotusDivider />
        </div>

        <div className="tv-gallery-grid">
          {gallery.map((img, i) => (
            <div
              className="tv-gallery-item"
              key={i}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="tv-gallery-overlay" />
              <span className="tv-gallery-label">{img.alt}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── FOOTER BLESSING ── */}
      <div className="tv-footer tv-fade" ref={footerRef}>
        <span className="tv-footer-om">ॐ</span>
        <p className="tv-footer-text">{t.footerNote}</p>
        <span className="tv-footer-om">ॐ</span>
      </div>
    </section>
  );
}