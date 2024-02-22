const cart = require("../../public/js/module_AP/cart");
class cartController {
  deletecart(req, res) {
    const cartclass = new cart();
    let { delete: idproduct } = req.query;
    cartclass.delete(idproduct, req.session.id).then((data) => {
      console.log(data);
    });
    res.redirect("/cart");
  }
   addcart(req, res) {
    if (req.session.email == undefined) {
      res.redirect("/dangnhap");
      return;
    } else {
      const cartclass = new cart();
      let { id: idproduct } = req.query;
       cartclass.addproductcart(idproduct, req.session.id);

      res.redirect("/cart");
    }
  }
  async index(req, res) {
    const cartclass = new cart();
    let totalprice = 0;

    cartclass.getall(req.session.id).then((data) => {
      data.map((element) => {
        totalprice += element.totalprice;
        element.price = Number(element.price).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
        element.totalprice = Number(element.totalprice).toLocaleString(
          "vi-VN",
          {
            style: "currency",
            currency: "VND",
          }
        );
      });
      totalprice = Number(totalprice).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
      res.render("cart", {
        cart: data,
        totalprice: totalprice,
        checklogin: req.session.email,
      });
    });
  }
}
module.exports = new cartController();
