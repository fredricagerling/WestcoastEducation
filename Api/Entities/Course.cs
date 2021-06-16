using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Entities
{
  public class Course
  {
    public int CourseId { get; set; }
    public int CourseNumber { get; set; }
    public int TeacherId { get; set; }
    public string Title { get; set; }
    public int CategoryId { get; set; }
    public int Length { get; set; }
    public int Price { get; set; }
    public string Description { get; set; }
    public float Score { get; set; }
    public DateTime Date { get; set; }
    public string CourseLevel { get; set; }
    public bool IsActive { get; set; }

    [ForeignKey("TeacherId")]
    public virtual Teacher Teacher { get; set; }

    [ForeignKey("CategoryId")]
    public virtual Category Category { get; set; }
    public ICollection<StudentsCourses> Students { get; set; }
    
  }
}