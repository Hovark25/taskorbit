import styles from "./TextInput.module.css";

export default function TextInput({ value, onChange, placeholder, name }) {
  return (
    <input
      className={styles.input}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
