using HomeExpenseManager.Domain.Entities;
using HomeExpenseManager.Domain.Interfaces.Repositories;
using HomeExpenseManager.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HomeExpenseManager.Infrastructure.Repositories
{
    public class TransactionRepository : RepositoryBase<Transaction>, ITransactionRepository
    {
        private readonly AppDbContext _db;

        public TransactionRepository(AppDbContext db): base(db)
        {
            _db = db;
        }

        public IQueryable<Transaction> Query()
        {
            return _db.Transactions;
        }
    }
}