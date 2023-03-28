const taskInput = document.querySelector('.taskInput input')
const allTasksBox = document.querySelector('.allTasks')
const filters = document.querySelectorAll('.filters span')
filters.forEach(btn => {
    btn.addEventListener("click",()=>{
        document.querySelector('span.active').classList.remove("active");
        btn.classList.add('active')
        console.log(btn.id);
        showTodo(btn.id)
    })
});
const showTodo = (filter) =>{
    let li = '';
    let todoTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (todoTasks.length != 0) {
        todoTasks.forEach((element,id) => {
            let taskDone = element.status == 'done' ? 'checked' : ''
            console.log(filter)
            if (filter == 'all') {
                li+=
                `<li class="task">
                    <label for="${id}">
                        <input onClick= "updateStatus(this)" type="checkbox" name="" id="${id}" ${taskDone}>
                        <p class="${taskDone}">${element.task}</p>
                    </label>
                    <div class="settings">
                        <i onClick= "deleteTask(${id})" class="uil uil-trash">Delete</i>
                    </div>
                </li>`
            } else if (filter == 'pending' && element.status == 'pending') {
                li+=
                `<li class="task">
                    <label for="${id}">
                        <input onClick= "updateStatus(this)" type="checkbox" name="" id="${id}" ${taskDone}>
                        <p class="${taskDone}">${element.task}</p>
                    </label>
                    <div class="settings">
                        <i onClick= "deleteTask(${id})" class="uil uil-trash">Delete</i>
                    </div>
                </li>`
            } else if (filter == 'done' && element.status == 'done') {
                li+=
                `<li class="task">
                    <label for="${id}">
                        <input onClick= "updateStatus(this)" type="checkbox" name="" id="${id}" ${taskDone}>
                        <p class="${taskDone}">${element.task}</p>
                    </label>
                    <div class="settings">
                        <i onClick= "deleteTask(${id})" class="uil uil-trash">Delete</i>
                    </div>
                </li>`
            }
            
        });
    }
    allTasksBox.innerHTML = li;
}
showTodo('all');
const deleteAllTask = () => {
    let todoTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    todoTasks = []
    localStorage.setItem('tasks', JSON.stringify(todoTasks));
    showTodo();
}
const deleteTask = (id) => {
    console.log(id);
    let todoTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let newTodo = todoTasks.splice(id,1);
    console.log(newTodo)
    localStorage.setItem('tasks', JSON.stringify(todoTasks));
    showTodo('all')
}
const updateStatus = (selectedTask) => {
    let taskName = selectedTask.parentElement.lastElementChild;
    let todoTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (selectedTask.checked){
        taskName.classList.add("checked")
        todoTasks[selectedTask.id].status = 'done';
    } else {
        taskName.classList.remove("checked");
        todoTasks[selectedTask.id].status = 'pending';
    }
    localStorage.setItem('tasks', JSON.stringify(todoTasks));
    console.log(selectedTask)
}
taskInput.addEventListener("keyup", event => {
    let userInput = taskInput.value.trim();
    if (event.key == "Enter" && userInput){
        let todoTasks = JSON.parse(localStorage.getItem("tasks"));
        if(!todoTasks) {
            todoTasks = []
        }
        let taskData = {
            task: userInput,
            status: 'pending'
        }
        todoTasks.push(taskData);
        localStorage.setItem('tasks', JSON.stringify(todoTasks));
        showTodo('all')
    }
}) 