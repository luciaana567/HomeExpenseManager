using HomeExpenseManager.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeExpenseManager.Application.DTOs.Category
{
    public class CategoryQueryDto
    {
        public string? Description { get; set; }
        public Purpose? Purpose { get; set; }
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}
