using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HomeExpenseManager.Application.DTOs;
using HomeExpenseManager.Application.DTOs.Category;
using HomeExpenseManager.Domain.Entities;

namespace HomeExpenseManager.Application.Interfaces
{
    public interface ITokenService
    {
        string GenerateToken(User user);
    }
}