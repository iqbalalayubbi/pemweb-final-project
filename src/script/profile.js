const loadFile = function (event) {
  const image = document.getElementById("output");
  const file = event.target;
  const formData = new FormData();
  const selectedFile = file.files[0];
  formData.append("file", selectedFile);

  const param = {
    method: "POST",
    headers: {},
    body: formData,
  };

  image.src = URL.createObjectURL(file.files[0]);

  fetch("../controller/uploadFile.php", param)
    .then((response) => response.text())
    .then((isSuccess) => {
      if (isSuccess) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your picture has been saved",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    });
};

const enableInput = function (event) {
  const inputTarget = $(event.target).prev();
  const isDisabled = inputTarget.attr("disabled");
  if (isDisabled) inputTarget.attr("disabled", false);
  else inputTarget.attr("disabled", true);
};

const saveData = function (event) {
  const username = $("input[name=username]").val();
  const email = $("input[name=email]").val();
  const password = $("input[name=password]").val();
  const data = {};

  if (username.length >= 3) data.username = username;
  if (email.length >= 5) data.email = email;
  if (password.length >= 5) data.password = password;

  $.ajax({
    type: "POST",
    url: "../controller/updateUser.php",
    data,
  }).then((res) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your profile has been saved",
      showConfirmButton: false,
      timer: 1000,
    }).then(() => (window.location.href = "task.php"));
  });
};
