const category = require("../../public/js/module_AP/categories");
const product = require("../../public/js/module_AP/product");
const storage = require("../../public/js/module_AP/storage");
class sitecontroller {
  async home(req, res) {
    let productclass = new product();
    let productlistdata = [];
    await productclass.getlimitnew(4).then((data) => {
      data.map((element) => {
        element.price = Number(element.price).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
        productlistdata.push(element);
      });
    });

    let pronew = {
      brand: "",
      switch: "",
      color: "",
      connect: "",
      image: "",
      layout: "",
      name: "",
    };
    let productnew = productclass.getonce(3).then((data) => {
      pronew.brand = data.brand;
      pronew.switch = data.switch;
      pronew.color = data.color;
      pronew.connect = data.connect;
      pronew.image = data.image;
      pronew.layout = data.layout;
      pronew.name = data.brand + " " + data.model;
    });
    let banner = {
      image: "",
      link: "",
      name: "",
    };
    let bannerclass = new storage();
    productclass.getonce(9).then((data) => {
      banner.image = data.image;
      banner.link = data.link;
      banner.name = data.brand + " " + data.model;
    });
    res.render("home", {
      productlist: productlistdata,
      checklogin: req.session.email,
      productnew: pronew,
      banner: banner,
    });
  }
  
  search(req, res) {
    res.send("search");
  }
}
module.exports = new sitecontroller();
