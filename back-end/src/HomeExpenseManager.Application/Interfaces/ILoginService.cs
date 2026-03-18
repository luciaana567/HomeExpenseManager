using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeExpenseManager.Application.Interfaces
{
    public interface ILoginService
    {
        Task<User?> Login(LoginDto dto);
    }
}
