using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomeExpenseManager.Application.DTOs;

namespace HomeExpenseManager.Application.Interfaces
{
    public interface IUserService
    {
        Task<UserDto?> GetByIdAsync(Guid id);
        Task<UserDto> CreateAsync(CreateUserDto dto);
        Task<UserDto?> UpdateAsync(Guid id, UpdateUserDto dto);
        Task<bool> DeleteAsync(Guid id);
        Task<IList<UserDto>> GetAllAsync();
    }
}