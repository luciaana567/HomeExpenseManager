using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeExpenseManager.Application.DTOs
{
    public class PersonDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public DateTime Birthday { get; set; }
        public int? Age => CalcularIdade();


        private int CalcularIdade()
        {
            var birthday = this.Birthday;
            var hoje = DateTime.Today;
            var idade = hoje.Year - birthday.Year;

            // Verifica se o aniversário já passou este ano
            if (birthday.Date > hoje.AddYears(-idade))
            {
                idade--;
            }

            return idade;
        }
    }
}
