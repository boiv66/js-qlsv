//import module 
import { StudentDb } from "../models/model.js";

// DOM form 
const form = document.getElementById("formQLSV"); 

//DOM user input 
const studentId = document.getElementById("txtMaSV"); 
const studentName = document.getElementById("txtTenSV"); 
const studentEmail = document.getElementById("txtEmail"); 
const pwd = document.getElementById("txtPass"); 
const birth = document.getElementById("txtNgaySinh"); 
const course =  document.getElementById("khSV"); 
const mathGrade = document.getElementById("txtDiemToan"); 
const physicGrade = document.getElementById("txtDiemLy"); 
const chemGrade = document.getElementById("txtDiemHoa"); 

// DOM search value
const searchInput = document.getElementById("txtSearch"); 
const searchBtn = document.getElementById("btnSearch"); 


// DOM btn for form 
addStudentBtn = document.getElementById("btnThem"); 
resetInfoBtn = document.getElementById("btnReset"); 
updateStudentBtn = document.getElementById("btnCapNhat"); 


// add event listener for form command 
addStudentBtn.addEventListener("click", addStudentHandler); 
resetInfoBtn.addEventListener("click", resetStudentInfoHandler); 
updateStudentBtn.addEventListener("click", updateStudentHandler); 

function getUserInput(){
    const object = {
        studentId: studentId.value, 
        studentName: studentName.value, 
        studentEmail: studentEmail.value, 
        pwd: pwd.value, 
        birth: birth.value, 
        course: course.value, 
        mathGrade: mathGrade.value, 
        physicGrade: physicGrade.value, 
        chemGrade: chemGrade.value
    }


}


function addStudentHandler(){
    const object = getUserInput(); 

    StudentDb.addStudent(object); 

}

function resetStudentInfoHandler(){

}

function updateStudentHandler(){

}




