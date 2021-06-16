using Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
  public class DataContext : DbContext
  {
    public DbSet<Course> Courses { get; set; }
    public DbSet<Student> Students { get; set; }
    public DbSet<Teacher> Teachers { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<StudentsCourses> StudentsCourses { get; set; }
    
    public DataContext(DbContextOptions options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<StudentsCourses>()
          .HasKey(c => new { c.CourseId, c.StudentId });
      modelBuilder.Entity<StudentsCourses>()
          .HasOne(c => c.Course)
          .WithMany(b => b.Students)
          .HasForeignKey(bc => bc.CourseId);
      modelBuilder.Entity<StudentsCourses>()
          .HasOne(bc => bc.Student)
          .WithMany(c => c.Courses)
          .HasForeignKey(bc => bc.StudentId);
    }
  }
}