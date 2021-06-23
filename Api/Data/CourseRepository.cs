using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Entities;
using Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
  public class CourseRepository : ICourseRepository
  {
    private readonly DataContext context;

    public CourseRepository(DataContext context)
    {
      this.context = context;
    }

    public async Task AddAsync(Course course)
    {
      await context.Courses.AddAsync(course);
    }

    public void Delete(Course course)
    {
      context.Remove(course);
    }

    public async Task<IEnumerable<Course>> GetCoursesByCategoryAsync(string category)
    {
      return await context.Courses
        .Where(c => c.Category.CategoryName == category)
        .Include(t => t.Teacher)
        .Include(c => c.Category)
        .Include(s => s.Students)
        .ThenInclude(s => s.Student)
        .ToListAsync();
    }

    public async Task<Course> GetCourseByIdAsync(int id)
    {
      var course = await context.Courses.FindAsync(id);
      return course;
    }

    public async Task<IEnumerable<Course>> GetCoursesAsync()
    {
      return await context.Courses
        .Include(t => t.Teacher)
        .Include(c => c.Category)
        .Include(s => s.Students)
        .ThenInclude(s => s.Student)
        .ToListAsync();
    }

    public async Task<IEnumerable<Course>> GetBestSellerCoursesAsync()
    {
      var courses = await context.Courses
        .Include(t => t.Teacher)
        .Include(c => c.Category)
        .Include(s => s.Students)
        .ThenInclude(s => s.Student)
        .ToListAsync();

      var filtered = courses.OrderByDescending(s => s.Score).ToList().Take(3);

      return filtered;
    }

    public void Update(Course course)
    {
      context.Update(course);
    }
  }
}