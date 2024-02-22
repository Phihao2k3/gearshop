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
  push,
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
    return new Promise(async (resolve, reject) => {
      let data = await this.getall();
      let id = data.length; // Start with 0
      let emailExists = false;
      for (const user of data) {
        if (user.email === email) {
          emailExists = true;
          break;
        }
      }
      if (emailExists) {
        resolve("Email đã tồn tại"); // Email already exists, do not add new user
      } else {
        const usersRef = child(ref(db), "users");
        const newUserRef = child(usersRef, id.toString()); //
        set(newUserRef, {
          id: id,
          email: email,
          password: password,
          username: username,
        })
          .then(() => {
            resolve("Đăng ký thành công"); // Registration successful
          })
          .catch((error) => {
            reject(error); // Handle error if any
          });
      }
    });
  }

  login(email, password) {
    return new Promise(async (resolve, reject) => {
      let data = await this.getall();
      for (const user of data) {
        if (user.email === email && user.password === password) {
          resolve({
            id: user.id,
            email: user.email,
            password: user.password,
            username: user.username,
            status: true,
          });
        }
      }
      resolve(false);
    });
  }
}
module.exports = user;
