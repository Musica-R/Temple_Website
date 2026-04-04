import { useState, useEffect } from "react";
import "../Stylesheet/Donation.css";
import { useLanguage } from "../Context/Languagecontext";
import translations from "../Json/Reachustranslations.json";
import { QRCodeCanvas } from "qrcode.react";

const QUICK_AMOUNTS = [101, 1001, 2001, 5001, 11000];
const UPI_ID = "musicaramesh31102002@okicici";
const PAYEE_NAME = "Temple Trust";

function buildGPayUrl(amount, purpose) {
  return `gpay://upi/pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Donation - ${purpose}`)}`;
}

function buildUpiUrl(amount, purpose) {
  return `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${amount}&cu=INR&tn=${encodeURIComponent(`Donation - ${purpose}`)}`;
}

export default function DonationForm() {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("general");
  const [activeAmount, setActiveAmount] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const { language } = useLanguage();
  const t = translations.donation[language] || translations.donation["EN"];

  useEffect(() => {
    const targets = [
      '.donation-form-box',
      '.donation-image-panel',
      '.section-heading',
      '.card',
      '.cta-inner',
      '.stat-item',
      '.quote-card',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('dp-in');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.09, rootMargin: '0px 0px -50px 0px' }
    );

    targets.forEach((sel) =>
      document.querySelectorAll(sel).forEach((el) => observer.observe(el))
    );

    return () => observer.disconnect();
  }, []);

  const handlePill = (val) => {
    setActiveAmount(val);
    setAmount(String(val));
    setShowQR(false);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setActiveAmount(null);
    setShowQR(false);
  };

  const handleGenerate = () => {
    if (!amount || Number(amount) < 1) {
      alert("Please enter or select a donation amount.");
      return;
    }
    setShowQR(true);
  };

  const upiUrl = buildUpiUrl(amount || "0", t.purposeLabels[purpose]);
  const gpayUrl = buildGPayUrl(amount || "0", t.purposeLabels[purpose]);
  
  return (
    <section className="donation-section">

      <div className="donation-container">

        {/* LEFT — Form */}
        <div className="donation-form-box">
          <div className="form-header">
            <span className="header-icon">{t.formPanel.icon}</span>
            <h2>{t.formPanel.title}</h2>
            <p>{t.formPanel.subtitle}</p>
          </div>

          <div className="form-body">

            <div className="amount-pills">
              {QUICK_AMOUNTS.map((v) => (
                <button key={v} type="button" className={`amount-pill${activeAmount === v ? " active" : ""}`} onClick={() => handlePill(v)}>
                  ₹{v.toLocaleString("en-IN")}
                </button>
              ))}
            </div>

            <div className="field-group">
              <label>{t.formPanel.amountLabel}</label>
              <input type="number" placeholder={t.formPanel.amountPlaceholder} value={amount} onChange={handleAmountChange}
                style={{ width: "100%", padding: "12px 16px", borderRadius: "10px", border: "1.5px solid rgba(139,94,60,0.15)", background: "var(--bg-light,#fffaf0)", color: "var(--text-dark,#3b2a1d)", fontSize: "15px", fontFamily: "Crimson Text,serif", boxSizing: "border-box" }}
              />
            </div>

            <div className="field-group">
              <label>{t.formPanel.purposeLabel}</label>
              <select value={purpose} onChange={(e) => { setPurpose(e.target.value); setShowQR(false); }}
                style={{ width: "100%", padding: "12px 40px 12px 16px", borderRadius: "10px", border: "1.5px solid rgba(139,94,60,0.15)", background: "var(--bg-light,#fffaf0)", color: "var(--text-dark,#3b2a1d)", fontSize: "15px", fontFamily: "Crimson Text,serif", cursor: "pointer", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238b5e3c' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", boxSizing: "border-box" }}>
                {Object.entries(t.purposeOptions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <button type="button" className="donate-btn" onClick={handleGenerate}>{t.formPanel.generateBtn}</button>

            {showQR && (
              <div className="qr-panel">
                <div className="qr-label">
                  <span className="qr-amount">₹{Number(amount).toLocaleString("en-IN")}</span>
                  <span className="qr-purpose">{t.purposeLabels[purpose]}</span>
                </div>

                <div className="qr-box">
                 <QRCodeCanvas value={upiUrl} size={200} style={{ display: "block", borderRadius: "8px" }} />
                  <p className="qr-scan-hint">{t.formPanel.qrScanHint}</p>
                </div>

                <div className="qr-divider">
                  <span /><i>{t.formPanel.orDivider}</i><span />
                </div>

                <a href={gpayUrl} className="gpay-btn" rel="noopener noreferrer">
                  <svg width="22" height="22" viewBox="0 0 48 48" fill="none"
                    xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                    <path d="M43.6 20.5H42V20H24v8h11.3C33.9 32.3 29.4 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.3 2.7l5.7-5.7C33.5 7.1 29 5 24 5 13 5 4 14 4 25s9 20 20 20c11 0 20-9 20-20 0-1.5-.2-3-.4-4.5z" fill="#FBC02D" />
                    <path d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c2.8 0 5.3 1 7.3 2.7l5.7-5.7C33.5 7.1 29 5 24 5c-7.7 0-14.4 4.4-17.7 9.7z" fill="#E53935" />
                    <path d="M24 45c4.9 0 9.4-1.9 12.8-4.9l-5.9-5c-1.9 1.4-4.3 2.2-6.9 2.2-5.4 0-9.9-3.6-11.4-8.5l-6.5 5C8.8 40.8 15.9 45 24 45z" fill="#4CAF50" />
                    <path d="M43.6 20.5H42V20H24v8h11.3c-.7 1.9-2 3.5-3.6 4.6l5.9 5C37.3 37.4 44 32 44 25c0-1.5-.2-3-.4-4.5z" fill="#1565C0" />
                  </svg>
                  {t.formPanel.gpayBtn}
                </a>
              </div>
            )}

            <p className="note" style={{ marginTop: showQR ? "0" : "14px" }}>{t.formPanel.acceptsNote}</p>

            <div className="trust-badges">
              <span className="badge">{t.formPanel.badges.secure}</span>
              <span className="badge">{t.formPanel.badges.tax}</span>
              <span className="badge">{t.formPanel.badges.receipt}</span>
            </div>
            
          </div>
        </div>

        {/* RIGHT — Image + quote + stats */}
        <div className="donation-image-panel">
          <div className="donation-image">
            <img src="/assets/img2.png" alt={t.imagePanel.imgAlt} />
          </div>

          <div className="quote-card">
            <p>"{t.imagePanel.quote}"</p>
            <cite>{t.imagePanel.quoteAuthor}</cite>
          </div>

          <div className="stat-strip">
            <div className="stat-item">
              <span className="stat-num">{t.imagePanel.stats.devotees.num}</span>
              <span className="stat-label">{t.imagePanel.stats.devotees.label}</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{t.imagePanel.stats.lamps.num}</span>
              <span className="stat-label">{t.imagePanel.stats.lamps.label}</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">{t.imagePanel.stats.seva.num}</span>
              <span className="stat-label">{t.imagePanel.stats.seva.label}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── DONATION TYPE CARDS ── */}
      <div className="donation-types">
        <div className="section-heading">
          <span className="heading-om">{t.donationTypes.sectionTag}</span>
          <h3>{t.donationTypes.sectionTitle}</h3>
          <div className="divider">
            <span /><i>{t.donationTypes.dividerSymbol}</i><span />
          </div>
          <p>{t.donationTypes.sectionSubtitle}</p>
        </div>

        <div className="donation-cards">
          {t.donationTypes.cards.map((card) => (
            <div className="card" key={card.key}>
              <div className="card-img-wrap">
                <img
                  src={`/assets/${card.key === "annadanam" ? "annadhanam" :
                      card.key === "lamp" ? "deepaam" :
                        card.key === "renovation" ? "ren" :
                          card.key === "abhishekam" ? "amman" :
                            card.key === "vastra" ? "dress" : card.key
                    }.jpg`}
                  alt={card.imgAlt}
                />
                <span className="card-icon">{card.icon}</span>
              </div>
              <div className="card-body">
                <h4>{card.title}</h4>
                <p>{card.description}</p>
                <span className="card-amount">{card.from}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="donation-cta">
        <div className="cta-inner">
          <div className="cta-text">
            <span className="small-label">{t.cta.smallLabel}</span>
            <h3>{t.cta.title}</h3>
            <p>{t.cta.description}</p>
          </div>
          <button
            className="cta-btn"
            onClick={() =>
              document.querySelector('.donation-form-box')
                .scrollIntoView({ behavior: 'smooth' })
            }
          >
            {t.cta.button}
          </button>
        </div>
      </div>

    </section>
  );
}