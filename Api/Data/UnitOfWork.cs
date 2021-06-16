using System.Threading.Tasks;
using Api.Interfaces;

namespace Api.Data
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly DataContext context;

    public UnitOfWork(DataContext context)
    {
      this.context = context;
    }

    public ICourseRepository CourseRepository => new CourseRepository(context);

    public IStudentRepository StudentRepository => new StudentRepository(context);

    public IStudentsCoursesRepository StudentsCoursesRepository => new StudentsCoursesRepository(context);

    public ITeacherRepository TeacherRepository => new TeacherRepository(context);

    public ICategoryRepository CategoryRepository => new CategoryRepository(context);

    public async Task<bool> Complete()
    {
      return await context.SaveChangesAsync() > 0;
    }

    public bool HasChanges()
    {
      return context.ChangeTracker.HasChanges();
    }
  }
}