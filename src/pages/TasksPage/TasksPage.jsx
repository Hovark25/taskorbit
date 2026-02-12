import { useCallback, useEffect, useMemo, useState } from "react";
import PageMotion from "../../components/PageMotion/PageMotion.jsx";
import Panel from "../../components/Panel/Panel.jsx";
import Button from "../../components/Button/Button.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import InlineAlert from "../../components/InlineAlert/InlineAlert.jsx";
import TaskFilters from "../../features/tasks/TaskFilters/TaskFilters.jsx";
import TaskForm from "../../features/tasks/TaskForm/TaskForm.jsx";
import TaskList from "../../features/tasks/TaskList/TaskList.jsx";
import { selectVisibleTasks } from "../../features/tasks/selectVisibleTasks.js";
import { useDebouncedValue } from "../../hooks/useDebouncedValue.js";
import { useTasksStore } from "../../store/tasksStore.js";
import styles from "./TasksPage.module.css";

export default function TasksPage() {
  const tasks = useTasksStore((s) => s.tasks);
  const status = useTasksStore((s) => s.status);
  const error = useTasksStore((s) => s.error);
  const filters = useTasksStore((s) => s.filters);

  const fetchTasks = useTasksStore((s) => s.fetchTasks);
  const addTask = useTasksStore((s) => s.addTask);
  const updateTask = useTasksStore((s) => s.updateTask);
  const toggleCompleted = useTasksStore((s) => s.toggleCompleted);
  const removeTask = useTasksStore((s) => s.removeTask);

  const setQuery = useTasksStore((s) => s.setQuery);
  const setStatusFilter = useTasksStore((s) => s.setStatusFilter);
  const setPriorityFilter = useTasksStore((s) => s.setPriorityFilter);
  const setSort = useTasksStore((s) => s.setSort);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const debouncedQuery = useDebouncedValue(filters.query, 200);

  const visibleTasks = useMemo(
    () => selectVisibleTasks(tasks, filters, debouncedQuery),
    [tasks, filters, debouncedQuery]
  );

  const busy = status === "saving" || status === "loading";

  const openCreate = useCallback(() => {
    setEditingTask(null);
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((task) => {
    setEditingTask(task);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingTask(null);
  }, []);

  const handleSubmit = useCallback(
    async (payload) => {
      if (editingTask) await updateTask(editingTask.id, payload);
      else await addTask(payload);

      setModalOpen(false);
      setEditingTask(null);
    },
    [addTask, editingTask, updateTask]
  );

  const handleToggle = useCallback(async (id) => {
    await toggleCompleted(id);
  }, [toggleCompleted]);

  const handleDelete = useCallback(async (id) => {
    await removeTask(id);
  }, [removeTask]);

  return (
    <PageMotion>
      <div className={styles.top}>
        <h1>Задачи</h1>
        <Button onClick={openCreate}>Добавить</Button>
      </div>

      <Panel title="Фильтры">
        <TaskFilters
          filters={filters}
          onQuery={setQuery}
          onStatus={setStatusFilter}
          onPriority={setPriorityFilter}
          onSort={setSort}
        />
      </Panel>

      <div className={styles.spacer} />

      <Panel title="Список" right={<span className={styles.muted}>{visibleTasks.length} шт.</span>}>
        {error && <InlineAlert>Ошибка: {error}</InlineAlert>}
        <TaskList tasks={visibleTasks} onToggle={handleToggle} onEdit={openEdit} onDelete={handleDelete} />
      </Panel>

      <Modal title={editingTask ? "Редактирование задачи" : "Новая задача"} open={modalOpen} onClose={closeModal}>
        <TaskForm initialTask={editingTask} busy={busy} onCancel={closeModal} onSubmit={handleSubmit} />
      </Modal>
    </PageMotion>
  );
}
