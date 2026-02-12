import styles from "./Select.module.css";

export default function Select({ value, onChange, name, options }) {
  return (
    <select className={styles.select} name={name} value={value} onChange={(e) => onChange(e.target.value)}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
