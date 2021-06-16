using System.Threading.Tasks;

namespace Api.Interfaces
{
  public interface IUnitOfWork
  {
    ICourseRepository CourseRepository { get; }
    IStudentRepository StudentRepository { get; }
    IStudentsCoursesRepository StudentsCoursesRepository { get; }
    ITeacherRepository TeacherRepository { get; }
    ICategoryRepository CategoryRepository { get; }
    Task<bool> Complete();
    bool HasChanges();
  }
}