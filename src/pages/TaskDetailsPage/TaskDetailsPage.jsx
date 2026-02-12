import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PageMotion from "../../components/PageMotion/PageMotion.jsx";
import Panel from "../../components/Panel/Panel.jsx";
import Button from "../../components/Button/Button.jsx";
import Checkbox from "../../components/Checkbox/Checkbox.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import TaskForm from "../../features/tasks/TaskForm/TaskForm.jsx";
import InlineAlert from "../../components/InlineAlert/InlineAlert.jsx";
import Tag from "../../components/Tag/Tag.jsx";
import { useTasksStore } from "../../store/tasksStore.js";
import styles from "./TaskDetailsPage.module.css";

function priorityText(priority) {
  if (priority === "high") return "Высокий";
  if (priority === "medium") return "Средний";
  return "Низкий";
}

function priorityTone(priority) {
  if (priority === "high") return "danger";
  if (priority === "medium") return "warn";
  return "neutral";
}

export default function TaskDetailsPage() {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const status = useTasksStore((s) => s.status);
  const error = useTasksStore((s) => s.error);
  const getTaskById = useTasksStore((s) => s.getTaskById);
  const fetchTaskById = useTasksStore((s) => s.fetchTaskById);
  const updateTask = useTasksStore((s) => s.updateTask);
  const removeTask = useTasksStore((s) => s.removeTask);

  const task = getTaskById(taskId);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!task) fetchTaskById(taskId);
  }, [fetchTaskById, task, taskId]);

  const busy = status === "saving" || status === "loading";

  const meta = useMemo(() => {
    if (!task) return null;
    return {
      priority: priorityText(task.priority),
      priorityTone: priorityTone(task.priority),
      due: task.dueDate || "без дедлайна",
      created: task.createdAt ? String(task.createdAt).slice(0, 10) : "-"
    };
  }, [task]);

  const openEdit = useCallback(() => setModalOpen(true), []);
  const closeEdit = useCallback(() => setModalOpen(false), []);

  const toggleCompleted = useCallback(async () => {
    if (!task) return;
    await updateTask(task.id, { completed: !task.completed });
  }, [task, updateTask]);

  const saveEdits = useCallback(
    async (payload) => {
      if (!task) return;
      await updateTask(task.id, payload);
      setModalOpen(false);
    },
    [task, updateTask]
  );

  const handleDelete = useCallback(async () => {
    if (!task) return;
    await removeTask(task.id);
    navigate("/tasks", { replace: true });
  }, [navigate, removeTask, task]);

  return (
    <PageMotion>
      <div className={styles.top}>
        <div className={styles.left}>
          <Link to="/tasks" className={styles.back}>
            ← Назад
          </Link>
          <h1 className={styles.h1}>Детали задачи</h1>
        </div>

        <div className={styles.actions}>
          <Button variant="ghost" onClick={openEdit} disabled={!task || busy}>
            Редактировать
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={!task || busy}>
            Удалить
          </Button>
        </div>
      </div>

      <Panel
        title={task ? task.title : "Загрузка..."}
        right={task ? <Tag tone={meta.priorityTone}>{meta.priority}</Tag> : null}
      >
        {error && <InlineAlert>Ошибка: {error}</InlineAlert>}

        {!task ? (
          <div className={styles.muted}>Задача не найдена или ещё загружается.</div>
        ) : (
          <div className={styles.content}>
            <Checkbox
              checked={task.completed}
              onChange={toggleCompleted}
              label={task.completed ? "Выполнено" : "Не выполнено"}
            />

            <div className={styles.meta}>
              <div>
                <div className={styles.metaLabel}>Дедлайн</div>
                <div>{meta.due}</div>
              </div>
              <div>
                <div className={styles.metaLabel}>Создано</div>
                <div>{meta.created}</div>
              </div>
            </div>

            {task.description ? (
              <div className={styles.desc}>{task.description}</div>
            ) : (
              <div className={styles.muted}>Описание отсутствует.</div>
            )}
          </div>
        )}
      </Panel>

      <Modal title="Редактирование" open={modalOpen} onClose={closeEdit}>
        <TaskForm initialTask={task} busy={busy} onCancel={closeEdit} onSubmit={saveEdits} />
      </Modal>
    </PageMotion>
  );
}
