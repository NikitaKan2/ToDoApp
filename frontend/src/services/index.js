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
  console.log(response);
  return response.data;
};

export const patchTask = (todo) => tasksClient.patch(`task/${userId}/${todo.id}`, todo);

export const deleteTask = (id) => tasksClient.delete(`task/${userId}/${id}`);

export const postTask = async (todo) => {
  const { data } = await tasksClient.post(`task/${userId}/`, todo);
  return data;
};
