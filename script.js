function add() {
    document.getElementById('task').innerText = document.getElementById('nameTask').value;
    
    const clearBtn = document.createElement('button');
    clearBtn.innerText = 'Удалить';
    clearBtn.id = 'clearBtn';
    document.body.append(clearBtn);
}

function clear() {
    let clearBtn = document.getElementById('clearBtn');
    let task = document.getElementById('task');
    
    if (clearBtn) {
        clearBtn.innerText = '';
        task.innerText = '';
    }
}

document.getElementById('add').addEventListener('click', add);
document.getElementById('clearBtn').addEventListener("click", clear);