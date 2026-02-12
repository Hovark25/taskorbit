function priorityRank(priority) {
  if (priority === "high") return 3;
  if (priority === "medium") return 2;
  return 1;
}

export function selectVisibleTasks(tasks, filters, queryValue) {
  const query = String(queryValue || "").trim().toLowerCase();

  let result = tasks;

  if (filters.status === "active") result = result.filter((t) => !t.completed);
  if (filters.status === "completed") result = result.filter((t) => t.completed);

  if (filters.priority !== "all") result = result.filter((t) => t.priority === filters.priority);

  if (query) {
    result = result.filter((t) => {
      const title = String(t.title || "").toLowerCase();
      const description = String(t.description || "").toLowerCase();
      return title.includes(query) || description.includes(query);
    });
  }

  if (filters.sort === "oldest") {
    return [...result].sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
  }

  if (filters.sort === "priority") {
    return [...result].sort((a, b) => priorityRank(b.priority) - priorityRank(a.priority));
  }

  if (filters.sort === "due") {
    return [...result].sort((a, b) => {
      const ad = a.dueDate || "9999-12-31";
      const bd = b.dueDate || "9999-12-31";
      return ad.localeCompare(bd);
    });
  }

  return [...result].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
}
