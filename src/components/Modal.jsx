import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

function Modal({ visible, title, children, onClose }) {
  const escHandler = useCallback(
    (e) => {
      const key = e.key;
      if (visible && key === 'Escape') {
        console.log(key);
        onClose();
      }
    },
    [onClose, visible],
  );

  useEffect(() => {
    if (!visible) return;
    document.addEventListener('keydown', escHandler);

    return () => document.removeEventListener('keydown', escHandler);
  }, [escHandler, visible]);

  if (!visible) return null;

  return createPortal(
    <div role="dialog" className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">{title}</div>
        <div className="modal-content">{children}</div>
      </div>
    </div>,
    document.body,
  );
}
