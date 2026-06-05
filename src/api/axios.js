import axios from "axios";

const IS_VPS = true;

export const API_URL = IS_VPS
  ? "https://dmilanes.es/api"
  : "http://127.0.0.1:8000/api";

export const RESOURCES_URL = IS_VPS
  ? "https://dmilanes.es/recursos_portfolio"
  : "http://localhost/recursos_portfolio";

export const AVATAR_URL =
  `${RESOURCES_URL}/upload_avatar_portfolio`;

export const PROJECTS_URL =
  `${RESOURCES_URL}/projects`;

export const PDFS_URL =
  `${RESOURCES_URL}/pdfs`;

export const PHOTOS_URL =
  `${RESOURCES_URL}/fotos`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default api;