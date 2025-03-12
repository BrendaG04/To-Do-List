//To-Do List program

//Declare Variables
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");


//methods

//Onclick when adding a task 
function addTask(){
    const taskText = taskInput.value.trim();
    if (taskText !==''){
        const newTask = document.createElement("li");

        newTask.innerHTML = `
                                <input type="checkbox" class="task-checkbox">
                                <span class= "task-text"> ${taskText}</span>
                                <button class="editTaskBtn" onclick="editTask()">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button class="deleteTaskBtn" onclick="deleteTask()">
                                    <i class="fas fa-trash"></i>
                                </button>
                            `;

        taskList.appendChild(newTask);
        taskInput.value = "";
        updateProgress();
    }else{
        window.alert("Not a Valid Task");
    }
}

//Onclick when deleting a task
function deleteTask(button){
    taskList.removeChild(button);
    updateProgress();
}


//Onclick when editing a task
function editTask(button){
    const taskText = button.querySelector(".task-text");
    const newText = prompt("Edit Task:", taskText.innerText);

    if(newText !== null && newText.trim() !== ""){
        taskText.innerText = newText;
    }

    updateProgress();
}

// task completed method

taskList.addEventListener("click", function (e) {
    if (e.target && e.target.matches(".editTaskBtn, .editTaskBtn *")) {
        const taskItem = e.target.closest('li'); 
        editTask(taskItem); 
    }
    if (e.target && e.target.matches(".deleteTaskBtn, .deleteTaskBtn *")) {
        const taskItem = e.target.closest('li');  
        deleteTask(taskItem);  
    }
    if (e.target && e.target.matches("input[type='checkbox']")) {
        const taskText = e.target.nextElementSibling; 
        taskText.classList.toggle("completed");
        updateProgress();
    }

});

//Updadting progress bar when a task is completed
function updateProgress(){
    const totalTasks = taskList.children.length; 
    const completedTasks = taskList.querySelectorAll("input[type='checkbox']:checked").length;  

    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    
    progressBar.value = progress;  
    progressText.innerText = `${progress}%`;  


}






//stop watch program
const display = document.getElementById('stopwatchDisplay');
let timer = null;
let startTime =0;
let elapsedTime =0;
let isRunning = false;
let timeRecords = [];

function start(){
    if (!isRunning){
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateStopwatch, 10);
        isRunning = true;
    }
}
function stop(){
    if (isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
        recordTime();
    }
}
function reset(){
    clearInterval(timer);
    startTime =0;
    elapsedTime =0;
    isRunning = false;
    display.textContent = "00:00:00:00"
}
function updateStopwatch(){
    const currentTime= Date.now();
    elapsedTime = currentTime - startTime;
    
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    hours = hours.toString().padStart(2,"0");
    minutes = minutes.toString().padStart(2,"0");    
    seconds = seconds.toString().padStart(2,"0");
    milliseconds = milliseconds.toString().padStart(2,"0");

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
function recordTime(){
    const currentTime = display.textContent;
    timeRecords.push(currentTime);
    displayRecords(); 
}
function displayRecords(){
    recordDisplay.innerHTML = ''; 
    timeRecords.forEach((time, index) => {
        const recordItem = document.createElement('li');
        recordItem.textContent = `Record ${index + 1}: ${time}`;
        recordDisplay.appendChild(recordItem);
    });
}



