import { Link } from "react-router-dom";
import PageMotion from "../../components/PageMotion/PageMotion.jsx";
import Panel from "../../components/Panel/Panel.jsx";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <PageMotion>
      <h1>Страница не найдена</h1>
      <Panel title="404">
        <p className={styles.muted}>Такого маршрута нет.</p>
        <Link to="/" className={styles.link}>
          На главную
        </Link>
      </Panel>
    </PageMotion>
  );
}
