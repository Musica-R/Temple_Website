import "../Stylesheet/Footer.css";
import { FaMapMarkerAlt, FaPhoneAlt, FaOm, FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLanguage } from "../Context/Languagecontext";
import translations from "../Json/footer.json";

export default function Footer() {
    const { language } = useLanguage();
    const t = translations.footer?.[language] || translations.footer?.["EN"];
   
    
    return (
        <footer className="footer">

            {/* Decorative top border strip */}
            <div className="footer-top-strip">
                <span className="strip-dot" />
                <span className="strip-line" />
                <FaOm className="strip-om" />
                <span className="strip-line" />
                <span className="strip-dot" />
            </div>

            {/* Temple name banner */}
            <div className="footer-banner">
                <div className="banner-glow" />
                <p className="banner-sub">{t.bannerSub}</p>
                <h2 className="banner-title">{t.bannerTitle}</h2>
                <p className="banner-location">{t.bannerLocation}</p>
                <p className="footer-desc">{t.desc}</p>
            </div>

            {/* Main grid */}
            <div className="footer-inner">

                {/* Quick Links */}
                <div className="footer-col">
                    <h4 className="col-heading">
                        <span className="heading-dot">✦</span> {t.exploreHeading}
                    </h4>
                    <ul className="footer-links">
                        <li><Link to="/">{t.navLinks.home}</Link></li>
                        <li><Link to="/history">{t.navLinks.heritage}</Link></li>
                        {/* <li><Link to="/booking">{t.navLinks.booking}</Link></li> */}
                        <li><Link to="/donation">{t.navLinks.donation}</Link></li>
                        <li><Link to="/gallery">{t.navLinks.gallery}</Link></li>
                        <li><Link to="/contact">{t.navLinks.contact}</Link></li>
                    </ul>
                </div>

                {/* Timings */}
                <div className="footer-col">
                    <h4 className="col-heading">
                        <span className="heading-dot">✦</span> {t.timingsHeading}
                    </h4>
                    <div className="timings-grid">
                        {t.timings.map((row, i) => (
                            <div key={i} className="timing-row">
                                <span className="timing-label">{row.label}</span>
                                <span className="timing-value">{row.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <div className="footer-col">
                    <h4 className="col-heading">
                        <span className="heading-dot">✦</span> {t.contactHeading}
                    </h4>
                    <div className="contact-list">
                        <div className="contact-item">
                            <span className="contact-icon"><FaMapMarkerAlt /></span>
                            <span>{t.address}</span>
                        </div>
                        <div className="contact-item">
                            <span className="contact-icon"><FaPhoneAlt /></span>
                            <span>+91 98765 43210</span>
                        </div>
                        <div className="contact-item">
                            <span className="contact-icon"><MdEmail /></span>
                            <span>temple@email.com</span>
                        </div>
                    </div>

                    {/* Social icons */}
                    <div className="social-row">
                        <a href="#facebook" className="social-btn" aria-label="Facebook"><FaFacebookF /></a>
                        <a href="#youtube" className="social-btn" aria-label="YouTube"><FaYoutube /></a>
                        <a href="#instagram" className="social-btn" aria-label="Instagram"><FaInstagram /></a>
                    </div>
                </div>

            </div>

            {/* Decorative divider */}
            <div className="footer-divider">
                <span className="divider-line" />
                <span className="divider-icon">❖</span>
                <span className="divider-icon main">☸</span>
                <span className="divider-icon">❖</span>
                <span className="divider-line" />
            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
                <span>{t.copyright.replace("{year}", new Date().getFullYear())}</span>
                <span className="bottom-sep">·</span>
                <span className="bottom-note">{t.bottomNote}</span>
            </div>

        </footer>
    );
}