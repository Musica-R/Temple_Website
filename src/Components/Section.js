import "../Stylesheet/Section.css";
import { useEffect, useRef } from "react";
import { useLanguage } from "../Context/Languagecontext";
import translations from "../Json/datatranslation.json";
import { useNavigate } from "react-router-dom";

/* Decorative SVG ornament between sections */
function GoldOrnament() {
  return (
    <svg className="section-ornament" viewBox="0 0 400 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="0" y1="12" x2="155" y2="12" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="5 4" strokeOpacity="0.5" />
      <path d="M168 12 L178 5 L188 12 L178 19Z" fill="none" stroke="#d4af37" strokeWidth="1" strokeOpacity="0.8" />
      <circle cx="200" cy="12" r="4" fill="#d4af37" />
      <circle cx="200" cy="12" r="7" fill="none" stroke="#d4af37" strokeWidth="0.6" strokeOpacity="0.5" />
      <path d="M212 12 L222 5 L232 12 L222 19Z" fill="none" stroke="#d4af37" strokeWidth="1" strokeOpacity="0.8" />
      <line x1="245" y1="12" x2="400" y2="12" stroke="#d4af37" strokeWidth="0.8" strokeDasharray="5 4" strokeOpacity="0.5" />
    </svg>
  );
}

export default function Section() {
  const sectionRef = useRef(null);
  const { language } = useLanguage();
  const t = translations.section[language] || translations.section["EN"];
  const navigate = useNavigate();

  useEffect(() => {
    const el = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const items = el.querySelectorAll(".abt-animate");
            items.forEach((item, i) => {
              setTimeout(() => item.classList.add("abt-in"), i * 160);
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
  }, []);

  const facts = [
    { label: t.facts.location.label, value: t.facts.location.value, glyph: "📍" },
    { label: t.facts.deity.label, value: t.facts.deity.value, glyph: "🪷" },
    { label: t.facts.phone.label, value: t.facts.phone.value, glyph: "📞" },
    { label: t.facts.mobile.label, value: t.facts.mobile.value, glyph: "📱" },
  ];

  return (
    <section id="about" className="abt-section" ref={sectionRef}>

      {/* top grain overlay */}
      <div className="abt-grain" aria-hidden="true" />

      {/* ornamental top border */}
      <div className="abt-top-rule">
        <GoldOrnament />
      </div>

      <div className="abt-container">
        <div className="abt-grid">

          {/* ── IMAGE COLUMN ── */}
          <div className="abt-images abt-animate">
            {/* Large portrait */}
            <div className="abt-img-main">
              <div className="abt-img-frame">
                <img src="/assets/maingod.jpeg" alt="Temple main view" />
                <div className="abt-img-shimmer" />
              </div>
              {/* floating badge */}
              <div className="abt-img-badge">
                <span className="abt-badge-om">ॐ</span>
                <span className="abt-badge-text">Est. 108 CE</span>
              </div>
            </div>

            {/* Two smaller images stacked */}
            <div className="abt-img-stack">
              <div className="abt-img-sm abt-animate" style={{ animationDelay: ".1s" }}>
                <img src="/assets/vin.jpg" alt="Temple side" />
                <div className="abt-img-shimmer" />
              </div>
              <div className="abt-img-sm abt-animate" style={{ animationDelay: ".2s" }}>
                <img src="/assets/siva4.jpg" alt="Temple tower" />
                <div className="abt-img-shimmer" />
              </div>
            </div>

            {/* corner ornaments */}
            <div className="abt-corner abt-corner--tl" />
            <div className="abt-corner abt-corner--br" />
          </div>

          {/* ── TEXT COLUMN ── */}
          <div className="abt-content abt-animate" style={{ animationDelay: ".15s" }}>

            <p className="abt-eyebrow">
              <span className="abt-eyebrow-line" />
              {t.tag}
              <span className="abt-eyebrow-line" />
            </p>

            <h2 className="abt-heading">
              {t.titlePre}{" "}
              <em>{t.titleHighlight}</em>
            </h2>

            <div className="abt-rule">
              <span /><span className="abt-rule-diamond" /><span />
            </div>

            <p className="abt-para">{t.p1}</p>
            <p className="abt-para abt-para--dim">{t.p2}</p>

            {/* fact grid */}
            <div className="abt-facts abt-animate" style={{ animationDelay: ".3s" }}>
              {facts.map((f, i) => (
                <div className="abt-fact" key={i}>
                  <span className="abt-fact-glyph">{f.glyph}</span>
                  <div className="abt-fact-body">
                    <strong className="abt-fact-label">{f.label}</strong>
                    <span className="abt-fact-value">{f.value}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            {/* <a href="/gallery" className="abt-cta abt-animate" style={{ animationDelay: ".4s" }}>
              <span onClick={() => navigate("/gallery")}>Explore the Temple</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a> */}
          </div>

        </div>
      </div>

      {/* ornamental bottom border */}
      <div className="abt-bottom-rule">
        <GoldOrnament />
      </div>
    </section>
  );
}