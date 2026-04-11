import "../Stylesheet/DivineGallery.css";
import { useEffect } from "react";
import { useLanguage } from "../Context/Languagecontext";
import translations from "../Json/datatranslation.json";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

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
                    <span className="hero-tag oh-anim-tag">{t.heroTag}</span>
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

                {/* ══ CHAPTER ONE ══ */}
                <div className="chapter-header">
                    <span className="chapter-number">{t.chapter1.number}</span>
                    <div className="chapter-lines">
                        <span></span><i>🪔</i><span></span>
                    </div>
                    <h2 className="chapter-title">{t.chapter1.title}</h2>
                    <p className="chapter-sub">{t.chapter1.sub}</p>
                </div>

                <div className="gallery-layout">
                    {/* LEFT CONTENT */}
                    <div className="gallery-content">
                        <div className="content-badge">{t.contentLeft.badge}</div>
                        <h2>{t.contentLeft.title}</h2>
                        <div className="gallery-divider">ॐ</div>
                        <p>{t.contentLeft.p1}</p>
                        <p>{t.contentLeft.p2}</p>
                        <ul className="content-features">
                            {t.contentLeft.features.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul>
                        <button className="gallery-btn" onClick={() => navigate("/history")} >{t.contentLeft.btn}</button>
                    </div>

                    {/* RIGHT IMAGES */}
                    <div className="gallery-grid-new">
                        {t.galleryData.slice(0, 6).map((item) => (
                            <div className="gallery-item" key={item.id} data-title={item.title} data-desc={item.desc}>
                                <img src={item.img} alt={item.title} />
                                {/* <div className="item-overlay">
                                    <span className="item-title">{item.title}</span>
                                    <span className="item-desc">{item.desc}</span>
                                </div> */}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── STATS BAND ── */}
                <div className="gallery-stats-band">
                    {t.stats.map((s, i) => (
                        <div className="gstat" key={i}>
                            <span className="gstat-num">{s.num}</span>
                            <span className="gstat-label">{s.label}</span>
                        </div>
                    ))}
                </div>

                {/* ══ CHAPTER TWO ══ */}
                <div className="chapter-header">
                    <span className="chapter-number">{t.chapter2.number}</span>
                    <div className="chapter-lines">
                        <span></span><i>🌸</i><span></span>
                    </div>
                    <h2 className="chapter-title">{t.chapter2.title}</h2>
                    <p className="chapter-sub">{t.chapter2.sub}</p>
                </div>

                <div className="gallery-layout gallery-layout-reverse">
                    <div className="gallery-grid-new">
                        {t.galleryData.slice(7, 13).map((item) => (
                            <div className="gallery-item" key={item.id} data-title={item.title} data-desc={item.desc}>
                                <img src={item.img} alt={item.title} />
                                {/* <div className="item-overlay">
                                    <span className="item-title">{item.title}</span>
                                    <span className="item-desc">{item.desc}</span>
                                </div> */}
                            </div>
                        ))}
                    </div>

                    <div className="gallery-content">
                        <div className="content-badge">{t.contentRight.badge}</div>
                        <h2>{t.contentRight.title}</h2>
                        <div className="gallery-divider">ॐ</div>
                        <p>{t.contentRight.p1}</p>
                        <p>{t.contentRight.p2}</p>

                        {/* <ul className="content-features">
                            {t.contentRight.features.map((f, i) => (
                                <li key={i}>{f}</li>
                            ))}
                        </ul> */}
                        
                        <button className="gallery-btn" onClick={() => navigate("/history")} >{t.contentRight.btn}</button>
                    </div>
                </div>


                {/* ══ CHAPTER THREE — UPADEVATAS ══ */}

                <div className="shrine-root">

                    {/* ── Chapter Header ── */}
                    <div className="chapter-header">
                        <span className="chapter-number">{t.chapter3.number}</span>
                        <div className="chapter-lines">
                            <span></span><i>🔱</i><span></span>
                        </div>
                        <h2 className="chapter-title">{t.chapter3.title}</h2>
                        <p className="chapter-sub">{t.chapter3.sub}</p>
                    </div>

                    {/* ── Section Header ── */}
                    <div className="shrine-header">
                        <span className="shrine-eyebrow">Divine Gallery</span>
                        <div className="shrine-divider">
                            <div className="shrine-divider-line"></div>
                            <div className="shrine-divider-diamond"></div>
                            <div className="shrine-divider-diamond small"></div>
                            <div className="shrine-divider-diamond"></div>
                            <div className="shrine-divider-line right"></div>
                        </div>
                    </div>

                    {/* ── Main Deity Hero ── */}
                    <div className="main-deity-hero">
                        <div className="main-deity-frame">
                            <img
                                className="main-deity-img"
                                src={t.upadevathas[0].img}
                                alt={t.upadevathas[0].name}
                            />
                            <div className="main-deity-overlay">
                                <span className="main-deity-tag">{t.upadevathas[0].tag}</span>
                                <h3 className="main-deity-name">{t.upadevathas[0].name}</h3>
                            </div>
                        </div>
                    </div>

                    {/* ── Sub Deity Label ── */}
                    <div className="sub-deities-label">
                        <span>&#9670; Sub Deities &#9670;</span>
                    </div>

                    {/* ── 5 Sub Deities Strip ── */}
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
                    <span className="chapter-number">{t.chapter4.number}</span>
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
                            <button className="gcta-btn-primary" onClick={() => navigate("/contact")} >{t.cta.btnPrimary}</button>
                            <button className="gcta-btn-secondary" onClick={() => navigate("/")}  >{t.cta.btnSecondary}</button>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    );
}