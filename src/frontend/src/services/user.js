import http from "../http-common";

class UserDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }
  getUser(username) {
    return http.get(`?username=${username}`);
  }
  getClass(classname) {
    return http.get(`?classname=${classname}`);
  }
  createUser(data) {
    return http.post("/users", data);
  }
  updateUserClass(data) {
    return http.put("/users/class", data);
  }
  updateUserScore(data) {
    return http.put("/users/score", data);
  }
}

export default new UserDataService();
