import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import poojaData from "../Data/PoojaData";
import { useLanguage } from "../Context/Languagecontext";
import "../Stylesheet/Pooja.css";

function useFadeIn(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("pj-visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

export default function Pooja() {
  const { language } = useLanguage();
  const data = poojaData[language] || poojaData["EN"];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const currentPage = Math.floor(activeIndex / itemsPerPage);

  const sectionRef  = useRef(null);
  const featuredRef = useRef(null);
  const listRef     = useRef(null);
  useFadeIn(sectionRef);
  useFadeIn(featuredRef);
  useFadeIn(listRef);

  const sectionTitle = language === "TA" ? "பூஜை சேவைகள்" : language === "ML" ? "പൂജാ സേവനങ്ങൾ" : "Pooja Services";
  const sectionTag   = language === "TA" ? "புனித காணிக்கைகள்" : language === "ML" ? "പവിത്ര സമർപ്പണങ്ങൾ" : "Sacred Offerings";
  const sectionDesc  = language === "TA" ? "பாரம்பரியத்துடன் நடைபெறும் தெய்வீக பூஜைகளை அனுபவிக்கவும்" : language === "ML" ? "ആചാരപരമായ ഭക്തിയോടെ നടത്തുന്ന പൂജകൾ അനുഭവിക്കുക" : "Experience divine rituals performed with tradition and devotion";

  const navigate = (dir) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + dir + data.length) % data.length);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const goToPage = (page) => setActiveIndex(page * itemsPerPage);

  useEffect(() => {
    const interval = setInterval(() => navigate(1), 5000);
    return () => clearInterval(interval);
  }, [isTransitioning]);

  const activeItem = data[activeIndex];
  const visibleItems = data.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage);

  return (
    <section className="pj-section" ref={sectionRef}>
      <div className="pj-grain" aria-hidden="true" />

      {/* Ambient radial glow */}
      <div className="pj-ambient" aria-hidden="true" />

      <div className="pj-container">

        {/* ── HEADER ── */}
        <div className="pj-header">
          <p className="pj-eyebrow">
            <span className="pj-eyebrow-deco">✦</span>
            {sectionTag}
            <span className="pj-eyebrow-deco">✦</span>
          </p>
          <h2 className="pj-title">{sectionTitle}</h2>
          <p className="pj-desc">{sectionDesc}</p>
          <div className="pj-divider">
            <span /><span className="pj-div-gem" /><span />
          </div>
        </div>

        {/* ── BODY GRID ── */}
        <div className="pj-body">

          {/* ── FEATURED CARD ── */}
          <div className="pj-featured-col" ref={featuredRef}>
            <div
              className={`pj-featured ${isTransitioning ? "pj-fade-out" : "pj-fade-in"}`}
              style={{ backgroundImage: `url(${activeItem.image})` }}
            >
              {/* Corner ornaments */}
              <div className="pj-corner pj-corner--tl" /><div className="pj-corner pj-corner--tr" />
              <div className="pj-corner pj-corner--bl" /><div className="pj-corner pj-corner--br" />

              <div className="pj-featured-overlay" />

              <div className="pj-featured-content">
                <div className="pj-featured-index">
                  <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                  <span className="pj-featured-total">/{String(data.length).padStart(2, "0")}</span>
                </div>

                <h3 className="pj-featured-name">{activeItem.name}</h3>

                <div className="pj-featured-rule" />

                <p className="pj-featured-desc">{activeItem.desc}</p>

                <div className="pj-featured-price">
                  <span className="pj-price-label">From</span>
                  <span className="pj-price-val">{activeItem.price}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="pj-nav">
              <button className="pj-nav-btn" onClick={() => navigate(-1)} aria-label="Previous">
                <ChevronLeft size={18} />
              </button>

              <div className="pj-progress-dots">
                {data.map((_, i) => (
                  <button
                    key={i}
                    className={`pj-prog-dot ${i === activeIndex ? "active" : ""}`}
                    onClick={() => setActiveIndex(i)}
                    aria-label={`Go to item ${i + 1}`}
                  />
                ))}
              </div>

              <button className="pj-nav-btn" onClick={() => navigate(1)} aria-label="Next">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* ── LIST COLUMN ── */}
          <div className="pj-list-col" ref={listRef}>
            <div className="pj-list">
              {visibleItems.map((pooja) => {
                const isActive = pooja.id === activeItem.id;
                return (
                  <button
                    key={pooja.id}
                    onClick={() => setActiveIndex(data.findIndex((d) => d.id === pooja.id))}
                    className={`pj-list-item ${isActive ? "pj-list-item--active" : ""}`}
                  >
                    {isActive && <div className="pj-list-glow" />}

                    <div className={`pj-list-icon ${isActive ? "active" : ""}`}>
                      {pooja.icon}
                    </div>

                    <div className="pj-list-body">
                      <h4 className="pj-list-name">{pooja.name}</h4>
                      <p className="pj-list-desc">{pooja.desc}</p>
                    </div>

                    <span className={`pj-list-price ${isActive ? "active" : ""}`}>
                      {pooja.price}
                    </span>

                    {isActive && <div className="pj-list-bar" />}
                  </button>
                );
              })}
            </div>

            {/* Page dots */}
            {totalPages > 1 && (
              <div className="pj-page-dots">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`pj-page-dot ${currentPage === i ? "active" : ""}`}
                    aria-label={`Page ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}