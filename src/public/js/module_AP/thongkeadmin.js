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

class thongke {
  constructor() {
    this.thongke = [];
  }
  getalloder() {
    return new Promise(async (resolve, reject) => {
      await get(child(ref(db), "orders"))
        .then((snapshot) => {
          if (snapshot.exists()) {
            resolve(snapshot.val());
          } else {
            resolve("No data available");
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  async  toalmoney1m() {
    return new Promise(async (resolve, reject) => {
        let totalprice = 0;
        let data = [];
        const snapshot = await get(ref(db, "orders"));
        snapshot.forEach((e1) => {
            let childData = e1.val();
            data.push(childData);
        });
        //  trong 1 tháng
        let date = new Date();
        let month = date.getMonth() + 1;
        await Promise.all(data.map(async (e2) => {
            let dateOrder = new Date(e2.created_date);
            let monthOrder = dateOrder.getMonth() + 1;
            if (monthOrder == month) {
                const orderDetailsSnapshot = await get(ref(db, "order_details/" + e2.id));
                orderDetailsSnapshot.forEach((e3) => {
                    let orderDetail = e3.val();
                    totalprice += Number(orderDetail.price);
                });
            }
        }));
        console.log(totalprice);
        resolve(totalprice);
    });
}

}
module.exports = thongke;
