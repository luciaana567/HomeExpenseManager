using HomeExpenseManager.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeExpenseManager.Application.DTOs
{
    public class TransactionDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public decimal Value { get; set; }
        public TransactionType Type { get; set; }
        public DateTime TransactionDate { get; set; }

        public Guid CategoryId { get; set; }
        public Guid PersonId { get; set; }
    }
}
