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

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  useFadeIn(sectionRef);
  useFadeIn(gridRef);

  const sectionTitle =
    language === "TA" ? "பூஜை சேவைகள்" :
    language === "ML" ? "പൂജാ സേവനങ്ങൾ" :
    "Pooja Services";

  const goToPage = (page) => setCurrentPage(page);

  const goPrev = () => setCurrentPage((p) => (p - 1 + totalPages) % totalPages);
  const goNext = () => setCurrentPage((p) => (p + 1) % totalPages);

  const visibleItems = data.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  return (
    <section className="pj-section" ref={sectionRef}>
      <div className="pj-grain" aria-hidden="true" />
      <div className="pj-ambient" aria-hidden="true" />

      <div className="pj-container">

        {/* ── HEADER ── */}
        <div className="pj-header">
          <h2 className="pj-title">{sectionTitle}</h2>
          <div className="pj-divider">
            <span /><span className="pj-div-gem" /><span />
          </div>
        </div>

        {/* ── GRID ── */}
        <div className="pj-grid-col" ref={gridRef}>
          <div className="pj-grid-row">
            {totalPages > 1 && (
              <button className="pj-nav-btn" onClick={goPrev} aria-label="Previous page">
                <ChevronLeft size={18} />
              </button>
            )}

            <div className="pj-grid">
              {visibleItems.map((pooja) => (
                <div key={pooja.id} className="pj-grid-item">
                  <div className="pj-grid-icon">{pooja.icon}</div>
                  <h4 className="pj-grid-name">{pooja.name}</h4>
                  <span className="pj-grid-price">{pooja.price}</span>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <button className="pj-nav-btn" onClick={goNext} aria-label="Next page">
                <ChevronRight size={18} />
              </button>
            )}
          </div>

          {/* Pagination dots */}
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
    </section>
  );
}