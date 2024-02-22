const { db, ref, set, get, child } = require("../../config");
const user = require("../../public/js/module_AP/user");
const layout_logn = "layout_login";

class loginController {
  index(req, res) {
    res.render("login", { layout: layout_logn });
  }

  async login(req, res) {
    try {
      let {
        regemail,
        regpassword,
        username,
        email,
        password,
        btn_login,
        btn_signup,
      } = req.body;
      if (btn_login) {
        const newUser = new user();
        newUser.login(email, password).then((result) => {
          console.log(result);
          if (result.status) {
            req.session.email = result.email;
            req.session.username = result.username;
            req.session.id = result.id;

            res.redirect("/home");
          }else{
            res.render("login", { layout: layout_logn, message: "Sai thông tin đăng nhập" });
          }
        });
      } else if (btn_signup) {
        const newUser = new user();
        newUser.register(regemail, regpassword, username).then((result) => {
          res.render("login", { layout: layout_logn, message: result });
        });
      }
    } catch (error) {
      console.error(error);
      // Handle other errors
    }
  }
  show(req, res) {
    res.send("show forgot passwor2d");
  }
}

module.exports = new loginController();
