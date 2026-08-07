import { useEffect, useRef } from "react";
import { useLanguage } from "../Context/Languagecontext";
import translations from "../Json/Event.json";
import "../Stylesheet/Event.css";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   ICONS — minimal single-color SVGs for spine nodes
   Pass event.icon = "flower" | "gate" | "lamp" | "drum" | "weapons" | "temple"
   If not provided, cycles through a themed default sequence.
─────────────────────────────────────────────── */
const ICONS = {
    flower: (
        <svg viewBox="0 0 24 24" className="ev-node-icon">
            <circle cx="12" cy="12" r="2.3" fill="currentColor" />
            <ellipse cx="12" cy="5.6" rx="2.1" ry="3.8" fill="currentColor" />
            <ellipse cx="12" cy="18.4" rx="2.1" ry="3.8" fill="currentColor" />
            <ellipse cx="5.6" cy="12" rx="3.8" ry="2.1" fill="currentColor" />
            <ellipse cx="18.4" cy="12" rx="3.8" ry="2.1" fill="currentColor" />
        </svg>
    ),
    gate: (
        <svg viewBox="0 0 24 24" className="ev-node-icon">
            <path d="M4 21V8a2 2 0 012-2h1V3.4h2V6h6V3.4h2V6h1a2 2 0 012 2v13"
                fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M3.5 10.2h17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
    ),
    lamp: (
        <svg viewBox="0 0 24 24" className="ev-node-icon">
            <path d="M4 15.6c0 2.6 3.6 4.6 8 4.6s8-2 8-4.6" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M4 15.6c0-1.9 3.6-2.8 8-2.8s8 .9 8 2.8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M12 4c1.2 1.5 1.8 2.6 1.8 3.6a1.8 1.8 0 01-3.6 0c0-1 .6-2.1 1.8-3.6z" fill="currentColor" />
        </svg>
    ),
    drum: (
        <svg viewBox="0 0 24 24" className="ev-node-icon">
            <ellipse cx="12" cy="6.2" rx="7" ry="2.3" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M5 6.2v10.6c0 1.3 3.1 2.3 7 2.3s7-1 7-2.3V6.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <ellipse cx="12" cy="16.8" rx="7" ry="2.3" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
    ),
    weapons: (
        <svg viewBox="0 0 24 24" className="ev-node-icon">
            <path d="M4.5 4.5l15 15M19.5 4.5l-15 15" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
            <circle cx="4.5" cy="4.5" r="1.4" fill="currentColor" />
            <circle cx="19.5" cy="4.5" r="1.4" fill="currentColor" />
            <circle cx="4.5" cy="19.5" r="1.4" fill="currentColor" />
            <circle cx="19.5" cy="19.5" r="1.4" fill="currentColor" />
        </svg>
    ),
    temple: (
        <svg viewBox="0 0 24 24" className="ev-node-icon">
            <path d="M12 2.2l2.6 3.4H9.4L12 2.2z" fill="currentColor" />
            <path d="M7.8 6.4h8.4l1.4 3.4H6.4l1.4-3.4z" fill="currentColor" />
            <path d="M5 10.6h14l1.4 3.4H3.6L5 10.6z" fill="currentColor" />
            <path d="M2.4 14.8h19.2l1 4.4H1.4l1-4.4z" fill="currentColor" />
        </svg>
    ),
};

const DEFAULT_ICON_SEQUENCE = ["flower", "gate", "lamp", "flower", "drum", "temple"];

function getIcon(event, index) {
    const key = event.icon || DEFAULT_ICON_SEQUENCE[index % DEFAULT_ICON_SEQUENCE.length];
    return ICONS[key] || ICONS.flower;
}

/* ─────────────────────────────────────────────
   EventRow — single spine node + one title card
   ODD  index (0-based) → node | text (card on right)
   EVEN index           → text (card on left) | node
─────────────────────────────────────────────── */
function EventRow({ event, index }) {

    const cardRef = useRef(null);
    const isEven = index % 2 !== 0; // 0-based: index 0 = first row = "odd" visually

    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => el.classList.add("er-visible"), index * 80);
                    obs.unobserve(el);
                }
            },
            { threshold: 0.06 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [index]);

    const nodeCell = (
        <div className="ev-card-spine">
            <div className={`ev-spine-node${event.special ? " ev-spine-node-special" : ""}`}>
                {getIcon(event, index)}
            </div>
        </div>
    );

    const textCell = (
        <div className="ev-card-panel">
            <h3 className="ev-panel-title">{event.title}</h3>
            <div className="ev-panel-ornament">
                <span className="ev-orn-line-sm" />
                <span className="ev-orn-gem-sm">❖</span>
                <span className="ev-orn-line-sm" />
            </div>
        </div>
    );

    return (
        <div
            className={`ev-card${event.special ? " ev-card-special" : ""}${isEven ? " ev-card-even" : " ev-card-odd"}`}
            ref={cardRef}
        >
            {!isEven ? (
                <>
                    {nodeCell}
                    {textCell}
                </>
            ) : (
                <>
                    {textCell}
                    {nodeCell}
                </>
            )}
        </div>
    );
}

/* ─────────────────────────────────────────────
   Main Event Page
─────────────────────────────────────────────── */
export default function Event() {
    const { language } = useLanguage();
    const t = translations.event[language] || translations.event["EN"];
    const navigate = useNavigate();

    const verseBandRef = useRef(null);
    const scheduleRef = useRef(null);
    const finaleRef = useRef(null);
    const statsRef = useRef(null);
    const vediRef = useRef(null);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add("oh-visible");
                    obs.unobserve(e.target);
                }
            }),
            { threshold: 0.07 }
        );
        [verseBandRef, scheduleRef, finaleRef, statsRef, vediRef].forEach(
            r => r.current && obs.observe(r.current)
        );
        return () => obs.disconnect();
    }, []);

    return (
        <div className="event-page">

            {/* ══ HERO ══ */}
            <div className="ourheritage">
                <img src="/assets/about.jpg" alt="Temple" className="hero-img" />
                <div className="ourheritage-overlay">
                    <div className="oh-mandala-ring oh-ring-1" />
                    <div className="oh-mandala-ring oh-ring-2" />
                    <div className="oh-mandala-ring oh-ring-3" />
                </div>
                <div className="ourheritage-content">
                    <h1 className="oh-anim-title">{t.heroTitle}</h1>
                    <div className="ourheritage-breadcrumb oh-anim-breadcrumb">
                        <span onClick={() => navigate("/")} style={{ cursor: "pointer" }}>{t.breadcrumb.home}</span>
                        <span className="ourheritage-dot">ॐ</span>
                        <span className="ourheritage-active">{t.breadcrumb.active}</span>
                    </div>
                </div>
            </div>

            {/* ══ VERSE BAND ══ */}
            <div className="gallery-verse-band oh-scroll-reveal" ref={verseBandRef}>
                <div className="verse-inner">
                    <span className="verse-om">ॐ</span>
                    <p>{t.verse}</p>
                </div>
            </div>

            {/* ══ BODY ══ */}
            <div className="ev-body">
                <main className="ev-schedule oh-scroll-reveal oh-delay-1" ref={scheduleRef}>

                    <div className="ev-sched-heading">
                        <h2 className="ev-heading-title">{t.scheduleTitle}</h2>
                        <p className="ev-heading-sub">{t.scheduleSubtitle}</p>
                        <div className="ev-heading-ornament">
                            <span className="ev-orn-line" />
                            <span className="ev-orn-gem">❖</span>
                            <span className="ev-orn-line" />
                        </div>
                    </div>

                    <div className="ev-timeline">
                        {t.events.map((ev, i) => (
                            <EventRow key={i} event={ev} index={i} />
                        ))}
                    </div>

                </main>
            </div>

            {/* ══ VEDI UTSAVAM NARRATIVE ══ */}
            <section className="ev-vedi oh-scroll-reveal oh-delay-2" ref={vediRef}>
                <div className="ev-vedi-card">
                    <div className="ev-vedi-header">
                        <h2 className="ev-vedi-title">{t.vediUtsavam?.title}</h2>
                        <div className="ev-vedi-ornament">
                            <span className="ev-orn-line" />
                            <span className="ev-orn-gem">❖</span>
                            <span className="ev-orn-line" />
                        </div>
                    </div>
                    <ul className="ev-vedi-body ev-vedi-list">
                        {t.vediUtsavam?.paragraphs?.map((para, i) => (
                            <li className="ev-vedi-point" key={i}>
                                <span className="ev-vedi-point-bullet">❖</span>
                                <span className="ev-vedi-point-text">{para}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="ev-vedi-closing">
                        <span className="ev-vedi-closing-gem">❖</span>
                        <span className="ev-footer-om" style={{ opacity: .5 }}>ॐ</span>
                        <span className="ev-vedi-closing-gem">❖</span>
                    </div>
                </div>
            </section>

            <br /><br />

            {/* FOOTER */}
            <footer className="ev-footer">
                <div className="ev-footer-inner">
                    <span className="ev-footer-om">ॐ</span>
                    <span className="ev-footer-text">{t.footer}</span>
                    <span className="ev-footer-om">ॐ</span>
                </div>
            </footer>

        </div>
    );
}