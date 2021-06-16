using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Entities;

namespace Api.Interfaces
{
  public interface ICourseRepository
  {
    Task AddAsync(Course course);
    Task<IEnumerable<Course>> GetCoursesAsync();
    Task<Course> GetCourseByIdAsync(int id);
    Task<Course> GetCourseAsync(string title);
    void Update(Course course);
    void Delete(Course course);
  }
}