export const studentArray = [];

export class Student {
  constructor(object) {
    this.studentId = object.maSinhVien;
    this.studentName = object.tenSinhVien;
    this.email = object.email;
    this.phone = object.soDienThoai;
    // this.birth = object.birth;
    // this.course = object.course;
    this.mathGrade = object.diemToan;
    this.physicGrade = object.diemLy;
    this.chemGrade = object.diemHoa;
    this.studentGpa = this.defineGPA();
    this.condition = this.defineCondition();
    this.activityGrade = 9;
  }

  defineGPA() {
    const grade = ((+this.mathGrade) + (+this.physicGrade) + (+this.chemGrade)) / 3;
    console.log(this.mathGrade, this.physicGrade, this.chemGrade, this.studentId); 

    return grade;
  }

  defineCondition() {
    var chosenValue = Math.random() < 0.5 ? "Normal" : "Difficult condition";

    return chosenValue;
  }

  convertData() {
    const pushObj = {
      maSinhVien: this.studentId,
      tenSinhVien: this.studentName,
      loaiSinhVien: this.condition,
      diemToan: this.mathGrade,
      diemLy: this.physicGrade,
      diemHoa: this.chemGrade,
      diemRenLuyen: this.activityGrade,
      email: this.email,
      soDienThoai: this.phone,
    };
    return pushObj;
  }

  updateStudentInfo(object) {
    this.condition = object.loaiSinhVien;
    this.mathGrade = object.diemToan;
    this.chemGrade = object.diemHoa;
    this.physicGrade = object.diemLy;
    this.phone = object.soDienThoai;
    this.email = object.email;
    this.studentGpa = this.defineGPA(); 
  }
}

export class StudentDb {
  
  static addStudent(object) {
    const newStudent = new Student(object);
    // addStudentArray(newStudent);
    studentArray.push(newStudent);
    return newStudent;
  }

  static init(studentData) {
    for (const student of studentData) {
      // console.log(student, "student")
      StudentDb.addStudent(student);
    }
    console.log(studentArray);
  }

  static removeStudent(removeId) {
    let index = this.returnIndex(removeId); 
    if (index) {
      studentArray.splice(index, 1);
    }
  }

  static updateStudent(updateStudent, content) {
    for (const student of studentArray) {
      if (student.studentId == updateStudent) {
        student.updateStudentInfo(content);
      }
    }
  }

  static returnIndex(studentID) {
    let index = studentArray.findIndex(
      (student) => student.studentId == studentID
    );
    return index; 
  }
}
