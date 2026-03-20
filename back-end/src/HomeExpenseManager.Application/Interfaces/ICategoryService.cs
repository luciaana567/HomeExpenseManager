using HomeExpenseManager.Application.Common;
using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.DTOs.Category;

namespace HomeExpenseManager.Application.Interfaces;

public interface ICategoryService
{
    Task<Result<CategoryDto>> GetByIdAsync(Guid id);
    Task<Result<CategoryDto>> CreateAsync(CreateCategoryDto dto);
    Task<Result<CategoryDto>> UpdateAsync(Guid id, CategoryDto dto);
    Task<Result<bool>> DeleteAsync(Guid id);
    Task<Result<List<CategoryDto>>> GetAllAsync();
    Task<Result<CategoriesSummaryDto>> GetCategoriesTotals(CategoryTotalsQueryDto query);
    Task<Result<PagedResult<CategoryDto>>> GetAllAsync(CategoryQueryDto query);
}