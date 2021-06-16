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
  [Route("api/courses")]
  public class CourseController : ControllerBase
  {
    private readonly IUnitOfWork unitOfWork;

    public CourseController(IUnitOfWork unitOfWork)
    {
      this.unitOfWork = unitOfWork;
    }

    [HttpGet()]
    public async Task<IActionResult> GetCourses()
    {
      var result = await unitOfWork.CourseRepository.GetCoursesAsync();

      var courses = new List<CourseViewModel>();

      if (result == null) return NotFound();

      foreach (var c in result)
      {
        var students = new List<string>();
        var course = new CourseViewModel();

        course.CourseId = c.CourseId;
        course.CourseNumber = c.CourseNumber;
        course.Title = c.Title;
        course.Teacher = c.Teacher.Name;
        course.Category = c.Category.CategoryName;
        course.Length = c.Length;
        course.Price = c.Price;
        course.Description = c.Description;
        course.Score = c.Score;
        course.Date = c.Date;
        course.CourseLevel = c.CourseLevel;
        course.IsActive = c.IsActive;

        foreach (var s in c.Students)
        {
          students.Add($"{s.Student.FirstName} {s.Student.LastName}");
        }

        course.Students = students;
        
        courses.Add(course);
      }

      return Ok(courses);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCourseById(int id)
    {
      try
      {
        var course = await unitOfWork.CourseRepository.GetCourseByIdAsync(id);

        if (course == null) return NotFound();

        return Ok(course);
      }
      catch (Exception ex)
      {
        return StatusCode(500, ex.Message);
      }
    }

    [HttpGet("{title}")]
    public async Task<IActionResult> GetCourseByTitle(string title)
    {
      try
      {
        var course = await unitOfWork.CourseRepository.GetCourseAsync(title);

        if (course == null) return NotFound();

        return Ok(course);
      }
      catch (Exception ex)
      {
        return StatusCode(500, ex.Message);
      }
    }

    [HttpPost()]
    public async Task<IActionResult> AddCourse(AddCourseViewModel model)
    {
      try
      {
        var category = await unitOfWork.CategoryRepository.GetCategoryAsync(model.Category);
        var teacher = await unitOfWork.TeacherRepository.GetTeacherAsync(model.Teacher);

        if (category == null) return NotFound("Kunde inte hitta en kategorin" + model.Category);
        if (category == null) return NotFound("Kunde inte hitta läraren" + model.Teacher);

        var course = new Course
        {
          Title = model.Title,
          Teacher = teacher,
          Category = category,
          CourseLevel = model.CourseLevel,
          Description = model.Description,
          Date = model.Date,
          CourseNumber = model.CourseNumber,
          Length = model.Length,
          Price = model.Price,
          Score = model.Score,
          IsActive = true

        };
        await unitOfWork.CourseRepository.AddAsync(course);

        if (await unitOfWork.Complete()) return StatusCode(201);

        return StatusCode(500, "Ett fel har inträffat.");
      }
      catch (Exception ex)
      {
        return StatusCode(500, ex.Message);
      }
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCourse(int id, Course courseModel)
    {
      var course = await unitOfWork.CourseRepository.GetCourseByIdAsync(id);

      course.IsActive = courseModel.IsActive;
      course.Length = courseModel.Length;
      course.Price = courseModel.Price;
      course.Score = courseModel.Score;
      course.Title = courseModel.Title;
      course.CourseLevel = courseModel.CourseLevel;
      course.CourseNumber = courseModel.CourseNumber;
      course.Description = courseModel.Description;

      course.CategoryId = course.CategoryId;
      course.Date = course.Date;
      course.TeacherId = course.TeacherId;
      course.CourseId = course.CourseId;

      unitOfWork.CourseRepository.Update(course);
      var result = await unitOfWork.Complete();
      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCourse(int id)
    {
      try
      {
        var course = await unitOfWork.CourseRepository.GetCourseByIdAsync(id);

        if (course == null) return NotFound();

        unitOfWork.CourseRepository.Delete(course);
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