import styles from "./TextArea.module.css";

export default function TextArea({ value, onChange, placeholder, name, rows = 4 }) {
  return (
    <textarea
      className={styles.textarea}
      name={name}
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
