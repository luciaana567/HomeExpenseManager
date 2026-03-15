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
    public class UserService : IUserService
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;
        private readonly PasswordHasher<User> _passwordHasher;

        public UserService(IUserRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
            _passwordHasher = new PasswordHasher<User>();
        }

        public async Task<UserDto?> GetByIdAsync(Guid id)
        {
            var user = await _repository.GetByIdAsync(id);

            if (user == null)
                return null;

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> CreateAsync(CreateUserDto dto)
        {
            var user = _mapper.Map<User>(dto);


            if (dto.Password.IsNullOrEmpty() || dto.Email.IsNullOrEmpty())
                throw new Exception("invalid user");

            var checkEmail = await _repository.CheckExistsEmail(dto.Email);

            if (checkEmail)
                throw new Exception("Email already exists");


            // hash da senha
            user.Password = _passwordHasher.HashPassword(user, dto.Password);

            await _repository.AddAsync(user);

            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto?> UpdateAsync(Guid id, UpdateUserDto dto)
        {
            var user = await _repository.GetByIdAsync(id);

            if (user == null)
                return null;

            if (!dto.Email.IsNullOrEmpty())
            {
                var checkEmail = await _repository.CheckExistsEmail(dto.Email);

                if (checkEmail && !user.Email.Equals(dto.Email))
                    throw new Exception("Email already exists");
            }

            user.UserName = dto.UserName.IsNullOrEmpty() ? user.UserName : dto.UserName;
            user.Email = dto.Email.IsNullOrEmpty() ? user.Email : dto.Email;

            if (!string.IsNullOrWhiteSpace(dto.Password))
            {
                user.Password = _passwordHasher.HashPassword(user, dto.Password);
            }

            await _repository.UpdateAsync(user);

            return _mapper.Map<UserDto>(user);
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var user = await _repository.GetByIdAsync(id);

            if (user == null)
                return false;

            await _repository.DeleteAsync(user);

            return true;
        }

        public async Task<IList<UserDto>> GetAllAsync()
        {
            var users = await  _repository.GetAllAsync();

            var usersDto = users.Select(user => _mapper.Map<UserDto>(user)).ToList();

            return usersDto;
        }
       
    }
}