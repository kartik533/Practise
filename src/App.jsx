import { OverlappingCircles } from "./components/OverlappingCircles";
import { Children, cloneElement, useState } from "react";

function App() {
  return <OverlappingCircles />;
}

function Accordion({ children }) {
  const [current, setCurrent] = useState(null);
  const items = Children.toArray(children);

  return (
    <div>
      {items.map((item, ind) => {
        return cloneElement(item, {
          visible: ind === current,
          onClick: () => {
            setCurrent(ind === current ? null : ind);
          },
        });
      })}
    </div>
  );
}

function AccordionItem({ visible, children, onClick, title }) {
  return (
    <div className="accordion">
      <button className="accordion-toggle" onClick={onClick}>
        {title}
      </button>
      {visible && <div className="accordion-content">{children}</div>}
    </div>
  );
}

export default App;
