import { useMemo, useState } from "react";
import Button from "../../../components/Button/Button.jsx";
import Field from "../../../components/Field/Field.jsx";
import Select from "../../../components/Select/Select.jsx";
import TextArea from "../../../components/TextArea/TextArea.jsx";
import TextInput from "../../../components/TextInput/TextInput.jsx";
import InlineAlert from "../../../components/InlineAlert/InlineAlert.jsx";
import styles from "./TaskForm.module.css";

const priorityOptions = [
  { value: "low", label: "Низкий" },
  { value: "medium", label: "Средний" },
  { value: "high", label: "Высокий" }
];

export default function TaskForm({ initialTask, busy, onCancel, onSubmit }) {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(initialTask?.description || "");
  const [priority, setPriority] = useState(initialTask?.priority || "medium");
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || "");

  const error = useMemo(() => {
    if (!title.trim()) return "Название задачи не может быть пустым";
    if (title.trim().length < 2) return "Слишком короткое название";
    return null;
  }, [title]);

  const submitDisabled = !!error || busy;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) return;
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <InlineAlert>{error}</InlineAlert>}

      <Field label="Название">
        <TextInput value={title} onChange={setTitle} placeholder="Например: Добавить страницу настроек" />
      </Field>

      <Field label="Описание">
        <TextArea value={description} onChange={setDescription} placeholder="Что нужно сделать?" rows={4} />
      </Field>

      <div className={styles.row}>
        <Field label="Приоритет">
          <Select value={priority} onChange={setPriority} options={priorityOptions} />
        </Field>

        <Field label="Дедлайн">
          <input
            className={styles.date}
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Field>
      </div>

      <div className={styles.actions}>
        <Button variant="ghost" onClick={onCancel} disabled={busy} type="button">
          Отмена
        </Button>
        <Button disabled={submitDisabled} type="submit">
          Сохранить
        </Button>
      </div>
    </form>
  );
}
