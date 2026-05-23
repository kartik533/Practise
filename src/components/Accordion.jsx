import { Children, cloneElement, useState } from 'react';

export function Accordion({ children }) {
  const [current, setCurrent] = useState(0);
  const items = Children.toArray(children);

  return (
    <div>
      {items.map((item, ind) => {
        return cloneElement(item, {
          isOpen: ind === current,
          onToggle: () => setCurrent(ind === current ? null : ind),
        });
      })}
    </div>
  );
}

export function AccordionItem({ title, children, onToggle, isOpen }) {
  return (
    <div>
      <button className="accordion-toggle" onClick={onToggle}>
        {title}
      </button>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
}
