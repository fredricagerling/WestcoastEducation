using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Entities;
using Api.Interfaces;

namespace Api.Data
{
  public class StudentsCoursesRepository : IStudentsCoursesRepository
  {
    private readonly DataContext context;

    public StudentsCoursesRepository(DataContext context)
    {
      this.context = context;
    }

    public async Task AddAsync(StudentsCourses studentsCourses)
    {
      await context.StudentsCourses.AddAsync(studentsCourses);
    }

    public void Delete(StudentsCourses studentsCourses)
    {
      context.Remove(studentsCourses);
    }

    public async Task<StudentsCourses> GetCourseAsync(int studentId, int courseId)
    {
      return await context.StudentsCourses.FindAsync(studentId, courseId);
    }

    public void Update(StudentsCourses studentsCourses)
    {
      context.Update(studentsCourses);
    }
  }
}