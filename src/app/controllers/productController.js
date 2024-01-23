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
class productController {
  async showall(req, res) {
    // get data
    const productrf = ref(db, "product");
    const snapshot = await get(productrf);
    const productdata = snapshot.val();
    let promises = [];
    // Create a reference with an initial file path and name
    productdata.forEach((element) => {
      const storage = getStorage();
      const pathReference = storageRef(storage, element.image);
      const promise = getDownloadURL(pathReference)
        .then((url) => {
          return `<div class="col-12 col-md-4 col-lg-3 mb-5">
          <a class="product-item" href="/sanpham/sanphamchitiet?id=${element.id}">
          <img
            src="${url}"
            class=""
            width="246px"
            height="246px"
          />
          <h3 class="product-title">${element.brand} ${element.model}</h3>
          <strong class="product-price">$50.00</strong>

          <span class="icon-cross">
            <img src="/images/cross.svg" class="img-fluid" />
          </span>
        </a>
        </div>
          `;
        })
        .catch((error) => {
          console.log(error);
        });
      promises.push(promise);
    });
    const productDetails = await Promise.all(promises.filter(Boolean)); //
    console.log(productDetails);
    res.render("shop", {
      productlist: productDetails,
    });
  }
  async showdetail(req, res) {
    const id = req.query.id;
    const productrf = ref(db, "product");
    const snapshot = await get(productrf);
    const productdata = snapshot.val();
    let data = {};
    productdata.map((element) => {
      if (element.id == id) {
        data = element;
      }
    });
    console.log(data);
    const storage = getStorage();
    const pathReference = storageRef(storage, data.image);
    const url = await getDownloadURL(pathReference);
    data.image = url;

    res.render("shopdetail", {
      name: `${data.brand} ${data.model}`,
      brand: data.brand,
      model: data.model,
      color: data.color,
      connect: data.connection,
      switch: data.switch,
      image: data.image,
      price: Number(data.price).toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      }),
    });
  }
}
module.exports = new productController();
