import { useState } from "react";

const ITEM_HEIGHT = 40;
const BUFFER = 10;
const WINDOW_HEIGHT = 500;
const N = 100;

export function VirtualizedList({ list }) {
  const [scroll, setScroll] = useState(0);
  const startIndex = Math.max(0, Math.floor(scroll / ITEM_HEIGHT) - BUFFER);
  const endIndex = Math.min(
    N,
    Math.floor((scroll + WINDOW_HEIGHT) / ITEM_HEIGHT) + BUFFER,
  );

  const computedListItems = () => {
    let items = [];
    for (let i = startIndex; i < endIndex; i++) {
      items.push(
        <div
          id={i}
          key={i}
          style={{
            position: "absolute",
            top: i * ITEM_HEIGHT,
            border: "1px solid red",
            width: "80%",
            height: "40px",
          }}
        >
          List Item : {i}
        </div>,
      );
    }

    return items;
  };

  return (
    <div
      style={{
        position: "relative",
        height: WINDOW_HEIGHT,
        width: 400,
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        background: "lightgrey",
        border: "1px solid black",
        padding: "8px",
        overflow: "scroll",
      }}
      onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
    >
      {computedListItems()}
    </div>
  );
}
