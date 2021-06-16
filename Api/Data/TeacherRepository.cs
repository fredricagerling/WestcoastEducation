using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Entities;
using Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
  public class TeacherRepository : ITeacherRepository
  {
    private readonly DataContext context;

    public TeacherRepository(DataContext context)
    {
      this.context = context;
    }

    public async Task AddAsync(Teacher teacher)
    {
      await context.Teachers.AddAsync(teacher);
    }

    public void Delete(Teacher teacher)
    {
      context.Remove(teacher);
    }

    public async Task<Teacher> GetTeacherAsync(string name)
    {
      var teacher = await context.Teachers.FirstOrDefaultAsync(t => t.Name == name);
      return teacher;
    }

    public async Task<Teacher> GetTeacherByIdAsync(int id)
    {
      var teacher = await context.Teachers.FindAsync(id);
      return teacher;
    }

    public async Task<IEnumerable<Teacher>> GetTeachersAsync()
    {
      return await context.Teachers.ToListAsync();
    }

    public void Update(Teacher teacher)
    {
      context.Update(teacher);
    }
  }
}