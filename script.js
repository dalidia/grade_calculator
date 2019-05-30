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

// create a table to show the results with titles 'Assignment Name' and percentage
function showResults(results, label) {
  let row, cells, titleLabel, text;
  let table = document.createElement('table');
  let main = document.getElementsByTagName('main')[0];
  main.appendChild(table);
  row = document.createElement('tr');
  table.appendChild(row);


  // Add labels
  for (let i = 0; i < label.length; i++) {
    titleLabel = document.createElement('th');
    //titleLabel.setAttribute('scope', 'col');
    text = document.createTextNode(label[i]);
    titleLabel.appendChild(text)
    row.appendChild(titleLabel);
  }

  // let titles = document.createElement('tr');
  // table.appendChild(titles);
  // let titleLabel1 = document.createElement('td');
  // text1 = document.createTextNode('Assignment Name');
  // titleLabel1.appendChild(text1);

  for (let prop in results) {
    // create table rows
    row = document.createElement('tr');
    table.appendChild(row);
    //rows.setAttribute('scope', 'row')
    cells = document.createElement('td');
    text = document.createTextNode(prop);
    cells.appendChild(text);
    row.appendChild(cells);
    cells = document.createElement('td');
    text = document.createTextNode(results[prop]);
    cells.appendChild(text);
    row.appendChild(cells);
    table.appendChild(row);

  }
}

// use valid numbers to calculate the overall grade
function calculateGrade(assignments, properties) {
  let results = {}, currentAssign, ratio, percentGained, overallGrade = 0;
  // label for the table
  let label = ['Assignment Name', 'Percentage'];

  for (let i = 0; i < assignments.length; i++) {
    currentAssign = assignments[i];
    ratio = currentAssign[properties[2]] / currentAssign[properties[3]];
    percentGained = ratio * currentAssign[properties[1]];
    percentGained = Math.round(percentGained * 100) / 100;
    percentGained = percentGained.toFixed(2);
    overallGrade += percentGained;
    results[currentAssign[properties[0]]] = percentGained;
  }
  showResults(results, label);
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
// process the Form
function processForm() {
  let courseObj = document.getElementById('courseName');
  let assignmentObj = document.getElementsByClassName('assignmentName');
  let percentObj = document.getElementsByClassName('percentage');
  let marksObj = document.getElementsByClassName('marks');
  let outObj = document.getElementsByClassName('outOf');

  validateForm(courseObj, assignmentObj, percentObj, marksObj, outObj);
 
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


