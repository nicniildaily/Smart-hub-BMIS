export const API_URL = "http://172.20.10.9:5000/"
/**
 * Consume an API with default options
 * @param {string} url - the URL to call
 * @param {object} options - other options like headers and body
 * @returns {Promise}
 */
const initialOptions = {
  method: 'GET',
  cacheData: false,
  checkInCacheFirst: false
}

const cache = {
  get: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
  store: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch {}
  }
}

export default async function fetchApi(url, options = initialOptions) {
  options = {
    ...initialOptions,
    ...options
  }
  const cacheFirst = options.method == "GET" && options.checkInCacheFirst
  if (cacheFirst) {
    const data = cache.get(url)
    if (data) {
      return data
    }
  }
  // Add Authorization header if token is present in localStorage
  const token = localStorage.getItem('token');
  const headers = {
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(API_URL + url, {
    ...options,
    headers,
    credentials: 'include',
  });
  const canIcache = options.method == "GET" && options.cacheData
  if (response.ok) {
    const data = await response.json();
    if (canIcache) {
      cache.store(url, data)
    }
    return data
  } else {
    throw await response.json();
  }
}
