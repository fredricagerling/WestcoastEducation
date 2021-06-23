using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Entities;
using Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
  public class StudentRepository : IStudentRepository
  {
    private readonly DataContext context;

    public StudentRepository(DataContext context)
    {
      this.context = context;
    }

    public async Task AddAsync(Student student)
    {
      await context.Students.AddAsync(student);
    }

    public void Delete(Student student)
    {
      context.Remove(student);
    }

    public async Task<Student> GetStudentByIdAsync(int id)
    {
      var student = await context.Students.Include(c => c.Courses).ThenInclude(c => c.Course).FirstOrDefaultAsync(i => i.StudentId == id);
      return student;
    }

    public async Task<IEnumerable<Student>> GetStudentsAsync()
    {
      return await context.Students.Include(c => c.Courses).ThenInclude(c => c.Course).ToListAsync();
    }

    public void Update(Student student)
    {
      context.Update(student);
    }
  }
}