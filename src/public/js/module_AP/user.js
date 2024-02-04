const {
  db,
  ref,
  set,
  get,
  child,
  onValue,
  getStorage,
  storageRef,
  getDownloadURL,
  listAll,
} = require("../../../config");

class user {
  constructor() {
    this.user = [];
  }
  async getall() {
    const snapshot = await get(ref(db, "users"));
    const data = snapshot.val();
    for (let id in data) {
      this.user.push(data[id]);
    }
    return this.user;
  }
  async getonce(id) {
    const snapshot = await get(ref(db, "users/" + id));
    const data = snapshot.val();
    return data;
  }
  async register(email, password, username) {
    let data = await this.getall();
    for (const user of data) {
      if (user.email === email) {
        return false;
      } else {
        const lengdata = data.length + 1;
        await set(ref(db, `users/${lengdata}`), {
          id: lengdata,
          email: email,
          password: password,
          username: username,
        });

        return true;
      }
    }
  }
  async login(email, password) {
    let data = await this.getall();
    for (const user of data) {
      if (user.email === email && user.password === password) {
        return [
          {
            id: user.id,
            email: user.email,
            password: user.password,
            username: user.username,
            status: true,
          },
        ];
      }
    }
    return false;
  }
}
module.exports = user;
