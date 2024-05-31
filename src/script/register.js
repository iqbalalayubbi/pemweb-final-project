import { User } from "./User.js";

const usernameInput = $("input[name='username']");
const passwordInput = $("input[name='password']");
const confirmPassInput = $("input[name='confirm-password']");
const submitButton = $("button[name='submit']");
const user = new User(usernameInput, passwordInput);

usernameInput.on("input", async function (e) {
  const { success, message } = await user.checkUsername(usernameInput.val());
  user.setUsername(usernameInput.val());

  if (success) {
    setInputStatus(
      ".username-status",
      message,
      "text-green-600",
      "text-red-600"
    );
  } else {
    setInputStatus(
      ".username-status",
      message,
      "text-red-600",
      "text-green-600"
    );
  }

  checkUserValid();
});

passwordInput.on("input", function (e) {
  const { success, message } = user.checkPassword(passwordInput.val());
  user.setPassword(passwordInput.val());

  if (success) {
    setInputStatus(
      ".password-status",
      message,
      "text-green-600",
      "text-red-600"
    );
  } else {
    setInputStatus(
      ".password-status",
      message,
      "text-red-600",
      "text-green-600"
    );
  }

  checkUserValid();
});

confirmPassInput.on("input", function (event) {
  const { success, message } = user.checkConfirmPassword(
    confirmPassInput.val()
  );
  user.setConfirmPassword(confirmPassInput.val());

  if (success) {
    setInputStatus(
      ".confirm-status",
      message,
      "text-green-600",
      "text-red-600"
    );
  } else {
    setInputStatus(
      ".confirm-status",
      message,
      "text-red-600",
      "text-green-600"
    );
  }

  checkUserValid();
});

function setInputStatus(element, text, addClass, removeClass) {
  $(element).html(text);
  $(element).addClass(addClass);
  $(element).removeClass(removeClass);
}

async function checkUserValid() {
  const userValid = await user.isUserValid();
  userValid
    ? submitButton.attr("disabled", false)
    : submitButton.attr("disabled", true);
}
