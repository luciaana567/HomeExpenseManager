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
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _repository;
        private readonly IMapper _mapper;

        public TransactionService(ITransactionRepository repository, IMapper mapper)
        {
            _repository = repository;
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
            var Transaction = _mapper.Map<Transaction>(dto);

            await _repository.AddAsync(Transaction);

            return _mapper.Map<TransactionDto>(Transaction);
        }

        public async Task<TransactionDto?> UpdateAsync(Guid id, UpdateTransactionDto dto)
        {
            var Transaction = await _repository.GetByIdAsync(id);

            if (Transaction == null)
                return null;

            Transaction.Description = dto.Description.IsNullOrEmpty() ? Transaction.Description : dto.Description;
            Transaction.Type = dto.Type.HasValue ?  dto.Type.Value : Transaction.Type;
            Transaction.TransactionDate = dto.TransactionDate.HasValue ?  dto.TransactionDate.Value : Transaction.TransactionDate;
            Transaction.CategoryId = dto.CategoryId != null ?  dto.CategoryId : Transaction.CategoryId;

            await _repository.UpdateAsync(Transaction);

            return _mapper.Map<TransactionDto>(Transaction);
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

    }
}