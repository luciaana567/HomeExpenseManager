using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.DTOs.Category;

namespace HomeExpenseManager.Application.Interfaces
{
    public interface ICategoryService
    {
        Task<CategoryDto?> GetByIdAsync(Guid id);
        Task<CategoryDto> CreateAsync(CreateCategoryDto dto);
        Task<CategoryDto?> UpdateAsync(Guid id, CategoryDto dto);
        Task<bool> DeleteAsync(Guid id);
        Task<IList<CategoryDto>> GetAllAsync();
        Task<CategoriesSummaryDto> GetCategoriesTotals();
    }
}