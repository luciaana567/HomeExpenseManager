using HomeExpenseManager.Domain.Common;
using HomeExpenseManager.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeExpenseManager.Domain.Entities
{
    public class Category : BaseEntity
    {
        public string Description {  get; set; }
        public Purpose Purpose { get; set; }

        public ICollection<Transaction> Transactions { get; set; }
    }
}
