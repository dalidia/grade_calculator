// create a line of assignments
function createAssignments() {
	let divList = document.getElementsByClassName('main-content')[0];
	let classNames = ['assignmentName', 'percentage', 'marks', 'outOf'];
	let assignDiv = document.createElement('div');
	assignDiv.className = 'sections';
	let assignInput;
	let text;

	for (let i = 0; i < classNames.length; i++) {
		assignInput = document.createElement('input');
		assignInput.className = classNames[i];
		assignInput.type = "text";
		assignInput.name = classNames[i];
		assignDiv.appendChild(assignInput);
		text = document.createTextNode('\n');
		assignDiv.appendChild(text);
	}
	divList.appendChild(assignDiv);
}

// initialize assignments when it's loaded
function showAssignments() {
	let len = 5;

	for (let i = 0; i < len; i++) {
		createAssignments();
	}
}

// remove a line of assignments
function removeAssignments() {
	var divList = document.getElementsByClassName('main-content')[0];
	var divLastChild = divList.lastElementChild;
	divList.removeChild(divLastChild);
}

function validateForm(courseOb) {
  courseName = courseObj.value;

  if (isNaN(courseName) === false) {
    alert('This is not a valid courseName. Please try again.')
    courseObj.value = '';
  }
}

function processForm() {
  let courseObj = document.getElementById('courseName');

  
  validateForm(courseObj);
 
  return false;
}

// handle the events
function eventHandler() {
	let moreAssigns = document.getElementsByClassName('submit')[1];
	window.addEventListener("load", showAssignments);

	let buttonHandler = document.getElementsByClassName('button')[1];
	buttonHandler.addEventListener('click', (event) => {
		if (event.target.tagName == 'INPUT') {
			if (event.target.className == 'add') {
				createAssignments();
			}
			if (event.target.className == 'remove') {
				removeAssignments();
			}
		}
	});
}

eventHandler();


