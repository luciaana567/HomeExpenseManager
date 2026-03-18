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
using HomeExpenseManager.Domain.Enums;
using HomeExpenseManager.Infrastructure.Repositories;
using HomeExpenseManager.Application.DTOs.Transaction;
using Microsoft.EntityFrameworkCore;

namespace HomeExpenseManager.Application.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _repository;
        private readonly IPersonRepository _personRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public TransactionService(ITransactionRepository repository, 
            IPersonRepository personRepository, 
            ICategoryRepository categoryRepository,
            IMapper mapper)
        {
            _repository = repository;
            _personRepository = personRepository;
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<TransactionDto?> GetByIdAsync(Guid id)
        {
            var Transaction = await _repository.GetByIdAsync(id);

            if (Transaction == null)
                return null;

            return _mapper.Map<TransactionDto>(Transaction);
        }

        public async Task<TransactionDto> CreateAsync(CreateTransactionDto dto)
        {
            var person = await _personRepository.GetByIdAsync(dto.PersonId);

            CheckPerson(dto.PersonId, dto.Type);

            var category = await _categoryRepository.GetByIdAsync(dto.CategoryId);

            if (category == null)
                throw new Exception("Categoria não encontrada");

         
            if (CheckCategory(dto.Type, category.Purpose))
                throw new Exception("Categoria incompatível com o tipo da transação");


            var Transaction = _mapper.Map<Transaction>(dto);

            await _repository.AddAsync(Transaction);

            return _mapper.Map<TransactionDto>(Transaction);
        }

        public async Task<TransactionDto?> UpdateAsync(Guid id, UpdateTransactionDto dto)
        {
            var transaction = await _repository.GetByIdAsync(id);

            if (transaction == null)
                return null;           

            transaction.Description = dto.Description.IsNullOrEmpty() ? transaction.Description : dto.Description;
            transaction.Type = dto.Type.HasValue ?  dto.Type.Value : transaction.Type;
            transaction.TransactionDate = dto.TransactionDate.HasValue ?  dto.TransactionDate.Value : transaction.TransactionDate;
            transaction.CategoryId = dto.CategoryId != null ?  dto.CategoryId : transaction.CategoryId;

            CheckPerson(transaction.PersonId, transaction.Type);

            var category = await _categoryRepository.GetByIdAsync(transaction.CategoryId);

            if (category == null)
                throw new Exception("Categoria não encontrada");


            if (CheckCategory(transaction.Type, category.Purpose))
                throw new Exception("Categoria incompatível com o tipo da transação");

            await _repository.UpdateAsync(transaction);

            return _mapper.Map<TransactionDto>(transaction);
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var Transaction = await _repository.GetByIdAsync(id);

            if (Transaction == null)
                return false;

            await _repository.DeleteAsync(Transaction);

            return true;
        }

        public async Task<IList<TransactionDto>> GetAllAsync()
        {
            var Transactions = await  _repository.GetAllAsync();

            var TransactionsDto = Transactions.Select(Transaction => _mapper.Map<TransactionDto>(Transaction)).ToList();

            return TransactionsDto;
        }

        public async Task<PagedResultDto<TransactionDto>> SearchAsync(TransactionQueryDto query)
        {
            if (query.PageNumber <= 0)
                query.PageNumber = 1;

            if (query.PageSize <= 0)
                query.PageSize = 10;

            var transactionsQuery = _repository.Query().AsNoTracking();

            if (query.StartDate.HasValue)
            {
                transactionsQuery = transactionsQuery
                    .Where(t => t.TransactionDate >= query.StartDate.Value);
            }

            if (query.EndDate.HasValue)
            {
                transactionsQuery = transactionsQuery
                    .Where(t => t.TransactionDate <= query.EndDate.Value);
            }

            if (query.Type.HasValue)
            {
                transactionsQuery = transactionsQuery
                    .Where(t => t.Type == query.Type.Value);
            }

            if (query.CategoryId.HasValue)
            {
                transactionsQuery = transactionsQuery
                    .Where(t => t.CategoryId == query.CategoryId.Value);
            }

            var totalItems = await transactionsQuery.CountAsync();

            var transactions = await transactionsQuery
                .OrderByDescending(t => t.TransactionDate)
                .Skip((query.PageNumber - 1) * query.PageSize)
                .Take(query.PageSize)
                .Select(t => new TransactionDto
                {
                    Id = t.Id,
                    Description = t.Description,
                    Type = t.Type,
                    TransactionDate = t.TransactionDate,
                    CategoryId = t.CategoryId,
                    PersonId = t.PersonId
                })
                .ToListAsync();

            return new PagedResultDto<TransactionDto>
            {
                Items = transactions,
                PageNumber = query.PageNumber,
                PageSize = query.PageSize,
                TotalItems = totalItems
            };
        }

        private bool CheckCategory(TransactionType transactionType, Purpose purposeCategory)
        {
            var isValid = false;

            var categoryIsCompatibleSpending = purposeCategory.Equals(1) || purposeCategory.Equals(3);

            var isExpense = categoryIsCompatibleSpending && transactionType.Equals(1);
            var isIncome = !categoryIsCompatibleSpending && transactionType.Equals(2);

            if (isExpense || isIncome)
                return true;

            return isValid;
        }

        private async void CheckPerson(Guid idPerson, TransactionType transactionType)
        {
            var person = await _personRepository.GetByIdAsync(idPerson);

            if (person == null)
                throw new Exception("Pessoa não encontrada");

            var age = DateTime.Today.Year - person.Birthday.Year;
            if (person.Birthday.Date > DateTime.Today.AddYears(-age))
                age--;

            if (age < 18 && transactionType == TransactionType.Income)
                throw new Exception("Menor de idade só pode registrar despesas");
        }

    }
}