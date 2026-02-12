import { create } from "zustand";
import { createTask, deleteTask, getTask, getTasks, patchTask } from "../api/tasksApi.js";

const initialFilters = {
  query: "",
  status: "all",
  priority: "all",
  sort: "newest"
};

export const useTasksStore = create((set, get) => ({
  tasks: [],
  status: "idle",
  error: null,
  filters: initialFilters,

  setQuery(query) {
    set((state) => ({ filters: { ...state.filters, query } }));
  },

  setStatusFilter(status) {
    set((state) => ({ filters: { ...state.filters, status } }));
  },

  setPriorityFilter(priority) {
    set((state) => ({ filters: { ...state.filters, priority } }));
  },

  setSort(sort) {
    set((state) => ({ filters: { ...state.filters, sort } }));
  },

  getTaskById(id) {
    return get().tasks.find((t) => String(t.id) === String(id)) || null;
  },

  async fetchTasks() {
    set({ status: "loading", error: null });

    try {
      const tasks = await getTasks();
      set({ tasks, status: "idle" });
    } catch (err) {
      set({ status: "error", error: err?.message || "Ошибка загрузки" });
    }
  },

  async fetchTaskById(id) {
    set({ status: "loading", error: null });

    try {
      const task = await getTask(id);
      set((state) => {
        const exists = state.tasks.some((t) => String(t.id) === String(id));
        return {
          tasks: exists ? state.tasks.map((t) => (String(t.id) === String(id) ? task : t)) : [task, ...state.tasks],
          status: "idle"
        };
      });
    } catch (err) {
      set({ status: "error", error: err?.message || "Ошибка загрузки" });
    }
  },

  async addTask({ title, description, priority, dueDate }) {
    set({ status: "saving", error: null });

    try {
      const now = new Date().toISOString();
      const created = await createTask({
        title,
        description,
        completed: false,
        priority,
        dueDate,
        createdAt: now,
        updatedAt: now
      });

      set((state) => ({ tasks: [created, ...state.tasks], status: "idle" }));
    } catch (err) {
      set({ status: "error", error: err?.message || "Ошибка сохранения" });
    }
  },

  async updateTask(id, patch) {
    set({ status: "saving", error: null });

    try {
      const now = new Date().toISOString();
      const updated = await patchTask(id, { ...patch, updatedAt: now });

      set((state) => ({
        tasks: state.tasks.map((t) => (String(t.id) === String(id) ? updated : t)),
        status: "idle"
      }));
    } catch (err) {
      set({ status: "error", error: err?.message || "Ошибка обновления" });
    }
  },

  async toggleCompleted(id) {
    const task = get().getTaskById(id);
    if (!task) return;

    await get().updateTask(id, { completed: !task.completed });
  },

  async removeTask(id) {
    set({ status: "saving", error: null });

    try {
      await deleteTask(id);
      set((state) => ({ tasks: state.tasks.filter((t) => String(t.id) !== String(id)), status: "idle" }));
    } catch (err) {
      set({ status: "error", error: err?.message || "Ошибка удаления" });
    }
  }
}));
