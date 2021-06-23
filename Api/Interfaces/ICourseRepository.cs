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
    Task<IEnumerable<Course>> GetCoursesByCategoryAsync(string category);
    Task<IEnumerable<Course>> GetBestSellerCoursesAsync();
    void Update(Course course);
    void Delete(Course course);
  }
}