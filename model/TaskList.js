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
										<i class="fa fa-trash-alt remove" onclick="delItem('${id}')"></i>
									</span>
									<span>
										<i class="fa fa-check-circle completeToDo" onclick="checkDoneTask('${id}')"></i>
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
		let idxTask = this.taskToDo.findIndex(task => task.id === id);
		if (idxTask !== -1) {
			this.taskToDo.splice(idxTask, 1);
		}
	}
	// check done task
	handelCheckDoneTask(id) {
		let idxTask = this.taskToDo.findIndex(task => task.id === id);
		if (idxTask !== -1) {
			this.taskToDo[idxTask].completedAt = formatDateTime(new Date());
			this.taskToDo[idxTask].status = false;
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
										<i class="fa fa-trash-alt remove" onclick="delItem('${id}')"></i>
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
	// handel sorting descreasing task
	handelSortingDesc() {
		this.taskToDo = _.orderBy(this.taskToDo, 'title', 'desc');
	}
	// handel sorting ascending task
	handelSortingAsc() {
		this.taskToDo = _.orderBy(this.taskToDo, 'title', 'asc');
	}
}
