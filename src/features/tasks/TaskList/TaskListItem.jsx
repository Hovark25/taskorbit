import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../../components/Button/Button.jsx";
import Tag from "../../../components/Tag/Tag.jsx";
import styles from "./TaskListItem.module.css";

function priorityTone(priority) {
  if (priority === "high") return "danger";
  if (priority === "medium") return "warn";
  return "neutral";
}

function priorityText(priority) {
  if (priority === "high") return "Высокий";
  if (priority === "medium") return "Средний";
  return "Низкий";
}

export default function TaskListItem({ task, onToggle, onEdit, onDelete }) {
  const titleClass = task.completed ? styles.titleDone : styles.title;

  return (
    <motion.li
      className={styles.item}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.15 }}
    >
      <label className={styles.left}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-label="Переключить выполнение"
        />
        <div className={styles.content}>
          <Link className={titleClass} to={`/tasks/${task.id}`}>
            {task.title}
          </Link>
          <div className={styles.meta}>
            <Tag tone={priorityTone(task.priority)}>{priorityText(task.priority)}</Tag>
            {task.dueDate ? <span className={styles.due}>до {task.dueDate}</span> : <span className={styles.dueMuted}>без дедлайна</span>}
          </div>
        </div>
      </label>

      <div className={styles.actions}>
        <Button variant="ghost" onClick={() => onEdit(task)} type="button">
          Редакт.
        </Button>
        <Button variant="danger" onClick={() => onDelete(task.id)} type="button">
          Удалить
        </Button>
      </div>
    </motion.li>
  );
}
