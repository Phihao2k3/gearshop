const cart = require("../../public/js/module_AP/cart");
const oder = require("../../public/js/module_AP/oder");
class checkout {
  // [GET] /thanhtoan
  async index(req, res) {
    let iduser = req.session.id;
    let cartclass = new cart();
    await cartclass.getall(iduser).then((data) => {
      let totalprice = 0;
      if (data.length > 0) {
        data.forEach((element) => {
          totalprice += element.price * element.quantity;
          element.price = Number(element.price).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          });
        });
        totalprice = Number(totalprice).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
        res.render("checkout", { cart: data, totalprice: totalprice });
      }
    });
  }
  // [POST] /thanhtoan
  async checkout(req, res) {
    let oderclass = new oder();
    let { FirstName, LastName, thanhpho, huyen, xa, phone } = req.body;
    let diachi = `${xa}, ${huyen}, ${thanhpho}`;
    oderclass
      .add(
        diachi,
        req.session.email,
        `${FirstName} ${LastName}`,
        phone,
        req.session.id
      )
      .then((data) => {
        res.redirect("/thanhtoan/checkout/thankyou");
      });
  }
  thankyou(req, res) {
    const cartclass = new cart();
    cartclass.deleteall(req.session.id);
    res.render("thankyou");
  }
}
module.exports = new checkout();
