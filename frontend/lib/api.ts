export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

async function request<T>(
  path: string,
  options: {
    method?: HttpMethod
    body?: any
    token?: string | null
    isFormData?: boolean
  } = {},
): Promise<T> {
  const { method = 'GET', body, token, isFormData } = options

  const headers: HeadersInit = {}

  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body
      ? isFormData
        ? body
        : JSON.stringify(body)
      : undefined,
    credentials: 'include',
  })

  if (!res.ok) {
    let errorBody: any = null
    try {
      errorBody = await res.json()
    } catch {
    }
    throw new Error(
      errorBody?.message || `Request failed with status ${res.status}`,
    )
  }

  if (res.status === 204) {
    return null as T
  }

  return (await res.json()) as T
}

export const api = {
  get: <T>(path: string, token?: string | null) =>
    request<T>(path, { method: 'GET', token }),

  post: <T>(path: string, body?: any, token?: string | null) =>
    request<T>(path, { method: 'POST', body, token }),

  put: <T>(path: string, body?: any, token?: string | null) =>
    request<T>(path, { method: 'PUT', body, token }),

  del: <T>(path: string, token?: string | null) =>
    request<T>(path, { method: 'DELETE', token }),

  postForm: <T>(path: string, formData: FormData, token?: string | null) =>
    request<T>(path, {
      method: 'POST',
      body: formData,
      token,
      isFormData: true,
    }),
}
