using HomeExpenseManager.Application.Common;
using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.DTOs.Transaction;

namespace HomeExpenseManager.Application.Interfaces;

public interface ITransactionService
{
    Task<Result<TransactionDto>> GetByIdAsync(Guid id);
    Task<Result<TransactionDto>> CreateAsync(CreateTransactionDto dto);
    Task<Result<TransactionDto>> UpdateAsync(Guid id, UpdateTransactionDto dto);
    Task<Result<bool>> DeleteAsync(Guid id);
    Task<Result<List<TransactionDto>>> GetAllAsync();
    Task<Result<PagedResult<TransactionDto>>> SearchAsync(TransactionQueryDto query);
}