import axios from 'axios';

const userId = process.env.REACT_APP_USER_ID;
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

  const response = await tasksClient.get(`tasks/${userId}/`, {
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
  const { data } = await tasksClient.patch(`task/${userId}/${todo.id}`, todo);
  return data;
};

export const deleteTask = (id) => tasksClient.delete(`task/${userId}/${id}`);

export const postTask = async (todo) => {
  const { data } = await tasksClient.post(`task/${userId}/`, todo);
  return data;
};

export const registrUser = async (user) => {
  console.log(user);
  const { data } = await axios.post('http://localhost:4006/registration', user);
  localStorage.setItem('token', data.accessToken);
  console.log(localStorage);
  return data;
};
