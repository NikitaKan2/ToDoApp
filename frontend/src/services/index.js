import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const tasksClient = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export const getPagesCount = (totalPages, postPerPage) => Math.ceil(totalPages / postPerPage);

export const fetchAllTasks = async (obj) => {
  const {
    postsPerPage,
    currentPage,
    selectedSort,
    currentFilter,
  } = obj;

  const response = await tasksClient.get('tasks/', {
    params: {
      pp: postsPerPage,
      page: currentPage,
      order: selectedSort,
      filterBy: currentFilter,
    },
  });
  return response.data;
};

export const patchTask = async (todo) => {
  const { data } = await tasksClient.patch(`task/${todo.id}`, todo);
  return data;
};

export const deleteTask = (id) => tasksClient.delete(`task/${id}`);

export const postTask = async (todo) => {
  const { data } = await tasksClient.post('task/', todo);
  return data;
};

export const registrUser = async (user) => {
  const { data } = await axios.post('https://backend-for-todo-app.onrender.com/registration', user);
  return data;
};

export const loginUser = async (user) => {
  const { data } = await axios.post('https://backend-for-todo-app.onrender.com/login', user);
  return data;
};
