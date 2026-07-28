import { useEffect, useRef, useState } from "react";
import galleryImages, { gallery } from "../Data/Gallery";
import "../Stylesheet/DivineGallery.css";

function GallerySection() {
  const gridRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);

  const ROW_HEIGHT = 10; // must match grid-auto-rows in CSS
  const ROW_GAP = 16;    // must match gap in CSS

  const resizeItem = (item) => {
    const grid = gridRef.current;
    const img = item.querySelector("img");
    if (!grid || !img || !img.naturalHeight) return;

    const rowSpan = Math.ceil(
      (img.getBoundingClientRect().width / img.naturalWidth) *
        img.naturalHeight /
        (ROW_HEIGHT + ROW_GAP)
    );
    item.style.gridRowEnd = `span ${rowSpan}`;
  };

  const resizeAllItems = () => {
    const grid = gridRef.current;
    if (!grid) return;
    const items = grid.querySelectorAll(".gallery-item-ch2-img-wrap");
    items.forEach(resizeItem);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeAllItems);
    return () => window.removeEventListener("resize", resizeAllItems);
  }, []);

  useEffect(() => {
    resizeAllItems();
  }, [loadedCount]);

  return (
    <div className="gallery-ch2" ref={gridRef}>
      {gallery.map((item) => (
        <div key={item.id} className="gallery-item-ch2-img-wrap">
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            onLoad={(e) => {
              resizeItem(e.target.closest(".gallery-item-ch2-img-wrap"));
              setLoadedCount((c) => c + 1);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default GallerySection;