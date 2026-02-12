import styles from "./Panel.module.css";

export default function Panel({ title, right, children }) {
  return (
    <section className={styles.panel}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.right}>{right}</div>
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
