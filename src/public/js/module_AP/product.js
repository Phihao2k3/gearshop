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
  limitToFirst,
  limitToLast,
  startAt,
  startAfter,
  endAt,
  endBefore,
  equalTo,
  query,
  orderByChild,
} = require("../../../config");
const categories = require("../module_AP/categories");
class product {
  constructor() {
    this.product = [];
  }
  getall(catetype, priceRange) {
    return new Promise((resolve, reject) => {
      onValue(ref(db, "product"), (snapshot) => {
        const data = snapshot.val();
        for (let id in data) {
          if (data[id].status == 1) {
            let cate = new categories();
            cate.getonce(data[id].cate_id).then((datacate) => {
              if (catetype == datacate.id) {
                this.product.push(data[id]);
              } else if (priceRange) {
                if (Number(priceRange) >= Number(data[id].price)) {
                  this.product.push(data[id]);
                  console.log(data[id]);
                }
              } else if (catetype == undefined && priceRange == undefined) {
                this.product.push(data[id]);
              }
            });
          }
        }
        resolve(this.product);
      });
    });
  }
  getonce(id) {
    return new Promise((resolve, reject) => {
      onValue(ref(db, "product/" + id), (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      });
    });
  }
  getlimitnew(limit) {
    return new Promise(async (resolve, reject) => {
      await onValue(ref(db, "product"), (snapshot) => {
        const data = snapshot.val();
        let product = [];
        for (let index = 1; index <= limit; index++) {
          product.push(data[index]);
        }
        resolve(product);
      });
    });
  }
  post(data) {
    return new Promise((resolve, reject) => {
      function writeUserData(data) {
        set(ref(db, "product/" + data.id), data);
      }
      writeUserData(data);
      resolve("post success");
    });
  }
  delete(id) {
    return new Promise((resolve, reject) => {
      set(ref(db, "product/" + id + "/status"), 0);
      resolve("delete success");
    });
  }
  pagenation(numberpage, priceRange, catetype) {
    return new Promise(async (resolve, reject) => {
      if (numberpage < 1 || numberpage == undefined) {
        numberpage = 1;
      }
      let curent_page = numberpage; // trang hiện tại
      let limit_page = 9; // số sản phẩm trên 1 trang
      let startindex = (curent_page - 1) * limit_page; // vị trí bắt đầu
      let endindex = startindex + limit_page - 1; // vị trí kết thúc
      let data = await this.getall().then((data) => {
        return data;
      });

      // console.log(listproduct);
      let listproduct = query(
        ref(db, "product"),
        orderByChild("id"),
        startAt(startindex),
        endAt(endindex),
        limitToFirst(limit_page)
      ); //
      get(listproduct).then((snapshot) => {
        let data = snapshot.val();
        let product = [];
        console.log(data);
        for (let id in data) {
          if (data[id].status == 1) {
            let cate = new categories();
            cate.getonce(data[id].cate_id).then((datacate) => {
              if (catetype == datacate.id) {
                product.push(data[id]);
              } else if (priceRange) {
                if (Number(priceRange) >= Number(data[id].price)) {
                  product.push(data[id]);
                }
              }else if(!catetype && !priceRange){
                product.push(data[id]);
              }
            });
          }
        }
        resolve(product);
      });
    });
  }
}

module.exports = product;
