const view = {
  list: document.querySelector("#my-todo"),
  done: document.querySelector("#my-done"),
  todoList: document.getElementsByClassName("todo-list"),
  doneList: document.getElementsByClassName("done-list"),
  addBtn: document.querySelector("#addBtn"),
  input: document.querySelector("#newTodo"),
  todoDiv: document.querySelector(".todoDiv"),
  textValue: document.querySelector("#newTodo"),
  doneDiv: document.querySelector(".doneDiv"),

  renderTodoList(todos) {
    let content = "";
    for (let todo of todos) {
      content += `
      <li class="todo-list"><label for="todo"><span class='unchecked' title="Are you checked">${todo}</span></label>
      <label class="deleteTodo fa fa-trash"></label></li>`;
    }
    if (todos.length === 0) {
      view.list.innerHTML = "";
    } else {
      view.list.innerHTML = `<li><h3 class='todoTitle'>Todo List</h3></li>${content}`;
    }
  },
  renderDoneList(dones) {
    let content = "";
    for (let done of dones) {
      content += `
      <li class="done-list"><label class='done'><span class='checked' title="Aren't you finished">${done}</span></label>
    <label class="deleteDone fa fa-trash"></label></li>`;
    }
    if (dones.length === 0) {
      view.done.innerHTML = "";
    } else {
      view.done.innerHTML = `<li><h3 class='doneTitle'>Done List</h3></li>${content}`;
    }
  },
  renderAll(todos, dones) {
    view.renderTodoList(todos);
    view.renderDoneList(dones);
  },
  changeTodoClass() {
    view.todoDiv.classList.toggle("todo-div");
  },
  changeDoneClass() {
    view.doneDiv.classList.toggle("done-div");
  },
  addTodoTitle(todos) {
    if (todos.length === 1) {
      view.changeTodoClass();
    }
  },
  addDoneTitle(dones) {
    if (dones.length === 1) {
      view.changeDoneClass();
    }
  },
  removeTodoTitle(todos) {
    if (todos.length === 0) {
      view.changeTodoClass();
    }
  },
  removeDoneTitle(dones) {
    if (dones.length === 0) {
      view.changeDoneClass();
    }
  },
  clearInput() {
    view.textValue.value = "";
  },
  listChangeStatus() {
    if (event.target.matches(".deleteTodo")) {
      let text = event.target.parentElement.textContent.trim();
      controller.deleteTodoChange(text);
      console.log(text);
    } else if (event.target.matches(".unchecked")) {
      let text = event.target.parentElement.textContent;
      controller.unCheckedChange(text);
    }
  },
  doneChangeStatus() {
    if (event.target.matches(".deleteDone")) {
      let text = event.target.parentElement.textContent.trim();
      controller.deleteDoneChange(text);
      console.log(text);
    } else if (event.target.matches(".checked")) {
      let text = event.target.parentElement.textContent;
      controller.checkedChange(text);
    }
  }
};

const model = {
  alert: "你忘記輸入文字了!",
  data: {
    todos: [
      "Hit the gym",
      "Read a book",
      "Buy eggs",
      "Organize office",
      "Pay bills"
    ],
    dones: []
  },
  dataIndexOf(source, data) {
    source.indexOf(data);
  },
  dataPush(source, data) {
    source.push(data);
  },
  dataSplice(source, data) {
    source.splice(source.indexOf(data), 1);
  }
};

const controller = {
  init() {
    view.renderTodoList(model.data.todos);
    view.addBtn.addEventListener("click", controller.addByMouse);
    view.input.addEventListener("keydown", controller.addByEnter);
    view.list.addEventListener("click", controller.listChangeStatus);
    view.done.addEventListener("click", controller.doneChangeStatus);
  },
  create(data) {
    if (data.trim().length !== 0) {
      model.data.todos = [...model.data.todos, data];
      controller.clearInput(model.data.todos);
    } else {
      alert(model.alert);
    }
  },
  addByEnter(e) {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.keyCode === 13) controller.create(view.textValue.value);
  },
  addByMouse() {
    controller.create(view.textValue.value);
  },

  clearInput(source) {
    view.clearInput();
    view.addTodoTitle(source);
    view.renderTodoList(source);
  },
  checkedChange(data) {
    model.dataPush(model.data.todos, data);
    model.dataSplice(model.data.dones, data);
    view.addTodoTitle(model.data.todos);
    view.removeDoneTitle(model.data.dones);
  },
  unCheckedChange(data) {
    model.dataPush(model.data.dones, data);
    model.dataSplice(model.data.todos, data);
    view.addDoneTitle(model.data.dones);
    view.removeTodoTitle(model.data.todos);
  },
  deleteDoneChange(data) {
    if (model.dataIndexOf(model.data.dones, data) !== -1) {
      model.dataSplice(model.data.dones, data);
      view.removeDoneTitle(model.data.dones);
    }
  },
  deleteTodoChange(data) {
    if (model.dataIndexOf(model.data.todos, data) !== -1) {
      model.dataSplice(model.data.todos, data);
      view.removeTodoTitle(model.data.todos);
    }
  },
  doneChangeStatus() {
    view.doneChangeStatus();
    view.renderAll(model.data.todos, model.data.dones);
  },
  listChangeStatus() {
    view.listChangeStatus();
    view.renderAll(model.data.todos, model.data.dones);
  }
};

controller.init();

// 禁用
document.oncontextmenu = function() {
  event.returnValue = false;
};
// 或者直接返回整個事件
document.oncontextmenu = function() {
  return false;
};
document.onselectstart = function() {
  event.returnValue = false;
};
// 或者直接返回整個事件
document.onselectstart = function() {
  return false;
};
document.oncopy = function() {
  event.returnValue = false;
};
// 或者直接返回整個事件
document.oncopy = function() {
  return false;
};
