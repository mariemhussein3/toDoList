const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const btnSubmit = document.querySelector("#btnSubmit");
const btnDelete = document.querySelector("#btnDelete");
const btnEdit = document.querySelector("#btnEdit");
const btnUpdate = document.querySelector("#btnUpdate");
let totalMyApps = [];
if (localStorage.getItem("myApps") != null) {
  totalMyApps = JSON.parse(localStorage.getItem("myApps"));
  displayMyApp();
}

let addApp = () => {
  if (validApp()) {
    let myApps = {
      content: todoInput.value,
    };
    totalMyApps.push(myApps);
    displayMyApp();
    localStorage.setItem("myApps", JSON.stringify(totalMyApps));
  }
};
btnSubmit.addEventListener("click", function () {
  if (todoInput.value.trim() !== "") {
    addApp();
    todoInput.value = "";
  }
});

let deleteApp = (index) => {
  totalMyApps.splice(index, 1);
  displayMyApp();
  localStorage.setItem("myApps", JSON.stringify(totalMyApps));
};

function displayMyApp() {
  temp = ``;

  for (let i = 0; i < totalMyApps.length; i++) {
    let { content } = totalMyApps[i];
    temp += `
<li 
 class=" d-flex align-items-center justify-content-between gap-5">${content} <button type="button" class="btn" onclick=deleteApp(${i}) id="btnDelete">
  Delete
  </button>
   <button type="button" class="btn" onclick=updateApp(${i}) id="btnUpdate">Updata</button> 
     </li>
  `;
  }
      todoList.innerHTML = temp;
}

btnEdit.addEventListener("click", function () {
  editApp();
});

function updateApp(updateIndex) {
  editIndex = updateIndex;
  btnEdit.classList.remove("d-none");
  btnSubmit.classList.add("d-none");
  todoInput.value = totalMyApps[updateIndex].content;
}

function editApp() {
  btnEdit.classList.add("d-none");
  btnSubmit.classList.remove("d-none");
  totalMyApps[editIndex].content = todoInput.value;
  clear();
  displayMyApp();
  localStorage.setItem("myApps", JSON.stringify(totalMyApps));
}
let clear = () => {
  todoInput.value = null;
};
function validApp() {
  var regex = /^[a-zA-Z0-9]{3,}$/;
  var valid = todoInput.value;
  if (regex.test(valid)) {
    return true;
  } else {
    return false;
  }
}
