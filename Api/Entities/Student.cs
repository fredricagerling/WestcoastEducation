using System.Collections.Generic;

namespace Api.Entities
{
  public class Student
  {
    public int StudentId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
    public string PostalNo { get; set; }
    public string PostalAddress { get; set; }
    public ICollection<StudentsCourses> Courses { get; set; }
  }
}