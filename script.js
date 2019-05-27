function createAssignments() {
	var form = document.forms["gradeCalculator"];
	var assignDiv = document.createElement('div');
	var assignInput = document.createElement('input');
	assignDiv.appendChild(assignInput);
	form.appendChild(assignDiv);
}

function validateForm() {

}

window.addEventListener("load", createAssignments);