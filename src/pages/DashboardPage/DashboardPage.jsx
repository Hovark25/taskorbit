import { Link } from "react-router-dom";
import { useEffect, useMemo } from "react";
import PageMotion from "../../components/PageMotion/PageMotion.jsx";
import Panel from "../../components/Panel/Panel.jsx";
import Tag from "../../components/Tag/Tag.jsx";
import Button from "../../components/Button/Button.jsx";
import { useTasksStore } from "../../store/tasksStore.js";
import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
  const tasks = useTasksStore((s) => s.tasks);
  const status = useTasksStore((s) => s.status);
  const error = useTasksStore((s) => s.error);
  const fetchTasks = useTasksStore((s) => s.fetchTasks);

  useEffect(() => {
    if (tasks.length === 0) fetchTasks();
  }, [fetchTasks, tasks.length]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.completed).length;
    const active = total - done;
    const high = tasks.filter((t) => t.priority === "high" && !t.completed).length;
    return { total, done, active, high };
  }, [tasks]);

  const statusTone = status === "loading" ? "warn" : status === "error" ? "danger" : "ok";

  return (
    <PageMotion>
      <h1>Дашборд</h1>

      <div className={styles.grid}>
        <Panel title="Сводка">
          {error ? (
            <div className={styles.error}>Ошибка: {error}</div>
          ) : (
            <div className={styles.stats}>
              <div className={styles.stat}>
                <div className={styles.num}>{stats.total}</div>
                <div className={styles.lbl}>всего</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.num}>{stats.active}</div>
                <div className={styles.lbl}>активных</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.num}>{stats.done}</div>
                <div className={styles.lbl}>выполнено</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.num}>{stats.high}</div>
                <div className={styles.lbl}>высокий приоритет</div>
              </div>
            </div>
          )}

          <div className={styles.note}>
            Статус: <Tag tone={statusTone}>{status}</Tag>
          </div>

          <div className={styles.cta}>
            <Link to="/tasks">
              <Button>Перейти к задачам</Button>
            </Link>
          </div>
        </Panel>

        <Panel title="Быстрые действия">
          <p className={styles.muted}>
            Здесь можно быстро перейти к задачам и проверить статус загрузки.
          </p>
          <Link to="/tasks" className={styles.link}>
            Открыть список задач →
          </Link>
        </Panel>
      </div>
    </PageMotion>
  );
}
