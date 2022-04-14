const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

let users;

class UserDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.MENTILEADERS_NS).collection("users");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in usersDAO: ${e}`
      );
    }
  }

  static async getUser({ filters = null, page = 0, usersPerPage = 20 } = {}) {
    let query;
    if (filters) {
      if ("classname" in filters) {
        query = { classes: filters["classname"] };
      }
      if ("username" in filters) {
        query = { $text: { $search: filters["username"] } };
      }
    }

    let cursor;

    try {
      cursor = await users.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { usersList: [], totalNumUsers: 0 };
    }

    const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page);

    try {
      const usersList = await displayCursor.toArray();
      const totalNumUsers = await users.countDocuments(query);

      return { usersList, totalNumUsers };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { usersList: [], totalNumUsers: 0 };
    }
  }

  static async addUser(username, score, classname, date) {
    try {
      let classes = [];
      classes.push(classname);
      let scores = [];
      scores.push(score);
      const userDoc = {
        username: username,
        scores: scores,
        classes: classes,
        date: date,
      };
      return await users.insertOne(userDoc);
    } catch (e) {
      console.error(`Unable to post user: ${e}`);
    }
  }

  static async updateUserClass(
    username,
    score,
    scores,
    classname,
    classes,
    date
  ) {
    try {
      let query;
      query = { $text: { $search: username } };
      let cursor;
      cursor = await users.find(query);
      const usersList = await cursor.toArray();
      const userId = usersList[0]._id;
      classes.push(classname);
      scores.push(score);
      const updateResponse = await users.updateOne(
        { _id: ObjectId(userId) },
        { $set: { date: date, classes: classes, scores: scores } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update user class: ${e}`);
    }
  }

  static async updateUserScore(
    username,
    score,
    scores,
    classname,
    classes,
    date
  ) {
    try {
      let query;
      query = { $text: { $search: username } };
      let cursor;
      cursor = await users.find(query);
      const usersList = await cursor.toArray();
      const userId = usersList[0]._id;
      var index;
      for (var i = 0; i < classes.length; i++) {
        if (classes[i] === classname) {
          index = i;
          break;
        }
      }
      scores[index] += score;
      const updateResponse = await users.updateOne(
        { _id: ObjectId(userId) },
        { $set: { date: date, scores: scores } }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update user score: ${e}`);
    }
  }
}

module.exports = UserDAO;
