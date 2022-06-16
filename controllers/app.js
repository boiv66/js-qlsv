//import module

import { StudentDb, studentArray } from "../models/model.js";
import { validateInput } from "../models/validation.js";

// DOM form
const form = document.getElementById("formQLSV");

//DOM user input
const studentId = document.getElementById("txtMaSV");
const studentName = document.getElementById("txtTenSV");
const studentEmail = document.getElementById("txtEmail");
const pwd = document.getElementById("txtPass");
// const birth = document.getElementById("txtNgaySinh");
// const course = document.getElementById("khSV");
const mathGrade = document.getElementById("txtDiemToan");
const physicGrade = document.getElementById("txtDiemLy");
const chemGrade = document.getElementById("txtDiemHoa");

// DOM search value
const searchInput = document.getElementById("txtSearch");
const searchBtn = document.getElementById("btnSearch");
searchBtn.addEventListener("click", searchStudent);

// DOM btn for form
const addStudentBtn = document.getElementById("btnThem");
const resetInfoBtn = document.getElementById("btnReset");
const updateStudentBtn = document.getElementById("btnCapNhat");

// add event listener for form command
addStudentBtn.addEventListener("click", addStudentHandler);
resetInfoBtn.addEventListener("click", resetStudentInfoHandler);
updateStudentBtn.addEventListener("click", updateStudentHandler);

//DOM table display
const table = document.getElementById("tbodySinhVien");

function getUserInput() {
  const object = {
    maSinhVien: studentId.value,
    tenSinhVien: studentName.value,
    email: studentEmail.value,
    soDienThoai: pwd.value,
    // birth: birth.value,
    // course: course.value,
    diemLy: mathGrade.value,
    diemToan: physicGrade.value,
    diemHoa: chemGrade.value,
  };
  return object;
}

function resetTableData() {
  table.innerHTML = "";
}

function renderStudentList() {
  resetTableData();
  for (const student of studentArray) {
    // console.log(student.studentName, 1);
    const rowEl = document.createElement("tr");
    insertRow(rowEl, student);
    addDeleteUpdateButton(rowEl, student.studentId);
  }
}

function addDeleteUpdateButton(rowEl, studentId) {
  rowEl.insertCell(-1).innerHTML = `
          <span class="deleteBtn">
              <i class="fas fa-trash-alt fid${studentId}"></i>
          </span>
          <span class="updateBtn">
              <i class="fas fa-edit fid${studentId}"></i>
          </span>`;
  table.appendChild(rowEl);
  //add update and delete button for each item
  const deleteBtn = document.querySelector(`.fa-trash-alt.fid${studentId}`);
  const updateBtn = document.querySelector(`.fa-edit.fid${studentId}`);
  // addUpdateToggleEffect(updateBtn);

  deleteBtn.addEventListener("click", deleteItem);
  updateBtn.addEventListener("click", updateItem);

}

function renderUserData(object){
    $('#txtMaSV').val(object.studentId); 
    $('#txtTenSV').val(object.studentName); 
    $('#txtEmail').val(object.email); 
    $('#txtPass').val(object.phone); 
    $('#txtDiemToan').val(object.mathGrade); 
    $('#txtDiemLy').val(object.physicGrade); 
    $('#txtDiemHoa').val(object.chemGrade); 

}

function disableEditIdAndName(){
    studentId.disabled = true; 
    studentName.disabled = true; 
    addStudentBtn.setAttribute("disabled", "true"); 
}

function enableEditIdAndName(object){
    studentId.removeAttribute("disabled"); 
    studentName.removeAttribute("disabled");
    addStudentBtn.removeAttribute("disabled");


}

function updateItem(event){
    //resetTableData(); 
    const selectedItem = event.target.closest("tr").querySelector("td").innerHTML;
    const studentIndex = StudentDb.returnIndex(selectedItem); 
   
    disableEditIdAndName()
    renderUserData(studentArray[studentIndex]); 
    
   
}

function deleteItem(event){
    resetTableData(); 
    const selectedItem = event.target.closest("tr").querySelector("td").innerHTML; 
    removeDataRequest(selectedItem); 

}
function insertRow(rowEl, student) {
  console.log(student, "student");
  rowEl.insertCell(-1).innerHTML = student.studentId;
  rowEl.insertCell(-1).innerHTML = student.studentName;
  rowEl.insertCell(-1).innerHTML = student.email;
  //   rowEl.insertCell(-1).innerHTML = student.birth;
  //   rowEl.insertCell(-1).innerHTML = student.course;
  rowEl.insertCell(-1).innerHTML = student.studentGpa;
}

function addStudentHandler() {
  validateInput.reset_warning_message();
  const object = getUserInput();
  const validateCheck = validateInput.init(object, "GET");
  console.log(validateCheck, "validate");
  if (validateCheck) {
    const studentObj = StudentDb.addStudent(object);
    console.log(studentObj, "111111111");
    postDataRequest(studentObj.convertData());
  }
}

function resetStudentInfoHandler() {
  form.reset();
  enableEditIdAndName(); 
}

function updateStudentHandler() {
    validateInput.reset_warning_message(); 
    const input = getUserInput();

    if (validateInput.init(input, "PUT")){
        console.log(input.diemHoa, "diemHoa"); 
        updateDataRequest(input.maSinhVien, input);  
    }
}


function searchStudent() {
    resetTableData();
    const searchName = searchInput.value;
    for (const student of studentArray) {
      if (student.studentName.includes(searchName)) {
        const rowEl = document.createElement("tr");
        insertRow(rowEl, student);
        addDeleteUpdateButton(rowEl, student.studentId);
      }
    }
  }
// API request
async function getDataRequest() {
  try {
    const response = await axios.get(
      "http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien"
    );
    // console.log(response);
    // for (const student of response.data){
    //     console.log(student.maSinhVien);
    // }
    console.log(response.data); 
    StudentDb.init(response.data);
    renderStudentList();
  } catch (event) {
    console.log(event);
  }
}



async function postDataRequest(object) {
  try {
    const reponse = await axios.post(
      "http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien",
      object
    );

    getDataRequest();
  } catch (error) {
    console.log(error);
  }
}

async function removeDataRequest(studentId){
    try{
        const response = await axios.delete(`http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${studentId}` ); 
        StudentDb.removeStudent(studentId); 
        renderStudentList(); 
    }
    catch(error){
        console.log(error); 
    }
}

async function updateDataRequest(studentId, updatedContent){
    try{
        console.log(updatedContent); 
        const response = await axios.put(`http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${studentId}`, updatedContent);
        StudentDb.updateStudent(studentId, updatedContent);
        renderStudentList(); 

    }
    catch(error){
        console.log(error); 
    }


}
getDataRequest();
