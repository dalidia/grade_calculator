// create a line of assignments
const createAssignment = () => {
	const divList = document.getElementsByClassName('main-content')[0];
	let classNames = ['assignmentName', 'percentage', 'marks', 'outOf'];
	const assignDiv = document.createElement('div');
	assignDiv.className = 'sections';
	let assignInput = null, text = null;

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

// set your preferred language
const setLanguage = (prefLanguage='English') => {
  const language = {'English': [0, 'en-US'], 'Español': [1, 'es-PE']};
  const lang_code = 0;
  const lang_key = parseInt(language[prefLanguage][0]);
	const root = document.documentElement;
	root['lang'] = language[prefLanguage][1];  

  const translations = {
  	translationOption: ['Choose your preferred language', 'Elige tu idioma preferido'],
    title: ['Grade Calculator', 'Calculadora De Notas'],
    description: ["Are you stressed out about your grade? Do you want to know what your percentage is to know your grade? Don't worry! We are here to help, we will calculate your overall percentage so that you don't have to do the math or unknowingly make a mistake.",
    "¿Estás estresado por tus notas? ¿Quieres saber cuál es tu porcentaje para saber cuál es tu nota? ¡No te preocupes! Estamos aquí para ayudarte, cálcularemos tu porcentaje total sin hacer ninguna calculación o cometer un error sin querer"],
    courseNameQuestion: ['What is the name of your course? (OPTIONAL)', "¿Cuál es tu curso? (OPCIONAL)"],
    assignmentName: ['Assignment name', 'Nombre del trabajo'],
    overallPercentage: ['Overall percentage', 'Porcentaje total'],
    marks: ['Marks obtained', 'Puntaje obtenido'],
    outOf: ['Marks out of', 'Puntaje Total']
  };

  const buttonTranslations = {
    calculateAssignment: ['Calculate my grade!', '¡Calcula my nota!'],
    addAssignment: ['Add more assignments', 'Añade más trabajos'],
    removeAssignment: ['Remove an assignment', 'Elimina un trabajo']
  };

  const docTranslate = document.querySelectorAll('[data-translate]');
  const buttonTranslate = document.querySelectorAll('[button-translate]');

  let key = '';

  // Html 
  for (let i = 0; i < docTranslate.length; i++) {
    key = docTranslate[i].getAttribute('data-translate');
    docTranslate[i].innerHTML = translations[key][lang_key];
  }

  // Button 
  for (let i = 0; i < buttonTranslate.length; i++) {
    key = buttonTranslate[i].getAttribute('button-translate');
    buttonTranslate[i].value = buttonTranslations[key][lang_key];
  }
}

// Give the user a language option
const languageOption = () => {
  let webLanguage = '', webText = '', space = ' ';
  const languageDiv = document.getElementsByClassName('language-holder')[0];
  const languageHolder = document.createElement('p');
  const languageOptionText = document.createTextNode('Choose your preferred language');
  languageHolder.appendChild(languageOptionText);
  languageHolder.setAttribute('data-translate', 'translationOption');
  const languageOptionHolder = document.createElement('div');
  languageOptionHolder.className = 'language-Option';
  const languages = ['English', 'Español'];

  // add languages
  for (let i =0 ; i < languages.length; i++) {
    webLanguage = document.createElement('p');
    webText = document.createTextNode(languages[i]);
    webLanguage.className = languages[i] + '-Option';
    webLanguage.appendChild(webText);

    if (languages.length != 1) {
      if (i != languages.length -1) {
        languageOptionHolder.appendChild(webLanguage);
        space = document.createTextNode(' | ');
        languageOptionHolder.appendChild(space)
      } else {
        languageOptionHolder.appendChild(webLanguage);
      }
    } else {
      languageOptionHolder.appendChild(webLanguage);
    }
  }

  languageDiv.appendChild(languageHolder);
  languageDiv.appendChild(languageOptionHolder);
  setLanguage();
}

// add footer
const addFooter = () => {
  const body = document.getElementsByTagName('body')[0];
  const footer = document.createElement('footer');
  const year = new Date().getFullYear();
  const author = ' Lidia Ataupillco Ramos'
  const copyright = document.createTextNode('Copyright © ' + year + author);
  footer.appendChild(copyright);
  body.appendChild(footer);
}

// initialize assignments when it's loaded
const showAssignments = () => {
	const len = 4;

  languageOption();
  addFooter();
	for (let i = 0; i < len; i++) {
		createAssignment();
	}
}

// remove a line of assignments
const removeAssignment = () => {
	let divList = document.getElementsByClassName('main-content')[0];
	let divLastChild = divList.lastElementChild;
	divList.removeChild(divLastChild);
}

// create a table to show the results with titles 'Assignment Name' and percentage
const showResults = (results, label, overallGrade) => {
  let tablesExist = document.getElementsByTagName('table');
  // if tableExist, remove
  if (tablesExist.length) {
  	let tableParent = tablesExist[0].parentElement;
  	tableParent.removeChild(tablesExist[0]);
  }

  // create table
  let row, cells, titleLabel, text, tableHeader, captionEle, descripObj, description = 'Your grade';
  let table = document.createElement('table');
  let main = document.getElementsByTagName('body')[0];
  let footer = document.getElementsByTagName('footer')[0];
  main.insertBefore(table, footer);
  captionEle = document.createElement('caption');
  descripObj = document.createTextNode(description);
  captionEle.appendChild(descripObj);
  table.appendChild(captionEle);
  tableHeader = document.createElement('thead');
  table.appendChild(tableHeader);
  row = document.createElement('tr');
  tableHeader.appendChild(row);
  // TODO: CREATE TBODY AND TFOOT, USE COLSPAN FOR TFOOT

  // Add labels
  for (let i = 0; i < label.length; i++) {
    titleLabel = document.createElement('th');
    titleLabel.setAttribute('scope', 'col');
    text = document.createTextNode(label[i]);
    titleLabel.appendChild(text)
    row.appendChild(titleLabel);
  }

  for (let prop in results) {
    // create table rows
    row = document.createElement('tr');
    table.appendChild(row);
    row.setAttribute('scope', 'row')
    cells = document.createElement('td');
    cells.setAttribute('scope', 'row')
    text = document.createTextNode(prop);
    cells.appendChild(text);
    row.appendChild(cells);
    cells = document.createElement('td');
    text = document.createTextNode(results[prop] + '%');
    cells.appendChild(text);
    row.appendChild(cells);
    table.appendChild(row);
  }

  // Add overall grade 
  row = document.createElement('tr');
  table.appendChild(row);
  cells = document.createElement('td');
  text = document.createTextNode('Your grade');
  cells.appendChild(text);
  row.appendChild(cells);
  cells = document.createElement('td');
  text = document.createTextNode(overallGrade + '%');
  cells.appendChild(text);
  row.appendChild(cells);

  document.getElementsByTagName("footer")[0].setAttribute('bottom', '0');
}

// use valid numbers to calculate the overall grade
const calculateGrade = (assignments, properties) => {
  let results = {}, currentAssign = null, ratio = null, percentGained = null, overallGrade = 0;
  // label for the table
  let label = ['Assignment Name', 'Percentage'];

  for (let i = 0; i < assignments.length; i++) {
    currentAssign = assignments[i];
    ratio = currentAssign[properties[2]] / currentAssign[properties[3]];
    percentGained = ratio * currentAssign[properties[1]];
    percentGained = Math.round(percentGained * 100) / 100;
    percentGained = percentGained.toFixed(2);
    overallGrade += parseFloat(percentGained);
    results[currentAssign[properties[0]]] = percentGained;
  }
  overallGrade = Math.round(overallGrade * 100) / 100;
  showResults(results, label, overallGrade);
}

// validate inputs
const validateForm = (courseObj, assignmentObj, percentObj, marksObj, outObj) => {
	// TODO: loop through the properties instead of assign it by numbers
  //let assignmentName, percentage, marks, outOf;
  let courseName = courseObj.value;

  let properties = ['assignmentName', 'percentage', 'marks', 'outOf'];
  let assignments = [];
  let numValid = 0;
  let oneAssign = null;
  // YOU CAN USE PUSH INTEAD OF
  // let counter = 0;

  if (!isNaN(courseName)) {
    alert('This is not a valid course name. If you wish, try again')
    courseObj.value = '';
  }

  // loop through all the objects except courseObj
  // each property has a different test
  for (let i = 0; i < assignmentObj.length;i++) {
    numValid = 0 ;

    if (assignmentObj[i].value) {
      numValid += 1;
    }
    // verify if it's a number, it's not empty and it's not zero
    if (!isNaN(percentObj[i].value) && percentObj[i].value !== '0' && percentObj[i].value !== '') {
      numValid += 1;
    } else if (isNaN(percentObj[i].value)) {
      alert('The ' + properties[1] + ' is not a valid number. Input a valid number.');
    }

    // verify if it's a number, and it's not empty
    if (!isNaN(marksObj[i].value) && marksObj[i].value) {
      numValid += 1;
    } else if (isNaN(marksObj[i].value)) {
      alert('The ' + properties[2] + ' is not a valid number. Input a valid number.');
    }

    if (!isNaN(outObj[i].value) && outObj[i].value !== '0' && outObj[i].value !== '') {
      numValid += 1;
    } else if (isNaN(outObj[i].value)) {
      alert('The ' + properties[3] + ' is not a valid number. Input a valid number.');
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
      alert('Input is empty. The assignment\'s result will not show up unless the empty field is fill out.');
    }

    if (numValid === properties.length) {
      alert('Calculation completed');
    }
  }
  calculateGrade(assignments, properties);
}

// process the Form
const processForm = () => {
  let courseObj = document.getElementById('courseName');
  let assignmentObj = document.getElementsByClassName('assignmentName');
  let percentObj = document.getElementsByClassName('percentage');
  let marksObj = document.getElementsByClassName('marks');
  let outObj = document.getElementsByClassName('outOf');

  validateForm(courseObj, assignmentObj, percentObj, marksObj, outObj);
 
  return false;
}

// handle the events
const eventHandler = () => {
	const moreAssigns = document.getElementsByClassName('submit')[1];
	window.addEventListener("load", showAssignments);

	const buttonHandler = document.getElementsByClassName('button')[1];
	buttonHandler.addEventListener('click', (event) => {
		if (event.target.tagName == 'INPUT') {
			if (event.target.className == 'add') {
				createAssignment();
			}
			if (event.target.className == 'remove') {
				removeAssignment();
			}
		}
	});
  const languageButton = document.getElementsByClassName('language-holder')[0];
  languageButton.addEventListener('click', (event) => {
    if (event.target.tagName == 'P') {
      const lang = event.target.innerHTML;
      setLanguage(lang);
    }
  });
}

eventHandler();
