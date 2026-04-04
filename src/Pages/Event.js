import { useEffect, useRef } from "react";
import { useLanguage } from "../Context/Languagecontext";
import translations from "../Json/Event.json";
import "../Stylesheet/Event.css";

/* ─────────────────────────────────────────────
   EventRow — explicit grid placement per parity
   ODD  index → [IMAGE col1] [NODE col2] [TEXT col3]
   EVEN index → [TEXT col1]  [NODE col2] [IMAGE col3]
─────────────────────────────────────────────── */
function EventRow({ event, index }) {
    const cardRef = useRef(null);
    const isEven = index % 2 !== 0; // 0-based: index 0 = first = odd row visually

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

    const imageCell = (
        <div className="ev-card-img-zone">
            {event.image ? (
                <img src={event.image} alt={event.title} loading="lazy" />
            ) : (
                <div style={{
                    width: "100%", height: "100%",
                    background: "linear-gradient(135deg,#3a0a08 0%,#5e110e 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 80, fontFamily: "'Cinzel Decorative',cursive",
                    color: "rgba(201,152,42,.18)"
                }}>ॐ</div>
            )}
            {/* Date badge */}
            <div className="ev-card-date">
                <span className="ev-card-day">{event.day}</span>
                <span className="ev-card-month">{event.month}</span>
                <span className="ev-card-weekday">{event.weekday}</span>
            </div>
        </div>
    );

    const nodeCell = (
        <div className="ev-card-spine">
            <div className={`ev-spine-node${event.special ? " ev-spine-node-special" : ""}`}>
                {event.special ? "✦" : "◆"}
            </div>
        </div>
    );

    const textCell = (
        <div className="ev-card-panel">
            {event.special && (
                <span className="ev-panel-grand-badge">✦ Grand Event</span>
            )}
            <div className="ev-panel-header">
                <h3 className="ev-panel-title">{event.title}</h3>
                <div className="ev-panel-time">
                    <span className="ev-panel-time-icon">⏱</span>
                    {event.time}
                </div>
            </div>
            <div className="ev-panel-divider" />
            <ul className="ev-panel-details">
                {event.details.map((d, i) => (
                    <li key={i} className="ev-panel-detail">
                        {d.label ? (
                            <>
                                <span className="ev-detail-label">{d.label}</span>
                                <span className="ev-detail-sep">·</span>
                                <span className="ev-detail-text">{d.text}</span>
                            </>
                        ) : (
                            <>
                                <span className="ev-detail-dash">—</span>
                                <span className="ev-detail-text">{d.text}</span>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div
            className={`ev-card${event.special ? " ev-card-special" : ""}${isEven ? " ev-card-even" : " ev-card-odd"}`}
            ref={cardRef}
        >
            {/* Render in explicit DOM order based on parity.
                CSS grid-column declarations in the CSS file
                handle the visual placement — no order tricks. */}
            {!isEven ? (
                /* ODD rows: image | node | text  */
                <>
                    {imageCell}
                    {nodeCell}
                    {textCell}
                </>
            ) : (
                /* EVEN rows: text | node | image */
                <>
                    {textCell}
                    {nodeCell}
                    {imageCell}
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

    const verseBandRef = useRef(null);
    const scheduleRef = useRef(null);
    const finaleRef = useRef(null);
    const statsRef = useRef(null);

    const specialCount = t.events.filter(e => e.special).length;

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
        [verseBandRef, scheduleRef, finaleRef, statsRef].forEach(
            r => r.current && obs.observe(r.current)
        );
        return () => obs.disconnect();
    }, []);

    return (
        <div className="event-page">

            {/* ══ HERO — unchanged ══ */}
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

            {/* ══ VERSE BAND — unchanged ══ */}
            <div className="gallery-verse-band oh-scroll-reveal" ref={verseBandRef}>
                <div className="verse-inner">
                    <span className="verse-om">ॐ</span>
                    <p>{t.verse}</p>
                </div>
            </div>

            {/* ══ GOLD STATS STRIP ══ */}
            {/* <div className="ev-stats oh-scroll-reveal" ref={statsRef}>
                <div className="ev-stats-om" aria-hidden="true">ॐ</div>
                <div className="ev-stats-inner">
                    <div className="ev-stat">
                        <span className="ev-stat-num">14<sup>th</sup></span>
                        <span className="ev-stat-label">Annual Edition</span>
                    </div>
                    <div className="ev-stat-sep" />
                    <div className="ev-stat">
                        <span className="ev-stat-num">{t.events.length}</span>
                        <span className="ev-stat-label">Sacred Events</span>
                    </div>
                    <div className="ev-stat-sep" />
                    <div className="ev-stat">
                        <span className="ev-stat-num">{specialCount}</span>
                        <span className="ev-stat-label">Grand Celebrations</span>
                    </div>
                    <div className="ev-stat-sep" />
                    <div className="ev-stat">
                        <span className="ev-stat-num">14</span>
                        <span className="ev-stat-label">Days of Devotion</span>
                    </div>
                </div>
            </div> */}

            {/* ══ BODY ══ */}
            <div className="ev-body">
                <main className="ev-schedule oh-scroll-reveal oh-delay-1" ref={scheduleRef}>

                    {/* Section heading */}
                    <div className="ev-sched-heading">
                        <span className="ev-heading-eyebrow">Programme of Events</span>
                        <h2 className="ev-heading-title">{t.scheduleTitle}</h2>
                        <p className="ev-heading-sub">{t.scheduleSubtitle}</p>
                        <div className="ev-heading-ornament">
                            <span className="ev-orn-line" />
                            <span className="ev-orn-gem">❖</span>
                            <span className="ev-orn-line" />
                        </div>
                    </div>

                    {/* Zigzag Timeline */}
                    <div className="ev-timeline">
                        {t.events.map((ev, i) => (
                            <EventRow key={i} event={ev} index={i} />
                        ))}
                    </div>

                    {/* GRAND FINALE */}
                    <div className="ev-finale oh-scroll-reveal oh-delay-2" ref={finaleRef}>
                        <div className="ev-finale-header">
                            <div className="ev-finale-stars">
                                <span>★</span>
                                <span className="ev-finale-star-lg">★</span>
                                <span>★</span>
                            </div>
                            <span className="ev-finale-eyebrow">{t.grandFinale.label}</span>
                        </div>
                        <div className="ev-finale-body">
                            <div className="ev-finale-date-block">
                                <span className="ev-finale-day">24</span>
                                <span className="ev-finale-month-yr">Feb 2026</span>
                                <span className="ev-finale-wd">Tuesday</span>
                            </div>
                            <div className="ev-finale-divider" />
                            <div className="ev-finale-detail">
                                <h3 className="ev-finale-name">{t.grandFinale.date}</h3>
                                <p className="ev-finale-times">
                                    <span className="ev-finale-clock">⏰</span>
                                    {t.grandFinale.times}
                                </p>
                                <p className="ev-finale-caption">
                                    <em>{t.grandFinale.caption}</em>
                                </p>
                                <div className="ev-finale-tags">
                                    {t.grandFinale.tags.map((tag, i) => (
                                        <span key={i} className="ev-finale-tag">
                                            <span className="ev-finale-tag-dot">◆</span>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </div>

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