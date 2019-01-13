$(() => {
  let inpNewTask = $('#inpNewTask')

  let tasks = []

  function refreshList() {
    $.get('/tasks', (data) => {
      tasks = data

      $('#taskList').empty()
      for (let i in tasks) {
        let task = tasks[i]

        $('#taskList').append(
          $('<li>')
          .attr('class', "list-group-item")
          .append(
            $('<div>')
            .attr('class', task.done ? "row done" : "row")
            .append(
              $('<span>')
              .attr('class', "col py-1")
              .text(task.name)
            )
            .append(
              $('<button>')
              .text(task.done ? "❌" : "✔️")
              .attr('class', "btn btn-info col-2 mx-2")
              .click(function () {
                task.done = !task.done
                refreshList()
              })
            )
            .append(
              $('<button>')
              .text("DELETE")
              .attr('class', "btn btn-danger col-2 mx-2")
              .click(function () {
                tasks.splice(i, 1)
                refreshList()
              })
            )
          )
        )
      }
    })




  }

  refreshList()

  function sortList() {
    tasks.sort(function (a, b) {
      return a.done - b.done
    })
    refreshList()
  }

  function clearList() {
    tasks = tasks.filter(function (t) {
      return !t.done
    })
    refreshList()
  }

  function addTask() {
    console.log(tasks)
    let taskName = inpNewTask.val()

    $.post('/tasks', {
      name: taskName,
      done: false
    }, (data) => {
      if (data.success) {
        inpNewTask.val('')
        refreshList()
      }

    }).fail(function (data) {
      alert(data.responseJSON.message)
    })

  }

  $('#btnAdd').click(function () {
    addTask()
  })

  inpNewTask.keyup(function (ev) {
    if (ev.keyCode == 13) {
      addTask()
    }
  })

  $('#btnSort').click(function () {
    sortList()
  })

  $('#btnClear').click(function () {
    clearList()
  })



})
