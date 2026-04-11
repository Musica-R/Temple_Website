import timingsData from "../Data/TimingData";
import { useLanguage } from "../Context/Languagecontext";
import translations from "../Json/Timingtranslations.json";
import "../Stylesheet/Timing.css";
import { useEffect, useRef } from "react";

function useSectionReveal(sectionRef) {
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        /* Cards */
        el.querySelectorAll(".t-card").forEach((card, i) => {
          setTimeout(() => {
            card.classList.add("in");
            card.querySelectorAll(".t-row").forEach((row, j) => {
              setTimeout(() => row.classList.add("in"), 260 + j * 70);
            });
          }, i * 130);
        });

        /* Right panel */
        setTimeout(() => el.querySelector(".t-right")?.classList.add("in"), 100);

        /* Stats */
        el.querySelectorAll(".t-stat").forEach((s, i) => {
          setTimeout(() => s.classList.add("in"), 200 + i * 80);
        });

        /* Special note */
        setTimeout(() => el.querySelector(".t-special-note")?.classList.add("in"), 350);

        obs.disconnect();
      });
    }, { threshold: 0.1 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [sectionRef]);
}

export default function Timing() {
  const { language } = useLanguage();
  const langKey = (language || "EN").toUpperCase();
  const t = translations?.timing?.[langKey] || translations?.timing?.["EN"];
  const sectionRef = useRef(null);
  useSectionReveal(sectionRef);

  const labels = {
    opens: langKey === "TA" ? "திறக்கும்" : langKey === "ML" ? "തുറക്കൽ" : "Opens",
    closes: langKey === "TA" ? "மூடும்" : langKey === "ML" ? "അടയ്ക്കൽ" : "Closes",
    poojas: langKey === "TA" ? "பூஜைகள்" : langKey === "ML" ? "പൂജകൾ" : "Poojas",
    sessions: langKey === "TA" ? "தொகுதிகள்" : langKey === "ML" ? "സെഷനുകൾ" : "Sessions",
    amDaily: langKey === "TA" ? "தினமும் காலை" : langKey === "ML" ? "രാവിലെ" : "AM daily",
    pmDaily: langKey === "TA" ? "தினமும் மாலை" : langKey === "ML" ? "വൈകിട്ട്" : "PM daily",
    perDay: langKey === "TA" ? "ஒரு நாள்" : langKey === "ML" ? "ദിവസം" : "per day",
    daily: langKey === "TA" ? "தினசரி" : langKey === "ML" ? "ദിവസവും" : "daily",
    darshan: langKey === "TA" ? "கோவில் தரிசனம்" : langKey === "ML" ? "ദർശനം" : "Temple Darshan",
    open: langKey === "TA" ? "தினமும் திறந்திருக்கும்" : langKey === "ML" ? "തുറന്നിരിക്കും" : "Open daily · Darshan by arrangement",
    heading: langKey === "TA" ? "கோவில் நேரங்கள் & பூஜைகள்" : langKey === "ML" ? " ക്ഷേത്ര സമയവും അനുഷ്ഠാനങ്ങളും" : "Temple Timings & Rituals",
    badge: langKey === "TA" ? "தினசரி நேரம்" : langKey === "ML" ? "ദിവസേന" : "Daily Schedule",
  };

 const noteText =
  langKey === "TA"
    ? "ஒவ்வொரு மலையாள மாதத்தின் முதல் நாளிலும், மேலும் ஞாயிறு, செவ்வாய் மற்றும் வெள்ளிக்கிழமைகளிலும், கோவில் காலை 5:00 மணி முதல் 11:30 மணி வரை திறந்திருக்கும்."
    : langKey === "ML"
      ? "ഓരോ മലയാള മാസത്തിന്റെ ആദ്യ ദിവസത്തിലും, കൂടാതെ ഞായർ, ചൊവ്വ, വെള്ളി ദിവസങ്ങളിലും, ക്ഷേത്രം രാവിലെ 5:00 മുതൽ 11:30 വരെ തുറന്നിരിക്കും."
      : "On the first day of every Malayalam month, as well as on Sundays, Tuesdays, and Fridays, the temple will remain open from 5:00 AM to 11:30 AM.";

  const stats = [
    { label: labels.opens, val: "5:00", sub: labels.amDaily },
    { label: labels.closes, val: "7:30", sub: labels.pmDaily },
    { label: labels.poojas, val: timingsData.reduce((a, b) => a + b.events.length, 0), sub: labels.perDay },
    { label: labels.sessions, val: timingsData.length, sub: labels.daily },
  ];

  return (
    <section id="timings" className="t-section" ref={sectionRef}>
      <div className="t-grain" aria-hidden="true" />
      <div className="t-ambient" aria-hidden="true" />

      {/* ── HEADER ── */}
      <div className="t-header">
        <div className="t-badge-wrap">
          <span className="t-badge-dot" />
          <span className="t-badge-text">{labels.badge}</span>
          <span className="t-badge-dot" />
        </div>
        <h2 className="t-title">{labels.heading}</h2>
        <p className="t-desc">{t.desc}</p>
        <div className="t-rule">
          <span /><span className="t-rule-gem" /><span />
        </div>
      </div>

      {/* ── SPECIAL DAYS NOTE ── */}
      <div className="t-note-wrap">
        <div className="t-special-note">
          <div className="t-note-left">
            <span className="t-note-diya" aria-hidden="true">🪔</span>
          </div>
          <div className="t-note-body">
            <span className="t-note-title">
              {langKey === "TA" ? "சிறப்பு நாட்கள்" : langKey === "ML" ? "പ്രത്യേക ദിവസങ്ങൾ" : "Special Days Notice"}
            </span>
            <span className="t-note-text">{noteText}</span>
          </div>
          <div className="t-note-accent" aria-hidden="true" />
        </div>
      </div>

      {/* ── LAYOUT ── */}
      <div className="t-layout">

        {/* LEFT — Session cards */}
        <div className="t-left">
          {timingsData.map((block, blockIndex) => {
            const Icon = block.icon;
            const globalBase = timingsData.slice(0, blockIndex).reduce((a, b) => a + b.events.length, 0);
            return (
              <div className="t-card" key={block.id} data-delay={blockIndex * 120}>
                <div className="t-card-glow" />
                <div className="t-card-head">
                  <div className="t-icon-ring">
                    <Icon className="t-session-icon" />
                  </div>
                  <div>
                    <h3 className="t-card-title">{t[block.session]}</h3>
                    {block.subtitle && <span className="t-card-sub">{block.subtitle}</span>}
                  </div>
                </div>
                <div className="t-rows">
                  {block.events.map((item, index) => (
                    <div className="t-row" key={index}>
                      <span className="t-row-num">{String(globalBase + index + 1).padStart(2, "0")}</span>
                      <span className="t-row-name">{t.events[item.key]}</span>
                      <span className="t-row-time">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT — Image + Stats */}
        <div className="t-right">

          {/* Image card */}
          <div className="t-img-card">
            <div className="t-img-wrap">
              <img src="/assets/banner.webp" alt="Temple" />
              <div className="t-img-veil" />
              <div className="t-img-corner t-img-corner--tl" />
              <div className="t-img-corner t-img-corner--tr" />
              <div className="t-img-corner t-img-corner--bl" />
              <div className="t-img-corner t-img-corner--br" />
            </div>
            <div className="t-img-footer">
              <span className="t-img-footer-om">ॐ</span>
              <div>
                <strong>{labels.darshan}</strong>
                <span>{labels.open}</span>
              </div>
            </div>
          </div>

          {/* Stat chips */}
          <div className="t-stat-grid">
            {stats.map((s, i) => (
              <div className="t-stat" key={i} data-delay={i * 80}>
                <span className="t-stat-label">{s.label}</span>
                <strong className="t-stat-val">{s.val}</strong>
                <span className="t-stat-sub">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}