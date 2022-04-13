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

  static async getUser({ filters = null, page = 0, usersPerPage = 100 } = {}) {
    let query;
    if (filters) {
      if ("classname" in filters) {
        query = { $text: { $search: filters["classname"] } };
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

  static async addUser(username, score, classname, attendance, date) {
    try {
      const userDoc = {
        username: username,
        score: score,
        classname: classname,
        attendance: attendance,
        date: date,
      };
      return await users.insertOne(userDoc);
    } catch (e) {
      console.error(`Unable to post user: ${e}`);
    }
  }

  static async updateUser(username, score, date) {
    try {
      let query;
      query = { $text: { $search: username } };
      let cursor;
      cursor = await users.find(query);
      const displayCursor = cursor.limit(100).skip(0);
      const usersList = await displayCursor.toArray();
      const userId = usersList[0]._id;
      const updateResponse = await users.updateOne(
        { _id: ObjectId(userId) },
        { $inc: { score: score, attendance: 1 } },
        { $set: { date: date } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update user: ${e}`);
    }
  }
}

module.exports = UserDAO;
