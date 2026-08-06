import "../Stylesheet/DivineGallery.css";
import { useEffect } from "react";
import { useLanguage } from "../Context/Languagecontext";
import translations from "../Json/datatranslation.json";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import galleryImages, { gallery } from "../Data/Gallery";
import GallerySection from "./GallerySection";

const kalamezhuthuImages = [
    { img: "/ass1/v1.jpeg", title: "Kalamezhuthu 1" },
    { img: "/ass1/h1.jpeg", title: "Kalamezhuthu 2" },
    { img: "/ass1/h2.jpeg", title: "Kalamezhuthu 3" },
    { img: "/ass1/h3.jpeg", title: "Kalamezhuthu 4" },
    { img: "/ass1/h4.jpeg", title: "Kalamezhuthu 5" },
    { img: "/ass1/h5.jpeg", title: "Kalamezhuthu 6" },
];

const kalamezhuthuVideos = [
    { src: "/ass1/1.mp4", poster: "/assets/v1.jpg" },
    { src: "/ass1/2.mp4", poster: "/assets/v1.jpg" },
];


const niraImage = { img: "/ass1/n1.jpeg", title: "Nira" };
const niraVideo = { src: "/ass1/new2.mp4", poster: "/ass1/t1.jpeg" };


export default function DivineGallery() {

    const navigate = useNavigate();

    const { language } = useLanguage();
    const t = translations.divineGallery[language] || translations.divineGallery["EN"];

    useEffect(() => {
        const items = document.querySelectorAll(".gallery-item");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            { threshold: 0.15 }
        );
        items.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
    const verseBandRef = useRef(null);
    const upadevathaRef = useRef(null);
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

        [verseBandRef, templeRef, historyRef, upadevathaRef].forEach((ref) => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, []);

    // Add this near your other refs at the top of the component
    const ch2GridRef = useRef(null);

    // Add this near your other useEffects
    useEffect(() => {
        const resizeGridItems = () => {
            const grid = ch2GridRef.current;
            if (!grid) return;
            const rowHeight = 10;
            const rowGap = 18;
            const items = grid.querySelectorAll(".gallery-item-ch2");
            items.forEach((item) => {
                const rowSpan = Math.ceil(
                    (item.getBoundingClientRect().height + rowGap) / (rowHeight + rowGap)
                );
                item.style.gridRowEnd = `span ${rowSpan}`;
            });
        };

        const grid = ch2GridRef.current;
        const images = grid ? grid.querySelectorAll("img") : [];
        let loadedCount = 0;

        if (images.length === 0) return;

        images.forEach((img) => {
            if (img.complete) {
                loadedCount++;
            } else {
                img.addEventListener("load", () => {
                    loadedCount++;
                    if (loadedCount === images.length) resizeGridItems();
                });
            }
        });

        if (loadedCount === images.length) resizeGridItems();

        window.addEventListener("resize", resizeGridItems);
        return () => window.removeEventListener("resize", resizeGridItems);
    }, []);

    return (
        <div>

            {/* ── HERO BANNER ── */}
            <div className="ourheritage">
                <img src="/assets/about.jpg" alt="Temple" className="hero-img" />
                <div className="ourheritage-overlay">
                    <div className="oh-mandala-ring oh-ring-1" />
                    <div className="oh-mandala-ring oh-ring-2" />
                    <div className="oh-mandala-ring oh-ring-3" />
                </div>
                <div className="ourheritage-content">
                    {/* <span className="hero-tag oh-anim-tag">{t.heroTag}</span> */}
                    <h1 className="oh-anim-title">{t.heroTitle}</h1>
                    {/* <p className="hero-sub oh-anim-sub">{t.heroSub}</p> */}
                    <div className="ourheritage-breadcrumb oh-anim-breadcrumb">
                        <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>{t.breadcrumb.home}</span>
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

            <section className="divine-gallerys">

                {/* ══ CHAPTER ONE ══ (unchanged) */}
                <div className="chapter-header">
                    <div className="chapter-lines">
                        <span></span><i>🪔</i><span></span>
                    </div>
                    {/* <h2 className="chapter-title">{t.chapter1.title}</h2> */}
                </div>

                <div className="gallery-layout">
                    <div className="gallery-grid-new">
                        {t.galleryData.slice(7, 13).map((item) => (
                            <div className="gallery-item" key={item.id} data-title={item.title} data-desc={item.desc}>
                                <img src={item.img} alt={item.title} />
                            </div>
                        ))}
                    </div>

                    <div className="gallery-grid-new">
                        {t.galleryData.slice(0, 6).map((item) => (
                            <div className="gallery-item" key={item.id} data-title={item.title} data-desc={item.desc}>
                                <img src={item.img} alt={item.title} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── STATS BAND ── */}
                {/* <div className="gallery-stats-band">
                    {t.stats.map((s, i) => (
                        <div className="gstat" key={i}>
                            <span className="gstat-num">{s.num}</span>
                            <span className="gstat-label">{s.label}</span>
                        </div>
                    ))}
                </div> */}

                {/* ══ CHAPTER TWO ══ (updated gallery layout only) */}
                {/* ══ CHAPTER TWO ══ */}
                <div className="chapter-header">
                    <div className="chapter-lines">
                        <span></span><i>🌸</i><span></span>
                    </div>
                    <h2 className="chapter-title">{t.chapter2.title}</h2>
                </div>

                <GallerySection />

                {/* ══ KALAMEZHUTHU PATTU / NIRA ══ */}
                <div className="kalamezhuthu-section">
                    <div className="chapter-header">
                        <div className="chapter-lines">
                            <span></span><i>🎨</i><span></span>
                        </div>
                        <h2 className="chapter-title">
                            {language === "TA"
                                ? "களமெழுத்துப் பாட்டு"
                                : language === "ML"
                                    ? "കളമെഴുത്തു പാട്ട്"
                                    : "Kalamezhuthu Pattu"}
                        </h2>
                    </div>

                    <div className="kalamezhuthu-grid">
                        {kalamezhuthuImages.map((item, i) => (
                            <div className="kalamezhuthu-item" key={i}>
                                <img src={item.img} alt={item.title} />
                            </div>
                        ))}
                    </div>

                    <div className="kalamezhuthu-videos">
                        {kalamezhuthuVideos.map((vid, i) => (
                            <div className="kalamezhuthu-video-card" key={i}>
                                <video src={vid.src} controls poster={vid.poster} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ══ NIRA ══ */}
                <div className="nira-section">
                    <div className="chapter-header">
                        <div className="chapter-lines">
                            <span></span><i>🌾</i><span></span>
                        </div>
                        <h2 className="chapter-title">
                            {language === "TA"
                                ? "நிறை"
                                : language === "ML"
                                    ? "നിറ"
                                    : "Nira"}
                        </h2>
                    </div>

                    <div className="nira-grid">
                        <div className="nira-item">
                            <img src={niraImage.img} alt={niraImage.title} />
                        </div>
                        <div className="nira-item nira-video-item">
                            <video src={niraVideo.src} controls poster={niraVideo.poster} />
                        </div>
                    </div>
                </div>

                {/* ══ CHAPTER THREE — UPADEVATAS ══ */}

                <div className="shrine-root">

                    <div className="chapter-header">
                        <div className="chapter-lines">
                            <span></span><i>🔱</i><span></span>
                        </div>
                        <h2 className="chapter-title">{t.chapter3.title}</h2>
                        <p className="chapter-sub">{t.chapter3.sub}</p>
                    </div>

                    <div className="shrine-header"></div>

                    <div className="main-deity-hero">
                        <div>
                            <div className="main-deity-overlay">
                                <span className="main-deity-tag">{t.upadevathas[0].tag}</span>
                                <h3 className="main-deity-name">{t.upadevathas[0].name}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="sub-deities-label">
                        <span>
                            &#9670;{" "}
                            {language === "TA"
                                ? "பரிவார தெய்வங்கள்"
                                : language === "ML"
                                    ? "ഉപദേവതകൾ"
                                    : "Sub Deities"}
                            {" "}&#9670;
                        </span>
                    </div>

                    <div className="sub-deities-strip">
                        {t.upadevathas.slice(1, 6).map((deity, i) => (
                            <div key={i} className="sub-shrine">
                                <div className="sub-shrine-inner">
                                    <div className="sub-shrine-img-wrap">
                                        <img
                                            className="sub-shrine-img"
                                            src={deity.img}
                                            alt={deity.name}
                                        />
                                        <div className="sub-shrine-num-badge">0{i + 1}</div>
                                    </div>
                                    <div className="sub-shrine-footer">
                                        <span className="sub-shrine-name">{deity.name}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* ══ CHAPTER FOUR — LAKSHADEEPAM ══ */}
                <div className="chapter-header" style={{ marginTop: "90px" }}>
                    <div className="chapter-lines">
                        <span></span><i>🪔</i><span></span>
                    </div>
                    <h2 className="chapter-title">{t.chapter4.title}</h2>
                    <p className="chapter-sub">{t.chapter4.sub}</p>
                </div>

                <div className="laksha-section">
                    <div className="laksha-intro">
                        <p>{t.chapter4.intro}</p>
                    </div>
                    <div className="laksha-grid">
                        {t.lakshadeepam.map((item, i) => (
                            <div className="laksha-card" key={i}>
                                <div className="laksha-img-wrap">
                                    <img src={item.img} alt={item.title} />
                                    <div className="laksha-flame">🪔</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mid-gallery-section">

                    <div className="chapter-header">
                        <div className="chapter-lines">
                            <span></span><i>📸</i><span></span>
                        </div>
                        <h2 className="chapter-title">
                            {language === "TA"
                                ? "தெய்வீக தருணங்கள்"
                                : language === "ML"
                                    ? "ദിവ്യ നിമിഷങ്ങൾ"
                                    : "Divine Moments"}
                        </h2>
                    </div>

                    <div className="mid-gallery-grid">
                        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                            <div className="mid-gallery-item" key={i}>
                                <img src={galleryImages[i].img} alt={galleryImages[i].title} />
                            </div>
                        ))}
                    </div>

                </div>

                {/* ── TESTIMONIALS BAND ── */}
                <div className="gallery-testimonials">
                    <div className="testimonial-heading">
                        <div className="chapter-lines"><span></span><i>✦</i><span></span></div>
                        <h3>{t.testimonials.heading}</h3>
                        <p>{t.testimonials.sub}</p>
                    </div>
                    <div className="testimonial-grid">
                        {t.testimonials.list.map((item, i) => (
                            <div className="testimonial-card" key={i}>
                                <p className="t-quote">"{item.text}"</p>
                                <div className="t-author">
                                    <span className="t-name">{item.name}</span>
                                    <span className="t-loc">📍 {item.loc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── BOTTOM CTA STRIP ── */}
                <div className="gallery-cta-strip">
                    <div className="gcta-inner">
                        <span className="gcta-om">🛕</span>
                        <div className="gcta-text">
                            <h3>{t.cta.title}</h3>
                            <p>{t.cta.sub}</p>
                        </div>
                        <div className="gcta-btns">
                            <button className="gcta-btn-primary" onClick={() => navigate("/contact")}>{t.cta.btnPrimary}</button>
                            <button className="gcta-btn-secondary" onClick={() => navigate("/")}>{t.cta.btnSecondary}</button>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}