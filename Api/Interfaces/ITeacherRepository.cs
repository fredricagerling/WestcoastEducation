using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Entities;

namespace Api.Interfaces
{
  public interface ITeacherRepository
  {
    Task AddAsync(Teacher teacher);
    Task<IEnumerable<Teacher>> GetTeachersAsync();
    Task<Teacher> GetTeacherAsync(string name);
    Task<Teacher> GetTeacherByIdAsync(int id);
    void Update(Teacher teacher);
    void Delete(Teacher teacher);
  }
}