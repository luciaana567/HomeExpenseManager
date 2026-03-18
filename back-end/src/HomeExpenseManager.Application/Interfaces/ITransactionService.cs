using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.DTOs.Transaction;

namespace HomeExpenseManager.Application.Interfaces
{
    public interface ITransactionService
    {
        Task<TransactionDto?> GetByIdAsync(Guid id);
        Task<TransactionDto> CreateAsync(CreateTransactionDto dto);
        Task<TransactionDto?> UpdateAsync(Guid id, UpdateTransactionDto dto);
        Task<bool> DeleteAsync(Guid id);
        Task<IList<TransactionDto>> GetAllAsync();
        Task<PagedResultDto<TransactionDto>> SearchAsync(TransactionQueryDto query);
    }
}