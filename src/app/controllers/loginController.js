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
      console.log(req.body);
      if (btn_login) {
        const newUser = new user();
        newUser.login(email, password).then((result) => {
          console.log(result);
          if (result[0].status) {
            req.session.email = result[0].email;
            req.session.username = result[0].username;
            req.session.id = result[0].id;

            res.redirect("/home");
          }
        });
      } else if (btn_signup) {
        const newUser = new user();
        newUser.register(regemail, regpassword, username).then((result) => {
          if (result) {
            res.redirect("/home");
            req.session.email = result[0].email;
            req.session.username = result[0].username;
            req.session.id = result[0].id;
          } else {
            res.redirect("/login");
          }
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
