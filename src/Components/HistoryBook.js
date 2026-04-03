import HTMLFlipBook from "react-pageflip";
import { useRef, useEffect, useState } from "react";
import "../Stylesheet/History.css";
import { useLanguage } from "../Context/Languagecontext";
import bookData from "../Json/Bookdata.json";

export default function OlaiRealBook() {
  const bookRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const { language } = useLanguage();
  const langKey = (language || "EN").toUpperCase();
  const rawData = bookData[langKey] || bookData["EN"];
  const headingData = rawData[0];
  const pagesData = rawData.slice(1);

  /* ── RESPONSIVE SIZE + MOBILE DETECTION ───────────────── */
  const [bookSize, setBookSize] = useState({ width: 550, height: 420 });

  useEffect(() => {
    const updateSize = () => {
      const w = window.innerWidth;
      const mobile = w <= 768;
      setIsMobile(mobile);

      if (w <= 380) {
        setBookSize({ width: w - 32, height: Math.round((w - 32) * 1.35) });
      } else if (w <= 480) {
        setBookSize({ width: w - 40, height: Math.round((w - 40) * 1.3) });
      } else if (w <= 768) {
        setBookSize({ width: Math.min(420, w - 48), height: 520 });
      } else if (w <= 1024) {
        setBookSize({ width: 480, height: 420 });
      } else {
        setBookSize({ width: 550, height: 420 });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  /* ── AUTO-FLIP ON LOAD ─────────────────────────────────── */
  useEffect(() => {
    setTimeout(() => {
      bookRef.current?.pageFlip().flipNext();
    }, 700);
  }, []);

  /* ── PAGE LOGIC ────────────────────────────────────────── */
  const renderPages = () => {
    const result = [];
    pagesData.forEach((section) => {
      if (section.type) { result.push(section); return; }
      section.content.forEach((text, i) => {
        result.push({
          heading: i === 0 ? section.heading : null,
          img: i === 0 ? section.img : null,
          text,
        });
      });
    });
    return result;
  };

  const pages = renderPages();

  /* ── HANDLERS ──────────────────────────────────────────── */
  const handlePrev = () => bookRef.current?.pageFlip().flipPrev();
  const handleNext = () => bookRef.current?.pageFlip().flipNext();

  const onFlip = (e) => setCurrentPage(e.data);

  const onInit = (e) => {
    setTotalPages(e.object.getPageCount());
    setCurrentPage(e.object.getCurrentPageIndex());
  };

  /* ── SPREAD COUNTER ────────────────────────────────────── */
  // In portrait (mobile), each spread = 1 page; in landscape = 2 pages
  const pagesPerSpread = isMobile ? 1 : 2;
  const spreadCurrent = Math.floor(currentPage / pagesPerSpread) + 1;
  const spreadTotal = Math.ceil(totalPages / pagesPerSpread);

  const isFirst = currentPage === 0;
  const isLast = isMobile
    ? currentPage >= totalPages - 1
    : currentPage >= totalPages - 2;

  return (
    <section className="realbook-section">

      {/* HEADING */}
      <div className="book-heading">
        <h1>{headingData.value}</h1>
        <div className="divider" />
        <p>{headingData.para}</p>
      </div>

      <div className="book-container">
        <div className={`book-scene${isMobile ? " book-scene--mobile" : ""}`}>

          {/* ── TOP HARDCOVER BOARD (desktop only) ─────── */}
          {!isMobile && (
            <div className="book-board-top">
              <div className="board-spine-left" />
              <div className="board-pages" />
              <div className="board-spine-right" />
            </div>
          )}

          {/* ── MIDDLE ROW ──────────────────────────────── */}
          <div className="book-middle">

            {!isMobile && <div className="book-spine-left" aria-hidden="true" />}
            {!isMobile && <div className="book-pages-left" aria-hidden="true" />}

            <div className="flipbook-wrap">
              <HTMLFlipBook
                key={isMobile ? "portrait" : "landscape"} // re-mount on mode change
                ref={bookRef}
                width={bookSize.width}
                height={bookSize.height}
                size="fixed"
                drawShadow={!isMobile}
                flippingTime={isMobile ? 600 : 900}
                usePortrait={isMobile}
                startZIndex={10}
                autoSize={false}
                showCover={true}
                mobileScrollSupport={true}
                className="flipbook"
                onFlip={onFlip}
                onInit={onInit}
              >
                {pages.map((page, i) => (
                  <div key={i} className="page">

                    {page.type === "cover" && (
                      <div className="cover-page">
                        <h1>{page.title}</h1>
                      </div>
                    )}

                    {page.type === "end" && (
                      <div className="end-page">
                        <h2>{page.title}</h2>
                      </div>
                    )}

                    {!page.type && (
                      <div className="page-content">
                        {page.heading && (
                          <h2 className="heading">{page.heading}</h2>
                        )}
                        {page.img && (
                          <img src={page.img} className="top-img" alt="temple" />
                        )}
                        <p className="text">{page.text}</p>
                      </div>
                    )}

                  </div>
                ))}
              </HTMLFlipBook>
            </div>

            {!isMobile && <div className="book-pages-edge" aria-hidden="true" />}
            {!isMobile && <div className="book-spine-right" aria-hidden="true" />}

          </div>{/* /book-middle */}

          {/* ── BOTTOM HARDCOVER BOARD (desktop only) ──── */}
          {!isMobile && (
            <div className="book-board-bottom">
              <div className="board-spine-left" />
              <div className="board-pages" />
              <div className="board-spine-right" />
            </div>
          )}

        </div>{/* /book-scene */}

        {/* PREV / NEXT NAVIGATION */}
        <div className="book-nav">
          <button
            className="book-nav-btn prev-btn"
            onClick={handlePrev}
            disabled={isFirst}
            aria-label="Previous page"
          >
            <span className="nav-arrow">◀</span>
            Previous
          </button>

          <span className="book-nav-counter">
            {totalPages > 0 ? `${spreadCurrent} / ${spreadTotal}` : ""}
          </span>

          <button
            className="book-nav-btn next-btn"
            onClick={handleNext}
            disabled={isLast}
            aria-label="Next page"
          >
            Next
            <span className="nav-arrow">▶</span>
          </button>
        </div>

      </div>{/* /book-container */}
    </section>
  );
}