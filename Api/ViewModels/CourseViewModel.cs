using System;
using System.Collections.Generic;

namespace Api.ViewModels
{
  public class CourseViewModel
  {
    public int CourseId { get; set; }
    public int CourseNumber { get; set; }
    public string Teacher { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public int Length { get; set; }
    public int Price { get; set; }
    public string Description { get; set; }
    public float Score { get; set; }
    public DateTime Date { get; set; }
    public string CourseLevel { get; set; }
    public bool IsActive { get; set; }
    public ICollection<string> Students { get; set; }
  }
}