const newRecord = document.querySelector('.new-Record');
const saveInput = document.querySelector('.save-Input');
const studentName = document.querySelector('.name');
const studentSubject = document.querySelector('.subject');
const studentMarks = document.querySelector('.marks');
const addButton = document.querySelector('.add-Button');
const table = document.querySelector('tbody')
const searchRecord = document.querySelector('.search-record')
const form = document.querySelector('.dialogbox-form');
const arrowUp = document.querySelector('.up');
const arrowDown = document.querySelector('.down');



document.addEventListener('DOMContentLoaded', getLocalData);
saveInput.addEventListener('click', addNewEntry);
addButton.addEventListener('click', addButtonClicked);
searchRecord.addEventListener('input', debounce);
arrowUp.addEventListener('click', sort);
arrowDown.addEventListener('click', reverseSort);

function addButtonClicked(){
    newRecord.show();
}

function addNewEntry(event){
    event.preventDefault();
    var student = [];
    if(studentName.value === '' || studentSubject.value === '' || studentMarks.value === ''){
        return;
    }
    student.push(studentName.value);
    student.push(studentSubject.value);
    student.push(studentMarks.value);
    let studentData = getData();
    studentData.push(student);
    localStorage.setItem('studentData', JSON.stringify(studentData));
    pushToTable(student);
    newRecord.close();
    form.reset();
}

function getData() {
    let studentData;
    if(localStorage.getItem('studentData') === null){
        studentData = [];
    } else {
        studentData = JSON.parse(localStorage.getItem('studentData'));
    }
    return studentData;
}

function getLocalData(){
    let studentData = getData();
    studentData.forEach(element => {
        pushToTable(element);
    });
}

function pushToTable(element){
    const studentTr = document.createElement('tr');
    studentTr.classList.add('table-row');
    
    const studentNameTd = document.createElement('td');
    studentNameTd.classList.add('student-Name-Td');
    studentNameTd.innerText = element[0];
    studentTr.appendChild(studentNameTd);
    
    const studentSubjectTd = document.createElement('td');
    studentSubjectTd.classList.add('student-Subject-Td');
    studentSubjectTd.innerText = element[1];
    studentTr.appendChild(studentSubjectTd);
    
    const studentMarksTd = document.createElement('td');
    studentMarksTd.classList.add('student-Marks-Td');
    studentMarksTd.innerText = element[2];
    studentTr.appendChild(studentMarksTd);
    table.appendChild(studentTr);
}

function search(){
    let items = document.querySelectorAll('.table-row');
    items.forEach(e => e.remove());
    let studentData = getData();
    let filteredData = studentData.filter((item) => {
        return (item[0].includes(searchRecord.value) || item[1].includes(searchRecord.value) || item[2].includes(searchRecord.value));
    })
    filteredData.forEach(element => {
        pushToTable(element);
    });
}

function sort(){
    let items = document.querySelectorAll('.table-row');
    items.forEach(e => e.remove());
    let studentData = getData();
    let filteredData = studentData.sort();
    filteredData.forEach(element => {
        pushToTable(element);
    });
}

function reverseSort(){
    let items = document.querySelectorAll('.table-row');
    items.forEach(e => e.remove());
    let studentData = getData();
    let filteredData = studentData.sort();
    filteredData = filteredData.reverse();
    filteredData.forEach(element => {
        pushToTable(element);
    });
}

const getDebounceFn = function(fn, d) {
    let timeOutId;
    return function () {
        var args = arguments;
        console.log('timeOutIdBEFORE', timeOutId);
        if(timeOutId){
            clearTimeout(timeOutId);
            console.log('timeOutId', timeOutId);
        }
        timeOutId = setTimeout(() => {
            search.apply(null,args);
        },d);
    } 
}

function debounce() {
    const returnedFn = getDebounceFn(search, 1000);
    returnedFn();
}