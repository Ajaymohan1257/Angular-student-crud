import { ApiService } from './../service/api.service';
import { StudentModel } from './student.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  form : FormGroup;
  obj : StudentModel = new StudentModel();
  studentData : any;
  addData : boolean = false;
  updateData : boolean = false;
  updateId : number;

  constructor(private builder : FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.form = this.builder.group({
      name : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      phone : ['', [Validators.required, Validators.pattern("[7-9]{1}[0-9]{9}")]],
      city : ['']
    })
    this.getAllStudents();
  }

  get getControl(){
    return this.form.controls;
  }

  postStudent(){
    this.obj.name = this.form.value.name;
    this.obj.email = this.form.value.email;
    this.obj.phone = this.form.value.phone;
    this.obj.city = this.form.value.city;

    this.api.postStudent(this.obj)
    .subscribe(
      res => {
        console.log("Action : student added")
        console.log(res);
        alert("Student details added succesfully");
        let a = document.getElementById("close");
        a?.click();
        this.form.reset();
        this.getAllStudents();
      },
      err => {
        console.log(err);
        alert("Sorry, something went wrong")
      }
    )
  }

  getAllStudents(){
    this.api.getStudents()
    .subscribe(
      res => {
        this.studentData = res;
      }
    )
  }

  deleteStudent(student : any){
    this.api.deleteStudent(student.id)
    .subscribe(
      res => {
        console.log("Action : student deleted")
        console.log(res);
        alert("Student details deleted succesfully");
        this.form.reset();
        this.getAllStudents();
      },
      err => {
        alert("Sorry, something went wrong")
      }
    )
  }

  beforeAdd(){
    this.addData = true;
    this.updateData = false;
  }

  beforeEdit(student : any){
    this.addData = false;
    this.updateData = true;
    this.updateId = student.id;
    this.getControl.name.setValue(student.name);
    this.getControl.email.setValue(student.email);
    this.getControl.phone.setValue(student.phone);
    this.getControl.city.setValue(student.city);
  }

  putStudent(){
    this.obj.name = this.form.value.name;
    this.obj.email = this.form.value.email;
    this.obj.phone = this.form.value.phone;
    this.obj.city = this.form.value.city;

    this.api.putStudent(this.obj, this.updateId)
    .subscribe(
      res => {
        console.log("Action : student updated")
        console.log(res);
        alert("Student details updated succesfully");
        let a = document.getElementById("close");
        a?.click();
        this.form.reset();
        this.getAllStudents();
      },
      err => {
        alert("Sorry, something went wrong")
      }
    )
  }

}
