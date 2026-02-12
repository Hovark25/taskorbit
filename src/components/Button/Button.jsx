import styles from "./Button.module.css";

export default function Button({ variant = "primary", type = "button", disabled, onClick, children }) {
  const className = variant === "ghost" ? styles.ghost : variant === "danger" ? styles.danger : styles.primary;

  return (
    <button type={type} className={className} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
}
