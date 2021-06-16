using System.Collections.Generic;
using System.Threading.Tasks;
using Api.Entities;

namespace Api.Interfaces
{
  public interface ICategoryRepository
  {
    Task AddAsync(Category type);
    Task<IEnumerable<Category>> GetCategoriesAsync();
    Task<Category> GetCategoryAsync(string categoryName);
    Task<Category> GetCategoryByIdAsync(int id);
    void Update(Category type);
    void Delete(Category type);
  }
}