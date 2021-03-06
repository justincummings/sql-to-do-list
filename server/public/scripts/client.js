$(document).ready(readyOn);

function readyOn() {
    console.log("DOM is loaded");
    renderTasks();
    $('#submitTask').on('click', addTask);
    $('#toDoTable').on('click', '.doneBtn', completeTask);
    $('#toDoTable').on('click', '.deleteBtn', deleteTask);
    $('#completeTable').on('click', '.deleteBtn', deleteTask);
}

function renderTasks() {
    $.ajax({
        type: 'GET',
        url:'/tasks'
    }).then((response) => {
        $("#completeTable").empty();
        $("#toDoTable").empty();
        console.log("GET /task response", response);
        for (let task of response) {
            const taskId = task.id;
            if (task.status === true) {
                $('#completeTable').append(`
                <tr>
                    <td id="${taskId}">${task.task}</td>
                    <td><button class="deleteBtn" data-id="${task.id}">Delete</button>
                </tr>
                `);
                $(`#${taskId}`).addClass('taskDone');
            }
            else {
            $('#toDoTable').append(`
            <tr>
                <td>${task.task}</td>
                <td><button class="deleteBtn" data-id="${task.id}">Delete</button>
                <td><button class="doneBtn" data-id="${task.id}" data-status="${task.status}">Complete</button>
            </tr>
            `);
            }
        }
    })
}

function addTask() {
    const newTask = {
    task: $('#task-in').val(),
    taskStatus: false
    }
    $.ajax({
    type: 'POST',
    url: '/tasks',
    data: newTask
    }).then((response) => {
    console.log('POST /tasks succeeded')
    $('#task-in').val(''),
    renderTasks();
    });
}

function completeTask() {
    let taskId = $(this).data('id');
    $.ajax({
    method: 'PUT',
    url: `/tasks/complete/${taskId}`,
    })
    .then((response) => {
    renderTasks();
    })
    .catch((err) => {
        console.log('Completion Error: ', err);
        alert('Something went wrong..', err);
    });
}


function refreshTasks() {
    $.ajax({
        type:'GET',
        url:'/books'
    }).then(function(response) {
        console.log(response);
        renderTasks(response);
    }).catch(function(error){
        console.log('error in GET', error);
    });
};

function deleteTask() {
    const taskIdToDelete = $(this).data('id');
    $.ajax({
    type: 'DELETE',
    url: `/tasks/${taskIdToDelete}`
    }).then((response) => {
    console.log(response);
    renderTasks();
    })
};