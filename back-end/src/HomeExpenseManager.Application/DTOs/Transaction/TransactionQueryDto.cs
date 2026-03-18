using HomeExpenseManager.Domain.Enums;

namespace HomeExpenseManager.Application.DTOs.Transaction;

public class TransactionQueryDto
{
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public TransactionType? Type { get; set; }
    public Guid? CategoryId { get; set; }
    public Guid? PersonId { get; set; }
    public int PageNumber { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}