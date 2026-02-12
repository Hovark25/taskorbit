import styles from "./Checkbox.module.css";

export default function Checkbox({ checked, onChange, label }) {
  return (
    <label className={styles.wrap}>
      <input
        className={styles.input}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.box} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </label>
  );
}
