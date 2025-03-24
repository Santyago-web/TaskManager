let arrayTasks = [];
/*let arrayCheckboxFilter = [];

const completedFilter = document.getElementById('completed');

const checkboxFilter = {
    completed: completedFilter.checked
}

arrayCheckboxFilter.push(checkboxFilter);
localStorage.setItem('arrayCheckboxFilter', JSON.stringify(arrayCheckboxFilter));*/


function setupEventListeners(changeBtn, clearBtn, checkBox, textElement, taskElement, arrayTasks) {

    changeBtn.addEventListener('click', function () {
        const taskElement = this.parentNode;
        let textElement = taskElement.querySelector('span');
        let newText = prompt('Write new name of task', textElement.textContent);
        const idTask = this.dataset.taskId;
        let index = arrayTasks.findIndex((task) => task.id === idTask);
        arrayTasks[index].name = newText;
        if (newText !== null) {
            textElement.textContent = newText;
            arrayTasks[index].name = newText;
            localStorage.setItem('arrayTasks', JSON.stringify(arrayTasks));
        }
    });

    clearBtn.addEventListener('click', function() {
        const taskIdToDelete = this.dataset.taskId;
        const taskToDelete = document.getElementById(taskIdToDelete);
        if (taskToDelete) {
            taskToDelete.remove();

            const index = arrayTasks.findIndex(task => task.id === taskIdToDelete);
            if (index !== -1) {
                arrayTasks.splice(index, 1);
                localStorage.setItem('arrayTasks', JSON.stringify(arrayTasks));
            }
        }
    });

    checkBox.addEventListener('change', function () {
        const isChecked = this.checked;
        const taskElement = this.parentNode;
        const textElement = taskElement.querySelector('span');
        const idTask = this.dataset.taskId;
        let index = arrayTasks.findIndex((t) => t.id === idTask);
        arrayTasks[index].complete = isChecked;
        if (isChecked) {
            textElement.style.textDecoration = 'line-through';
            textElement.style.color = 'green';
        } else {
            textElement.style.textDecoration = 'none';
            textElement.style.color = 'white';
        }
        localStorage.setItem('arrayTasks', JSON.stringify(arrayTasks));
    });
}

function add() {
    const taskText = document.getElementById('nameTask').value;
    if (taskText.trim() === '') return;

    let taskId = Date.now().toString();

    const taskElement = document.createElement('li');
    taskElement.id = taskId;
    taskElement.className = 'task';
    
    const text = document.createElement('span');
    text.dataset.taskId = taskId;
    text.textContent = taskText;

    const checkBox = document.createElement('input');
    checkBox.type = 'checkBox';
    checkBox.dataset.taskId = taskId;
    checkBox.className = 'checkbox';
    
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Delete';
    clearBtn.dataset.taskId = taskId;
    
    const changeBtn = document.createElement('button');
    changeBtn.textContent = 'Change';
    changeBtn.dataset.taskId = taskId;
    

    taskElement.appendChild(text);
    taskElement.appendChild(checkBox);
    taskElement.appendChild(changeBtn);
    taskElement.appendChild(clearBtn);
    
    document.getElementById('tasks').appendChild(taskElement);
    document.getElementById('nameTask').value = '';
    
    const newTask = {
        id: taskId,
        name: taskText,
        complete: checkBox.checked
    };
    
    arrayTasks.push(newTask);
    localStorage.setItem('arrayTasks', JSON.stringify(arrayTasks));

    setupEventListeners(changeBtn, clearBtn, checkBox, text, taskElement, arrayTasks);
}

function createTaskElement(task) {
    const taskElement = document.createElement('li');
    taskElement.id = task.id;
    taskElement.className = 'task';
    
    const text = document.createElement('span');
    text.dataset.taskId = task.id;
    text.textContent = task.name;
    
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.dataset.taskId = task.id;
    checkBox.checked = task.complete;
    checkBox.className = 'checkbox';
    
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Delete';
    clearBtn.dataset.taskId = task.id;
    
    const changeBtn = document.createElement('button');
    changeBtn.textContent = 'Change';
    changeBtn.dataset.taskId = task.id;
    
    if (task.complete) {
        text.style.textDecoration = 'line-through';
        text.style.color = 'green';
    } else {
        text.style.textDecoration = 'none';
        text.style.color = 'white';
    }
    
    
    taskElement.appendChild(text);
    taskElement.appendChild(checkBox);
    taskElement.appendChild(changeBtn);
    taskElement.appendChild(clearBtn);

    document.getElementById('tasks').appendChild(taskElement);
    
    

    setupEventListeners(changeBtn, clearBtn, checkBox, text, taskElement, arrayTasks);
}

document.addEventListener('DOMContentLoaded', function() {
    const savedTasks = localStorage.getItem('arrayTasks');
    if (savedTasks) {
        arrayTasks = JSON.parse(savedTasks);
        arrayTasks.forEach(function(task) {
            createTaskElement(task);
        });
    }
    
    const savedFilter = localStorage.getItem('completed');
    if (savedFilter) {
        document.getElementById('completed').checked = JSON.parse(savedTasks);
        hideShow()
    }
});

function hideShow() {
    const checkboxFilter = document.getElementById('completed');
    const isChecked = checkboxFilter.checked;
    arrayTasks.forEach(array => {
        const idTask = array.id;
        const task = document.getElementById(idTask);
        const checkboxTask = array.complete;
        if (isChecked && checkboxTask) {
            task.style.display = 'none';
        } else {
            task.style.removeProperty('display');
        }
        localStorage.setItem('completed', JSON.stringify(isChecked));
    });
}
document.getElementById('add').addEventListener('click', add);
document.getElementById('completed').addEventListener('change', hideShow);