function add() {
    const taskText = document.getElementById('nameTask').value;
    if (taskText.trim() === '') return;

    let taskId = Date.now().toString();

    const taskElement = document.createElement('li');
    taskElement.id = taskId;
    
    const text = document.createElement('span');
    text.dataset.taskId = taskId;
    text.textContent = taskText;

    const checkBox = document.createElement('input');
    checkBox.type = 'checkBox';
    checkBox.dataset.taskId = taskId;
    
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Удалить';
    clearBtn.dataset.taskId = taskId;
    clearBtn.addEventListener('click', function() {
        const taskIdToDelete = this.dataset.taskId;
        const taskToDelete = document.getElementById(taskIdToDelete);
        if (taskToDelete) {
            taskToDelete.remove();
        }
    });

    checkBox.addEventListener('change', function () {
        const isChecked = this.checked;
        const taskElement = this.parentNode;
        const textElement = taskElement.querySelector('span');
        if (isChecked) {
            textElement.style.textDecoration = 'line-through';
        } else {
            textElement.style.textDecoration = 'none';
        }
    })

    taskElement.appendChild(text);
    taskElement.appendChild(checkBox);
    taskElement.appendChild(clearBtn);
    
    document.getElementById('tasks').appendChild(taskElement);
    document.getElementById('nameTask').value = '';
}

document.getElementById('add').addEventListener('click', add);
