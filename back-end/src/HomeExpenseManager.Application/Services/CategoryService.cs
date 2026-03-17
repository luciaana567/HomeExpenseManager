using Microsoft.AspNetCore.Identity;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomeExpenseManager.Domain.Entities;
using HomeExpenseManager.Domain.Interfaces.Repositories;
using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.Interfaces;
using Microsoft.IdentityModel.Tokens;
using HomeExpenseManager.Application.DTOs.Category;
using HomeExpenseManager.Domain.Enums;
using HomeExpenseManager.Infrastructure.Repositories;

namespace HomeExpenseManager.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository repository, ITransactionRepository transactionRepository, IMapper mapper)
        {
            _repository = repository;
            _transactionRepository = transactionRepository;
            _mapper = mapper;
        }

        public async Task<CategoryDto?> GetByIdAsync(Guid id)
        {
            var category = await _repository.GetByIdAsync(id);

            if (category == null)
                return null;

            return _mapper.Map<CategoryDto>(category);
        }

        public async Task<CategoryDto> CreateAsync(CreateCategoryDto dto)
        {
            var category = _mapper.Map<Category>(dto);

            await _repository.AddAsync(category);

            return _mapper.Map<CategoryDto>(category);
        }

        public async Task<CategoryDto?> UpdateAsync(Guid id, CategoryDto dto)
        {
            var category = await _repository.GetByIdAsync(id);

            if (category == null)
                return null;

            category.Description = dto.Description.IsNullOrEmpty() ? category.Description : dto.Description;
            category.Purpose = dto.Purpose >= 0  ? dto.Purpose : category.Purpose;

            await _repository.UpdateAsync(category);

            return _mapper.Map<CategoryDto>(category);
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var category = await _repository.GetByIdAsync(id);

            if (category == null)
                return false;

            await _repository.DeleteAsync(category);

            return true;
        }

        public async Task<IList<CategoryDto>> GetAllAsync()
        {
            var categorys = await  _repository.GetAllAsync();

            var categorysDto = categorys.Select(category => _mapper.Map<CategoryDto>(category)).ToList();
            return categorysDto;
        }

        public async Task<CategoriesSummaryDto> GetCategoriesTotals()
        {
            var categories = await _repository.GetAllAsync();
            var transactions = await _transactionRepository.GetAllAsync();

            var categoriesTotals = categories.Select(category =>
            {
                var categoryTransactions = transactions
                    .Where(t => t.CategoryId == category.Id);

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

            return new CategoriesSummaryDto
            {
                Categories = categoriesTotals,
                TotalIncome = categoriesTotals.Sum(c => c.TotalIncome),
                TotalExpense = categoriesTotals.Sum(c => c.TotalExpense)
            };
        }

    }
}