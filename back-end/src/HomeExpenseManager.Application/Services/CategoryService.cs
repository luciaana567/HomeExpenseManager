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

namespace HomeExpenseManager.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository repository, IMapper mapper)
        {
            _repository = repository;
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

    }
}