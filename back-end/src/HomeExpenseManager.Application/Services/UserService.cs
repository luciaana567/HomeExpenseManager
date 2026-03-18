using AutoMapper;
using HomeExpenseManager.Application.Common;
using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.Interfaces;
using HomeExpenseManager.Domain.Entities;
using HomeExpenseManager.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Identity;

namespace HomeExpenseManager.Application.Services;

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

    public async Task<Result<UserDto>> GetByIdAsync(Guid id)
    {
        var user = await _repository.GetByIdAsync(id);

        if (user is null)
            return Result<UserDto>.Fail("User not found.");

        return Result<UserDto>.Ok(_mapper.Map<UserDto>(user));
    }

    public async Task<Result<UserDto>> CreateAsync(CreateUserDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Email) || string.IsNullOrWhiteSpace(dto.Password))
            return Result<UserDto>.Fail("Invalid user data.");

        var emailExists = await _repository.CheckExistsEmail(dto.Email);
        if (emailExists)
            return Result<UserDto>.Fail("Email already exists.");

        var user = _mapper.Map<User>(dto);
        user.Password = _passwordHasher.HashPassword(user, dto.Password);

        await _repository.AddAsync(user);

        return Result<UserDto>.Ok(_mapper.Map<UserDto>(user), "User created successfully.");
    }

    public async Task<Result<UserDto>> UpdateAsync(Guid id, UpdateUserDto dto)
    {
        var user = await _repository.GetByIdAsync(id);

        if (user is null)
            return Result<UserDto>.Fail("User not found.");

        if (!string.IsNullOrWhiteSpace(dto.Email) && dto.Email != user.Email)
        {
            var emailExists = await _repository.CheckExistsEmail(dto.Email);
            if (emailExists)
                return Result<UserDto>.Fail("Email already exists.");

            user.Email = dto.Email;
        }

        if (!string.IsNullOrWhiteSpace(dto.UserName))
            user.UserName = dto.UserName;

        if (!string.IsNullOrWhiteSpace(dto.Password))
            user.Password = _passwordHasher.HashPassword(user, dto.Password);

        await _repository.UpdateAsync(user);

        return Result<UserDto>.Ok(_mapper.Map<UserDto>(user), "User updated successfully.");
    }

    public async Task<Result<bool>> DeleteAsync(Guid id)
    {
        var user = await _repository.GetByIdAsync(id);

        if (user is null)
            return Result<bool>.Fail("User not found.");

        await _repository.DeleteAsync(user);

        return Result<bool>.Ok(true, "User deleted successfully.");
    }

    public async Task<Result<List<UserDto>>> GetAllAsync()
    {
        var users = await _repository.GetAllAsync();
        var dtos = users.Select(u => _mapper.Map<UserDto>(u)).ToList();

        return Result<List<UserDto>>.Ok(dtos);
    }
}