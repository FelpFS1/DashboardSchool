import { Students } from "../js/class/Students.js";
import { fireb } from "../js/firebase.js";

firebase.initializeApp(fireb());

window.onload = function loggedUserCheck() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      function addStudent(dataUser) {
        const user = firebase.auth().currentUser;
        const uid = user.uid;

        const student = new Students(dataUser.name, [
          Number(dataUser.firtsNote),
          Number(dataUser.secondNote),
          Number(dataUser.thirdNote),
          Number(dataUser.fourthNote),
        ]);
        firebase
          .firestore()
          .collection(uid)
          .doc(student.id)
          .set(student.toObject())
          .then((data) => {
            clearFormAndHide("add-students");
          })
          .catch((err) => {
            console.log("deu ruim", err);
          });
      }

      function editStudent(studentId) {
        const user = firebase.auth().currentUser;
        const uid = user.uid;

        firebase
          .firestore()
          .collection(uid)
          .doc(studentId)
          .get()
          .then((doc) => {
            
            document.getElementById("edit-students").style.display = "block";
            document.getElementById("edit-name").value = doc.data().name;
            document.getElementById("edit-note1").value = doc.data().notas[0];
            document.getElementById("edit-note2").value = doc.data().notas[1];
            document.getElementById("edit-note3").value = doc.data().notas[2];
            document.getElementById("edit-note4").value = doc.data().notas[3];
            document
              .getElementById("form-edit-student")
              .addEventListener("submit", (e) => {
                e.preventDefault();
                const student = new Students(
                  document.getElementById("edit-name").value,
                  [
                    Number(document.getElementById("edit-note1").value),
                    Number(document.getElementById("edit-note2").value),
                    Number(document.getElementById("edit-note3").value),
                    Number(document.getElementById("edit-note4").value),
                  ]
                );
                student.id = studentId;
                firebase
                  .firestore()
                  .collection(uid)
                  .doc(studentId)
                  .set(student.toObject())
                  .then(() => {
                    document.getElementById("edit-students").style.display =
                      "none";
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }

      function deleteStudent(studentId) {
        const user = firebase.auth().currentUser;
        const uid = user.uid;

        firebase
          .firestore()
          .collection(uid)
          .doc(studentId)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      }

      function showDataStudent(studentId){
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const showData = document.getElementById('show-data-students').style.display = 'block';
        const name = document.getElementById('show-name');
        const notes = document.getElementById('show-notes');
        const situation = document.getElementById('show-situation');
        const media = document.getElementById('show-media');
        const closeBtn = document.getElementById('close-show');

        firebase
          .firestore()
          .collection(uid)
          .doc(studentId)
          .get().then((resp) => {
            const data = resp.data()
            name.innerText = data.name
            notes.innerText = data.notas
            situation.innerText = data.situation
            media.innerText = data.media

            closeBtn.addEventListener('click',() => {
              const showData = document.getElementById('show-data-students').style.display = 'none';
            })

          }).catch((err) => {
            console.log(err.message);
          })

      }

      function clearFormAndHide(tag) {
        document.getElementById("name").value = "";
        document.getElementById("note1").value = "";
        document.getElementById("note2").value = "";
        document.getElementById("note3").value = "";
        document.getElementById("note4").value = "";
        document.getElementById(tag).style.display = "none";
      }

      function cancelEditOrAddStudent(idTag) {
        document.getElementById(idTag).style.display = "none";
      }

      function logout() {
        document.querySelectorAll(".blur").forEach((e) => {
          e.style = "filter:blur(10px)";
          document.querySelector(".loading").classList.add("show-loading");
        });
        setTimeout(() => {
          firebase
            .auth()
            .signOut()
            .then(() => {})
            .catch((error) => {
              console.log("error");
            });
        }, 4000);
      }

      document
        .getElementById("add-studentbtn")
        .addEventListener("click", () => {
          document.getElementById("add-students").style.display = "block";
          document
            .getElementById("form-student")
            .addEventListener("submit", (e) => {
              e.preventDefault();
              const dataUser = {
                name: document.getElementById("name").value,
                firtsNote: document.getElementById("note1").value,
                secondNote: document.getElementById("note2").value,
                thirdNote: document.getElementById("note3").value,
                fourthNote: document.getElementById("note4").value,
              };
              addStudent(dataUser);
            });
        });

      firebase.auth().onAuthStateChanged((user) => {
        const id = user.uid;

        firebase
          .firestore()
          .collection(id)
          .onSnapshot((doc) => {
            const ul = document.getElementById("ul-students");
            ul.innerHTML = "";
            doc.forEach((e) => {
              
              const switchColor = {
                Reprovado: `<span class="situation-student" style="background-color: #FF495F;">Reprovado</span>${
                  e.data().name
                }<button title="edit" data-id="${
                  e.data().id
                }" class="edit-button"><i class="fa-regular fa-pen-to-square"></i></button><button class="delete-student" title="delete" data-id="${
                  e.data().id
                }"><i class="fa-solid fa-trash"></i></button><button class ="show-data" title="show" data-id="${
                  e.data().id
                }"><i class="fa-regular fa-eye"></i></button>`,
                Pendente: `<span class="situation-student" style="background-color: #ffd400;">Pendente</span>${
                  e.data().name
                }<button title="edit" data-id="${
                  e.data().id
                }" class="edit-button"><i class="fa-regular fa-pen-to-square"></i></button><button class="delete-student" title="delete" data-id="${
                  e.id
                }"><i class="fa-solid fa-trash"></i></button><button class ="show-data" title="show" data-id="${
                  e.data().id
                }"><i class="fa-regular fa-eye"></i></button>`,
                Aprovado: `<span class="situation-student" style="background-color: #01b399;">Aprovado</span>${
                  e.data().name
                }<button title="edit" data-id="${
                  e.data().id
                }" class="edit-button"> <i class="fa-regular fa-pen-to-square"></i></button><button class="delete-student" title="delete" data-id="${
                  e.data().id
                }"><i class="fa-solid fa-trash"></i></button><button class ="show-data" title="show" data-id="${
                  e.data().id
                }"><i class="fa-regular fa-eye"></i></button>`,
              };
              const li = document.createElement("li");
              li.innerHTML = switchColor[e.data().situation];
              ul.appendChild(li);
              const editButton = li.querySelector(".edit-button");
              // EVENTO PARA EDITAR OS DADOS DE ALGUM ALUNO
              editButton.addEventListener("click", (e) => {
                const studentId = e.currentTarget.getAttribute("data-id");
                editStudent(studentId);
              });

              const deleteButton = li.querySelector(".delete-student");
              // EVENTO PARA DELETAR UM ALUNO
              deleteButton.addEventListener("click", (e) => {
                const studentId = e.currentTarget.getAttribute("data-id");
                deleteStudent(studentId);
              });
              // EVENTO PARA CANCELAR A EDIÇÃO DE UM ALUNO
              document
                .getElementById("cancel-edit")
                .addEventListener("click", () => {
                  cancelEditOrAddStudent("edit-students");
                });

              // EVENTO PARA CANCELAR A ADIÇÃO DE UM ALUNO
              document
                .getElementById("cancel-add")
                .addEventListener("click", () => {
                  cancelEditOrAddStudent("add-students");
                });


              // EVENDO PARA VER OS DADOS DO ALUNO
              const  showButton = li.querySelector(".show-data");

              showButton.addEventListener('click',(e) => {
                const studentId = e.currentTarget.getAttribute("data-id");
                showDataStudent(studentId)
              })
            });
          });
      });

      firebase.auth().onAuthStateChanged((user) => {
        const id = user.uid;
        firebase
          .firestore()
          .collection("users")
          .doc(id)
          .get()
          .then((doc) => {
            document.getElementById("name-teacher").innerText = doc.data().name;
          });
      });

      document.querySelector(".logout").addEventListener("click", logout);
    } else {
      window.window.location.replace(
        "http://127.0.0.1:5500/src/pages/login.html"
      );
    }
  });
};
