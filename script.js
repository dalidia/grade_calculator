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

// use valid numbers to calculate the overall grade
function calculateGrade(assignments, properties) {
  let results = {}, currentAssign, ratio, percentGained, overallGrade = 0;

  for (let i = 0; i < assignments.length; i++) {
    currentAssign = assignments[i];
    ratio = currentAssign[properties[2]] / currentAssign[properties[3]];
    percentGained = ratio * currentAssign[properties[1]];
    percentGained = Math.round(percentGained * 100) / 100;
    percentGained = percentGained.toFixed(2);
    overallGrade += percentGained;
    results[currentAssign[properties[0]]] = percentGained;
  }
  console.log(results);
}

// validate inputs
function validateForm(courseObj, assignmentObj, percentObj, marksObj, outObj) {
	// TODO: loop through the properties instead of assign it by numbers
  //let assignmentName, percentage, marks, outOf;
  let courseName = courseObj.value;

  let properties = ['assignmentName', 'percentage', 'marks', 'outOf'];
  let assignments = [];
  let numValid = 0;
  let oneAssign;
  // YOU CAN USE PUSH INTEAD OF
  // let counter = 0;

  if (isNaN(courseName) === false) {
    alert('This is not a valid courseName. Please try again.')
    courseObj.value = '';
  }

  // loop through all the objects except courseObj
  // each property has a different test
  for (let i = 0; i < assignmentObj.length;i++) {
    numValid = 0 ;

    if (assignmentObj[i].value != '') {
      numValid += 1;
    }
    if (isNaN(percentObj[i].value) === false && percentObj[i].value !== '0' && percentObj[i].value !== '') {
      numValid += 1;
    } 

    if (isNaN(marksObj[i].value) === false && marksObj[i].value !== '') {
      numValid += 1;
    }

    if (isNaN(outObj[i].value) === false && outObj[i].value !== '0' && outObj[i].value !== '') {
      numValid += 1;
    }

    if (numValid == properties.length) {
      oneAssign = {};
      oneAssign[properties[0]] = assignmentObj[i].value;
      oneAssign[properties[1]] = percentObj[i].value;
      oneAssign[properties[2]] = marksObj[i].value;
      oneAssign[properties[3]] = outObj[i].value;
      assignments.push(oneAssign);
    }
    if (numValid > 1 && numValid < properties.length) {
      alert(numValid);
    }
  }
  calculateGrade(assignments, properties);
}

function processForm() {
  let courseObj = document.getElementById('courseName');
  let assignmentObj = document.getElementsByClassName('assignmentName');
  let overallObj = document.getElementsByClassName('percentage');
  let marks = document.getElementsByClassName('marks');
  let outObj = document.getElementsByClassName('outOf');

  validateForm(courseObj, assignmentObj, overallObj, marks, outObj);
 
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


