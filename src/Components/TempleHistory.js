import "../Stylesheet/TempleHistory.css";
import historyData from "../Data/historyData";
import { useEffect, useRef } from "react";
import { useLanguage } from "../Context/Languagecontext";

/* ─────────────────────────────────────────
   Split heading text into animated .char spans
───────────────────────────────────────── */
function splitHeadingChars(el) {
    if (!el || el.dataset.split === "done") return;
    el.dataset.split = "done";
    const text = el.textContent;
    el.textContent = "";
    [...text].forEach((ch) => {
        if (ch === " ") {
            const sp = document.createElement("span");
            sp.className = "char-space";
            el.appendChild(sp);
        } else {
            const span = document.createElement("span");
            span.className = "char";
            span.textContent = ch;
            el.appendChild(span);
        }
    });
}

/* ─────────────────────────────────────────
   Stagger-reveal .char elements
───────────────────────────────────────── */
function revealChars(el, baseDelay = 0) {
    if (!el) return;
    el.querySelectorAll(".char").forEach((c, i) => {
        setTimeout(() => c.classList.add("show"), baseDelay + i * 45);
    });
}

/* ─────────────────────────────────────────
   Wrap each word in .word spans (for h2 cascade)
───────────────────────────────────────── */
function wrapWords(el) {
    if (!el || el.dataset.words === "done") return;
    el.dataset.words = "done";
    const words = el.textContent.split(" ");
    el.textContent = "";
    words.forEach((w, i) => {
        const span = document.createElement("span");
        span.className = "word";
        span.textContent = w;
        span.style.transitionDelay = `${0.15 + i * 0.06}s`;
        el.appendChild(span);
        if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
}

export default function TempleHistory() {
    const { language } = useLanguage();
    const data = historyData[language] || historyData["EN"];

    const scrollDir = useRef("down");
    const lastScrollY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
    const rafId = useRef(null);

    useEffect(() => {
        /* ── 1. Scroll direction tracker ── */
        const onScroll = () => {
            const cur = window.scrollY;
            scrollDir.current = cur > lastScrollY.current ? "down" : "up";
            lastScrollY.current = cur;
        };
        window.addEventListener("scroll", onScroll, { passive: true });

        /* ── 2. Heading: split + stagger chars ── */
        // const h1 = document.querySelector(".history-heading h1");
        // splitHeadingChars(h1);
        // const heading = document.querySelector(".history-heading");
        // requestAnimationFrame(() => {
        //     setTimeout(() => {
        //         heading?.classList.add("heading-show");
        //         revealChars(h1, 80);
        //     }, 200);
        // });

        /* ── 3. Wrap h2 words for each block ── */
        document.querySelectorAll(".history-block .history-text h2").forEach(wrapWords);

        /* ── 4. IntersectionObserver for blocks ── */
        const blocks = document.querySelectorAll(".history-block");

        // Reset all blocks
        blocks.forEach((el) => {
            el.classList.remove(
                "visible", "from-bottom", "from-top",
                "exit-top", "exit-bottom"
            );
            el.classList.add("from-bottom");
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const el = entry.target;
                    const dir = scrollDir.current;

                    if (entry.isIntersecting) {
                        // Set direction class before reveal so clip-path is correct
                        el.classList.remove("from-bottom", "from-top", "exit-top", "exit-bottom");
                        el.classList.add(dir === "up" ? "from-top" : "from-bottom");

                        requestAnimationFrame(() => {
                            el.classList.add("visible");
                        });
                    } else {
                        el.classList.remove("visible");

                        // Exit direction
                        if (dir === "down") {
                            // Block is scrolling off the top
                            el.classList.add("exit-top");
                            el.classList.remove("exit-bottom");
                        } else {
                            // Block is scrolling off the bottom
                            el.classList.add("exit-bottom");
                            el.classList.remove("exit-top");
                        }

                        // Prep for next entry with correct direction
                        el.classList.remove("from-bottom", "from-top");
                        el.classList.add(dir === "down" ? "from-bottom" : "from-top");
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
        );

        blocks.forEach((el) => observer.observe(el));

        /* ── 5. Parallax on scroll (image translateY) ── */
        const onParallax = () => {
            document.querySelectorAll(".history-image").forEach((img) => {
                const rect = img.getBoundingClientRect();
                const mid = rect.top + rect.height / 2;
                const vMid = window.innerHeight / 2;
                const ratio = (mid - vMid) / window.innerHeight; // -0.5 to +0.5
                const py = (ratio * 40).toFixed(2); // ±20px range
                const inner = img.querySelector(".history-image-inner");
                if (inner) inner.style.setProperty("--py", `${py}px`);
            });
        };

        window.addEventListener("scroll", onParallax, { passive: true });
        onParallax(); // init

        /* ── 6. Magnetic 3D tilt on image hover ── */
        const onMouseMove = (e) => {
            const el = e.currentTarget;
            const inner = el.querySelector(".history-image-inner");
            if (!inner) return;
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            inner.style.setProperty("--ry", `${(x * 14).toFixed(2)}deg`);
            inner.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
        };

        const onMouseLeave = (e) => {
            const inner = e.currentTarget.querySelector(".history-image-inner");
            if (!inner) return;
            inner.style.setProperty("--rx", "0deg");
            inner.style.setProperty("--ry", "0deg");
        };

        const imageEls = document.querySelectorAll(".history-image");
        imageEls.forEach((el) => {
            el.addEventListener("mousemove", onMouseMove);
            el.addEventListener("mouseleave", onMouseLeave);
        });

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("scroll", onParallax);
            imageEls.forEach((el) => {
                el.removeEventListener("mousemove", onMouseMove);
                el.removeEventListener("mouseleave", onMouseLeave);
            });
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [language]);

    return (
        <section className="history-wrapper">

            {/* ===== HEADING ===== */}
            <div className="history-heading">
                <h1 style={{color:"brown"}}>
                    {language === "ML" ? "ഞങ്ങളുടെ പൈതൃകം" :
                        language === "TA" ? "எங்கள் புனித பாரம்பரியம்" :
                            "Our Heritage"}
                </h1>
                <div className="divider" />
                <p>
                    {language === "ML"
                        ? "ശ്രീകുരുംബ കാവിന്റെ ദൈവിക പൈതൃകം, പാരമ്പര്യങ്ങൾ, കാലാതീതമായ കഥകൾ എന്നിവ അന്വേഷിക്കുക"
                        : language === "TA"
                            ? "ஸ்ரீகுரும்பா காவின் தெய்வீக மரபு, பாரம்பரியங்கள் மற்றும் காலமற்ற கதைகளை கண்டறியுங்கள்"
                            : "Discover the divine legacy, traditions, and timeless stories of Sreekurumba Kaavu"}
                </p>
            </div>

            {/* ===== HISTORY BLOCKS ===== */}
            {data.map((item, index) => (
                <div
                    className={`history-block ${index % 2 !== 0 ? "reverse" : ""}`}
                    key={`${language}-${index}`}
                >
                    {/* IMAGE */}
                    <div className="history-image">
                        <div className="history-image-inner">
                            <img src={item.image} alt={item.title} loading="lazy" />
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="history-text">
                        <h2>{item.title}</h2>
                        <p className="highlight">{item.content[0]}</p>
                        <div className="history-extra">
                            {item.content.slice(1).map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

        </section>
    );
}