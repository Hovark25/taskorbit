import styles from "./InlineAlert.module.css";

export default function InlineAlert({ tone = "danger", children }) {
  const className = tone === "warn" ? styles.warn : tone === "ok" ? styles.ok : styles.danger;
  return <div className={className}>{children}</div>;
}
