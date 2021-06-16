using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Api.Entities
{
  public class Category
  {
    [Key]
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
    public virtual ICollection<Course> Courses { get; set; }
  }
}