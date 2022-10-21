const formatDateTime = today => {
	const days = String(today.getDate()).padStart(2, '0');
	const months = String(today.getMonth() + 1).padStart(2, '0');
	const years = today.getFullYear();
	const hours = String(today.getHours()).padStart(2, '0');
	const minutes = String(today.getMinutes()).padStart(2, '0');
	const seconds = String(today.getMinutes()).padStart(2, '0');
	return `${days}/${months}/${years} ${hours}:${minutes}:${seconds}`;
};
export class TaskList {
	taskToDo = [];
	taskComplete = [];
	// save task to localStorage
	saveTaskLocal() {
		localStorage.setItem('taskToDo', JSON.stringify(this.taskToDo));
	}
	// get task to localStorage
	getTaskList(name) {
		if (localStorage.getItem('taskToDo')) {
			this.taskToDo = JSON.parse(localStorage.getItem(name));
		}
	}
	// add task
	addTask(newTask) {
		this.taskToDo.push(newTask);
	}
	// render task todo
	renderTaskToDo(selector) {
		let content = this.taskToDo
			.filter(item => item.status !== false)
			.map(task => {
				let { title, id } = task;
				return `
          <li>
								<span class="task-content">${title}</span>
								<div class="task-feature">
									<span>
										<i class="fa fa-trash-alt remove" data-remove="${id}"></i>
									</span>
									<span>
										<i class="fa fa-check-circle completeToDo" data-complete="${id}"></i>
									</span>
								</div>
							</li>
        `;
			})
			.join('');
		document.getElementById(selector).innerHTML = content;
	}
	// delete task
	deleteTask(id) {
		let taskListClone = [...this.taskToDo];
		let idxTask = taskListClone.findIndex(task => task.id === id);
		if (idxTask !== -1) {
			taskListClone.splice(idxTask, 1);
			this.taskToDo = taskListClone;
		}
	}
	// check done task
	handelCheckDoneTask(id) {
		let taskToDoClone = [...this.taskToDo];
		let idxTask = taskToDoClone.findIndex(task => task.id === id);
		if (idxTask !== -1) {
			taskToDoClone[idxTask].completedAt = formatDateTime(new Date());
			taskToDoClone[idxTask].status = false;
			localStorage.setItem('taskToDo', JSON.stringify(taskToDoClone));
		}
	}
	// render status false
	renderTaskCompleted(selector) {
		let content = this.taskToDo
			.filter(item => item.status === false)
			.map(task => {
				let { title, id } = task;
				return `
         <li>
            <span class="task-content">${title}</span>
            <div class="task-feature">
              <span>
										<i class="fa fa-trash-alt remove" data-remove="${id}"></i>
									</span>
              <span>
                <i class="fa fa-check-circle complete"></i>
              </span>
            </div>
          </li>
        `;
			})
			.join('');
		document.getElementById(selector).innerHTML = content;
	}
}
