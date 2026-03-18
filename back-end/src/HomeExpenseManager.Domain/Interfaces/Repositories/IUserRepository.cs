using HomeExpenseManager.Domain.Common;
using HomeExpenseManager.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HomeExpenseManager.Domain.Interfaces.Repositories
{
    public interface IUserRepository: IRepositoryBase<User>
    {
        Task<Boolean> CheckExistsEmail(string email);
        Task<User?> GetByEmailAsync(string email);
    }
}