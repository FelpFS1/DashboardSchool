import { Students } from "../../classes/Students.js";
import { Teachers } from "../../classes/Teachers.js";

const firebaseConfig = {
  apiKey: "AIzaSyCj4o5N3cnCDgLsB8H-N2B3VNp8cCB3ffU",
  authDomain: "school-b1e12.firebaseapp.com",
  projectId: "school-b1e12",
  storageBucket: "school-b1e12.appspot.com",
  messagingSenderId: "84264977548",
  appId: "1:84264977548:web:dcd84a9a8f5f9c60afa7a9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("pass");
const registerBtn = document.getElementById("register");
const authBtn = document.getElementById("auth");

let obj = undefined;
function toObj(...t) {
  t.forEach((e) => {
    obj = { ...e };
  });
}

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Crie um novo documento com dados do professor usando o método .add()
  db.collection("a").add(
    new Teachers(emailInput.value, passwordInput.value, "Helena")
      .addStudent(new Students("felipe", [5, 2, 4, 6]).toObject())
      .toObject()
  );
});

authBtn.addEventListener("click", (e) => {
  e.preventDefault();

  db.collection("a")
    .doc("a9VgYbzTK4QW7yqv5zYe")
    .get()
    .then((doc) => {
      console.log(doc);
      if (doc.exists) {
        // Obtenha o array existente
        const arrayExistente = doc.data().alunos || [];

        // Adicione os novos dados ao array
        const check = arrayExistente.some((student) => student.name == "Juliana")

        
          if (!check) {
            arrayExistente.push(
             new Students("Juliana", [10, 10, 4,6]).toObject()
             );
             return db
               .collection("a")
              .doc("a9VgYbzTK4QW7yqv5zYe")
               .update({ alunos: arrayExistente });
           } 

           return console.log("Deu ruim");
    

        // Atualize o documento no Firestore com o array modificado
      } else {
        console.log("Documento não encontrado!");
      }
    })
    .then(() => {
      console.log("Dados adicionados com sucesso ao array!");
    })
    .catch((error) => {
      console.error("Erro ao adicionar dados ao array:", error);
    })})
