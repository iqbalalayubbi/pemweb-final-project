import { User } from "./User.js";

const usernameInput = $('input[name="username"]');
const passwordInput = $('input[name="password"]');
const submitButton = $('button[name="submit"]');
const user = new User(usernameInput.val(), passwordInput.val());

usernameInput.on("input", function (event) {
  user.setUsername(usernameInput.val());
  checkInput();
});

passwordInput.on("input", function (event) {
  user.setPassword(passwordInput.val());
  checkInput();
});

function checkInput() {
  if (user.getUsername().length >= 3 && user.getPassword().length >= 3) {
    submitButton.attr("disabled", false);
  } else {
    submitButton.attr("disabled", true);
  }
}
