using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomeExpenseManager.Application.DTOs;

namespace HomeExpenseManager.Application.Interfaces
{
    public interface IPersonService
    {
        Task<PersonDto?> GetByIdAsync(Guid id);
        Task<PersonDto?> UpdateAsync(Guid id, PersonDto dto);       
        Task<IList<PersonDto>> GetAllAsync();
    }
}