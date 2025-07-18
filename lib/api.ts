function fetchApi(input: string, init?: RequestInit) {
  return fetch(input, {
    credentials: 'include',
    ...init,
  }).then(async (res) => {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return res.json();
    }
    return res;
  });
}

export const api = {
  heroSlides: {
    list: () => fetchApi('/hero-slides'),
    get: (id: string) => fetchApi(`/hero-slides/${id}`),
    create: (data: any) =>
      fetchApi('/hero-slides', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    update: (id: string, data: any) =>
      fetchApi(`/hero-slides/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    delete: (id: string) =>
      fetchApi(`/hero-slides/${id}`, {
        method: 'DELETE',
      }),
  },
  
  events: {
    list: (params?: URLSearchParams) =>
      fetchApi(`/events${params ? `?${params}` : ''}`),
    get: (id: string) => fetchApi(`/events/${id}`),
    create: (data: FormData) =>
      fetchApi('/events', {
        method: 'POST',
        body: data,
        headers: {}, // Let browser set content-type for FormData
      }),
    update: (id: string, data: FormData) =>
      fetchApi(`/events/${id}`, {
        method: 'PUT',
        body: data,
        headers: {}, // Let browser set content-type for FormData
      }),
    delete: (id: string) =>
      fetchApi(`/events/${id}`, {
        method: 'DELETE',
      }),
  },
  
  licensing: {
    types: {
      list: () => fetchApi('/licensing/types'),
      get: (id: string) => fetchApi(`/licensing/types/${id}`),
      create: (data: any) =>
        fetchApi('/licensing/types', {
          method: 'POST',
          body: JSON.stringify(data),
        }),
      update: (id: string, data: any) =>
        fetchApi(`/licensing/types/${id}`, {
          method: 'PUT',
          body: JSON.stringify(data),
        }),
      delete: (id: string) =>
        fetchApi(`/licensing/types/${id}`, {
          method: 'DELETE',
        }),
    },
    // ... existing licensing endpoints ...
  },
  // ... existing endpoints ...
} 