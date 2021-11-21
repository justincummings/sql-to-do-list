$(document).ready(readyOn);

function readyOn() {
    console.log("DOM is loaded");
    renderTasks();
    $('#submitTask').on('click', addTask);
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
                <td>${task.status}</td>
                <td><button class="deleteBtn" data-id="${task.id}">Delete</button>
                <td><button class="doneBtn" data-id="${task.id}" data-status="${task.status}">Complete</button>
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