import axios from "axios";

const API_URL = "http://localhost:8000/api";

export interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface PostInput {
  title: string;
  content: string;
}

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Posts API
export const postsApi = {
  // Get all posts
  getAll: async (): Promise<Post[]> => {
    const response = await api.get<Post[]>("/posts/");
    return response.data;
  },

  // Get a single post
  getById: async (id: number): Promise<Post> => {
    const response = await api.get<Post>(`/posts/${id}/`);
    return response.data;
  },

  // Create a new post
  create: async (data: PostInput): Promise<Post> => {
    const response = await api.post<Post>("/posts/", data);
    return response.data;
  },

  // Update a post
  update: async (id: number, data: PostInput): Promise<Post> => {
    const response = await api.put<Post>(`/posts/${id}/`, data);
    return response.data;
  },

  // Delete a post
  delete: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}/`);
  },
};
