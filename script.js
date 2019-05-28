function createAssignments() {
	var divList = document.getElementsByClassName('main-content')[0].children;
	var classNames = ['assignmentName', 'percentage', 'marks', 'outOf'];

	for (let i = 0; i < divList.length; i++) {
		let assignInput = document.createElement('input');
		assignInput.className = classNames[i];
		divList[i].appendChild(assignInput);
	}
}

function showAssignments() {
	var len = 5;

	for (let i = 0; i < len; i++) {
		createAssignments();
	}
}

function validateForm() {

}

function processForm() {

}

function eventHandler() {
	//let moreAssigns = document.getElementsByClassName('submit')[1];
	//window.addEventListener("load", showAssignments);
	//moreAssigns.addEventListener('click', createAssignments);

}

window.addEventListener("load", showAssignments);
var moreAssigns = document.getElementsByClassName('submit')[1];
moreAssigns.addEventListener('click', createAssignments);
//eventHandler();
