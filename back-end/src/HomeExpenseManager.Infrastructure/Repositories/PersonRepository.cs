using HomeExpenseManager.Domain.Entities;
using HomeExpenseManager.Domain.Interfaces.Repositories;
using HomeExpenseManager.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeExpenseManager.Infrastructure.Repositories
{
    public class PersonRepository : RepositoryBase<Person>, IPersonRepository
    {
        private readonly AppDbContext _db;

        public PersonRepository(AppDbContext db) : base(db)
        {
            _db = db;
        }

        public IQueryable<Person> Query()
        {
            return _db.Persons;
        }
    }
}
