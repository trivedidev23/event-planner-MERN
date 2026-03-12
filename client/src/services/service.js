import Axios from "./axios";
import { USER_SERVICE } from "./endpoint";

export const userService = {
  register: (data) => Axios.post(USER_SERVICE.register, data),
  login: (data) => Axios.post(USER_SERVICE.login, data),
};
