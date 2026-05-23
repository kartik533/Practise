import { useRef, useState } from 'react';

export const images = [
  {
    src: 'https://picsum.photos/id/600/600/400',
    alt: 'Forest',
  },
  {
    src: 'https://picsum.photos/id/100/600/400',
    alt: 'Beach',
  },
  {
    src: 'https://picsum.photos/id/200/600/400',
    alt: 'Yak',
  },
  {
    src: 'https://picsum.photos/id/300/600/400',
    alt: 'Hay',
  },
  {
    src: 'https://picsum.photos/id/400/600/400',
    alt: 'Plants',
  },
  {
    src: 'https://picsum.photos/id/500/600/400',
    alt: 'Building',
  },
];

export function Carousel() {
  const [index, setIndex] = useState(0);
  const refs = useRef([]);

  const handleChangeImage = (index) => {
    const next = index % images.length;
    setIndex(next);

    refs.current[next].scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    });
  };

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
      <button className="carousel-button button-left" onClick={() => handleChangeImage(index - 1)}>
        &#10094;
      </button>
      <button className="carousel-button button-right" onClick={() => handleChangeImage(index + 1)}>
        &#10095;
      </button>
    </div>
  );
}
