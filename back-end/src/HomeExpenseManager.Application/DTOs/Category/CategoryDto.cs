using HomeExpenseManager.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeExpenseManager.Application.DTOs
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public Purpose Purpose { get; set; }
    }
}
