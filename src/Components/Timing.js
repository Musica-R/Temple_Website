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
        el.querySelectorAll(".t-special-note").forEach((n, i) => {
          setTimeout(() => n.classList.add("in"), 350 + i * 100);
        });

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
    ritualTitle: langKey === "TA" ? "வழிபாட்டு முறைகள்" : langKey === "ML" ? "അനുഷ്ഠാന വിവരണം" : "Ritual Details",
    poojaTimingsTitle: langKey === "TA" ? "பூஜை நேரங்கள்" : langKey === "ML" ? "പൂജാ സമയങ്ങൾ" : "Pooja Timings",
  };

  const noteText =
    langKey === "TA"
      ? "ஒவ்வொரு மலையாள மாதத்தின் முதல் நாளிலும், மேலும் ஞாயிறு, செவ்வாய் மற்றும் வெள்ளிக்கிழமைகளிலும், கோவில் காலை 5:00 மணி முதல் 11:30 மணி வரை திறந்திருக்கும்."
      : langKey === "ML"
        ? "ഓരോ മലയാള മാസത്തിന്റെ ആദ്യ ദിവസത്തിലും, കൂടാതെ ഞായർ, ചൊവ്വ, വെള്ളി ദിവസങ്ങളിലും, ക്ഷേത്രം രാവിലെ 5:00 മുതൽ 11:30 വരെ തുറന്നിരിക്കും."
        : "On the first day of every Malayalam month, as well as on Sundays, Tuesdays, and Fridays, the temple will remain open from 5:00 AM to 11:30 AM.";

  const ritualText =
    langKey === "TA"
      ? "உஷ பூஜைக்கு பிறகு பக்தர்கள் நமஸ்காரம் செய்யலாம். கோவிலின் தாந்திரிக மரபுகளின்படி சிறப்பு பூஜைகள், கலச அபிஷேகம், மற்றும் பௌர்ணமி பூஜை நடைபெறும். ஒவ்வொரு மலையாள மாதத்தின் முதல் நாளிலும், அம்மனுக்கு கைமுக்கு மற்றும் சாந்தாட்டு நடைபெறும்."
      : langKey === "ML"
        ? "ഉഷപൂജത്തിനിലെ ദർശനത്തിന് ശേഷം നമസ്കാരം (പ്രതിഷ്ഠ, ദിനം മാറി ആ ചോർക്കുന്നത്). ക്ഷേത്രം തന്ത്രിയുടെ പൂജ കാര്യങ്ങൾക്കനുസരിച്ച് വിശേഷാൽ പൂജകളും, കലശാഭിഷേകവും, പൂർണ്ണചന്ദ്ര പൂജയും നടത്തപ്പെടുന്നു. എല്ലാ മലയാളമാസം 1-ാം തീയതി കൈലിയും ഭഗവതിക്ക് ചാന്താട്ടും നടത്തുന്നു."
        : "After the Usha Pooja, devotees can offer Namaskaram. Special poojas are conducted according to the temple's tantric traditions, including special rituals, Kalasha Abhishekam, and Pournami (Full Moon) Pooja. On the 1st day of every Malayalam month, Kaimukku and Chandattam are performed for the Goddess.";

  const poojaTimings = [
    {
      name: langKey === "TA" ? "உஷ பூஜை" : langKey === "ML" ? "ഉഷ പൂജ" : "Usha Pooja",
      time: "7:15 AM",
    },
    {
      name: langKey === "TA" ? "உச்ச பூஜை" : langKey === "ML" ? "ഉച്ച പൂജ" : "Ucha Pooja (Noon Pooja)",
      time: "11:00 AM",
    },
    {
      name: langKey === "TA" ? "தீபாராதனை" : langKey === "ML" ? "ദീപാരാധന" : "Deeparadhana",
      time: "6:15 PM",
    },
    {
      name: langKey === "TA" ? "அத்தாழ பூஜை" : langKey === "ML" ? "അത്താഴ പൂജ" : "Athazha Pooja",
      time: "7:15 PM",
    },
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
        {/* <p className="t-desc">{t.desc}</p> */}
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
            <span className="t-note-text">{noteText}</span>
          </div>
          <div className="t-note-accent" aria-hidden="true" />
        </div>
      </div>

      {/* ── RITUAL DETAILS NOTE ── */}
      <div className="t-note-wrap">
        <div className="t-special-note">
          <div className="t-note-left">
            <span className="t-note-diya" aria-hidden="true">🙏</span>
          </div>
          <div className="t-note-body">
            <span className="t-note-text">{ritualText}</span>
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

        {/* RIGHT — Image + Pooja Timings */}
        <div className="t-right">

          {/* Image card */}
          <div className="t-img-card">
            <div className="t-img-wrap">
              <img src="/assets/img2.png" alt="Temple" />
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

          {/* Pooja timings list (replaces the 4-box stat grid) */}
          <div className="t-card">
            <div className="t-card-glow" />
            <div className="t-card-head">
              <div>
                <h3 className="t-card-title">{labels.poojaTimingsTitle}</h3>
              </div>
            </div>
            <div className="t-rows">
              {poojaTimings.map((item, index) => (
                <div className="t-row in" key={index}>
                  <span className="t-row-num">{String(index + 1).padStart(2, "0")}</span>
                  <span className="t-row-name">{item.name}</span>
                  <span className="t-row-time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}