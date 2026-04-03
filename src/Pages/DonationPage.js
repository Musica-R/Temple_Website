import React, { useEffect, useRef } from 'react';
import DonationForm from '../Components/DonationForm';
import { useLanguage } from "../Context/Languagecontext";
import translations from "../Json/datatranslation.json";
import '../Stylesheet/DonationPage.css';   // ← import the animation layer

export default function DonationPage() {
  const { language } = useLanguage();
  const t = translations.donationPage[language] || translations.donationPage["EN"];

  const heroImgRef = useRef(null);
  const heroContentRef = useRef(null);
  const bandRef = useRef(null);

  /* ── Parallax scroll handler ─────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      // Image scrolls at 30% of page speed (moves up slowly)
      if (heroImgRef.current) {
        heroImgRef.current.style.transform = `scale(1.12) translateY(${y * 0.30}px)`;
      }

      // Hero text rises + fades as user scrolls away
      if (heroContentRef.current) {
        const opacity = Math.max(0, 1 - y / 360);
        const translateY = y * 0.16;
        heroContentRef.current.style.opacity = opacity;
        heroContentRef.current.style.transform =
          `translate(-50%, calc(-50% + ${translateY}px))`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Intersection Observer — adds .dp-in to everything ─────── */
  useEffect(() => {
    const selectors = [
      '.dp-verse-band',
      '.dp-reveal',
      '.dp-reveal-left',
      '.dp-reveal-right',
      '.dp-reveal-scale',
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
      { threshold: 0.10, rootMargin: '0px 0px -55px 0px' }
    );

    selectors.forEach((sel) =>
      document.querySelectorAll(sel).forEach((el) => observer.observe(el))
    );

    return () => observer.disconnect();
  }, []);

  /* ── Magnetic cursor effect for buttons ──────────────────────── */
  useEffect(() => {
    const btns = document.querySelectorAll('.cta-btn, .donate-btn, .gpay-btn');
    const onMove = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 100;
      const my = ((e.clientY - r.top) / r.height) * 100;
      e.currentTarget.style.setProperty('--mx', `${mx}%`);
      e.currentTarget.style.setProperty('--my', `${my}%`);
    };
    btns.forEach((b) => b.addEventListener('mousemove', onMove));
    return () => btns.forEach((b) => b.removeEventListener('mousemove', onMove));
  }, []);

  return (
    <div className="dp-page">

      {/* ══ HERO ════════════════════════════════════════════════════ */}
      <div className="ourheritage dp-hero">

        <img
          src="/assets/about.jpg"
          alt="Temple"
          className="hero-img dp-parallax-img"
          ref={heroImgRef}
        />
        <div className="ourheritage-overlay dp-hero-overlay" />

        {/* Floating embers */}
        <div className="dp-particles" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="dp-ember" />
          ))}
        </div>

        <div className="ourheritage-content dp-hero-content" ref={heroContentRef}>
          <span className="dp-hero-tag">{t.heroTag}</span>
          <h1 className="dp-hero-title">{t.heroTitle}</h1>
          <p className="hero-sub dp-hero-sub">{t.heroSub}</p>
          <div className="ourheritage-breadcrumb dp-hero-breadcrumb">
            <span>{t.breadcrumb.home}</span>
            <span className="ourheritage-dot">ॐ</span>
            <span className="ourheritage-active">{t.breadcrumb.active}</span>
          </div>
        </div>

        {/* Scroll breath indicator */}
        <div className="dp-scroll-cue" aria-hidden="true">
          <div className="dp-scroll-track">
            <span className="dp-scroll-fill" />
          </div>
          <span className="dp-scroll-cap" />
        </div>
      </div>

      {/* ══ VERSE BAND ════════════════════════════════════════════ */}
      <div className="gallery-verse-band dp-verse-band" ref={bandRef}>
        <div className="verse-inner dp-verse-inner">
          <span className="verse-om">ॐ</span>
          <p>{t.verse}</p>
        </div>
      </div>

      {/* ══ DONATION FORM ════════════════════════════════════════ */}
      <DonationForm />

    </div>
  );
}