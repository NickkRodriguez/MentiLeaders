const UserDAO = require("../dao/userDAO");

class UserController {
  static async apiGetUsers(req, res, next) {
    const usersPerPage = req.query.usersPerPage
      ? parseInt(req.query.usersPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.classname) {
      filters.classname = req.query.classname;
    }
    if (req.query.username) {
      filters.username = req.query.username;
    }

    const { usersList, totalNumUsers } = await UserDAO.getUser({
      filters,
      page,
      usersPerPage,
    });

    let response = {
      users: usersList,
      page: page,
      filters: filters,
      entries_per_page: usersPerPage,
      total_results: totalNumUsers,
    };
    res.json(response);
  }

  static async apiPostUser(req, res, next) {
    try {
      const username = req.body.username;
      const score = req.body.score;
      const classname = req.body.classname;
      const date = new Date();

      const UserResponse = await UserDAO.addUser(
        username,
        score,
        classname,
        date
      );
      res.json({ status: "successfully added user" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateUserClass(req, res, next) {
    try {
      const username = req.body.username;
      const score = req.body.score;
      const scores = req.body.scores;
      const classname = req.body.classname;
      const classes = req.body.classes;
      const date = new Date();

      const UserResponse = await UserDAO.updateUserClass(
        username,
        score,
        scores,
        classname,
        classes,
        date
      );
      res.json({ status: "successfully updated user class" });
    } catch (e) {
      res.status(501).json({ error: e.message });
    }
  }

  static async apiUpdateUserScore(req, res, next) {
    try {
      const username = req.body.username;
      const score = req.body.score;
      const scores = req.body.scores;
      const classname = req.body.classname;
      const classes = req.body.classes;
      const date = new Date();

      const UserResponse = await UserDAO.updateUserScore(
        username,
        score,
        scores,
        classname,
        classes,
        date
      );
      res.json({ status: "successfully updated user score" });
    } catch (e) {
      res.status(502).json({ error: e.message });
    }
  }
}

module.exports = UserController;
