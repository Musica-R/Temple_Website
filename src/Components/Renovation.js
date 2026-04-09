import { QRCodeCanvas } from "qrcode.react";
import "../Stylesheet/Renovation.css";
import DATA from "../Json/Renovation.json";
import { useLanguage } from "../Context/Languagecontext";

export default function Renovation() {

  const { language } = useLanguage();
  const d = DATA.renovation[language];

  return (
    <div className="reno-root">
      <div className="reno-bg-pattern" />

      <div className="reno-page">

        <header className="reno-hero">
          <div className="reno-hero-top-ornament">
            <span className="reno-diya">🪔</span>
            <span className="reno-om">ॐ</span>
            <span className="reno-diya">🪔</span>
          </div>
          <h1 className="reno-hero-title">{d.mainTitle}</h1>
          <div className="reno-divider-line">
            <span /><span className="reno-diamond">✦</span><span />
          </div>
        </header>

        {/* ══ TANTRI BANNER ══ */}
        <div className="reno-tantri-banner">
          <span className="reno-tantri-diya">🪔</span>
          <div className="reno-tantri-text">
            <span className="reno-tantri-label">{d.tantriLabel}</span>
            <span className="reno-tantri-name">{d.tantri}</span>
          </div>
          <span className="reno-tantri-diya">🪔</span>
        </div>

        {/* ══ IMAGE 2×2 GRID ══ */}
        <section className="reno-image-section">
          <div className="reno-image-grid">
            {d.images.map((img, i) => (
              <div className="reno-img-card" key={i}>
                <div className="reno-img-wrapper">
                  <img src={img.src} alt={img.title} />
                  <div className="reno-img-number">0{i + 1}</div>
                </div>
                <div className="reno-img-info">
                  <div className="reno-img-title">{img.title}</div>
                  <div className="reno-img-desc">{img.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ THREE PANELS ══ */}
        <section className="reno-panels">

          {/* Trust Board */}
          <div className="reno-panel reno-panel-trust">
            <div className="reno-panel-head">
              <span className="reno-ph-icon">⚜</span>
              <h2>{d.trustee.heading}</h2>
            </div>
            <div className="reno-panel-body">
              <div className="reno-chairman-badge">{d.trustee.chairman}</div>
              <div className="reno-member-list">
                {d.trustee.members.map((m, i) => (
                  <div className="reno-member-row" key={i}>
                    <span className="reno-member-place">{m.place}</span>
                    <span className="reno-member-sep">—</span>
                    <span className="reno-member-name">{m.name}</span>
                  </div>
                ))}
              </div>
              <div className="reno-manager-tag">{d.trustee.manager}</div>
            </div>
          </div>

          {/* Renovation Committee */}
          <div className="reno-panel reno-panel-reno">
            <div className="reno-panel-head">
              <span className="reno-ph-icon">🔱</span>
              <h2>{d.renovation.heading}</h2>
            </div>
            <div className="reno-panel-body">
              <div className="reno-reno-sub">{d.renovation.subheading}</div>
              <div className="reno-reno-names">
                {d.renovation.members.map((m, i) => (
                  <div className="reno-reno-pill" key={i}>{m}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Office Bearers */}
          <div className="reno-panel reno-panel-office">
            <div className="reno-panel-head">
              <span className="reno-ph-icon">✦</span>
              <h2>{d.office.heading}</h2>
            </div>
            <div className="reno-panel-body">
              {[d.office.president, d.office.secretary, d.office.treasurer, d.office.jt_treasurer].map((item, i) => (
                <div className="reno-office-row" key={i}>
                  <span className="reno-office-label">{item.label}</span>
                  <span className="reno-office-name">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ══ VICE PRESIDENTS & JT. SECRETARIES ══ */}
        <section className="reno-officer-band">
          <div className="reno-officer-group">
            <div className="reno-og-title">{d.office.vicePresidents.label}</div>
            <div className="reno-og-tags">
              {d.office.vicePresidents.names.map((n, i) => (
                <span className="reno-og-tag" key={i}>{n}</span>
              ))}
            </div>
          </div>
          <div className="reno-band-sep">◆</div>
          <div className="reno-officer-group">
            <div className="reno-og-title">{d.office.jt_secretaries.label}</div>
            <div className="reno-og-tags">
              {d.office.jt_secretaries.names.map((n, i) => (
                <span className="reno-og-tag" key={i}>{n}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ══ EXECUTIVES ══ */}
        <section className="reno-exec-section">
          <div className="reno-exec-title">{d.office.executives.label}</div>
          <div className="reno-exec-chips">
            {d.office.executives.names.map((n, i) => (
              <span className="reno-exec-chip" key={i}>{n}</span>
            ))}
          </div>
        </section>

        {/* ══ DONATION / QR CODE ══ */}
        <section className="reno-donation-section">
          <div className="reno-donation-card">
            <div className="reno-donation-left">
              <div className="reno-donation-heading">{d.donation.heading}</div>
              <div className="reno-donation-committee">{d.donation.committee}</div>
              <div className="reno-donation-divider" />
              <div className="reno-donation-detail">
                <span className="reno-detail-label">A/C No.</span>
                <span className="reno-detail-value">{d.donation.account}</span>
              </div>
              <div className="reno-donation-detail">
                <span className="reno-detail-label">IFSC</span>
                <span className="reno-detail-value">{d.donation.ifsc}</span>
              </div>
              <div className="reno-donation-detail reno-upi-row">
                <span className="reno-detail-label">UPI ID</span>
                <span className="reno-detail-value reno-upi-value">{d.donation.upi}</span>
              </div>
              <div className="reno-bank-name">🏦 {d.donation.bank}</div>
            </div>
            <div className="reno-donation-right">
              <div className="reno-qr-label">Scan to Pay</div>
              <div className="reno-qr-frame">
                <QRCodeCanvas
                  value={`upi://pay?pa=${d.donation.upi}&pn=SREE KURUMBA BAGAVATHI KSHETHRA NAVEEKARANA COMMITTEE`}
                  size={140}
                  bgColor="#ffffff"
                  fgColor="#1a3a2a"
                  level="H"
                  includeMargin={true}
                />
              </div>
              <div className="reno-qr-upi">{d.donation.upi}</div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="reno-footer">
          <span>✦</span>
          <span>OM NAMAH SHIVAYA</span>
          <span>✦</span>
        </footer>

      </div>
    </div>
  );
}