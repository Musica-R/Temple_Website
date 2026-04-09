import { useLanguage } from "../Context/Languagecontext";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import translations from "../Json/Ourheritage.json";
import Renovation from "../Components/Renovation";

export default function RenovationPage() {

    const { language } = useLanguage();
    const t = translations.ourHeritage[language] || translations.ourHeritage["EN"];

    const verseBandRef = useRef(null);
    const templeRef = useRef(null);
    const historyRef = useRef(null);

    const navigate = useNavigate();

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
            <div className="ourheritage">
                <img src="/assets/about.jpg" alt="Temple" className="hero-img" />
                <div className="ourheritage-overlay">
                    <div className="oh-mandala-ring oh-ring-1" />
                    <div className="oh-mandala-ring oh-ring-2" />
                    <div className="oh-mandala-ring oh-ring-3" />
                </div>
                <div className="ourheritage-content">
                    <span className="hero-tag oh-anim-tag">{t.heroTag}</span>
                    <h1 className="oh-anim-title">{t.renovationTitle}</h1>
                    {/* <p className="hero-sub oh-anim-sub">{t.heroSub}</p> */}
                    <div className="ourheritage-breadcrumb oh-anim-breadcrumb">
                        <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>{t.breadcrumb.home}</span>
                        <span className="ourheritage-dot">ॐ</span>
                        <span className="ourheritage-active">{t.renovationTitle}</span>
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
            
            <Renovation />
           
        </div>
    )
}
