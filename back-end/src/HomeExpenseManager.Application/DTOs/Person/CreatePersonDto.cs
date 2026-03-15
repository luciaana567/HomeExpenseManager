using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeExpenseManager.Application.DTOs
{
    public class CreatePersonDto
    {
        public string? Name { get; set; }
        public DateTime? Birthday { get; set; }
    }
}
