const { db, ref, set, get, child } = require("../../config");
const layout_logn = "layout_login";
class loginController {
  index(req, res) {
    res.render("login", { layout: layout_logn });
  }
  async login(req, res) {
    try {
      // res.render("login", { layout: layout_logn });
      let { email, password, btn_login, btn_signup } = req.body;

      if (btn_login) {
        console.log("btn_login");

        const usersRef = ref(db, "users");
        const usersSnapshot = await get(usersRef);

        if (usersSnapshot.exists()) {
          const usersData = usersSnapshot.val();
          console.log(usersData);
          for (const userId in usersData) {
            const user = usersData[userId];

            if (user.email === email && user.password === password) {
              console.log("Login success");
              res.redirect("/home");
              return;
            }
          }

          console.log("Invalid email or password");
          // Handle invalid email or password
        } else {
          console.log("No users data available");
          // Handle no users data available
        }
      } else if (btn_signup) {
        let { regemail, regpassword } = req.body;
        console.log(req.body);
        const usersRef = ref(db, "users");
        const usersSnapshot = await get(usersRef);
        if (usersSnapshot.exists()) {
          const userdata = usersSnapshot.val();
         const lengdata = Object.keys(userdata).length;
         
          for (const items in userdata) {
            const user = userdata[items];
            if (user.email === regemail) {
              console.log("Email already exists");
              return;
            }else{
              set(ref(db, `users/${lengdata}`), {
                email: regemail,
                password: regpassword,
              });
              console.log("Sign up success");
              res.redirect("/dangnhap");
              return;
            }
          }
        }
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
