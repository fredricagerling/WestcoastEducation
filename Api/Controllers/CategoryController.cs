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
  [Route("api/categories")]
  public class CategoryController : ControllerBase
  {
    private readonly IUnitOfWork unitOfWork;

    public CategoryController(IUnitOfWork unitOfWork)
    {
      this.unitOfWork = unitOfWork;
    }

    [HttpGet()]
    public async Task<IActionResult> GetCourseTypes()
    {
      var result = await unitOfWork.CategoryRepository.GetCategoriesAsync();
      return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCategoryById(int id)
    {
      try
      {
        var category = await unitOfWork.CategoryRepository.GetCategoryByIdAsync(id);

        if (category == null) return NotFound();

        return Ok(category);
      }
      catch (Exception ex)
      {
        return StatusCode(500, ex.Message);
      }
    }

    [HttpPost()]
    public async Task<IActionResult> AddCategory(Category category)
    {
      try
      {
        await unitOfWork.CategoryRepository.AddAsync(category);
        if (await unitOfWork.Complete()) return StatusCode(201);

        return StatusCode(500);
      }
      catch (Exception ex)
      {
        return StatusCode(500, ex.Message);
      }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, Category categoryModel)
    {
      var category = await unitOfWork.CategoryRepository.GetCategoryByIdAsync(id);

      category.CategoryName = categoryModel.CategoryName;

      unitOfWork.CategoryRepository.Update(category);
      var result = await unitOfWork.Complete();
      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
      try
      {
        var category = await unitOfWork.CategoryRepository.GetCategoryByIdAsync(id);

        if (category == null) return NotFound();

        unitOfWork.CategoryRepository.Delete(category);
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