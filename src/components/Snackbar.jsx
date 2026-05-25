import { useState, useRef, useEffect, createContext, useContext } from "react";
import { createPortal } from "react-dom";

const ToastContext = createContext();

export const ToastProvider = ({ children, limit }) => {
  const [queue, setQueue] = useState([]);
  const running = useRef(null);

  const showToast = (text) => {
    let id = crypto.randomUUID();
    setQueue((prev) => {
      let toast = {
        id,
        text,
      };
      const temp = [...prev];
      return [...temp, toast];
    });
    setTimeout(() => {
      setQueue((prev) => {
        let temp = [...prev];
        return temp.filter((item) => item.id !== id);
      });
    }, 2000);
  };

  const snackBar = createPortal(
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: 200,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {queue.map((item, index) => {
        if (index > limit - 1) return null;
        return (
          <div
            style={{
              fontSize: 24,
            }}
            key={item.id}
          >
            {item.text}
          </div>
        );
      })}
    </div>,
    document.body,
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {snackBar}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
