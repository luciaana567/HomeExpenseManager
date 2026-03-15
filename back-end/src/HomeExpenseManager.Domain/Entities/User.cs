using HomeExpenseManager.Domain.Common;
using HomeExpenseManager.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeExpenseManager.Domain.Entities
{
    public class User: BaseEntity
    {
        public String Email { get; set; }

        public String Password { get; set; }

        public String? UserName { get; set; }

        public UserRole Role { get; set; } = UserRole.User;
    }
}
