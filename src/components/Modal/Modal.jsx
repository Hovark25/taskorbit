import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import styles from "./Modal.module.css";

export default function Modal({ title, open, onClose, children }) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className={styles.backdrop} onMouseDown={onClose} role="presentation">
      <motion.div
        className={styles.modal}
        onMouseDown={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        role="dialog"
        aria-modal="true"
      >
        <div className={styles.titleRow}>
          <div className={styles.title}>{title}</div>
          <button className={styles.close} type="button" onClick={onClose} aria-label="Закрыть">
            ×
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </motion.div>
    </div>,
    document.body
  );
}
