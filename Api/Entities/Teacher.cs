using System.Collections.Generic;

namespace Api.Entities
{
  public class Teacher
  {
    public int TeacherId { get; set; }
    public string Name { get; set; }
    public virtual ICollection<Course> Courses { get; set; }
  }
}