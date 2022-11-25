import axios from "axios";

// export const ApiClient = ({baseURL}: {baseURL: string}) => {
//   const api = axios.create({baseURL: baseURL});
//   return {api}
// }

const api = axios.create({baseURL:"/api"});

export async function getMethod(url: string, config?: {}) {
  try {
    const resp = await api.get(url, config)
    return resp.data;
  } catch (e) {
    console.error(e);
  }
}

export async function postMethod(url: string, data?: {}, config?: {}) {
  try {
    const resp = await api.post(url, data, config)
    return resp.data;
  } catch (e) {
    console.error(e);
  }
}

export async function putMethod(url: string, data?: {}, config?: {}) {
  try {
    await api.put(url, data, config)
    return;
  } catch (e) {
    console.error(e);
  }
}

export async function deleteMethod(url: string, config?: {}) {
  try {
    await api.delete(url, config)
    return;
  } catch (e) {
    console.error(e);
  }
}
