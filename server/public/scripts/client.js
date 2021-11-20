$(document).ready(readyOn);

function readyOn() {
    console.log("DOM is loaded");
    renderTasks();
// Event Listener for task submit button
    $('form').submit('#submit-task', submitTask);
// Event Listener for task complete button
    $('#task-table-body').on('click', '.completion-submit', completeTask);
// Event listener for delete button
    $('#task-table-body').on('click', '.delete-button', deleteTask);
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
                <td>${task.status}</td>
                <td><button class="deleteBtn" data-id="${task.id}">Delete</button>
                <td><button class="doneBtn" data-id="${task.id}" data-read="${task.isRead}"">Done</button>
            `)
        }
    })
}