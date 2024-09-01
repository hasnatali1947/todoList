export const mainURL = "http://localhost:4500";
const url = mainURL + "/api/v1";

const user = {
  login: url + "/user/login",
  signup: url + "/user/signup",
  todoUpdate: url + "/user/todoUpdate",
  getUser: url + "/user/getUser",
  deleteItem: url + "/user/deleteItem",
  editItem: url + "/user/editItem",
};

export const API = {
  user,
};
