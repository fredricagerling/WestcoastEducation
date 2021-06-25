using System;
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
  [Route("api/studentscourses")]
  public class StudentsCoursesController : ControllerBase
  {
    private readonly IUnitOfWork unitOfWork;

    public StudentsCoursesController(IUnitOfWork unitOfWork)
    {
      this.unitOfWork = unitOfWork;
    }

    [HttpGet("{courseId}/{studentId}")]
    public async Task<IActionResult> GetCourseFromStudent(int courseId ,int studentId)
    {
      try
      {
        var course = await unitOfWork.StudentsCoursesRepository.GetCourseAsync(courseId, studentId);

        if (course == null) return NotFound();

        return Ok(course);
      }
      catch (Exception ex)
      {
        return StatusCode(500, ex.Message);
      }
    }

    [HttpPost()]
    public async Task<IActionResult> AddCourseToStudent(StudentsCoursesViewModel model)
    {
      try
      {
        var course = await unitOfWork.StudentsCoursesRepository.GetCourseAsync(model.courseId, model.studentId);

        if (course != null) return StatusCode(500, "Studenten går redan den här kursen.");

        var data = new StudentsCourses
        {
          StudentId = model.studentId,
          CourseId = model.courseId

        };

        await unitOfWork.StudentsCoursesRepository.AddAsync(data);

        var result = await unitOfWork.Complete();
        return StatusCode(201);
      }

      catch (Exception ex)
      {
        return StatusCode(500, ex.Message);
      }
    }
  }
}