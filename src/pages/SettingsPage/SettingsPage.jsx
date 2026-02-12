import PageMotion from "../../components/PageMotion/PageMotion.jsx";
import Panel from "../../components/Panel/Panel.jsx";
import Select from "../../components/Select/Select.jsx";
import Field from "../../components/Field/Field.jsx";
import { useTheme } from "../../components/ThemeGate/ThemeGate.jsx";
import styles from "./SettingsPage.module.css";

const themeOptions = [
  { value: "dark", label: "Тёмная" },
  { value: "light", label: "Светлая" }
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <PageMotion>
      <h1>Настройки</h1>

      <div className={styles.grid}>
        <Panel title="Интерфейс">
          <Field label="Тема">
            <Select value={theme} onChange={setTheme} options={themeOptions} />
          </Field>
          <p className={styles.muted}>
            Тема сохраняется в браузере и не сбрасывается после обновления страницы.
          </p>
        </Panel>

        <Panel title="О проекте">
          <p className={styles.muted}>
            Учебное SPA для управления задачами: создание, редактирование, удаление, фильтры и поиск.
          </p>
        </Panel>
      </div>
    </PageMotion>
  );
}
