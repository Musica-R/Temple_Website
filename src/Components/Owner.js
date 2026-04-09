import "../Stylesheet/Owner.css";

import { useLanguage } from "../Context/Languagecontext";
import translations from "../Json/OwnerSection.json";

export default function OwnerSection() {

  const { language } = useLanguage();
  const t = translations.ownerSection[language] || translations.ownerSection["EN"];

  return (
    <div className="owner-section">
      
      {/* Top Banner */}
      <div className="owner-banner">
        <img src="/assets/about.jpg" alt="banner" />
      </div>

      {/* Content Card */}
      <div className="owner-card">
        
        {/* Owner Image */}
        <div className="owner-image">
          <img src="/assets/pic1.jpeg" alt="Owner" />
        </div>

        {/* Name */}
        <h2 className="owner-name">{t.name}</h2>

        {/* Description */}
        <p className="owner-description">
          {t.description}
        </p>

      </div>
    </div>
  );
}