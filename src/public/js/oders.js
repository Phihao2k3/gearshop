let url = window.location.href;
// lấy param từ url
let urlParam = new URL(url);
let id = urlParam.searchParams.get("error");
if (id) {
  Swal.fire({
    title: "Error",
    text: "Category Đã Tồn Tại",
    icon: "error",
    confirmButtonText: "Cool",
  });
}
//

const priceRange = document.getElementById("priceRange");
const selectedPrice = document.getElementById("selectedPrice");
priceRange.addEventListener("input", () => {
  const formattedPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(priceRange.value);
  selectedPrice.textContent = `${formattedPrice}`;
});
