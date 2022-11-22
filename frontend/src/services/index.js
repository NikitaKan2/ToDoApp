import axios from 'axios';

const userId = process.env.REACT_APP_USER_ID;

const tasksClient = axios.create({
  baseURL: 'https://todo-api-learning.herokuapp.com/v1/',
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

export const patchTask = (todo) => tasksClient.patch(`task/${userId}/${todo.uuid}`, todo);

export const deleteTask = (id) => tasksClient.delete(`task/${userId}/${id}`);

export const postTask = async (todo) => {
  const { data } = await tasksClient.post(`task/${userId}/`, todo);
  return data;
};

tasksClient.interceptors.request.use((request) => {
  console.log(request);
}, (error) => {
  console.log(error);
});
