import { fireb } from "../firebase.js";
import { checkingPassword } from "../checkingPassword.js";
import { showPassword } from "../showPassword.js";

firebase.initializeApp(fireb());

class Register {
  #password;
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.#password = password;
  }

  static checkPassword() {
    const password = document.getElementById("password");
    const passwordAgain = document.getElementById("password-again");
    const floatPasswordAlert = document.querySelector(".password-float");

    if (checkingPassword(password, passwordAgain)) {
      return true;
    } else {
      floatPasswordAlert.classList.add("show-alert");
      setTimeout(() => {
        floatPasswordAlert.classList.remove("show-alert");
      }, 3000);
      return false;
    }
  }

  register() {
    if (Register.checkPassword()) {
      const floatSucess = document.querySelector(".register-sucess");
      const usersCollection = firebase.firestore().collection("users");
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.#password)
        .then((data) => {
          floatSucess.classList.add("show-alert");
          setTimeout(() => {
            floatSucess.classList.remove("show-alert");
          }, 3000);
          const userId = data.user.uid;
          usersCollection.doc(userId).set({
            name: this.name,
            email: this.email,
          });
          window.location.replace(
            "https://schooldash.vercel.app/pages/login.html")
        })
        .catch((error) => {
          const err = {
            "auth/email-already-in-use": "Esse email já está sendo ultilizado!",
            "auth/invalid-email":
              "Email mal formatado! Use nesse formato: email@email.com",
          };
          if (err[error.code]) {
            const innerError = document.getElementById("error-email");
            const showError = document.querySelector(".error-email");

            innerError.innerText = err[error.code];
            showError.classList.add("show-alert");

            setTimeout(() => {
              showError.classList.remove("show-alert");
            }, 5000);
          }
        });
    }
  }
}
document.getElementById("register").addEventListener("click", (e) => {
  const user = {
    name: document.getElementById("fullname"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
  };
  e.preventDefault();


  new Register(
    user.name.value,
    user.email.value,
    user.password.value
  ).register();
});

document.querySelector(".fa-eye").addEventListener("click", () => {
  const password = document.getElementById("password");
  const passwordAgain = document.getElementById("password-again");
  showPassword(password, passwordAgain);
});
