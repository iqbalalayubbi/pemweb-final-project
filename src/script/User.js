export class User {
  #username = "";
  #password = "";
  #confirmPassword = "";

  constructor(username, password) {
    this.#username = username;
    this.#password = password;
  }
  getUsername() {
    return this.#username;
  }
  getPassword() {
    return this.#password;
  }
  async checkUsername(username) {
    const usernameExist = await $.ajax({
      type: "POST",
      url: "../controller/checkUsername.php",
      data: { username },
      async: true,
    });

    const data = {
      success: Boolean,
      message: String,
    };

    if (username.length < 3) {
      data.success = false;
      data.message = "username at least 3 characters";
    } else {
      if (usernameExist) {
        data.success = false;
        data.message = "username already exists";
      } else {
        data.success = true;
        data.message = "username available";
      }
    }
    return data;
  }

  checkPassword(password) {
    const data = {
      success: Boolean,
      message: String,
    };

    if (password.length < 5) {
      data.success = false;
      data.message = "password at least 5 characters";
    } else {
      data.success = true;
      data.message = "good password";
    }

    return data;
  }

  checkConfirmPassword(password) {
    const data = {
      success: Boolean,
      message: String,
    };

    if (this.#password != password) {
      data.success = false;
      data.message = "password does not match";
    } else {
      data.success = true;
      data.message = "password match";
    }

    return data;
  }
  setUsername(username) {
    this.#username = username;
  }
  setPassword(password) {
    this.#password = password;
  }
  setConfirmPassword(password) {
    this.#confirmPassword = password;
  }

  async isUserValid() {
    const { success: usernameValid } = await this.checkUsername(this.#username);
    const { success: passwordValid } = this.checkPassword(this.#password);
    const { success: confirmPasswordValid } = this.checkConfirmPassword(
      this.#confirmPassword
    );
    return usernameValid && passwordValid && confirmPasswordValid;
  }
}
