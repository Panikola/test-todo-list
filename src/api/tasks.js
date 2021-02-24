import request from "@/api/request";

const basePath = "tasks";

export const fetchTasks = async () => {
  return await request.get(`/${basePath}`);
};

export const fetchTask = async id => {
  return await request.get(`/${basePath}/${id}`);
};

export const createTask = async data => {
  return await request.post(`/${basePath}`, data);
};

export const saveTask = async (id, data) => {
  return await request.patch(`/${basePath}/${id}`, data);
};

export const deleteTask = async id => {
  return await request.delete(`/${basePath}/${id}`);
};
