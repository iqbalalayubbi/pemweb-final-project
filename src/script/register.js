const formRegister = document.getElementById("form-register");
const password = document.querySelector('input[name="password"]');
const confirmPassword = document.querySelector(
  'input[name="confirm-password"]'
);
const correctIcon = document.getElementById("correct-icon");
const wrongIcon = document.getElementById("wrong-icon");

function matchPassword() {
  if (password.value !== confirmPassword.value) {
    wrongIcon.style.display = "inline-block";
    correctIcon.style.display = "none";
  } else {
    wrongIcon.style.display = "none";
    correctIcon.style.display = "inline-block";
  }
}

function checkUsername() {
  $.ajax({
    type: "POST",
    url: "../controller/checkUsername.php",
    data: { username: $("input[name='username']").val() },
    success: function (result) {
      if (result) {
        $(".username-status").html("username already exists");
        $(".username-status").addClass("text-red-600");
        $(".username-status").removeClass("text-green-600");
      } else {
        $(".username-status").html("username available");
        $(".username-status").addClass("text-green-600");
        $(".username-status").removeClass("text-red-600");
      }
    },
  });
}
