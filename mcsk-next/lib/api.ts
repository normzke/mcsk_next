export const api = {
  heroSlides: {
    list: () => fetchApi('/hero-slides'),
    get: (id: string) => fetchApi(`/hero-slides/${id}`),
    create: (data: FormData) =>
      fetchApi('/hero-slides', {
        method: 'POST',
        body: data,
        headers: {}, // Let browser set content-type for FormData
      }),
    update: (id: string, data: FormData) =>
      fetchApi(`/hero-slides/${id}`, {
        method: 'PUT',
        body: data,
        headers: {}, // Let browser set content-type for FormData
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