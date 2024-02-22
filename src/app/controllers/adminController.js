const productlist = require("../../public/js/module_AP/product");
const cateclass = require("../../public/js/module_AP/categories");
const storage = require("../../public/js/module_AP/storage");
const oderclass = require("../../public/js/module_AP/oder");
const thongkeclass = require("../../public/js/module_AP/thongkeadmin");
const e = require("express");
class adminController {
  async product(req, res) {
    try {
      const cate = new cateclass();
      let producttype = await cate.getall().then((data) => {
        return data;
      });
      let product = new productlist();
      let snapshotArray = await product.getall().then((data) => {
        return data;
      });
      let html = "";
      snapshotArray.forEach((element) => {
        html += `<tr>
        <td>${element.id}</td>
        <td>${element.brand}</td>
        <td>${element.model}</td>
        <td>${element.price}</td>
        <td><img src="${element.image}" width="100px" height="100px"></td>
        <td><a href="/admin/product/delete?id=${element.id}"
        class="btn btn-danger">Xóa</a></td>
        
        </tr>`;
      });
      // add product

      res.render("./admin/product", {
        layout: "layout_admin",
        productlist: html,
        producttype: producttype,
      });
    } catch (error) {
      console.error("Error in product:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  async odersdetail(req, res) {
    let id = req.query.id;
    const oder = new oderclass();
    const product = new productlist();
    let productdata = await product.getall().then((data) => {
      return data;
    });
    let oderdetail = await oder.getallbyid(id).then((data) => {
      return data;
    });
    oderdetail.forEach((element) => {
      console.log(element);
      productdata.forEach((element1) => {
        if (element.product_id == element1.id) {
          element.product_name = element1.model;
        }
      });
      element.price = Number(element.price).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    });
    console.log(oderdetail);
    res.render("./admin/odersdetail", {
      layout: "layout_admin",
      odersdetail: oderdetail,
    });
  }
  async categories(req, res) {
    try {
      const { Categories_name, Categories_btn, Categories_btn_remove } =
        req.query;

      let categories = new cateclass();
      let Categoriesdata = await categories.getall().then((data) => {
        return data;
      });
      // Check if the category already exists
      if (
        Categories_btn &&
        Object.values(Categoriesdata).some(
          ({ name }) => name === Categories_name
        )
      ) {
        let error = "Category bạn nhập đã tồn tại";
        return res.redirect("/admin/Categories?error=" + error);
      }

      // If the category doesn't exist, add it
      if (Categories_btn) {
        const lengdata = Object.keys(Categoriesdata).length + 1;
        // await set(ref(db, `Categories/${lengdata}`), { name: Categories_name });
        categories.post({ id: lengdata, name: Categories_name });
        return res.redirect("/admin/Categories");
      } else if (Categories_btn_remove) {
        categories.delete(Categories_btn_remove).then((data) => {
          return data;
        });
        return res.redirect("/admin/Categories");
      } else {
        loaddata();
      }
      function loaddata() {
        let html = "";
        Categoriesdata.forEach((element) => {
          html += `<tr>
          <td>${element.id}</td>
          <td>${element.name}</td>
          <td><a
            class="btn btn-danger"
          href="/admin/Categories?Categories_btn_remove=${element.id}">Xóa</a></td>
        </tr>`;
        });
        res.render("./admin/Categories", {
          layout: "layout_admin",
          Categorieslist: html,
        });
      }
    } catch (error) {
      console.error("Error in categories:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  async oders(req, res) {
    const oder = new oderclass();
    let odersdata = await oder.getall().then((data) => {
      return data;
    });
    console.log(odersdata);

    res.render("./admin/oders", { layout: "layout_admin", oders: odersdata });
  }
  // Add product
  async addproduct(req, res) {
    let storageref = new storage();
    let {
      product_brand,
      product_color,
      product_connect,
      product_price,
      product_layout,
      product_model,
      product_switch,
      product_cate,
    } = req.body;
    let product_image = req.file;
    if (
      !product_image ||
      !product_brand ||
      !product_color ||
      !product_connect ||
      !product_price ||
      !product_layout ||
      !product_model ||
      !product_switch ||
      !product_cate
    ) {
      res.redirect("/admin/product");
    } else {
      let urlimg = await storageref.uploadImage(req.file).then((data) => {
        return data;
      });
      let dataproduct = {
        brand: product_brand,
        color: product_color,
        connect: product_connect,
        price: product_price,
        layout: product_layout,
        model: product_model,
        switch: product_switch,
        image: urlimg,
        status: 1,
        cate_id: product_cate,
        totalprice: 0,
      };
      let product = new productlist();
      product.getall().then((data) => {
        const lengdata = Object.keys(data).length + 1;
        dataproduct.id = lengdata;
        product.post(dataproduct);
      });
      res.redirect("/admin/product");
    }
  }
  deleteproduct(req, res) {
    let product = new productlist();
    product.delete(req.query.id).then((data) => {
      return data;
    });
    res.redirect("/admin/product");
  }
  accept(req, res) {
    let idoder = req.query.id;
    const oder = new oderclass();
    oder.oderaccept(idoder).then((data) => {
      return data;
    });

    res.redirect("/admin/oders");
  }
  // Trang chủ admin
  async index(req, res) {
    let thongke = new thongkeclass();
    let thongleoder = await thongke.getalloder().then((data) => {
      return data;
    });
    let totalprice = await thongke.toalmoney1m().then((data) => {
      return data;
    });
    console.log(totalprice);
    res.render("./admin/home", {
      layout: "layout_admin",
      oders: thongleoder.length,
      totalprice1m: totalprice.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }),
    });
  }
}

module.exports = new adminController();
