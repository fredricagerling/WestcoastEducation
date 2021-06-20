'use strict';

class Student {
  constructor(student) {
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.email = student.email;
    this.phoneNumber = student.phone;
    this.address = student.address;
    this.postalNo = student.postalNo;
    this.postalAddress = student.city;
  }
}

class StudentCourses {
  constructor(studentCourse) {
    this.courseId = parseInt(studentCourse.courseId);
    this.studentId = studentToUpdate.id;
  }
}

class UpdateCourse {
  constructor(course) {
    this.title = course.editTitle;
    this.courseNumber = parseInt(course.editCourseNumber);
    this.courseLevel = course.editCourseLevel;
    this.length = parseInt(course.editLength);
    this.score = parseFloat(course.editScore);
    this.price = parseInt(course.editPrice);
    this.description = course.editDescription;
    this.isActive = course.editActivity === "true" ? true : false;
  }
}

class AddCourse {
  constructor(course) {
    this.title = course.title;
    this.courseNumber = parseInt(course.courseNumber);
    this.teacher = course.teacher;
    this.courseLevel = course.courseLevel;
    this.category = course.category;
    this.length = parseInt(course.length);
    this.score = 0;
    this.price = parseInt(course.price);
    this.description = course.description;
    this.date = new Date().toISOString().slice(0, 10);
  }
}