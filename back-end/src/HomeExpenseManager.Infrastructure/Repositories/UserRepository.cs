using HomeExpenseManager.Domain.Entities;
using HomeExpenseManager.Domain.Interfaces.Repositories;
using HomeExpenseManager.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HomeExpenseManager.Infrastructure.Repositories
{
    public class UserRepository : RepositoryBase<User>, IUserRepository
    {
        private readonly AppDbContext _db;

        public UserRepository(AppDbContext db): base(db)
        {
            _db = db;
        }


        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await _db.Users.Include(x => x.Person).Where(x => x.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _db.Users
                        .Include(x => x.Person)
                        .ToListAsync();
        }

        public async Task<Boolean> CheckExistsEmail(string email)
        {
            return await _db.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(x => x.Email == email);
        }
    }
}