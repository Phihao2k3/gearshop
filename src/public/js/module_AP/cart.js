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
const product = require("../module_AP/product");
class cart {
  constructor() {
    this.cart = [];
  }
  async getall(id) {
    const snapshot = await get(ref(db, "users/" + id + "/cart"));
    const data = snapshot.val();
    for (let id in data) {
      this.cart.push(data[id]);
    }
    return this.cart;
  }
  async addproductcart(idsp, iduser) {
    return new Promise((resolve, reject) => {
      const newproduct = new product();
      let sp = newproduct.getonce(idsp).then((data) => {
        this.getall(iduser).then((datacart) => {
          let check = false;
          datacart.forEach((element) => {
            if (element.id == idsp) {
              element.quantity++;
              element.totalprice = element.quantity * element.price;
              console.log(element.totalprice);
              check = true;
            }
          });
          if (check == false) {
            data.quantity = 1;
            data.totalprice = data.price;
            datacart.push(data);
          }
          set(ref(db, "users/" + iduser + "/cart"), datacart, (error) => {
            if (error) {
              reject("Data could not be saved." + error);
            } else {
              resolve("Data saved successfully.");
            }
          });
        });
      });
    });
  }
  delete(idsp, iduser) {
    return new Promise(async (resolve, reject) => {
      await this.getall(iduser).then((datacart) => {
        datacart.forEach((element, index) => {
          if (element.id == idsp) {
            datacart.splice(index, 1);
          }
        });
        set(ref(db, "users/" + iduser + "/cart"), datacart, (error) => {
          if (error) {
            reject("Data could not be saved." + error);
          } else {
            resolve("Data saved successfully.");
          }
        });
      });
    });
  }
  deleteall(iduser) {
    return new Promise(async (resolve, reject) => {
      set(ref(db, "users/" + iduser + "/cart"), null, (error) => {
        if (error) {
          reject("Data could not be saved." + error);
        } else {
          resolve("Data saved successfully.");
        }
      });
    });
  }
}
module.exports = cart;
