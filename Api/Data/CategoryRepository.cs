using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Entities;
using Api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{
  public class CategoryRepository : ICategoryRepository
  {
    private readonly DataContext context;

    public CategoryRepository(DataContext context)
    {
      this.context = context;
    }

    public async Task AddAsync(Category type)
    {
      await context.Categories.AddAsync(type);
    }

    public void Delete(Category type)
    {
      context.Remove(type);
    }

    public async Task<IEnumerable<Category>> GetCategoriesAsync()
    {
      return await context.Categories.ToListAsync();
    }

    public async Task<Category> GetCategoryAsync(string categoryName)
    {
      var category = await context.Categories.FirstOrDefaultAsync(c => c.CategoryName == categoryName);
      return category;
    }

    public async Task<Category> GetCategoryByIdAsync(int id)
    {
      var category = await context.Categories.FindAsync(id);
      return category;
    }
    
    public void Update(Category type)
    {
      context.Update(type);
    }
  }
}