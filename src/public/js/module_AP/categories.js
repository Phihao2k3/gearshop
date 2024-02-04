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
class categories {
  constructor() {
    this.categories = [];
  }
  getall() {
    return new Promise((resolve, reject) => {
      onValue(ref(db, "Categories"), (snapshot) => {
        const data = snapshot.val();
        for (let id in data) {
          this.categories.push(data[id]);
        }
        resolve(this.categories);
      });
    });
  }
  getonce(id) {
    return new Promise((resolve, reject) => {
      onValue(ref(db, "Categories/" + id), (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      });
    });
  }
  post(data) {
    return new Promise((resolve, reject) => {
      set(ref(db, "Categories/" + data.id), data, (error) => {
        if (error) {
          reject("Data could not be saved." + error);
        } else {
          resolve("Data saved successfully.");
        }
      });
    });
  }
  getlimitnew(limit) {
    return new Promise(async (resolve, reject) => {
      await onValue(ref(db, "Categories"), (snapshot) => {
        const data = snapshot.val();
        let categories = [];
        for (let index = 1; index <= limit; index++) {
          categories.push(data[index]);
        }
        resolve(categories);
      });
    });
  }
  delete(id) {
    return new Promise(async (resolve, reject) => {
      await set(ref(db, "Categories/" + id), null, (error) => {
        if (error) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }
  update(id, data) {
    return new Promise(async (resolve, reject) => {
      await set(ref(db, "Categories/" + id), data, (error) => {
        if (error) {
          reject("Data could not be saved." + error);
        } else {
          resolve("Data saved successfully.");
        }
      });
    });
  }
}

module.exports = categories;
