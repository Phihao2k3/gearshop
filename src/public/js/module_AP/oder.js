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
const product = require("./product");
const cart = require("./cart");
const user = require("./user");
class oder {
  constructor() {
    this.oder = [];
  }
  getall() {
    return new Promise(async (resolve, reject) => {
      const snapshot = await get(ref(db, "orders"));
      const data = snapshot.val();
      for (let id in data) {
        this.oder.push(data[id]);
      }
      resolve(this.oder);
    });
  }
  add(diachi, email, hoten, sdt, iduser) {
    return new Promise(async (resolve, reject) => {
      let check = false;
      this.getall().then((data) => {
        let id = data.length + 1;
        data.push({
          created_date: new Date().toISOString(),
          customer_address: diachi,
          customer_email: email,
          customer_name: hoten,
          customer_phone: sdt,
          status: "Chờ xác nhận",
          id: id,
        });
        set(ref(db, "orders"), data)
          .then(() => {
            const cartclass = new cart();
            let datadetail = [];
            cartclass.getall(iduser).then((data) => {
              console.log(data);
              data.forEach((element) => {
                datadetail.push({
                  product_id: element.id,
                  quantity: element.quantity,
                  price: element.price,
                });
              });
              console.log(datadetail);
              this.adddetail(id, datadetail).then(() => {
                resolve("Data saved successfully.");
              });
            });
          })
          .catch((error) => {});
      });
    });
  }
  getAllDetails() {
    return new Promise(async (resolve, reject) => {
      let details = [];
      const snapshot = await get(ref(db, "order_details"));
      const data = snapshot.val();
      for (let id in data) {
        details.push(data[id]);
      }
      resolve(details);
    });
  }
  async adddetail(idOrder, dataDetails) {
    try {
      console.log(dataDetails);
      const allDetails = await this.getAllDetails();

      const newDetails = dataDetails.map((element) => ({
        id: allDetails.length,
        order_id: idOrder,
        product_id: element.product_id,
        quantity: element.quantity,
        price: element.price,
      }));
      allDetails.push(...newDetails);
      await set(ref(db, "order_details"), allDetails);

      return "Data saved successfully.";
    } catch (error) {
      return "Data could not be saved." + error;
    }
  }
  getallbyid(idoder) {
    return new Promise(async (resolve, reject) => {
      let allDetails = await this.getAllDetails();
      let odersdetail = [];
      let detailsid = allDetails.filter((element) => {
        if (element.order_id == idoder) {
          odersdetail.push(element);
        }
      });
      resolve(odersdetail);
    });
  }
  oderaccept(id) {
    return new Promise(async (resolve, reject) => {
      let allOders = await this.getall();
      allOders.forEach((element) => {
        if (element.id == id) {
          element.status = "Đã xác nhận";
        }
      });
      set(ref(db, "orders"), allOders)
        .then(() => {
          resolve("Data saved successfully.");
        })
        .catch((error) => {
          reject("Data could not be saved." + error);
        });
    });
  }
}
module.exports = oder;
