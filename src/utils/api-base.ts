export class BaseClient {
  baseUrl: string;
  defaultOptions: object;

  constructor(baseUrl: string, defaultOptions: object = {}) {
    this.baseUrl = baseUrl;
    this.defaultOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      ...defaultOptions,
    };
  }

  async get<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...this.defaultOptions,
      ...options,
    });

    if (!res.ok) {
      throw Error('Query call not ok');
    }

    const data = await res.json();
    return data;
  }

  async post<T>(path: string, options: RequestInit = {}): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...this.defaultOptions,
      ...options,
      method: 'POST',
    });

    if (!res.ok) {
      throw Error('Query call not ok');
    }

    const data = await res.json();
    return data;
  }
}