import { request } from "./client.js";

export function getTasks() {
  return request("/tasks?_sort=createdAt&_order=desc");
}

export function getTask(id) {
  return request(`/tasks/${id}`);
}

export function createTask(payload) {
  return request("/tasks", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function patchTask(id, patch) {
  return request(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch)
  });
}

export function deleteTask(id) {
  return request(`/tasks/${id}`, {
    method: "DELETE"
  });
}
