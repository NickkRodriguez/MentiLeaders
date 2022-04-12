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
  updateUser(data) {
    return http.put("/users", data);
  }
}

export default new UserDataService();
