using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Entities;

namespace Api.Interfaces
{
  public interface IStudentsCoursesRepository
  {
    Task AddAsync(StudentsCourses studentsCourses);
    Task<StudentsCourses> GetCourseAsync(int studentId, int courseId);
    void Update(StudentsCourses studentsCourses);
    void Delete(StudentsCourses studentsCourses);
  }
}