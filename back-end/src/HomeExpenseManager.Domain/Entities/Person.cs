using HomeExpenseManager.Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeExpenseManager.Domain.Entities
{
    public class Person: BaseEntity
    {
        public string Name {  get; set; }
        public DateTime Birthday { get; set; }
        public Guid UserId { get; set; }

        public User User { get; set; }
        public ICollection<Transaction> Transactions { get; set; }
    }
}
