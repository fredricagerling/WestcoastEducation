using System.Collections.Generic;

namespace Api.ViewModels
{
  public class TeacherViewModel
  {
    public int TeacherId { get; set; }
    public string Name { get; set; }
    public virtual ICollection<string> Courses { get; set; }
  }
}