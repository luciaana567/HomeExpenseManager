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
using HomeExpenseManager.Application.DTOs.Person;
using HomeExpenseManager.Domain.Enums;
using HomeExpenseManager.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

namespace HomeExpenseManager.Application.Services
{
    public class PersonService : IPersonService
    {
        private readonly IPersonRepository _repository;
        private readonly ITransactionRepository _transactionRepository;
        private readonly IMapper _mapper;

        public PersonService(IPersonRepository repository, ITransactionRepository transactionRepository, IMapper mapper)
        {
            _repository = repository;
            _transactionRepository = transactionRepository;
            _mapper = mapper;
        }

        public async Task<PersonDto?> GetByIdAsync(Guid id)
        {
            var person = await _repository.GetByIdAsync(id);

            if (person == null)
                return null;

            return _mapper.Map<PersonDto>(person);
        }


        public async Task<PersonDto?> UpdateAsync(Guid id, PersonDto dto)
        {
            var person = await _repository.GetByIdAsync(id);

            if (person == null)
                return null;

          
            person.Name = dto.Name.IsNullOrEmpty() ? person.Name : dto.Name;
           

            await _repository.UpdateAsync(person);

            return _mapper.Map<PersonDto>(person);
        }

       

        public async Task<IList<PersonDto>> GetAllAsync()
        {
            var persons = await  _repository.GetAllAsync();

            var personsDto = persons.Select(person => _mapper.Map<PersonDto>(person)).ToList();

            return personsDto;
        }

        public async Task<PersonsSummaryDto> GetPersonsTotals(PersonTotalsQueryDto query)
        {
            var personsQuery = _repository.Query();
            var transactionsQuery = _transactionRepository.Query();

            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                personsQuery = personsQuery
                    .Where(p => p.Name.Contains(query.Name));
            }

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
                var personTransactions = transactions
                    .Where(t => t.PersonId == person.Id);

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

            return new PersonsSummaryDto
            {
                Persons = personsTotals,
                TotalIncome = personsTotals.Sum(p => p.TotalIncome),
                TotalExpense = personsTotals.Sum(p => p.TotalExpense),
                PageNumber = query.PageNumber,
                PageSize = query.PageSize,
                TotalItems = totalItems
            };
        }

    }
}