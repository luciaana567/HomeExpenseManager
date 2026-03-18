using AutoMapper;
using HomeExpenseManager.Application.Common;
using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.DTOs.Transaction;
using HomeExpenseManager.Application.Interfaces;
using HomeExpenseManager.Domain.Entities;
using HomeExpenseManager.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace HomeExpenseManager.Application.Services;

public class TransactionService : ITransactionService
{
    private readonly ITransactionRepository _repository;
    private readonly ICategoryRepository _categoryRepository;
    private readonly IPersonRepository _personRepository;
    private readonly IMapper _mapper;

    public TransactionService(
        ITransactionRepository repository,
        ICategoryRepository categoryRepository,
        IPersonRepository personRepository,
        IMapper mapper)
    {
        _repository = repository;
        _categoryRepository = categoryRepository;
        _personRepository = personRepository;
        _mapper = mapper;
    }

    public async Task<Result<TransactionDto>> GetByIdAsync(Guid id)
    {
        var transaction = await _repository.GetByIdAsync(id);

        if (transaction is null)
            return Result<TransactionDto>.Fail("Transaction not found.");

        return Result<TransactionDto>.Ok(_mapper.Map<TransactionDto>(transaction));
    }

    public async Task<Result<TransactionDto>> CreateAsync(CreateTransactionDto dto)
    {
        var category = await _categoryRepository.GetByIdAsync(dto.CategoryId);
        if (category is null)
            return Result<TransactionDto>.Fail("Category not found.");

        var person = await _personRepository.GetByIdAsync(dto.PersonId);
        if (person is null)
            return Result<TransactionDto>.Fail("Person not found.");

        var transaction = _mapper.Map<Transaction>(dto);
        transaction.TransactionDate = dto.TransactionDate ?? DateTime.UtcNow;

        await _repository.AddAsync(transaction);

        return Result<TransactionDto>.Ok(
            _mapper.Map<TransactionDto>(transaction),
            "Transaction created successfully.");
    }

    public async Task<Result<TransactionDto>> UpdateAsync(Guid id, UpdateTransactionDto dto)
    {
        var transaction = await _repository.GetByIdAsync(id);

        if (transaction is null)
            return Result<TransactionDto>.Fail("Transaction not found.");

        if (dto.CategoryId != Guid.Empty)
        {
            var category = await _categoryRepository.GetByIdAsync(dto.CategoryId);
            if (category is null)
                return Result<TransactionDto>.Fail("Category not found.");

            transaction.CategoryId = dto.CategoryId;
        }

        if (dto.PersonId != Guid.Empty)
        {
            var person = await _personRepository.GetByIdAsync(dto.PersonId);
            if (person is null)
                return Result<TransactionDto>.Fail("Person not found.");

            transaction.PersonId = dto.PersonId;
        }

        if (!string.IsNullOrWhiteSpace(dto.Description))
            transaction.Description = dto.Description;

        if (dto.Value.HasValue)
            transaction.Value = dto.Value.Value;

        if (dto.Type.HasValue)
            transaction.Type = dto.Type.Value;

        if (dto.TransactionDate.HasValue)
            transaction.TransactionDate = dto.TransactionDate.Value;

        await _repository.UpdateAsync(transaction);

        return Result<TransactionDto>.Ok(
            _mapper.Map<TransactionDto>(transaction),
            "Transaction updated successfully.");
    }

    public async Task<Result<bool>> DeleteAsync(Guid id)
    {
        var transaction = await _repository.GetByIdAsync(id);

        if (transaction is null)
            return Result<bool>.Fail("Transaction not found.");

        await _repository.DeleteAsync(transaction);

        return Result<bool>.Ok(true, "Transaction deleted successfully.");
    }

    public async Task<Result<List<TransactionDto>>> GetAllAsync()
    {
        var transactions = await _repository.GetAllAsync();
        var dtos = transactions
            .Select(t => _mapper.Map<TransactionDto>(t))
            .ToList();

        return Result<List<TransactionDto>>.Ok(dtos);
    }

    public async Task<Result<PagedResult<TransactionDto>>> SearchAsync(TransactionQueryDto query)
    {
        var transactionsQuery = _repository.Query().AsNoTracking();

        if (query.StartDate.HasValue)
            transactionsQuery = transactionsQuery.Where(t => t.TransactionDate >= query.StartDate.Value);

        if (query.EndDate.HasValue)
            transactionsQuery = transactionsQuery.Where(t => t.TransactionDate <= query.EndDate.Value);

        if (query.Type.HasValue)
            transactionsQuery = transactionsQuery.Where(t => t.Type == query.Type.Value);

        if (query.CategoryId.HasValue)
            transactionsQuery = transactionsQuery.Where(t => t.CategoryId == query.CategoryId.Value);

        if (query.PersonId.HasValue)
            transactionsQuery = transactionsQuery.Where(t => t.PersonId == query.PersonId.Value);

        query.PageNumber = query.PageNumber <= 0 ? 1 : query.PageNumber;
        query.PageSize = query.PageSize <= 0 ? 10 : query.PageSize;

        var totalItems = await transactionsQuery.CountAsync();

        var items = await transactionsQuery
            .OrderByDescending(t => t.TransactionDate)
            .Skip((query.PageNumber - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync();

        var result = new PagedResult<TransactionDto>
        {
            Items = items.Select(t => _mapper.Map<TransactionDto>(t)).ToList(),
            PageNumber = query.PageNumber,
            PageSize = query.PageSize,
            TotalItems = totalItems
        };

        return Result<PagedResult<TransactionDto>>.Ok(result);
    }
}