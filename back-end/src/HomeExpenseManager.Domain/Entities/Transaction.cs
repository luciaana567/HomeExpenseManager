using HomeExpenseManager.Domain.Common;
using HomeExpenseManager.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeExpenseManager.Domain.Entities
{
    public class Transaction : BaseEntity
    {
        public string Description { get; set; }

        public decimal Value { get; set; }

        public TransactionType Type { get; set; }

        public DateTime TransactionDate { get; set; }

        #region Categoria
        public Guid CategoryId { get; set; }
        public Category Category { get; set; }
        #endregion

        #region Pessoa
        public Guid PersonId { get; set; }
        public Person Person { get; set; }
        #endregion
    }

}
