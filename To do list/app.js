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
  var app = firebase.initializeApp(firebaseConfig);
  firebase.database().ref("todos/").on("child_added",function(data){
    console.log(data.val().todoValue);
    var liElement = document.createElement("li");
  
    var liText = document.createTextNode(data.val().todoValue);

    liElement.appendChild(liText);
  
    // ***********************Delete button**********************************
  
    var delbtn = document.createElement("button");
  
    var delbtnText = document.createTextNode("Delete");
  
    delbtn.appendChild(delbtnText);
  
    delbtn.setAttribute("onclick", "deleteItem(this)");
    delbtn.setAttribute("id",data.val().key);
  
    liElement.appendChild(delbtn);
  
    // ***********************Edit button**********************************
  
    var editbtn = document.createElement("button");
  
    var editbtnText = document.createTextNode("Edit");
  
    editbtn.appendChild(editbtnText);
  
    liElement.appendChild(editbtn);
  
    editbtn.setAttribute("onclick", "editItem(this)");
    editbtn.setAttribute("id",data.val().key);

  
    var list = document.getElementById("list");
  
    list.appendChild(liElement);
  
    // console.log(liElement);
  
    input.value = "";
  }
  

)

  //todo app work//
function addtoDo(){
    var input = document.getElementById("inputtoDo");
var id = Date.now().toString(17)
var obj = {
    key : id,
    todoValue : input.value
}


firebase.database().ref("todos/"+id).set(obj);
// console.log(input.value)
}

function deleteAll(){
    var list = document.getElementById("list");
    list.innerHTML =" " 
}
function deleteItem(e){
    firebase.database().ref('todos/'+e.id).remove()
    e.parentNode.remove();
}
function editItem(e){
    var updateValue = prompt("Update your task", e.parentNode.firstChild.nodeValue);
    firebase.database().ref('todos/'+e.id).set({
        key:e.id,
        todoValue: updateValue,
    })

    e.parentNode.firstChild.nodeValue = updateValue
}