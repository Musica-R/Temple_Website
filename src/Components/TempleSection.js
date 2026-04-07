import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../Stylesheet/TempleSection.css";
import data from "../Json/templeCalendarData.json";

const { temple, poojas, monthlyEvents, karkidakamEvents, featuredEvents } = data;

/* ── Ornament borders ── */
function OrnaBorder() {
  return (
    <div className="orna-border">
      <div className="orna-line" />
      <span className="orna-pat">❧ ✦ ❧ ✦ ❧ ✦ ❧ ✦ ❧ ✦ ❧ ✦ ❧</span>
      <div className="orna-line" />
    </div>
  );
}
function OrnaFooter() {
  return (
    <div className="orna-border orna-footer">
      <div className="orna-line" />
      <span className="orna-pat">❧ ✦ ❧ ✦ ❧ ✦ ❧ ✦ ❧ ✦ ❧ ✦ ❧</span>
      <div className="orna-line" />
    </div>
  );
}

/* ══════════════════════════════════════
   SLIDE 1: Hero + Pooja Offerings
══════════════════════════════════════ */
function SlideHero() {
  const [tip, setTip] = useState(null);
  return (
    <div className="slide s-hero">
      <OrnaBorder />
      <div className="s-hero__body">
        {/* LEFT */}
        <div className="s-hero__left">
          <div className="s-hero__om">ॐ</div>
          <p className="s-hero__loc">{temple.locationML}</p>
          <h1 className="s-hero__name">{temple.nameML}</h1>
          <div className="s-hero__img-wrap">
            <span className="s-hero__diya s-hero__diya--l">🪔</span>
            <div className="s-hero__halo" />
            <img src="/assets/temple-front.jpg" alt="Temple" className="s-hero__img" />
            <span className="s-hero__diya s-hero__diya--r">🪔</span>
          </div>
          <div className="s-hero__badge">
            <span className="s-hero__badge-title">{temple.calendarTitle}</span>
            <span className="s-hero__badge-year">{temple.calendarYear}</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="s-hero__right">
          <div className="stl"><span className="stl-line"/><span className="stl-text">🌸 Pooja Offerings 🌸</span><span className="stl-line"/></div>
          <div className="pooja-grid">
            {poojas.map((p) => (
              <div key={p.id} className="pc"
                onMouseEnter={() => setTip(p.id)}
                onMouseLeave={() => setTip(null)}>
                <span className="pc-icon">{p.icon}</span>
                <div className="pc-body">
                  <span className="pc-name">{p.name}</span>
                  <span className="pc-price">{p.priceLabel}</span>
                </div>
                {tip === p.id && <div className="pc-tip">{p.desc}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <OrnaFooter />
    </div>
  );
}

/* ══════════════════════════════════════
   SLIDE 2: Monthly Events
══════════════════════════════════════ */
function SlideMonthly() {
  return (
    <div className="slide s-monthly">
      <OrnaBorder />
      <div className="s-monthly__body">
        <p className="s-monthly__head">
          പാലക്കാട്, പുത്തൂർ ശ്രീ തിരുപുരായ്ക്കൽ ഭഗവതി ക്ഷേത്രത്തിൽ (പുത്തൂർക്കാവ്),
          കൊല്ലവർഷം 1198ൽ, ആചരിക്കുന്നതും, ആഘോഷിക്കപ്പെടുന്നതുമായ വിശേഷാവസരങ്ങൾ.
        </p>
        <div className="tbl-scroll">
          <table className="evt-table">
            <thead>
              <tr>
                <th className="th-date">Date</th>
                <th className="th-event">Occasion / Activities</th>
                <th className="th-vazhi">ഭക്തജനങ്ങൾക്ക് സമർപ്പിക്കാവുന്ന വഴിപാടുകൾ</th>
              </tr>
            </thead>
            <tbody>
              {monthlyEvents.map((sec) => (
                <>
                  <tr key={sec.id} className="tr-month">
                    <td colSpan={2} className="td-month-lbl">
                      1198 – {sec.monthEN} ({sec.period})
                    </td>
                    <td className="td-month-v">വഴിപാടുകൾ</td>
                  </tr>
                  {sec.rows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "tr-even" : "tr-odd"}>
                      <td className="td-date">{row.date}</td>
                      <td className="td-event">{row.event}</td>
                      <td className="td-vazhi">{row.vazhi}</td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <OrnaFooter />
    </div>
  );
}

/* ══════════════════════════════════════
   SLIDE 3: Karkidakam + Featured + Contact
══════════════════════════════════════ */
function SlideKarkidakam() {
  return (
    <div className="slide s-kark">
      <OrnaBorder />
      <div className="s-kark__body">
        <div className="tbl-scroll">
          <table className="evt-table">
            <thead>
              <tr>
                <th colSpan={2} className="th-kark-main">
                  1198 – {karkidakamEvents.monthEN} ({karkidakamEvents.period})
                </th>
                <th className="th-vazhi">ഭക്തജനങ്ങൾക്ക് സമർപ്പിക്കാവുന്ന വഴിപാടുകൾ</th>
              </tr>
            </thead>
            <tbody>
              {karkidakamEvents.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "tr-even" : "tr-odd"}>
                  <td className="td-date">{row.date}</td>
                  <td className="td-event">{row.event}</td>
                  <td className="td-vazhi">{row.vazhi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="kark-note">{karkidakamEvents.noteML}</p>

        <div className="featured-list">
          {featuredEvents.map((ev) => (
            <div key={ev.id} className={`fev${ev.isBig ? " fev--big" : ""}`}>
              <span className="fev-date">{ev.dateML}</span>
              <span className="fev-name">{ev.nameML}</span>
            </div>
          ))}
        </div>

        <div className="contact-block">
          <p className="contact-title">{temple.nameML} ദേവസ്വം ഭരണസമിതി,</p>
          <p>{temple.regNo}</p>
          <p>{temple.address}</p>
          <p>ഫോൺ : {temple.phone}, {temple.mobile}.</p>
          <p className="contact-web">Web: {temple.website}</p>
        </div>
      </div>
      <OrnaFooter />
    </div>
  );
}

/* ══════════════════════════════════════
   ROOT
══════════════════════════════════════ */
const LABELS = ["Temple & Offerings", "Monthly Events", "Karkidakam & Vela"];

export default function TempleCalendarSwiper() {
  const swiperRef = useRef(null);
  const [idx, setIdx] = useState(0);

  return (
    <div className="tcs-root">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop
        speed={900}
        onSwiper={(sw) => { swiperRef.current = sw; }}
        onSlideChange={(sw) => setIdx(sw.realIndex)}
        className="tcs-swiper"
      >
        <SwiperSlide><SlideHero /></SwiperSlide>
        <SwiperSlide><SlideMonthly /></SwiperSlide>
        <SwiperSlide><SlideKarkidakam /></SwiperSlide>
      </Swiper>

      {/* Nav */}
      <div className="tcs-nav">
        <button className="tcs-arrow" onClick={() => swiperRef.current?.slidePrev()}>◀</button>
        <div className="tcs-dots">
          {LABELS.map((lbl, i) => (
            <button key={i}
              className={`tcs-dot${i === idx ? " active" : ""}`}
              onClick={() => swiperRef.current?.slideToLoop(i)}
              title={lbl}
            >
              {i === idx && <span className="tcs-dot-lbl">{lbl}</span>}
            </button>
          ))}
        </div>
        <button className="tcs-arrow" onClick={() => swiperRef.current?.slideNext()}>▶</button>
        <div className="tcs-counter">
          <span className="tcs-cur">{String(idx + 1).padStart(2,"0")}</span>
          <span className="tcs-sep"> / </span>
          <span className="tcs-tot">0{LABELS.length}</span>
        </div>
      </div>
    </div>
  );
}