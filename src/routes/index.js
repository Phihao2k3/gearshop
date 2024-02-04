const loginrouter = require("./login.js");
const siteRouter = require("./site.js");
const productRouter = require("./product.js");
const admin_router = require("./admin_router");
const checkout = require("./checkout.js");
const cart = require("./cart.js");
const session = require("cookie-session");

function routes(app) {
  app.use(
    session({
      name: "user",
      keys: ["email", "username"],
      maxAge: 24 * 60 * 60 * 1000,
    })
  );
  app.use("/thanhtoan", checkout);
  app.use("/dangnhap", loginrouter);
  app.use("/dangxuat", (req, res) => {
    req.session = null;
    res.redirect("/");
  });
  app.use("/sanpham", productRouter);
  app.use("/cart", cart);
  app.use("/admin", admin_router);
  app.use("/", siteRouter);
}

module.exports = routes;
