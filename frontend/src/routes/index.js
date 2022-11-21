const routes = {
  getAllTasks: () => 'https://todo-api-learning.herokuapp.com/v1/tasks/6/',
  postTask: () => 'https://todo-api-learning.herokuapp.com/v1/task/6/',
  updateTask: (id) => `https://todo-api-learning.herokuapp.com/v1/task/6/${id}`,
  deleteTask: (id) => `https://todo-api-learning.herokuapp.com/v1/task/6/${id}`,
};

export default routes;
