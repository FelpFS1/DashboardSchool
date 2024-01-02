import { fireb } from "../firebase.js";
import { showPassword } from "../showPassword.js";
firebase.initializeApp(fireb());

export class Login {
  #password;
  constructor(email, password) {
    this.email = email;
    this.#password = password;
  }

  authenticate() {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.email, this.#password)
      .then((e) => {
        document.querySelectorAll(".blur").forEach((e) => {
          e.style = "filter:blur(10px)";
        });
        const loading = document.querySelector(".loading");
        loading.classList.add("show-loading");
        setTimeout(() => {
          document.querySelectorAll(".blur").forEach((e) => {
            e.style = "filter:blur(0)";
          });
          document.querySelector(".loading").classList.remove("show-loading");
          window.location.replace(
            "http://127.0.0.1:5500/src/pages/dashboard.html"
          );
        }, 4000);
      })
      .catch((err) => {
        const showError = document.querySelector(".error");
        showError.classList.add("show-alert");
        showError.innerText = "Verifique seus dados!";
      });
  }
}

document.getElementById("auth").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email");
  const password = document.getElementById("pass");

  new Login(email.value, password.value).authenticate();
});

document.querySelector(".fa-eye").addEventListener("click", () => {
  const password = document.getElementById("pass");
  showPassword(password);
});
