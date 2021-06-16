using System;
using System.Threading.Tasks;
using Api.Data;
using Api.Entities;
using Api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
  [ApiController]
  [Route("api/teachers")]
  public class TeacherController : ControllerBase
  {
    private readonly IUnitOfWork unitOfWork;

    public TeacherController(IUnitOfWork unitOfWork)
    {
      this.unitOfWork = unitOfWork;
    }

    [HttpGet()]
    public async Task<IActionResult> GetTeachers()
    {
      var result = await unitOfWork.TeacherRepository.GetTeachersAsync();
      return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTeacherById(int id)
    {
       try
      {
        var teacher = await unitOfWork.TeacherRepository.GetTeacherByIdAsync(id);

        if (teacher == null) return NotFound();

        return Ok(teacher);
      }
      catch (Exception ex)
      {
        return StatusCode(500, ex.Message);
      }
    }

    [HttpGet("{name}")]
    public async Task<IActionResult> GetCategory(string name)
    {
      try
      {
        var teacher = await unitOfWork.TeacherRepository.GetTeacherAsync(name);

        if (teacher == null) return NotFound();

        return Ok(teacher);
      }
      catch (Exception ex)
      {
        return StatusCode(500, ex.Message);
      }
    }
    [HttpPost()]
    public async Task<IActionResult> AddTeacher(Teacher teacher)
    {
      try
      {
        await unitOfWork.TeacherRepository.AddAsync(teacher);
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