const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
// onkeyup event
inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value; //getting user entered value
    if (userEnteredValue.trim() != 0) {
        //if the user value isn't only spaces
        addBtn.classList.add("active"); //active the add button
    } else {
        addBtn.classList.remove("active"); //unactive the add button
    }
};

showTasks(); //calling showTask function
addBtn.onclick = () => {
    //when user click on plus icon button
    let userEnteredValue = {
        name: inputBox.value,
    }; //getting input field value
    if (inputBox.value == "") {
        alert("Enter something first!");
        return;
    }
    console.log(userEnteredValue);
    let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
    if (getLocalStorageData == null) {
        //if localstorage has no data
        listArray = []; //create a blank array
    } else {
        listArray = JSON.parse(getLocalStorageData); //transforming json string into a js object
    }

    if (userEnteredValue == "") {
        alert("Enter something first!");
        return;
    }
    listArray.push(userEnteredValue); //pushing or adding new value in array
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
    showTasks(); //calling showTask function
    addBtn.classList.remove("active"); //unactive the add button once the task added
};

function showTasks() {
    todoList.innerHTML = "";
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
    if (listArray.length > 0) {
        //if array length is greater than 0
        deleteAllBtn.classList.add("active"); //active the delete button
    } else {
        deleteAllBtn.classList.remove("active"); //unactive the delete button
    }

    // console.log(listArray);
    listArray.forEach((element, index) => {
        let newLiTag = "";
        newLiTag += `<li>${element.name}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li><br>`;
        todoList.insertAdjacentHTML("afterbegin", newLiTag); //adding new li tag inside ul tag
    });
    // console.log(newLiTag);

    inputBox.value = "";
}
// delete task function
function deleteTask(index) {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    console.log(listArray);
    listArray.splice(index, 1); //delete or remove the li
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //call the showTasks function
}
// delete all tasks function
deleteAllBtn.onclick = () => {
    todoList.innerHTML = "";
    listArray = []; //empty the array
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
    showTasks(); //call the showTasks function
};