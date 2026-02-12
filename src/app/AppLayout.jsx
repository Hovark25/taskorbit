import { NavLink } from "react-router-dom";
import styles from "./AppLayout.module.css";
import ThemeGate from "../components/ThemeGate/ThemeGate.jsx";

const linkClass = ({ isActive }) => (isActive ? styles.linkActive : styles.link);

export default function AppLayout({ children }) {
  return (
    <ThemeGate>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.brand}>TaskOrbit</div>
          <nav className={styles.nav}>
            <NavLink to="/" className={linkClass} end>
              Дашборд
            </NavLink>
            <NavLink to="/tasks" className={linkClass}>
              Задачи
            </NavLink>
            <NavLink to="/settings" className={linkClass}>
              Настройки
            </NavLink>
          </nav>
        </header>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          <span>SPA на React + Vite</span>
        </footer>
      </div>
    </ThemeGate>
  );
}
