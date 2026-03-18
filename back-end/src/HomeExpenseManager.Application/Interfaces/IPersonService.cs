using HomeExpenseManager.Application.Common;
using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.DTOs.Person;

namespace HomeExpenseManager.Application.Interfaces;

public interface IPersonService
{
    Task<Result<PersonDto>> GetByIdAsync(Guid id);
    Task<Result<PersonDto>> UpdateAsync(Guid id, PersonDto dto);
    Task<Result<List<PersonDto>>> GetAllAsync();
    Task<Result<PersonsSummaryDto>> GetPersonsTotals(PersonTotalsQueryDto query);
}