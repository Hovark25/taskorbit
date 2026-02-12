import Field from "../../../components/Field/Field.jsx";
import Select from "../../../components/Select/Select.jsx";
import TextInput from "../../../components/TextInput/TextInput.jsx";
import styles from "./TaskFilters.module.css";

const statusOptions = [
  { value: "all", label: "Все" },
  { value: "active", label: "Активные" },
  { value: "completed", label: "Выполненные" }
];

const priorityOptions = [
  { value: "all", label: "Любой приоритет" },
  { value: "low", label: "Низкий" },
  { value: "medium", label: "Средний" },
  { value: "high", label: "Высокий" }
];

const sortOptions = [
  { value: "newest", label: "Сначала новые" },
  { value: "oldest", label: "Сначала старые" },
  { value: "priority", label: "По приоритету" },
  { value: "due", label: "По дедлайну" }
];

export default function TaskFilters({ filters, onQuery, onStatus, onPriority, onSort }) {
  return (
    <div className={styles.grid}>
      <Field label="Поиск">
        <TextInput value={filters.query} onChange={onQuery} placeholder="например: JSON Server" />
      </Field>

      <Field label="Статус">
        <Select value={filters.status} onChange={onStatus} options={statusOptions} />
      </Field>

      <Field label="Приоритет">
        <Select value={filters.priority} onChange={onPriority} options={priorityOptions} />
      </Field>

      <Field label="Сортировка">
        <Select value={filters.sort} onChange={onSort} options={sortOptions} />
      </Field>
    </div>
  );
}
