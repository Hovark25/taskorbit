import { AnimatePresence, motion } from "framer-motion";
import TaskListItem from "./TaskListItem.jsx";
import styles from "./TaskList.module.css";

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return <div className={styles.empty}>Пока задач нет. Добавь первую.</div>;
  }

  return (
    <motion.ul className={styles.list} layout>
      <AnimatePresence initial={false}>
        {tasks.map((task) => (
          <TaskListItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
