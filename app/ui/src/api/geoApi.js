const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Универсальная обёртка над fetch.
 * - endpoint: строка вида "/geo/get_flight"
 * - options: { method, params: {sid: '...'}, body: { ... } }
 */
async function request(endpoint, { method = "GET", params = {}, body } = {}) {
  const queryString = new URLSearchParams(params).toString();
  const url = `${BASE_URL}${endpoint}${queryString ? `?${queryString}` : ""}`;

  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  if (body !== undefined && body !== null) {
    opts.body = JSON.stringify(body);
  }

  const res = await fetch(url, opts);

  // Если не JSON в ответе — бросим
  const text = await res.text().catch(() => "");
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    // Попытка дать читаемую ошибку
    const errMsg = (data && (data.detail || data.message)) || res.statusText;
    const err = new Error(errMsg);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

// --- Конкретные endpoint-функции (по PDF) ---
export const changeData = (sid, addDate) =>
  request("/geo/change_data", { method: "POST", params: { sid }, body: { add: addDate } });

export const getDataFromRegion = (region) =>
  request("/geo/get_data_from_region", { method: "POST", params: { region } });

export const getFlight = (sid) =>
  request("/geo/get_flight", { method: "POST", params: { sid } });

export const insertData = (payload) =>
  request("/geo/insert_data", { method: "POST", body: payload });
