const {
  db,
  set,
  get,
  ref,
  child,
  onValue,
  getStorage,
  storageRef,
  getDownloadURL,
  listAll,
} = require("../../config");

class adminController {
  async product(req, res) {
    console.log(1);
    try {
      const productRef = ref(db, "product");
      const snapshot = await get(productRef);

      // Chuyển snapshot thành mảng
      const snapshotArray = [];
      snapshot.forEach((childSnapshot) => {
        snapshotArray.push(childSnapshot);
      });

      const storage = getStorage();

      const productPromises = snapshotArray.map(async (element) => {
        const pathReference = storageRef(storage, element.val().image);
        const url = await getDownloadURL(pathReference);

        return `<tr>
                  <td>${element.key}</td>
                  <td>${element.val().brand}</td>
                  <td>${element.val().model}</td>
                  <td>${element.val().price}</td>
                  <td><img src="${url}" width="100px" height="100px"></td>
                  <td><a href="/admin/product?product_btn_remove=${
                    element.key
                  }">Xóa</a></td>
                </tr>`;
      });

      const productRows = await Promise.all(productPromises);
      const html = productRows.join(""); // Nối tất cả các hàng vào một chuỗi HTML

      // console.log(html);
      res.render("./admin/product", {
        layout: "layout_admin",
        productlist: html,
      });
    } catch (error) {
      console.error("Error in product:", error);
      res.status(500).send("Internal Server Error");
    }
  }

  async categories(req, res) {
    try {
      const { Categories_name, Categories_btn, Categories_btn_remove } =
        req.query;
      const categoriesRef = ref(db, "Categories");

      // Load data
      const snapshot = await get(categoriesRef);
      const Categoriesdata = snapshot.val() || {}; // nếu snapshot.val() == null thì Categoriesdata = {}
      console.log(Categoriesdata);
      // Check if the category already exists
      if (
        Categories_btn &&
        Object.values(Categoriesdata).some(
          ({ name }) => name === Categories_name
        )
      ) {
        console.log("Categories already exists");
        return res.redirect("/admin/Categories");
      }

      // If the category doesn't exist, add it
      if (Categories_btn) {
        const lengdata = Object.keys(Categoriesdata).length;
        await set(ref(db, `Categories/${lengdata}`), { name: Categories_name });
        console.log("Add Categories success");

        // Load data again after adding a new category
        const updatedSnapshot = await get(categoriesRef);
        const updatedCategoriesdata = updatedSnapshot.val() || {};

        // render trang categories
        const html = Object.entries(updatedCategoriesdata)
          .map(
            ([items, { name }]) => `<tr>
            <td>${items}</td>
            <td>${name}</td>
            <td><a href="/admin/Categories?id=${items}">Xóa</a></td>
          </tr>`
          )
          .join("");

        return res.render("./admin/Categories", {
          layout: "layout_admin",
          Categorieslist: html,
        });
      } else if (Categories_btn_remove) {
        req.query.Categories_btn_remove = null;
        // Remove the category
        await set(ref(db, `Categories/${Categories_btn_remove}`), null);
        return res.redirect("/admin/Categories");
      }

      // Render the page with loaded data
      const html = Object.entries(Categoriesdata)
        .map(
          ([items, { name }]) => `<tr>
          <td>${items}</td>
          <td>${name}</td>
          <td><a href="/admin/Categories?Categories_btn_remove=${items}">Xóa</a></td>
        </tr>`
        )
        .join("");
      res.render("./admin/Categories", {
        layout: "layout_admin",
        Categorieslist: html,
      });
    } catch (error) {
      console.error("Error in categories:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  async oders(req, res) {
    const oderRef = ref(db, "orders");
    const snapshot = await get(oderRef);
    const oderdata = snapshot.val() || {};
    let html = "";
    oderdata.forEach((element) => {
      html += `<tr>
      <td>${element.id}</td>
      <td>${element.customer_name}</td>
      <td>${element.customer_phone_number}</td>
      <td>${element.customer_address}</td>
      <td>${element.customer_email}</td>
      <td>${element.created_date}</td>
      <td>${element.status}</td>
      <td><button type="button" class="btn btn-detail btn-primary" data-toggle="modal" data-target="#exampleModal" name="btn_detail" value="${element.id}">
      Chi tiết
    </button></td>
    </tr>`;
    });

    res.render("./admin/oders", { layout: "layout_admin", oderlist: html });
  }
  // Trang chủ admin
  index(req, res) {
    res.render("./admin/home", { layout: "layout_admin" });
  }
}

module.exports = new adminController();
