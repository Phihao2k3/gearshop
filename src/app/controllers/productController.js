const productclass = require("../../public/js/module_AP/product");
const cateclass = require("../../public/js/module_AP/categories");
class productController {
  async showall(req, res) {
    const idcate = req.query.idcate;
    const filprice = req.query.priceRange;
    const categories = new cateclass();
    const product = new productclass();
  
    const categoriesdata = await categories.getall().then((data) => {
      return data;
    });
    const productdata = await product
      .pagenation(req.query.page, filprice, idcate)
      .then((data) => {
        return data;
      });
    let pageindex = [];
    product.getall().then((data) => {
      let pageNumber = Math.ceil(data.length / 8);
      for (let index = 1; index <= pageNumber; index++) {
        pageindex.push(index);
      }
    });
     productdata.map((element) => {
      element.price = Number(element.price).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    });
    res.render("shop", {
      productlist: productdata,
      checklogin: req.session.email,
      producttype: categoriesdata,
      pageindex: pageindex,
    });
  }
  async showdetail(req, res) {
    const id = req.query.id;
    let datapro = {};
    const product = new productclass();
    product.getonce(id).then((data) => {
      res.render("shopdetail", {
        idpro: data.id,
        name: `${data.brand} ${data.model}`,
        brand: data.brand,
        model: data.model,
        color: data.color,
        connect: data.connect,
        switch: data.switch,
        image: data.image,
        layoutpro: data.layout,
        price: Number(data.price).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
        checklogin: req.session.email,
      });
    });
  }
  addcart(req, res) {
    const id = req.query.id;
    const product = new productclass();

    res.redirect("/sanpham");
  }
}
module.exports = new productController();
