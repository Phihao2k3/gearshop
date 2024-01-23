const loginrouter = require("./login.js");
const siteRouter = require("./site.js");
const productRouter = require("./product.js");
const admin_router = require("./admin_router");

function routes(app) {
    app.use("/dangnhap", loginrouter);
    app.use("/home", siteRouter);
    app.use("/sanpham", productRouter);
    app.use("/admin", admin_router);
}
module.exports = routes;
