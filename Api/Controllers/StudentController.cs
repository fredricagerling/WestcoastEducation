using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Data;
using Api.Entities;
using Api.Interfaces;
using Api.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
  [ApiController]
  [Route("api/students")]
  public class StudentController : ControllerBase
  {
    private readonly IUnitOfWork unitOfWork;

    public StudentController(IUnitOfWork unitOfWork)
    {
      this.unitOfWork = unitOfWork;
    }

    [HttpGet()]
    public async Task<IActionResult> GetStudents()
    {
      
      var result = await unitOfWork.StudentRepository.GetStudentsAsync();

      var students = new List<StudentViewModel>();

      if (result == null) return NotFound();

      foreach (var s in result)
      {
        var courses = new List<string>();
        var student = new StudentViewModel();

        student.StudentId = s.StudentId;
        student.FirstName = s.FirstName;
        student.LastName = s.LastName;
        student.Email = s.Email;
        student.PhoneNumber = s.PhoneNumber;
        student.Address = s.Address;
        student.PostalNo = s.PostalNo;
        student.PostalAddress = s.PostalAddress;


        foreach (var c in s.Courses)
        {
          courses.Add($"{c.Course.Title}");
        }

        student.Courses = courses;
        
        students.Add(student);
      }

      return Ok(students);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetStudent(int id)
    {
      try
      {
        var student = await unitOfWork.StudentRepository.GetStudentByIdAsync(id);

        if (student == null) return NotFound();

        return Ok(student);
      }
      catch (Exception ex)
      {
        return StatusCode(500, ex.Message);
      }
    }
    [HttpGet("{name}")]
    public async Task<IActionResult> GetStudentByName(string name)
    {
      try
      {
        var student = await unitOfWork.StudentRepository.GetStudentAsync(name);

        if (student == null) return NotFound();

        return Ok(student);
      }
      catch (Exception ex)
      {
        return StatusCode(500, ex.Message);
      }
    }

    [HttpPost()]
    public async Task<IActionResult> AddStudent(Student student)
    {
      try
      {
        await unitOfWork.StudentRepository.AddAsync(student);
        var result = await unitOfWork.Complete();
        return StatusCode(201);
      }
      catch (Exception ex)
      {
        return StatusCode(500, ex.Message);
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStudent(int id, Student studentModel)
    {
      var student = await unitOfWork.StudentRepository.GetStudentByIdAsync(id);

      student.FirstName = studentModel.FirstName;
      student.LastName = studentModel.LastName;
      student.Email = studentModel.Email;
      student.PhoneNumber = studentModel.PhoneNumber;
      student.Address = studentModel.Address;
      student.PostalNo = studentModel.PostalNo;
      student.PostalAddress = studentModel.PostalAddress;

      unitOfWork.StudentRepository.Update(student);
      var result = await unitOfWork.Complete();
      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudent(int id)
    {
      try
      {
        var student = await unitOfWork.StudentRepository.GetStudentByIdAsync(id);

        if (student == null) return NotFound();

        unitOfWork.StudentRepository.Delete(student);
        var result = unitOfWork.Complete();

        return NoContent();

      }
      catch (Exception ex)
      {
        return StatusCode(500, ex.Message);
      }
    }
  }
}