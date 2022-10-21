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
	window.location.reload();
});
// delete task
document.querySelectorAll('.task-feature span .remove').forEach(button => {
	button.addEventListener('click', e => {
		e.preventDefault();
		const id = e.target.getAttribute('data-remove');
		taskList.deleteTask(id);
		taskList.saveTaskLocal();
		taskList.renderTaskToDo('todo');
		window.location.reload();
	});
});
// Completed task
document
	.querySelectorAll('.task-feature span .completeToDo')
	.forEach(button => {
		button.addEventListener('click', e => {
			e.preventDefault();
			const id = e.target.getAttribute('data-complete');
			taskList.handelCheckDoneTask(id);
			taskList.renderTaskToDo('todo');
			window.location.reload();
		});
	});
