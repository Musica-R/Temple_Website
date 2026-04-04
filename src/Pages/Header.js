import "../Stylesheet/Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "../Context/Languagecontext";
import translations from "../Json/Reachustranslations.json";
import { NavLink } from "react-router-dom";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const { language, setLanguage } = useLanguage();

    // ─── Pick the right language block ───────────────────────────────────────
    const t = translations.header[language] || translations.header["EN"];

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setLangOpen(false);
        setMenuOpen(false);
    };

    return (
        <nav className={`nav ${language}`}>
            <div className="nav-inner">

                {/* LOGO — translated */}
                <div className="nav-logo">
                    <div className="logo-text">
                        {t.logoName}
                        <span>{t.logoSubtitle}</span>
                    </div>
                </div>

                {/* HAMBURGER */}
                <div
                    className={`hamburger ${menuOpen ? "active" : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                {/* NAV LINKS — translated */}
                <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>
                            {t.navLinks.home}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/history" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>
                            {t.navLinks.heritage}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/donation" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>
                            {t.navLinks.donation}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/gallery" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>
                            {t.navLinks.gallery}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/event" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>
                           {t.navLinks.event}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>
                            {t.navLinks.contact}
                        </NavLink>
                    </li>

                    {/* LANGUAGE DROPDOWN — translated labels */}
                    <li className="lang-dropdown">
                        <div
                            className="lang-selected"
                            onClick={() => setLangOpen(!langOpen)}
                        >
                            {language} ▾
                        </div>

                        {langOpen && (
                            <ul className="lang-menu">
                                <li onClick={() => handleLanguageChange("EN")}>{t.languages.EN}</li>
                                <li onClick={() => handleLanguageChange("TA")}>{t.languages.TA}</li>
                                <li onClick={() => handleLanguageChange("ML")}>{t.languages.ML}</li>
                            </ul>
                        )}
                    </li>
                </ul>

            </div>
        </nav>
    );
}