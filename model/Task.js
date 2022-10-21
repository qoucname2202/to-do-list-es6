// Format date time when create task
const formatDateTime = today => {
	const days = String(today.getDate()).padStart(2, '0');
	const months = String(today.getMonth() + 1).padStart(2, '0');
	const years = today.getFullYear();
	const hours = String(today.getHours()).padStart(2, '0');
	const minutes = String(today.getMinutes()).padStart(2, '0');
	const seconds = String(today.getMinutes()).padStart(2, '0');
	return `${days}/${months}/${years} ${hours}:${minutes}:${seconds}`;
};
// Generate id task
const generateUuid = function () {
	return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export class Task {
	id = generateUuid();
	title = '';
	status = false;
	createdAt = formatDateTime(new Date());
	completedAt = '';
	constructor(_tieuDe, _trangThai) {
		this.title = _tieuDe;
		this.status = _trangThai;
	}
}
