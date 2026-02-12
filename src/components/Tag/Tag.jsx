import styles from "./Tag.module.css";

export default function Tag({ tone = "neutral", children }) {
  const className = tone === "ok" ? styles.ok : tone === "warn" ? styles.warn : tone === "danger" ? styles.danger : styles.neutral;
  return <span className={className}>{children}</span>;
}
