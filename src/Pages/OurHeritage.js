import { useEffect, useRef } from "react";
import HistoryBook from "../Components/HistoryBook";
import TempleHistory from "../Components/TempleHistory";
import "../Stylesheet/OurHeritage.css";
import { useLanguage } from "../Context/Languagecontext";
import translations from "../Json/Ourheritage.json";

export default function OurHeritage() {
    const { language } = useLanguage();
    const t = translations.ourHeritage[language] || translations.ourHeritage["EN"];

    const verseBandRef = useRef(null);
    const templeRef = useRef(null);
    const historyRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("oh-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        [verseBandRef, templeRef, historyRef].forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div>
            {/* ── HERO ── */}
            <div className="ourheritage">
                <img src="/assets/about.jpg" alt="Temple" className="hero-img" />
                <div className="ourheritage-overlay">
                    <div className="oh-mandala-ring oh-ring-1" />
                    <div className="oh-mandala-ring oh-ring-2" />
                    <div className="oh-mandala-ring oh-ring-3" />
                </div>
                <div className="ourheritage-content">
                    <span className="hero-tag oh-anim-tag">{t.heroTag}</span>
                    <h1 className="oh-anim-title">{t.heroTitle}</h1>
                    <p className="hero-sub oh-anim-sub">{t.heroSub}</p>
                    <div className="ourheritage-breadcrumb oh-anim-breadcrumb">
                        <span>{t.breadcrumb.home}</span>
                        <span className="ourheritage-dot">ॐ</span>
                        <span className="ourheritage-active">{t.breadcrumb.active}</span>
                    </div>
                </div>
            </div>

            {/* ── VERSE BAND ── */}
            <div className="gallery-verse-band oh-scroll-reveal" ref={verseBandRef}>
                <div className="verse-inner">
                    <span className="verse-om">ॐ</span>
                    <p>{t.verse}</p>
                </div>
            </div>

            {/* ── SECTIONS ── */}
            <div className="oh-scroll-reveal oh-delay-1" ref={templeRef}>
                <TempleHistory />
            </div>
            <div className="oh-scroll-reveal oh-delay-2" ref={historyRef}>
                <HistoryBook />
            </div>
        </div>
    );
}