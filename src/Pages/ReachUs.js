import { useEffect, useRef } from 'react';
import { useState } from 'react';
import '../Stylesheet/ReachUs.css';
import { useLanguage } from '../Context/Languagecontext';
import translations from "../Json/Reachustranslations.json";

export default function ReachUs() {
    const infoCardsRef = useRef([]);
    const rightRef = useRef(null);
    const headerRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = () => {
        const phoneNumber = "8610766168"; // temple WhatsApp number (with country code)

        const message = ` *New Prayer Request from Temple Website*

 Name: ${formData.name}
 Email: ${formData.email}
 Message: ${formData.message}`;

        const encodedMessage = encodeURIComponent(message);

        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappURL, "_blank");
    };

    // ─── Pick the right language block ───────────────────────────────────────
    const { language } = useLanguage();
    const t = translations.reachUs[language] || translations.reachUs["EN"];

    // ─── Info cards built from translated JSON ────────────────────────────────
    const infoItems = [
        {
            icon: t.infoCards[0].icon,
            label: t.infoCards[0].label,
            content: (
                <>
                    {t.infoCards[0].content.line1}<br />
                    {t.infoCards[0].content.line2}<br />
                    {t.infoCards[0].content.line3}
                </>
            ),
        },
        {
            icon: t.infoCards[1].icon,
            label: t.infoCards[1].label,
            content: (
                <>
                    <a href="tel:+919876543210">{t.infoCards[1].content.phone1}</a><br />
                    <a href="tel:+914412345678">{t.infoCards[1].content.phone2}</a>
                </>
            ),
        },
        {
            icon: t.infoCards[2].icon,
            label: t.infoCards[2].label,
            content: (
                <>
                    <a href="mailto:temple@email.com">{t.infoCards[2].content.email1}</a><br />
                    <a href="mailto:info@temple.org">{t.infoCards[2].content.email2}</a>
                </>
            ),
        },
        {
            icon: t.infoCards[3].icon,
            label: t.infoCards[3].label,
            content: (
                <>
                    <span className="timing-row">
                        <em>{t.infoCards[3].content.morning.label}</em> {t.infoCards[3].content.morning.time}
                    </span>
                    <span className="timing-row">
                        <em>{t.infoCards[3].content.evening.label}</em> {t.infoCards[3].content.evening.time}
                    </span>
                </>
            ),
        },
    ];

    // ─── Intersection observer (unchanged) ───────────────────────────────────
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add('animate-in');
                });
            },
            { threshold: 0.12 }
        );

        if (headerRef.current) observer.observe(headerRef.current);
        if (rightRef.current) observer.observe(rightRef.current);
        infoCardsRef.current.forEach((card) => { if (card) observer.observe(card); });

        return () => observer.disconnect();
    }, []);

    return (
        <div>
            {/* ── Hero Banner ── */}
            <div className="ourheritage">
                <img src="/assets/about.jpg" alt="Temple" className="hero-img" />
                <div className="ourheritage-overlay"></div>
                <div className="ourheritage-content">
                    <span className="hero-tag">{t.heroBanner.tag}</span>
                    <h1>{t.heroBanner.title}</h1>
                    <p className="hero-sub">{t.heroBanner.subtitle}</p>
                    <div className="ourheritage-breadcrumb">
                        <span>{t.heroBanner.breadcrumb.home}</span>
                        <span className="ourheritage-dot">{t.heroBanner.breadcrumb.separator}</span>
                        <span className="ourheritage-active">{t.heroBanner.breadcrumb.current}</span>
                    </div>
                </div>
            </div>

            {/* ── Verse Band ── */}
            <div className="gallery-verse-band">
                <div className="verse-inner">
                    <span className="verse-om">ॐ</span>
                    <p>"{t.verseBand.quote}"</p>
                </div>
            </div>

            {/* ── Main Section ── */}
            <section className="reachus">

                <div className="reachus-blob blob-1" aria-hidden="true" />
                <div className="reachus-blob blob-2" aria-hidden="true" />

                {/* Section Header */}
                <div className="reachus-header" ref={headerRef}>
                    <div className="section-tag">
                        <span>✦</span> {t.sectionHeader.tag} <span>✦</span>
                    </div>
                    <h2>{t.sectionHeader.title}</h2>
                    <p>{t.sectionHeader.subtitle}</p>
                </div>

                <div className="reachus-wrapper">

                    {/* LEFT — Info Cards */}
                    <div className="reachus-left">
                        {infoItems.map((item, i) => (
                            <div
                                className="info-card"
                                key={i}
                                ref={(el) => (infoCardsRef.current[i] = el)}
                                style={{ '--delay': `${i * 0.12}s` }}
                            >
                                <div className="info-icon">{item.icon}</div>
                                <div className="info-body">
                                    <h4>{item.label}</h4>
                                    <p>{item.content}</p>
                                </div>
                                <div className="info-card-line" />
                            </div>
                        ))}
                    </div>

                    {/* RIGHT — Map + Form */}
                    <div className="reachus-right" ref={rightRef}>

                        {/* Map */}
                        <div className="map-box">
                            <div className="map-label">
                                <span>📍</span> {t.mapBox.label}
                            </div>
                            <iframe
                                title="Sree Kurumba Bhagavathy Temple Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.420503491597!2d76.7129159!3d10.7790705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba86c1fa9b2a8bd%3A0xb74570dc3fc4a1df!2sSree%20Kurumba%20Bhagavathy%20Temple!5e0!3m2!1sen!2sin!4v1774613598479!5m2!1sen!2sin"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        {/* Form */}
                        <div className="form-box">
                            <div className="form-header">
                                <h3>{t.form.title}</h3>
                                <p>{t.form.subtitle}</p>
                            </div>

                            <div className="form-body">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>{t.form.fields.name.label}</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder={t.form.fields.name.placeholder}
                                            required
                                        />

                                    </div>
                                    <div className="form-group">
                                        <label>{t.form.fields.email.label}</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder={t.form.fields.email.placeholder}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>{t.form.fields.message.label}</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder={t.form.fields.message.placeholder}
                                        rows="4"
                                    />
                                </div>

                                <button type="button" className="submit-btn" onClick={handleSubmit}>
                                    <span>{t.form.submitButton}</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}