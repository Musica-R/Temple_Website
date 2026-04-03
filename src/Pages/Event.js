import React, { useState, useEffect, useRef } from 'react';
import '../Stylesheet/Event.css';

const events = [
  {
    day: '11', month: 'Feb', weekday: 'Wednesday',
    title: 'Kanyaar · Flag Hoisting · Festival Inauguration',
    time: 'Evening 6:30 onwards',
    special: false,
    details: [
      { label: 'Kanyaar', text: 'Bell Ringing Ceremony (Mani Idal Chandi)' },
      { label: 'Utsava Kodiyerum', text: 'Festival Flag Hoisting' },
      { label: null, text: 'Under the chief supervision of Temple Melshanthi Sri A.M. Sreejith Namboothiri' },
      { label: 'Sarvaiswarya Vilakku Puja', text: 'Special inaugural lamp worship' },
    ],
  },
  {
    day: '13', month: 'Feb', weekday: 'Friday',
    title: 'Muthal Vilakk · Aviyal Dal',
    time: 'First Lamp Ceremony',
    special: false,
    details: [
      { label: 'Muthal Vilakk', text: 'Lighting of the First Lamp' },
      { label: 'Aviyal Dal', text: 'Traditional offering ceremony' },
    ],
  },
  {
    day: '14', month: 'Feb', weekday: 'Saturday',
    title: 'Cultural Inauguration · Ottanthullal · Nrithyarchana',
    time: '6:30 PM · 7:00 PM · 8:00–9:30 PM',
    special: false,
    details: [
      { label: null, text: 'Cultural Programmes Inauguration' },
      { label: 'Ottanthullal', text: 'by Kumari Varna Muthethath · Dedicated by Sri. Satish Kumar Muthethath' },
      { label: 'Nrithyarchana', text: 'Natya Kshetra, Chittur · Kalamandalam Srimathi Jansisanuvum and others' },
    ],
  },
  {
    day: '15', month: 'Feb', weekday: 'Sunday',
    title: 'Varivozhuththu · Dance Evening',
    time: 'Shivarathri Auspicious Time',
    special: false,
    details: [
      { label: 'Varivozhuththu', text: 'During Shivarathri auspicious time — special puja at Shiva Temple at 10 o\'clock' },
      { label: 'Nrithasandya', text: 'Dance Evening by Chilanka Dance & Art Academy' },
    ],
  },
  {
    day: '16', month: 'Feb', weekday: 'Monday',
    title: 'Nritta Nrithyangal – Dance Performances',
    time: 'Classical & Folk Dance',
    special: false,
    details: [
      { label: null, text: 'Kumari Devanna V. Pothuvaal' },
      { label: null, text: 'Kumari Gayathri Prasfilith – Dance School, Sas Nritta Peedom' },
      { label: null, text: 'Mudra School of Dance' },
      { label: null, text: 'Sreelakshmi Nritta Kalayam, Puthusheri' },
    ],
  },
  {
    day: '17', month: 'Feb', weekday: 'Tuesday',
    title: 'Cheriya Kummatti · Devotional Music Evening',
    time: 'Evening 6:30 – Avataranam',
    special: false,
    details: [
      { label: 'Cheriya Kummatti', text: 'Small Kummatti Procession' },
      { label: 'Bhakthiganamelam', text: 'Flowers Top Singer Fame (Season 1) Sreebhuvanum and others' },
      { label: null, text: 'Dedicated by Sri. Narayanan & Srimathi. Shantha Narayanan, Chatham House, Chakkattupaara' },
    ],
  },
  {
    day: '18', month: 'Feb', weekday: 'Wednesday',
    title: 'Dance Spectacle · Mohiniattam',
    time: 'Avataranam',
    special: false,
    details: [
      { label: null, text: 'Kalamandalam Anjali & Krishna Ayush presenting a classical dance spectacle' },
      { label: 'Mohiniattam', text: 'Performed by Varna Muthethath Puthusheri' },
    ],
  },
  {
    day: '19', month: 'Feb', weekday: 'Thursday',
    title: 'Ezhaam Vilakk – Seventh Lamp',
    time: 'Evening 6:30 – Avataranam',
    special: false,
    details: [
      { label: 'Ezhaam Vilakk', text: 'The Seventh Lamp Ceremony' },
      { label: null, text: 'Various Cultural Performances by Puthusheri Residents' },
    ],
  },
  {
    day: '20', month: 'Feb', weekday: 'Friday',
    title: 'Valiya Kummatti · Grand Procession · Bhagavathi Neeraattal',
    time: 'Morning 10:00 · Afternoon 2:30 · Evening 6:20 · Night 9:00',
    special: true,
    details: [
      { label: 'Valiya Kummatti', text: 'Grand Kummatti Festival' },
      { label: 'Bhagavathi Neeraattal', text: 'Kummatti figures from Puthusheri Vekkurushi Bhagavathi Temple and Puthukkulangara Bhagavathi Temple placed in the paddy field' },
      { label: 'Kudiyarkkol (Eve. 6:20)', text: 'Kummatti figures, Malavilakk, Vannarabhootham, Elephant procession & Melam from Vekkurushi Bhagavathi Temple' },
      { label: 'Night 9:00', text: 'Grand conclusion with Pandimela at Vadasheri Temple' },
    ],
  },
  {
    day: '21', month: 'Feb', weekday: 'Saturday',
    title: 'Malama · Cultural Performances',
    time: 'Evening 6:30 – Avataranam',
    special: false,
    details: [
      { label: 'Malama', text: 'Sacred Malama Ceremony' },
      { label: null, text: 'Various Cultural Performances by Puthusheri Residents' },
    ],
  },
  {
    day: '22', month: 'Feb', weekday: 'Sunday',
    title: 'Shodana Vela · Double Thayambaka',
    time: 'Evening 6:30 – Avataranam',
    special: false,
    details: [
      { label: 'Shodana Vela', text: 'Ceremonial Purification Procession' },
      { label: 'Double Thayambaka', text: 'Percussion Performance by Panamanna Shashi & Cherppulasheri Rajesh' },
    ],
  },
  {
    day: '23', month: 'Feb', weekday: 'Monday',
    title: '🔥 Vedi Utsavam – Grand Fireworks Festival',
    time: 'Morning 4:00 · 5:00 · Evening 4:00 · 6:00 · Night 12:00',
    special: true,
    details: [
      { label: 'Keli Pattu', text: 'Held at Ullattukavil' },
      { label: 'Shodana Vela', text: 'Begins from Ullattukavil. Ganapathihomam, Special Puja & 101 Coconut Abhishekam under Brahmasri Andiladi Manaykkil Parameshvaran Namboothirippad' },
      { label: null, text: 'Shodana Vela procession and Chettiarkambu arrive at the temple' },
      { label: 'Keli (Eve. 4–6)', text: 'Grand procession with Elephants, Panchavatya, Paravadya, Malavilakk, Vannarabhootham, Thattinmel Koothu, Theyyam & Muthalaayavam' },
      { label: 'Night 12:00', text: 'Procession of Sri Parukancheri & Sri Koottekad Bhagavathi deities' },
    ],
  },
];

function EventCard({ event, index }) {
  const [open, setOpen] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), index * 60);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const cardClass = [
    'event-card',
    event.special ? 'event-special' : '',
    open ? 'open' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClass} ref={cardRef}>
      <div className="card-header" onClick={() => setOpen(!open)}>
        <div className="date-badge">
          <div className="date-num">{event.day}</div>
          <div className="date-month">{event.month}</div>
          <div className="date-weekday">{event.weekday}</div>
        </div>
        <div className="card-sep" />
        <div className="card-meta">
          <div className="event-title">{event.title}</div>
          <div className="event-time-tag">{event.time}</div>
        </div>
        <div className="expand-btn" aria-label={open ? 'Collapse' : 'Expand'}>▾</div>
      </div>
      <div className="card-body">
        <ul className="detail-list">
          {event.details.map((d, i) => (
            <li key={i}>
              <span className="detail-dot">◆</span>
              <span>
                {d.label && <strong>{d.label} — </strong>}
                {d.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Event() {
  return (
    <div className="event-page">
      {/* ── HERO ── */}
      <header className="event-hero">
        <p className="hero-overline">Puthusheri Bhagavathi Temple · Kerala</p>
        <h1 className="hero-title">Vedi Utsavam</h1>
        <p className="hero-subtitle">14th Annual Temple Festival</p>
        <div className="hero-date-pill">11 February — 24 February 2026</div>
        <div className="hero-lamps">
          {['🪔', '🪔', '🪔', '🪔', '🪔'].map((l, i) => (
            <span className="lamp-icon" key={i}>{l}</span>
          ))}
        </div>
      </header>

      {/* ── SCHEDULE ── */}
      <main className="event-content">
        <div className="section-divider">
          <div className="divider-line" />
          <span className="divider-label">Programme Schedule</span>
          <div className="divider-line" />
        </div>

        {events.map((event, i) => (
          <EventCard key={i} event={event} index={i} />
        ))}

        {/* ── GRAND FINALE ── */}
        <div className="finale-block">
          <p className="finale-overline">Grand Culmination</p>
          <div className="finale-date-num">24 February 2026 — Tuesday</div>
          <p className="finale-desc">
            Morning 6:00 &nbsp;·&nbsp; Afternoon 1:00 &nbsp;·&nbsp; Evening 7:30<br />
            Conclusion of the <em>14th Vedi Festival</em>
          </p>
          <div className="finale-tags">
            <span className="finale-tag">Chettiarkambu Kathikkal</span>
            <span className="finale-tag">Torch Lighting Ceremony</span>
            <span className="finale-tag">Eedu Vedi – Salute Firing</span>
            <span className="finale-tag">Festival Valediction</span>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="event-footer">
        Puthusheri Bhagavathi Temple &nbsp;·&nbsp; 14th Vedi Utsavam 2026
      </footer>
    </div>
  );
}