using AutoMapper;
using HomeExpenseManager.Application.Common;
using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.DTOs.Person;
using HomeExpenseManager.Application.Interfaces;
using HomeExpenseManager.Domain.Enums;
using HomeExpenseManager.Domain.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace HomeExpenseManager.Application.Services;

public class PersonService : IPersonService
{
    private readonly IPersonRepository _repository;
    private readonly ITransactionRepository _transactionRepository;
    private readonly IMapper _mapper;

    public PersonService(
        IPersonRepository repository,
        ITransactionRepository transactionRepository,
        IMapper mapper)
    {
        _repository = repository;
        _transactionRepository = transactionRepository;
        _mapper = mapper;
    }

    public async Task<Result<PersonDto>> GetByIdAsync(Guid id)
    {
        var person = await _repository.GetByIdAsync(id);

        if (person is null)
            return Result<PersonDto>.Fail("Person not found.");

        return Result<PersonDto>.Ok(_mapper.Map<PersonDto>(person));
    }

    public async Task<Result<PersonDto>> UpdateAsync(Guid id, PersonDto dto)
    {
        var person = await _repository.GetByIdAsync(id);

        if (person is null)
            return Result<PersonDto>.Fail("Person not found.");

        person.Name = dto.Name;
        person.Birthday = dto.Birthday;

        await _repository.UpdateAsync(person);

        return Result<PersonDto>.Ok(_mapper.Map<PersonDto>(person), "Person updated successfully.");
    }

    public async Task<Result<List<PersonDto>>> GetAllAsync()
    {
        var persons = await _repository.GetAllAsync();
        var dtos = persons.Select(p => _mapper.Map<PersonDto>(p)).ToList();

        return Result<List<PersonDto>>.Ok(dtos);
    }

    public async Task<Result<PersonsSummaryDto>> GetPersonsTotals(PersonTotalsQueryDto query)
    {
        var personsQuery = _repository.Query().AsNoTracking();
        var transactionsQuery = _transactionRepository.Query().AsNoTracking();

        if (!string.IsNullOrWhiteSpace(query.Name))
            personsQuery = personsQuery.Where(p => p.Name.Contains(query.Name));

        query.PageNumber = query.PageNumber <= 0 ? 1 : query.PageNumber;
        query.PageSize = query.PageSize <= 0 ? 10 : query.PageSize;

        var totalItems = await personsQuery.CountAsync();

        var persons = await personsQuery
            .OrderBy(p => p.Name)
            .Skip((query.PageNumber - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync();

        var personIds = persons.Select(p => p.Id).ToList();

        var transactions = await transactionsQuery
            .Where(t => personIds.Contains(t.PersonId))
            .ToListAsync();

        var personsTotals = persons.Select(person =>
        {
            var personTransactions = transactions.Where(t => t.PersonId == person.Id);

            var totalIncome = personTransactions
                .Where(t => t.Type == TransactionType.Income)
                .Sum(t => t.Value);

            var totalExpense = personTransactions
                .Where(t => t.Type == TransactionType.Expense)
                .Sum(t => t.Value);

            return new PersonTotalsDto
            {
                PersonId = person.Id,
                Name = person.Name,
                TotalIncome = totalIncome,
                TotalExpense = totalExpense
            };
        }).ToList();

        var summary = new PersonsSummaryDto
        {
            Persons = personsTotals,
            TotalIncome = personsTotals.Sum(p => p.TotalIncome),
            TotalExpense = personsTotals.Sum(p => p.TotalExpense),
            PageNumber = query.PageNumber,
            PageSize = query.PageSize,
            TotalItems = totalItems
        };

        return Result<PersonsSummaryDto>.Ok(summary);
    }
}