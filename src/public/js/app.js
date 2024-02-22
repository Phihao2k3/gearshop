const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
};
loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};
signupLink.onclick = () => {
  signupBtn.click();
  return false;
};

// Sử dụng AJAX để gửi yêu cầu đến server
var xhr = new XMLHttpRequest();
xhr.open("POST", "/dangnhap", true);
xhr.setRequestHeader("Content-Type", "application/json");

// Xử lý sự kiện khi nhận được phản hồi từ server
xhr.onload = function () {
  if (xhr.status === 200) {
    var data = JSON.parse(xhr.responseText);
    // Xử lý dữ liệu nhận được từ server
    console.log(data);
    // Hiển thị thông báo hoặc thực hiện các hành động khác tùy thuộc vào dữ liệu nhận được
    if (data.success) {
      alert(data.message);
    } else {
      alert("Đăng ký không thành công: " + data.message);
    }
  } else {
    console.error("Đã xảy ra lỗi khi nhận dữ liệu từ server.");
  }
};

// Gửi yêu cầu đến server
xhr.send();
