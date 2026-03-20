using AutoMapper;
using HomeExpenseManager.Application.Common;
using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.DTOs.Category;
using HomeExpenseManager.Application.Interfaces;
using HomeExpenseManager.Domain.Enums;
using HomeExpenseManager.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace HomeExpenseManager.Application.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _repository;
    private readonly ITransactionRepository _transactionRepository;
    private readonly IMapper _mapper;

    public CategoryService(
        ICategoryRepository repository,
        ITransactionRepository transactionRepository,
        IMapper mapper)
    {
        _repository = repository;
        _transactionRepository = transactionRepository;
        _mapper = mapper;
    }

    public async Task<Result<CategoryDto>> GetByIdAsync(Guid id)
    {
        var category = await _repository.GetByIdAsync(id);

        if (category is null)
            return Result<CategoryDto>.Fail("Category not found.");

        return Result<CategoryDto>.Ok(_mapper.Map<CategoryDto>(category));
    }

    public async Task<Result<CategoryDto>> CreateAsync(CreateCategoryDto dto)
    {
        var category = _mapper.Map<Domain.Entities.Category>(dto);

        await _repository.AddAsync(category);

        return Result<CategoryDto>.Ok(_mapper.Map<CategoryDto>(category), "Category created successfully.");
    }

    public async Task<Result<CategoryDto>> UpdateAsync(Guid id, CategoryDto dto)
    {
        var category = await _repository.GetByIdAsync(id);

        if (category is null)
            return Result<CategoryDto>.Fail("Category not found.");

        category.Description = dto.Description;
        category.Purpose = dto.Purpose;

        await _repository.UpdateAsync(category);

        return Result<CategoryDto>.Ok(_mapper.Map<CategoryDto>(category), "Category updated successfully.");
    }

    public async Task<Result<bool>> DeleteAsync(Guid id)
    {
        var category = await _repository.GetByIdAsync(id);

        if (category is null)
            return Result<bool>.Fail("Category not found.");

        await _repository.DeleteAsync(category);

        return Result<bool>.Ok(true, "Category deleted successfully.");
    }

    public async Task<Result<List<CategoryDto>>> GetAllAsync()
    {
        var categories = await _repository.GetAllAsync();
        var dtos = categories.Select(c => _mapper.Map<CategoryDto>(c)).ToList();

        return Result<List<CategoryDto>>.Ok(dtos);
    }

    public async Task<Result<CategoriesSummaryDto>> GetCategoriesTotals(CategoryTotalsQueryDto query)
    {
        var categoriesQuery = _repository.Query().AsNoTracking();
        var transactionsQuery = _transactionRepository.Query().AsNoTracking();

        if (!string.IsNullOrWhiteSpace(query.Description))
            categoriesQuery = categoriesQuery.Where(c => c.Description.Contains(query.Description));

        query.PageNumber = query.PageNumber <= 0 ? 1 : query.PageNumber;
        query.PageSize = query.PageSize <= 0 ? 10 : query.PageSize;

        var totalItems = await categoriesQuery.CountAsync();

        var categories = await categoriesQuery
            .OrderBy(c => c.Description)
            .Skip((query.PageNumber - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync();

        var categoryIds = categories.Select(c => c.Id).ToList();

        var transactions = await transactionsQuery
            .Where(t => categoryIds.Contains(t.CategoryId))
            .ToListAsync();

        var categoriesTotals = categories.Select(category =>
        {
            var categoryTransactions = transactions.Where(t => t.CategoryId == category.Id);

            var totalIncome = categoryTransactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t => t.Value);

            var totalExpense = categoryTransactions
                .Where(t => t.Type == TransactionType.Expense)
                .Sum(t => t.Value);

            return new CategoryTotalsDto
            {
                CategoryId = category.Id,
                Description = category.Description,
                TotalIncome = totalIncome,
                TotalExpense = totalExpense
            };
        }).ToList();

        var summary = new CategoriesSummaryDto
        {
            Categories = categoriesTotals,
            TotalIncome = categoriesTotals.Sum(c => c.TotalIncome),
            TotalExpense = categoriesTotals.Sum(c => c.TotalExpense),
            PageNumber = query.PageNumber,
            PageSize = query.PageSize,
            TotalItems = totalItems
        };

        return Result<CategoriesSummaryDto>.Ok(summary);
    }

    public async Task<Result<PagedResult<CategoryDto>>> GetAllAsync(CategoryQueryDto query)
    {
        query.PageNumber = query.PageNumber <= 0 ? 1 : query.PageNumber;
        query.PageSize = query.PageSize <= 0 ? 10 : query.PageSize;

        var categoriesQuery = _repository.Query().AsNoTracking();

        if (!string.IsNullOrWhiteSpace(query.Description))
        {
            categoriesQuery = categoriesQuery.Where(c =>
                c.Description.Contains(query.Description));
        }

        if (query.Purpose.HasValue)
        {
            categoriesQuery = categoriesQuery.Where(c =>
                c.Purpose == query.Purpose.Value);
        }

        var totalItems = await categoriesQuery.CountAsync();

        var categories = await categoriesQuery
            .OrderBy(c => c.Description)
            .Skip((query.PageNumber - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync();

        var items = _mapper.Map<List<CategoryDto>>(categories);

        var result = new PagedResult<CategoryDto>
        {
            Items = items,
            PageNumber = query.PageNumber,
            PageSize = query.PageSize,
            TotalItems = totalItems
        };

        return Result<PagedResult<CategoryDto>>.Ok(result);
    }
}