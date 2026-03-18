using HomeExpenseManager.Application.Common;
using HomeExpenseManager.Application.DTOs;

namespace HomeExpenseManager.Application.Interfaces;

public interface IUserService
{
    Task<Result<UserDto>> GetByIdAsync(Guid id);
    Task<Result<UserDto>> CreateAsync(CreateUserDto dto);
    Task<Result<UserDto>> UpdateAsync(Guid id, UpdateUserDto dto);
    Task<Result<bool>> DeleteAsync(Guid id);
    Task<Result<List<UserDto>>> GetAllAsync();
}