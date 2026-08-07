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
  { src: "assets/gallery5.jpg", alt: "Sanctum" },
  { src: "assets/dharashana.jpg", alt: "Pooja" },
  { src: "assets/bamboo.jpg", alt: "Deepam" },
];

/* Annual festival list, per language.
   Adjust the "ML" / "EN" / "TA" keys if your language
   context uses different codes. */
const festivalData = {
  ML: {
    title: "ആനുകാലിക ഉത്സവം / വിശേഷങ്ങൾ",
    items: [
      "ചിങ്ങമാസത്തിലെ ഉത്രാടം ദിവസം തൃപ്പുത്തരി",
      "കന്നി മാസത്തിൽ നവരാത്രി വിശേഷാൽ പൂജകൾ, വിദ്യാരംഭം",
      "തുലാമാസം രോഹിണി നക്ഷത്രം – പ്രതിഷ്ഠാ ദിനം",
      "വൃശ്ചിക മാസത്തിലെമൂന്നാമത്തെ തിങ്കളാഴ്ച്ച കതിർ ഉത്സവം",
      "മേടമാസത്തിൽ വിഷു ഉത്സവത്തോടനുബന്ധിച്ച് എല്ലാ ദിവസവും എഴുന്നള്ളത്ത്, വിഷുദിവസം കണ്യാർകളി",
      "കർക്കിടകം 12-ന് മഹാഗണപതി ഹോമം, മഹാഭഗവതി സേവ, കർക്കിടക ഊട്ട്",
      "കർക്കിടക വാവ് കഴിഞ്ഞ വരുന്ന ഞായറാഴ്ച ഇല്ലം നിറ",
    ],
  },
  EN: {
    title: "Annual Festivals / Special Occasions",
    items: [
      "Thripputhari is observed on the Uthradam day of the Malayalam month of Chingam.",
      "During the Malayalam month of Kanni, special Navaratri poojas and Vidyarambham (initiation into learning) are conducted.",
      "The deity's consecration day (Prathishta Dinam) is observed during the Malayalam month of Thulam.",
      "Kathir Festival on the third Monday of the Vrischikam month (or Kathir Utsavam on the third Monday of the Malayalam month of Vrischikam)",
      "During the Malayalam month of Medam, in connection with the Vishu festival, daily processions (Ezhunnallathu) are conducted, and Vishu Kani is observed on Vishu day.",
      "On the 12th day of Karkidakam, Maha Ganapathi Homam, Maha Bhagavathi Seva, and Karkidaka Oottu are conducted.",
      "After Karkidaka Vavu, Illam Nira is held on the following Sunday.",
    ],
  },
  TA: {
    title: "ஆண்டு விழாக்கள் / சிறப்பு நிகழ்வுகள்",
    items: [
      "சிங்கம் மாதத்தின் உத்திராடம் நாளில் திரிப்புத்தரி நடைபெறும்.",
      "கன்னி மாதத்தில் நவராத்திரி சிறப்பு பூஜைகள் மற்றும் வித்யாரம்பம் (கல்வி தொடக்க விழா) நடைபெறும்.",
      "துலாம் மாதத்தில், தேவியின் பிரதிஷ்டை தினம் கொண்டாடப்படுகிறது.",
      "விருச்சிக மாதத்தின் மூன்றாவது திங்கட்கிழமை கதிர் உற்சவம்.",
      "மேடம் மாதத்தில், விஷு திருவிழாவை முன்னிட்டு தினமும் எழுந்தருளல் நடைபெறும்; விஷு நாளில் விஷுக்கனி தரிசனம் நடைபெறும்.",
      "கற்கிடகம் மாதம் 12-ஆம் தேதி, மகா கணபதி ஹோமம், மகா பகவதி சேவை, மற்றும் கற்கிடக ஊட்டு நடைபெறும்.",
      "கற்கிடக வாவு முடிந்த அடுத்த ஞாயிற்றுக்கிழமை இல்லம் நிறை நடைபெறும்.",
    ],
  },
};



export default function TempleVideo() {
  const { language } = useLanguage();
  const t = translations.templeVideo[language] || translations.templeVideo["EN"];
  const festival = festivalData[language] || festivalData["EN"];

  const [playing, setPlaying] = useState(false);

  const videoRef = useRef(null);
  const headerRef = useRef(null);
  const playerRef = useRef(null);
  const captionRef = useRef(null);
  const galleryRef = useRef(null);
  const festivalRef = useRef(null);
  const footerRef = useRef(null);

  useFadeIn(headerRef, 0);
  useFadeIn(playerRef, 80);
  useFadeIn(captionRef, 160);
  useFadeIn(galleryRef, 200);
  useFadeIn(festivalRef, 240);
  useFadeIn(footerRef, 280);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  }

  console.log("language:", language, "festival:", festival);

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
        <LotusDivider />
        {/* <p className="tv-description">{t.description}</p> */}
      </header>

      {/* ── VIDEO PLAYER ── */}
      <div className="tv-player tv-fade" ref={playerRef}>
        <div className="tv-frame">
          <div className="tv-frame-corner tv-fc--tl" />
          <div className="tv-frame-corner tv-fc--tr" />
          <div className="tv-frame-corner tv-fc--bl" />
          <div className="tv-frame-corner tv-fc--br" />
        </div>

        <div className="tv-halo" />

        <div className="tv-video-box">
          <video
            ref={videoRef}
            className="tv-video"
            src="/ass1/home1.mp4"
            poster="/assets/vedifestival.jpeg"
            controls
            loop
            playsInline
            preload="metadata"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        </div>
      </div>

      {/* ── CAPTION ── */}
      <p className="tv-caption tv-fade" ref={captionRef}></p>

      {/* ── GALLERY ── */}
      {/* <div className="tv-gallery tv-fade" ref={galleryRef}>
        <div className="tv-gallery-head">
          <h3 className="tv-gallery-title">{t.galleryTitle}</h3>
          <p className="tv-gallery-sub">{t.gallerySubtitle}</p>
          <LotusDivider />
        </div>

        <div className="tv-gallery-grid">
          {gallery.map((item, i) => (
            <div className="tv-gallery-item" key={i}>
              <img src={item.src} alt={item.alt} loading="lazy" />
              <div className="tv-gallery-overlay" />
              <span className="tv-gallery-label">{item.alt}</span>
            </div>
          ))}
        </div>
      </div> */}

      {/* ── ANNUAL FESTIVALS ── */}
      <div className="tv-festivals tv-fade" ref={festivalRef}>
        <div className="tv-festivals-head">
          <h3 className="tv-festivals-title">{festival.title}</h3>
          <LotusDivider />
        </div>
        <ul className="tv-festivals-list">
          {festival.items.map((line, i) => (
            <li className="tv-festivals-item" key={i}>{line}</li>
          ))}
        </ul>
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