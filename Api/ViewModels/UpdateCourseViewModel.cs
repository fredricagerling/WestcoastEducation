using System;

namespace Api.ViewModels
{
  public class UpdateCourseViewModel
  {
    public int CourseNumber { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public int Price { get; set; }
    public string Description { get; set; }
    public float Score { get; set; }
    public string CourseLevel { get; set; }
    public bool IsActive { get; set; }
  }
}