const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

function safeParseJson(text) {
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return null;
  }
}

export async function request(path, options = {}) {
  const url = `${baseUrl}${path}`;
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  const response = await fetch(url, { ...options, headers });
  const text = await response.text();
  const data = safeParseJson(text);

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) || `HTTP ${response.status}`;
    throw new Error(message);
  }

  return data;
}
