import { useState, useRef } from "react";
import "./Trello.css";

const INITIAL_STATE = {
  todo: [
    {
      name: "first",
      id: crypto.randomUUID(),
    },
    {
      name: "Second",
      id: crypto.randomUUID(),
    },
    {
      name: "Third",
      id: crypto.randomUUID(),
    },
  ],
  pending: [
    {
      name: "4th",
      id: crypto.randomUUID(),
    },
    {
      name: "5th",
      id: crypto.randomUUID(),
    },
    {
      name: "6th",
      id: crypto.randomUUID(),
    },
  ],
  completed: [],
};

export function Trello() {
  const [columns, setColumns] = useState(INITIAL_STATE);
  const current = useRef(null);

  const onDrag = (startColumnName, item) => {
    current.current = { startColumnName, item };
  };

  const onDrop = (destinationColumnName) => {
    setColumns((prev) => {
      const { startColumnName, item: draggedItem } = current.current;

      const temp = { ...prev };

      temp[startColumnName] = [...temp[startColumnName]].filter(
        (item) => item.id !== draggedItem.id,
      );

      const destination = [...temp[destinationColumnName]];

      destination.push(draggedItem);

      temp[destinationColumnName] = destination;

      return temp;
    });
  };

  const handleAddItem = (columnName, value) => {
    const item = {
      name: value,
      id: crypto.randomUUID(),
    };

    setColumns((prev) => {
      const temp = { ...prev };
      temp[columnName] = [...temp[columnName], item];
      return temp;
    });
  };

  return (
    <div className="main">
      {Object.keys(columns).map((columnKey, ind) => (
        <Column
          key={columnKey}
          columnName={columnKey}
          items={columns[columnKey]}
          current={current}
          addItem={handleAddItem}
          onDrag={onDrag}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
}

function Column({ items, addItem, columnName, current, onDrag, onDrop }) {
  const inputRef = useRef("");

  const handleAddItem = () => {
    const val = inputRef.current.value;
    addItem(columnName, val);
    inputRef.current.value = "";
  };

  return (
    <div
      className="column"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        onDrop(columnName);
      }}
    >
      <h4>{columnName}</h4>
      {items.map((item, index) => {
        return (
          <div
            key={item.id}
            className="column-item"
            draggable
            onDragStart={() => onDrag(columnName, item)}
          >
            {item.name}
          </div>
        );
      })}

      <input ref={inputRef} />
      <button onClick={handleAddItem}>Add</button>
    </div>
  );
}

/*
const onDrop = (destinationColumnName, index) => {
    setColumns((prev) => {
      if (!current.current) return prev;
      const { startColumnName, item: draggedItem } = current.current;

      const temp = { ...prev };

      temp[startColumnName] = [...temp[startColumnName]].filter(
        (item) => item.id !== draggedItem.id,
      );

      console.log(index);

      const destination = [...temp[destinationColumnName]];

      if (index === -1) {
        destination.push(draggedItem);
      } else {
        destination.splice(Number(index), 0, draggedItem);
      }

      temp[destinationColumnName] = destination;

      return temp;
    });
  };
*/
