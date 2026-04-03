import React from 'react'
import "../Stylesheet/OurHeritage.css"
import PoojaForm from '../Components/PoojaForm'
import Pooja from '../Components/Pooja'

export default function BookPooja() {
  return (
    <div>
      <div className="ourheritage">
        <img src="/assets/about.jpg" alt="Temple" className="hero-img" />
        <div className="ourheritage-overlay"></div>
        <div className="ourheritage-content">
          <span className="hero-tag">Sacred Glimpses</span>
          <h1>Book Seva</h1>
          <p className="hero-sub">Every sight is a blessing</p>
          <div className="ourheritage-breadcrumb">
            <span>HOME</span>
            <span className="ourheritage-dot">ॐ</span>
            <span className="ourheritage-active">Book Seva</span>
          </div>
        </div>
      </div>

      {/* ── INTRO VERSE BAND ── */}
      <div className="gallery-verse-band">
        <div className="verse-inner">
          <span className="verse-om">ॐ</span>
          <p>"Where the lamp burns eternal, where fragrance rises with the dawn, where stone speaks in silence — this is the house of the divine."</p>
        </div>
      </div>
      <PoojaForm />
      <Pooja />
    </div>
  )
}
