import { Carousel } from "./components/Carousel";
import { VirtualizedList } from "./components/VirtualizedList";
import { useToast } from "./components/Snackbar";
import { useEffect, useRef, useState } from "react";
const images = [
  {
    src: "https://picsum.photos/id/600/600/400",
    alt: "Forest",
    duration: 1,
  },
  {
    src: "https://picsum.photos/id/100/600/400",
    alt: "Beach",
    duration: 1,
  },
  {
    src: "https://picsum.photos/id/200/600/400",
    alt: "Yak",
    duration: 1,
  },
  {
    src: "https://picsum.photos/id/300/600/400",
    alt: "Hay",
    duration: 1,
  },
  {
    src: "https://picsum.photos/id/400/600/400",
    alt: "Plants",
    duration: 2,
  },
];
let count = 1;
function App() {
  const [index, setIndex] = useState(0);
  const countdown = useRef(0);
  const refs = useRef([]);

  const handleChangeImage = (index) => {
    const next = index % images.length;
    setIndex(next);

    refs.current[next].scrollIntoView({
      behavior: "smooth",
      inline: "start",
    });
  };

  useEffect(() => {
    if (index === images.length - 1) return;
    const { duration } = images[index];
    countdown.current = duration;
    setTimeout(() => handleChangeImage(index + 1), duration * 1000);
  }, [index]);

  return (
    <div className="carousel">
      <div className="carousel-image-row">
        {images.map(({ src, alt }, ind) => {
          return (
            <img
              className="carousel-image"
              ref={(el) => {
                refs.current[ind] = el;
              }}
              key={src}
              src={src}
              alt={alt}
            />
          );
        })}
      </div>
      <button
        className="carousel-button button-left"
        onClick={() => handleChangeImage(index - 1)}
      >
        &#10094;
      </button>
      <button
        className="carousel-button button-right"
        onClick={() => handleChangeImage(index + 1)}
      >
        &#10095;
      </button>
    </div>
  );
}
export default App;
