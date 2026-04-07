import { useState, useEffect } from "react";
import "../Stylesheet/Donation.css";
import { useLanguage } from "../Context/Languagecontext";
import translations from "../Json/Reachustranslations.json";
import { QRCodeCanvas } from "qrcode.react";

const QUICK_AMOUNTS = [101, 1001, 2001, 5001, 11000];
const UPI_ID = "musicaramesh31102002@okicici";
const PAYEE_NAME = "Temple Trust";
const WHATSAPP_NUMBER = "918610766168";

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
  const [showWhatsAppForm, setShowWhatsAppForm] = useState(false);
  const [donorName, setDonorName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  const { language } = useLanguage();
  const t = translations.donation[language] || translations.donation["EN"];

  /* Lock body scroll when modal open */
  useEffect(() => {
    if (showWhatsAppForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showWhatsAppForm]);

  useEffect(() => {
    const targets = [
      '.donation-form-box', '.donation-image-panel', '.section-heading',
      '.card', '.cta-inner', '.stat-item', '.quote-card',
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('dp-in'); observer.unobserve(e.target); }
        });
      },
      { threshold: 0.09, rootMargin: '0px 0px -50px 0px' }
    );
    targets.forEach((sel) => document.querySelectorAll(sel).forEach((el) => observer.observe(el)));
    return () => observer.disconnect();
  }, []);

  const handlePill = (val) => {
    setActiveAmount(val); setAmount(String(val));
    setShowQR(false); setShowWhatsAppForm(false);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value); setActiveAmount(null);
    setShowQR(false); setShowWhatsAppForm(false);
  };

  const handleGenerate = () => {
    if (!amount || Number(amount) < 1) { alert("Please enter or select a donation amount."); return; }
    setShowQR(true); setShowWhatsAppForm(false);
  };

  const closeModal = () => {
    setShowWhatsAppForm(false);
    setDonorName("");
    setAddress("");
    setMobile("");
  };

  const upiUrl = buildUpiUrl(amount || "0", t.purposeLabels[purpose]);
  const gpayUrl = buildGPayUrl(amount || "0", t.purposeLabels[purpose]);

  function buildWhatsAppMessage() {
    return encodeURIComponent(
      `*Temple Donation Details*\n\n Name: ${donorName}\n Mobile: ${mobile}\n Address: ${address}\n\n Amount: ₹${amount}\n Purpose: ${t.purposeLabels[purpose]}\n\n Kindly attach your payment screenshot below for donation verification.`
    );
  }

  // const handleSendWhatsApp = () => {
  //   if (!donorName.trim() || !mobile.trim() || !address.trim()) {
  //     alert("Please fill in your name, mobile number, and address before sending.");
  //     return;
  //   }
  //   window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`, "_blank");
  // };

  const handleSendWhatsApp = () => {
    if (!donorName.trim() || !mobile.trim() || !address.trim()) {
     alert(t.whatsappModal.validationAlert);
      return;
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`;

    // Open WhatsApp
    window.open(url, "_blank");

    // ✅ Clear all fields after opening WhatsApp
    setDonorName("");
    setMobile("");
    setAddress("");
    setAmount("");
    setActiveAmount(null);
    setShowQR(false);
    setShowWhatsAppForm(false);
  };

  return (
    <section className="donation-section">

      {/* ── HOW TO DONATE ── */}
      <div className="how-to-donate-section">
        <div className="htd-label">
          <span className="htd-label-tag">{t.howToDonate.tag}</span>
          <h2>{t.howToDonate.title}</h2>
          <p>{t.howToDonate.subtitle}</p>
        </div>
        <div className="htd-grid">
          {t.howToDonate.steps.map((s) => (
            <div className="htd-card" key={s.num}>
              <div className="htd-icon-wrap">
                <span className="htd-icon">{s.icon}</span>
                <span className="htd-step-num">{s.num}</span>
              </div>
              <div className="htd-card-title">{s.title}</div>
              <div className="htd-gold-line" />
              <div className="htd-card-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN GRID ── */}
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
                <button key={v} type="button"
                  className={`amount-pill${activeAmount === v ? " active" : ""}`}
                  onClick={() => handlePill(v)}>
                  ₹{v.toLocaleString("en-IN")}
                </button>
              ))}
            </div>

            <div className="field-group">
              <label>{t.formPanel.amountLabel}</label>
              <input type="number" placeholder={t.formPanel.amountPlaceholder}
                value={amount} onChange={handleAmountChange}
                style={{
                  width: "100%", padding: "12px 16px", borderRadius: "10px",
                  border: "1.5px solid rgba(139,94,60,0.15)",
                  background: "var(--bg-light,#fffaf0)", color: "var(--text-dark,#3b2a1d)",
                  fontSize: "15px", fontFamily: "Crimson Text,serif", boxSizing: "border-box"
                }}
              />
            </div>

            <div className="field-group">
              <label>{t.formPanel.purposeLabel}</label>
              <select value={purpose}
                onChange={(e) => { setPurpose(e.target.value); setShowQR(false); setShowWhatsAppForm(false); }}
                style={{
                  width: "100%", padding: "12px 40px 12px 16px", borderRadius: "10px",
                  border: "1.5px solid rgba(139,94,60,0.15)",
                  background: "var(--bg-light,#fffaf0)", color: "var(--text-dark,#3b2a1d)",
                  fontSize: "15px", fontFamily: "Crimson Text,serif", cursor: "pointer",
                  appearance: "none",
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238b5e3c' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", boxSizing: "border-box"
                }}
              >
                {Object.entries(t.purposeOptions).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <button type="button" className="donate-btn" onClick={handleGenerate}>
              {t.formPanel.generateBtn}
            </button>

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

                {/* <div className="qr-divider">
                  <span /><i>{t.formPanel.orDivider}</i><span />
                </div> */}

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

                {/* ── PAID BUTTON ── */}
                <button className="paid-btn" onClick={() => setShowWhatsAppForm(true)}>
                  <span className="paid-btn-checkmark">✓</span>
                  <span className="paid-btn-text">
                   <span className="paid-btn-main">{t.whatsappModal.paidBtn.main}</span>
                   <span className="paid-btn-sub">{t.whatsappModal.paidBtn.sub}</span>
                  </span>
                  <span className="paid-btn-arrow">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </div>
            )}

            <p className="note" style={{ marginTop: showQR ? "0" : "14px" }}>
              {t.formPanel.acceptsNote}
            </p>

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
                          card.key === "vastra" ? "dress" : card.key}.jpg`}
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
          <button className="cta-btn"
            onClick={() => document.querySelector('.donation-form-box').scrollIntoView({ behavior: 'smooth' })}>
            {t.cta.button}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          WHATSAPP CONFIRMATION MODAL
      ══════════════════════════════════════════ */}
      {showWhatsAppForm && (
        <div
          className="wf-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="wf-modal" role="dialog" aria-modal="true">

            {/* ── Modal Header ── */}
            <div className="wf-modal-header">
              <div className="wf-modal-header-left">
                <div className="wf-modal-temple-icon">🛕</div>
                <div>
                  <div className="wf-modal-title">{t.whatsappModal.title}</div>
                  <div className="wf-modal-subtitle">
                    ₹{Number(amount).toLocaleString("en-IN")} &nbsp;·&nbsp; {t.purposeLabels[purpose]}
                  </div>
                </div>
              </div>
              <button className="wf-modal-close" onClick={closeModal} aria-label="Close modal">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Gold accent line */}
            <div className="wf-modal-gold-line" />

            {/* ── Step Pills ── */}
            <div className="wf-modal-step-row">
              {t.whatsappModal.steps.map((s, i) => (
                <div className="wf-modal-step-wrap" key={s.n}>
                  <div className="wf-modal-step-pill">
                    <span className="wf-modal-step-num">{s.n}</span>
                    <span className="wf-modal-step-label">{s.label}</span>
                  </div>

                  {i < t.whatsappModal.steps.length - 1 && (
                    <span className="wf-modal-step-connector">›</span>
                  )}
                </div>
              ))}
            </div>

            {/* ── Scrollable Body ── */}
            <div className="wf-modal-body">

              {/* Name */}
              <div className="wf-modal-field">
                <label>{t.whatsappModal.fields.name.label}</label>
                <input
                  className="wf-modal-input"
                  type="text"
                  placeholder={t.whatsappModal.fields.name.placeholder}
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                />
              </div>

              {/* Mobile */}
              <div className="wf-modal-field">
                <label>{t.whatsappModal.fields.mobile.label}</label>

                <input className="wf-modal-input"
                  type="tel"
                  placeholder={t.whatsappModal.fields.mobile.placeholder}
                  value={mobile}
                  maxLength={10}
                  pattern="[0-9]{10}"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setMobile(value);
                    }
                  }}
                />
              </div>

              {/* Address */}
              <div className="wf-modal-field">
                <label>{t.whatsappModal.fields.address.label}</label>
                <textarea className="wf-modal-textarea" placeholder={t.whatsappModal.fields.address.placeholder} value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              {/* Amount + Purpose row */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div className="wf-modal-field">
                  <label>{t.whatsappModal.fields.amount.label}</label>
                  <input
                    className="wf-modal-input"
                    type="number"
                    readOnly
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="wf-modal-field">
                  <label>{t.whatsappModal.fields.purpose.label}</label>
                  <input
                    className="wf-modal-input"
                    type="text"
                    value={t.purposeLabels[purpose]}
                    readOnly
                    style={{ background: "var(--bg-light,#fffaf0)", cursor: "default" }}
                  />
                </div>
              </div>

              {/* Screenshot attachment notice */}
              <div className="wf-modal-screenshot-notice">
                <span className="wf-modal-notice-icon">📎</span>
                <div className="wf-modal-notice-text">
                  <span className="wf-modal-notice-heading">
                    {t.whatsappModal.screenshotNotice.heading}
                  </span>
                  <span className="wf-modal-notice-desc">
                    {t.whatsappModal.screenshotNotice.desc}
                  </span>
                </div>
              </div>

              {/* Send button */}
              <button className="wf-modal-whatsapp-btn" onClick={handleSendWhatsApp}>
                <span>💬</span>
                <span className="wf-btn-content">
                 <span className="wf-btn-main">{t.whatsappModal.sendBtn.main}</span>
                 <span className="wf-btn-sub">{t.whatsappModal.sendBtn.sub}</span>
                </span>
              </button>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}