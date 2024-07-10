const firebaseConfig = {
  apiKey: "AIzaSyBGmmu_YbfO0haWT2sKBCHr720EAmpnoYw",
  authDomain: "datasave-45308.firebaseapp.com",
  databaseURL: "https://datasave-45308-default-rtdb.firebaseio.com",
  projectId: "datasave-45308",
  storageBucket: "datasave-45308.appspot.com",
  messagingSenderId: "996364288331",
  appId: "1:996364288331:web:ce3863475c21166acce8ce",
  measurementId: "G-QNXR6R4B4P"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.database().ref("todos/").on("child_added", function(data) {
  var liElement = document.createElement("li");
  liElement.classList.add("list-item");

  var liText = document.createTextNode(data.val().todoValue);
  liElement.appendChild(liText);

  // Delete button
  var delBtn = document.createElement("button");
  delBtn.classList.add("btn", "btn-danger", "btn-sm", "mx-2");
  delBtn.textContent = "Delete";
  delBtn.setAttribute("onclick", "deleteItem(this)");
  delBtn.setAttribute("id", data.val().key);
  liElement.appendChild(delBtn);

  // Edit button
  var editBtn = document.createElement("button");
  editBtn.classList.add("btn", "btn-warning", "btn-sm");
  editBtn.textContent = "Edit";
  editBtn.setAttribute("onclick", "editItem(this)");
  editBtn.setAttribute("id", data.val().key);
  liElement.appendChild(editBtn);

  var list = document.getElementById("list");
  list.appendChild(liElement);

  document.getElementById("inputToDo").value = "";
});

function addToDo() {
  var input = document.getElementById("inputToDo");
  var id = Date.now().toString(17);
  var obj = {
      key: id,
      todoValue: input.value
  };
  firebase.database().ref("todos/" + id).set(obj);
}

function deleteAll() {
  var list = document.getElementById("list");
  list.innerHTML = "";
  firebase.database().ref("todos").remove();
}

function deleteItem(e) {
  firebase.database().ref('todos/' + e.id).remove();
  e.parentNode.remove();
}

function editItem(e) {
  var updateValue = prompt("Update your task", e.parentNode.firstChild.nodeValue);
  firebase.database().ref('todos/' + e.id).set({
      key: e.id,
      todoValue: updateValue
  });
  e.parentNode.firstChild.nodeValue = updateValue;
}
