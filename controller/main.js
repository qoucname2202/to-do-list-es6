import { Task } from '../model/Task.js';
import { TaskList } from '../model/TaskList.js';

// add task
let taskList = new TaskList();

taskList.getTaskList('taskToDo');
taskList.renderTaskToDo('todo');
taskList.renderTaskCompleted('completed');

document.getElementById('addItem').addEventListener('click', e => {
	e.preventDefault();
	const title = document.getElementById('newTask').value;
	let task = new Task(title, true);
	taskList.addTask(task);
	taskList.saveTaskLocal();
	taskList.renderTaskToDo('todo');
});
// delete task
window.delItem = id => {
	taskList.deleteTask(id);
	taskList.saveTaskLocal();
	taskList.renderTaskToDo('todo');
	taskList.renderTaskCompleted('completed');
};
// check completed task
window.checkDoneTask = id => {
	taskList.handelCheckDoneTask(id);
	taskList.saveTaskLocal();
	taskList.renderTaskToDo('todo');
	taskList.renderTaskCompleted('completed');
};

// sortting desc
document.getElementById('two').addEventListener('click', e => {
	taskList.handelSortingDesc();
	taskList.saveTaskLocal();
	taskList.renderTaskToDo('todo');
});
// sorting asc
document.getElementById('three').addEventListener('click', e => {
	taskList.handelSortingAsc();
	taskList.saveTaskLocal();
	taskList.renderTaskToDo('todo');
});
