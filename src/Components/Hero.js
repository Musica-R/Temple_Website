import { useState, useEffect, useRef } from "react";
import "../Stylesheet/Hero.css";
import { useLanguage } from "../Context/Languagecontext";
import heroTranslations from "../Data/HeroTranslations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lottie from 'react-lottie';
import animationData from '../Json/Lightening Diya (Oil Lamp).json';

gsap.registerPlugin(ScrollTrigger);

const temple1 = "/assets/background1.png";
const temple2 = "/assets/download1.jpg";
const temple3 = "/assets/download2.jpg";

const images = [temple1, temple2, temple3];
const SLIDE_DURATION = 4000;

const AARTI_TIMES = [
  { label: "Morning Aarti", time: "05:30 AM" },
  { label: "Madhyan Aarti", time: "12:00 PM" },
  { label: "Evening Aarti", time: "07:00 PM" },
  { label: "Shayan Aarti", time: "09:00 PM" },
];

function getNextAarti() {
  const now = new Date();
  const mins = now.getHours() * 60 + now.getMinutes();
  for (const a of AARTI_TIMES) {
    const [h, m] = a.time.replace(" AM", "").replace(" PM", "").split(":").map(Number);
    const isPM = a.time.includes("PM") && h !== 12;
    const total = (isPM ? h + 12 : h) * 60 + m;
    if (total > mins) return a;
  }
  return AARTI_TIMES[0];
}

/* ── Canvas petal painter ── */
function usePetalCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = [
      "rgba(255,120,120,0.75)",
      "rgba(255,180,100,0.7)",
      "rgba(255,210,160,0.65)",
      "rgba(255,150,200,0.6)",
      "rgba(240,100,120,0.65)",
    ];

    class Petal {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : -20;
        this.size = Math.random() * 7 + 5;
        this.vy = Math.random() * 1.2 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.angle = Math.random() * Math.PI * 2;
        this.spin = (Math.random() - 0.5) * 0.04;
        this.sway = Math.random() * 0.015 + 0.005;
        this.swayT = Math.random() * Math.PI * 2;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
      update() {
        this.swayT += this.sway;
        this.x += this.vx + Math.sin(this.swayT) * 0.5;
        this.y += this.vy;
        this.angle += this.spin;
        if (this.y > canvas.height + 20) this.reset();
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const petals = Array.from({ length: 28 }, () => new Petal());
    let raf;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach(p => { p.update(); p.draw(); });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

/* ════════════════════════════════════════════
   HERO COMPONENT
════════════════════════════════════════════ */
export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useLanguage();
  const t = heroTranslations[language] || heroTranslations["EN"];

  /* ── Refs for GSAP parallax targets ── */
  const sectionRef = useRef(null);
  const bgLayerRef = useRef(null);      // slides — moves slowest (background)
  const smokeRef = useRef(null);      // smoke — mid layer
  const hazeRef = useRef(null);      // haze
  const mandalaRef = useRef(null);      // mandala — counter-scroll for depth
  const ripplesRef = useRef(null);      // ripples
  const contentRef = useRef(null);      // hero text — moves fastest (foreground)
  const omRef = useRef(null);
  const dividerRef = useRef(null);
  const h1Ref = useRef(null);
  const subtitleRef = useRef(null);
  const diyasRef = useRef(null);
  const ctasRef = useRef(null);
  const scrollInvRef = useRef(null);
  const petalCanvasRef = useRef(null);

  usePetalCanvas(petalCanvasRef);

  /* ── Slide interval ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  /* ════════════════════════════════════
     GSAP PARALLAX SETUP
     Uses ScrollTrigger scrub so every
     element drifts at its own depth.
  ════════════════════════════════════ */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const defaults = {
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      };

      /* ── Layer 1: BG images — slowest, drifts up 20% ── */
      gsap.to(bgLayerRef.current, {
        yPercent: -20,
        scale: 1.12,
        ...defaults,
      });

      /* ── Layer 2: Smoke — slightly faster than BG ── */
      gsap.to(smokeRef.current, {
        yPercent: -35,
        opacity: 0,
        ...defaults,
      });

      /* ── Layer 3: Haze ── */
      gsap.to(hazeRef.current, {
        yPercent: -30,
        opacity: 0,
        ...defaults,
      });

      /* ── Layer 4: Mandala — counter-scroll creates depth illusion ── */
      gsap.to(mandalaRef.current, {
        yPercent: 15,          // rises as you scroll DOWN (reverse parallax)
        rotation: 25,          // slow tilt amplifies spin
        opacity: 0,
        ...defaults,
      });

      /* ── Layer 5: Ripples — mid ── */
      gsap.to(ripplesRef.current, {
        yPercent: -45,
        opacity: 0,
        ...defaults,
      });

      /* ── Layer 6: Content — fastest (close to viewer) ── */
      gsap.to(contentRef.current, {
        yPercent: -55,
        opacity: 0,
        ...defaults,
      });

      /* ── Petal canvas ── */
      gsap.to(petalCanvasRef.current, {
        yPercent: -40,
        opacity: 0,
        ...defaults,
      });

      /* ── ENTRANCE animations (timeline, plays once on load) ── */
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(omRef.current,
        { autoAlpha: 0, y: -40 },
        { autoAlpha: 1, y: 0, duration: 1 }
      )
        .fromTo(dividerRef.current,
          { autoAlpha: 0, scaleX: 0 },
          { autoAlpha: 1, scaleX: 1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(h1Ref.current,
          { autoAlpha: 0, y: 40 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          "-=0.3"
        )
        .fromTo(subtitleRef.current,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(diyasRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(ctasRef.current,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(scrollInvRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 1 },
          "-=0.2"
        );

    }, sectionRef); // scoped context — auto-cleaned

    return () => ctx.revert();
  }, []);

  const nextAarti = getNextAarti();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <section className="hero" ref={sectionRef}>

      {/* ── BACKGROUND SLIDES (Layer 1 — slowest) ── */}
      <div className="hero-bg-layer" ref={bgLayerRef}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Temple ${i + 1}`}
            className={`hero-bg-img${currentSlide === i ? " active" : ""}`}
          />
        ))}
      </div>

      {/* ── DARK OVERLAY (static, not parallaxed) ── */}
      <div className="hero-overlay" />

      {/* ── SMOKE (Layer 2) ── */}
      <div className="hero-smoke" ref={smokeRef}>
        <div className="smoke-puff smoke-puff-1" />
        <div className="smoke-puff smoke-puff-2" />
        <div className="smoke-puff smoke-puff-3" />
        <div className="smoke-puff smoke-puff-4" />
        <div className="smoke-puff smoke-puff-5" />
      </div>

      {/* ── HAZE (Layer 2b) ── */}
      <div className="hero-haze" ref={hazeRef} />

      {/* ── MANDALA (Layer 3 — counter-scroll) ── */}
      <div className="hero-mandala" ref={mandalaRef}>
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <g className="mandala-ring-1">
            <circle cx="200" cy="200" r="185" fill="none" stroke="#d4af37" strokeWidth="0.6" strokeDasharray="4 6" />
            <circle cx="200" cy="200" r="175" fill="none" stroke="#d4af37" strokeWidth="0.3" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => {
              const rad = (a * Math.PI) / 180;
              const x = 200 + 185 * Math.cos(rad);
              const y = 200 + 185 * Math.sin(rad);
              return <circle key={a} cx={x} cy={y} r="3" fill="#d4af37" opacity="0.6" />;
            })}
          </g>
          <g className="mandala-ring-2">
            <circle cx="200" cy="200" r="140" fill="none" stroke="#d4af37" strokeWidth="0.5" strokeDasharray="2 8" />
            <polygon
              points="200,60 237,125 313,125 276,190 313,255 237,255 200,320 163,255 87,255 124,190 87,125 163,125"
              fill="none" stroke="#d4af37" strokeWidth="0.5" opacity="0.7"
            />
          </g>
          <g className="mandala-ring-3">
            <circle cx="200" cy="200" r="90" fill="none" stroke="#d4af37" strokeWidth="0.6" />
            {[0, 45, 90, 135].map(a => {
              const rad = (a * Math.PI) / 180;
              const x1 = 200 + 90 * Math.cos(rad);
              const y1 = 200 + 90 * Math.sin(rad);
              const x2 = 200 - 90 * Math.cos(rad);
              const y2 = 200 - 90 * Math.sin(rad);
              return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#d4af37" strokeWidth="0.4" opacity="0.6" />;
            })}
          </g>
          <g className="mandala-ring-4">
            <circle cx="200" cy="200" r="44" fill="none" stroke="#d4af37" strokeWidth="0.8" />
            <circle cx="200" cy="200" r="28" fill="none" stroke="#d4af37" strokeWidth="0.4" strokeDasharray="3 3" />
            {[0, 60, 120, 180, 240, 300].map(a => {
              const rad = (a * Math.PI) / 180;
              const x = 200 + 44 * Math.cos(rad);
              const y = 200 + 44 * Math.sin(rad);
              return <circle key={a} cx={x} cy={y} r="2.5" fill="#d4af37" />;
            })}
          </g>
        </svg>
      </div>

      {/* ── RIPPLES (Layer 3b) ── */}
      <div className="hero-ripples" ref={ripplesRef}>
        <div className="ripple-ring" />
        <div className="ripple-ring" />
        <div className="ripple-ring" />
      </div>

      {/* ── FLOATING PETALS (Layer 4) ── */}

      {/* <canvas ref={petalCanvasRef} className="hero-petals-canvas"/> */}

      {/* ── SCROLL INVITE (static position, fades with content) ── */}
      <a href="#ticker" className="hero-scroll-invite" ref={scrollInvRef} aria-label="Scroll down">
        <span>Scroll</span>
        <div className="hero-scroll-arrow" />
      </a>

      {/* ── MAIN CONTENT (Layer 5 — fastest / foreground) ── */}
      <div className="hero-content" ref={contentRef}>
        <div className="hero-om" ref={omRef}>ॐ</div>
        <div className="hero-divider" ref={dividerRef} />

        <h1 ref={h1Ref}>
          {t.title}
          <span>{t.subtitle}</span>
        </h1>

        {/* <p className="hero-subtitle" ref={subtitleRef}>{t.description}</p> */}

        {/* Diya lamps */}
        <div className="hero-diyas" ref={diyasRef} aria-hidden="true">
          {/* {[0, 0.12, 0.24].map((delay, i) => (
            <div className="diya-unit" key={i}>
              <div className="diya-flame" style={{ animationDelay: `${delay}s` }} />
              <div className="diya-bowl" />
            </div>
          ))} */}
          <Lottie options={defaultOptions} height={50} width={50} />
          <Lottie options={defaultOptions} height={50} width={50} />
          <Lottie options={defaultOptions} height={50} width={50} />
        </div>
        {/* <Lottie options={defaultOptions} height={70} width={70} /> */}

        {/* CTA buttons */}
        <div className="hero-ctas" ref={ctasRef}>
          <a href="/contact" className="btn-gold">    {t.contact}  </a>
          <a href="/donation" className="btn-outline">  {t.donation} </a>
        </div>

        {/* Slide indicators */}
        <div className="hero-indicators">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`hero-indicator${currentSlide === i ? " active" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 