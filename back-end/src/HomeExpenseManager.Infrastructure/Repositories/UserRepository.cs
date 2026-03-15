using HomeExpenseManager.Domain.Entities;
using HomeExpenseManager.Domain.Interfaces.Repositories;
using HomeExpenseManager.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HomeExpenseManager.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _db;

        public UserRepository(AppDbContext db)
        {
            _db = db;
        }

        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await _db.Users.FindAsync(id);
        }

        public async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _db.Users.ToListAsync();
        }

        public async Task AddAsync(User user)
        {
            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            _db.Users.Update(user);
            await _db.SaveChangesAsync();
        }

        public async Task DeleteAsync(User user)
        {
            _db.Users.Remove(user);
            await _db.SaveChangesAsync();
        }

        public async Task<Boolean> CheckExistsEmail(string email)
        {
            return await _db.Users.AnyAsync(u => u.Email == email);
        }
    }
}