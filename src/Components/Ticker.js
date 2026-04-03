import "../Stylesheet/Ticker.css";
import { useLanguage } from "../Context/Languagecontext";
import translations from "../Json/Timingtranslations.json";

const SEPARATOR = <span className="ticker-sep" aria-hidden="true">✦</span>;

export default function Ticker() {
  const { language } = useLanguage();
  const langKey = (language || "EN").toUpperCase();
  const t = translations?.ticker?.[langKey] || translations?.ticker?.["EN"];

  const items = [t.darshan, t.evening, t.prayer, t.deeparadhana];

  return (
    <div className="ticker-wrap" role="marquee" aria-label="Temple announcements">
      <div className="ticker-glow-left" />
      <div className="ticker-glow-right" />

      <div className="ticker-inner">
        <div className="ticker-track">
          {/* Render twice for seamless loop */}
          {[0, 1].map((pass) => (
            <span className="ticker-set" key={pass} aria-hidden={pass === 1}>
              {items.map((item, i) => (
                <span className="ticker-item" key={i}>
                  {SEPARATOR}
                  <span className="ticker-text">{item}</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}