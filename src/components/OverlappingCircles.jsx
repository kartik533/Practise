import { useState } from "react";

const RADII = 80;

function distanceBetweenTwoCircles(p1, p2) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
}

function getRandomColor() {
  return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

export function OverlappingCircles({}) {
  const [circles, setCircles] = useState([]); // store array of circle objects;

  const handleClick = (e) => {
    const newCircle = {
      x: e.clientX,
      y: e.clientY,
      isOverlapping: false,
      background: getRandomColor(),
    };

    let newData = [...circles];

    newData = newData.map((circle, ind) => {
      if (distanceBetweenTwoCircles(circle, newCircle) < RADII) {
        newCircle.isOverlapping = true;
        newCircle.background = circle.background;
        circle.isOverlapping = true;
      }
      return circle;
    });

    newData.push(newCircle);

    setCircles(newData);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
      }}
    >
      {circles.map((circle, ind) => {
        return (
          <div
            key={ind}
            style={{
              height: `${RADII}px`,
              width: `${RADII}px`,
              border: "1px solid red",
              background: `${circle.background}`,
              opacity: 0.5,
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              position: "absolute",
              top: `${circle.y}px`,
              left: `${circle.x}px`,
            }}
          />
        );
      })}
    </div>
  );
}
