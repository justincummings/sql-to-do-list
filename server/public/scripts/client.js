$(document).ready(readyOn);

function readyOn() {
    console.log("DOM is loaded");
    renderTasks();
    $('#submitTask').on('click', addTask);
    $('#taskTable').on('click', '.doneBtn', taskComplete);
    $('#taskTable').on('click', '.deleteBtn', deleteTask);
}

function renderTasks() {
    $.ajax({
        type: 'GET',
        url:'/tasks'
    }).then((response) => {
        $("#taskTable").empty();
        console.log("GET /task response", response);
        for (let task of response) {
            $('#taskTable').append(`
            <tr>
                <td>${task.task}</td>
                <td>${task.taskStatus}</td>
                <td><button class="deleteBtn" data-id="${task.id}">Delete</button>
                <td><button class="doneBtn" data-id="${task.id}" data-taskStatus="${task.taskStatus}">Done</button>
            <tr>
            `);
        }
    })
}

function addTask() {
    const newTask = {
    task: $('#task-in').val(),
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


function taskComplete() {
    console.log('in taskComplete');
    const taskIdtoComplete = $(this).data('id');
    const taskComplete = $(this).data('complete'); //possible issue with complete?
    console.log('taskIdtoComplete', taskIdtoComplete);
    console.log('taskComplete', taskComplete);
    $.ajax({  //console throws error here
        type: 'PUT',
        url: `/tasks/${taskIdtoComplete}`,
        data: {taskStatus: taskComplete}
    }).then((res) => {
        refreshTasks();
    }).catch((err) => {
        console.log(error);
    });
};

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