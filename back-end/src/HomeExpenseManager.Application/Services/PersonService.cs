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
    public class PersonService : IPersonService
    {
        private readonly IPersonRepository _repository;
        private readonly IMapper _mapper;

        public PersonService(IPersonRepository repository, IMapper mapper)
        {
            _repository = repository;
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
       
    }
}