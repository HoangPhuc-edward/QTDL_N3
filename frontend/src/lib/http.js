const ConfigHttp = async (method, URL, option = {}) => {
  const isFormData = option.body instanceof FormData;
  const body = !isFormData && method !== "GET" ? JSON.stringify(option.body) : option.body;
  const headers = {
    ...option.headers,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
  };

  const response = await fetch(URL, {
    method,
    headers,
    ...(method !== "GET" && { body }),
    credentials: option.credentials,
    cache: option.cache,
  });

  const result = await response.json();

  if (!response.ok) {
    throw {
      status: response.status,
      statusText: response.statusText,
      body: result,
    };
  }

  return result;
};

export const httpRequest = {
  get(URL, option) {
    return ConfigHttp("GET", URL, option);
  },
  post(URL, option) {
    return ConfigHttp("POST", URL, option);
  },
  put(URL, option) {
    return ConfigHttp("PUT", URL, option);
  },
  patch(URL, option) {
    return ConfigHttp("PATCH", URL, option);
  },
  delete(URL, option) {
    return ConfigHttp("DELETE", URL, option);
  },
};

export default httpRequest;
