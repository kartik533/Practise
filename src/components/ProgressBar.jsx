import { useEffect, useRef, useState } from "react";

const INTERVAL = 3000;
const MAX = 3;

export function ProgressBar() {
  const [count, setCount] = useState(0);
  const [filled, setFilled] = useState(0);
  return (
    <div>
      <div>
        {Array(count)
          .fill("_")
          .map((_, ind) => {
            return (
              <Bar
                key={{ ind }}
                isEmpty={ind >= MAX + filled}
                onCompleted={() => setFilled((prev) => prev + 1)}
              />
            );
          })}
      </div>
      <button onClick={() => setCount((prev) => prev + 1)}>Click</button>
    </div>
  );
}

function Bar({ isEmpty, onCompleted }) {
  const ref = useRef(null);

  useEffect(() => {
    if (isEmpty) return;
    const bar = ref.current;
    let width = 0;

    const timer = setInterval(() => {
      if (width === 100) {
        clearInterval(timer);
        onCompleted();
        return;
      }
      width += 1;
      bar.style.width = width + "%";
    }, INTERVAL / 100);

    return () => clearInterval(timer);
    // If you wrap onCompleted with useCallback, then it can be added to dependency array
  }, [isEmpty]);

  return (
    <div className="bar-container">
      <div ref={ref} className="bar" />
    </div>
  );
}
