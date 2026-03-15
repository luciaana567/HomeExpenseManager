using HomeExpenseManager.Domain.Common;
using HomeExpenseManager.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HomeExpenseManager.Domain.Interfaces.Repositories
{
    public interface IUserRepository: IRepositoryBase<User>
    {
        //Task<User?> GetByIdAsync(Guid id);
        //Task<IEnumerable<User>> GetAllAsync();
        //Task AddAsync(User user);
        //Task UpdateAsync(User user);
        //Task DeleteAsync(User user);
        Task<Boolean> CheckExistsEmail(string email);
    }
}