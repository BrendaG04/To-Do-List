import React, {useState, useEffect} from 'react'

function ToDoList(){

    const [tasks,setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [completedTasks, setCompletedTasks] = useState({});

    useEffect(() => {
        document.title = `To-Do List`;
    },[]);

    function handleInputChange(event){
        setNewTask(event.target.value);
    }

    function addTask(){
        if(newTask.trim() !== ""){
            setTasks(()=> [...tasks, newTask]);
            setCompletedTasks({ ...completedTasks, [tasks.length]: false });
            setNewTask("");
        }else{
            window.alert("Not a Valid Task");
        }
    }

    function removeTask(index){
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);

        const updatedCompletedTasks = {};
        updatedTasks.forEach((_, i) => {
            updatedCompletedTasks[i] = completedTasks[i < index ? i : i + 1] || false;
        });
    
        setCompletedTasks(updatedCompletedTasks);
    }

    function editTask(index){
        const updatedTask = prompt("Edit your task:", tasks[index]);
        if (updatedTask !== null){
            const updatedTasks = [...tasks];
            updatedTasks[index] = updatedTask;
            setTasks(updatedTasks);
        }
    }

    function moveTaskUp(index){
        if (index > 0){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index-1]] =[updatedTasks[index-1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index){
        if (index <tasks.length - 1 ){
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index+1]] =[updatedTasks[index+1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function toggleTaskCompletion(index) {
        setCompletedTasks((prev) => ({
          ...prev,
          [index]: !prev[index], 
        }));
      }

    function getProgress() {
        const completedCount = Object.values(completedTasks).filter(Boolean).length;
        return tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100;
    }

    return(<>
    <div className='toDoList'>
        <h1>To-Do List</h1>

        <div className="progress-container">
            <label>Progress: </label>
            <progress id="progressBar" value={getProgress()} max="100"></progress>
            <span id="progressText">{Math.round(getProgress())}%</span>
        </div>

        <div className = "todoContainer">
            <div>
                <input type="text" id="taskInput" placeholder="Enter Task Here" value={newTask} onChange={handleInputChange}/>
                <button className="addTaskBtn" onClick={addTask}>Add</button>
            </div>


            <div className='listContainer'>
                <ol id="taskList">
                    {tasks.map((task, index) => 
                        <li key={index}> 
                            <input type="checkbox" className="task-checkbox" checked={completedTasks[index] || false}  onChange={() => toggleTaskCompletion(index)}/>                            
                            <span className='task-text'>{task}</span>
                            
                            <button className="editTaskBtn" onClick={ () => editTask(index)}>
                                <i className="fas fa-pencil-alt"></i>
                            </button>

                            <button className="deleteTaskBtn" onClick={() => removeTask(index)}>
                                <i className="fas fa-trash"></i>
                            </button>

                            <button className="moveUpBtn" onClick={() => moveTaskUp(index)}>
                                <i className="fa-solid fa-arrow-up"></i>
                            </button>

                            <button className="moveDownBtn" onClick={() => moveTaskDown(index)}>
                                <i className="fa-solid fa-arrow-down"></i>
                            </button>
                    </li>)}
                </ol>
            </div>

        </div>

    </div>

    </>);
}

export default ToDoList;